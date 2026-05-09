import { useContext } from "react";
import { ExpensesContext } from "../context/expensesContextObject.js";

export function useExpensesContext() {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error("useExpensesContext must be used inside ExpensesProvider");
  }

  return context;
}
