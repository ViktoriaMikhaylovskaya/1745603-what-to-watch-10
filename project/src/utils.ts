import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {DurationTemplate, TimeMetric} from './const';

dayjs.extend(duration);

const ONE_HOUR = 360;

export const humanizeDueDate = (date: string) => dayjs(date).format('MMMM D, YYYY');

export const formattingLastTime = (runtime: number) => {
  const timeDuration = dayjs.duration(runtime, TimeMetric.Second);

  if ((runtime / ONE_HOUR) < 1) {
    return timeDuration.format(DurationTemplate.MinutesSeconds);
  }

  return timeDuration.format(DurationTemplate.HoursMinutesSeconds);
};

export const getRatingDescription = (rating: number) => {
  if (rating >= 0 && rating < 3) {
    return 'Bad';
  } else if (rating >= 3 && rating < 5) {
    return 'Normal';
  } else if (rating >= 5 && rating < 8) {
    return 'Good';
  } else if (rating >= 8 && rating < 10) {
    return 'Very good';
  } else if (rating === 10) {
    return 'Awesome';
  }
};
