import { useState } from "react";

export function useWideToggle() {
	const [isTrue, setIsTrue] = useState(false);
	const toggleOn = () => setIsTrue(true);
	const toggleOff = () => setIsTrue(false);
	return { isTrue, toggleOn, toggleOff };
}
