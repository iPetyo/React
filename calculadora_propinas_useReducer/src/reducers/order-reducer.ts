import { MenuItems, OrderItem } from "../types";

export type OrderActions =
    { type: "add-item", payload: { item: MenuItems } } |
    { type: "remove-item", payload: { id: MenuItems['id'] } } |
    { type: "place-order" } |
    { type: "add-tip", payload: { value: number } }

export type OrderState = {
    order: OrderItem[],
    tip: number
}

export const initialState: OrderState = {
    order: [],
    tip: 0
}

export const orderReducer = (
    state: OrderState = initialState,
    action: OrderActions
) => {

    let itemExist;
    let order: OrderItem[] = []
    let newItem: OrderItem
    let tip;
    switch (action.type) {
        case "add-item":
            itemExist = state.order.find(orderItem => orderItem.id === action.payload.item.id)

            if (itemExist) {
                order = state.order.map(orderItem => orderItem.id === action.payload.item.id ?
                    { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem)

            } else {
                newItem = { ...action.payload.item, quantity: 1 }
                order = [...state.order, newItem]
            }

            return {
                ...state,
                order
            }
            break;
        case "place-order":
            return {
                ...state,
                order: [],
                tip: 0
            }
            break;
        case "remove-item":
            order = state.order.filter( item => item.id !== action.payload.id)
            return {
                ...state,
                order
            }
            break;
        case "add-tip":
            tip =action.payload.value
            return {
                ...state,
                tip
            }
            break;
        default:
            break;
    }
}