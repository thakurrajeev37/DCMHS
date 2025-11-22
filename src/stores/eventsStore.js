import { makeObservable, observable } from "mobx";

class EventsStore {
	events = [
		{
			id: 0,
			title: "Diwali Festival",
			date: "October 18, 2025",
			location: "School Playground",
			shortDesc: "Join us for our annual sports day featuring various athletic competitions, track and field events, and team sports.",
			fullDesc: "Join us for our annual sports day featuring various athletic competitions, track and field events, and team sports. This exciting event will include 100m races, relay races, long jump, high jump, shot put, and various team sports like football, basketball, and volleyball. Medals and certificates will be awarded to winners. Parents and guardians are invited to attend and cheer for the participants. Refreshments will be available throughout the day.",
			time: "9:00 AM - 4:00 PM",
			color: "#FF9800"
		},
        {
			id: 1,
			title: "Thanksgiving Break",
			date: "November 24, 2025 - November 28, 2025",
            isRange: true,
			location: "School Playground",
			shortDesc: "Join us for our annual sports day featuring various athletic competitions, track and field events, and team sports.",
			fullDesc: "Join us for our annual sports day featuring various athletic competitions, track and field events, and team sports. This exciting event will include 100m races, relay races, long jump, high jump, shot put, and various team sports like football, basketball, and volleyball. Medals and certificates will be awarded to winners. Parents and guardians are invited to attend and cheer for the participants. Refreshments will be available throughout the day.",
			time: "All Day",
			color: "#62ff00ff"
		},
		{
			id: 2,
			title: "Annual Sports Day",
			date: "December 15, 2025",
			location: "School Playground",
			shortDesc: "Join us for our annual sports day featuring various athletic competitions, track and field events, and team sports.",
			fullDesc: "Join us for our annual sports day featuring various athletic competitions, track and field events, and team sports. This exciting event will include 100m races, relay races, long jump, high jump, shot put, and various team sports like football, basketball, and volleyball. Medals and certificates will be awarded to winners. Parents and guardians are invited to attend and cheer for the participants. Refreshments will be available throughout the day.",
			time: "9:00 AM - 4:00 PM",
			color: "#4CAF50"
		},
		{
			id: 3,
			title: "Science Exhibition",
			date: "December 20, 2025",
			location: "School Auditorium",
			shortDesc: "Students will showcase their innovative science projects and experiments in this exciting exhibition.",
			fullDesc: "Students will showcase their innovative science projects and experiments in this exciting exhibition. The exhibition will feature projects from various scientific disciplines including Physics, Chemistry, Biology, and Environmental Science. Students have been working on these projects for months, exploring topics like renewable energy, robotics, environmental conservation, and space exploration. Judges from local universities will evaluate the projects, and prizes will be awarded to the most innovative and well-executed projects. Parents and community members are welcome to attend.",
			time: "10:00 AM - 3:00 PM",
			color: "#2196F3"
		},
		{
			id: 4,
			title: "Winter Break",
			date: "December 25, 2025 - January 5, 2026",
			isRange: true,
			location: "School Closed",
			shortDesc: "School will be closed for winter break. Classes will resume on January 6, 2026.",
			fullDesc: "School will be closed for winter break from December 25, 2025 to January 5, 2026. This break allows students and staff to rest and spend quality time with their families during the holiday season. The school office will also remain closed during this period. For any urgent matters, please contact the school administration via email. Regular classes will resume on Monday, January 6, 2026. We wish everyone a joyful holiday season and a Happy New Year!",
			time: "All Day",
			color: "#9E9E9E"
		},
		{
			id: 5,
			title: "Parent-Teacher Meeting",
			date: "January 10, 2026",
			location: "Classrooms",
			shortDesc: "Important meeting to discuss student progress and academic performance for the current semester.",
			fullDesc: "Important meeting to discuss student progress and academic performance for the current semester. This is a mandatory meeting where parents will have the opportunity to meet with their child's teachers individually to discuss academic progress, behavior, attendance, and any concerns. Teachers will provide detailed feedback on each student's strengths and areas for improvement. Parents are encouraged to prepare questions and discuss strategies to support their child's learning at home. Time slots will be assigned to each family to ensure smooth coordination.",
			time: "2:00 PM - 6:00 PM",
			color: "#FF9800"
		},
		{
			id: 6,
			title: "Cultural Festival",
			date: "January 26, 2026",
			location: "School Campus",
			shortDesc: "Celebrate diversity with cultural performances, traditional dances, music, and food from various cultures.",
			fullDesc: "Celebrate diversity with cultural performances, traditional dances, music, and food from various cultures. This annual event showcases the rich cultural heritage of our diverse student community. Students will perform traditional dances, songs, and skits representing different cultures from around the world. The festival will also feature food stalls offering authentic cuisines, art and craft exhibitions, and traditional dress displays. This event promotes cultural awareness, appreciation, and unity among students. All parents, guardians, and community members are warmly invited to join this celebration.",
			time: "11:00 AM - 5:00 PM",
			color: "#E91E63"
		}
	];

	constructor() {
		makeObservable(this, {
			events: observable,
		});
	}
}

export default EventsStore;
