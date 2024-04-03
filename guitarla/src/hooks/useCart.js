
import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"

export const useCart = () => {

    const MIN_QUANTITY = 0

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])


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


        setCart(updateCart.filter(guitar => guitar.quantity != MIN_QUANTITY))
    }

    function cleanCart() {
        setCart([]);
    }

    //state derovadp
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])


    return {
        data,
        cart,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        cleanCart,
        increaseQuantity,
        isEmpty,
        cartTotal
    }
}

export default useCart
