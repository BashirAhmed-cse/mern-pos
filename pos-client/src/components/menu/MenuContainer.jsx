import React, { useState } from "react";
import { menus } from "../../constants";
import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartslice";

const MenuContainer = () => {
  const [selected, setSelected] = useState(menus[0]);
  const [itemCount, setItemCount] = useState({});
  const [itemId, setItemId] = useState();

  const dispatch = useDispatch();

  const increment = (id) => {
    setItemId(id);
    setItemCount((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, 6), // Max limit 6
    }));
  };

  const decrement = (id) => {
    setItemId(id);
    setItemCount((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0), // Min limit 0
    }));
  };

  const handleAddToCart = (item) => {
    if (!itemCount[item.id] || itemCount[item.id] === 0) return;
  
    const { name, price } = item;
    const newObj = {
      id: item.id, // Keep the item's original ID
      name,
      pricePerQuantity: price,
      quantity: itemCount[item.id],
      price: price * itemCount[item.id],
    };
  
    dispatch(addItems(newObj));
  
    // Reset only the count for the added item
    setItemCount((prev) => ({ ...prev, [item.id]: 0 }));
  };
  

  return (
    <>
      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
        {menus.map((menu) => {
          return (
            <div
              key={menu.id}
              className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer"
              style={{ backgroundColor: menu.bgColor }}
              onClick={() => {
                setSelected(menu);
                setItemId(null);
                setItemCount({});
              }}
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {menu.icon} {menu.name}
                </h1>
                {selected.id === menu.id && (
                  <GrRadialSelected className="text-white" size={20} />
                )}
              </div>
              <p className="text-[#ababab] text-sm font-semibold">
                {menu.items.length} Items
              </p>
            </div>
          );
        })}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4" />

      <div className="grid grid-cols-4 gap-4 px-10 py-4 w-[100%]">
        {selected?.items.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col items-start justify-between p-4 rounded-lg
              h-[150px] cursor-pointer hover:bg-[#2a2a2a] bg-[#1a1a1a]"
            >
              <div className="flex items-start justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {item.name}
                </h1>
                <button
                onClick={() => handleAddToCart(item)}
                 className="bg-[#2e4a40] text-[#02ca30] p-2 rounded-lg cursor-pointer">
                  <FaShoppingCart size={20} />
                </button>
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="text-[#ababab] text-xl font-bold">
                  ${item.price}
                </p>
                <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg gap-6">
                  <button
                    className="text-yellow-500 text-2xl disabled:opacity-50"
                    onClick={() => decrement(item.id)}
                    disabled={itemCount[item.id] === 0}
                    aria-label="Decrease item count"
                  >
                    &minus;
                  </button>
                  <span className="text-white">{itemCount[item.id] || 0}</span>
                  <button
                    className="text-yellow-500 text-2xl"
                    onClick={() => increment(item.id)}
                    aria-label="Increase item count"
                  >
                    &#43;
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MenuContainer;
