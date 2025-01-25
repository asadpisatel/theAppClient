export default function sortByLastLogin(users) {
  return users.sort((a, b) => new Date(b.last_login) - new Date(a.last_login));
}
