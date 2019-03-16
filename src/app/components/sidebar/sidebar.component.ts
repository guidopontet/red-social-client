import{Component, OnInit, EventEmitter,Input,Output} from '@angular/core';
import {UserService} from '../../services/user.service'
import{Router, ActivatedRoute,Params} from '@angular/router';
import {GLOBAL} from '../../services/global'
import {Publication} from '../../models/publication'
import {PublicationService} from '../../services/publication.service'
import {UploadService} from '../../services/upload.service' 

@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html',
	providers: [UserService,PublicationService, UploadService]
})

export class SidebarComponent {
	public identity;
	public token;
	public stats;
	public url;
	public status;
	public publication:Publication;

	constructor( 
		private _userService: UserService,
		private _publicationService:PublicationService,
		private _uploadService:UploadService,
		private _route:ActivatedRoute,
		private _router:Router
	){
		this.identity=this._userService.getIdentity();
		this.token=this._userService.getToken();
		this.stats=this._userService.getStats();
		this.url=GLOBAL.url;
		this.publication=new Publication('','','','',this.identity._id);
	}


	// Cuando se carga el componente
	ngOnInit(){
		console.log('Componente de SideBar cargado')
		console.log(this.identity)
		console.log(this.stats)
	}

	// Cuando enviemos desde el formulario una publicacion
	onSubmit(form,$event){
		// console.log(this.publication)
		this._publicationService.addPublication(this.token,this.publication).subscribe(
			response=>{
				if(response.publication){
					
					// Si subio imagen
					if(this.filesToUpload && this.filesToUpload.length){
						// Subimos la imagen
						this._uploadService.makeFileRequest(this.url+'upload-image-pub/'+response.publication._id,[],this.filesToUpload,this.token,'image').
								then((result:any)=>{
									this.publication.file=result.image

									this.publication=response.publication;
									this.status='success'
									// Reseteamos el formulario
									form.reset();
									// Redirigimos a timeline al pulicar
									this._router.navigate(['/timeline']);
									// Activamos el evento para refrescar las publicaciones
									this.sended.emit({send: 'true'}) /*enviamos un json, en este caso al pedo*/
								})
					}else{ /*Sino guardamos la publicacionj sin la imagen*/

						this.publication=response.publication;
						this.status='success'
						// Reseteamos el formulario
						form.reset();
						// Redirigimos a timeline al pulicar
						this._router.navigate(['/timeline']);
						this.sended.emit({send: 'true'}) /*enviamos un json, en este caso al pedo*/
					}


					
				}else{
					this.status='error' 
				}
			},
			error=>{
				var errorMessage=<any>error;
				console.log(errorMessage);
				if(errorMessage!=null){
					this.status='error'
				}
			}

		)
	}

	// Definims un array de ficheros a subir
	public filesToUpload: Array<File>;
	fileChangeEvent(fileInput:any){
		// Recogemos los archivos del input que le pasamos por parametro
		this.filesToUpload=<Array<File>> fileInput.target.files;
	}

	// EVENTO OUTPUT (Creamos un evento para capturarlo en el listado de publicaciones para actualizarlo)
	@Output() sended=new EventEmitter();
	// Cuando lancemos el metodo le pasamos el evento que lo produce	
	sendPublication(event){
		console.log(event);
		this.sended.emit({send: 'true'}) /*enviamos un json, en este caso al pedo*/
	}
}