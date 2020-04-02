import moment from 'moment';

export function getDateAgoString(date: string): string {
  const momentDate = moment(date);

  if (!momentDate.isValid()) {
    return '???';
  }

  if (momentDate.isAfter(moment().subtract(1, 'week'))) {
    return momentDate.fromNow();
  } else if (momentDate.isAfter(moment().subtract(6, 'months'))) {
    return momentDate.format('MMM Do');
  } else {
    return momentDate.format('M/D/YY');
  }
}
