export interface Users {
  id: string;
  email: string;
  name: string;
  password: string;
  created_at: Date;
  active: boolean;
  access_level_id: string | null;
}
