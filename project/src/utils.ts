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
