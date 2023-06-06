import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";
import Footer from "@/components/Global/Footer";
import Header from "@/components/Global/Header";
import ProductCard from "@/components/Route/ProductCard";
import { productData } from "@/utils/data";

const BestSellingPage = () => {
  const [data, setData] = useState<any[]>([]);
  //   const {allProducts,isLoading} = useSelector((state) => state.products);

  useEffect(() => {
    // const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = productData?.sort((a, b) => b.total_sell - a.total_sell);
    setData(sortedData);
  }, []);

  return (
    <>
      {/* {
    isLoading ? (
      <Loader />
    ) : ( */}
      <div>
        <Header activeHeading={2} />
        <br />
        <br />
        <div className={`${styles.section}`}>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {data &&
              data.map((i: {}, index: number) => (
                <ProductCard data={i} key={index} />
              ))}
          </div>
        </div>
        <Footer />
      </div>
      {/* )
   } */}
    </>
  );
};

export default BestSellingPage;
