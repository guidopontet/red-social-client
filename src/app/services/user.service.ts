import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {User} from '../models/user';

@Injectable()
export class UserService{
	// Propiedades
	public url:String; /*URL del backend*/
	public identity;
	public token;

	constructor(public _http:HttpClient){
		this.url=GLOBAL.url;
	}

	// Establecemos que la consulta al api devuelve un Observable de tipo
	register(user:User):Observable<any>{
		// Convertimos el json a string
		let params=JSON.stringify(user);
		
		// Establecemos la cabecera
		let headers=new HttpHeaders().set('Content-Type','application/json');

		// Ahora hacemos la peticion
		return this._http.post(this.url+'register',params,{headers:headers})
	}

	// En vez de poner tipo User, ponemos tipo any, ya que User, no tiene como atributo 'gettoken'
	signup(user:any, gettoken=null):Observable<any>{
		// Si nos devuelve el token, lo asignamos al user
		if(gettoken!=null){
			user.gettoken=gettoken;
		}

		// Datos que vamos a enviar desde el formulario
		let params=JSON.stringify(user)
		let headers=new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'login',params,{headers:headers});
	}

	// Metodo para recuperar datos del usuario del Local Storage
	getIdentity(){
		// Convertimos un String en un objeto javascript
		let identity=JSON.parse(localStorage.getItem('identity'));

		if(identity!='undefined'){
			this.identity=identity;
		}else{
			this.identity=null;
		}

		return this.identity;
	}

	// Metodo para recuperar el token del usuario del Local Storage
	getToken(){
		// Convertimos un String en un objeto javascript
		let token=JSON.parse(localStorage.getItem('token'));

		if(token!='undefined'){
			this.token=token;
		}else{
			this.token=null;
		}

		return this.token;
	}

	getStats(){
		// Parseamos el JSON a un objeto de javascript
		let stats=JSON.parse(localStorage.getItem('stats'));

		return stats;
	}

	// Para recuperar informacion del usuario
	// Como paremtro un userId por defecto en null
	getCounters(userId=null):Observable<any>{
		// Enviamos el header con el token como autorizacion
		let headers=new HttpHeaders().set('Content-Type','application/json')
										.set('Authorization',this.getToken());
		if(userId!=null){
			return this._http.get(this.url+'counters/'+userId,{headers:headers})
		}else{
			return this._http.get(this.url+'counters/',{headers:headers})

		}

	}

	// Metodo para modificar los datos de usuario
	updateUser(user:User):Observable<any>{
		let params=JSON.stringify(user);
		// console.log("Holoooo")
		// console.log(user)
		// console.log("Params:")
		// console.log(params)
		
		let headers=new HttpHeaders().set('Content-Type','application/json')
										.set('Authorization',this.getToken());
	
		return this._http.put(this.url+'update-user/'+user._id,params,{headers:headers})
	}

	// Devolvemos una lista de usuarios paginada
	// Le pasamos un numero de pagina por defecto es nula
	getUsers(page=null):Observable<any>{
		let headers=new HttpHeaders().set('Content-Type','application/json')
										.set('Authorization',this.getToken());
		return this._http.get(this.url+'users/'+page,{headers:headers})
	}

	// Este metodo devuelve un solo usuario
	getUser(id):Observable<any>{
		let headers=new HttpHeaders().set('Content-Type','application/json')
										.set('Authorization',this.getToken());
		return this._http.get(this.url+'user/'+id,{headers:headers})
	}


}