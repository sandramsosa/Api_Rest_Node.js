const products = [
  {id:1, name: "Uno 1", price: 100},
  {id:2, name: "Dos 2", price: 200},
  {id:3, name: "Tres 3", price: 300}  
]

export const getAllProducts = (req, res) =>{
  res.json(products);
};

export const searchProduct = (req, res) =>{
  const {name} = req.query;
  const filteredProducts = products.filter((p) =>
  p.name.toLowerCase().incluides(name.toLowerCase())
);
  res.json(filteredProducts);
};

export const getProductById = (req, res) =>{
  const {id} = req.params;
  const product = products.find((item) => item.id == id);
  if (!product) {
    res.status(404).json({erro: 'No existe el producto'});
  }
  res.json(product);
};

export const postProduct =(req, res) =>{
  const {name, price} = req.body;
  const newProduct ={
    id: products.length + 1,
    name,
    price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const putProduct = (req,res) =>{
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex === -1) {
    return res.status(404).json({error: 'Producto no encontrado'});
  }
  const {name, price} = req.body;
  products[productIndex] = {id: productId, name, price};
  res.json(products[productIndex]);
};

export const deleteProduct = (req,res) =>{
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex === -1) {
    return res.status(404).json({error: 'Producto no encontrado'});
  }
  products.splice(productIndex, 1);
  res.status(204).send();
};