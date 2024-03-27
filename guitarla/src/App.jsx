import { useState } from "react"
import { useEffect } from "react";
import { db } from "./data/db"
import Header from "./components/Header"
import Guitar from "./components/Guitar"

function App() {
  const MIN_QUANTITY = 0

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  
  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  useEffect(() =>{
    localStorage.setItem("cart", JSON.stringify(cart))
  },[cart])


  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id)

    if (itemExists >= 0) {
      const updateCart = [...cart]
      updateCart[itemExists].quantity++
      setCart(updateCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function removeFromCart(id) {
    setCart(prepCart => prepCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id) {
    const updateCart = cart.map(item => {
      if (item.id == id) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function decreaseQuantity(id) {
    const updateCart = cart.map(item => {
      if (item.id == id) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })


    setCart(updateCart.filter(guitar => guitar.quantity != MIN_QUANTITY ))
  }

  function cleanCart() {
    setCart([]);
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleanCart={cleanCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}

        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App