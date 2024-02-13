const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const dotenv = require('dotenv');

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config()
app.use("/admin", adminRouter)
app.use("/user", userRouter)

const DBNAME = process.env.DBNAME
// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
mongoose.connect(DBNAME, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

app.listen(3000, () => console.log('Server running on port 3000'));
