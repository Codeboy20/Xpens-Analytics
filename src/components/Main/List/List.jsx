import React, { useContext } from 'react';
import {
  List as MultiList,
  ListItem,
  ListItemAvatar,
  Avatar,
  Slide,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core';
import {
  Delete,
  TrendingDownRounded,
  TrendingUpRounded,
} from '@material-ui/icons';
import useStyles from './styles';
import { ExpenseTrackerContext } from '../../../context/context';
import formatCurrency from '../../../utils/formatCurrency';
import formatDisplayDate from '../../../utils/formatDisplayDate';

const List = () => {
  const classes = useStyles();
  const { transactions, deleteTransaction } = useContext(ExpenseTrackerContext);

  if (!transactions.length) {
    return (
      <div className={classes.emptyState}>
        <Typography variant="body2">
          No transactions yet. Add your first entry to see your summary build up.
        </Typography>
      </div>
    );
  }

  return (
    <MultiList dense={false} className={classes.list}>
      {transactions.map((transaction) => (
        <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
          <ListItem className={classes.listItem}>
            <ListItemAvatar>
              <Avatar
                className={
                  transaction.type === 'Income'
                    ? classes.avatarIncome
                    : classes.avatarExpense
                }
              >
                {transaction.type === 'Income' ? (
                  <TrendingUpRounded />
                ) : (
                  <TrendingDownRounded />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={transaction.category}
              secondary={`${formatCurrency(transaction.amount)} • ${formatDisplayDate(
                transaction.date
              )}`}
              className={classes.listText}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                className={classes.deleteButton}
                onClick={() => deleteTransaction(transaction.id)}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
      ))}
    </MultiList>
  );
};

export default List;
