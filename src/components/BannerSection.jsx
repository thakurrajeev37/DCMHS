import React from "react";
import { Container, Typography, Box } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

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
				width: "100%",
				maxWidth: "100vw"
			}}
		>
			{/* Background Image */}
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

			{/* Decorative Dots */}
			<Box
				sx={{
					position: "absolute",
					right: "45%",
					top: "10%",
					width: 15,
					height: 15,
					borderRadius: "50%",
					bgcolor: "white",
					display: { xs: "none", md: "block" },
				}}
			/>
			<Box
				sx={{
					position: "absolute",
					right: "48%",
					top: "50%",
					width: 15,
					height: 15,
					borderRadius: "50%",
					bgcolor: "white",
					display: { xs: "none", md: "block" },
				}}
			/>

			{/* Decorative Stripe */}
			<Box
				sx={{
					position: "absolute",
					right: { md: "35%" },
					top: 0,
					bottom: 0,
					width: 25,
					background: "linear-gradient(180deg, #F7CA02 0%, #F7CA02 50%, #3B6866 50%, #3B6866 100%)",
					transform: "skewX(-10deg)",
					display: { xs: "none", md: "block" },
				}}
			/>

			{/* Content */}
			<Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, px: { xs: 2, sm: 3 } }}>
				<Box 
					sx={{ 
						maxWidth: { xs: "100%", md: "50%" },
						textAlign: { xs: "center", md: "left" }
					}}
				>
					{/* Title */}
					<Typography
						variant="h2"
						component="h1"
						sx={{ 
							mb: 2,
							fontWeight: "bold",
							fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" }
						}}
					>
						Welcome to
						<br />
						<Box component="span" sx={{ color: "#F7CA02" }}>
							D.C. Modern High School
						</Box>
					</Typography>

					{/* Description */}
					<Typography
						variant="body1"
						sx={{ 
							mb: 4, 
							lineHeight: 1.6,
							fontSize: { xs: "0.8rem", md: "1rem" }
						}}
					>
						Co-educational English-medium high school affiliated with PSEB.
						<br />
						<Box component="strong" sx={{ fontSize: { xs: "0.95rem", md: "1.2rem" } }}>
							Registration No. PTK-3047.
						</Box>
					</Typography>

					{/* Contact Info */}
					<Box 
						sx={{ 
							display: "flex", 
							gap: { xs: 2, md: 3 }, 
							flexWrap: "wrap", 
							alignItems: "center",
							justifyContent: { xs: "center", md: "flex-start" }
						}}
					>
						{/* Phone */}
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<PhoneIcon sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }} />
							<Typography 
								variant="body1" 
								sx={{ 
									fontWeight: "bold",
									fontSize: { xs: "0.75rem", md: "1rem" }
								}}
							>
								+91-9888-959-333
								<br />
								+91-9465-634-275
							</Typography>
						</Box>

						{/* Email */}
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<EmailIcon sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }} />
							<Typography 
								variant="body1" 
								sx={{ 
									fontWeight: "bold",
									fontSize: { xs: "0.75rem", md: "1rem" }
								}}
							>
								dcmodernhighschool37@gmail.com
							</Typography>
						</Box>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default BannerSection;
