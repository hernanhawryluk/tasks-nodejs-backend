import "dotenv/config";
import app from "./app";
import { connectDB } from "./db";

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT);
console.log("Server on port", PORT);
