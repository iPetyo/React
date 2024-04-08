import { Dispatch, useMemo } from "react"
import { OrderItem } from "../types"
import { OrderActions } from "../reducers/order-reducer"

type OrderTotalsProps = {
    order: OrderItem[],
    tip: number,
    dispatch: Dispatch<OrderActions>
}

export default function OrderTotals({ order, tip, dispatch }: OrderTotalsProps) {

    const subTotalAmount = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

    const tipAmount = useMemo(() => subTotalAmount * tip, [tip, order])

    const totalAmount = useMemo(() => subTotalAmount + tipAmount, [tip, order])

    return (
        <>
            <div className='space-y-3'>
                <h2 className='font-black text-2xl'></h2>
                <p>Subtotal a pagar :{''}
                    <span className="font-bold">${subTotalAmount}</span>
                </p>

                <p>Propina :{''}
                    <span className="font-bold">${tipAmount}</span>
                </p>

                <p>Total a Pagar :{''}
                    <span className="font-bold">${totalAmount}</span>
                </p>
            </div>
            <button
                className="w-full bg-black p-3 text-white font-bold mt-10 disabled:opacity-10"
                disabled={totalAmount === 0}
                onClick={() => dispatch({type:"place-order"})}>
                Guardar Orden
            </button>
        </>
    )
}
