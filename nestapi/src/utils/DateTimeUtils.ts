// import * as moment from 'moment';

// export class DateTimeUtils {
//   public static getCurrentDateTimeUnix() {
//     const datetime = moment().unix();
//     return datetime;
//   }
//   public static getDateTimeBeforeDaysUnix(days: number) {
//     const datetime = moment()
//       .subtract(days, 'days')
//       .unix();
//     return datetime;
//   }
//   public static getDateTimeAfterDaysUnix(days: number) {
//     const datetime = moment()
//       .add(days, 'days')
//       .unix();
//     return datetime;
//   }

//   public static getNewsExpireDateTimeUnix() {
//     const datetime = moment()
//       .add(NEWS_PUBLISHED_DURATION_DAYS, 'days')
//       .unix();
//     return datetime;
//   }
//   public static getPostExpireDateTimeUnix() {
//     const datetime = moment()
//       .add(POST_PUBLISHED_DURATION_DAYS, 'days')
//       .unix();
//     return datetime;
//   }
//   public static getPasswordResetTime() {
//     const datetime = moment()
//       .add(PASSWORD_RESET_VALID_HOURS, 'hours')
//       .unix();
//     return datetime;
//   }
//   public static IsValidDate(date: string, format: string): boolean {
//     return moment(date, format).isValid();
//   }
//   public static dmyToUtc(str: string) {
//     const datetime = moment(str, 'YYYY-MM-DD')
//       .utc()
//       .unix();
//     return datetime;
//   }
// }
