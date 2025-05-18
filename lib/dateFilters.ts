// utils/dateFilters.ts
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export const filterByToday = (data: any[]): any[] => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const today = dayjs().startOf("day");
  return data.filter((item) => dayjs(item.createdAt).isSame(today, "day"));
};

export const filterByYesterday = (data: any[]): any[] => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const yesterday = dayjs().subtract(1, "day").startOf("day");
  return data.filter((item) => dayjs(item.createdAt).isSame(yesterday, "day"));
};

export const filterByLast7Days = (data: any[]): any[] => {// eslint-disable-line @typescript-eslint/no-explicit-any
  const last7Days = dayjs().subtract(7, "day").startOf("day");
  return data.filter((item) => dayjs(item.createdAt).isAfter(last7Days));
};

export const filterByThisMonth = (data: any[]): any[] => {// eslint-disable-line @typescript-eslint/no-explicit-any
  const startOfMonth = dayjs().startOf("month");
  return data.filter((item) => dayjs(item.createdAt).isAfter(startOfMonth));
};

export const filterByThisYear = (data: any[]): any[] => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const startOfYear = dayjs().startOf("year");
  return data.filter((item) => dayjs(item.createdAt).isAfter(startOfYear));
};

export const filterByDateRange = (
  data: any[], // eslint-disable-line @typescript-eslint/no-explicit-any
  startDate: string | Date,
  endDate: string | Date
): any[] => {
  const start = dayjs(startDate).startOf("day");
  const end = dayjs(endDate).endOf("day");
  return data.filter((item) =>
    dayjs(item.createdAt).isBetween(start, end, null, "[]")
  );
};

