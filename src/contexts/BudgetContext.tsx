import React, { useContext, useState } from "react"
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../hooks/useLocalStorage"
import { BudgetType, ExpenseType } from "../types"

 
const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
  return useContext(BudgetsContext)
}


export const BudgetsProvider = ({ children }:{children:React.ReactNode}) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", [])
  const [expenses, setExpenses] = useLocalStorage("expenses", [])

  function getBudgetExpenses(budgetId:string) {
    return expenses.filter((expense:ExpenseType) => expense.budgetId === budgetId)
  }


  function addExpense({ description, amount, budgetId }:{description:string,amount:number,budgetId:string}) {
    setExpenses((prevExpenses:ExpenseType[]) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }]
    })
  }
  function addBudget({ name, max }:{name:string,max:number}) {
    setBudgets((prevBudgets:BudgetType[]) => {
      if (prevBudgets.find(budget => budget.name === name)) {
        return prevBudgets
      }
      return [...prevBudgets, { id: uuidV4(), name, max }]
    })
  }
  function deleteBudget({ id }:{id:string}) {
    setExpenses((prevExpenses:ExpenseType[]) => {
      return prevExpenses.map(expense => {
        if (expense.budgetId !== id) return expense
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
      })
    })

    setBudgets((prevBudgets:BudgetType[]) => {
      return prevBudgets.filter(budget => budget.id !== id)
    })
  }
  function deleteExpense({ id }:{id:string}) {
    setExpenses((prevExpenses:ExpenseType[]) => {
      return prevExpenses.filter(expense => expense.id !== id)
    })
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  )
}
