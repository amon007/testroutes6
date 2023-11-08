import React from "react";

export default function Buy() {
  const inputsQuantity = [1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <div className=" ">
      <div className="flex justify-center items-center flex-col">
        {inputsQuantity.map(() => (
          <div key={Math.random() * Date.now()} className="">
            <input type="text" className=" border-2 outline-none p-2 m-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
