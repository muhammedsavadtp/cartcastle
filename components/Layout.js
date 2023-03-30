import Head from "next/head";
import Link from "next/link";

const Layout = ({ title, children }) => {
  //get current year function
  const currentYear = () => {
    const now = new Date();
    const year = now.getFullYear();
    return year;
  };

  return (
    <>
      <Head>
        <title>{title ? title + " - cartcastle" : "cartcastle"} </title>
        <meta name="description" content="Ecommerce webdsite" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between shadow-md items-center px-4">
            <Link href={"/"} className="text-lg font-bold">
              cartcastle
            </Link>
            <div>
              <Link className="p-2" href={"/cart"}>
                cart
              </Link>
              <Link className="p-2" href={"/login"}>
                login
              </Link>
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
