import React from "react";
import { Box, Container, Grid, Typography, IconButton, Link } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
	return (
		<Box
			component="footer"
			sx={{
				bgcolor: "#2C2C2C",
				color: "white",
				pt: 6,
				pb: 3,
				mt: 8,
				width: "100%",
				overflow: "hidden"
			}}
		>
			<Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
				<Grid container spacing={{ xs: 3, sm: 4 }}>
					{/* About Section */}
					<Grid item xs={12} md={4}>
						<Typography
							variant="h6"
							sx={{
								fontWeight: 700,
								mb: 2,
								textTransform: "uppercase",
								letterSpacing: "0.1em"
							}}
						>
							D.C. Modern High School
						</Typography>
						<Typography
							variant="body2"
							sx={{
								color: "#999",
								lineHeight: 1.8,
								mb: 2
							}}
						>
							Committed to providing quality education and nurturing young minds to become responsible citizens and future leaders.
						</Typography>
						{/* Social Media */}
						<Box sx={{ display: "flex", gap: 1, mt: 2 }}>
							<IconButton
								component="a"
								href="https://www.facebook.com/dcmodernschool"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Visit our Facebook page"
								sx={{
									color: "white",
									bgcolor: "rgba(255,255,255,0.1)",
									width: 36,
									height: 36,
									"&:hover": {
										bgcolor: "#1877F2"
									}
								}}
							>
								<FacebookIcon sx={{ fontSize: 18 }} />
							</IconButton>
							<IconButton
								component="a"
								href="https://www.instagram.com/d.c.m.school/"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Visit our Instagram page"
								sx={{
									color: "white",
									bgcolor: "rgba(255,255,255,0.1)",
									width: 36,
									height: 36,
									"&:hover": {
										bgcolor: "#E4405F"
									}
								}}
							>
								<InstagramIcon sx={{ fontSize: 18 }} />
							</IconButton>
						</Box>
					</Grid>

					{/* Quick Links */}
					<Grid item xs={12} sm={6} md={3}>
						<Typography
							variant="h6"
							sx={{
								fontWeight: 700,
								mb: 2,
								textTransform: "uppercase",
								letterSpacing: "0.1em",
								fontSize: "0.9rem"
							}}
						>
							Quick Links
						</Typography>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
							<Link
								href="/"
								sx={{
									color: "#999",
									textDecoration: "none",
									fontSize: "0.875rem",
									"&:hover": {
										color: "white"
									}
								}}
							>
								Home
							</Link>
							<Link
								href="/admissions"
								sx={{
									color: "#999",
									textDecoration: "none",
									fontSize: "0.875rem",
									"&:hover": {
										color: "white"
									}
								}}
							>
								Admissions
							</Link>
							<Link
								href="/contact"
								sx={{
									color: "#999",
									textDecoration: "none",
									fontSize: "0.875rem",
									"&:hover": {
										color: "white"
									}
								}}
							>
								Contact Us
							</Link>
						</Box>
					</Grid>

					{/* Contact Info */}
					<Grid item xs={12} sm={6} md={5}>
						<Typography
							variant="h6"
							sx={{
								fontWeight: 700,
								mb: 2,
								textTransform: "uppercase",
								letterSpacing: "0.1em",
								fontSize: "0.9rem"
							}}
						>
							Contact Info
						</Typography>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
							{/* Address */}
							<Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
								<LocationOnIcon sx={{ fontSize: 20, color: "#E74C3C", mt: 0.3 }} />
								<Typography
									variant="body2"
									component="address"
									sx={{
										color: "#999",
										fontStyle: "normal",
										lineHeight: 1.6,
										fontSize: "0.875rem"
									}}
								>
									Vill. Darkua Bangla P.O. Sarti<br />
									Tech. Dhar Kalan, Dunera<br />
									Pathankot-145022, India
								</Typography>
							</Box>
							{/* Phone */}
							<Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
								<PhoneIcon sx={{ fontSize: 20, color: "#E74C3C" }} />
								<Box>
									<Link
										href="tel:+919888959333"
										sx={{
											color: "#999",
											textDecoration: "none",
											fontSize: "0.875rem",
											display: "block",
											"&:hover": {
												color: "white"
											}
										}}
									>
										+91-9888-959-333
									</Link>
									<Link
										href="tel:+919465634275"
										sx={{
											color: "#999",
											textDecoration: "none",
											fontSize: "0.875rem",
											display: "block",
											"&:hover": {
												color: "white"
											}
										}}
									>
										+91-9465-634-275
									</Link>
								</Box>
							</Box>
							{/* Email */}
							<Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
								<EmailIcon sx={{ fontSize: 20, color: "#E74C3C" }} />
								<Link
									href="mailto:dcmodernhighschool37@gmail.com"
									sx={{
										color: "#999",
										textDecoration: "none",
										fontSize: "0.875rem",
										"&:hover": {
											color: "white"
										}
									}}
								>
									dcmodernhighschool37@gmail.com
								</Link>
							</Box>
						</Box>
					</Grid>
				</Grid>

				{/* Copyright */}
				<Box
					sx={{
						borderTop: "1px solid rgba(255,255,255,0.1)",
						mt: 4,
						pt: 3,
						textAlign: "center"
					}}
				>
					<Typography
						variant="body2"
						sx={{
							color: "#999",
							fontSize: "0.875rem"
						}}
					>
						© {new Date().getFullYear()} D.C. Modern High School. All rights reserved.
					</Typography>
				</Box>
			</Container>
		</Box>
	);
};

export default Footer;
