import React from "react";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import data from "../../../utils/data";
import Link from "next/link";

function ProductScreen() {
  const { query } = useRouter();
  const { id } = query;
  const product = data.products.find((x) => x.id == id);

  if (!product) {
    return <div> Product Not Found</div>;
  }
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href={"/"}>back to products </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2 ">
          <img
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg font-bold">{product.name} </h1>
            </li>
            <li>Category:{product.category} </li>
            <li>Brand:{product.brand} </li>
            <li>
              {product.rating} of {product.numReviews} reviews{" "}
            </li>
            <li>Description : {product.description} </li>
          </ul>
        </div>
        <div>
          <div className="card p-5 ">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div className="">₹{product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countlnStock > 0 ? "in stock" : "Unavailable"}</div>
            </div>
            <button className="primary-button w-full ">Add to cart</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductScreen;
