import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    boxShadow: '0 22px 56px rgba(69, 84, 128, 0.09)',
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(245,248,255,0.92) 100%)',
    border: '1px solid rgba(198, 206, 230, 0.78)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  heroSection: {
    padding: theme.spacing(3),
    borderBottom: '1px solid rgba(205, 212, 233, 0.72)',
    background:
      'linear-gradient(135deg, rgba(248,250,255,0.96) 0%, rgba(237,243,255,0.92) 100%)',
  },
  heroTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  brandBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
  },
  brandLogo: {
    width: 50,
    height: 50,
    objectFit: 'contain',
    marginBottom: theme.spacing(0.25),
  },
  eyebrow: {
    color: '#7c89a2',
    letterSpacing: '0.2em',
    display: 'block',
    marginBottom: theme.spacing(0.6),
  },
  brandTitle: {
    color: '#1d2940',
    fontFamily: '"Palatino Linotype", "Book Antiqua", Garamond, serif',
    fontWeight: 700,
  },
  lead: {
    color: '#5f6f84',
    lineHeight: 1.75,
    marginBottom: theme.spacing(0.9),
    maxWidth: 760,
  },
  sessionNote: {
    color: '#7b88a0',
    marginBottom: theme.spacing(2.8),
  },
  reportButton: {
    borderRadius: 16,
    textTransform: 'none',
    padding: theme.spacing(1.1, 2),
    background: 'linear-gradient(135deg, #6b73ff 0%, #6758f3 100%)',
    color: '#ffffff',
    boxShadow: '0 14px 28px rgba(103, 88, 243, 0.22)',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    '&:hover': {
      background: 'linear-gradient(135deg, #7580ff 0%, #6f60f5 100%)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  statCard: {
    padding: theme.spacing(2),
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    border: '1px solid rgba(208, 215, 236, 0.82)',
    boxShadow: '0 10px 26px rgba(77, 93, 142, 0.06)',
  },
  statLabel: {
    color: '#7a88a1',
    letterSpacing: '0.14em',
    display: 'block',
    marginBottom: theme.spacing(0.9),
  },
  statValue: {
    color: '#1e2a41',
    fontFamily: '"Palatino Linotype", "Book Antiqua", Garamond, serif',
    fontWeight: 700,
  },
  statValueCompact: {
    color: '#1e2a41',
    fontWeight: 700,
    lineHeight: 1.4,
  },
  bodySection: {
    padding: theme.spacing(3),
    flex: 1,
    minHeight: 0,
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  panel: {
    height: '100%',
    borderRadius: 24,
    padding: theme.spacing(2.3),
    backgroundColor: 'rgba(255,255,255,0.88)',
    border: '1px solid rgba(206, 213, 234, 0.78)',
    boxShadow: '0 14px 30px rgba(77, 93, 142, 0.06)',
  },
  panelTitle: {
    color: '#1f2b42',
    fontFamily: '"Palatino Linotype", "Book Antiqua", Garamond, serif',
    fontWeight: 700,
    marginBottom: theme.spacing(0.8),
  },
  panelCopy: {
    color: '#647387',
    lineHeight: 1.7,
    marginBottom: theme.spacing(2),
  },
}));
