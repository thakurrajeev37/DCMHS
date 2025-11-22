import React from "react";
import { observer } from "mobx-react";
import { Container, Typography, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useEventsStore } from "../stores/rootStores.js";

const EventsSection = observer(() => {
	const eventsStore = useEventsStore();
	const [selectedEvent, setSelectedEvent] = React.useState(null);
	const [openDialog, setOpenDialog] = React.useState(false);
	const scrollContainerRef = React.useRef(null);
	const events = eventsStore.events;

	const handleEventClick = (event) => {
		setSelectedEvent(event);
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setSelectedEvent(null);
	};

	const handleScrollLeft = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollBy({
				left: -250,
				behavior: "smooth"
			});
		}
	};

	const handleScrollRight = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollBy({
				left: 250,
				behavior: "smooth"
			});
		}
	};

	// Filter to show only future events
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const futureEvents = events.filter(event => {
		// Check if the date is a range
		if (event.date.includes(' - ')) {
			// For date ranges, check if the end date is in the future
			const dates = event.date.split(' - ');
			const endDate = new Date(dates[1].trim());
			endDate.setHours(0, 0, 0, 0);
			return endDate >= today;
		} else {
			// For single dates, check if the date is in the future
			const eventDate = new Date(event.date);
			eventDate.setHours(0, 0, 0, 0);
			return eventDate >= today;
		}
	});

	return (
		<Box sx={{ bgcolor: "#f5f5f5", py: { xs: 4, md: 8 } }}>
			<Container maxWidth="lg">
				<Typography 
					variant="h3" 
					component="h2" 
					textAlign="center"
					sx={{ 
						color: "#3B6866",
						fontWeight: "bold",
						fontSize: { xs: "1.75rem", md: "2.5rem" },
						mb: 4
					}}
				>
					Upcoming Events
				</Typography>
				<Box sx={{ position: "relative" }}>
					{/* Left Scroll Button */}
					<IconButton
						onClick={handleScrollLeft}
						sx={{
							position: "absolute",
							left: -20,
							top: "50%",
							transform: "translateY(-50%)",
							zIndex: 2,
							bgcolor: "white",
							boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
							width: "40px",
							height: "40px",
							"&:hover": {
								bgcolor: "#3B6866",
								color: "white",
							},
							display: { xs: "none", md: "flex" },
						}}
					>
						<ArrowBackIosNewIcon fontSize="small" />
					</IconButton>

					{/* Right Scroll Button */}
					<IconButton
						onClick={handleScrollRight}
						sx={{
							position: "absolute",
							right: -20,
							top: "50%",
							transform: "translateY(-50%)",
							zIndex: 2,
							bgcolor: "white",
							boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
							width: "40px",
							height: "40px",
							"&:hover": {
								bgcolor: "#3B6866",
								color: "white",
							},
							display: { xs: "none", md: "flex" },
						}}
					>
						<ArrowForwardIosIcon fontSize="small" />
					</IconButton>

					<Box
						ref={scrollContainerRef}
						sx={{
							display: "flex",
							gap: 3,
							overflowX: "auto",
							pb: 2,
							scrollBehavior: "smooth",
							"&::-webkit-scrollbar": {
								height: "8px",
							},
							"&::-webkit-scrollbar-track": {
								backgroundColor: "#f1f1f1",
								borderRadius: "10px",
							},
							"&::-webkit-scrollbar-thumb": {
								backgroundColor: "#3B6866",
								borderRadius: "10px",
								"&:hover": {
									backgroundColor: "#2d7a6e",
								},
							},
						}}
					>
					{futureEvents.map((event) => {
						// Check if the date is a range
						const isDateRange = event.date.includes('-') && event.date.split('-').length > 1;
						
						let displayContent;
						if (isDateRange) {
							// Extract start and end dates from range
							const dates = event.date.split(' - ');
							const startDate = new Date(dates[0].trim());
							const endDate = new Date(dates[1].trim());
							const startMonth = startDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
							const endMonth = endDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
							const startDay = startDate.getDate();
							const endDay = endDate.getDate();
							
							displayContent = (
								<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
									<Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
										<Typography
											variant="caption"
											sx={{
												color: "#666",
												fontSize: "0.6rem",
												fontWeight: 500,
											}}
										>
											{startMonth}
										</Typography>
										<Typography
											variant="h6"
											sx={{
												color: "#3B6866",
												fontWeight: "bold",
												lineHeight: 1,
											}}
										>
											{startDay}
										</Typography>
									</Box>
									<Typography
										variant="caption"
										sx={{
											color: "#666",
											fontSize: "0.6rem",
										}}
									>
										to
									</Typography>
									<Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
										<Typography
											variant="caption"
											sx={{
												color: "#666",
												fontSize: "0.6rem",
												fontWeight: 500,
											}}
										>
											{endMonth}
										</Typography>
										<Typography
											variant="h6"
											sx={{
												color: "#3B6866",
												fontWeight: "bold",
												lineHeight: 1,
											}}
										>
											{endDay}
										</Typography>
									</Box>
								</Box>
							);
						} else {
							const eventDate = new Date(event.date);
							const month = eventDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
							const day = eventDate.getDate();
							
							displayContent = (
								<>
									<Typography
										variant="caption"
										sx={{
											color: "#666",
											fontSize: "0.875rem",
											fontWeight: 500,
										}}
									>
										{month}
									</Typography>
									<Typography
										variant="h4"
										sx={{
											color: "#3B6866",
											fontWeight: "bold",
											lineHeight: 1,
										}}
									>
										{day}
									</Typography>
								</>
							);
						}
						
						return (
							<Box
								key={event.id}
								sx={{
									minWidth: "220px",
									textAlign: "center",
									cursor: "pointer",
									"&:hover": {
										"& .event-title": {
											color: "#2d7a6e",
										}
									}
								}}
								onClick={() => handleEventClick(event)}
							>
									<Box
										sx={{
											width: "120px",
											height: "120px",
											borderRadius: "50%",
											border: "3px solid #e0e0e0",
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
											margin: "0 auto 16px",
											bgcolor: "white",
											padding: "8px",
										}}
									>
										{displayContent}
									</Box>
									<Typography
										variant="h6"
										className="event-title"
										sx={{
											color: "#333",
											fontWeight: 600,
											mb: 1,
											transition: "color 0.3s",
											minHeight: "48px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										{event.title}
									</Typography>
									<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5, color: "#666" }}>
										<Typography variant="body2">
											⏰ {event.time}
										</Typography>
									</Box>
							</Box>
						);
					})}
					</Box>
				</Box>

				{/* View All Events Link */}
				<Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
					<Button
						component={RouterLink}
						to="/events"
						variant="outlined"
						endIcon={<ArrowForwardIcon />}
						sx={{
							color: "#3B6866",
							borderColor: "#3B6866",
							fontWeight: 600,
							px: 4,
							py: 1.5,
							textTransform: "none",
							fontSize: "1rem",
							"&:hover": {
								borderColor: "#3B6866",
								bgcolor: "#3B6866",
								color: "white",
							},
						}}
					>
						View All Events
					</Button>
				</Box>
			</Container>

			{/* Event Details Dialog */}
			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				maxWidth="sm"
				fullWidth
				PaperProps={{
					sx: {
						borderTop: "4px solid #F7CA02",
					}
				}}
			>
				<DialogTitle sx={{ bgcolor: "#3B6866", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<Typography variant="h6" fontWeight="bold">
						{selectedEvent?.title}
					</Typography>
					<IconButton
						edge="end"
						color="inherit"
						onClick={handleCloseDialog}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent sx={{ mt: 2 }}>
					<Box sx={{ mb: 2 }}>
						<Typography variant="body1" color="text.secondary" gutterBottom>
							📅 <strong>Date:</strong> {selectedEvent?.date}
						</Typography>
						<Typography variant="body1" color="text.secondary" gutterBottom>
							⏰ <strong>Time:</strong> {selectedEvent?.time}
						</Typography>
						<Typography variant="body1" color="text.secondary" gutterBottom>
							📍 <strong>Location:</strong> {selectedEvent?.location}
						</Typography>
					</Box>
					<Box sx={{ bgcolor: "#f9f9f9", p: 2, borderRadius: 1, borderLeft: "4px solid #3B6866" }}>
						<Typography variant="body1" sx={{ lineHeight: 1.8 }}>
							{selectedEvent?.fullDesc}
						</Typography>
					</Box>
				</DialogContent>
				<DialogActions sx={{ p: 2 }}>
					<Button 
						onClick={handleCloseDialog} 
						variant="contained"
						sx={{ 
							bgcolor: "#3B6866",
							"&:hover": { bgcolor: "#2d7a6e" }
						}}
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
});

export default EventsSection;
