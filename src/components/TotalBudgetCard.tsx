// import { useBudgets } from "../contexts/BudgetsContext"
import { useBudgets } from "../contexts/BudgetContext"
import { BudgetType, ExpenseType } from "../types"
import BudgetCard from "./BudgetCard"
 

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets()
  const amount = expenses.reduce((total:number, expense:ExpenseType) => total + expense.amount, 0)
  const max = budgets.reduce((total:number, budget:BudgetType) => total + budget.max, 0)
  if (max === 0) return null

  return <BudgetCard amount={amount} name="Total" gray max={max} hideButtons />
}
