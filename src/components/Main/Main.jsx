import React, { useContext, useRef, useState } from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { PictureAsPdfRounded } from '@material-ui/icons';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import { ExpenseTrackerContext } from '../../context/context';
import InfoCard from '../InfoCard';
import ReportDocument from './Report/ReportDocument';
import formatCurrency from '../../utils/formatCurrency';

const FIRST_PAGE_TRANSACTION_LIMIT = 6;
const brandLogo = `${process.env.PUBLIC_URL}/logo-Xpens.png`;

const Main = () => {
  const classes = useStyles();
  const { balance, transactions } = useContext(ExpenseTrackerContext);
  const [isDownloading, setIsDownloading] = useState(false);
  const reportPageRefs = useRef([]);
  const transactionCount = transactions.length;
  const latestTransaction = transactions[0];
  const shouldUseSecondPage = transactionCount > FIRST_PAGE_TRANSACTION_LIMIT;

  const handleDownloadReport = async () => {
    if (!transactionCount || isDownloading) {
      return;
    }

    setIsDownloading(true);

    try {
      const [{ jsPDF }, html2canvasModule] = await Promise.all([
        import('jspdf'),
        import('html2canvas'),
      ]);
      const html2canvas = html2canvasModule.default;

      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      await new Promise((resolve) => setTimeout(resolve, 350));

      const pdf = new jsPDF('p', 'pt', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageCount = shouldUseSecondPage ? 2 : 1;

      for (let index = 0; index < pageCount; index += 1) {
        const pageElement = reportPageRefs.current[index];

        if (!pageElement) {
          continue;
        }

        const canvas = await html2canvas(pageElement, {
          scale: 2,
          backgroundColor: '#ffffff',
          useCORS: true,
        });
        const imageData = canvas.toDataURL('image/png');

        if (index > 0) {
          pdf.addPage();
        }

        pdf.addImage(imageData, 'PNG', 0, 0, pageWidth, pageHeight);
      }

      pdf.save(`xpens-analytics-report-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error('Unable to generate PDF report.', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.heroSection}>
          <div className={classes.heroTop}>
            <div className={classes.brandBlock}>
              <img
                src={brandLogo}
                alt="Xpens Analytics logo"
                className={classes.brandLogo}
              />
              <Typography variant="overline" className={classes.eyebrow}>
                Personal finance dashboard
              </Typography>
              <Typography variant="h4" className={classes.brandTitle}>
                Xpens Analytics
              </Typography>
            </div>

            <Button
              variant="contained"
              color="primary"
              className={classes.reportButton}
              startIcon={<PictureAsPdfRounded />}
              disabled={!transactionCount || isDownloading}
              onClick={handleDownloadReport}
            >
              {isDownloading ? 'Preparing PDF...' : 'Download report'}
            </Button>
          </div>

          <Typography variant="body1" className={classes.lead}>
            Track your money in one focused workspace, and export a clean report
            whenever you need a shareable summary.
          </Typography>

          <Typography variant="body2" className={classes.sessionNote}>
            Entries stay only for the current session and clear on refresh.
          </Typography>

          <div className={classes.statGrid}>
            <div className={classes.statCard}>
              <Typography variant="overline" className={classes.statLabel}>
                Current Balance
              </Typography>
              <Typography variant="h4" className={classes.statValue}>
                {formatCurrency(balance)}
              </Typography>
            </div>

            <div className={classes.statCard}>
              <Typography variant="overline" className={classes.statLabel}>
                Transactions
              </Typography>
              <Typography variant="h4" className={classes.statValue}>
                {transactionCount}
              </Typography>
            </div>

            <div className={classes.statCard}>
              <Typography variant="overline" className={classes.statLabel}>
                Latest Entry
              </Typography>
              <Typography variant="h6" className={classes.statValueCompact}>
                {latestTransaction ? latestTransaction.category : 'No entries yet'}
              </Typography>
            </div>
          </div>
        </CardContent>

        <CardContent className={classes.bodySection}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <div className={classes.panel}>
                <Typography variant="h6" className={classes.panelTitle}>
                  Add a transaction
                </Typography>
                <Typography variant="body2" className={classes.panelCopy}>
                  Enter the amount, choose the category, and keep your timeline
                  updated in a few seconds.
                </Typography>
                <Form />
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <div className={classes.panel}>
                <Typography variant="h6" className={classes.panelTitle}>
                  Analysis note
                </Typography>
                <Typography variant="body2" className={classes.panelCopy}>
                  <InfoCard />
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className={classes.panel}>
                <Typography variant="h6" className={classes.panelTitle}>
                  Recent activity
                </Typography>
                <Typography variant="body2" className={classes.panelCopy}>
                  Review your latest entries, tidy up mistakes, and keep the report
                  accurate.
                </Typography>
                <List />
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <ReportDocument pageRefs={reportPageRefs} />
    </>
  );
};

export default Main;
