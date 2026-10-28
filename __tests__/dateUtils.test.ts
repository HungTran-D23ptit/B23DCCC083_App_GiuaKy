jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

import {
  isValidDateFormat,
  parseDate,
  formatDate,
  isPastDate,
  isTaskOverdue,
  getDueDateStatus,
  getOffsetDateString,
  compareDueDates,
} from '../src/utils/dateUtils';
import { getInitialSampleTasks } from '../src/storage/taskStorage';

describe('dateUtils logic tests', () => {
  test('isValidDateFormat accepts dd/mm/yyyy only', () => {
    expect(isValidDateFormat('28/10/2026')).toBe(true);
    expect(isValidDateFormat('01/01/2025')).toBe(true);
    expect(isValidDateFormat('2026-10-28')).toBe(false);
    expect(isValidDateFormat('28/10')).toBe(false);
    expect(isValidDateFormat('hello')).toBe(false);
  });

  test('parseDate validates real calendar dates', () => {
    expect(parseDate('28/10/2026')).not.toBeNull();
    expect(parseDate('31/02/2026')).toBeNull();
    expect(parseDate('29/02/2025')).toBeNull();
    expect(parseDate('29/02/2024')).not.toBeNull();
    expect(parseDate('15/13/2026')).toBeNull();
  });

  test('formatDate formats Date to dd/mm/yyyy', () => {
    const d = new Date(2026, 9, 28);
    expect(formatDate(d)).toBe('28/10/2026');
  });

  test('isPastDate detects past dates', () => {
    const past = getOffsetDateString(-2);
    const future = getOffsetDateString(2);
    const today = getOffsetDateString(0);

    expect(isPastDate(past)).toBe(true);
    expect(isPastDate(today)).toBe(false);
    expect(isPastDate(future)).toBe(false);
  });

  test('isTaskOverdue returns true only if not done and past date', () => {
    const past = getOffsetDateString(-3);
    const future = getOffsetDateString(3);

    expect(isTaskOverdue(past, false)).toBe(true);
    expect(isTaskOverdue(past, true)).toBe(false);
    expect(isTaskOverdue(future, false)).toBe(false);
  });

  test('getDueDateStatus provides correct labels', () => {
    const today = getOffsetDateString(0);
    const in3Days = getOffsetDateString(3);
    const past2Days = getOffsetDateString(-2);

    expect(getDueDateStatus(today).label).toBe('Hạn hôm nay');
    expect(getDueDateStatus(in3Days).label).toBe('Còn 3 ngày');
    expect(getDueDateStatus(past2Days).label).toBe('Quá hạn 2 ngày');
  });

  test('compareDueDates sorts nearest first', () => {
    const day1 = getOffsetDateString(1);
    const day5 = getOffsetDateString(5);
    expect(compareDueDates(day1, day5)).toBeLessThan(0);
    expect(compareDueDates(day5, day1)).toBeGreaterThan(0);
  });

  test('Initial sample tasks requirements', () => {
    const sample = getInitialSampleTasks();
    expect(sample.length).toBeGreaterThanOrEqual(6);

    const completedTasks = sample.filter(t => t.done);
    expect(completedTasks.length).toBeGreaterThanOrEqual(1);

    const overdueTasks = sample.filter(t => isTaskOverdue(t.dueDate, t.done));
    expect(overdueTasks.length).toBeGreaterThanOrEqual(1);
  });
});
