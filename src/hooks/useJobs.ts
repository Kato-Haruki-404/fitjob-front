import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export type RequestJobsParams = Record<
	string,
	string | number | boolean | Array<string | number> | null | undefined
>;

export type Jobs = unknown;

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL;

function toSearchParams(params: RequestJobsParams) {
	const searchParams = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (value === null || value === undefined) {
			continue;
		}
		if (Array.isArray(value)) {
			for (const item of value) {
				searchParams.append(key, String(item));
			}
			continue;
		}
		searchParams.set(key, String(value));
	}
	return searchParams;
}

export async function fetchJobs({
	params,
	signal,
}: {
	params: RequestJobsParams;
	signal?: AbortSignal;
}) {
	if (!API_URL) {
		throw new Error("API URL is not configured.");
	}

	const url = new URL("/api/jobs", API_URL);
	const searchParams = toSearchParams(params);
	if (searchParams.toString()) {
		url.search = searchParams.toString();
	}

	const response = await fetch(url.toString(), {
		method: "GET",
		signal,
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch jobs: ${response.status}`);
	}

	return (await response.json()) as Jobs;
}

type UseJobsOptions = Omit<
	UseQueryOptions<Jobs, Error>,
	"queryKey" | "queryFn"
>;

export function useJobs({
	params,
	queryOptions,
}: {
	params: RequestJobsParams;
	queryOptions?: UseJobsOptions;
}) {
	return useQuery({
		queryKey: ["jobs", params],
		queryFn: ({ signal }) => fetchJobs({ params, signal }),
		...queryOptions,
	});
}
