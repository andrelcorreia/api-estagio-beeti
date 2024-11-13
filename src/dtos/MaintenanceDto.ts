export interface Maintenance {
  id: string;
  description: string;
  created_at: Date;
  active: boolean;
  estimated_date: Date;
  technical_date: boolean;
  user_id: string;
  client_id: string;
  product_id: string;
  occ_id: string | null;
}
export interface MaintenanceCompleteInfo {
  id: string;
  description: string;
  created_at: Date;
  active: boolean;
  estimated_date: Date;
  technical_date: boolean;
  user_id: string;
  client_id: string;
  client: {
    name: string;
  };
  product: {
    name: string;
  };
  user: {
    name: string;
  };
}
