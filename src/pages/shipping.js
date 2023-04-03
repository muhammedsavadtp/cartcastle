import React, { useContext, useEffect } from "react";
import Layout from "../../components/Layout";
import CheckoutWizard from "../../components/CheckoutWizard";
import { useForm } from "react-hook-form";
import { Store } from "../../utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const {shippingAddress } = cart;

  useEffect(() => {
    if (shippingAddress) {
      setValue("fullName", shippingAddress.fullName);
      setValue("address", shippingAddress.address);
      setValue("city", shippingAddress.city);
      setValue("postalCode", shippingAddress.postalCode);
      setValue("country", shippingAddress.country);

      console.log("this isshippingAddress ", shippingAddress);
    }
  }, [  setValue,shippingAddress ]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });

    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {  
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );
    router.push("/payment");   
  };

  return (
    <Layout title={"shipping Address"}>
      <CheckoutWizard activeStep={1} />
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mx-auto max-w-screen-md"
      >
        <h1 className="mb-4 text-xl ">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className="w-full "
            id="fullName"
            autoFocus
            {...register("fullName", {
              required: "Please enter full name",
            })}
          />
          {errors.fullName && (
            <div className="text-red-500 ">{errors.fullName.message} </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="w-full "
            id="address"
            {...register("address", {
              required: "Please enter address",
              minLength: { value: 3, message: "Adress is more than 2 chars" },
            })}
          />
          {errors.address && (
            <div className="text-red-500 ">{errors.address.message} </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="w-full "
            id="city"
            {...register("city", {
              required: "Please enter city",
            })}
          />
          {errors.city && (
            <div className="text-red-500 ">{errors.city.message} </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="postalCode">Postal code</label>
          <input
            type="text"
            className="w-full "
            id="postalCode"
            {...register("postalCode", {
              required: "Please enter postal code",
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500 ">{errors.postalCode.message} </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            className="w-full "
            id="country"
            {...register("country", {
              required: "Please enter Country",
            })}
          />
          {errors.country && (
            <div className="text-red-500 ">{errors.country.message} </div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}
ShippingScreen.auth = true;

export default ShippingScreen;

