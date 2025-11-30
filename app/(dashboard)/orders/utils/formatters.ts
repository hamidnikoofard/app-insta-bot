export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.toLocaleDateString('fa-IR')} - ${date.toLocaleTimeString('fa-IR')}`;
}

export function formatPrice(amount: number): string {
  return `${new Intl.NumberFormat('fa-IR').format(amount)} تومان`;
}

