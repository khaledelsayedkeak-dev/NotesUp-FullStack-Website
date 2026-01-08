import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import notesRouter from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import ratelimiter from "./middleware/rateLimiter.js"
import path from "path";


const app = express();
const PORT = process.env.PORT || 5001;
dotenv.config();
const __dirname = path.resolve();

//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
app.use(ratelimiter);
app.use("/api/notes", notesRouter);


// Serve static files from the React frontend app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist' , 'index.html'));
  });
}


connectDB().then( () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
