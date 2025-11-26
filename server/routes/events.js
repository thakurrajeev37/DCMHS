import express from 'express';
import Event from '../models/Event.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all events (public route)
router.get("/", async (req, res) => {
	try {
		const events = await Event.find().sort({ createdAt: -1 });
		res.json({ events });
	} catch (error) {
		console.error("Error fetching events:", error);
		res.status(500).json({ error: "Failed to fetch events" });
	}
});

// Get single event by ID (public route)
router.get("/:id", async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		if (!event) {
			return res.status(404).json({ error: "Event not found" });
		}
		res.json({ event });
	} catch (error) {
		console.error("Error fetching event:", error);
		res.status(500).json({ error: "Failed to fetch event" });
	}
});

// Create new event (admin only)
router.post("/", requireAuth, requireAdmin, async (req, res) => {
	try {
		const { title, date, endDate, isRange, location, fullDesc, time, color } = req.body;

		// Validation
		if (!title || !date || !location || !fullDesc || !time) {
			return res.status(400).json({ error: "All required fields must be provided" });
		}

		const event = new Event({
			title,
			date,
			endDate: endDate || null,
			isRange: isRange || false,
			location,
			shortDesc: fullDesc.substring(0, 100), // Use first 100 chars of fullDesc as shortDesc
			fullDesc,
			time,
			color: color || "#2196F3",
		});

		await event.save();
		res.status(201).json({ event, message: "Event created successfully" });
	} catch (error) {
		console.error("Error creating event:", error);
		res.status(500).json({ error: "Failed to create event" });
	}
});

// Update event (admin only)
router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
	try {
		const { title, date, endDate, isRange, location, fullDesc, time, color } = req.body;

		const event = await Event.findById(req.params.id);
		if (!event) {
			return res.status(404).json({ error: "Event not found" });
		}

		// Update fields
		if (title) event.title = title;
		if (date) event.date = date;
		if (endDate !== undefined) event.endDate = endDate;
		if (isRange !== undefined) event.isRange = isRange;
		if (location) event.location = location;
		if (fullDesc) {
			event.fullDesc = fullDesc;
			event.shortDesc = fullDesc.substring(0, 100); // Auto-generate shortDesc from fullDesc
		}
		if (time) event.time = time;
		if (color) event.color = color;

		await event.save();
		res.json({ event, message: "Event updated successfully" });
	} catch (error) {
		console.error("Error updating event:", error);
		res.status(500).json({ error: "Failed to update event" });
	}
});

// Delete event (admin only)
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
	try {
		const event = await Event.findByIdAndDelete(req.params.id);
		if (!event) {
			return res.status(404).json({ error: "Event not found" });
		}
		res.json({ message: "Event deleted successfully" });
	} catch (error) {
		console.error("Error deleting event:", error);
		res.status(500).json({ error: "Failed to delete event" });
	}
});

export default router;
