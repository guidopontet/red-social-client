import {Component, OnInit} from '@angular/core'
import {Router,ActivatedRoute,Params} from '@angular/router'
import {User} from '../../models/user'
import {Follow} from '../../models/follow'
import {UserService} from '../../services/user.service'
import {FollowService} from '../../services/follow.service'
import {GLOBAL} from '../../services/global'

// Definimos el componente
@Component({
	selector: 'users',
	templateUrl: './users.component.html',
	providers: [UserService,FollowService]
})

export class UsersComponent implements OnInit{
	public title:string
	public url:string
	public identity
	public token
	public page
	public next_page
	public prev_page
	public total
	public pages
	public users:User[]
	public status:string
	public follows; /*Guardamos los usuarios que seguimos*/

	// Constructor
	constructor(
		// Inyectamos los servicios en el contructor
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _followService:FollowService
	){
		this.title='Gente'
		this.url=GLOBAL.url;
		this.identity=this._userService.getIdentity()
		this.token=this._userService.getToken()

	}

	ngOnInit(){
		console.log("Componente users.component ha sido cargado!")
		this.actualPage();
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
			

			// Metodo para devolver el listado de usuarios
			this.getUsers(page);
		})
	}

	// Metodo que hace una petisión al servicio de angular
	getUsers(page){
		this._userService.getUsers(page).subscribe(
			response=>{
				if(!response.users){
					this.status='error'
				}else{

					// Si todo va bien y devuelve la lista de usuarios
					// console.log(response);
					this.total=response.total
					this.users=response.users
					this.pages=response.pages
					this.follows=response.users_following
					if(page>this.pages){
						// Si el numero de pagina es mayor al total, redirijo a la primera
						this._router.navigate(['/gente/1']);
					}
				}
			},
			error=>{
				var errorMessage=<any>error;
				console.log(errorMessage)

				if(errorMessage!=null){
					this.status='error'
				}
			}
		)
	}

	public followUserOver;
	mouseEnter(user_id){
		this.followUserOver=user_id;
	}

	mouseLeave(user_id){
		this.followUserOver=0
	}

	// Metodo para seguir a un usuario
	followUser(followed){
		var follow=new Follow('',this.identity._id,followed)

		this._followService.addFollow(this.token,follow).subscribe(
			response=>{
				if(!response.follow){
					this.status='error'
				}else{
					this.status='success';
					this.follows.push(followed)
				}
			},
			error=>{
				var errorMessage=<any>error;
				console.log(errorMessage)

				if(errorMessage!=null){
					this.status='error'
				}
			}
		)
	}

	// Metodo para dejar de seguir un usuario
	unFollowUser(followed){
		this._followService.deleteFollow(this.token,followed).subscribe(
			reponse=>{
				// Guardamos el indice del elemento a borrar
				var search=this.follows.indexOf(followed);
				if(search!=-1){/*Si encuentro al elemento lo eliminamos*/
					this.follows.splice(search,1)
				}
			},
			error=>{
				var errorMessage=<any>error;
				console.log(errorMessage)

				if(errorMessage!=null){
					this.status='error'
				}
			}
		)
	}
}