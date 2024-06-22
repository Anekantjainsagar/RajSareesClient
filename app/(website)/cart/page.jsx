import dynamic from "next/dynamic";
const Cart = dynamic(() => import("./Cart"), {
  ssr: false,
});

const CartComponent = () => {
  return <Cart />;
};

export default CartComponent;