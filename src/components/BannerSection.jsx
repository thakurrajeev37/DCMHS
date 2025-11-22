import React from "react";
import { Container, Typography, Box, Grid, IconButton } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const BannerSection = () => {
	return (
		<Box
			sx={{
				background: "linear-gradient(90deg, #2d7a6e 0%, #1e5a7a 60%, #1e4a8a 100%)",
				color: "white",
				py: { xs: 4, md: 6 },
				px: { xs: 2, md: 4 },
				position: "relative",
				overflow: "hidden",
				minHeight: { xs: "auto", md: "400px" },
				display: "flex",
				alignItems: "center",
			}}
		>
			{/* Decorative Elements */}
			<Box
				sx={{
					position: "absolute",
					right: 0,
					top: 0,
					bottom: 0,
					width: { xs: "100%", md: "50%" },
					background: "url('/school-banner.jpg') center/cover",
					clipPath: { xs: "none", md: "ellipse(70% 100% at 100% 50%)" },
					opacity: { xs: 0.3, md: 0.9 },
				}}
			/>
			<Box
				sx={{
					position: "absolute",
					right: "45%",
					top: "10%",
					width: "15px",
					height: "15px",
					borderRadius: "50%",
					bgcolor: "white",
					zIndex: 1,
					display: { xs: "none", md: "block" },
				}}
			/>
			<Box
				sx={{
					position: "absolute",
					right: "48%",
					top: "50%",
					width: "15px",
					height: "15px",
					borderRadius: "50%",
					bgcolor: "white",
					zIndex: 1,
					display: { xs: "none", md: "block" },
				}}
			/>
			<Box
				sx={{
					position: "absolute",
					right: "35%",
					top: 0,
					bottom: 0,
					width: "25px",
					background: "linear-gradient(180deg, #F7CA02 0%, #F7CA02 50%, #3B6866 50%, #3B6866 100%)",
					transform: "skewX(-10deg)",
					zIndex: 1,
					display: { xs: "none", md: "block" },
				}}
			/>

			<Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
				<Grid container spacing={4} alignItems="center">
					<Grid item xs={12} md={6}>
						<Box sx={{ textAlign: { xs: "center", md: "left" } }}>
							<Typography
								variant="h2"
								component="h1"
								fontWeight="bold"
								sx={{ 
									mb: 2,
									fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" }
								}}
							>
								Welcome to
								<br />
								<span style={{ color: "#F7CA02" }}>D.C. Modern High School</span>
							</Typography>
							<Typography
								variant="body1"
								sx={{ 
									mb: 4, 
									maxWidth: "500px", 
									lineHeight: 1.6,
									mx: { xs: "auto", md: 0 },
									fontSize: { xs: "0.8rem", md: "1rem" }
								}}
							>
								Co-educational English-medium high school affiliated with PSEB.
								<br />
								<strong style={{ fontSize: { xs: "0.95rem", md: "1.2rem" } }}>Registration No. PTK-3047.</strong>
							</Typography>
							<Box sx={{ 
								display: "flex", 
								gap: { xs: 2, md: 3 }, 
								flexWrap: "wrap", 
								alignItems: "center", 
								mb: 2,
								justifyContent: { xs: "center", md: "flex-start" }
							}}>
								
								<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
									<PhoneIcon sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }} />
									<Typography variant="body1" fontWeight="bold" sx={{ fontSize: { xs: "0.75rem", md: "1rem" } }}>
										+91-9888-959-333
										<br />
										+91-9465-634-275
									</Typography>
								</Box>
								<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
									<EmailIcon sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }} />
									<Typography variant="body1" fontWeight="bold" sx={{ fontSize: { xs: "0.75rem", md: "1rem" } }}>
										dcmodernhighschool37@gmail.com
									</Typography>
								</Box>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default BannerSection;
