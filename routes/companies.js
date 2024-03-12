const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/companies', async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM companies');
        return res.json({ companies: results.rows })
    } catch(e) {
        return next(e)
    }
    
})

router.get('/companies/:code', async (req, res, next) => {
    try {
        const { code } = req.query;
        const results = await db.query(`SELECT * FROM companies WHERE code='$1'`, [ code ])
        return res.json({ companies: results.rows })
    } catch(e) {
        res.status(404).send("Company not found");
        return next(e)
    }
})

router.post('/companies'), async (req, res, next) => {
    try{
        const { name, type } = req.body;
        const results = await db.query('INSERT INTO companies (name, description) VALUES ($1, $2) RETURNING code, name, description', [name, description]);
        return res.status(201).json({ companies: results.rows[0] });
    }catch(e){
        return next(e);
    }
}

router.patch('/companies/:code'), async (req, res, next) => {
    try{
        const { code } = req.params;
        const { name, description } = req.body;
        const results = await db.query('UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING code, name, description', [name, description, code]);
        return res.status(201).json({ companies: results.rows[0] });
    }catch(e){
        res.status(404).send("Company not found");
        return next(e);
    }
}

router.delete('/companies/:code', async (req, res, next) => {
    try{
        const results = await db.query('DELETE FROM companies WHERE code = $1', [req.params.code]);
        return res.status(200).json({status: "deleted"});
    }catch(e){
        res.status(404).send("Company not found");
        return next(e);
    }
})

module.exports = router;