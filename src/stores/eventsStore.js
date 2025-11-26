import { makeObservable, observable, action, runInAction } from "mobx";
import axios from "axios";

class EventsStore {
	events = [];
	loading = false;
	error = null;

	constructor() {
		makeObservable(this, {
			events: observable,
			loading: observable,
			error: observable,
			fetchEvents: action,
		});
		this.fetchEvents();
	}

	async fetchEvents() {
		this.loading = true;
		this.error = null;
		try {
			const response = await axios.get("/api/events");
			runInAction(() => {
				this.events = response.data.events;
				this.loading = false;
			});
		} catch (err) {
			runInAction(() => {
				this.error = err.response?.data?.error || "Failed to fetch events";
				this.loading = false;
			});
		}
	}
}

export default EventsStore;
