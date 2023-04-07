import React, { useContext } from "react";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { Store } from "../../../utils/Store";
import Product from "../../../models/Product";
import db from "../../../utils/db";
import axios from "axios";
import { toast } from "react-toastify";

function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);

  const router = useRouter();
  if (!product) {
    return <Layout title={"Product Not Found"}> Product Not Found</Layout>;
  }
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.id == product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countlnStock < quantity) {
      return toast.error("sorry this product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };
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
              <div>{product.countInStock > 0 ? "in stock" : "Unavailable"}</div>
            </div>
            <button
              className="primary-button w-full "
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductScreen;

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  await db.connect();
  const product = await Product.findOne({ id }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
