export interface RequestParams {
  id: number;
  name: string;
  date: string;
  description: string;
  type: number;
  status: number;
  users: {
    id: number;
    name: string;
  };
}
