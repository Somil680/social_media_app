export default function getRelativeTime(date: Date) {
  const givenDate = new Date(date)
    let now: Date = new Date();
  const diff = Math.abs(now.getTime() - givenDate.getTime());
  if (diff < 60000) {
    return `${Math.round(diff / 1000)} seconds ago`;
  } else if (diff < 3600000) {
    return `${Math.round(diff / 60000)} minutes ago`;
  } else if (diff < 86400000) {
    return `${Math.round(diff / 3600000)} hours ago`;
  } else {
    return `${Math.round(diff / 86400000)} days ago`;
  }
}