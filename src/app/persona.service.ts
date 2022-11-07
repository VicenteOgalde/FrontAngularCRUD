import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from './persona';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private apiURL =environment.apiURL;

  constructor(private http: HttpClient ) { }

  public listarPersonas():Observable<Persona[]>{
    return this.http.get<Persona[]>(`${this.apiURL}/todas`);
  }
  public listarPersonasPorRegion(region :String):Observable<Persona[]>{
    return this.http.get<Persona[]>(`${this.apiURL}/${region}`);
  }
  public listarPersonasPorRegionYComuna(region:String,comuna:String):Observable<Persona[]>{
    return this.http.get<Persona[]>(`${this.apiURL}/${region}/${comuna}`);
  }
  public crearPersona(persona :Persona):Observable<Persona>{
    return this.http.post<Persona>(`${this.apiURL}/crear`,persona);
  }
  public editarPersona(persona:Persona):Observable<Persona>{
    return this.http.put<Persona>(`${this.apiURL}/editar`,persona);
  }
  public eliminarPersona(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiURL}/eliminar/${id}`);
  }
}
