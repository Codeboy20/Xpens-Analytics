import React from 'react';
import { Card, CardContent, Chip, Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import useTransactions from '../../useTransactions';
import useStyles from './styles';

const Details = ({ title }) => {
  const classes = useStyles();
  const { total, chartData, filteredCategories } = useTransactions(title);
  const isIncome = title === 'Income';

  return (
    <Card className={`${classes.card} ${isIncome ? classes.income : classes.expense}`}>
      <CardContent className={classes.content}>
        <div className={classes.headerRow}>
          <Typography variant="overline" className={classes.sectionTag}>
            {isIncome ? 'Cash Inflow' : 'Cash Outflow'}
          </Typography>
          <Chip
            size="small"
            label={`${filteredCategories.length || 0} categories`}
            className={classes.categoryChip}
          />
        </div>

        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="h5" className={classes.amount}>
          Rs. {new Intl.NumberFormat('en-IN').format(total)}
        </Typography>
        <Typography variant="body2" className={classes.subtitle}>
          {isIncome
            ? 'Track the streams that are growing your balance.'
            : 'See where your spending is flowing right now.'}
        </Typography>

        <div className={classes.chartArea}>
          {filteredCategories.length ? (
            <Doughnut
              data={chartData}
              options={{
                cutout: '72%',
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          ) : (
            <div className={classes.emptyChart}>
              <Typography variant="body2">
                Add a few {title.toLowerCase()} transactions to unlock the chart.
              </Typography>
            </div>
          )}
        </div>

        <div className={classes.categoriesWrap}>
          {filteredCategories.slice(0, 4).map((category) => (
            <span key={category.type} className={classes.categoryBadge}>
              {category.type}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Details;
