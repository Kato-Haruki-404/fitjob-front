export function appendPayType(href: string, isDailyWage: boolean): string {
	const basePath = isDailyWage ? "/search/dailywage" : "/search/hourlywage";

	if (href.startsWith(basePath)) {
		return href;
	}

	if (href.startsWith("/search/dailywage")) {
		return href.replace("/search/dailywage", basePath);
	}

	if (href.startsWith("/search/hourlywage")) {
		return href.replace("/search/hourlywage", basePath);
	}

	if (href.startsWith("/search")) {
		return `${basePath}${href.slice("/search".length)}`;
	}

	if (href.startsWith("?")) {
		return `${basePath}${href}`;
	}

	return href;
}
