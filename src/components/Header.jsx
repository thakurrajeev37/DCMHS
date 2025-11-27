import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { observer } from "mobx-react";
import { authStore } from "../stores/authStore";

function Header() {
	const [mounted, setMounted] = React.useState(false);
	const [drawerOpen, setDrawerOpen] = React.useState(false);
	React.useEffect(() => { setMounted(true); }, []);
	
	const toggleDrawer = (open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setDrawerOpen(open);
	};

	const menuItems = [
		{ label: "Home", path: "/" },
		{ label: "About Us", path: "/about" },
		{ label: "Events", path: "/events" },
	];

	if (mounted && authStore.isAuthenticated) {
		menuItems.push(
			{ label: "Dashboard", path: "/dashboard" },
			{ label: "Profile", path: "/profile" }
		);
	}

	return (
		<AppBar position="sticky" sx={{ bgcolor: "#3B6866", width: "100%", maxWidth: "100vw" }}>
			<Toolbar variant="regular" sx={{ gap: { xs: 1, sm: 2 }, px: { xs: 1, sm: 2 } }}>
				<Box
					component={RouterLink}
					to="/"
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						gap: 2,
						textDecoration: "none",
						color: "inherit",
						flexGrow: 1,
					}}
				>
					<Box
						component="img"
						src="/logo.png"
						alt="D.C. Modern High School Logo"
						sx={{ height: { xs: 50, sm: 60 }, borderRadius: "50%", flexShrink: 0 }}
					/>
					<Typography variant="h6" component="div" sx={{ display: { xs: "none", md: "block" } }}>
						D.C. Modern High School
					</Typography>
				</Box>
				
				{/* Mobile Menu Icon */}
				<IconButton
					color="inherit"
					aria-label="menu"
					edge="end"
					onClick={toggleDrawer(!drawerOpen)}
					sx={{ display: { xs: "flex", md: "none" } }}
				>
					{drawerOpen ? <CloseIcon /> : <MenuIcon />}
				</IconButton>

				{/* Desktop Menu */}
				<Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
					<Button 
						component={RouterLink} 
						to="/" 
						color="inherit" 
						size="small"
						sx={{ "&:hover": { textDecoration: "underline", textDecorationColor: "#F7CA02" } }}
					>
						Home
					</Button>
					<Button
						component={RouterLink}
						to="/about"
						color="inherit"
						size="small"
						sx={{ "&:hover": { textDecoration: "underline", textDecorationColor: "#F7CA02" } }}
					>
						About Us
					</Button>
					<Button
						component={RouterLink}
						to="/events"
						color="inherit"
						size="small"
						sx={{ "&:hover": { textDecoration: "underline", textDecorationColor: "#F7CA02" } }}
					>
						Events
					</Button>
					{mounted ? (
						<>
							{authStore.isAuthenticated && (
								<Button
									component={RouterLink}
									to="/dashboard"
									color="inherit"
									size="small"
									sx={{ "&:hover": { textDecoration: "underline", textDecorationColor: "#F7CA02" } }}
								>
									Dashboard
								</Button>
							)}
							{mounted && authStore.isAuthenticated && (
								<Button
									component={RouterLink}
									to="/profile"
									color="inherit"
									size="small"
									sx={{ "&:hover": { textDecoration: "underline", textDecorationColor: "#F7CA02" } }}
								>
									Profile
								</Button>
							)}
							{!authStore.isAuthenticated ? (
								<Button
									component={RouterLink}
									to="/auth"
									color="inherit"
									size="small"
									sx={{ "&:hover": { textDecoration: "underline", textDecorationColor: "#F7CA02" } }}
								>
									Login
								</Button>
							) : (
								<Button
									color="inherit"
									size="small"
									onClick={() => authStore.logout()}
									sx={{ "&:hover": { textDecoration: "underline", textDecorationColor: "#F7CA02" } }}
								>
									Logout
								</Button>
							)}
						</>
					) : null}
				</Box>

				{/* Mobile Drawer */}
				<Drawer
					anchor="top"
					open={drawerOpen}
					onClose={toggleDrawer(false)}
					sx={{
						"& .MuiDrawer-paper": {
							top: "64px",
							backgroundColor: "transparent",
							boxShadow: "none",
						}
					}}
				>
					<Box
						sx={{ 
							width: "100%",
							backgroundColor: "rgba(59, 104, 102, 0.95)",
							color: "white",
						}}
						role="presentation"
					>
						<List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
							{menuItems.map((item) => (
								<ListItem key={item.path} disablePadding>
									<ListItemButton component={RouterLink} to={item.path}>
										<ListItemText primary={item.label} sx={{ color: "white" }} />
									</ListItemButton>
								</ListItem>
							))}
							{mounted && (
								<ListItem disablePadding>
									<ListItemButton
										onClick={() => {
											if (authStore.isAuthenticated) {
												authStore.logout();
											}
										}}
										component={authStore.isAuthenticated ? "button" : RouterLink}
										to={authStore.isAuthenticated ? undefined : "/auth"}
									>
										<ListItemText primary={authStore.isAuthenticated ? "Logout" : "Login"} sx={{ color: "white" }} />
									</ListItemButton>
								</ListItem>
							)}
						</List>
					</Box>
				</Drawer>
			</Toolbar>
		</AppBar>
	);
}

export default observer(Header);
