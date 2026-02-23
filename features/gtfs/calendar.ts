export function getValidServiceIds(
  calendar: any[],
  calendarDates: any[]
) {
  const now = new Date();

  // formato YYYYMMDD
  const todayStr =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");

  const weekdayMap = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const weekday = weekdayMap[now.getDay()];

  const valid = new Set<string>();

  // calendar.txt
  calendar?.forEach((service: any) => {
    if (
      todayStr >= service.start_date &&
      todayStr <= service.end_date &&
      service[weekday] === "1"
    ) {
      valid.add(service.service_id);
    }
  });

  // calendar_dates.txt
  calendarDates?.forEach((exception: any) => {
    if (exception.date === todayStr) {
      if (exception.exception_type === "1") {
        valid.add(exception.service_id);
      }
      if (exception.exception_type === "2") {
        valid.delete(exception.service_id);
      }
    }
  });

  return valid;
}