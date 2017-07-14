interface Error {
  status?: number;
  stack?: string;
}

interface IUser {
  id: number;
  username: string;
  password: string;
  displayName: string;
  email: string;
}
