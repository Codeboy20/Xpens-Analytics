import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  avatarIncome: {
    color: '#fff',
    background: 'linear-gradient(135deg, #3f7a60 0%, #29483a 100%)',
  },
  avatarExpense: {
    color: '#fff',
    background: 'linear-gradient(135deg, #b56a4f 0%, #7b4425 100%)',
  },
  list: {
    maxHeight: '240px',
    overflow: 'auto',
  },
  listItem: {
    marginBottom: '12px',
    borderRadius: '20px',
    backgroundColor: 'rgba(250, 246, 238, 0.92)',
    border: '1px solid rgba(121, 98, 62, 0.12)',
    paddingRight: '56px',
  },
  listText: {
    '& .MuiListItemText-primary': {
      color: '#20342c',
      fontWeight: 700,
    },
    '& .MuiListItemText-secondary': {
      color: '#6a6f6a',
    },
  },
  deleteButton: {
    color: '#7b4425',
  },
  emptyState: {
    minHeight: '160px',
    borderRadius: '24px',
    backgroundColor: 'rgba(250, 246, 238, 0.92)',
    border: '1px dashed rgba(121, 98, 62, 0.16)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#5a635e',
    padding: '16px',
  },
}));
