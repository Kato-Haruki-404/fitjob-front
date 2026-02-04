"use server";

import fetchJobs, { type Job } from "@/lib/fetchJobs";

export async function fetchJobsByIds(ids: number[]): Promise<Job[]> {
	if (ids.length === 0) {
		return [];
	}

	try {
		const result = await fetchJobs({
			params: {
				jobIds: ids,
				perPage: ids.length,
			},
		});

		// Sort results to match the order of input IDs
		const jobMap = new Map(result.data.map((job) => [job.id, job]));
		const orderedJobs: Job[] = [];

		for (const id of ids) {
			const job = jobMap.get(id);
			if (job) {
				orderedJobs.push(job);
			}
		}

		return orderedJobs;
	} catch (error) {
		console.error("Failed to fetch jobs by IDs:", error);
		return [];
	}
}
