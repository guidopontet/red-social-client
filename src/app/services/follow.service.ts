import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Follow} from '../models/follow';

@Injectable()
export class FollowService{
	public url:string

	constructor(private _http:HttpClient){
		this.url=GLOBAL.url
	}

	// Agregamos un seguimiento
	addFollow(token,follow):Observable<any>{
		// Convertimos el json a string
		let params=JSON.stringify(follow);

		// Establecemos la cabecera
		let headers=new HttpHeaders().set('Content-Type','application/json')
									.set('Authorization',token);

		return this._http.post(this.url+'follow',params,{headers:headers});
	}

	// Borramos un seiguimiento
	deleteFollow(token,id):Observable<any>{

		// Establecemos la cabecera
		let headers=new HttpHeaders().set('Content-Type','application/json')
									.set('Authorization',token);
		return this._http.delete(this.url+'follow/'+id,{headers:headers});
	}

	// Le pedimos al API los usuarios que estoy siguiendo
	getFollowing(token,userId=null,page=1):Observable<any>{
		// Establecemos la cabecera
		let headers=new HttpHeaders().set('Content-Type','application/json')
									.set('Authorization',token);

		var url=this.url+'following';
		if(userId!=null){
			url=this.url+'following/'+userId+'/'+page
		}

		return this._http.get(url,{headers:headers})
	}

		// Le pedimos al API los usuarios que me siguen
	getFollowed(token,userId=null,page=1):Observable<any>{
		// Establecemos la cabecera
		let headers=new HttpHeaders().set('Content-Type','application/json')
									.set('Authorization',token);

		var url=this.url+'followed';
		if(userId!=null){
			url=this.url+'followed/'+userId+'/'+page
		}

		return this._http.get(url,{headers:headers})
	}

	// Devuelve mis seguidores
	getMyFollows(token):Observable<any>{
		// Establecemos la cabecera
		let headers=new HttpHeaders().set('Content-Type','application/json')
									.set('Authorization',token);

		return this._http.get(this.url+'get-my-follows/'+'true',{headers:headers})
	}
}