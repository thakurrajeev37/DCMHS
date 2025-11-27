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

	// Filter to show only future events and sort by date
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const futureEvents = events
		.filter(event => {
			if (!event.date) return false;
			
			// For single dates, check if the date is in the future
			const eventDate = new Date(event.date);
			eventDate.setHours(0, 0, 0, 0);
			return eventDate >= today;
		})
		.sort((a, b) => {
			// Sort by date in ascending order (earliest first)
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);
			return dateA - dateB;
		});

	return (
		<Box sx={{ bgcolor: "white", py: { xs: 4, md: 8 }, width: "100%", overflow: "hidden" }}>
			<Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
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
				<Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
					<Button
						component={RouterLink}
						to="/events"
						variant="text"
						endIcon={<ArrowForwardIcon />}
						sx={{
							color: "#3B6866",
							fontWeight: 600,
							textTransform: "none",
							fontSize: "1rem",
							"&:hover": {
								bgcolor: "transparent",
								textDecoration: "underline",
								textDecorationColor: "#F7CA02",
							},
						}}
					>
						VIEW FULL CALENDAR
					</Button>
				</Box>

				<Box 
					ref={scrollContainerRef}
					sx={{ 
						display: "flex", 
						gap: 2, 
						overflowX: "auto", 
						pb: 2,
						px: { xs: 1, md: 0 },
						scrollBehavior: "smooth",
						"&::-webkit-scrollbar": {
							height: 8
						},
						"&::-webkit-scrollbar-track": {
							bgcolor: "#f1f1f1",
							borderRadius: 4
						},
						"&::-webkit-scrollbar-thumb": {
							bgcolor: "#3B6866",
							borderRadius: 4,
							"&:hover": {
								bgcolor: "#2d5a58"
							}
						}
					}}
				>
					{futureEvents.map((event) => {
						if (!event.date) return null;
						
						// Parse the event date
						const eventDate = new Date(event.date);
						const dayName = eventDate.toLocaleString('en-US', { weekday: 'long' }).toUpperCase();
						const month = eventDate.toLocaleString('en-US', { month: 'long' }).toUpperCase();
						const day = eventDate.getDate();
						
						// For multi-day events
						let endDayName, endMonth, endDay;
						if (event.isRange && event.endDate) {
							const endEventDate = new Date(event.endDate);
							endDayName = endEventDate.toLocaleString('en-US', { weekday: 'long' }).toUpperCase();
							endMonth = endEventDate.toLocaleString('en-US', { month: 'long' }).toUpperCase();
							endDay = endEventDate.getDate();
						}
						
						return (
							<Box
								key={event._id}
								sx={{
									minWidth: { xs: "240px", sm: "260px", md: "280px" },
									maxWidth: { xs: "calc(100vw - 48px)" },
									cursor: "pointer",
									"&:hover": {
										"& .event-card": {
											transform: "translateY(-4px)",
											boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
										}
									}
								}}
								onClick={() => handleEventClick(event)}
							>
								<Box
									className="event-card"
									sx={{
										bgcolor: "white",
										borderRadius: 0,
										overflow: "hidden",
										boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
										transition: "all 0.3s ease",
									}}
								>
									{/* Date Header */}
									<Box
										sx={{
											bgcolor: "#3B6866",
											color: "white",
											py: 2,
											px: 2,
											textAlign: "center",
										}}
									>
										{event.isRange && event.endDate ? (
											// Multi-day event - show date range
											<>
												<Typography
													variant="body2"
													sx={{
														fontWeight: 600,
														fontSize: "0.875rem",
														letterSpacing: "0.5px",
													}}
												>
													{dayName} - {endDayName}
												</Typography>
												<Typography
													variant="body2"
													sx={{
														fontWeight: 600,
														fontSize: "0.875rem",
														letterSpacing: "0.5px",
														mt: 0.5,
													}}
												>
													{month === endMonth ? month : `${month} - ${endMonth}`}
												</Typography>
												<Typography
													variant="h2"
													sx={{
														fontWeight: "bold",
														fontSize: "2.5rem",
														lineHeight: 1,
														mt: 1,
													}}
												>
													{day} - {endDay}
												</Typography>
											</>
										) : (
											// Single day event
											<>
												<Typography
													variant="body2"
													sx={{
														fontWeight: 600,
														fontSize: "0.875rem",
														letterSpacing: "0.5px",
													}}
												>
													{dayName}
												</Typography>
												<Typography
													variant="body2"
													sx={{
														fontWeight: 600,
														fontSize: "0.875rem",
														letterSpacing: "0.5px",
														mt: 0.5,
													}}
												>
													{month}
												</Typography>
												<Typography
													variant="h2"
													sx={{
														fontWeight: "bold",
														fontSize: "3rem",
														lineHeight: 1,
														mt: 1,
													}}
												>
													{day}
												</Typography>
											</>
										)}
									</Box>

									{/* Event Content */}
									<Box sx={{ p: 2.5, minHeight: "100px", display: "flex", flexDirection: "column" }}>
										<Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
											<Box
												sx={{
													width: "8px",
													height: "8px",
													borderRadius: "50%",
													bgcolor: event.color || "#4CAF50",
													mt: 0.8,
													mr: 1,
													flexShrink: 0,
												}}
											/>
											<Typography
												variant="h6"
												sx={{
													color: "#333",
													fontWeight: 600,
													fontSize: "1.1rem",
													lineHeight: 1.3,
												}}
											>
												{event.title}
											</Typography>
										</Box>
										{event.time && (
											<Typography
												variant="body2"
												sx={{
													color: "#666",
													fontSize: "0.875rem",
													mt: 1,
													display: "flex",
													alignItems: "center",
													gap: 0.5,
												}}
											>
												⏰ {event.time}
											</Typography>
										)}
										<Box sx={{ mt: "auto" }}>
											<Button
												sx={{
													color: "#3B6866",
													fontWeight: 600,
													textTransform: "none",
													fontSize: "0.9rem",
													p: 0,
													minWidth: "auto",
													"&:hover": {
														bgcolor: "transparent",
														textDecoration: "underline",
														textDecorationColor: "#F7CA02",
													},
												}}
											>
												Read More
											</Button>
										</Box>
									</Box>
								</Box>
							</Box>
						);
					})}
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
							📅 <strong>Date:</strong> {selectedEvent?.isRange && selectedEvent?.endDate
								? `${selectedEvent?.date} to ${selectedEvent?.endDate}`
								: selectedEvent?.date}
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
