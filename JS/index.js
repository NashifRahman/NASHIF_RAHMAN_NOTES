const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const {setupDB} = require('../database/db.js')
const cors = require('cors');
const port = 3000



async function mainApp(){
    const dbConnection = await setupDB()

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    //Cors Implementation
    app.use(cors());

    app.get('/', async (req, res) => {
        try {
        let sql = `SELECT * FROM simpan`;
        const idparam = req.query.id;

        if(idparam){
            sql += ` WHERE id = ${idparam} `;
            console.log(req.query.id);
        }

        const [rows] = await dbConnection.query(sql)

        // console.log(rows);
        res.json({
           "status" : true,
           "message" : "pesan telah di dapatkan",
        "data" : rows
        })
        return;
    } catch (err) {
        console.log(err);
        res.json({
           "status" : false,
           "message" : "err",
            "data" : null
        })
    }

    })

    app.post('/', async (req, res) => {
        try {
        const sql =
        `INSERT INTO simpan (id, judul, subjudul, text) VALUES 
        ('${req.body.id}', '${req.body.judul}', '${req.body.subjudul}', '${req.body.text}')`;

         const [result] = await dbConnection.query(sql);

         res.json({
           "status" : true,
           "message" : "pesan telah di kirim",
            "data" : result
        })
         return;
        } catch (err) {
         console.log(err);
         res.json({
           "status" : false,
           "message" : "err",
            "data" : null
        })
        return;
        }
    
    })


    app.put('/', async(req, res) => {
        try {
            const sql =
            `UPDATE simpan SET judul = '${req.body.judul}', subjudul = '${req.body.subjudul}', text = '${req.body.text}' WHERE id = ${req.body.id}`;
            const [result] = await dbConnection.query(sql);
            res.json({
           "status" : true,
           "message" : "pesan telah di kirim",
            "data" : result
        })
        return;
        } catch (err) {
            console.log(err);
            res.json({
            "status" : false,
            "message" : "err",
            "data" : null
            })
            return;
        }
    })

    app.delete('/', async (req, res) => {
    try {
        const sql = `DELETE FROM simpan WHERE id = ${req.body.id}`;
        const [result] = await dbConnection.query(sql);
        res.json({
           "status" : true,
           "message" : "pesan telah di kirim",
            "data" : result
        })
        return
    } catch (err) {
        console.log(err);
        res.json({
           "status" : false,
           "message" : "err",
            "data" : null
        })
        return
    }
    })

    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })
}

mainApp()