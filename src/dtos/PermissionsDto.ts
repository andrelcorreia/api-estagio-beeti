export interface PermissionsDto {
  id: string;
  description: string;
}

export interface UserPermissionsDto {
  id: string;
  permissions_id: string;
  access_level_id: string;
}
