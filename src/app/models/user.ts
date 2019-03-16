export class User{

	// Definimos las propiedades en el constructor
	constructor(
		public _id:String,
		public name:String,
		public surname:String,
		public nick: String,
		public email: String,
		public password: String,
		public role: String,
		public image: String
	){}
}