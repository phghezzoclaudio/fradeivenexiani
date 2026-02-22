import { getRomeNow } from "./index";

export function getValidServiceIds(calendar: any[], calendarDates: any[]) {
  const today = getRomeNow();
  const todayStr = today.toFormat("yyyyLLdd");
  const weekday = today.toFormat("cccc").toLowerCase();

  const valid = new Set<string>();

  calendar.forEach((service) => {
    if (
      todayStr >= service.start_date &&
      todayStr <= service.end_date &&
      service[weekday] === "1"
    ) {
      valid.add(service.service_id);
    }
  });

  calendarDates.forEach((exception) => {
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
