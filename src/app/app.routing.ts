// Fichero donde se configuran las rutas
import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent} from './components/users/users.component'
import {TimelineComponent} from './components/timeline/timeline.component'
import {ProfileComponent} from './components/profile/profile.component'
import {FollowingComponent} from './components/following/following.component'
import {FollowedComponent} from './components/followed/followed.component'

import {UserGuard} from './services/user.guard'

// Definicion de rutas
const appRoutes:Routes=[
	{path: '',component:HomeComponent},
	{path: 'home',component:HomeComponent},
	{path: 'login',component:LoginComponent},
	{path: 'registro',component:RegisterComponent},
	/*Utilizamos los GUARDS para restringir el acceso a rutas privadas*/
	{path: 'mis-datos',component:UserEditComponent,canActivate:[UserGuard]},
	{path: 'gente',component:UsersComponent,canActivate:[UserGuard]},
	{path: 'gente/:page',component:UsersComponent,canActivate:[UserGuard]},
	{path: 'timeline',component:TimelineComponent,canActivate:[UserGuard]},
	{path: 'perfil/:id',component:ProfileComponent,canActivate:[UserGuard]},
	{path: 'siguiendo/:id/:page',component:FollowingComponent,canActivate:[UserGuard]},
	{path: 'seguidores/:id/:page',component:FollowedComponent,canActivate:[UserGuard]},


	// Ahora definimos el path 404 con **
	{path: '**',component:HomeComponent}

	
]

// Exportar el modulo de rutas
export const appRoutingProviders:any[]=[];
export const routing: ModuleWithProviders=RouterModule.forRoot(appRoutes);