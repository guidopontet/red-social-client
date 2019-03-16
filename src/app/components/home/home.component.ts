import {Component, OnInit} from '@angular/core';


@Component({
	selector: 'home',
	templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit{
	public title:String;

	constructor(){
		this.title='Bienvenido a la red social de profesionales'
	}

	ngOnInit(){
		console.log('Component Home cargado')
	}
}