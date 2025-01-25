export default function getFormattedDate(lastLoginISO) {
  const lastLoginDate = new Date(lastLoginISO);
  const now = new Date();

  const differenceInSeconds = Math.floor((now - lastLoginDate) / 1000);

  if (differenceInSeconds < 60) {
    return `less than a minute ago`;
  }

  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  if (differenceInMinutes < 60) {
    return `${differenceInMinutes} minutes ago`;
  }

  const differenceInHours = Math.floor(differenceInMinutes / 60);
  if (differenceInHours < 24) {
    return `${differenceInHours} hours ago`;
  }

  const differenceInDays = Math.floor(differenceInHours / 24);
  if (differenceInDays < 7) {
    return `${differenceInDays} days ago`;
  }

  const differenceInWeeks = Math.floor(differenceInDays / 7);
  if (differenceInWeeks < 4) {
    return `${differenceInWeeks} weeks ago`;
  }

  const differenceInMonths = Math.floor(differenceInDays / 30);
  if (differenceInMonths < 12) {
    return `${differenceInMonths} months ago`;
  }

  const differenceInYears = Math.floor(differenceInMonths / 12);
  return `${differenceInYears} years ago`;
}
