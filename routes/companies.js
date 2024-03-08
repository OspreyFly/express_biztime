const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/', async (req, res) => {
    const results = await db.query('SELECT * FROM companies');
    return res.json({ companies: results.rows })
})

module.exports = router;