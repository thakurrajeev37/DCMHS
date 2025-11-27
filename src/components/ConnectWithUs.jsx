import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Container, Typography, Box, IconButton, Card, CardMedia, CardContent, CircularProgress, Alert, Tabs, Tab } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { useSocialMediaStore } from "../stores/rootStores.js";

const ConnectWithUs = observer(() => {
	const socialMediaStore = useSocialMediaStore();
	const [selectedTab, setSelectedTab] = useState(0); // 0 = All, 1 = Instagram, 2 = Facebook

	// Get API credentials from environment variables
	const INSTAGRAM_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
	const INSTAGRAM_USER_ID = import.meta.env.VITE_INSTAGRAM_USER_ID;
	const FACEBOOK_TOKEN = import.meta.env.VITE_FACEBOOK_ACCESS_TOKEN;
	const FACEBOOK_PAGE_ID = import.meta.env.VITE_FACEBOOK_PAGE_ID;

	useEffect(() => {
		// Debug: Check if environment variables are loaded
		console.log("Environment Variables Check:", {
			hasInstagramToken: !!INSTAGRAM_TOKEN,
			hasInstagramUserId: !!INSTAGRAM_USER_ID,
			hasFacebookToken: !!FACEBOOK_TOKEN,
			hasFacebookPageId: !!FACEBOOK_PAGE_ID,
			instagramTokenPrefix: INSTAGRAM_TOKEN?.substring(0, 10),
			facebookTokenPrefix: FACEBOOK_TOKEN?.substring(0, 10)
		});
		
		// Fetch both Instagram and Facebook posts
		socialMediaStore.fetchInstagramPosts(INSTAGRAM_TOKEN, INSTAGRAM_USER_ID);
		socialMediaStore.fetchFacebookPosts(FACEBOOK_TOKEN, FACEBOOK_PAGE_ID);
	}, [socialMediaStore, INSTAGRAM_TOKEN, INSTAGRAM_USER_ID, FACEBOOK_TOKEN, FACEBOOK_PAGE_ID]);

	// Load more posts function
	const handleLoadMore = () => {
		if (selectedTab === 1) {
			socialMediaStore.loadMoreInstagramPosts();
		} else if (selectedTab === 2) {
			socialMediaStore.loadMoreFacebookPosts();
		} else {
			// For "All" tab, load more based on which has more posts
			if (socialMediaStore.instagramHasMore) {
				socialMediaStore.loadMoreInstagramPosts();
			}
			if (socialMediaStore.facebookHasMore) {
				socialMediaStore.loadMoreFacebookPosts();
			}
		}
	};

	// Handle tab change
	const handleTabChange = (event, newValue) => {
		setSelectedTab(newValue);
	};

	// Filter posts based on selected tab
	const getFilteredPosts = () => {
		if (selectedTab === 0) {
			return socialMediaStore.allPosts; // All posts
		} else if (selectedTab === 1) {
			return socialMediaStore.instagramPosts; // Instagram only
		} else {
			return socialMediaStore.facebookPosts; // Facebook only
		}
	};

	const filteredPosts = getFilteredPosts();

	// Debug logging
	console.log("Selected Tab:", selectedTab);
	console.log("Instagram Posts:", socialMediaStore.instagramPosts.length);
	console.log("Facebook Posts:", socialMediaStore.facebookPosts.length);
	console.log("Filtered Posts:", filteredPosts.length);

	return (
		<Box sx={{ py: { xs: 4, md: 8 }, bgcolor: "white", width: "100%", overflow: "hidden" }}>
			<Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
				<Typography 
					variant="h3" 
					component="h2" 
					textAlign="center"
					sx={{ 
						color: "#3B6866",
						fontWeight: "bold",
						fontSize: { xs: "1.75rem", md: "2.5rem" },
						mb: 2
					}}
				>
					Connect With Us
				</Typography>
				<Typography 
					variant="body1" 
					textAlign="center"
					sx={{ 
						color: "#666",
						mb: 4,
						maxWidth: "600px",
						mx: "auto"
					}}
				>
					Stay updated with our latest news, events, and student achievements on social media
				</Typography>

				{/* Social Media Icons */}
				<Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
					<IconButton
						component="a"
						href="https://www.facebook.com/dcmodernschool"
						target="_blank"
						rel="noopener noreferrer"
						sx={{
							bgcolor: "#1877F2",
							color: "white",
							width: 50,
							height: 50,
							"&:hover": {
								bgcolor: "#166FE5",
							}
						}}
					>
						<FacebookIcon />
					</IconButton>
					<IconButton
						component="a"
						href="https://www.instagram.com/d.c.m.school/"
						target="_blank"
						rel="noopener noreferrer"
						sx={{
							bgcolor: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)",
							background: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)",
							color: "white",
							width: 50,
							height: 50,
							"&:hover": {
								opacity: 0.9,
							}
						}}
					>
						<InstagramIcon />
					</IconButton>
				</Box>

				{/* Tabs for filtering posts */}
				<Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
					<Tabs 
						value={selectedTab} 
						onChange={handleTabChange}
						sx={{
							"& .MuiTab-root": {
								color: "#666",
								fontWeight: 500,
								fontSize: "1rem",
								textTransform: "none",
								minWidth: { xs: 100, sm: 120 },
								"&.Mui-selected": {
									color: "#3B6866",
									fontWeight: 600,
								}
							},
							"& .MuiTabs-indicator": {
								backgroundColor: "#3B6866",
								height: 3,
							}
						}}
					>
						<Tab 
							label="All Posts" 
							icon={<Box sx={{ display: "flex", gap: 0.5 }}>
								<InstagramIcon sx={{ fontSize: "1.2rem" }} />
								<FacebookIcon sx={{ fontSize: "1.2rem" }} />
							</Box>}
							iconPosition="start"
						/>
						<Tab 
							label="Instagram" 
							icon={<InstagramIcon />}
							iconPosition="start"
						/>
						<Tab 
							label="Facebook" 
							icon={<FacebookIcon />}
							iconPosition="start"
						/>
					</Tabs>
				</Box>

				{/* Loading State */}
				{socialMediaStore.loading && (
					<Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
						<CircularProgress sx={{ color: "#3B6866" }} />
					</Box>
				)}

				{/* Error State */}
				{socialMediaStore.error && (
					<Alert severity="warning" sx={{ mb: 4 }}>
						{socialMediaStore.error}
						<Typography variant="body2" sx={{ mt: 1 }}>
							To use Instagram API:
							<ol style={{ marginTop: 8, paddingLeft: 20 }}>
								<li>Create a Facebook App at <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer">developers.facebook.com</a></li>
								<li>Add Instagram Basic Display product</li>
								<li>Generate an Access Token and User ID</li>
								<li>Add them to your .env file as VITE_INSTAGRAM_ACCESS_TOKEN and VITE_INSTAGRAM_USER_ID</li>
							</ol>
						</Typography>
					</Alert>
				)}

				{/* Social Media Posts Grid */}
				{!socialMediaStore.loading && !socialMediaStore.error && filteredPosts.length > 0 && (
					<Box 
						sx={{ 
							display: "grid",
							gridTemplateColumns: {
								xs: "1fr",
								sm: "repeat(2, 1fr)",
								md: "repeat(3, 1fr)",
								lg: "repeat(4, 1fr)"
							},
							gap: { xs: 2, sm: 3 },
							px: { xs: 1, sm: 0 }
						}}
					>
						{filteredPosts.map((post) => (
							<Card 
								key={post.id}
								component="a"
								href={post.permalink}
								target="_blank"
								rel="noopener noreferrer"
								sx={{ 
									display: "flex",
									flexDirection: "column",
									textDecoration: "none",
									transition: "transform 0.3s, box-shadow 0.3s",
									"&:hover": {
										transform: "translateY(-8px)",
										boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
									}
								}}
							>
								{/* Instagram Badge */}
							<Box 
								sx={{ 
									position: "absolute",
									top: 10,
									right: 10,
									bgcolor: post.platform === "instagram" ? "#E4405F" : "#1877F2",
									borderRadius: "50%",
									width: 32,
									height: 32,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									zIndex: 1,
									boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
								}}
							>
								{post.platform === "instagram" ? (
									<InstagramIcon sx={{ color: "white", fontSize: "1rem" }} />
								) : (
									<FacebookIcon sx={{ color: "white", fontSize: "1rem" }} />
								)}
							</Box>								{/* Post Image/Video */}
								<CardMedia
									component="img"
									height="250"
									image={post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url}
									alt={post.caption || "Instagram post"}
									sx={{ 
										objectFit: "cover",
										bgcolor: "#f5f5f5"
									}}
								/>

								{/* Post Caption and Stats */}
								<CardContent sx={{ flexGrow: 1 }}>
									<Typography 
										variant="body2" 
										color="text.secondary"
										sx={{
											display: "-webkit-box",
											WebkitLineClamp: 3,
											WebkitBoxOrient: "vertical",
											overflow: "hidden",
											textOverflow: "ellipsis",
											lineHeight: 1.6,
											minHeight: "4.8em"
										}}
									>
										{post.caption || "No caption"}
									</Typography>

									{/* Engagement Stats */}
									<Box sx={{ display: "flex", gap: 2, mt: 2 }}>
										{post.like_count !== undefined && (
											<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
												<FavoriteIcon sx={{ fontSize: "1rem", color: "#E4405F" }} />
												<Typography variant="caption">{post.like_count}</Typography>
											</Box>
										)}
										{post.comments_count !== undefined && (
											<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
												<CommentIcon sx={{ fontSize: "1rem", color: "#666" }} />
												<Typography variant="caption">{post.comments_count}</Typography>
											</Box>
										)}
									</Box>

									{/* Post Date */}
									<Typography 
										variant="caption" 
										color="text.secondary"
										sx={{ display: "block", mt: 1 }}
									>
										{new Date(post.timestamp).toLocaleDateString('en-US', { 
											month: 'short', 
											day: 'numeric', 
											year: 'numeric' 
										})}
									</Typography>
								</CardContent>
							</Card>
						))}
					</Box>
				)}

				{/* No Posts Message */}
				{!socialMediaStore.loading && !socialMediaStore.error && filteredPosts.length === 0 && (
					<Box sx={{ textAlign: "center", py: 8 }}>
						<Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
							No posts available
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{selectedTab === 1 && "Instagram posts will appear here once configured."}
							{selectedTab === 2 && "Facebook posts will appear here once configured."}
							{selectedTab === 0 && "Connect your social media accounts to display posts."}
						</Typography>
					</Box>
				)}

				{/* Load More Button */}
				{!socialMediaStore.loading && !socialMediaStore.error && (
					(selectedTab === 0 && (socialMediaStore.instagramHasMore || socialMediaStore.facebookHasMore)) ||
					(selectedTab === 1 && socialMediaStore.instagramHasMore) ||
					(selectedTab === 2 && socialMediaStore.facebookHasMore)
				) && (
					<Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
						<button
							onClick={handleLoadMore}
							disabled={socialMediaStore.loadingMore}
							style={{
								padding: "12px 32px",
								fontSize: "1rem",
								fontWeight: 500,
								color: "white",
								backgroundColor: socialMediaStore.loadingMore ? "#9E9E9E" : "#3B6866",
								border: "none",
								borderRadius: "8px",
								cursor: socialMediaStore.loadingMore ? "not-allowed" : "pointer",
								transition: "all 0.3s",
								boxShadow: "0 2px 8px rgba(59, 104, 102, 0.2)",
								display: "flex",
								alignItems: "center",
								gap: "8px"
							}}
							onMouseEnter={(e) => {
								if (!socialMediaStore.loadingMore) e.target.style.backgroundColor = "#2d5250";
							}}
							onMouseLeave={(e) => {
								if (!socialMediaStore.loadingMore) e.target.style.backgroundColor = "#3B6866";
							}}
						>
							{socialMediaStore.loadingMore ? (
								<>
									<CircularProgress size={20} sx={{ color: "white" }} />
									Loading...
								</>
							) : (
								"Load More Posts"
							)}
						</button>
					</Box>
				)}

				{/* Follow Us CTA */}
				<Box sx={{ textAlign: "center", mt: 4 }}>
					<Typography variant="body1" sx={{ color: "#666" }}>
						Follow us for daily updates and highlights from our school community!
					</Typography>
				</Box>
			</Container>
		</Box>
	);
});

export default ConnectWithUs;
