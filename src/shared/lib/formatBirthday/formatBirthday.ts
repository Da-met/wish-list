

export function formatBirthday(date?: string): string {
    if (!date) return "—"; // если не указана дата рождения
  
    const d = new Date(date);
    if (isNaN(d.getTime())) return "—"; // защита от кривых дат
  
    return d.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    });
  }