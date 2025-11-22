import React, { useState } from "react";
import { Container, Typography, Box, Grid, Card, CardContent, Avatar, Tabs, Tab } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";

const About = () => {
	const [tabValue, setTabValue] = useState(0);

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};
	const administrationTeam = [
		{
			name: "Sandeep Kumar",
			position: "Principal",
			qualification: "Ph.D. in Education",
			description: "Leading the school with over 25 years of experience in educational administration and a vision for excellence.",
			image: "/Principal.jpg"
		},
		{
			name: "Mrs. Priya Sharma",
			position: "Vice Principal",
			qualification: "M.Ed., M.A.",
			description: "Overseeing academic programs and curriculum development with 18 years of teaching and administrative experience.",
			image: "https://via.placeholder.com/150/E74C3C/FFFFFF?text=VP"
		},
		{
			name: "Mr. Amit Singh",
			position: "Academic Coordinator",
			qualification: "M.Sc., B.Ed.",
			description: "Managing academic activities, assessments, and ensuring quality education standards across all grades.",
			image: "https://via.placeholder.com/150/E74C3C/FFFFFF?text=AC"
		},
		{
			name: "Ms. Neha Verma",
			position: "Administrative Officer",
			qualification: "MBA, B.Com",
			description: "Handling administrative operations, student records, and ensuring smooth day-to-day functioning of the school.",
			image: "https://via.placeholder.com/150/E74C3C/FFFFFF?text=AO"
		}
	];

	const facultyStats = [
		{
			department: "Primary Section",
			teachers: 15,
			description: "Dedicated teachers focusing on foundational learning and holistic development of young learners."
		},
		{
			department: "Middle Section",
			teachers: 12,
			description: "Experienced educators guiding students through critical middle school years with personalized attention."
		},
		{
			department: "Senior Section",
			teachers: 18,
			description: "Highly qualified faculty specializing in board exam preparation and career guidance."
		},
		{
			department: "Support Staff",
			staff: 20,
			description: "Committed support staff including librarians, lab assistants, counselors, and administrative personnel."
		}
	];

	return (
		<Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 8 }}>
			<Container maxWidth="lg">
				{/* Page Header */}
				<Typography
					variant="h3"
					component="h1"
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
					About Us
				</Typography>
				<Box sx={{ width: 60, height: 4, bgcolor: "#E74C3C", mx: "auto", mb: 3 }} />
				<Typography
					variant="body1"
					textAlign="center"
					sx={{
						color: "#666",
						mb: 8,
						maxWidth: "800px",
						mx: "auto",
						lineHeight: 1.8,
						fontSize: "1.1rem"
					}}
				>
					D.C. Modern High School is committed to providing quality education and fostering an environment where students can excel academically, socially, and personally.
				</Typography>

				{/* Tabs */}
				<Box sx={{ mb: 6 }}>
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						centered
						sx={{
							"& .MuiTab-root": {
								fontSize: "1rem",
								fontWeight: 600,
								textTransform: "uppercase",
								letterSpacing: "0.05em",
								color: "#666",
								minWidth: 200,
								"&.Mui-selected": {
									color: "#E74C3C"
								}
							},
							"& .MuiTabs-indicator": {
								backgroundColor: "#E74C3C",
								height: 3
							}
						}}
					>
						<Tab 
							label="Our Administration" 
							icon={<SchoolIcon sx={{ fontSize: 24 }} />} 
							iconPosition="start"
						/>
						<Tab 
							label="Our Faculty & Staff" 
							icon={<GroupsIcon sx={{ fontSize: 24 }} />} 
							iconPosition="start"
						/>
					</Tabs>
				</Box>

				{/* Our Administration Section */}
				{tabValue === 0 && (
					<Box sx={{ mb: 10 }}>
						<Typography
							variant="body1"
							textAlign="center"
							sx={{
								color: "#666",
								mb: 5,
								maxWidth: "700px",
								mx: "auto",
								lineHeight: 1.8
							}}
						>
							Our experienced administrative team works tirelessly to ensure the highest standards of education and create a nurturing environment for every student.
						</Typography>

						<Grid container spacing={3} justifyContent="center">
							{administrationTeam.map((member, index) => (
								<Grid item xs={12} sm={6} md={6} key={index}>
									<Card
										sx={{
											height: "100%",
											display: "flex",
											transition: "transform 0.3s, box-shadow 0.3s",
											"&:hover": {
												transform: "translateY(-8px)",
												boxShadow: "0 12px 24px rgba(0,0,0,0.15)"
											}
										}}
									>
										{/* Left - Image */}
										<Box sx={{ 
											width: "30%",
											minWidth: 140,
											overflow: "hidden",
											bgcolor: "#f9f9f9",
											display: "flex",
											alignItems: "stretch"
										}}>
											<Avatar
												src={member.image}
												alt={member.name}
												variant="square"
												sx={{
													width: "100%",
													height: "100%",
													borderRadius: 0,
													"& img": {
														objectFit: "cover"
													}
												}}
											/>
										</Box>
										
										{/* Right - Text content */}
										<CardContent sx={{ p: 3, flex: 1 }}>
											<Typography
												variant="h5"
												sx={{
													fontWeight: 700,
													color: "#5B3A8F",
													mb: 0.5
												}}
											>
												{member.name}
											</Typography>
											<Typography
												variant="h6"
												sx={{
													fontWeight: 600,
													color: "#2C2C2C",
													mb: 2,
													fontSize: "1rem"
												}}
											>
												{member.position}
											</Typography>
											<Typography
												variant="body2"
												sx={{
													color: "#666",
													fontWeight: 600,
													mb: 1.5,
													fontSize: "0.9rem"
												}}
											>
												Areas of Responsibility:
											</Typography>
											<Typography
												variant="body2"
												sx={{
													color: "#555",
													lineHeight: 1.7,
													fontSize: "0.85rem"
												}}
											>
												{member.description}
											</Typography>
											{member.qualification && (
												<Typography
													variant="body2"
													sx={{
														color: "#999",
														fontStyle: "italic",
														mt: 2,
														fontSize: "0.85rem"
													}}
												>
													{member.qualification}
												</Typography>
											)}
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					</Box>
				)}

				{/* Our Faculty & Staff Section */}
				{tabValue === 1 && (
					<Box>
						<Typography
							variant="body1"
							textAlign="center"
							sx={{
								color: "#666",
								mb: 5,
								maxWidth: "700px",
								mx: "auto",
								lineHeight: 1.8
							}}
						>
							Our dedicated team of over 65 qualified educators and support staff are committed to nurturing young minds and creating a positive learning environment.
						</Typography>

						<Grid container spacing={3} justifyContent="center">
							{facultyStats.map((dept, index) => (
								<Grid item xs={12} sm={6} md={3} key={index}>
									<Card
										sx={{
											height: "100%",
											minHeight: 280,
											textAlign: "center",
											transition: "transform 0.3s, box-shadow 0.3s",
											bgcolor: "#2C2C2C",
											color: "white",
											"&:hover": {
												transform: "translateY(-8px)",
												boxShadow: "0 12px 24px rgba(231,76,60,0.3)"
											}
										}}
									>
										<CardContent sx={{ p: 4 }}>
											<Typography
												variant="h3"
												sx={{
													fontWeight: 700,
													color: "#E74C3C",
													mb: 1
												}}
											>
												{dept.teachers || dept.staff}
											</Typography>
											<Typography
												variant="h6"
												sx={{
													fontWeight: 600,
													mb: 2,
													textTransform: "uppercase",
													fontSize: "0.9rem",
													letterSpacing: "0.05em"
												}}
											>
												{dept.department}
											</Typography>
											<Typography
												variant="body2"
												sx={{
													color: "#999",
													lineHeight: 1.7,
													fontSize: "0.85rem"
												}}
											>
												{dept.description}
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>

						{/* Additional Info */}
						<Box
							sx={{
								mt: 6,
								p: 4,
								bgcolor: "white",
								borderRadius: 2,
								boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
							}}
						>
							<Typography
								variant="h6"
								sx={{
									color: "#2C2C2C",
									fontWeight: 700,
									mb: 2,
									textAlign: "center"
								}}
							>
								Our Commitment to Excellence
							</Typography>
							<Typography
								variant="body1"
								sx={{
									color: "#666",
									lineHeight: 1.8,
									textAlign: "center",
									maxWidth: "800px",
									mx: "auto"
								}}
							>
								All our faculty members are highly qualified and regularly undergo professional development programs to stay updated with the latest teaching methodologies. Our staff-to-student ratio ensures personalized attention for every child, fostering an environment where each student can thrive academically and personally.
							</Typography>
						</Box>
					</Box>
				)}
			</Container>
		</Box>
	);
};

export default About;
