export default function formatDate(inputDate: Date) {
    const options = { day: '2-digit' as const, month: 'long' as const, year: 'numeric' as const };
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(inputDate);
    return formattedDate;
}