export type Jobs = {
	current_page: number;
	data: {
		id: number;
		address_id: number | null;
		title: string;
		company_name: string;
		email: string;
		tel: string;
		salary_type: "時給" | "日給";
		wage: number;
		employment_type: "パートタイム" | "アルバイト";
		external_link_url: string;
		image: string;
		is_published: boolean;
		created_at: string;
		updated_at: string;
		tags: {
			id: number;
			name: string;
		}[];
		momentum: {
			calorie: number;
			steps: number;
			exercise_level: number;
		} | null;
		address: {
			id: number;
			postal_code: string | null;
			prefecture: string;
			city: string;
			town: string;
			address_line: string;
			building_name: string | null;
			latitude: number;
			longitude: number;
			line_name: string;
			nearest_station: string;
			walking_minutes: number;
		} | null;
	}[];
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	next_page_url: string | null;
	path: string;
	per_page: number;
	prev_page_url: string | null;
	to: number;
	total: number;
};

export type RequestJobsParams = {
	keyword?: string[];
	jobIds?: number[];
	min_wage?: number;
	max_wage?: number;
	min_calorie?: number;
	max_calorie?: number;
	min_steps?: number;
	max_steps?: number;
	exercise_levels?: number[];
	sort: "wage_desc" | "latest";
	per_page: number;
	page: number;
};

export async function fetchJobs({ params }: { params: RequestJobsParams }) {
	const response = await fetch(`${process.env.API_URL}/api/jobs`, {
		method: "GET",
		headers: {
			"X-Request-Params": JSON.stringify(params),
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch jobs: ${response.status}`);
	}

	const data: Jobs = await response.json();
	return data;
}
