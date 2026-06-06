// 🔥 Modelo genérico para TODAS las respuestas del backend
// Esto te permite tipar cualquier endpoint (users, roles, etc.)
export interface ApiResponse<T> {
  data: T;           // ✅ payload real
  message: string;   // mensaje backend (logs, UI opcional)
  success: boolean;  // bandera de control
}