import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipio } from '../models/empleado.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private apiUrl: string = environment.apiUrl;
  private httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  getMunicipios():Observable<Municipio[]>{
    return this.httpClient.get<Municipio[]>(`${this.apiUrl}/municipios`);
  }
  getMunicipiosByEstado(idEstado:number):Observable<Municipio[]>{
    return this.httpClient.get<Municipio[]>(`${this.apiUrl}/estados/${idEstado}/municipios`);
  }
  public postMunicipio(municipio:Municipio):Observable<Municipio>{
    return this.httpClient.post<Municipio>(`${this.apiUrl}/municipios`, municipio);
  }
  public putMunicipio(id:number ,municipio:Municipio):Observable<Municipio>{
    return this.httpClient.put<Municipio>(`${this.apiUrl}/municipios/${id}`, municipio);
  }
  public deleteMunicipio(id:number):Observable<Municipio>{
    return this.httpClient.delete<Municipio>(`${this.apiUrl}/municipios/${id}`);
  }
}
