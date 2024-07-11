import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../models/empleado.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private apiUrl: string = environment.apiUrl;
  private httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  getEstados():Observable<Estado[]>{
    return this.httpClient.get<Estado[]>(`${this.apiUrl}/estados`);
  }
  getEstadoById(id:number):Observable<Estado>{
    return this.httpClient.get<Estado>(`${this.apiUrl}/estados/${id}`);
  }
}
