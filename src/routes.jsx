import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Auth from "./pages/Auth.jsx";
import Events from "./pages/Events.jsx";
import NotFound from "./pages/NotFound.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import ManageUsers from "./pages/ManageUsers.jsx";
import ManageEvents from "./pages/ManageEvents.jsx";
import ManageClasses from "./pages/ManageClasses.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import RoleProtectedRoute from "./RoleProtectedRoute.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";

const routes = [
	{ path: "/", element: <Home /> },
	{ path: "/about", element: <About /> },
	{ path: "/events", element: <Events /> },
	{ path: "/auth", element: <Auth /> },
	{ 
		path: "/dashboard", 
		element: (
			<RoleProtectedRoute allowedRoles={["admin"]}>
				<DashboardLayout>
					<Dashboard />
				</DashboardLayout>
			</RoleProtectedRoute>
		) 
	},
	{
		path: "/manage-users",
		element: (
			<RoleProtectedRoute allowedRoles={["admin"]}>
				<DashboardLayout>
					<ManageUsers />
				</DashboardLayout>
			</RoleProtectedRoute>
		)
	},
	{
		path: "/manage-events",
		element: (
			<RoleProtectedRoute allowedRoles={["admin"]}>
				<DashboardLayout>
					<ManageEvents />
				</DashboardLayout>
			</RoleProtectedRoute>
		)
	},
	{
		path: "/manage-classes",
		element: (
			<RoleProtectedRoute allowedRoles={["admin"]}>
				<DashboardLayout>
					<ManageClasses />
				</DashboardLayout>
			</RoleProtectedRoute>
		)
	},
	{
		path: "/reports",
		element: (
			<RoleProtectedRoute allowedRoles={["admin"]}>
				<DashboardLayout>
					<Reports />
				</DashboardLayout>
			</RoleProtectedRoute>
		)
	},
	{
		path: "/settings",
		element: (
			<RoleProtectedRoute allowedRoles={["admin"]}>
				<DashboardLayout>
					<Settings />
				</DashboardLayout>
			</RoleProtectedRoute>
		)
	},
	{ path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
	{ path: "*", element: <NotFound /> },
];

export default routes;
