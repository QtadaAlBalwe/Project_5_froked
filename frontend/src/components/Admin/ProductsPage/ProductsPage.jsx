import axios from "axios";
import React, { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Await, useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import {
  addProduct,
  deleteProductById,
  setProducts,
  updateProductById,
} from "../../../service/redux/reducers/productSlice";

const ProductsPage = () => {
  const {products}=useSelector(state=>state.products)
  const [addProducts, setAddProducts] = useState({});
  const [updatedProduct, setUpdatedProduct] = useState({});

  const dispatch = useDispatch();
  const getAllProducts = async () => {
    try {
      const result = await axios.get("http://localhost:5000/products/category");
      if (result.data.success) {
        dispatch(setProducts(result.data.result));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addNewProduct = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:5000/products/",
        addProducts
      );
      if (result.data.success) {
        dispatch(addProduct(result.data.result));
      }
    } catch (error) {
      if (!error.response.data.success) {
        console.log(error.response.data);
      }
    }
  };
  const updateProduct = async (id) => {
    try {
      const result = await axios.put(`http://localhost:5000/products/${id}`,updatedProduct);
      
      dispatch(updateProductById(result.data.result));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:5000/products/${id}`);
      dispatch(deleteProductById(id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2>Products</h2>
      <form onSubmit={addNewProduct}>
        <br />
        <input
          type="text"
          placeholder="Product name "
          onChange={(e) =>
            setAddProducts({ ...addProducts, name: e.target.value })
          }
        />
        <br />
        <textarea
          placeholder="description"
          onChange={(e) =>
            setAddProducts({ ...addProducts, description: e.target.value })
          }
        ></textarea>
        <br />
        <input
          type="text"
          placeholder="Product name "
          onChange={(e) =>
            setAddProducts({ ...addProducts, img: e.target.value })
          }
        />
        <br />
        <input
          type="number"
          placeholder=" inventory_id "
          onChange={(e) =>
            setAddProducts({ ...addProducts, inventory_id: e.target.value })
          }
        />
        <br />
        <input
          type="number"
          placeholder="category_id  "
          onChange={(e) =>
            setAddProducts({ ...addProducts, category_id: e.target.value })
          }
        />
        <br />
        <button >Add Products</button>
      </form>
      
              {products&&products?.map((product) => (
                <div className="productContainer" key={product.id}>
                  <h2>{product.name}</h2>
                  <input
                    type="text"
                    placeholder="Product name "
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      })
                    }
                  /><button onClick={()=>{
                  
                    updateProduct(product.id)
                   
                    
                    }}>update</button>
                  <p>{product.description}</p>
                  <button
                    onClick={() => {
                      deleteProduct(product.id);
                    }}
                  >
                    delete Products
                  </button>
                  <Link to={`/products/${product.id}`}>View Details</Link>
                </div>
              ))}
        
    </>
  );
};

export default ProductsPage;
