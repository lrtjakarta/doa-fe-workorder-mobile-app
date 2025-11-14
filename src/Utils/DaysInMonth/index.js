const daysInMonth = (month, year) => {
  let _month = new Date().getMonth() + 1;
  let _year = new Date().getFullYear();

  if (month) {
    _month = parseInt(month);
  }

  if (year) {
    _year = parseInt(year);
  }

  return new Date(_year, _month, 0).getDate();
};

export default daysInMonth;
