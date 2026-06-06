export type UserRole = 'Admin' | 'Operador' | 'Visor';

export type UserStatus = 'activo' | 'inactivo';

export interface User {
  id: number;

  name: string;
  email: string;

  role: string;
  status: number;

  // opcionales (pero recomendados para escalar)
  lastAccess?: string; // ISO string
  createdAt?: string;
  updatedAt?: string;
}