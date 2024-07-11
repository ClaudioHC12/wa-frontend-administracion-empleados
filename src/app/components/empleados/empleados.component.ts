import { Component, inject, OnInit } from '@angular/core';
import { Empleado } from '../../models/empleado.model';
import { EmpleadoService } from '../../services/empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit {

  protected empleados: Empleado[] = [];
  protected empleadoService: EmpleadoService = inject(EmpleadoService);
  private router: Router = inject(Router);
  protected columnas: string[] = ['Nombre', 'Email', 'Fecha de Nacimiento', 'Estado',
    'Municipio', 'Fecha de Registro'];

  constructor() { }

  ngOnInit(): void {
    this.consultarEmpleados();
  }

  consultarEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe({
      next: (response) => {
        this.empleados = response;
        console.log(this.empleados);
      },error: (error) => {
        console.error(error);
      }
    });
  }
  actualizarEmpleado(id: number) {
    this.router.navigate(['/empleado', id]);
  }
  registrarEmpleado() {
    this.router.navigate(['/empleado']);
  }
  eliminarEmpleado(id: number) {
    this.empleadoService.deleteEmpleado(id).subscribe({
      next: (response) => {
        console.log(response);
        this.consultarEmpleados();
      }, error: (error) => {
        console.error(error);
        if (error.status === 404) {
          alert('El empleado no existe');
        }
      }
    });
  }

}
