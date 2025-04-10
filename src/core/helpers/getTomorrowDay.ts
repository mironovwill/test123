export function getTomorrowDay(formattedDate = false): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (formattedDate) {
    return tomorrow.toLocaleDateString('ru-RU');
  }

  return `${tomorrow.getDate()}`;
}
