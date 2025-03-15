import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  //styleUrl: './app.component.css',
  styles : [`body{color : blue}`]
})
export class AppComponent {
  title = 'Helloworld';
  name = "cvr"
    Students = [
      {
      id : 96 , name : "Nishritha" , age : 19
    },
    {
      id : 95, name : "Nishka" , age : 20
    }
  ]
  flag = false

  delete(id: number) {
    this.Students = this.Students.filter(student => student.id !== id);
    console.log(`Deleted student with ID: ${id}`);
  }

  toggle(){
    this.flag = !this.flag
  }
  
}
