import express from "express";
const app = express();

const products =[
  {id:1, name: "Producto 1", price: 100},
  {id:2, name: "Producto 2", price: 200},
  {id:3, name: "Producto 3", price: 300}  
]

app.get('/', (req,res) =>{
  res.send('<h1>Hola a mi Api Rest</h1>');
});

app.get('/products', (req, res) =>{
  res.json(products);
});

app.get('/products/:id', (req, res) =>{
  const product = products.find((item) => item.id == req.params.id);
  res.json(product);
});









const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
