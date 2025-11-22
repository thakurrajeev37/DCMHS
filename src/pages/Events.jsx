import React from "react";
import { observer } from "mobx-react";
import { Container, Typography, Box, Paper, Grid, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import { useEventsStore } from "../stores/rootStores.js";

const Events = observer(() => {
	const eventsStore = useEventsStore();
	const [currentDate, setCurrentDate] = React.useState(new Date());
	const [selectedEvent, setSelectedEvent] = React.useState(null);
	const [openDialog, setOpenDialog] = React.useState(false);

	// Convert store events to calendar format with Date objects
	const events = eventsStore.events.map(event => {
		const eventData = { ...event };
		
		// Parse date string to Date object
		if (event.isRange) {
			const dates = event.date.split(' - ');
			eventData.date = new Date(dates[0].trim());
			eventData.endDate = new Date(dates[1].trim());
		} else {
			eventData.date = new Date(event.date);
		}
		
		return eventData;
	});

	const handleEventClick = (event) => {
		setSelectedEvent(event);
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setSelectedEvent(null);
	};

	const monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];

	const getDaysInMonth = (date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		return new Date(year, month + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		return new Date(year, month, 1).getDay();
	};

	const previousMonth = () => {
		setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
	};

	const nextMonth = () => {
		setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
	};

	const getEventsForDate = (day) => {
		const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
		return events.filter(event => {
			// For range events, check if the date falls within the range
			if (event.isRange && event.endDate) {
				const checkDate = new Date(date);
				checkDate.setHours(0, 0, 0, 0);
				const startDate = new Date(event.date);
				startDate.setHours(0, 0, 0, 0);
				const endDate = new Date(event.endDate);
				endDate.setHours(0, 0, 0, 0);
				return checkDate >= startDate && checkDate <= endDate;
			}
			// For single date events
			return event.date.getDate() === date.getDate() &&
				event.date.getMonth() === date.getMonth() &&
				event.date.getFullYear() === date.getFullYear();
		});
	};

	const daysInMonth = getDaysInMonth(currentDate);
	const firstDay = getFirstDayOfMonth(currentDate);
	const days = [];

	// Add empty cells for days before the month starts
	for (let i = 0; i < firstDay; i++) {
		days.push(
			<Box 
				key={`empty-${i}`}
				sx={{ 
					flex: "1 0 calc((100% - 48px) / 7)",
					minHeight: { xs: "60px", md: "100px" }
				}}
			/>
		);
	}

	// Add cells for each day of the month
	for (let day = 1; day <= daysInMonth; day++) {
		const dayEvents = getEventsForDate(day);
		days.push(
			<Paper
				key={day}
				elevation={1}
				sx={{
					flex: "1 0 calc((100% - 48px) / 7)",
					p: 1,
					minHeight: { xs: "60px", md: "100px" },
					bgcolor: dayEvents.length > 0 ? "#f0f8f7" : "white",
					border: dayEvents.length > 0 ? "2px solid #3B6866" : "1px solid #e0e0e0",
					cursor: dayEvents.length > 0 ? "pointer" : "default",
					"&:hover": dayEvents.length > 0 ? {
						bgcolor: "#e0f2f1",
						transform: "translateY(-2px)",
						transition: "all 0.2s"
					} : {},
				}}
				onClick={() => dayEvents.length > 0 && handleEventClick(dayEvents[0])}
			>
					<Typography 
						variant="body2" 
						fontWeight="bold" 
						sx={{ 
							color: dayEvents.length > 0 ? "#3B6866" : "text.primary",
							mb: 0.5 
						}}
					>
						{day}
					</Typography>
					{dayEvents.map(event => (
						<Chip
							key={event.id}
							label={event.title}
							size="small"
							sx={{
								fontSize: "0.65rem",
								height: "18px",
								bgcolor: event.color,
								color: "white",
								mb: 0.5,
								width: "100%",
								"& .MuiChip-label": {
									px: 0.5,
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}
							}}
						/>
					))}
				</Paper>
		);
	}

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Typography 
				variant="h3" 
				component="h1" 
				gutterBottom 
				textAlign="center"
				sx={{ 
					mb: 4,
					color: "#3B6866",
					fontWeight: "bold",
					fontSize: { xs: "1.75rem", md: "2.5rem" }
				}}
			>
				School Events Calendar
			</Typography>

			{/* Calendar Navigation */}
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 3 }}>
				<IconButton onClick={previousMonth} sx={{ color: "#3B6866" }}>
					<ChevronLeftIcon />
				</IconButton>
				<Typography variant="h5" sx={{ mx: 3, minWidth: "200px", textAlign: "center", fontWeight: "bold", color: "#3B6866" }}>
					{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
				</Typography>
				<IconButton onClick={nextMonth} sx={{ color: "#3B6866" }}>
					<ChevronRightIcon />
				</IconButton>
			</Box>

			{/* Calendar Header */}
			<Box sx={{ display: "flex", gap: 1, mb: 1 }}>
				{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
					<Box 
						key={day}
						sx={{ 
							flex: 1,
							textAlign: "center",
							py: 1,
							bgcolor: "#f5f5f5",
							borderRadius: 1
						}}
					>
						<Typography 
							variant="body2" 
							fontWeight="bold" 
							sx={{ color: "#3B6866" }}
						>
							{day}
						</Typography>
					</Box>
				))}
			</Box>

			{/* Calendar Grid */}
			<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
				{days}
			</Box>

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
								? `${selectedEvent?.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - ${selectedEvent?.endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
								: selectedEvent?.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
						</Typography>
						<Typography variant="body1" color="text.secondary" gutterBottom>
							🕐 <strong>Time:</strong> {selectedEvent?.time}
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
		</Container>
	);
});

export default Events;
