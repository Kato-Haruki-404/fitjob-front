"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "jobHistory";
const MAX_HISTORY_SIZE = 100;

function getStoredHistory(): number[] {
	if (typeof window === "undefined") {
		return [];
	}
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) {
			return [];
		}
		const parsed = JSON.parse(stored);
		if (Array.isArray(parsed) && parsed.every((id) => typeof id === "number")) {
			return parsed;
		}
		return [];
	} catch {
		return [];
	}
}

function saveHistory(ids: number[]): void {
	if (typeof window === "undefined") {
		return;
	}
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
		// Dispatch a custom event so other components using this hook can sync
		window.dispatchEvent(new CustomEvent("history-changed"));
	} catch {
		// Storage might be full or unavailable
	}
}

// Cache empty array for server snapshot to prevent infinite loop
const EMPTY_ARRAY: number[] = [];

// Cached snapshot to maintain referential equality
let cachedHistory: number[] = EMPTY_ARRAY;
let isInitialized = false;

function subscribe(callback: () => void): () => void {
	const handleStorageChange = (e: StorageEvent) => {
		if (e.key === STORAGE_KEY) {
			const newHistory = getStoredHistory();
			cachedHistory = newHistory;
			callback();
		}
	};

	const handleHistoryChanged = () => {
		const newHistory = getStoredHistory();
		cachedHistory = newHistory;
		callback();
	};

	window.addEventListener("storage", handleStorageChange);
	window.addEventListener("history-changed", handleHistoryChanged);

	return () => {
		window.removeEventListener("storage", handleStorageChange);
		window.removeEventListener("history-changed", handleHistoryChanged);
	};
}

function getSnapshot(): number[] {
	if (typeof window === "undefined") {
		return EMPTY_ARRAY;
	}
	// Only read from localStorage on first call
	if (!isInitialized) {
		cachedHistory = getStoredHistory();
		isInitialized = true;
	}
	return cachedHistory;
}

function getServerSnapshot(): number[] {
	return EMPTY_ARRAY;
}

export function useHistory() {
	const history = useSyncExternalStore(
		subscribe,
		getSnapshot,
		getServerSnapshot,
	);

	// Add a job ID to history (moves to front if already exists)
	const addToHistory = useCallback((id: number) => {
		const current = getStoredHistory();
		// Remove if already exists
		const filtered = current.filter((existingId) => existingId !== id);
		// Add to front
		const updated = [id, ...filtered];
		// Limit size
		const limited = updated.slice(0, MAX_HISTORY_SIZE);
		cachedHistory = limited;
		saveHistory(limited);
	}, []);

	// Remove a job ID from history
	const removeFromHistory = useCallback((id: number) => {
		const current = getStoredHistory();
		const updated = current.filter((existingId) => existingId !== id);
		cachedHistory = updated;
		saveHistory(updated);
	}, []);

	// Check if a job ID is in history
	const isInHistory = useCallback(
		(id: number) => {
			return history.includes(id);
		},
		[history],
	);

	// Clear all history
	const clearHistory = useCallback(() => {
		cachedHistory = EMPTY_ARRAY;
		saveHistory([]);
	}, []);

	return {
		history,
		isLoaded: true, // With useSyncExternalStore, we're always "loaded"
		addToHistory,
		removeFromHistory,
		isInHistory,
		clearHistory,
	};
}
