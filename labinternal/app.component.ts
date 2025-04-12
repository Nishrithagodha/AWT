import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'expressapp';
}

const products = [
  {  name: 'Product 1', price: 10 , description : 'Product 1 description' , category : 'Electronics', stock : 15},
  {  name: 'Product 2', price: 20 , description : 'Product 2 description' , category : 'Electronics', stock : 10},
  {  name: 'Product 3', price : 30 , description : 'Product 3 description' , category : 'Electronics', stock : 12}
]

const selectedproduct = []
isint(){
  this.fetchproduct();
}

fetchproduct(){
  this.getproduct();
}

addproduct(name : string , price : number , description : string , category : string , stock : number){
  selectedproduct.push({name , price , description , category , stock})
  

}
function isint() {
  throw new Error('Function not implemented.');
}

function fetchproduct() {
  throw new Error('Function not implemented.');
}

