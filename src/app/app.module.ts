import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
// import {HttpModule} from '@angular/http';
// En lugar del 'HttpModule' vamos a usar el nuevo modulo, que está optimizado para hacer peticiones ajax a la api rest
import {HttpClientModule} from '@angular/common/http';
import {routing, appRoutingProviders} from './app.routing';
import {MomentModule} from 'angular2-moment'

// MODULO DE MENSAJERIA
import {MessagesModule} from './messages/messages.module'

// Componentes
import {AppComponent} from './app.component'
import {LoginComponent} from './components/login/login.component'
import {RegisterComponent} from './components/register/register.component'
import {HomeComponent} from './components/home/home.component'
import {UserEditComponent} from './components/user-edit/user-edit.component'
import {UsersComponent} from './components/users/users.component'
import {SidebarComponent} from './components/sidebar/sidebar.component'
import {TimelineComponent} from './components/timeline/timeline.component'
import {PublicationsComponent} from './components/publications/publications.component'
import {ProfileComponent} from './components/profile/profile.component'
import {FollowingComponent} from './components/following/following.component'
import {FollowedComponent} from './components/followed/followed.component'

// SERVICIOS
import {UserService} from './services/user.service'
import {UserGuard} from './services/user.guard'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    PublicationsComponent,
    ProfileComponent,
    FollowingComponent,
    FollowedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule,
    MomentModule,
    MessagesModule
  ],
  providers: [
    appRoutingProviders,
    UserGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
