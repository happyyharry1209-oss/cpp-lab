export function isOwnerEmail(
  userEmail: string | undefined,
  ownerEmail: string | undefined,
) {
  if (!userEmail || !ownerEmail) {
    return false;
  }

  return userEmail.trim().toLowerCase() === ownerEmail.trim().toLowerCase();
}
