import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Publication} from '../models/publication';

@Injectable()
export class PublicationService{
	public url:string

	constructor(private _http:HttpClient){
		this.url=GLOBAL.url;
	}

	// Crear nuevas publicaciones
	addPublication(token,publication):Observable<any>{
		let params=JSON.stringify(publication);
		let headers=new HttpHeaders().set('Content-Type','application/json')
										.set('Authorization',token);

		return this._http.post(this.url+'publication',params,{headers:headers});
	}

	// Obtener las publicaciones de un usuario
	getPublicationsUser(token,user_id,page=1):Observable<any>{
		let headers=new HttpHeaders().set('Content-Type','application/json')
								.set('Authorization',token);

		return this._http.get(this.url+'publications-user/'+user_id+'/'+page,{headers:headers});
	}

	// Obtener las publicaciones de un usuario
	getPublications(token,page=1):Observable<any>{
		let headers=new HttpHeaders().set('Content-Type','application/json')
								.set('Authorization',token);

		return this._http.get(this.url+'publications/'+page,{headers:headers});
	}

	// Borrar publicacion
	deletePublication(token,idPublication):Observable<any>{
		let headers=new HttpHeaders().set('Content-Type','application/json')
								.set('Authorization',token);

		return this._http.delete(this.url+'publication/'+idPublication,{headers:headers});
	}
}