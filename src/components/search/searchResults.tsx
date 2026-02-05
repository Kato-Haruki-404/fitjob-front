import Pagination from "@/components/pagination";
import JobCardList from "@/components/search/jobCardList";
import SearchSidebar from "@/components/search/searchSidebar";
import SortControls from "@/components/sortControls";
import type { Job } from "@/lib/fetchJobs";

type SearchResultsProps = {
	jobs: Job[];
	total: number;
	currentPage: number;
	totalPages: number;
	baseUrl: string;
	searchParams?: Record<string, string | string[] | undefined>;
};

export default function SearchResults({
	jobs,
	total,
	currentPage,
	totalPages,
	baseUrl,
	searchParams,
}: SearchResultsProps) {
	return (
		<>
			<SearchSidebar total={total} />
			<section className="flex flex-1 flex-col gap-6">
				<div className="flex w-full justify-end">
					<SortControls />
				</div>
				<JobCardList jobs={jobs} />
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					baseUrl={baseUrl}
					searchParams={searchParams}
				/>
			</section>
		</>
	);
}
