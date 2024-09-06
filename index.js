const {connectMongoDB} = require("./connection");
const path = require("path");
const express = require("express");
const app = express();
const PORT = 8000;
const cookieParser = require("cookie-parser");
const {restricttoLoggedInUser,checkAuth} = require("./Middleware/auth");


const staticRoute = require("./routes/staticRouter");
const router = require("./routes/url");
const UserRouter = require("./routes/user");

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

connectMongoDB("mongodb://127.0.0.1:27017/url_shortner")
    .then(()=>console.log("MongoDB Connected!"))
    .catch((err)=>console.log("Error Connecting MongoDB",err));


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));


app.use("/url",restricttoLoggedInUser,router);
app.use("/",checkAuth,staticRoute);
app.use("/user",UserRouter);

app.listen(PORT,()=>console.log(`Server is Running on Port:${PORT}`));