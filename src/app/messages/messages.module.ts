// MODULOS
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {MomentModule} from 'angular2-moment'

// RUTAS
import {MessagesRoutingModule} from './messages-routing.module'

// COMPONENTES
import {MainComponent} from './components/main/main.component'
import {AddComponent} from './components/add/add.component'
import {ReceivedComponent} from './components/received/received.component'
import {SendedComponent} from './components/sended/sended.component'

// SERVICIOS
import {UserService} from '../services/user.service'
import {UserGuard} from '../services/user.guard'

@NgModule({
	declarations: [
		MainComponent,
		AddComponent,
		ReceivedComponent,
		SendedComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		MessagesRoutingModule,
		MomentModule

	],
	exports: [
		MainComponent,
		AddComponent,
		ReceivedComponent,
		SendedComponent
	],
	providers: [UserGuard,UserService]
})
export class MessagesModule{}