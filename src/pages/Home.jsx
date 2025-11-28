import React from "react";
import { observer } from "mobx-react";
import { Link as RouterLink } from "react-router-dom";
import { useStore } from "../stores/StoreContext.jsx";
import { useHomeStore } from "../stores/rootStores.js";
import { Container, Typography, Box, Paper, Stack } from "@mui/material";
import BannerSection from "../components/BannerSection.jsx";
import FounderSection from "../components/FounderSection.jsx";
import QuickFacts from "../components/QuickFacts.jsx";
import FacultyStaff from "../components/FacultyStaff.jsx";
import EventsSection from "../components/EventsSection.jsx";
import PhotoGallery from "../components/PhotoGallery.jsx";
import ConnectWithUs from "../components/ConnectWithUs.jsx";
import ContactUs from "../components/ContactUs.jsx";

const Home = observer(function Home() {
	const { app } = useStore();
	const homeStore = useHomeStore();

	// Greeting & visits now initialized on server; no client effect needed
	return (
		<>
			{/* Banner Section */}
			<BannerSection />

			{/* Founder's Message Section */}
			<FounderSection />

		{/* Quick Facts Section */}
		<QuickFacts />

		{/* Faculty & Staff Section */}
		<Box sx={{ bgcolor: '#FFFFFF', width: '100%', overflowX: 'hidden' }}>
			<FacultyStaff />
		</Box>

		{/* School Events Section */}
		<Box sx={{ bgcolor: '#F9F9F9', width: '100%', overflowX: 'hidden' }}>
			<EventsSection />
		</Box>		{/* Photo Gallery Section */}
		<Box sx={{ bgcolor: '#FFFFFF', width: '100%', overflowX: 'hidden' }}>
			<PhotoGallery />
		</Box>

		{/* Connect With Us Section */}
		<Box sx={{ bgcolor: '#F5F5F5', width: '100%', overflowX: 'hidden' }}>
			<ConnectWithUs />
		</Box>

		{/* Contact Us Section */}
		<Box sx={{ bgcolor: '#FAFAFA', width: '100%', overflowX: 'hidden' }}>
			<ContactUs />
		</Box>

	</>
	);
});export default Home;
