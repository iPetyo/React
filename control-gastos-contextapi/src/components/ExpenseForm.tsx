import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: "",
        category: "",
        date: new Date()
    })

    const [error, setError] = useState('')
    const [ previousAmopunt, setPreviousAmopunt] = useState(0)
    const { dispatch, state, remainingBudget } = useBudget()

    useEffect(() => {
      if (state.editingId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id == state.editingId)[0]
            setExpense(editingExpense);
            setPreviousAmopunt(editingExpense.amount)
      }     
    
      return () => {
      }
    }, [state.editingId])
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value
        })
    }

    const handleChangeData = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //validar
        if (Object.values(expense).includes('')) {
            setError('todos los campos son necesarios')
            return e
        }
        //validar no pasar el limite 
        if ((expense.amount - previousAmopunt) > remainingBudget) {
            setError('Se pasa del presupuesto')
            return e
        }
    
        //Agregar o actualizar el gasto
        if (state.editingId) {
            dispatch({ type: "update-expense", payload: { expense: {id:state.editingId,...expense} } }) 
        }else{
             dispatch({ type: "add-expense", payload: { expense } })
        }
       
        // reiniicar el state
        setExpense({
            amount: 0,
            expenseName: "",
            category: "",
            date: new Date()
        })
        setPreviousAmopunt(0)

    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                {state.editingId ? "Actualizar Gasto" : "Nuevo Gasto"}
            </legend>

            {error && <ErrorMessage> {error} </ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName"
                    className="text-xl">
                    Nombre Gasto</label>

                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount"
                    className="text-xl">
                    Cantidad</label>

                <input
                    type="number"
                    id="amount"
                    placeholder="Añade la cantidad del gasto: ej. 300"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="category"
                    className="text-xl">
                    Categoria</label>

                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option value="">-- Selecione --</option>
                    {categories.map(category => (
                        <option
                            value={category.id}
                            key={category.id}
                        >{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount"
                    className="text-xl">
                    Fecha Gastos</label>

                <DatePicker
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date}
                    onChange={handleChangeData}
                />
            </div>

            <input
                type="submit"
                className=" bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={state.editingId ? "Guardar Cambios ":'Registrar Gastos'}
            />
        </form>
    )
}
