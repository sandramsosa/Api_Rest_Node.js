import express from "express";
import cors from "cors";
import productsRouter from "./src/routes/products.router.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", productsRouter);

app.get('/', (req,res) =>{
  res.send('<h1>Hola a mi Api Rest</h1>');
});

app.use((req, res, next) => {
  res.status(404).json({error: 'Not found'})
});

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
