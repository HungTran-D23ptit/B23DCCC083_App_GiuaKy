export function isValidDateFormat(dateStr: string): boolean {
  if (!dateStr || typeof dateStr !== 'string') return false;
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  return regex.test(dateStr.trim());
}

export function parseDate(dateStr: string): Date | null {
  if (!isValidDateFormat(dateStr)) return null;

  const parts = dateStr.trim().split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (year < 1900 || year > 2100) return null;
  if (month < 1 || month > 12) return null;

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) return null;

  const date = new Date(year, month - 1, day, 0, 0, 0, 0);
  return date;
}

export function formatDate(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

export function getTodayDate(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
}

export function isPastDate(dateStr: string): boolean {
  const targetDate = parseDate(dateStr);
  if (!targetDate) return false;

  const today = getTodayDate();
  return targetDate.getTime() < today.getTime();
}

export function isTaskOverdue(dueDateStr: string, done: boolean): boolean {
  if (done) return false;
  return isPastDate(dueDateStr);
}

export interface DueDateStatus {
  diffDays: number;
  label: string;
  isOverdue: boolean;
  isToday: boolean;
}

export function getDueDateStatus(dueDateStr: string): DueDateStatus {
  const targetDate = parseDate(dueDateStr);
  if (!targetDate) {
    return { diffDays: 0, label: 'Không xác định', isOverdue: false, isToday: false };
  }

  const today = getTodayDate();
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      diffDays,
      label: `Quá hạn ${Math.abs(diffDays)} ngày`,
      isOverdue: true,
      isToday: false,
    };
  }

  if (diffDays === 0) {
    return {
      diffDays,
      label: 'Hạn hôm nay',
      isOverdue: false,
      isToday: true,
    };
  }

  return {
    diffDays,
    label: `Còn ${diffDays} ngày`,
    isOverdue: false,
    isToday: false,
  };
}

export function compareDueDates(a: string, b: string): number {
  const dateA = parseDate(a)?.getTime() ?? 0;
  const dateB = parseDate(b)?.getTime() ?? 0;
  return dateA - dateB;
}

export const priorityWeight: Record<string, number> = {
  Cao: 3,
  'Trung bình': 2,
  Thấp: 1,
};

export function getOffsetDateString(offsetDays: number): string {
  const d = getTodayDate();
  d.setDate(d.getDate() + offsetDays);
  return formatDate(d);
}
