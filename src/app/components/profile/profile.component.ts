import {Component,OnInit} from '@angular/core'
import {Router,ActivatedRoute,Params} from '@angular/router'
import {User} from '../../models/user'
import {Follow} from '../../models/follow'
import {UserService} from '../../services/user.service'
import {FollowService} from '../../services/follow.service'
import {GLOBAL} from '../../services/global'

@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
	providers: [UserService, FollowService]
})

export class ProfileComponent implements OnInit{
	// PROPIEDADES
	public title:string
	public user: User
	public status:string
	public identity
	public token
	public url
	public stats
	public followed
	public following

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _followService:FollowService

	){
		this.title='Perfil'
		this.identity=this._userService.getIdentity()
		this.token=this._userService.getToken()
		this.url=GLOBAL.url
		this.following=false
		this.followed=false
	}

	ngOnInit(){
		console.log("profile.component cargado correctamente");
		this.loadPage();
	}

	
	loadPage(){
		this._route.params.subscribe(params=>{
			// Obtenemos el ID por parametro
			let id=params['id']
			this.getUser(id);
			this.getCounters(id);
		})
	}

	// Para obtener la información del usuario
	getUser(id){
		this._userService.getUser(id).subscribe(
			response=>{ /*Si devuelve un usuario*/
				if(response.user){
					// console.log(response)
					this.user=response.user;
					this.status='success';

					// Si lo sigo
					if(response.following && response.following._id){
						this.following=true
					}
					// Si me sigue
					if(response.followed && response.followed._id){
						this.followed=true
					}
				}else{
					this.status='error';
				}
			},
			error=>{ /*Si no edvuelve un usuario redirijimos al perfil del user logueado*/
				console.log(<any>error)
				this._router.navigate(['/perfil',this.identity._id])
			}

		)
	}

	// Para obtener los contadores
	getCounters(id){
		this._userService.getCounters(id).subscribe(
			response=>{
				this.stats=response;
			},
			error=>{
				console.log(<any>error)
			}
		)
	}

	// Para seguir un usuario
	followUser(followed){
		var follow=new Follow('',this.identity._id,followed);
		this._followService.addFollow(this.token,follow).subscribe(
			response=>{
				console.log("FOLLOWWWWW")
				this.following=true;
			},
			error=>{
				console.log(<any>error)
			}
		)
	}

	// Metodo para dejar de seguir
	unfollowUser(followed){
		this._followService.deleteFollow(this.token,followed).subscribe(
			response=>{
				console.log("UNFOLLOWWWWW")
				this.following=false;
			},
			error=>{
				console.log(<any>error)
			}
		)
	}

	// METODOS PARA DAR EFECTO A LOS BOTONES DE SEGUIR O DEJAR DE SEGUIR
	public followUserOver
	mouseEnter(user_id){
		this.followUserOver=user_id;

	}

	mouseLeave(){
		this.followUserOver=0;
		
	}
}
