import {Component, OnInit,Input} from '@angular/core'
import {Router,ActivatedRoute,Params} from '@angular/router'
import {Publication} from '../../models/publication'
import {GLOBAL} from '../../services/global'
import {UserService} from '../../services/user.service'
import {PublicationService} from '../../services/publication.service'

// Definimos el componente
@Component({
	selector: 'publications',
	templateUrl: './publications.component.html',
	providers: [UserService,PublicationService]
})

export class PublicationsComponent implements OnInit{
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
	// Definimos un input para las publicaciones de un usuario ya que se recibe de afuera del componente
	@Input() user:string

	constructor(
		private _route:ActivatedRoute,
		private _router:Router,
		private _userService:UserService,
		private _publicationService:PublicationService
	){
		this.title="Publicaciones"
		this.identity=this._userService.getIdentity();
		this.token=this._userService.getToken();
		this.url=GLOBAL.url;
		this.page=1;
	}

	ngOnInit(){
		console.log("publications.component cargado correctamente")
		this.getPublications(this.user,this.page);
	}

	// PARA VER PUBLICACIONES DEL USUARIO QUE ESTAMOS VIENDO EL PERFIL
	// El segundo atributo adding define si estamos scrolleando infinitamente
	getPublications(user,page,adding=false){
		this._publicationService.getPublicationsUser(this.token,user,page).subscribe(
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
						$("html, body").animate({scrollTop:$('html').prop('scrollHeight')},500);


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
		if(this.page>=this.pages){
			this.noMore=true;
		}else{
			this.getPublications(this.user,this.page,true);
		}

		
	}
}