import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import CartProductElement from "./CartProductElement";
import { addCheckout, removeCheckout } from "../../redux/action/checkoutAction";

const CartElement = ({ cartOpen, handleCart }) => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const { cart } = useSelector((state) => state.cart);
  const { checkout } = useSelector((state) => state.checkout);

  const handleSelectAll = (e) => {
    const ids = cart.map((item) => item.id);

    if (cart.length !== checkout.length) {
      dispatch(addCheckout(ids));
    } else {
      dispatch(removeCheckout(ids));
    }
  };

  useEffect(() => {
    const totalAmount = cart
      .filter((item) => checkout.includes(item.id))
      .reduce((acc, item) => acc + item.amount * item.price, 0);
    setTotal(totalAmount);
  }, [checkout, cart]);

  return (
    <section
      className={`${
        cartOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20`}
    >
      <div className="flex flex-col h-full justify-between px-4">
        {/* title */}
        <div className="flex justify-between items-center py-6 border-b-2">
          <div>Shopping Cart</div>
          <div className="flex justify-between gap-x-4 text-xl">
            <button onClick={handleCart}>
              <FaArrowRight />
            </button>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            KERANJANG KAMU MASIH KOSONG
          </div>
        ) : (
          <div className="flex flex-col h-full justify-between">
            <div className="overflow-y-auto max-h-[470px]">
              {cart.map((item, index) => (
                <CartProductElement item={item} key={index} />
              ))}
            </div>

            {/* checkout */}
            <div className="py-4">
              <div className="flex justify-between py-2">
                <div className="flex items-center gap-x-2">
                  {/* Select All Checkbox */}
                  <input
                    onChange={handleSelectAll}
                    type="checkbox"
                    className="w-4 h-4"
                    checked={checkout.length === cart.length}
                  />
                  <div>Pilih semua</div>
                </div>

                <div>Total harga: ${total.toFixed(2)}</div>
              </div>

              <button
                className={`${
                  checkout.length !== 0
                    ? "bg-tertiary"
                    : "bg-gray-500 cursor-not-allowed "
                } btn w-full text-white`}
                disabled={checkout.length === 0}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartElement;