import test from 'node:test';
import assert from 'node:assert/strict';
import { filterJobs } from '../src/lib/job-search.mjs';
const jobs = [{ id: 'frontendDeveloper', name: '프론트엔드 개발자' }, {id: 'computerScienceInterview', name:'컴퓨터공학과'}];
test('empty and whitespace searches show all jobs',()=> { assert.deepEqual(filterJobs(jobs,'  '),jobs); });
test('Korean terms, English IDs, and case folding work',()=> { assert.deepEqual(filterJobs(jobs,'프론트엔드 개발자'),[jobs[0]]); assert.deepEqual(filterJobs(jobs,' FRONTEND '),[jobs[0]]); });
test('unavailable job shows empty results rather than invented questions',()=>{assert.deepEqual(filterJobs(jobs,'공정관리자'),[]);});
