import React, { useState, useEffect, useRef } from "react";
import { Container, Typography, Box, Card, CardContent, CardMedia, Grid } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const FacultyStaff = () => {
	const [scrollY, setScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef(null);
	const [offsetTop, setOffsetTop] = useState(0);

	useEffect(() => {
		if (sectionRef.current) {
			setOffsetTop(sectionRef.current.offsetTop);
		}

		const handleScroll = () => {
			setScrollY(window.scrollY);
			
			if (sectionRef.current) {
				const rect = sectionRef.current.getBoundingClientRect();
				const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
				if (inView && !isVisible) {
					setIsVisible(true);
				}
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, [isVisible]);

	const parallaxOffset = (scrollY - offsetTop) * 0.1;

	// Hierarchy Data
	const chairman = {
		name: "Sub. Diwan Chand",
		role: "Chairman",
		qualification: "Ph.D, M.Ed",
		experience: "25+ Years",
		image: "/founder.JPG",
		description: "Visionary leader guiding the institution towards excellence"
	};

	const principal = {
		name: "Reena Rani",
		role: "Principal",
		qualification: "M.Ed, B.Ed",
		experience: "20+ Years",
		image: "/Principal.jpeg",
		description: "Leading with vision and dedication to excellence in education"
	};

	const vicePrincipal = {
		name: "Sandeep Kumar",
		role: "Vice Principal",
		qualification: "M.A, B.Ed",
		experience: "15+ Years",
		image: "/VicePrincipal.JPG",
		description: "Supporting academic excellence and student development"
	};

	// Teachers Category
	const teachers = [
		{
			name: "Head Teacher - Primary",
			role: "Head Teacher",
			qualification: "M.Ed, B.Ed",
			experience: "12+ Years",
			image: "/headTeacher.jpg",
			description: "Expert in early childhood education"
		},
		{
			name: "Senior Teacher - Science",
			role: "Science Department",
			qualification: "M.Sc, B.Ed",
			experience: "10+ Years",
			image: "/teacher-2.jpg",
			description: "Making science engaging"
		},
		{
			name: "Senior Teacher - Mathematics",
			role: "Mathematics Department",
			qualification: "M.Sc, B.Ed",
			experience: "10+ Years",
			image: "/teacher-3.jpg",
			description: "Building strong foundations"
		},
		{
			name: "Senior Teacher - English",
			role: "English Department",
			qualification: "M.A, B.Ed",
			experience: "8+ Years",
			image: "/teacher-4.jpg",
			description: "Fostering language skills"
		},
		{
			name: "Teacher - Social Studies",
			role: "Social Studies Department",
			qualification: "M.A, B.Ed",
			experience: "7+ Years",
			image: "/teacher-5.jpg",
			description: "Making history come alive"
		},
		{
			name: "Teacher - Computer Science",
			role: "IT Department",
			qualification: "MCA, B.Ed",
			experience: "6+ Years",
			image: "/teacher-6.jpg",
			description: "Preparing for digital future"
		}
	];


	return (
		<Box 
			ref={sectionRef}
			sx={{ 
				py: { xs: 4, md: 8 }, 
				bgcolor: "#FFFFFF",
				width: "100%",
				overflow: "hidden",
				position: "relative"
			}}
		>
			<Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
				{/* Header */}
				<Box 
					sx={{ 
						textAlign: "center", 
						mb: 6,
						transform: isVisible ? `translateY(${parallaxOffset}px)` : 'translateY(50px)',
						opacity: isVisible ? 1 : 0,
						transition: 'all 0.8s ease-out',
					}}
				>
					<Typography
						variant="h2"
						sx={{
							color: "#3B6866",
							fontWeight: 900,
							fontSize: { xs: "1.75rem", md: "2.5rem" },
							textTransform: "uppercase",
							mb: 1,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: 2
						}}
					>
						<SchoolIcon sx={{ fontSize: { xs: "2rem", md: "3rem" }, color: "#F7CA02" }} />
						Our Faculty & Staff
					</Typography>
					<Typography
						variant="h6"
						sx={{
							color: "#666",
							fontWeight: 400,
							fontSize: { xs: "0.95rem", md: "1.1rem" },
							maxWidth: 700,
							mx: "auto",
							lineHeight: 1.6
						}}
					>
						Meet our dedicated team of experienced educators committed to nurturing young minds and fostering academic excellence
					</Typography>
				</Box>

				{/* Organizational Hierarchy */}
				<Box sx={{ mb: 8 }}>
					{/* Chairman - Top Level */}
					<Box 
						sx={{ 
							display: 'flex', 
							justifyContent: 'center',
							mb: { xs: 3, md: 4 },
							px: { xs: 2, sm: 0 },
							opacity: isVisible ? 1 : 0,
							transform: isVisible ? 'scale(1)' : 'scale(0.8)',
							transition: 'all 0.8s ease-out 0.3s',
						}}
					>
						<Box
							sx={{
								textAlign: 'center',
								maxWidth: { xs: '100%', sm: '350px' },
								width: '100%'
							}}
						>
							<Box
								sx={{
									width: { xs: "100px", sm: "120px", md: "150px" },
									height: { xs: "100px", sm: "120px", md: "150px" },
									borderRadius: "50%",
									overflow: "hidden",
									border: { xs: "4px solid #003049", md: "5px solid #003049" },
									mx: 'auto',
									mb: { xs: 1.5, md: 2 },
									bgcolor: "#f5f5f5",
									boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
								}}
							>
								<Box
									component="img"
									src={chairman.image}
									alt={chairman.name}
									onError={(e) => {
										e.target.src = '/logo.png';
										e.target.style.objectFit = 'contain';
										e.target.style.padding = '15%';
										e.target.style.background = 'linear-gradient(135deg, #003049 0%, #001f2e 100%)';
									}}
									sx={{
										width: "100%",
										height: "100%",
										objectFit: "cover"
									}}
								/>
							</Box>
							<Box
								sx={{
									bgcolor: "#003049",
									color: 'white',
									px: { xs: 2, sm: 3 },
									py: { xs: 1.5, sm: 2 },
									borderRadius: 2,
									boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
								}}
							>
								<Typography 
									variant="h5" 
									sx={{ 
										fontWeight: 700, 
										mb: 0.5,
										fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
									}}
								>
									{chairman.name}
								</Typography>
								<Typography 
									variant="body2" 
									sx={{ 
										opacity: 0.9, 
										mb: 0.5,
										fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' }
									}}
								>
									{chairman.role} • {chairman.qualification}
								</Typography>
								<Typography 
									variant="body2" 
									sx={{ 
										fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
										opacity: 0.8,
										lineHeight: 1.4
									}}
								>
									{chairman.description}
								</Typography>
							</Box>
						</Box>
					</Box>

					{/* Connecting Line */}
					<Box
						sx={{
							height: { xs: '40px', sm: '50px', md: '60px' },
							width: '3px',
							bgcolor: '#003049',
							mx: 'auto',
							mb: { xs: 3, md: 4 },
							opacity: isVisible ? 1 : 0,
							transition: 'opacity 0.8s ease-out 0.5s',
						}}
					/>

					{/* Principal - Second Level */}
					<Box 
						sx={{ 
							display: 'flex', 
							justifyContent: 'center',
							mb: { xs: 3, md: 4 },
							px: { xs: 2, sm: 0 },
							opacity: isVisible ? 1 : 0,
							transform: isVisible ? 'scale(1)' : 'scale(0.8)',
							transition: 'all 0.8s ease-out 0.6s',
						}}
					>
						<Box
							sx={{
								textAlign: 'center',
								maxWidth: { xs: '100%', sm: '320px' },
								width: '100%'
							}}
						>
							<Box
								sx={{
									width: { xs: "90px", sm: "100px", md: "120px" },
									height: { xs: "90px", sm: "100px", md: "120px" },
									borderRadius: "50%",
									overflow: "hidden",
									border: { xs: "3px solid #003049", md: "4px solid #003049" },
									mx: 'auto',
									mb: { xs: 1.5, md: 2 },
									bgcolor: "#f5f5f5",
									boxShadow: "0 6px 18px rgba(0,0,0,0.15)"
								}}
							>
								<Box
									component="img"
									src={principal.image}
									alt={principal.name}
									onError={(e) => {
										e.target.src = '/logo.png';
										e.target.style.objectFit = 'contain';
										e.target.style.padding = '15%';
										e.target.style.background = 'linear-gradient(135deg, #003049 0%, #001f2e 100%)';
									}}
									sx={{
										width: "100%",
										height: "100%",
										objectFit: "cover"
									}}
								/>
							</Box>
							<Box
								sx={{
									bgcolor: "#FFF9E6",
									border: { xs: "2px solid #003049", md: "3px solid #003049" },
									px: { xs: 2, sm: 3 },
									py: { xs: 1.5, sm: 2 },
									borderRadius: 2,
									boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
								}}
							>
								<Typography 
									variant="h6" 
									sx={{ 
										fontWeight: 700, 
										color: '#003049', 
										mb: 0.5,
										fontSize: { xs: '1rem', sm: '1.15rem', md: '1.25rem' }
									}}
								>
									{principal.name}
								</Typography>
								<Typography 
									variant="body2" 
									sx={{ 
										color: '#666', 
										mb: 0.5,
										fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' }
									}}
								>
									{principal.role} • {principal.qualification}
								</Typography>
								<Typography 
									variant="body2" 
									sx={{ 
										fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
										color: '#555',
										lineHeight: 1.4
									}}
								>
									{principal.description}
								</Typography>
							</Box>
						</Box>
					</Box>

					{/* Connecting Line */}
					<Box
						sx={{
							height: '60px',
							width: '3px',
							bgcolor: '#003049',
							mx: 'auto',
							mb: 4,
							opacity: isVisible ? 1 : 0,
							transition: 'opacity 0.8s ease-out 0.8s',
						}}
					/>

					{/* Vice Principal - Third Level */}
					<Box 
						sx={{ 
							display: 'flex', 
							justifyContent: 'center',
							mb: { xs: 3, md: 4 },
							px: { xs: 2, sm: 0 },
							opacity: isVisible ? 1 : 0,
							transform: isVisible ? 'scale(1)' : 'scale(0.8)',
							transition: 'all 0.8s ease-out 0.9s',
						}}
					>
						<Box
							sx={{
								textAlign: 'center',
								maxWidth: { xs: '100%', sm: '300px' },
								width: '100%'
							}}
						>
							<Box
								sx={{
									width: { xs: "85px", sm: "90px", md: "110px" },
									height: { xs: "85px", sm: "90px", md: "110px" },
									borderRadius: "50%",
									overflow: "hidden",
									border: { xs: "3px solid #003049", md: "4px solid #003049" },
									mx: 'auto',
									mb: { xs: 1.5, md: 2 },
									bgcolor: "#f5f5f5",
									boxShadow: "0 6px 18px rgba(0,0,0,0.15)"
								}}
							>
								<Box
									component="img"
									src={vicePrincipal.image}
									alt={vicePrincipal.name}
									onError={(e) => {
										e.target.src = '/logo.png';
										e.target.style.objectFit = 'contain';
										e.target.style.padding = '15%';
										e.target.style.background = 'linear-gradient(135deg, #003049 0%, #001f2e 100%)';
									}}
									sx={{
										width: "100%",
										height: "100%",
										objectFit: "cover"
									}}
								/>
							</Box>
							<Box
								sx={{
									bgcolor: "#FFF9E6",
									border: { xs: "2px solid #003049", md: "3px solid #003049" },
									px: { xs: 2, sm: 3 },
									py: { xs: 1.5, sm: 2 },
									borderRadius: 2,
									boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
								}}
							>
								<Typography 
									variant="h6" 
									sx={{ 
										fontWeight: 700, 
										color: '#003049', 
										mb: 0.5,
										fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
									}}
								>
									{vicePrincipal.name}
								</Typography>
								<Typography 
									variant="body2" 
									sx={{ 
										color: '#666', 
										mb: 0.5,
										fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' }
									}}
								>
									{vicePrincipal.role} • {vicePrincipal.qualification}
								</Typography>
								<Typography 
									variant="body2" 
									sx={{ 
										fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
										color: '#555',
										lineHeight: 1.4
									}}
								>
									{vicePrincipal.description}
								</Typography>
							</Box>
						</Box>
					</Box>

					{/* Connecting Line */}
					<Box
						sx={{
							height: '60px',
							width: '3px',
							bgcolor: '#003049',
							mx: 'auto',
							mb: 4,
							opacity: isVisible ? 1 : 0,
							transition: 'opacity 0.8s ease-out 1.1s',
						}}
					/>

					{/* Teachers Section Title */}
					<Typography
						variant="h4"
						sx={{
							color: "#003049",
							fontWeight: 700,
							fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.8rem" },
							mb: { xs: 3, md: 4 },
							textAlign: "center",
							textTransform: "uppercase",
							letterSpacing: { xs: "0.5px", md: "1px" },
							opacity: isVisible ? 1 : 0,
							transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
							transition: 'all 0.8s ease-out 1.2s',
						}}
					>
						Teaching Staff
					</Typography>

					{/* Teachers Grid - All in Same Row */}
					<Grid 
						container 
						spacing={{ xs: 2, sm: 2.5, md: 3 }}
						sx={{
							opacity: isVisible ? 1 : 0,
							transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
							transition: 'all 0.8s ease-out 1.3s',
							justifyContent: 'center'
						}}
					>
						{teachers.map((teacher, index) => (
							<Grid item xs={6} sm={4} md={3} lg={2} key={index}>
								<Box
									sx={{
										textAlign: 'center',
										transition: 'transform 0.3s ease',
										height: '100%',
										display: 'flex',
										flexDirection: 'column',
										'&:hover': {
											transform: 'translateY(-8px)'
										}
									}}
								>
									<Box
										sx={{
											width: { xs: "70px", sm: "80px", md: "90px" },
											height: { xs: "70px", sm: "80px", md: "90px" },
											borderRadius: "50%",
											overflow: "hidden",
											border: { xs: "2px solid #003049", md: "3px solid #003049" },
											mx: 'auto',
											mb: { xs: 1, md: 1.5 },
											bgcolor: "#f5f5f5",
											boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
										}}
									>
										<Box
											component="img"
											src={teacher.image}
											alt={teacher.name}
											onError={(e) => {
												e.target.src = '/logo.png';
												e.target.style.objectFit = 'contain';
												e.target.style.padding = '15%';
												e.target.style.background = 'linear-gradient(135deg, #003049 0%, #001f2e 100%)';
											}}
											sx={{
												width: "100%",
												height: "100%",
												objectFit: "cover"
											}}
										/>
									</Box>
									<Box
										sx={{
											bgcolor: "#FFF9E6",
											border: "2px solid #F7CA02",
											borderLeft: { xs: "3px solid #003049", md: "4px solid #003049" },
											px: { xs: 1.5, sm: 2 },
											py: { xs: 1.5, md: 1.5 },
											borderRadius: 1.5,
											boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
											minHeight: { xs: '130px', sm: '140px', md: '145px' },
											flex: 1,
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'space-between'
										}}
									>
										<Typography 
											variant="body1" 
											sx={{ 
												fontWeight: 700, 
												color: '#003049', 
												mb: 0.5,
												fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem' },
												lineHeight: 1.3
											}}
										>
											{teacher.name}
										</Typography>
										<Typography 
											variant="body2" 
											sx={{ 
												color: '#666', 
												mb: 0.5,
												fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
												lineHeight: 1.3
											}}
										>
											{teacher.role}
										</Typography>
										<Typography 
											variant="body2" 
											sx={{ 
												color: '#666', 
												fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
												mb: 0.5,
												lineHeight: 1.3
											}}
										>
											{teacher.qualification}
										</Typography>
										<Typography 
											variant="body2" 
											sx={{ 
												fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
												color: '#555',
												fontStyle: 'italic',
												lineHeight: 1.3
											}}
										>
											{teacher.description}
										</Typography>
									</Box>
								</Box>
							</Grid>
						))}
					</Grid>
				</Box>
			</Container>
		</Box>
	);
};

export default FacultyStaff;
