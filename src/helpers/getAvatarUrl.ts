export const getAvatarUrl = (avatarId: string) => {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${avatarId}`;
};
