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
