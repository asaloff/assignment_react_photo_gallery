export function getDateString(date) {
  date = new Date(parseInt(date, 10));

  return date.toLocaleTimeString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute:'2-digit'
  });
}
