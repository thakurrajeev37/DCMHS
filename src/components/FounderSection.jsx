import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

const FounderSection = () => {
	return (
		<Box sx={{ bgcolor: "#f9f9f9", py: { xs: 4, md: 8 }, width: "100%", overflow: "hidden" }}>
			<Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
				<Typography 
					variant="h3" 
					component="h2" 
					gutterBottom 
					textAlign="center"
					sx={{ 
						mb: 4,
						color: "#3B6866",
						fontWeight: "bold",
						fontSize: { xs: "1.75rem", md: "2.5rem" }
					}}
				>
					Insights from Our Founder & Visionary
				</Typography>
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						gap: 4,
						alignItems: "center",
					}}
				>
					<Box
						sx={{
							flex: { xs: "none", md: "0 0 35%" },
							textAlign: "center",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Box
							component="img"
							src="/founder.JPG"
							alt="Founder of D.C. Modern High School"
							sx={{
								width: { xs: "250px", md: "280px" },
								height: { xs: "250px", md: "280px" },
								objectFit: "cover",
								borderRadius: "50%",
								boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
								border: "4px solid #F7CA02",
								mb: 2,
							}}
						/>
						<Box>
							<Typography variant="h6" fontWeight="bold" color="#3B6866">
								Sub. Diwan Chand
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Founder & Chairman
							</Typography>
						</Box>
					</Box>
					<Box sx={{ flex: 1 }}>
						<Paper 
							elevation={0} 
							sx={{ 
								p: { xs: 3, md: 4 },
								bgcolor: "#f5f5f5",
								borderLeft: "4px solid #3B6866",
								height: "100%",
							}}
						>
							<Typography 
								variant="body1" 
								paragraph
								sx={{ 
									fontSize: { xs: "0.95rem", md: "1.1rem" },
									lineHeight: 1.8,
									color: "text.primary",
									fontStyle: "italic"
								}}
							>
								"Welcome to D.C. Modern High School, where we are committed to nurturing young minds 
								and building a foundation for lifelong learning. Our mission is to provide quality education 
								that combines academic excellence with character development."
							</Typography>
							<Typography 
								variant="body1" 
								paragraph
								sx={{ 
									fontSize: { xs: "0.95rem", md: "1.1rem" },
									lineHeight: 1.8,
									color: "text.primary",
									fontStyle: "italic"
								}}
							>
								"At D.C. Modern High School, we believe in creating an environment where every student 
								can discover their potential and achieve their dreams. Our dedicated faculty and modern 
								facilities ensure that students receive the best possible education."
							</Typography>
							<Typography 
								variant="body1"
								sx={{ 
									fontSize: { xs: "0.95rem", md: "1.1rem" },
									lineHeight: 1.8,
									color: "text.primary",
									fontStyle: "italic"
								}}
							>
								"We invite you to join our school family and be part of an institution that values 
								excellence, integrity, and innovation."
							</Typography>
						</Paper>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default FounderSection;
