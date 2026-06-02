import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { UserService } from '../../services/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './users.component.html'
})
// export class UsersComponent implements OnInit {
export class UsersComponent {
  @Input() collapsed = false;

  // Aquí guardaremos la lista que viene de Spring Boot
  // users: any[] = [];
  users: any[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'User' }
  ];

  // Definimos el orden y cuáles columnas queremos renderizar en la vista
  displayedColumns: string[] = ['id', 'name', 'email', 'role'];

  constructor(private userService: UserService) {}

  // ngOnInit(): void {
  //   // Aquí llamas a tu servicio para llenar la variable 'users'
  //   this.userService.getUsers().subscribe({
  //     next: (data) => {
  //       this.users = data;
  //     },
  //     error: (err) => console.error('Error al traer usuarios:', err)
  //   });
  // }
}