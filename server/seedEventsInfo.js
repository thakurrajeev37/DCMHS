#!/usr/bin/env node

const events = [
	{
		title: "Diwali Celebration 🪔",
		date: "2024-11-01",
		isRange: false,
		location: "School Auditorium",
		shortDesc: "Celebrate the festival of lights with traditional performances and activities",
		fullDesc: "Join us for a vibrant Diwali celebration featuring traditional dances, rangoli competitions, and festive treats. Students will showcase cultural performances and participate in various activities.",
		time: "10:00 AM - 2:00 PM",
		color: "#FF9800"
	},
	{
		title: "Thanksgiving Day 🦃",
		date: "2024-11-28",
		isRange: false,
		location: "School Campus",
		shortDesc: "A day of gratitude and community gathering",
		fullDesc: "Celebrate Thanksgiving with our school community. Enjoy a special lunch, share what you're thankful for, and participate in community service activities.",
		time: "11:00 AM - 3:00 PM",
		color: "#FF6B6B"
	},
	{
		title: "Annual Sports Day 🏆",
		date: "2024-12-10",
		isRange: false,
		location: "Sports Ground",
		shortDesc: "Inter-house sports competition with exciting events and activities",
		fullDesc: "Our annual sports day featuring track and field events, team sports, and fun activities. All houses will compete for the championship trophy. Parents are invited to attend and cheer for their children.",
		time: "8:00 AM - 5:00 PM",
		color: "#4CAF50"
	},
	{
		title: "Science Exhibition 🔬",
		date: "2024-12-15",
		isRange: false,
		location: "Science Labs & Exhibition Hall",
		shortDesc: "Students showcase innovative science projects and experiments",
		fullDesc: "Students from all grades will present their science projects and experiments. Topics include robotics, environmental science, chemistry, physics, and biology. Special awards for the most innovative projects.",
		time: "9:00 AM - 4:00 PM",
		color: "#2196F3"
	},
	{
		title: "Winter Break ❄️",
		date: "2024-12-20",
		isRange: true,
		location: "School Closed",
		shortDesc: "Winter holidays - school closed",
		fullDesc: "School will be closed for winter break. Classes will resume in January. Have a wonderful holiday season with your families!",
		time: "All Day",
		color: "#00BCD4"
	},
	{
		title: "Parent-Teacher Meeting 👨‍👩‍👧‍👦",
		date: "2025-01-15",
		isRange: false,
		location: "Classrooms",
		shortDesc: "Meet with teachers to discuss student progress and academic goals",
		fullDesc: "Parents are invited to meet with their child's teachers to discuss academic progress, behavior, and goals for the remainder of the school year. Appointments can be scheduled through the school office.",
		time: "2:00 PM - 6:00 PM",
		color: "#9C27B0"
	},
	{
		title: "Cultural Festival 🎭",
		date: "2025-02-14",
		isRange: false,
		location: "School Auditorium & Campus",
		shortDesc: "Celebrate diversity with performances, food stalls, and cultural exhibitions",
		fullDesc: "A day-long celebration of our diverse school community. Experience cultural performances, traditional music and dance, international food stalls, and art exhibitions. All families are welcome to participate and share their cultural heritage.",
		time: "10:00 AM - 6:00 PM",
		color: "#E91E63"
	}
];

console.log('\n🎉 Events Seeding Instructions\n');
console.log('To seed events, please:');
console.log('1. Log in to the admin dashboard');
console.log('2. Go to "Manage Events" page');
console.log('3. Click "Add Event" button for each event below:\n');

events.forEach((event, index) => {
	console.log(`\n--- Event ${index + 1} ---`);
	console.log(`Title: ${event.title}`);
	console.log(`Date: ${event.date}`);
	console.log(`Location: ${event.location}`);
	console.log(`Time: ${event.time}`);
	console.log(`Short Description: ${event.shortDesc}`);
	console.log(`Full Description: ${event.fullDesc}`);
	console.log(`Color: ${event.color}`);
	console.log(`Is Range: ${event.isRange}`);
});

console.log('\n\n✅ Or you can add them programmatically via the ManageEvents UI!\n');
