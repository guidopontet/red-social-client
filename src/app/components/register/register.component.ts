// Importamos los modulos necesarios
import{Component, OnInit} from '@angular/core';
// Modulos de ruteo
import {Router, ActivatedRoute,Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';


@Component({
	selector: 'register',
	templateUrl: './register.component.html',
	providers: [UserService]
})

export class RegisterComponent implements OnInit{
	public title:String;
	public user: User;
	public status:String;

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService
	){
		this.title='Registrate';
		this.user=new User('','','','','','','ROLE_USER','');
	}

	// Cuando se carga el componente
	ngOnInit(){
		console.log('Componente de Registro cargado')
	}

	// Cuando se envía el formulario
	onSubmit(form){
		console.log(this.user);

		// Ejecutamos el servicio y nos suscribimos para obtener la respuesta
		this._userService.register(this.user).subscribe(
			response => {
				if(response.user && response.user._id){
					// console.log(response.user);

					this.status='success';
					// Reseteamos el formulario
					form.reset()
				}else{
					this.status='error';
				}
			},
			error => {
				console.log(<any>error);
			}
		);

	}
}
