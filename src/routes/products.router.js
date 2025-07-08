// import { Router } from "express";
// import { 
//   getAllProducts,
//   searchProduct,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct
//  } from "../controllers/products.controller.js";


// const router = Router();

// router.get('/products', getAllProducts);
// router.get('/products/search', searchProduct);
// router.get('/products/:id', getProductById);
// router.post('/products', createProduct);
// router.put('/products/:id', updateProduct);
// router.delete('/products/:id', deleteProduct);

// export default router;
import { Router } from "express";
import { 
  getAllProducts,
  searchProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/products.controller.js";

import { verifyToken } from "../middleware/authentication.js";

const router = Router();

// Rutas protegidas con autenticación JWT
router.get('/products', verifyToken, getAllProducts);
router.get('/products/search', verifyToken, searchProduct);
router.get('/products/:id', verifyToken, getProductById);
router.post('/products', verifyToken, createProduct);
router.put('/products/:id', verifyToken, updateProduct);
router.delete('/products/:id', verifyToken, deleteProduct);

export default router;
