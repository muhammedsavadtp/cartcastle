import Layout from "../../components/Layout";
import ProductItem from "../../components/ProductItem";
import db from "../../utils/db";
import Product from "../../models/Product";
import { useContext } from "react";
import { Store } from "../../utils/Store";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.id == product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      toast.error("sorry this product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

    toast.success("product added to the cart");
  };
  return (
    <Layout title={"homePage"}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          return (
            <ProductItem
              product={product}
              key={product.id}
              addToCartHandler={addToCartHandler}
            ></ProductItem>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
