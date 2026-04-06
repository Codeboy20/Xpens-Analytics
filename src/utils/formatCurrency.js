const formatCurrency = (value) =>
  `Rs. ${new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(value || 0)}`;

export default formatCurrency;
