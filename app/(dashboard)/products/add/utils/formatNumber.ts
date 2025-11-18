/**
 * فرمت کردن اعداد با کاما
 * @param value - مقدار عددی به صورت string
 * @returns عدد فرمت شده با کاما
 */
export const formatNumberWithCommas = (value: string): string => {
  const numbers = value.replace(/,/g, '').replace(/[^\d]/g, '');
  return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * حذف کاما از اعداد
 * @param value - مقدار عددی با کاما
 * @returns عدد بدون کاما
 */
export const removeCommas = (value: string): string => {
  return value.replace(/,/g, '');
};
