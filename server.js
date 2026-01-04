const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

cloudinary.config({
  cloud_name: "dk1jm0rwi",
  api_key: "268969317829335",
  api_secret: "pFEDCMEny6uiWc2VOuuq1vsB4b0"
});

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      "data:image/jpeg;base64," + req.file.buffer.toString("base64")
    );
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("ESP32 Camera Server Running");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});




