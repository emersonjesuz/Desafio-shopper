import { TimeFormatter } from "./TimeFormatter.utils";

export class TimeFormatterMinuteOrHours implements TimeFormatter {
  format(seconds: string): string {
    const secondsNumber = Number(seconds.split("s")[0]);
    const secondsPerMinute = 60;
    const minutesPerHour = 60;
    const secondsPerHour = 3600;
    if (secondsNumber === 0 || !secondsNumber) {
      return "0 min";
    }
    if (secondsNumber <= secondsPerMinute) {
      return `1 min`;
    }
    const minutes = Math.floor(secondsNumber / secondsPerMinute);
    if (minutes > 1 && minutes < minutesPerHour) {
      return `${minutes} min`;
    }
    if (minutes % minutesPerHour === 0) {
      return `${minutes / minutesPerHour} H`;
    }
    const hours = secondsNumber / secondsPerHour;
    const remainingMinutes = (secondsNumber % secondsPerHour) / secondsPerMinute;
    return `${~~hours} H ${~~remainingMinutes} min`;
  }
}
