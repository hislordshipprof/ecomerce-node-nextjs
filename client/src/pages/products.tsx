import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";

// import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";
import Header from "@/components/Global/Header";
import ProductCard from "@/components/Route/ProductCard";
import Footer from "@/components/Global/Footer";
import { productData } from "@/utils/data";
import { useRouter } from "next/router";
const ProductsPage = () => {
  // const [searchParams] = useSearchParams();
  // const categoryData = searchParams.get("category");
  // const {allProducts,isLoading} = useSelector((state) => state.products);
  const router = useRouter();
  const { category } = router.query;
  const [data, setData]: any = useState([]);

  useEffect(() => {
    if (category === undefined) {
      const d =
        productData && productData.sort((a, b) => a.total_sell - b.total_sell);
      setData(d);
    } else {
      const d =
        productData && productData.filter((i) => i.category === category);
      setData(d);
    }

    window.scrollTo(0, 0);
  }, [category]);

  return (
    <>
      {/* { */}
      {/* // isLoading ? ( */}
      {/* // <Loader /> */}
      {/* // ) : ( */}
      <div>
        <Header activeHeading={3} />
        <br />
        <br />
        <div className={`${styles.section}`}>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {data &&
              data.map((i: any, index: any) => (
                <ProductCard data={i} key={index} />
              ))}
          </div>
          {data && data.length === 0 ? (
            <h1 className="text-center w-full pb-[100px] text-[20px]">
              No products Found!
            </h1>
          ) : null}
        </div>
        <Footer />
      </div>
      {/* ) */}
      {/* } */}
    </>
  );
};

export default ProductsPage;
