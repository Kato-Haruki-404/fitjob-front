/**
 * Append type=dailyWage parameter to a URL if isDailyWage is true
 */
export function appendPayType(href: string, isDailyWage: boolean): string {
	if (!isDailyWage) {
		return href;
	}

	const separator = href.includes("?") ? "&" : "?";
	return `${href}${separator}type=dailyWage`;
}

/**
 * Process an array of items with href and append pay type to each
 */
export function appendPayTypeToItems<T extends { href: string }>(
	items: T[],
	isDailyWage: boolean,
): T[] {
	if (!isDailyWage) {
		return items;
	}

	return items.map((item) => ({
		...item,
		href: appendPayType(item.href, isDailyWage),
	}));
}
