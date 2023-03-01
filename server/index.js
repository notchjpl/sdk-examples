import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import backendRouter from "./routes/backendRoutes.js";
import webhookRouter from "./routes/webhookRoutes.js";
import externalRouter from "./routes/externalRoutes.js";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "development") {
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
}

app.use("/backend", backendRouter);
app.use("/external", externalRouter);
app.use("/webhooks", webhookRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
