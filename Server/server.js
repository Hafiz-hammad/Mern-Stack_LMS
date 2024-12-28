require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes/index");
const mediaRoutes = require("./routes/instructor-routes/media-routes");
const instructorCourseRoutes = require("./routes/instructor-routes/course-routes");
const studentViewCourseRoutes = require("./routes/student-routes/course-routes");
const User = require("./models/User");  // User model import karen

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

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((e) => console.log("Error connecting to MongoDB:", e));

// Routes configuration
app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);
app.use("/instructor/course", instructorCourseRoutes);
app.use("/student/course", studentViewCourseRoutes);

// API to save email and set hasBoughtCourse to true
app.post('/api/saveEmail', async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ userEmail: email });

    if (user) {
      user.hasBoughtCourse = true;
      await user.save();
    } else {
      user = new User({ userEmail: email, hasBoughtCourse: true });
      await user.save();
    }

    res.status(200).json({ success: true, message: 'User email saved and hasBoughtCourse updated.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
