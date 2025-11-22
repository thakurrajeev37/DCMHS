import { createHomeStore } from "./homeStore.js";
import { createAboutStore } from "./aboutStore.js";
import { createAppStore } from "./appStore.js";
import EventsStore from "./eventsStore.js";
import SocialMediaStore from "./socialMediaStore.js";
import { useStore } from "./StoreContext.jsx";
import { observer } from "mobx-react";

export function createRootStores(initial = {}) {
	return {
		app: createAppStore(initial.app || {}),
		home: createHomeStore(initial.home || {}),
		about: createAboutStore(initial.about || {}),
		events: new EventsStore(),
		socialMedia: new SocialMediaStore(),
	};
}

// Hooks for individual page stores (used inside components)
export function useHomeStore() {
	return useStore().home;
}
export function useAboutStore() {
	return useStore().about;
}
export function useAppStore() {
	return useStore().app;
}
export function useEventsStore() {
	return useStore().events;
}
export function useSocialMediaStore() {
	return useStore().socialMedia;
}

// Optional HOC if needed in future
export const withStores = (Comp) => observer(Comp);
