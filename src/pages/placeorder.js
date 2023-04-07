import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import CheckoutWizard from "../../components/CheckoutWizard";
import Link from "next/link";
import { Store } from "../../utils/Store";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getError } from "../../utils/error";
import axios from "axios";
import Cookies from "js-cookie";

function PlaceorderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  const shippingPrice = itemsPrice > 500 ? 0 : 40;
  const taxPrice = round2(itemsPrice * 0.02);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (error) {
      setLoading(false);
      toast.error(getError(error));
    }
  };
  return (
    <Layout title={"place order"}>
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl ">Place order</h1>
      {cartItems.legth === 0 ? (
        <div>
          cart is empty . <Link href={"/"}>Go shopping </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3 ">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                {shippingAddress.fullName},{shippingAddress.fullName},{""}
                {shippingAddress.city},{shippingAddress.postalCode},{""}
                {shippingAddress.country},{""}
              </div>
              <div>
                <Link href={"/shipping"}>Edit</Link>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg ">Pyment Method</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link href={"/payment"}>Edit</Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
              <table className="min-w-full ">
                <thead className="border -b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="px-5 text-right">Quantity</th>
                    <th className="px-5 text-right">Price</th>
                    <th className="px-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Link
                            href={`/product/${item.id}`}
                            className="flex items-center"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            />
                            &nbsp;
                            {item.name}
                          </Link>
                        </td>
                        <td className="p-5 text-right">{item.quantity}</td>
                        <td className="p-5 text-right">{item.price}</td>
                        <td className="p-5 text-right">
                          {item.quantity * item.price}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div>
                <Link href={"/cart"}>Edit</Link>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Order Summery</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>₹{itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>₹{taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>₹{shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Total</div>
                  <div>₹{totalPrice}</div>
                </div>
              </li>
              <li>
                <button
                  disabled={loading}
                  onClick={placeOrderHandler}
                  className="primary-button w-full"
                >
                  {loading ? "Loading..." : "Place Order"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

PlaceorderScreen.auth = true;
export default PlaceorderScreen;
