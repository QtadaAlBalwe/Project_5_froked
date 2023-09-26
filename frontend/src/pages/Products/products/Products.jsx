import axios from 'axios';
import React, { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import "./Products.css"
const Products = () => {
  const { result } = useLoaderData();

  return (
    <>
      <h2>Products</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={result} errorElement={<p>Error loading products.</p>}>
          {result => (
            <div>
              {result?.map(product => (
                <div className="productContainer" key={product.id}>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                </div>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default Products;

export const productsLoader = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/products`);
    const products = response.data.result;
    return { result: products };
  } catch (error) {
    throw error; 
  }
};
