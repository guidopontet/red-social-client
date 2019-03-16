import { Component, OnInit, DoCheck } from '@angular/core';
// Cargamos el servicio del usuario
import {UserService} from './services/user.service'
// Importamos los componentes del router para redirecciones
import{Router, ActivatedRoute,Params} from '@angular/router';
// Importamos la URL para el avatar de usuario
import {GLOBAL} from './services/global'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit,DoCheck {
  public title:string;
  public identity;
  public url:string;


  constructor(
    private _route: ActivatedRoute,
    private _router:Router,
  	private _userService:UserService
	){
  	this.title= 'Red Social';
    this.url=GLOBAL.url;
  }

  // Metodos
  ngOnInit(){
  	this.identity=this._userService.getIdentity();
  	console.log(this.identity);
  }

  //Este metodo cada vez que haya un cambio en algun componente, realiza algo
  ngDoCheck(){
  	// De esta manera, cuando loguamos se refresca el menu
  	this.identity=this._userService.getIdentity();
  }

  // metodo para cerrar sesion
  logout(){
    // console.log("Cerrar sesion")

    // Limpiamos el local storage (el identity y el token)
    localStorage.clear();
    this.identity=null;
    // Redireccionamos al home
    this._router.navigate(['/']);
  }
}
