const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

require("dotenv").config();

const app = express();

const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const exercisesRouter = require("./routes/exercises");
const diaryRouter = require("./routes/diary");

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/diary", diaryRouter);
app.use("/api/users", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/exercises", exercisesRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
