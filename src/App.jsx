import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";
import { useState } from "react";


function App() {
  const [data] = useState(db);


 const [cart, setCart] = useState([]);

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


  return (
    <>
      <Header />
      <main className="container-xl mt-5 ">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="mt-5 row" style={{ flexWrap: "wrap" }}>
          {data.map((guitar) => (
            <Guitar
               key={guitar.id}
              guitar={guitar} //props
              cart={cart}
              setCart={setCart} //props
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
