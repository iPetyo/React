import { Category, DraftExpense, Expense } from "../types"
import { v4 as uuid4 } from "uuid";

export type BudgetActions =
    { type: "add-budget", payload: { budget: number } } |
    { type: "show-modal" } |
    { type: "close-modal" } |
    { type: "add-expense", payload: { expense: DraftExpense } } |
    { type: "remove-expense", payload: { id: Expense['id'] } } |
    { type: "get-expense-by-id", payload: { id: Expense['id'] } } |
    { type: "update-expense", payload: { expense: Expense } } |
    { type: "reset-app" } |
    { type: "add-filter-category", payload: { id: Category['id'] } }

export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
    currentCategory: Category['id']
}

const inicialBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState: BudgetState = {
    budget: inicialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: '',
    currentCategory: ''
}

const createExpense = (drafExpense: DraftExpense): Expense => {
    return {
        ...drafExpense,
        id: uuid4()
    }
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {
    let expense;

    switch (action.type) {
        case "add-budget":

            return {
                ...state,
                budget: action.payload.budget
            }
            break;
        case "show-modal":
            return {
                ...state,
                modal: true
            }
            break;
        case "close-modal":
            return {
                ...state,
                modal: false,
                editingId: ''
            }
            break;
        case "add-expense":
            expense = createExpense(action.payload.expense)
            return {
                ...state,
                expenses: [...state.expenses, expense],
                modal: false
            }
            break;
        case "remove-expense":
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
            }
            break;
        case "get-expense-by-id":
            return {
                ...state,
                editingId: action.payload.id,
                modal: true
            }
            break;
        case "update-expense":
            return {
                ...state,
                expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
                modal: false,
                editingId: ''
            }
            break;
        case "reset-app":
            return {
                budget: 0,
                expenses: []
            }
            break;
        case "add-filter-category":

            return {
                ...state,
                currentCategory:action.payload.id
            }
            break;
        default:
            break;
    }
}