const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const { connectDB } = require("./connection.js");

// PORT
const port = process.env.PORT || 5000;

// routes
const authRoute = require("./routes/authRoute.js");
const transactionRoutes = require("./routes/transactionRoute.js");



app.use(express.json());
// app.use(cors());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

dotenv.config();



app.get("/", (req, res) => {
    res.json("Backend")
})

// routes
app.use("/api", authRoute);
app.use("/api", transactionRoutes);

connectDB();

app.listen(port, () => {
    console.log(`Server is listening on PORT ${port}`);
});


// http://localhost:5000/api/deposit

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTliMGRhZTk0YWI4ZmEwMDcwNWExYyIsImFjY291bnRUeXBlIjoiY3VzdG9tZXIiLCJ1c2VybmFtZSI6ImN1c3RvbWVyMSIsImlhdCI6MTc2MzI5MTQ1NSwiZXhwIjoxNzYzMjkyMzU1fQ.AgwhnvTCFuO3ZdppOc43rBKYc5TtyTYniAovJkCUybU


// Banking Application

// cluster : Bank

// rishikeshmahale16_db_user
// 25l9vmsH1Y37d4Dz

// mongodb+srv://rishikeshmahale16_db_user:25l9vmsH1Y37d4Dz@bank.cqf5ghd.mongodb.net/?appName=Bank
