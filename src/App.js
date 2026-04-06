import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import {
  ArrowForwardRounded,
  CheckCircleOutlineRounded,
  ReplayRounded,
} from '@material-ui/icons';
import Details from './components/Details/Details';
import Main from './components/Main/Main';
import useStyles from './styles';

const landingBullets = [
  'Live balance overview',
  'Income and expense breakdown',
  'Export-ready PDF report',
];
const brandLogo = `${process.env.PUBLIC_URL}/logo-Xpens.png`;

const App = () => {
  const classes = useStyles();
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className={classes.appShell}>
      <div className={classes.ambientOrbOne} />
      <div className={classes.ambientOrbTwo} />

      {!showDashboard ? (
        <div className={classes.landingScreen}>
          <div className={classes.landingTopBar}>
            <div className={classes.topBarBrand}>
              <img src={brandLogo} alt="Xpens Analytics logo" className={classes.topBarLogo} />
              <div>
                <Typography variant="body1" className={classes.topBarTitle}>
                  Xpens Analytics
                </Typography>
                <Typography variant="body2" className={classes.topBarCaption}>
                  Personal finance product dashboard
                </Typography>
              </div>
            </div>

            <div className={classes.topBarButtons}>
              <Button
                variant="contained"
                endIcon={<ArrowForwardRounded />}
                className={classes.topBarAction}
                onClick={() => setShowDashboard(true)}
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className={classes.landingHero}>
            <div className={classes.landingCopy}>
              <div className={classes.motionStrip}>
                <div className={classes.motionTrack}>
                  <span>Simple finance workspace</span>
                  <span>Live analysis</span>
                  <span>Clean reports</span>
                  <span>Focused tracking</span>
                  <span>Simple finance workspace</span>
                  <span>Live analysis</span>
                  <span>Clean reports</span>
                  <span>Focused tracking</span>
                </div>
              </div>
              <Typography variant="overline" className={classes.kicker}>
                Xpens Analytics
              </Typography>
              <Typography variant="h1" className={classes.heroTitle}>
                Track every rupee with a simple, sober dashboard.
              </Typography>
              <Typography variant="h5" className={classes.heroSubtitle}>
                A clean finance workspace for daily expense tracking, clear analysis,
                and polished reports.
              </Typography>
              <Typography variant="body1" className={classes.heroDescription}>
                Ab signup ki jhanjhat nahi. Open the workspace, add your entries,
                and understand your money without clutter.
              </Typography>

              <div className={classes.highlightRow}>
                {landingBullets.map((item) => (
                  <div key={item} className={classes.highlightPill}>
                    <CheckCircleOutlineRounded className={classes.highlightIcon} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className={classes.heroActions}>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardRounded />}
                  className={classes.primaryAction}
                  onClick={() => setShowDashboard(true)}
                >
                  Open Dashboard
                </Button>
              </div>
            </div>

            <div className={classes.landingSide}>
              <div className={classes.landingPreview}>
                <div className={classes.previewCard}>
                  <div className={classes.previewWindowBar}>
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className={classes.previewHeader}>
                    <div>
                      <Typography variant="overline" className={classes.previewEyebrow}>
                        Finance snapshot
                      </Typography>
                      <Typography variant="h6" className={classes.previewTitle}>
                        Clean insights that stay easy to read
                      </Typography>
                    </div>
                    <div className={classes.previewBadge}>Live</div>
                  </div>

                  <Typography variant="body2" className={classes.previewText}>
                    Keep balance, transactions, and categories visible in one calm
                    view without unnecessary noise.
                  </Typography>

                  <div className={classes.previewSummaryCard}>
                    <Typography variant="overline" className={classes.summaryTag}>
                      Current flow
                    </Typography>
                    <Typography variant="h4" className={classes.summaryValue}>
                      Rs. 48,500
                    </Typography>
                    <Typography variant="body2" className={classes.summaryCopy}>
                      See your money position update as soon as you add entries.
                    </Typography>
                  </div>

                  <div className={classes.previewLedger}>
                    <div className={classes.ledgerRow}>
                      <span>Salary</span>
                      <strong>+ Rs. 60,000</strong>
                    </div>
                    <div className={classes.ledgerRow}>
                      <span>Food</span>
                      <strong>- Rs. 4,500</strong>
                    </div>
                    <div className={classes.ledgerRow}>
                      <span>Travel</span>
                      <strong>- Rs. 7,000</strong>
                    </div>
                  </div>

                  <div className={classes.previewFooter}>
                    <span>Visual analysis ready</span>
                    <span>PDF export available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.dashboardScreen}>
          <div className={classes.dashboardHeader}>
            <div>
              <div className={classes.dashboardBrand}>
                <img
                  src={brandLogo}
                  alt="Xpens Analytics logo"
                  className={classes.dashboardBrandLogo}
                />
              </div>
              <Typography variant="overline" className={classes.dashboardKicker}>
                Xpens Analytics Workspace
              </Typography>
              <Typography variant="h3" className={classes.dashboardTitle}>
                Your money, beautifully organized.
              </Typography>
              <Typography variant="body1" className={classes.dashboardSubtitle}>
                Track entries, review charts, and download a polished summary.
              </Typography>
            </div>

            <Button
              variant="outlined"
              startIcon={<ReplayRounded />}
              className={classes.secondaryAction}
              onClick={() => setShowDashboard(false)}
            >
              Back to Landing
            </Button>
          </div>

          <div className={classes.dashboardGrid}>
            <div className={classes.summaryRail}>
              <Details title="Income" />
              <Details title="Expense" />
            </div>
            <div className={classes.workspacePanel}>
              <Main />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
