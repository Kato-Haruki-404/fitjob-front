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
		keyword?: string | string[];
		"keyword[]"?: string | string[];
		exercise_levels?: string | string[];
		"exercise_levels[]"?: string | string[];
		workLocation?: string;
		sort?: string;
		"sort[]"?: string | string[];
		distance?: string;
		calorie?: string;
		wage?: string;
		exercise?: string;
		latest?: string;
		latitude?: string;
		longitude?: string;
		minWage?: string;
		maxWage?: string;
		minCalorie?: string;
		maxCalorie?: string;
		minSteps?: string;
		maxSteps?: string;
	}>;
};

const isTruthyParam = (value?: string | string[]) => {
	if (Array.isArray(value)) {
		return value.some((entry) => entry === "true" || entry === "1");
	}
	return value === "true" || value === "1";
};

export default async function DailyWageSearchPage({ searchParams }: Props) {
	const params = await searchParams;
	const currentPage = Number(params.page) || 1;
	const perPage = 10;
	const sortParam = params.sort ?? params["sort[]"];
	const keywordParam = params.keyword ?? params["keyword[]"];
	const exerciseLevelsParam =
		params.exercise_levels ?? params["exercise_levels[]"];
	const distance = isTruthyParam(params.distance);
	const calorie = isTruthyParam(params.calorie);
	const wage = isTruthyParam(params.wage);
	const exercise = isTruthyParam(params.exercise);
	const latest = isTruthyParam(params.latest);
	const latitude = params.latitude ? Number(params.latitude) : undefined;
	const longitude = params.longitude ? Number(params.longitude) : undefined;
	const exerciseLevels = Array.isArray(exerciseLevelsParam)
		? exerciseLevelsParam.map(Number).filter((level) => !Number.isNaN(level))
		: exerciseLevelsParam
			? [Number(exerciseLevelsParam)].filter((level) => !Number.isNaN(level))
			: undefined;

	const result = await fetchJobs({
		params: {
			sort: sortParam,
			distance,
			calorie,
			wage,
			exercise,
			latest,
			latitude,
			longitude,
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
			keyword: keywordParam
				? Array.isArray(keywordParam)
					? keywordParam
					: [keywordParam]
				: undefined,
			exerciseLevels,
			salaryType: "日給",
		},
	});

	return (
		<SearchResults
			jobs={result.data}
			total={result.total}
			currentPage={currentPage}
			totalPages={result.lastPage}
			baseUrl="/search/dailywage"
			searchParams={params}
		/>
	);
}
