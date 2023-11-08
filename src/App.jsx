import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import FindByCategory from "./pages/FindByCategory/FindByCategory";
import GetProduct from "./pages/GetProduct/GetProduct";
import Dashboard from "./pages/dashboard/DashboardPage";
import AddProductPage from "./pages/dashboard/AddProductPage";
import AddCategoryPage from "./pages/dashboard/AddCategoryPage";
import Buy from "./pages/buy/Buy";
import React, { useEffect, useState } from "react";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";

export const Context = React.createContext();

function App() {
  const [addToBasket, setAddToBasket] = useState([]);
  const localBasket = localStorage.getItem("basket");
  useEffect(() => {
    if (localBasket) {
      const localBasketArray = JSON.parse(localBasket);
      setAddToBasket(localBasketArray);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(addToBasket));
  }, [addToBasket]);

  const [showBasket, setShowBasket] = useState(false);

  const add = (product) => {
    const index = addToBasket.findIndex((el) => el._id == product._id);
    if (index == -1) {
      const newProduct = {
        ...product,
        quantity: 1,
      };
      setAddToBasket([...addToBasket, newProduct]);
    } else {
      const newProduct = addToBasket.map((el) => {
        if (el._id === product._id) el.quantity = el.quantity + 1;
        return el;
      });
      setAddToBasket(newProduct);
    }
  };
  const plus = (id) => {
    const newProduct = addToBasket.map((el) => {
      if (el._id === id) el.quantity++;
      return el;
    });
    setAddToBasket(newProduct);
  };
  const minus = (id) => {
    const newProduct = addToBasket.map((el) => {
      if (el._id === id) el.quantity = el.quantity > 1 ? el.quantity - 1 : 1;
      return el;
    });
    setAddToBasket(newProduct);
  };
  const remove = (product) => {
    const newProduct = addToBasket.filter((el) => el._id !== product._id);
    setAddToBasket(newProduct);
  };
  const contextValue = {
    addToBasket,
    setAddToBasket,
    showBasket,
    setShowBasket,
    add,
    plus,
    minus,
    remove,
  };
  return (
    <>
      <Context.Provider value={contextValue}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:_id" element={<FindByCategory />} />
          <Route path="/electronic/:_id" element={<GetProduct />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addproduct" element={<AddProductPage />} />
          <Route path="/addcategory" element={<AddCategoryPage />} />
          <Route path="/buy/:_id" element={<Buy />} />
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
