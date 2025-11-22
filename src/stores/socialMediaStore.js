import { makeObservable, observable, action, runInAction, computed } from "mobx";
import axios from "axios";

class SocialMediaStore {
	instagramPosts = [];
	facebookPosts = [];
	loading = true;
	loadingMore = false;
	error = null;
	instagramNextPageUrl = null;
	facebookNextPageUrl = null;
	instagramHasMore = false;
	facebookHasMore = false;

	constructor() {
		makeObservable(this, {
			instagramPosts: observable,
			facebookPosts: observable,
			loading: observable,
			loadingMore: observable,
			error: observable,
			instagramNextPageUrl: observable,
			facebookNextPageUrl: observable,
			instagramHasMore: observable,
			facebookHasMore: observable,
			fetchInstagramPosts: action,
			fetchFacebookPosts: action,
			loadMoreInstagramPosts: action,
			loadMoreFacebookPosts: action,
			allPosts: computed,
		});
	}

	async fetchFacebookPosts(accessToken, pageId) {
		// Check if credentials are configured
		if (!accessToken || !pageId || 
			accessToken === 'your_facebook_access_token_here' ||
			pageId === 'your_facebook_page_id_here') {
			return; // Silently skip if not configured
		}

		try {
			console.log("Fetching Facebook posts for Page ID:", pageId);
			
			// Fetch Facebook page posts using /posts endpoint (more reliable than /feed)
			const response = await axios.get(
				`https://graph.facebook.com/v21.0/${pageId}/posts`,
				{
					params: {
						fields: 'id,message,created_time,full_picture,permalink_url,attachments{media,type,url}',
						access_token: accessToken,
						limit: 8 // Fetch 8 Facebook posts
					}
				}
			);

			console.log("Facebook API Response:", response.data);
			
			runInAction(() => {
				this.facebookPosts = response.data.data.map(post => ({
					id: post.id,
					caption: post.message || "",
					media_url: post.full_picture || post.attachments?.data[0]?.media?.image?.src || "",
					permalink: post.permalink_url,
					timestamp: post.created_time,
					platform: "facebook"
				}));
				
				// Check if there's a next page for Facebook
				if (response.data.paging?.next) {
					this.facebookNextPageUrl = response.data.paging.next;
					this.facebookHasMore = true;
				} else {
					this.facebookHasMore = false;
				}
				
				console.log("Facebook posts loaded:", this.facebookPosts.length);
			});
		} catch (err) {
			console.error("Error fetching Facebook posts:", err);
			console.error("Facebook API Error Details:", err.response?.data);
			
			// Check for common errors
			if (err.response?.data?.error?.code === 190) {
				console.error("❌ FACEBOOK TOKEN ERROR: You need a PAGE Access Token, not a User Access Token!");
				console.error("📖 Follow these steps:");
				console.error("1. Go to https://developers.facebook.com/tools/explorer/");
				console.error("2. Generate token with pages_read_engagement permission");
				console.error("3. Type 'me/accounts' and Submit");
				console.error("4. Copy the 'access_token' for YOUR page (not the user token)");
				console.error("5. Update VITE_FACEBOOK_ACCESS_TOKEN in .env file");
			}
			
			// Don't set error state for Facebook failures, but log for debugging
		}
	}

	async fetchInstagramPosts(accessToken, userId) {
		// Check if credentials are configured
		if (!accessToken || !userId || 
			accessToken === 'your_instagram_access_token_here' ||
			userId === 'your_instagram_user_id_here') {
			runInAction(() => {
				this.error = "Instagram API credentials not configured. Please set VITE_INSTAGRAM_ACCESS_TOKEN and VITE_INSTAGRAM_USER_ID in .env file";
				this.loading = false;
			});
			return;
		}

		try {
			// Fetch user's media using Instagram Basic Display API
			const response = await axios.get(
				`https://graph.instagram.com/${userId}/media`,
				{
					params: {
						fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count',
						access_token: accessToken,
						limit: 8 // Fetch 8 posts initially
					}
				}
			);

			runInAction(() => {
				this.instagramPosts = response.data.data.map(post => ({
					...post,
					platform: "instagram"
				}));
				
				// Check if there's a next page for Instagram
				if (response.data.paging?.next) {
					this.instagramNextPageUrl = response.data.paging.next;
					this.instagramHasMore = true;
				} else {
					this.instagramHasMore = false;
				}
				
				this.loading = false;
			});
		} catch (err) {
			console.error("Error fetching Instagram posts:", err);
			runInAction(() => {
				this.error = err.response?.data?.error?.message || "Failed to load Instagram posts. Please check your API credentials.";
				this.loading = false;
			});
		}
	}

	async loadMoreInstagramPosts() {
		if (!this.instagramNextPageUrl || this.loadingMore) return;

		this.loadingMore = true;
		
		try {
			const response = await axios.get(this.instagramNextPageUrl);
			
			runInAction(() => {
				// Append new posts to existing ones
				const newPosts = response.data.data.map(post => ({
					...post,
					platform: "instagram"
				}));
				this.instagramPosts = [...this.instagramPosts, ...newPosts];
				
				// Update next page URL for Instagram
				if (response.data.paging?.next) {
					this.instagramNextPageUrl = response.data.paging.next;
					this.instagramHasMore = true;
				} else {
					this.instagramNextPageUrl = null;
					this.instagramHasMore = false;
				}
				
				this.loadingMore = false;
			});
		} catch (err) {
			console.error("Error loading more Instagram posts:", err);
			runInAction(() => {
				this.loadingMore = false;
			});
		}
	}

	async loadMoreFacebookPosts() {
		if (!this.facebookNextPageUrl || this.loadingMore) return;

		this.loadingMore = true;
		
		try {
			const response = await axios.get(this.facebookNextPageUrl);
			
			runInAction(() => {
				// Append new Facebook posts to existing ones
				const newPosts = response.data.data.map(post => ({
					id: post.id,
					caption: post.message || "",
					media_url: post.full_picture || post.attachments?.data[0]?.media?.image?.src || "",
					permalink: post.permalink_url,
					timestamp: post.created_time,
					platform: "facebook"
				}));
				this.facebookPosts = [...this.facebookPosts, ...newPosts];
				
				// Update next page URL for Facebook
				if (response.data.paging?.next) {
					this.facebookNextPageUrl = response.data.paging.next;
					this.facebookHasMore = true;
				} else {
					this.facebookNextPageUrl = null;
					this.facebookHasMore = false;
				}
				
				this.loadingMore = false;
			});
		} catch (err) {
			console.error("Error loading more Facebook posts:", err);
			runInAction(() => {
				this.loadingMore = false;
			});
		}
	}

	// Get combined posts sorted by timestamp
	get allPosts() {
		const combined = [...this.instagramPosts, ...this.facebookPosts];
		return combined.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
	}
}

export default SocialMediaStore;
