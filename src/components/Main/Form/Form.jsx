import React, { useState, useContext } from 'react';
import {
  TextField,
  Typography,
  Grid,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import { ExpenseTrackerContext } from '../../../context/context';
import { v4 as uuidv4 } from 'uuid';
import useStyles from './styles';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import formatDate from '../../../utils/formatDate';
import CustomizedSnackbar from '../../Snackbar/Snackbar';

const buildInitialState = () => ({
  amount: '',
  category: '',
  type: 'Income',
  date: formatDate(new Date()),
});

const Form = () => {
  const classes = useStyles();
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const [formData, setFormData] = useState(buildInitialState());
  const [open, setOpen] = useState(false);

  const createTransaction = () => {
    if (
      Number.isNaN(Number(formData.amount)) ||
      Number(formData.amount) <= 0 ||
      !formData.category ||
      !formData.date.includes('-')
    ) {
      return;
    }

    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
    };

    addTransaction(transaction);
    setOpen(true);
    setFormData(buildInitialState());
  };

  const selectedCategories =
    formData.type === 'Income' ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      {open && <CustomizedSnackbar open={open} setOpen={setOpen} />}
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          Fill in the details below to add a clean entry.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth className={classes.field}>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth className={classes.field}>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {selectedCategories.map((category) => (
              <MenuItem key={category.type} value={category.type}>
                {category.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="number"
          label="Amount"
          fullWidth
          className={classes.field}
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="date"
          label="Date"
          fullWidth
          className={classes.field}
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={createTransaction}
        >
          Add transaction
        </Button>
      </Grid>
    </Grid>
  );
};

export default Form;
