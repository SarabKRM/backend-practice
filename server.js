import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import path from "path";
import { fileURLToPath } from "url";

// Required to use __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routers
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import modifyUiRouter from "./routes/modifyUiRoute.js";
import settingsRouter from "./routes/settingsRoutes.js";
import footerRouter from "./routes/footerRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import backgroundVideoRouter from "./routes/backgroundVideoRoute.js";
import carouselRouter from "./routes/carouselRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// CORS Configuration ✅
app.use(
  cors({
    origin: "http://localhost:5173", // replace with your frontend URL in production
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  })
);

// Optional: Manual CORS fallback (handles OPTIONS/preflight)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Middlewares
app.use(express.json());

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/modify", modifyUiRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/footer", footerRouter);
app.use("/api/category", categoryRouter);
app.use("/api/review", reviewRouter);
app.use("/api/background_video", backgroundVideoRouter);
app.use("/api/carousel", carouselRouter);

// Serve videos statically
app.use(
  "/uploads/videos",
  express.static(path.join(__dirname, "uploads/videos"))
);

// Default route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => console.log("Server started on PORT : " + port));
