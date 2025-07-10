import { Router } from "express";
import { 
  getAllProducts,
  searchProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/products.controller.js";
import { authentication } from "../middleware/authentication.js";

const router = Router();

router.get('/products', authentication, getAllProducts);
router.get('/products/search', authentication, searchProduct);
router.get('/products/:id', authentication, getProductById);
router.post('/products',authentication, createProduct);
router.put('/products/:id',authentication, updateProduct);
router.delete('/products/:id',authentication, deleteProduct);

export default router;
