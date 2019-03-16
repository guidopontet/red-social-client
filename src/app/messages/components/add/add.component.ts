// COMPONENTE PARA ENVIAR MENSAJES PRIVADOS

import {Component, OnInit, DoCheck} from '@angular/core'
import {Router,ActivatedRoute,Params} from '@angular/router'
import {Message} from '../../../models/message'
import {MessageService} from '../../../services/message.service'
import {Follow} from '../../../models/follow'
import {FollowService} from '../../../services/follow.service'
import {User} from '../../../models/user'
import {UserService} from '../../../services/user.service'
import {GLOBAL} from '../../../services/global'

@Component({
	selector: 'add',
	templateUrl: './add.component.html',
	providers: [
		FollowService,
		MessageService,
		UserService
	]
})

export class AddComponent implements OnInit{
	public title:string
	public message:Message
	public identity
	public token
	public url:string /*Url del API*/
	public status:string
	public follows; /*Coleccion de usuarios que nos siguen*/

	constructor(
		private _route: ActivatedRoute,
		private _router:Router,
		private _followService:FollowService,
		private _messageService:MessageService,
		private _userService:UserService
	){
		this.title='Enviar Mensaje'
		this.identity=this._userService.getIdentity()
		this.token=this._userService.getToken()
		this.url=GLOBAL.url
		this.message=new Message('','','','',this.identity._id,'');
	}

	ngOnInit(){
		console.log("add.component cargado")
		this.getMyFollows()
	}

	// Le pasamos el formulario por parametro para resetearlo luego de enviar el mensaje
	onSubmit(form){
		// console.log(this.message)
		this._messageService.addMessage(this.token,this.message).subscribe(
			response=>{
				if(response.message){
					this.status='success'
					form.reset();

				}
			},
			error=>{
				this.status='error'
				console.log(<any>error)
			}
		)
	}

	getMyFollows(){
		this._followService.getMyFollows(this.token).subscribe(
			response=>{
				this.follows=response.follows
			},
			error=>{
				console.log(<any>error)
			}
		)
	}
}