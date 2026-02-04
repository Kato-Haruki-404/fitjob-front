"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "favoriteJobIds";

// Cache empty array for server snapshot to prevent infinite loop
const EMPTY_ARRAY: number[] = [];

// Cached snapshot to maintain referential equality
let cachedFavorites: number[] = EMPTY_ARRAY;
let isInitialized = false;

function getStoredFavorites(): number[] {
	if (typeof window === "undefined") {
		return EMPTY_ARRAY;
	}
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			const parsed = JSON.parse(stored);
			if (Array.isArray(parsed)) {
				return parsed.filter((id): id is number => typeof id === "number");
			}
		}
	} catch (e) {
		console.error("Failed to parse favorites from localStorage:", e);
	}
	return EMPTY_ARRAY;
}

function setStoredFavorites(ids: number[]): void {
	if (typeof window === "undefined") {
		return;
	}
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
		// Dispatch a custom event so other components using this hook can sync
		window.dispatchEvent(new CustomEvent("favorites-changed"));
	} catch (e) {
		console.error("Failed to save favorites to localStorage:", e);
	}
}

function subscribe(callback: () => void): () => void {
	const handleStorageChange = (e: StorageEvent) => {
		if (e.key === STORAGE_KEY) {
			const newFavorites = getStoredFavorites();
			cachedFavorites = newFavorites;
			callback();
		}
	};

	const handleFavoritesChanged = () => {
		const newFavorites = getStoredFavorites();
		cachedFavorites = newFavorites;
		callback();
	};

	window.addEventListener("storage", handleStorageChange);
	window.addEventListener("favorites-changed", handleFavoritesChanged);

	return () => {
		window.removeEventListener("storage", handleStorageChange);
		window.removeEventListener("favorites-changed", handleFavoritesChanged);
	};
}

function getSnapshot(): number[] {
	if (typeof window === "undefined") {
		return EMPTY_ARRAY;
	}
	// Only read from localStorage on first call
	if (!isInitialized) {
		cachedFavorites = getStoredFavorites();
		isInitialized = true;
	}
	return cachedFavorites;
}

function getServerSnapshot(): number[] {
	return EMPTY_ARRAY;
}

export function useFavorites() {
	const favorites = useSyncExternalStore(
		subscribe,
		getSnapshot,
		getServerSnapshot,
	);

	const addFavorite = useCallback((id: number) => {
		const current = getStoredFavorites();
		if (!current.includes(id)) {
			const updated = [id, ...current];
			cachedFavorites = updated;
			setStoredFavorites(updated);
		}
	}, []);

	const removeFavorite = useCallback((id: number) => {
		const current = getStoredFavorites();
		const updated = current.filter((fid) => fid !== id);
		cachedFavorites = updated;
		setStoredFavorites(updated);
	}, []);

	const toggleFavorite = useCallback((id: number) => {
		const current = getStoredFavorites();
		let updated: number[];
		if (current.includes(id)) {
			updated = current.filter((fid) => fid !== id);
		} else {
			updated = [id, ...current];
		}
		cachedFavorites = updated;
		setStoredFavorites(updated);
	}, []);

	const isFavorite = useCallback(
		(id: number) => {
			return favorites.includes(id);
		},
		[favorites],
	);

	return {
		favorites,
		isLoaded: true, // With useSyncExternalStore, we're always "loaded"
		addFavorite,
		removeFavorite,
		toggleFavorite,
		isFavorite,
	};
}
