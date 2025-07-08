import { db } from '../data/data.js';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';

const productsCollection = collection(db, 'products');

export async function getProductById(id) {
  const productDoc = await getDoc(doc(productsCollection, id));
  return productDoc.exists() ? { id: productDoc.id, ...productDoc.data() } : null;
}

export async function getAllProducts() {
  const querySnapshot = await getDocs(productsCollection);
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
}

export async function createProduct(product) {
  try {
    const docRef = await addDoc(productsCollection, product);
    return { id: docRef.id, ...product };
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return null;
  }
}

export const updateProduct = async (id, trademark, name, price, categories) => {
  try {
    const productRef = doc(productsCollection, id);
    await updateDoc(productRef, {
      trademark,
      name,
      price,
      categories
    });
    return {
      id,
      trademark,
      name,
      price,
      categories
    };
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return null;
  }
};

export async function deleteProduct(id) {
  try {
    await deleteDoc(doc(productsCollection, id));
    return true;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return false;
  }
}

