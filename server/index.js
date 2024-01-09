const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Kush@1234",
    database: "contracts"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contract_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const { contract_name, amount, description } = req.body;
    const sqlInsert = "INSERT INTO contract_db (contract_name, amount, description) VALUES (?,?,?)";

    db.query(sqlInsert, [contract_name, amount, description], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (result.affectedRows > 0) {
                // Insertion successful
                const contract_id = result.insertId;
                const contractQuery = "SELECT * FROM contract_db WHERE contract_id = ?";
                db.query(contractQuery, [contract_id], (error, result2) => {
                    if (error) {
                        console.error(error);
                        res.status(500).json({ error: "Internal Server Error" });
                    } else {
                        res.json({ message: "Contract added successfully", data: result2 });
                    }
                });
            } else {
                // Insertion failed
                res.status(500).json({ error: "Contract insertion failed" });
            }
        }
    });
});


app.delete("/api/remove/:contract_id", (req, res) => {
    const { contract_id } = req.params;
    const sqlRemove = "DELETE FROM contract_db WHERE contract_id = ?";
    
    db.query(sqlRemove, contract_id, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (result.affectedRows > 0) {
                // Contract deleted successfully
                res.json({ message: "Contract deleted successfully" });
            } else {
                // Contract with the specified ID was not found
                res.status(404).json({ error: "Contract not found" });
            }
        }
    });
});


app.get("/api/get/:contract_id", (req, res) => {
    const { contract_id } = req.params;
    const sqlGet = "SELECT * FROM contract_db WHERE contract_id = ?";

    db.query(sqlGet, [contract_id], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (result.length > 0) {
                // Contract found
                res.json({ data: result });
            } else {
                // Contract with the specified ID not found
                res.status(404).json({ error: "Contract not found" });
            }
        }
    });
});


app.put("/api/update/:contract_id", (req, res) => {
    //console.log(req.params, req.body);
    const { contract_id } = req.params;
    const { contract_name, amount, description } = req.body;
    const sqlUpdate = "UPDATE contract_db SET contract_name = ?, amount = ?, description = ? WHERE contract_id = ?";

    db.query(sqlUpdate, [contract_name, amount, description, contract_id], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (result.affectedRows > 0) {
                // Update successful
                res.json({ message: "Contract updated successfully" });
            } else {
                // Contract with the specified ID not found
                res.status(404).json({ error: "Contract not found" });
            }
        }
    });
});


app.listen(5000, () => {
    console.log("Server is running on port 5000");
})


module.exports = app;