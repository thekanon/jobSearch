export function filterJobs(jobs, query) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return jobs.filter(job => {
    const text = `${job.name} ${job.id}`.toLocaleLowerCase();
    return terms.every(term => text.includes(term));
  });
}
