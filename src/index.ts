import express from "express";
import energeticaRoutes from "./routes/energeticaRoutes.js";
import { RsaPublicKey, RsaPrivateKey } from "./middleware/rsa.js";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.use(express.json());

mongoose
    .connect('mongodb://localhost:27017/SCIOTS-Energetica')
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.error('DB Connection Error:', error));
    
app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});