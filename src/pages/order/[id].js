import { useEffect, useReducer } from "react";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import axios from "axios";
import { getError } from "../../../utils/error";
import Link from "next/link";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS": {
      return { ...state, loading: false, order: action.payload, error: "" };
    }
    case "FETCH_FAIL": {
      return { ...state, loading: false, error: action.payload };
    }
    default:
      return state;
  }
}

function OrderScreen() {
  const { query } = useRouter();
  const orderId = query.id;

  const [
    { loading, error, order, successPay, loadingDeliver, successDeliver },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, orderId]);

  const {
    shippingAddress,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDeliverd,
    deliverdAt,
    paymentMethod,
    
  } = order;


  return (
    <Layout title={`Order ${orderId}`}>
      <h1 className="mb-4 text-xl ">{`Order ${orderId}`}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg ">Shipping Address</h2>
              <div>
                {shippingAddress.fullName},{shippingAddress.address},
                {shippingAddress.city},{shippingAddress.postalCode},
                {shippingAddress.country},
              </div>
              {isDeliverd ? (
                <div className="alert-success">Deliverd at {deliverdAt}</div>
              ) : (
                <div className="alert-error">Not deliverd</div>
              )}
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg ">Payment Method</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className="alert-success">paid at {paidAt}</div>
              ) : (
                <div className="alert-error">Not paid</div>
              )}
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
                      {orderItems.map((item, index) => {
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
            </div>
          </div>
          <div>
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
                    <div>Total price</div>
                    <div>₹{totalPrice}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
OrderScreen.auth = true;
export default OrderScreen;
