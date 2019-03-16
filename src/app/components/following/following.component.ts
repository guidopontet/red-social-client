import {Component, OnInit} from '@angular/core'
import {Router,ActivatedRoute,Params} from '@angular/router'
import {User} from '../../models/user'
import {Follow} from '../../models/follow'
import {UserService} from '../../services/user.service'
import {FollowService} from '../../services/follow.service'
import {GLOBAL} from '../../services/global'

// Definimos el componente
@Component({
	selector: 'following',
	templateUrl: './following.component.html',
	providers: [UserService,FollowService]
})

export class FollowingComponent implements OnInit{
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
	public following
	public userPageId /*Para saber a que usuaario tenemos que generar el listado de siguiendo*/

	// Constructor
	constructor(
		// Inyectamos los servicios en el contructor
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _followService:FollowService
	){
		this.title='Usuarios seguidos por'
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
			let user_id=params['id'];
			this.userPageId=user_id;

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
			this.getUser(user_id,page)
			console.log("USUARIOOOOO")
			console.log(this.user	)
		})
	}

	// Para retornar los follows
	getFollows(user_id,page){
		this._followService.getFollowing(this.token,user_id,page).subscribe(
			response=>{
				if(!response.follows){
					this.status='error'
				}else{

					// Si todo va bien y devuelve la lista de usuarios
					console.log(response);
					this.total=response.total
					this.following=response.follows
					this.pages=response.pages
					this.follows=response.users_following
					if(page>this.pages){
						// Si el numero de pagina es mayor al total, redirijo a la primera
						this._router.navigate(['/siguiendo/1']);
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

	// Devuelve un usuario a partir de un ID
	public user:User;
	getUser(user_id,page){
		this._userService.getUser(user_id).subscribe(
			response=>{
				if(response.user){
					this.user=response.user;
					this.getFollows(user_id, page);
				}else{ /*Si no existe el usuario*/
					this._router.navigate(['/home'])
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