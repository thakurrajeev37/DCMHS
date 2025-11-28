import React from "react";
import { Container, Typography, Box, Grid, Paper, IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";

const ContactUs = () => {
	return (
		<Box component="section" aria-labelledby="contact-heading" sx={{ py: { xs: 4, md: 8 }, bgcolor: "#f5f5f5", width: "100%", overflow: "hidden" }}>
			<Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
				<Typography 
					id="contact-heading"
					variant="h3" 
					component="h2" 
					textAlign="center"
					sx={{ 
						color: "#2C2C2C",
						fontWeight: "bold",
						fontSize: { xs: "2rem", md: "3rem" },
						mb: 1,
						textTransform: "uppercase",
						letterSpacing: "0.1em"
					}}
				>
					Contact Us
				</Typography>
				<Box sx={{ width: 60, height: 4, bgcolor: "#E74C3C", mx: "auto", mb: 4 }} aria-hidden="true" />
				<Typography 
					variant="body1" 
					textAlign="center"
					sx={{ 
						color: "#666",
						mb: 6,
						maxWidth: "700px",
						mx: "auto",
						lineHeight: 1.8
					}}
				>
					Get in touch with us for admissions, inquiries, or any questions. We're here to help and look forward to hearing from you.
				</Typography>

				{/* Main Contact Section with Dark Sidebar */}
				<Box 
					component="article"
					aria-label="Contact information and location"
					sx={{ 
						display: "flex", 
						flexDirection: { xs: "column", md: "row" },
						minHeight: 500,
						boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
						borderRadius: 2,
						overflow: "hidden"
					}}
				>
					{/* Left Dark Sidebar */}
					<Box 
						component="aside"
						aria-label="Contact details"
						sx={{ 
							bgcolor: "#2C2C2C",
							color: "white",
							p: { xs: 4, md: 6 },
							width: { xs: "100%", md: "45%" },
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							gap: 5
						}}
					>
						{/* Address and Email Row */}
						<Box sx={{ 
							display: "flex", 
							flexDirection: { xs: "column", sm: "row" },
							gap: 4
						}}>
							{/* Address */}
							<Box sx={{ flex: 1 }}>
								<Box 
									sx={{ 
										width: 70, 
										height: 70, 
										borderRadius: "50%", 
										border: "2px solid rgba(255,255,255,0.3)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										mb: 3
									}}
									aria-hidden="true"
								>
									<LocationOnIcon sx={{ fontSize: 32 }} />
								</Box>
								<Typography 
									variant="h6" 
									component="h3"
									sx={{ 
										fontWeight: 600, 
										mb: 2,
										textTransform: "uppercase",
										letterSpacing: "0.1em",
										fontSize: "0.9rem",
										color: "#999"
									}}
								>
									Address:
								</Typography>
								<address style={{ 
									fontStyle: "normal", 
									lineHeight: 1.8, 
									fontSize: "0.95rem",
									color: "white"
								}}>
									Vill. Darkua Bangla P.O. Sarti
									Tech. Dhar Kalan, Dunera
									Pathankot-145022, India
								</address>
							</Box>

							{/* Email */}
							<Box sx={{ flex: 1 }}>
								<Box 
									sx={{ 
										width: 70, 
										height: 70, 
										borderRadius: "50%", 
										border: "2px solid rgba(255,255,255,0.3)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										mb: 3
									}}
									aria-hidden="true"
								>
									<EmailIcon sx={{ fontSize: 32 }} />
								</Box>
								<Typography 
									variant="h6" 
									component="h3"
									sx={{ 
										fontWeight: 600, 
										mb: 2,
										textTransform: "uppercase",
										letterSpacing: "0.1em",
										fontSize: "0.9rem",
										color: "#999"
									}}
								>
									Email:
								</Typography>
								<Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: "0.95rem" }}>
									<a 
										href="mailto:dcmodernhighschool37@gmail.com"
										style={{ color: "white", textDecoration: "none" }}
										aria-label="Send email to DC Modern High School"
									>
										dcmodernhighschool37@gmail.com
									</a>
								</Typography>
							</Box>
						</Box>

						{/* Call Us and Contact Us Row */}
						<Box sx={{ 
							display: "flex", 
							flexDirection: { xs: "column", sm: "row" },
							gap: 4
						}}>
							{/* Phone */}
							<Box sx={{ flex: 1 }}>
								<Box 
									sx={{ 
										width: 70, 
										height: 70, 
										borderRadius: "50%", 
										border: "2px solid rgba(255,255,255,0.3)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										mb: 3
									}}
									aria-hidden="true"
								>
									<PhoneIcon sx={{ fontSize: 32 }} />
								</Box>
								<Typography 
									variant="h6" 
									component="h3"
									sx={{ 
										fontWeight: 600, 
										mb: 2,
										textTransform: "uppercase",
										letterSpacing: "0.1em",
										fontSize: "0.9rem",
										color: "#999"
									}}
								>
									Call Us:
								</Typography>
								<Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: "0.95rem" }}>
									<a 
										href="tel:+919888959333"
										style={{ color: "white", textDecoration: "none", display: "block" }}
										aria-label="Call +91-9888-959-333"
									>
										+91-9888-959-333
									</a>
									<a 
										href="tel:+919465634275"
										style={{ color: "white", textDecoration: "none", display: "block" }}
										aria-label="Call +91-9465-634-275"
									>
										+91-9465-634-275
									</a>
								</Typography>
							</Box>

							{/* Contact CTA */}
							<Box sx={{ flex: 1 }}>
								<Typography 
									variant="h6" 
									component="h3"
									sx={{ 
										fontWeight: 600, 
										mb: 2,
										textTransform: "uppercase",
										letterSpacing: "0.05em",
										fontSize: "1.1rem"
									}}
								>
									Contact on Social Media
								</Typography>
								<Typography variant="body2" sx={{ 
									color: "#999",
									lineHeight: 1.6,
									mb: 3
								}}>
									Follow us on social media for updates, events, and school activities.
								</Typography>
								{/* Social Media Icons */}
								<Box 
									component="nav"
									aria-label="Social media links"
									sx={{ display: "flex", gap: 1.5 }}
								>
									<IconButton
										component="a"
										href="https://www.facebook.com/dcmodernschool"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Visit our Facebook page"
										sx={{
											color: "white",
											bgcolor: "transparent",
											border: "2px solid rgba(255,255,255,0.3)",
											width: 40,
											height: 40,
											"&:hover": {
												bgcolor: "#1877F2",
												borderColor: "#1877F2"
											},
											"&:focus": {
												outline: "2px solid white",
												outlineOffset: "2px"
											}
										}}
									>
										<FacebookIcon sx={{ fontSize: 20 }} />
									</IconButton>
									<IconButton
										component="a"
										href="https://www.instagram.com/d.c.m.school/"
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Visit our Instagram page"
										sx={{
											color: "white",
											bgcolor: "transparent",
											border: "2px solid rgba(255,255,255,0.3)",
											width: 40,
											height: 40,
											"&:hover": {
												bgcolor: "#E4405F",
												borderColor: "#E4405F"
											},
											"&:focus": {
												outline: "2px solid white",
												outlineOffset: "2px"
											}
										}}
									>
										<InstagramIcon sx={{ fontSize: 20 }} />
									</IconButton>
								</Box>
							</Box>
						</Box>
					</Box>

					{/* Right Map Section */}
					<Box 
						component="aside"
						aria-label="School location map"
						sx={{ 
							width: { xs: "100%", md: "55%" },
							height: { xs: 400, md: "auto" },
							minHeight: { xs: 400, md: 500 },
							display: "flex",
							position: "relative"
						}}
					>
						<iframe
							title="DC Modern High School location on Google Maps"
							src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3365.871186590754!2d75.818641!3d32.476137!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391c877792ef6a7d%3A0xb2054650714b7f31!2sD.%20C.%20Modern%20High%20School%20Gura%20Nagrota!5e0!3m2!1sen!2sus!4v1763771960508!5m2!1sen!2sus"
							width="100%"
							height="100%"
							style={{ border: 0, display: "block", width: "100%", height: "100%" }}
							allowFullScreen=""
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default ContactUs;
