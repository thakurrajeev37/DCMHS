import React from "react";
import { observer } from "mobx-react";
import { Link as RouterLink } from "react-router-dom";
import { useStore } from "../stores/StoreContext.jsx";
import { useHomeStore } from "../stores/rootStores.js";
import { Container, Typography, Box, Paper, Stack } from "@mui/material";
import BannerSection from "../components/BannerSection.jsx";
import FounderSection from "../components/FounderSection.jsx";
import EventsSection from "../components/EventsSection.jsx";
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

		{/* School Events Section */}
		<EventsSection />

		{/* Connect With Us Section */}
		<ConnectWithUs />

		{/* Contact Us Section */}
		<ContactUs />

	</>
	);
});export default Home;
