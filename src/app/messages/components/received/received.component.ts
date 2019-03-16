// COMPONENTES PARA LOS MENSAJES ENVIADOS
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
	selector: 'received',
	templateUrl: './received.component.html',
	providers: [
		FollowService,
		MessageService,
		UserService
	]
})

export class ReceivedComponent implements OnInit{
	public title:string
	public message:Message
	public identity
	public token
	public url:string /*Url del API*/
	public status:string
	public messages:Message[] /*Colleccion de mensajes*/
	public pages
	public page
	public total
	public next_page
	public prev_page

	constructor(
		private _route: ActivatedRoute,
		private _router:Router,
		private _followService:FollowService,
		private _messageService:MessageService,
		private _userService:UserService
	){
		this.title='Mensajes Recibidos'
		this.identity=this._userService.getIdentity()
		this.token=this._userService.getToken()
		this.url=GLOBAL.url
	}

	ngOnInit(){
		console.log("received.component cargado")
		this.actualPage()
		
	}

	// Metodo para obtener la pagina actual
	actualPage(){
		// De la URL obtenemos el numero de pagina
		this._route.params.subscribe(params=>{

			// Convertimos el numero de pagina a entero con el '+' adelante
			let page=+params['page'];
			this.page=page;

			if(!page){
				page=1
				this.page=page;
			}
				
			this.next_page=page+1
			this.prev_page=page-1

			if(this.prev_page<=0){
				this.prev_page=1
			}
			

			// Metodo para devolver el listado de mensajes
			this.getMessages(this.token,this.page)
		})
	}

	getMessages(token,page){
		this._messageService.getMyMessages(this.token,page).subscribe(
			response=>{
				if(response.messages){
					this.messages=response.messages
					this.total=response.total
					this.pages=response.pages
				}
			},
			error=>{
				this.status='error'
				console.log(<any>error)
			}
		)
	}
}