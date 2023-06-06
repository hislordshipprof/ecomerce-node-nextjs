import styles from "@/styles/styles";
import React from "react";
// import { backend_url } from "../../server";
import { useDispatch, useSelector } from "react-redux";
// import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import CountDown from "./CountDown";
import Link from "next/link";

const EventCard = ({ active, data }: any) => {
  //   const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data: any) => {
    // const isItemExists = cart && cart.find((i) => i._id === data._id);
    // if (isItemExists) {
    //   toast.error("Item already in cart!");
    // } else {
    //   if (data.stock < 1) {
    //     toast.error("Product stock limited!");
    //   } else {
    //     const cartData = { ...data, qty: 1 };
    //     // dispatch(addTocart(cartData));
    //     toast.success("Item added to cart successfully!");
    //   }
    // }
  };
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:-w[50%] m-auto">
        {/* <img src={`${backend_url}${data.images[0]}`} alt="" /> */}
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>
          {/* {data.name} */}Iphone 14pro max 8/128gb
        </h2>
        <p>
          {/* {data.description} */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          tristique, urna sed semper interdum, nulla massa tincidunt turpis,
          vitae dictum tortor urna at justo. Morbi a sagittis dui. Quisque
          interdum facilisis lectus, in tristique turpis sollicitudin in. Duis
          at justo enim. Nullam ullamcorper massa sed tellus feugiat, a iaculis
          lorem sagittis. Etiam pellentesque lorem ac blandit efficitur. Proin
          id metus luctus, fringilla orci ut, volutpat urna. Donec finibus dolor
          nec nulla vehicula tincidunt. Vivamus sit amet metus id velit sagittis
          fringilla vitae ut mauris. Nulla facilisi. Nullam vitae diam at ipsum
          pharetra auctor at eu lacus.
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {/* {data.originalPrice}$ */} $1000
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {/* {data.discountPrice}$ */} $999
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {/* {data.sold_out}  */}
            120 sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          {/* <Link href={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link> */}
          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
