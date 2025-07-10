import * as model from '../models/products.model.js'

export const getAllProducts = async (req, res) => {
  try {
    const products = await model.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const { name } = req.query;
    const products = await model.getAllProducts(); 
    const filteredProducts = products.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar producto" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await model.getProductById(id); 
    if (!product) {
      return res.status(404).json({ error: "No existe el producto" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { trademark, name, price, categories } = req.body;
    await model.createProduct({ trademark, name, price, categories }); 
    res.status(201).json({ message: "Producto creado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { trademark, name, price, categories } = req.body;
    const updated = await model.updateProduct(productId, trademark, name, price, categories); 
    if (!updated) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({
      message: "Producto actualizado con éxito",
      product: updated
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deleted = await model.deleteProduct(productId); 
    if (!deleted) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Producto borrado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al borrar producto" });
  }
};
