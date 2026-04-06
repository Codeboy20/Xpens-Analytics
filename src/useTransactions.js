import { useContext } from 'react';
import { ExpenseTrackerContext } from './context/context';
import { incomeCategories, expenseCategories } from './constants/categories';

const useTransactions = (title) => {
  const { transactions } = useContext(ExpenseTrackerContext);
  const selectedTypeTransactions = transactions.filter((transaction) => transaction.type === title);
  const total = selectedTypeTransactions.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );
  const categories = (title === 'Income' ? incomeCategories : expenseCategories).map(
    (category) => ({
      ...category,
      amount: 0,
    })
  );

  selectedTypeTransactions.forEach((transaction) => {
    const category = categories.find((item) => item.type === transaction.category);

    if (category) {
      category.amount += transaction.amount;
    }
  });

  const filteredCategories = categories.filter((category) => category.amount > 0);

  const chartData = {
    datasets: [
      {
        data: filteredCategories.map((category) => category.amount),
        backgroundColor: filteredCategories.map((category) => category.color),
        borderWidth: 0,
      },
    ],
    labels: filteredCategories.map((category) => category.type),
  };

  return { filteredCategories, chartData, total };
};

export default useTransactions;
