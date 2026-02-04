export type Job = {
	id: number;
	addressId: number | null;
	title: string;
	companyName: string;
	email?: string;
	tel?: string;
	salaryType: "時給" | "日給";
	wage: number;
	employmentType: "パートタイム" | "アルバイト";
	externalLinkUrl: string;
	image: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	tags: {
		id: number;
		name: string;
	}[];
	momentum: {
		calorie: number;
		steps: number;
		exerciseLevel: number;
		createdAt: string;
		updatedAt: string;
	} | null;
	address: {
		id: number;
		postalCode: string | null;
		prefecture: string;
		city: string;
		town: string;
		addressLine: string;
		buildingName: string | null;
		latitude: number;
		longitude: number;
		lineName: string;
		nearestStation: string;
		walkingMinutes: number;
		createdAt: string;
		updatedAt: string;
	} | null;
};

export type Jobs = {
	currentPage: number;
	data: Job[];
	firstPageUrl: string;
	from: number;
	lastPage: number;
	lastPageUrl: string;
	links: {
		url: string | null;
		label: string;
		active: boolean;
	}[];
	nextPageUrl: string | null;
	path: string;
	perPage: number;
	prevPageUrl: string | null;
	to: number;
	total: number;
	distance?: number | null;
};

export type RequestJobsParams = {
	keyword?: string[];
	jobIds?: number[];
	minWage?: number;
	maxWage?: number;
	minCalorie?: number;
	maxCalorie?: number;
	minSteps?: number;
	maxSteps?: number;
	exerciseLevels?: number[];
	salaryType?: "時給" | "日給";
	sort?: string | string[];
	perPage?: number;
	page?: number;
	latitude?: number;
	longitude?: number;
};

type ApiLink = {
	url?: string | null;
	label?: string;
	active?: boolean;
};

type ApiTag = {
	id?: number;
	name?: string;
};

type ApiMomentum = {
	calorie?: number;
	steps?: number;
	exerciseLevel?: number;
	exercise_level?: number;
	createdAt?: string;
	created_at?: string;
	updatedAt?: string;
	updated_at?: string;
};

type ApiAddress = {
	id?: number;
	postalCode?: string | null;
	postal_code?: string | null;
	prefecture?: string;
	city?: string;
	town?: string;
	addressLine?: string;
	address_line?: string;
	buildingName?: string | null;
	building_name?: string | null;
	latitude?: number | string;
	longitude?: number | string;
	lineName?: string;
	line_name?: string;
	nearestStation?: string;
	nearest_station?: string;
	walkingMinutes?: number;
	walking_minutes?: number;
	createdAt?: string;
	created_at?: string;
	updatedAt?: string;
	updated_at?: string;
};

type ApiJob = {
	id?: number;
	addressId?: number | null;
	address_id?: number | null;
	title?: string;
	companyName?: string;
	company_name?: string;
	email?: string;
	tel?: string;
	salaryType?: "時給" | "日給";
	salary_type?: "時給" | "日給";
	wage?: number;
	employmentType?: "パートタイム" | "アルバイト";
	employment_type?: "パートタイム" | "アルバイト";
	externalLinkUrl?: string;
	external_link_url?: string;
	image?: string;
	status?: string;
	is_published?: boolean;
	createdAt?: string;
	created_at?: string;
	updatedAt?: string;
	updated_at?: string;
	tags?: ApiTag[];
	momentum?: ApiMomentum | null;
	address?: ApiAddress | null;
};

type ApiJobs = {
	currentPage?: number;
	current_page?: number;
	data?: ApiJob[];
	firstPageUrl?: string;
	first_page_url?: string;
	from?: number;
	lastPage?: number;
	last_page?: number;
	lastPageUrl?: string;
	last_page_url?: string;
	links?: ApiLink[];
	nextPageUrl?: string | null;
	next_page_url?: string | null;
	path?: string;
	perPage?: number;
	per_page?: number;
	prevPageUrl?: string | null;
	prev_page_url?: string | null;
	to?: number;
	total?: number;
	distance?: number | null;
};

function toStringValue(value: unknown, fallback = ""): string {
	if (value === null || value === undefined) {
		return fallback;
	}
	return String(value);
}

function normalizeJob(raw: ApiJob): Job {
	const salaryType = raw.salaryType ?? raw.salary_type;
	const employmentType = raw.employmentType ?? raw.employment_type;
	const tags = Array.isArray(raw.tags) ? raw.tags : [];
	const momentum = raw.momentum;
	const address = raw.address;

	return {
		id: Number(raw.id ?? 0),
		addressId: raw.addressId ?? raw.address_id ?? null,
		title: toStringValue(raw.title),
		companyName: toStringValue(raw.companyName ?? raw.company_name),
		email: raw.email,
		tel: raw.tel,
		salaryType:
			salaryType === "日給" || salaryType === "時給" ? salaryType : "時給",
		wage: Number(raw.wage ?? 0),
		employmentType:
			employmentType === "パートタイム" || employmentType === "アルバイト"
				? employmentType
				: "アルバイト",
		externalLinkUrl: toStringValue(
			raw.externalLinkUrl ?? raw.external_link_url,
		),
		image: toStringValue(raw.image),
		status:
			raw.status ??
			(raw.is_published !== undefined
				? raw.is_published
					? "published"
					: "unpublished"
				: ""),
		createdAt: toStringValue(raw.createdAt ?? raw.created_at),
		updatedAt: toStringValue(raw.updatedAt ?? raw.updated_at),
		tags: tags.map((tag) => ({
			id: Number(tag.id ?? 0),
			name: toStringValue(tag.name),
		})),
		momentum: momentum
			? {
					calorie: Number(momentum.calorie ?? 0),
					steps: Number(momentum.steps ?? 0),
					exerciseLevel: Number(
						momentum.exerciseLevel ?? momentum.exercise_level ?? 0,
					),
					createdAt: toStringValue(momentum.createdAt ?? momentum.created_at),
					updatedAt: toStringValue(momentum.updatedAt ?? momentum.updated_at),
				}
			: null,
		address: address
			? {
					id: Number(address.id ?? 0),
					postalCode: address.postalCode ?? address.postal_code ?? null,
					prefecture: toStringValue(address.prefecture),
					city: toStringValue(address.city),
					town: toStringValue(address.town),
					addressLine: toStringValue(
						address.addressLine ?? address.address_line,
					),
					buildingName: address.buildingName ?? address.building_name ?? null,
					latitude: Number(address.latitude ?? 0),
					longitude: Number(address.longitude ?? 0),
					lineName: toStringValue(address.lineName ?? address.line_name),
					nearestStation: toStringValue(
						address.nearestStation ?? address.nearest_station,
					),
					walkingMinutes: Number(
						address.walkingMinutes ?? address.walking_minutes ?? 0,
					),
					createdAt: toStringValue(address.createdAt ?? address.created_at),
					updatedAt: toStringValue(address.updatedAt ?? address.updated_at),
				}
			: null,
	};
}

function normalizeJobsResponse(raw: ApiJobs): Jobs {
	const data = Array.isArray(raw.data) ? raw.data.map(normalizeJob) : [];

	return {
		currentPage: Number(raw.currentPage ?? raw.current_page ?? 1),
		data,
		firstPageUrl: toStringValue(raw.firstPageUrl ?? raw.first_page_url),
		from: Number(raw.from ?? 0),
		lastPage: Number(raw.lastPage ?? raw.last_page ?? 1),
		lastPageUrl: toStringValue(raw.lastPageUrl ?? raw.last_page_url),
		links: Array.isArray(raw.links)
			? raw.links.map((link) => ({
					url: link.url ?? null,
					label: toStringValue(link.label),
					active: Boolean(link.active),
				}))
			: [],
		nextPageUrl: raw.nextPageUrl ?? raw.next_page_url ?? null,
		path: toStringValue(raw.path),
		perPage: Number(raw.perPage ?? raw.per_page ?? data.length),
		prevPageUrl: raw.prevPageUrl ?? raw.prev_page_url ?? null,
		to: Number(raw.to ?? data.length),
		total: Number(raw.total ?? data.length),
		distance: raw.distance ?? null,
	};
}

function buildQueryString(params: RequestJobsParams): string {
	const searchParams = new URLSearchParams();

	if (params.keyword) {
		for (const k of params.keyword) {
			searchParams.append("keyword[]", k);
		}
	}
	if (params.jobIds) {
		for (const id of params.jobIds) {
			searchParams.append("jobIds[]", id.toString());
		}
	}
	if (params.minWage !== undefined) {
		searchParams.append("min_wage", params.minWage.toString());
	}
	if (params.maxWage !== undefined) {
		searchParams.append("max_wage", params.maxWage.toString());
	}
	if (params.minCalorie !== undefined) {
		searchParams.append("min_calorie", params.minCalorie.toString());
	}
	if (params.maxCalorie !== undefined) {
		searchParams.append("max_calorie", params.maxCalorie.toString());
	}
	if (params.minSteps !== undefined) {
		searchParams.append("min_steps", params.minSteps.toString());
	}
	if (params.maxSteps !== undefined) {
		searchParams.append("max_steps", params.maxSteps.toString());
	}
	if (params.exerciseLevels) {
		for (const level of params.exerciseLevels) {
			searchParams.append("exercise_levels[]", level.toString());
		}
	}
	if (params.salaryType) {
		searchParams.append("salary_type", params.salaryType);
	}
	if (params.sort) {
		const sortValues = Array.isArray(params.sort) ? params.sort : [params.sort];
		for (const value of sortValues) {
			searchParams.append("sort[]", value);
		}
	}
	if (params.perPage !== undefined) {
		searchParams.append("per_page", params.perPage.toString());
	}
	if (params.page !== undefined) {
		searchParams.append("page", params.page.toString());
	}
	if (params.latitude !== undefined) {
		searchParams.append("latitude", params.latitude.toString());
	}
	if (params.longitude !== undefined) {
		searchParams.append("longitude", params.longitude.toString());
	}

	return searchParams.toString();
}

export default async function fetchJobs({
	params,
}: {
	params: RequestJobsParams;
}) {
	const queryString = buildQueryString(params);
	const url = `${process.env.API_URL}/api/jobs${queryString ? `?${queryString}` : ""}`;

	console.log("[fetchJobs] Request params:", JSON.stringify(params, null, 2));
	console.log("[fetchJobs] Request URL:", url);

	const response = await fetch(url, {
		method: "GET",
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch jobs: ${response.status}`);
	}

	const rawData: ApiJobs = await response.json();
	const data = normalizeJobsResponse(rawData);

	return data;
}
