
export interface UserRole {
  viewName: string;
  value: string;
}

export const user_roles: UserRole[] = [
  {
    viewName: 'User',
    value: 'user'
  },
  {
    viewName: 'Admin',
    value: 'admin'
  }
];
