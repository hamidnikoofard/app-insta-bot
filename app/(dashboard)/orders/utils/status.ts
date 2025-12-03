export const statusTexts = {
  3: 'در انتظار تایید پرداخت',
  4: 'تایید پرداخت',
  5: 'در حال بسته بندی',
  6: 'ارسال شده',
  7: 'تحویل داده شده',
  8: 'بازگشت داده شده توسط مشتری',
  9: 'بازگشت داده شده توسط سیستم',
  10: 'لغو شده',
  default: 'نامشخص',
};

export const statusColors = {
  3: 'text-blue-600 dark:text-blue-500 bg-blue-100 dark:bg-blue-900/30',
  4: 'text-green-600 dark:text-green-500 bg-green-100 dark:bg-green-900/30',
  5: 'text-yellow-600 dark:text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30',
  6: 'text-yellow-600 dark:text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30',
  7: 'text-green-600 dark:text-green-500 bg-green-100 dark:bg-green-900/30',
  8: 'text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-900/30',
  9: 'text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-900/30',
  10: 'text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-900/30',
  default: 'text-muted-foreground bg-muted',
};

export function getStatusInfo(status: number): {
  text: string;
  className: string;
} {
  switch (status) {
    case 3:
      return {
        text: statusTexts[3],
        className: statusColors[3],
      };
    case 4:
      return {
        text: statusTexts[4],
        className: statusColors[4],
      };
    case 5:
      return {
        text: statusTexts[5],
        className: statusColors[5],
      };
    case 6:
      return {
        text: statusTexts[6],
        className: statusColors[6],
      };
    case 7:
      return {
        text: statusTexts[7],
        className: statusColors[7],
      };
    case 8:
      return {
        text: statusTexts[8],
        className: statusColors[8],
      };
    case 9:
      return {
        text: statusTexts[9],
        className: statusColors[9],
      };
    case 10:
      return {
        text: statusTexts[10],
        className: statusColors[10],
      };
    default:
      return {
        text: statusTexts.default,
        className: statusColors.default,
      };
  }
}

export const statusOptions = [
  { value: 3, label: statusTexts[3] },
  { value: 4, label: statusTexts[4] },
  { value: 5, label: statusTexts[5] },
  { value: 6, label: statusTexts[6] },
  { value: 7, label: statusTexts[7] },
  { value: 8, label: statusTexts[8] },
  { value: 9, label: statusTexts[9] },
  { value: 10, label: statusTexts[10] },
];
