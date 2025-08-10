import express from "express";
import instagramRoutes from "./routes/instagramRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/instagram", instagramRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Buzzly API! 🚀",
    endpoints: {
      posts: "/api/posts",
      instagram: "/api/instagram/media",
      health: "/health",
    },
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Buzzly server is running on http://localhost:${PORT} 🚀`);
  console.log(
    `Instagram API available at http://localhost:${PORT}/api/instagram/media`
  );
});
