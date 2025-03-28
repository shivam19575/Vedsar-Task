require("dotenv").config();
const express = require("express");
const cors = require("cors");
const data = require("./Routes/UserRoutes");
const connectDb = require("./Utils/db");


const app = express();

const corsOptions = {
    origin: "http://localhost:5174",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "500mb" }));


// Routes
app.use("/api/data",data);


const PORT = process.env.PORT || 5000;
console.log("PORT:", PORT);

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port no: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
        process.env.exit(1);
    });



