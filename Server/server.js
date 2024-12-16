require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require("./routes/auth-routes/index");
const mediaRoutes = require("./routes/instructor-routes/media-routes");
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


app.use(
    cors({
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );



app.use(express.json());
//data base connection
mongoose.connect(MONGO_URI).then(()=>console.log("Mongo Db Is connected Succsessfully"))
.catch(e=>console.log(e))

// Routeconfigration 
  app.use("/auth", authRoutes);
  app.use("/media", mediaRoutes);





app.use((err,req,res,next)=>{
    console.log(err.stack);
res.status(500).json({
    success : false, 
    message : "Something wen't wrong"
})

})
app.listen(PORT,()=>{
    console.log(`Server Is Running On PORT ${PORT}`)
})