export const convertToReadableDate = timestamp => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hours = ('0' + (date.getHours() + 1).toString()).substr(-2);
  const minutes = ('0' + (date.getMinutes() + 1).toString()).substr(-2);
  const seconds = ('0' + (date.getSeconds() + 1).toString()).substr(-2);

  const formattedTime =
    day +
    ' ' +
    month +
    ' ' +
    year +
    ', ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds;

  return formattedTime;
};
