import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  field: {
    '& .MuiInputBase-root': {
      borderRadius: 18,
      backgroundColor: 'rgba(255, 251, 243, 0.9)',
      paddingLeft: '12px',
    },
  },
  button: {
    marginTop: '4px',
    borderRadius: 18,
    padding: '14px 18px',
    color: '#f7efdf',
    border: 'none',
    background: 'linear-gradient(135deg, #29483a 0%, #1a2f28 100%)',
    fontWeight: 700,
    letterSpacing: '0.08em',
    '&:hover': {
      border: 'none',
      background: 'linear-gradient(135deg, #315643 0%, #1a2f28 100%)',
    },
  },
}));
