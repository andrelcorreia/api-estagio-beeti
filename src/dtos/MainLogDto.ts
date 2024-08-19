export interface ApiMainLogDto {
  id: string;
  user_id: string;
  created_at: Date;
  body: string | null;
  status: number;
  route: string;
  return_message: string;
  return_data: string | null;
  method: string;
}
