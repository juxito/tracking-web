import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user'; // Ajusta la ruta a tu servicio real
import { MatTableModule } from '@angular/material/table'; // 👈 IMPORTANTE: Importa la tabla de Material

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule], // 👈 AGREGA MatTableModule AQUÍ
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css']
})
export class UserListComponent implements OnInit {
  
  // Aquí guardaremos la lista que viene de Spring Boot
  users: any[] = []; 

  // Definimos el orden y cuáles columnas queremos renderizar en la vista
  displayedColumns: string[] = ['id', 'name', 'email', 'role'];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Aquí llamas a tu servicio para llenar la variable 'users'
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => console.error('Error al traer usuarios:', err)
    });
  }
}