import React, { useEffect } from "react";
import { useBudget } from "../context/BudgetContext";
import { nanoid } from "nanoid";

const ExpenseList = (props) => {
  const { expenseList, setExpenseList } = useBudget(); // Use Context API

  // Store expenses in local storage whenever expenseList changes
  useEffect(() => {
    if (expenseList.length !== 0) {
      localStorage.setItem("expenses", JSON.stringify(expenseList));
    }
  }, [expenseList]); // Add expenseList as a dependency

  // Load expenses from local storage on component mount
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    if (storedExpenses) {
      setExpenseList(storedExpenses);
    }
  }, [setExpenseList]); // Include setExpenseList in the dependency array

  const deleteExpense = (idx, expenseCost) => {
    props.spentAmountDel(expenseCost);
    const newExpenseList = [...expenseList];
    newExpenseList.splice(idx, 1);
    setExpenseList(newExpenseList);
    localStorage.setItem("expenses", JSON.stringify(newExpenseList));
  };

  return (
    <div className="expenseList">
      {expenseList.length === 0 ? (
        <p className="noData">Hooray! No Expenses done yet . . . .</p>
      ) : (
        expenseList.map((item, idx) => (
          <div key={nanoid()} className="single_expense">
            <span>{item.reason}</span>
            <span>{item.cost}</span>
            <button onClick={() => deleteExpense(idx, item.cost)}>X</button>
          </div>
        ))
      )}
    </div>
  );
};

export default ExpenseList;
