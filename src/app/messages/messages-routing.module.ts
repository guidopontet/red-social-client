import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

// COMPONENTES
import {MainComponent} from './components/main/main.component'
import {AddComponent} from './components/add/add.component'
import {ReceivedComponent} from './components/received/received.component'
import {SendedComponent} from './components/sended/sended.component'

// Para restringir el acceso a rutas privadas
import {UserGuard} from '../services/user.guard'

// Definimos una ruta principal (messages) y rutas hijas
const messagesRoutes:Routes = [
	{
		path: 'mensajes',
		component: MainComponent,
		children: [
			{ path: '',redirectTo:'recibidos',pathMatch: 'full'},
			{ path: 'enviar', component: AddComponent,canActivate:[UserGuard]},
			{ path: 'recibidos', component: ReceivedComponent,canActivate:[UserGuard]},
			{ path: 'recibidos/:page', component: ReceivedComponent,canActivate:[UserGuard]},
			{ path: 'enviados', component: SendedComponent,canActivate:[UserGuard]},
			{ path: 'enviados/:page', component: SendedComponent,canActivate:[UserGuard]}
		]
	}
]

@NgModule({
	imports:[
		RouterModule.forChild(messagesRoutes)
	],
	exports:[
		RouterModule
	]
})
export class MessagesRoutingModule{}