import store from '../store';

export default function dateFilter(rawDate, format = 'date') {
  const options = {};

  if (format.includes('date')) {
    options.year = 'numeric';
    options.month = 'long';
    options.day = 'numeric';
  }
  if (format.includes('time')) {
    options.hour = 'numeric';
    options.minute = 'numeric';
    options.second = 'numeric';
  }

  return new Intl.DateTimeFormat(store.getters.info.locale || 'ru-RU', options).format(rawDate);
}
