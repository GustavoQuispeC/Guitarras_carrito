import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";
import { useEffect, useState } from "react";

function App() {

  //!funcion para obtener el carrito del localStorage
  const initialCart = ()=>{
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart); //estado del carrito

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //!funcion para agregar un item al carrito
  function addToCart(item) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExist >= 0) {
      console.log("ya existe");
      const updateCart = [...cart]; //obteniendo copia de cart
      updateCart[itemExist].quantity++;
      setCart(updateCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }
  //!funcion para remover un item del carrito
  function removeFromCart(id) {
    const updateCart = cart.filter((guitar) => guitar.id !== id);
    setCart(updateCart);
  }

  //!funcion para aumentar la cantidad de un item
  function increaseQuantity(id) {
    const itemExist = cart.findIndex((guitar) => guitar.id === id);
    const updateCart = [...cart];
    updateCart[itemExist].quantity++;
    setCart(updateCart);
  }

  //!funcion para disminuir la cantidad de un item
  function decreaseQuantity(id) {
    const itemExist = cart.findIndex((guitar) => guitar.id === id);
    if (cart[itemExist].quantity > 1) {
      const updateCart = [...cart];
      updateCart[itemExist].quantity--;
      setCart(updateCart);
    } else {
      removeFromCart(id);
    }
  }
  //!funcion para limpiar el carrito
  function clearCart() {
    setCart([]);
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5 ">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="mt-5 row" style={{ flexWrap: "wrap" }}>
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar} //props
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
