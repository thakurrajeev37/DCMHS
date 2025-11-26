import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		endDate: {
			type: String,
			required: false,
		},
		isRange: {
			type: Boolean,
			default: false,
		},
		location: {
			type: String,
			required: true,
		},
		fullDesc: {
			type: String,
			required: true,
		},
		time: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			default: "#2196F3",
		},
	},
	{ timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
