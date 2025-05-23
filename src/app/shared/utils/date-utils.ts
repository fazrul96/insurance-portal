export function convertToIsoDate(dateStr?: string): string | null {
  if (!dateStr) return null;

  const [day, month, year] = dateStr.split('/');
  const isoDate = new Date(`${year}-${month}-${day}T00:00:00Z`);

  return isNaN(isoDate.getTime()) ? null : isoDate.toISOString();
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('en-GB');
}


export function formatBirthdate(date: Date): string {
  // Format as "dd/MM/yyyy"
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
