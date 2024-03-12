const express = require("express");
const router = express.Router();
const db = require("../db");

/*
    id serial PRIMARY KEY,
    comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
    amt float NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    add_date date DEFAULT CURRENT_DATE NOT NULL,
    paid_date date,
*/

router.get('/invoices', async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM invoices');
        return res.json({ invoices: results.rows })
    } catch(e) {
        return next(e)
    }
    
})

router.get('/invoices:id', async (req, res, next) => {
    try {
        const { id } = req.query;
        db.query(`SELECT * FROM invoices WHERE id='$1'`, [ id ])
        return res.json({ invoice: results.rows })
    } catch(e) {
        res.status(404).send("Invoice not found");
        return next(e)
    }
})

router.post('/invoices'), async (req, res, next) => {
    try{
        const { name, type } = req.body;
        const results = await db.query('INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date', [comp_code, amt]);
        return res.status(201).json({ invoice: results.rows[0] });
    }catch(e){
        return next(e);
    }
}

router.patch('/invoices/:id'), async (req, res, next) => {
    try{
        const { id } = req.params;
        const { name, description } = req.body;
        const results = await db.query('UPDATE invoices SET amt=$1 WHERE id=$2 RETURNING id, comp_code, amt, paid, add_date, paid_date', [amt, id]);
        return res.status(201).json({ invoice: results.rows[0] });
    }catch(e){
        res.status(404).send("Invoice not found");
        return next(e);
    }
}

router.delete('/invoices/:id', async (req, res, next) => {
    try{
        const results = await db.query('DELETE FROM invoices WHERE id = $1', [req.params.id]);
        return res.status(200).json({status: "deleted"});
    }catch(e){
        res.status(404).send("Invoice not found");
        return next(e);
    }
})

module.exports = router;