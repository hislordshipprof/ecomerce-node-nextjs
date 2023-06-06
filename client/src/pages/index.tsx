import React from "react";

import Footer from "@/components/Global/Footer";
import Header from "@/components/Global/Header";
import Hero from "@/components/Route/Hero";
import Categories from "@/components/Route/Categories";
import BestDeals from "@/components/Route/BestDeals";
import FeaturedProduct from "@/components/Route/FeaturedProduct";
import Events from "@/components/Events/Events";
import Sponsored from "@/components/Route/Sponsored";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </div>
  );
};

export default HomePage;
