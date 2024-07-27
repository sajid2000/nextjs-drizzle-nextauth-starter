export type UserID = string;
export type UserSession = {
  id: UserID;
};
export type UserProfile = {
  id: UserID;
  name: string | null;
  image: string | null;
};
