import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado, Estado, Municipio } from '../../models/empleado.model';
import { EstadoService } from '../../services/estado.service';
import { MunicipioService } from '../../services/municipio.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleado-registrar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './empleado-registrar.component.html',
  styleUrl: './empleado-registrar.component.css'
})
export class EmpleadoRegistrarComponent implements OnInit {

  private routeActive: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private empleadoService: EmpleadoService = inject(EmpleadoService);
  private estadoService: EstadoService = inject(EstadoService);
  protected estados: Estado[] = [];
  private municipioService: MunicipioService = inject(MunicipioService);
  protected municipios: Municipio[] = [];
  private id?: number;
  protected empleado?: Empleado;
  protected validacionRegistrar: boolean = true;
  empleadoForm!: FormGroup;
  protected textButton: string = 'Registrar';

  constructor(private formBuilder: FormBuilder) {
    this.empleadoForm = formBuilder.group({
      idEmpleado: [this.empleado?.idEmpleado, []],
      nombre: [this.empleado?.nombre, [Validators.required]],
      email: [this.empleado?.email, [Validators.required, Validators.email]],
      fechaNacimiento: [this.empleado?.fechaNacimiento, [Validators.required]],
      idEstado: [this.empleado?.idEstado, [Validators.required]],
      idMunicipio: [this.empleado?.idMunicipio, [Validators.required]],
      fechaRegistro: [this.empleado?.fechaRegistro, []]
    });
    this.empleadoForm.get('idMunicipio')?.disable();
   }

  ngOnInit(): void {
    this.id = Number(this.routeActive.snapshot.paramMap.get('id'));
    this.validacionRegistrar = this.id ? false : true;
    console.log(this.validacionRegistrar);
    if(!this.validacionRegistrar){
      this.textButton = 'Actualizar';
      this.consultarEmpleado(this.id);
    }
    this.consultarEstados();
  }

  consultarEmpleado(id: number): void {
    this.empleadoService.getEmpleadoById(id).subscribe({
      next: (response) => {
        console.log(response);
        this.empleado = response;
        this.consultarMunicipiosPorEstado(this.empleado?.idEstado);
        this.iniciarDatosEmpleado();
      }, error: (error) => {
        console.error(error);
        if (error.status === 404) {
          alert('El empleado no existe');
        }
      }
    });
  }
  registrarEmpleado(empleado: Empleado): void {
    this.empleadoService.postEmpleado(empleado).subscribe({
      next: (response) => {
        console.log(response);
        alert('Empleado registrado');
        this.volverAlInicio();
      }, error: (error) => {
        console.error(error);
      }
    });
  }
  actualizarEmpleado(empleado: Empleado): void {
    this.empleadoService.putEmpleado(empleado.idEmpleado, empleado).subscribe({
      next: (response) => {
        console.log(response);
        alert('Empleado actualizado');
        this.volverAlInicio();
      }, error: (error) => {
        console.error(error);
      }
    });
  }
  volverAlInicio(): void {
    this.router.navigate(['']);
  }

  consultarEstados(): void {
    this.estadoService.getEstados().subscribe({
      next: (response) => {
        this.estados = response;
        console.log(this.estados);
      }, error: (error) => {
        console.error(error);
      }
    });
  }
  consultarMunicipiosPorEstado(idEstado:number): void {
    this.municipioService.getMunicipiosByEstado(idEstado).subscribe({
      next: (response) => {
        this.municipios = response;
        if(this.municipios.length > 0){
          this.empleadoForm.get('idMunicipio')?.enable();
        }
        console.log(this.municipios);
      }, error: (error) => {
        console.error(error);
      }
    });
  }
  enviar(){
    if(this.validacionRegistrar){
      this.registrarEmpleado(this.empleadoForm.value);
    }else{
      this.empleadoForm.get('idEmpleado')?.setValue(this.id);
      this.actualizarEmpleado(this.empleadoForm.value);
    }
  }

  hasErrors(field: string, validationType: string) {
    return (this.empleadoForm.get(field)?.hasError(validationType)
      && this.empleadoForm.get(field)?.touched);
  }
  isTouched(field: string) {
    return this.empleadoForm.get(field)?.touched;
  }

  iniciarDatosEmpleado():void {
    this.empleadoForm.patchValue({
      idEmpleado: this.empleado?.idEmpleado,
      nombre: this.empleado?.nombre,
      email: this.empleado?.email,
      fechaNacimiento: this.empleado?.fechaNacimiento,
      idEstado: this.empleado?.idEstado,
      idMunicipio: this.empleado?.idMunicipio,
      fechaRegistro: this.empleado?.fechaRegistro
    });
    console.log('asigando datos');
  }
  changeEstado(){
    this.empleadoForm.get('idMunicipio')?.reset();
    this.consultarMunicipiosPorEstado(this.empleadoForm.get('idEstado')?.value)
  }
}
