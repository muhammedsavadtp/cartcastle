import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Store } from "../utils/Store";
import { signOut, useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";
const Layout = ({ title, children }) => {
  //get current year function
  const currentYear = () => {
    const now = new Date();
    const year = now.getFullYear();
    return year; 
  };
  const { state ,dispatch} = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { status, data: session } = useSession();
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);
  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({type:'CART_RESET'})
    signOut({callbackUrl:'/login'})
  }
  return (
    <>
      <Head>
        <title>{title ? title + " - cartcastle" : "cartcastle"} </title>
        <meta name="description" content="Ecommerce webdsite" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between shadow-md items-center px-4">
            <Link href={"/"} className="text-lg font-bold">
              cartcastle
            </Link>
            <div>
              <Link className="p-2" href={"/cart"}>
                cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {status === "loading" ? (
                "loading"
              ) : session?.user ? (
                  <Menu as={'div'} className={'relative inline-block'}>
                    <Menu.Button className={'text-blue-600'}>
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className={'absolute right-0 w-56 orgin-top-right bg-white shadow-lg'}>
                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href='/profile'>Profile</DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href='/order-history'>Order History</DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href='#' onClick={logoutClickHandler} >Logout</DropdownLink>
                      </Menu.Item>
                    </Menu.Items>
                </Menu>
              ) : (
                <Link href={"/login"} className="p-2">
                  login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center shadow-inner">
          Copyright © {currentYear()} cartcastle{" "}
        </footer>
      </div>
    </>
  );
};

export default Layout;
