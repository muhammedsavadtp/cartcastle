import Head from "next/head";
import Layout from "../../components/Layout";
import data from "../../utils/data";
import ProductItem from "../../components/ProductItem";

export default function Home() {
  return <Layout title={'homePage'}>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {data.products.map((product,index) => {
        return (
          <ProductItem product={product} key={index}/>
        )
      })}
    </div>
  </Layout>;
}
