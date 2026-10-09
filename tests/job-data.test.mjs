import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dataDirectory = resolve(root, 'src/lib/data/jobsQuestion');

// Execute the actual TypeScript exports without starting Next or making requests.
function loadSource(relativePath, imports) {
  const filename = resolve(root, relativePath);
  const code = ts.transpileModule(readFileSync(filename, 'utf8'), {
    fileName: filename,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require(specifier) {
      if (Object.hasOwn(imports, specifier)) return imports[specifier];
      throw new Error(`Unexpected dependency in isolated test: ${specifier}`);
    },
    fetch() { throw new Error('Static job data must not make network requests'); },
  }, { filename });
  return module.exports;
}

const jsonFiles = readdirSync(dataDirectory).filter(name => name.endsWith('.json')).sort();
const jsonImports = Object.fromEntries(jsonFiles.map(name => [`./${name}`, JSON.parse(readFileSync(resolve(dataDirectory, name), 'utf8'))]));
const jobs = loadSource('src/lib/data/jobsQuestion/index.js', jsonImports).default;
const page = loadSource('src/pages/jobs/[jobId].tsx', {
  '@/lib/data/jobsQuestion': jobs,
  '@/containers/JobPageContainer': () => null,
});
const handler = loadSource('src/pages/api/jobs/[jobId].ts', { '@/lib/data/jobsQuestion': jobs }).default;

function request(method, jobId) {
  const result = { statusCode: 200, headers: {}, body: null };
  const response = {
    setHeader(name, value) { result.headers[name] = value; return response; },
    status(code) { result.statusCode = code; return response; },
    json(body) { result.body = body; return response; },
  };
  handler({ method, query: { jobId } }, response);
  return result;
}

test('the registry contains all 38 valid saved jobs and 524 complete questions', () => {
  assert.equal(jsonFiles.length, 38);
  assert.equal(Object.keys(jobs).length, 38);
  let technicalCount = 0;
  let nonTechnicalCount = 0;
  const ids = new Set();
  for (const [key, job] of Object.entries(jobs)) {
    assert.match(key, /^[A-Za-z][A-Za-z0-9]*$/);
    assert.ok(jsonFiles.includes(`${key}.json`));
    assert.equal(job.id, key);
    assert.ok(!ids.has(job.id));
    ids.add(job.id);
    assert.equal(typeof job.name, 'string');
    assert.ok(job.name.trim());
    assert.ok(Array.isArray(job.generalFeatures));
    for (const feature of job.generalFeatures) { assert.equal(typeof feature, 'string'); assert.ok(feature.trim()); }
    for (const field of ['technicalQuestions', 'nonTechnicalQuestions']) {
      assert.ok(Array.isArray(job[field]));
      for (const question of job[field]) {
        for (const part of ['question', 'intention', 'exampleAnswer']) {
          assert.equal(typeof question[part], 'string');
          assert.ok(question[part].trim());
        }
      }
    }
    technicalCount += job.technicalQuestions.length;
    nonTechnicalCount += job.nonTechnicalQuestions.length;
  }
  assert.equal(technicalCount, 261);
  assert.equal(nonTechnicalCount, 263);
  assert.equal(technicalCount + nonTechnicalCount, 524);
});

test('all saved jobs have static paths and direct data props without any fetch', async () => {
  const paths = await page.getStaticPaths({});
  assert.equal(paths.fallback, false);
  assert.equal(paths.paths.length, 38);
  assert.deepEqual(Array.from(paths.paths, path => path.params.jobId).sort(), Object.keys(jobs).sort());
  for (const id of Object.keys(jobs)) {
    const result = await page.getStaticProps({ params: { jobId: id } });
    assert.equal(result.props, jobs[id]);
    assert.equal(result.notFound, undefined);
  }
});

test('invalid, inherited and array IDs return 404 in both static props and GET API', async () => {
  const invalid = ['', 'missingJob', '__proto__', 'constructor', 'toString', 'prototype', '../frontendDeveloper', '%2e%2e', 'frontendDeveloper?', 'frontendDeveloper ', undefined, null, [], ['frontendDeveloper']];
  for (const id of invalid) {
    const props = await page.getStaticProps({ params: { jobId: id } });
    assert.equal(props.notFound, true);
    assert.equal(props.props, undefined);
    assert.equal(request('GET', id).statusCode, 404);
  }
  assert.equal((await page.getStaticProps({})).notFound, true);
});

test('GET API serves stored records, and every mutation method is rejected', () => {
  for (const id of Object.keys(jobs)) {
    const result = request('GET', id);
    assert.equal(result.statusCode, 200);
    assert.equal(result.body, jobs[id]);
  }
  for (const method of ['POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS', undefined]) {
    const result = request(method, 'frontendDeveloper');
    assert.equal(result.statusCode, 405);
    assert.equal(result.headers.Allow, 'GET');
    assert.equal(result.body.id, undefined);
  }
});

const uiImports = {
  react: React,
  'react/jsx-runtime': require('react/jsx-runtime'),
  'styled-components': require('styled-components'),
};
const QuestionList = loadSource('src/components/molecules/QuestionList.tsx', uiImports).default;
const JobPageComponent = loadSource('src/components/templates/JobPageComponent.tsx', {
  ...uiImports,
  'next/link': ({ href, children }) => React.createElement('a', { href }, children),
  '@/components/atoms/Button': ({ children, onClick }) => React.createElement('button', { type: 'button', onClick }, children),
  '@/components/molecules/ButtonContainer': ({ children }) => React.createElement('div', null, children),
  '@/components/organisms/CustomHead': () => null,
  '@/components/molecules/QuestionList': QuestionList,
  '@/components/molecules/FeatureList': ({ features }) => React.createElement('div', null, features.map((feature, index) => React.createElement('p', { key: index }, feature))),
}).default;
const collapsed = length => Array.from({ length }, () => ({ intention: false, answer: false }));

test('question toggles expose stable relationships and escape saved HTML-like text', () => {
  const props = {
    idPrefix: 'frontendDeveloper',
    questions: [{ question: '<canvas> 질문', intention: '합성 의도', exampleAnswer: '합성 답변' }],
    type: 'technical', toggleDetails() {}, expandedState: [{ intention: true, answer: false }],
  };
  const html = renderToStaticMarkup(React.createElement(QuestionList, props));
  assert.ok(html.includes('aria-expanded="true"'));
  assert.ok(html.includes('aria-expanded="false"'));
  assert.ok(html.includes('aria-controls="frontendDeveloper-technical-0-intention"'));
  assert.ok(html.includes('id="frontendDeveloper-technical-0-intention"'));
  assert.match(html, /id="frontendDeveloper-technical-0-answer" hidden=""/);
  assert.ok(html.includes('type="button"'));
  assert.ok(html.includes('&lt;canvas&gt;'));
  assert.ok(!html.includes('<canvas>'));
});

test('empty job retains features, explains absent questions and has no load-more button', () => {
  const job = jobs.foodAndBiotechnologyInterview;
  assert.equal(job.technicalQuestions.length, 0);
  assert.equal(job.nonTechnicalQuestions.length, 0);
  const html = renderToStaticMarkup(React.createElement(JobPageComponent, {
    ...job, technicalExpanded: [], nonTechnicalExpanded: [], technicalCount: 2, nonTechnicalCount: 2,
    appendQuestions() {}, toggleDetails() {},
  }));
  assert.ok(html.includes(job.generalFeatures[0]));
  assert.equal(html.split('저장된 질문 예시가 없습니다.').length - 1, 2);
  assert.ok(!html.includes('더보기'));
  assert.ok(html.includes('href="/"'));
  assert.ok(html.includes('과거 AI가 생성한 면접 예시'));
});

test('load-more buttons disappear independently when each list reaches its end', () => {
  const job = jobs.frontendDeveloper;
  const base = { ...job, technicalExpanded: collapsed(job.technicalQuestions.length), nonTechnicalExpanded: collapsed(job.nonTechnicalQuestions.length), appendQuestions() {}, toggleDetails() {} };
  const partial = renderToStaticMarkup(React.createElement(JobPageComponent, { ...base, technicalCount: job.technicalQuestions.length, nonTechnicalCount: 2 }));
  assert.ok(!partial.includes('>기술 질문 더보기<'));
  assert.ok(partial.includes('>비기술 질문 더보기<'));
  const complete = renderToStaticMarkup(React.createElement(JobPageComponent, { ...base, technicalCount: job.technicalQuestions.length, nonTechnicalCount: job.nonTechnicalQuestions.length }));
  assert.ok(!complete.includes('더보기'));
});
