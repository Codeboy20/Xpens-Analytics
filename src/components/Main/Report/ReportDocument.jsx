import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import { ExpenseTrackerContext } from '../../../context/context';
import useTransactions from '../../../useTransactions';
import formatCurrency from '../../../utils/formatCurrency';
import formatDisplayDate from '../../../utils/formatDisplayDate';
import useStyles from './styles';

const FIRST_PAGE_TRANSACTION_LIMIT = 6;
const SECOND_PAGE_TRANSACTION_LIMIT = 14;

const formatGeneratedAt = () =>
  new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

const ReportChartCard = ({ title, total, chartData, categories }) => {
  const classes = useStyles();

  return (
    <div className={classes.chartCard}>
      <div className={classes.chartHeader}>
        <div>
          <Typography variant="h6" className={classes.chartTitle}>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Category mix
          </Typography>
        </div>
        <Typography variant="h6" className={classes.chartAmount}>
          {formatCurrency(total)}
        </Typography>
      </div>

      <div className={classes.chartCanvasWrap}>
        {categories.length ? (
          <Doughnut
            data={chartData}
            options={{
              cutout: '68%',
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        ) : (
          <div className={classes.emptyState}>
            <Typography variant="body2">
              Add a few {title.toLowerCase()} entries to include this chart.
            </Typography>
          </div>
        )}
      </div>

      <div className={classes.categoryList}>
        {(categories.length ? categories : [{ type: 'No data yet', amount: 0, color: '#d0d7d2' }])
          .slice(0, 5)
          .map((category) => (
            <div key={category.type} className={classes.categoryRow}>
              <span
                className={classes.swatch}
                style={{ backgroundColor: category.color }}
              />
              <Typography variant="body2" className={classes.categoryName}>
                {category.type}
              </Typography>
              <Typography variant="body2" className={classes.categoryAmount}>
                {formatCurrency(category.amount)}
              </Typography>
            </div>
          ))}
      </div>
    </div>
  );
};

const TransactionsTable = ({ rows, title, subtitle }) => {
  const classes = useStyles();

  return (
    <div className={classes.tableCard}>
      <Typography variant="h6" className={classes.sectionTitle}>
        {title}
      </Typography>
      <Typography variant="body2" className={classes.tableHint}>
        {subtitle}
      </Typography>

      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.tableHeadCell}>Date</th>
            <th className={classes.tableHeadCell}>Category</th>
            <th className={classes.tableHeadCell}>Type</th>
            <th className={classes.tableHeadCell}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((transaction) => (
            <tr key={transaction.id}>
              <td className={classes.tableCell}>
                {formatDisplayDate(transaction.date)}
              </td>
              <td className={classes.tableCell}>{transaction.category}</td>
              <td className={classes.tableCell}>
                <span
                  className={`${classes.typePill} ${
                    transaction.type === 'Income'
                      ? classes.incomePill
                      : classes.expensePill
                  }`}
                >
                  {transaction.type}
                </span>
              </td>
              <td className={classes.tableCell}>
                {formatCurrency(transaction.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ReportDocument = ({ pageRefs }) => {
  const classes = useStyles();
  const { transactions, balance } = useContext(ExpenseTrackerContext);
  const {
    total: incomeTotal,
    chartData: incomeChartData,
    filteredCategories: incomeCategories,
  } = useTransactions('Income');
  const {
    total: expenseTotal,
    chartData: expenseChartData,
    filteredCategories: expenseCategories,
  } = useTransactions('Expense');

  const shouldUseSecondPage = transactions.length > FIRST_PAGE_TRANSACTION_LIMIT;
  const firstPageRows = shouldUseSecondPage
    ? transactions.slice(0, FIRST_PAGE_TRANSACTION_LIMIT)
    : transactions;
  const secondPageRows = transactions.slice(0, SECOND_PAGE_TRANSACTION_LIMIT);
  const savingsRate =
    incomeTotal > 0 ? `${Math.max(Math.round((balance / incomeTotal) * 100), 0)}%` : '0%';

  return (
    <div className={classes.captureRoot} aria-hidden="true">
      <div
        ref={(element) => {
          pageRefs.current[0] = element;
        }}
        className={classes.page}
      >
        <div className={classes.reportHeader}>
          <div>
            <Typography variant="overline" className={classes.brandTag}>
              XPENS ANALYTICS REPORT
            </Typography>
            <Typography variant="h4" className={classes.reportTitle}>
              Personal finance snapshot
            </Typography>
            <Typography variant="body2" className={classes.reportSubtitle}>
              A clean summary of your current balance, category split, and latest
              transactions.
            </Typography>
          </div>

          <div className={classes.metaWrap}>
            <Typography variant="overline" className={classes.metaLabel}>
              Generated On
            </Typography>
            <Typography variant="body2" className={classes.metaValue}>
              {formatGeneratedAt()}
            </Typography>
            <Typography variant="overline" className={classes.metaLabel}>
              Entries Included
            </Typography>
            <Typography variant="body2" className={classes.metaValue}>
              {transactions.length}
            </Typography>
          </div>
        </div>

        <div className={classes.statGrid}>
          <div className={classes.statCard}>
            <Typography variant="overline" className={classes.statLabel}>
              Current Balance
            </Typography>
            <Typography variant="h5" className={classes.statValue}>
              {formatCurrency(balance)}
            </Typography>
          </div>
          <div className={classes.statCard}>
            <Typography variant="overline" className={classes.statLabel}>
              Total Income
            </Typography>
            <Typography variant="h5" className={classes.statValue}>
              {formatCurrency(incomeTotal)}
            </Typography>
          </div>
          <div className={classes.statCard}>
            <Typography variant="overline" className={classes.statLabel}>
              Total Expense
            </Typography>
            <Typography variant="h5" className={classes.statValue}>
              {formatCurrency(expenseTotal)}
            </Typography>
          </div>
          <div className={classes.statCard}>
            <Typography variant="overline" className={classes.statLabel}>
              Savings Rate
            </Typography>
            <Typography variant="h5" className={classes.statValue}>
              {savingsRate}
            </Typography>
          </div>
        </div>

        <div className={classes.chartGrid}>
          <ReportChartCard
            title="Income Breakdown"
            total={incomeTotal}
            chartData={incomeChartData}
            categories={incomeCategories}
          />
          <ReportChartCard
            title="Expense Breakdown"
            total={expenseTotal}
            chartData={expenseChartData}
            categories={expenseCategories}
          />
        </div>

        {!shouldUseSecondPage && transactions.length > 0 ? (
          <TransactionsTable
            rows={firstPageRows}
            title="Transactions"
            subtitle="Every transaction fits on one page for this report."
          />
        ) : null}

        {transactions.length === 0 ? (
          <div className={classes.tableCard}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Transactions
            </Typography>
            <Typography variant="body2" className={classes.tableHint}>
              No entries were available when this report was generated.
            </Typography>
          </div>
        ) : null}

        <div className={classes.footer}>
          <span>Prepared for the current session</span>
          <span>Page 1</span>
        </div>
      </div>

      {shouldUseSecondPage ? (
        <div
          ref={(element) => {
            pageRefs.current[1] = element;
          }}
          className={classes.page}
        >
          <TransactionsTable
            rows={secondPageRows}
            title="Transaction List"
            subtitle={
              transactions.length > SECOND_PAGE_TRANSACTION_LIMIT
                ? `Showing the latest ${SECOND_PAGE_TRANSACTION_LIMIT} of ${transactions.length} transactions for a clean two-page report.`
                : 'Complete ledger for the current session.'
            }
          />

          <div className={classes.footer}>
            <span>{formatCurrency(incomeTotal)} in, {formatCurrency(expenseTotal)} out</span>
            <span>Page 2</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReportDocument;
