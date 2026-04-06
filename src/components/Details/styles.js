import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  card: {
    borderRadius: 26,
    boxShadow: '0 18px 40px rgba(77, 93, 142, 0.08)',
    border: '1px solid rgba(200, 207, 230, 0.78)',
    overflow: 'hidden',
    minHeight: 0,
  },
  income: {
    background:
      'linear-gradient(180deg, rgba(244,248,255,0.98) 0%, rgba(236,242,255,0.95) 100%)',
  },
  expense: {
    background:
      'linear-gradient(180deg, rgba(250,247,255,0.98) 0%, rgba(242,237,255,0.95) 100%)',
  },
  content: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1.1),
  },
  sectionTag: {
    color: '#7c89a2',
    letterSpacing: '0.18em',
  },
  categoryChip: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    color: '#53637b',
    fontWeight: 700,
  },
  title: {
    color: '#202c43',
    fontFamily: '"Palatino Linotype", "Book Antiqua", Garamond, serif',
    marginBottom: theme.spacing(0.4),
  },
  amount: {
    color: '#3f4ec9',
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    color: '#657387',
    lineHeight: 1.7,
    marginBottom: theme.spacing(2.2),
  },
  chartArea: {
    position: 'relative',
    minHeight: 180,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  emptyChart: {
    width: '100%',
    minHeight: 180,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.75)',
    border: '1px dashed rgba(187, 196, 224, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: theme.spacing(2),
    color: '#6b7890',
  },
  categoriesWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
  },
  categoryBadge: {
    padding: theme.spacing(0.75, 1.2),
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.82)',
    color: '#4d5d76',
    fontSize: '0.82rem',
    fontWeight: 700,
  },
}));
