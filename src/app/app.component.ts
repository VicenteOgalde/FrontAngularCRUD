import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Persona } from './persona';
import { PersonaService } from './persona.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public personas!: Persona[];
public personaEditar!:Persona;
public personaEliminar!:Persona;
public region!:String;
public comuna!:String;

constructor(private personaService: PersonaService ) { }

ngOnInit() {
    this.listarPersonas();

}

public listarPersonas():void{
  this.personaService.listarPersonas().subscribe(
    (response:Persona[]) =>{
      this.personas=response;
    },(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  );
  
    
  
}


public nuevaPersona(nuevoFormulario:NgForm):void{
  document.getElementById('cerrarCrearModal')?.click;
  this.personaService.crearPersona(nuevoFormulario.value).subscribe(
    (response:Persona)=>{
      this.listarPersonas();
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    }
  )
  
}
public editarPersona(persona:Persona):void{
  this.personaService.editarPersona(persona).subscribe(
    (response:Persona)=>{
      this.listarPersonas();
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    }
  )
}
public eliminarPersona(personaId:number):void{
  this.personaService.eliminarPersona(personaId).subscribe(
    (response:void)=>{
      this.listarPersonas();
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    }
  )
}

public abrirModal(persona:Persona, modo:string):void{
  const container= document.getElementById('main-container');
  const btn= document.createElement('button');
  btn.type='button';
  btn.style.display='none';
  btn.setAttribute('data-toggle','modal');
  if(modo==='nueva'){
    btn.setAttribute('data-target','#crearPersonaModal');
  }
  if(modo==='editar'){
  this.personaEditar=persona;
  
    btn.setAttribute('data-target','#editarPersonaModal');
  }
  if(modo==='eliminar'){
    this.personaEliminar=persona;
    btn.setAttribute('data-target','#eliminarPersonaModal');
  }
  container?.appendChild(btn);
  btn.click();
}
}
