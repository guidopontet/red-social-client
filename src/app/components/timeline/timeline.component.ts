import {Component, OnInit} from '@angular/core'
import {Router,ActivatedRoute,Params} from '@angular/router'
import {Publication} from '../../models/publication'
import {GLOBAL} from '../../services/global'
import {UserService} from '../../services/user.service'
import {PublicationService} from '../../services/publication.service'

// Definimos el componente
@Component({
	selector: 'timeline',
	templateUrl: './timeline.component.html',
	providers: [UserService,PublicationService]
})

export class TimelineComponent implements OnInit{
	public title:string;
	public identity;
	public token;
	public url:string;
	public status:string
	public page;
	public total;
	public pages;
	public itemsPerPage;
	public publications:Publication[]
	public showImage

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _publicationService:PublicationService
	){
		this.title="Timeline"
		this.identity=this._userService.getIdentity();
		this.token=this._userService.getToken();
		this.url=GLOBAL.url;
		this.page=1;
	}

	ngOnInit(){
		console.log("timeline.component cargado correctamente")
		this.getPublications(this.page);
	}

	// PARA VER PUBLICACIONES
	// El segundo atributo adding define si estamos scrolleando infinitamente
	getPublications(page,adding=false){
		this._publicationService.getPublications(this.token,page).subscribe(
			response=>{
				// console.log("TIMELINE COMPONENT")
				// console.log(response)
				if(response.publications){
					this.total=response.total
					this.pages=response.pages
					this.itemsPerPage=response.items_per_page
					
					// Sobreescribimos las publicaciones
					if(adding==false){
						this.publications=response.publications;
					}else{/*Sino tenemos que agregar las nuevas para scrollear*/
						// Guardamos las publicaciones cargadas hasta el momento
						var arrayA=this.publications;
						// Tomamos las nuevas publiaciones que devuelve el API
						var arrayB=response.publications
						// añadimos las nuevas publicaciones
						this.publications=arrayA.concat(arrayB);

						// ANIMACION CON JQUERY
						// Vamos a animar el scroll
						$("html, body").animate({scrollTop:$('body').prop('scrollHeight')},500);


					}

					// Si ingresa una pagina mayor a la maxima, hacemos un redireccion
			/*		if(page>this.pages){
						this._router.navigate(["/home"])
					}*/
				
				}else{
					this.status='error'
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

	// Metodo para cargar mas publicaciones
	public noMore=false;
	viewMore(){
		// Aumentamos la pagina
			this.page+=1;
		// Si no hay mas publicaciones
		if(this.page==this.pages){
			this.noMore=true;
		}else{
			this.getPublications(this.page,true);
		}

		
	}

	// Metodo para refrescar las publicaciones cuando publico, ejecutado mediante un evento lanzado en el sidebar
	// Al darle por defecto null, le insicamos que es opcional
	refreshPublications(event=null){
		// console.log(event);

		// Entonces ahora actualizamos las publicaciones
		this.getPublications(1);
	}


	showThisImage(id){
		this.showImage=id
	}

	// Eliminarmos la publicacion
	deletePublication(id){
		this._publicationService.deletePublication(this.token,id).subscribe(
			response=>{
				// Actualizamos las publicaciones
				this.refreshPublications()
			},
			error=>{
				console.log(<any>error)
			}
		)
	}
}