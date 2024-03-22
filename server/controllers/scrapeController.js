import { scrape } from '../scraper/scraper.js';
export async function scrapeController(req, res) {
    const { outDate, date, placeFrom, placeTo } = req.body;
    if(!outDate || !date || !placeFrom || !placeTo) return res.status(400).json({ message: 'Invalid request' })
    const result = await scrape(outDate, date, placeFrom, placeTo);
    res.json(result);
}