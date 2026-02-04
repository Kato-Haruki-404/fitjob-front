import SearchResults from "@/components/search/searchResults";
import fetchJobs from "@/lib/fetchJobs";

type Props = {
	searchParams: Promise<{
		page?: string;
		min_wage?: string;
		max_wage?: string;
		min_calorie?: string;
		max_calorie?: string;
		min_steps?: string;
		max_steps?: string;
		keyword?: string;
		workLocation?: string;
		sort?: string;
		"sort[]"?: string | string[];
		minWage?: string;
		maxWage?: string;
		minCalorie?: string;
		maxCalorie?: string;
		minSteps?: string;
		maxSteps?: string;
	}>;
};

export default async function HourlyWageSearchPage({ searchParams }: Props) {
	const params = await searchParams;
	const currentPage = Number(params.page) || 1;
	const perPage = 10;
	const sortParam = params.sort ?? params["sort[]"];
	const normalizedSort = Array.isArray(sortParam)
		? sortParam.filter(
				(value) => value && value !== "latest" && value !== "new",
			)
		: sortParam === "latest" || sortParam === "new"
			? undefined
			: sortParam;

	const result = await fetchJobs({
		params: {
			sort:
				Array.isArray(normalizedSort) && normalizedSort.length === 0
					? undefined
					: normalizedSort,
			perPage,
			page: currentPage,
			minWage: params.min_wage
				? Number(params.min_wage)
				: params.minWage
					? Number(params.minWage)
					: undefined,
			maxWage: params.max_wage
				? Number(params.max_wage)
				: params.maxWage
					? Number(params.maxWage)
					: undefined,
			minCalorie: params.min_calorie
				? Number(params.min_calorie)
				: params.minCalorie
					? Number(params.minCalorie)
					: undefined,
			maxCalorie: params.max_calorie
				? Number(params.max_calorie)
				: params.maxCalorie
					? Number(params.maxCalorie)
					: undefined,
			minSteps: params.min_steps
				? Number(params.min_steps)
				: params.minSteps
					? Number(params.minSteps)
					: undefined,
			maxSteps: params.max_steps
				? Number(params.max_steps)
				: params.maxSteps
					? Number(params.maxSteps)
					: undefined,
			keyword: params.keyword ? [params.keyword] : undefined,
			salaryType: "時給",
		},
	});

	return (
		<SearchResults
			jobs={result.data}
			total={result.total}
			currentPage={currentPage}
			totalPages={result.lastPage}
			baseUrl="/search/hourlywage"
			searchParams={params}
		/>
	);
}
