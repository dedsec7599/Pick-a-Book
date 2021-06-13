//this "type":"module" in /root/package.json allows us to use import instead of require which is old way writing nodejs but you have to use ".js" at end of the filename as given below. Export is normal as usual. This is only done in backend

import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import {notFound,errorHandler} from "./middleware/errorMiddleware.js"
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  5000,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);