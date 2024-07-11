import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private apiUrl: string = environment.apiUrl;
  private httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  getEmpleados():Observable<Empleado[]>{
    return this.httpClient.get<Empleado[]>(`${this.apiUrl}/empleados`);
  }
  getEmpleadoById(id:number):Observable<Empleado>{
    return this.httpClient.get<Empleado>(`${this.apiUrl}/empleados/${id}`);
  }
  public postEmpleado(empleado:Empleado):Observable<Empleado>{
    return this.httpClient.post<Empleado>(`${this.apiUrl}/empleados`, empleado);
  }
  public putEmpleado(id:number ,empleado:Empleado):Observable<Empleado>{
    return this.httpClient.put<Empleado>(`${this.apiUrl}/empleados/${id}`, empleado);
  }
  public deleteEmpleado(id:number):Observable<Empleado>{
    return this.httpClient.delete<Empleado>(`${this.apiUrl}/empleados/${id}`);
  }
}
