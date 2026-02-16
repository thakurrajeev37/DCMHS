import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import XLSX from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

function readEventsFromXlsx() {
	const filePath = path.resolve(__dirname, '../seedEventsInfo.xlsx');
	const workbook = XLSX.readFile(filePath);
	const sheet = workbook.Sheets[workbook.SheetNames[0]];
	const rows = XLSX.utils.sheet_to_json(sheet);

	return rows.map(row => ({
		title: row['Title'] || '',
		date: row['Date'] || '',
		endDate: row['End Date'] || '',
		isRange: row['Is Range'] === true || row['Is Range'] === 'TRUE' || row['Is Range'] === 'true',
		location: row['Location'] || '',
		shortDesc: row['Short Description'] || '',
		fullDesc: row['Full Description'] || '',
		time: row['Time'] || '',
		color: row['Color'] || '',
	}));
}

// Get all events (public route)
router.get("/", (req, res) => {
	const events = readEventsFromXlsx();
	res.json({ events });
});

export default router;
