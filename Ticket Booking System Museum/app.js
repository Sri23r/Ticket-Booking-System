const express = require('express')
const path=require('path')
const bodyparser=require('body-parser')
const db=require('./db')
// const cors=require('cors')

const app=express()
const port=3010

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
// app.use(cors())



app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"public","index.html"));
});

app.get("/card",(req,res) => {
    res.sendFile(path.join(__dirname,"public","card.html"));
});

app.get("/view",(req,res) => {
    res.sendFile(path.join(__dirname,"public","view.html"));
});

app.post("/book",(req,res) => {
    const {names,email,museum,phoneNo,total,cardNumber} = req.body;
    if(!names || !email || !museum){
        return res.status(400).send("Missing Required Fields..");
    }
    console.log("received data ",req.body)

    const query='INSERT INTO bookings (names,email,museum,phonenumber,totalfare,cardnumber) VALUES (?,?,?,?,?,?)';
    db.query(query,[names,email,museum,phoneNo,total,cardNumber], (err,result) =>{
        if(err){
            console.log("Error inserting data :",err);
            res.status(500).send("Error booking ticket");
        }
        else{
            res.status(200).send("Ticket Booked Successfully");
            console.log(result);
        }
    });
});

app.listen(port,() => {
    console.log(`Server started @ PORT ${port}`)
})