import { Dispatch } from "react";
import { OrderActions } from "../reducers/order-reducer";
import type { OrderItem } from "../types";

type OrderContestsProps = {
  order: OrderItem[],
  dispatch:  Dispatch<OrderActions>
}

export default function OrderContents({ order, dispatch }: OrderContestsProps) {
  return (
    <div>
      <h2 className="text-4xl font-black">Consumo</h2>

      <div className="space-y-3 mt-10">
        {
          order.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center border-t border-gray-200 py-5 last-of-type:border-b">
              <div>
                <p className="text-lg ">
                  {item.name} - ${item.price}
                </p>
                <p className="font-black">
                  Cantidad {item.quantity} - ${item.price * item.quantity}
                </p>
              </div>

              <button
                className="bg-red-600 h-8 w-8 rounded-full text-white font-black"
                onClick={() => dispatch({type:"remove-item",payload:{id:item.id}})}>
                x
              </button>

            </div>
          ))
        }
      </div>
    </div>
  )
}
