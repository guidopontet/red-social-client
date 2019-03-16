// Lo usamos para restringir el acceso de usuarios a diferentes paginas de la aplicacion

import {Injectable} from '@angular/core'
import {Router, CanActivate} from '@angular/router'
import {UserService} from '../services/user.service'

@Injectable()

export class UserGuard implements CanActivate{
	
	constructor(
		private _router:Router,
		private _userService:UserService
	){

	}

	// Funcionalidad para restringir el acceso a rutas
	canActivate(){
		let identity=this._userService.getIdentity();
		// Si esta logueado
		if(identity && (identity.role=='ROLE_USER'||identity.role=='ADMIN')){
			return true;
		}else{/*Sino no puede acceder a rutas privadas*/
			this._router.navigate(['/login'])
			return false;
		}
	}
}