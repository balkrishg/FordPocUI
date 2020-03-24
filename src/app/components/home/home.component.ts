import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  public imagesUrl;

  ngOnInit() {
   
    this.imagesUrl = [
      'assets/image/index.jpeg',
      'assets/image/index1.jpeg',
      'assets/image/index2.jpeg',
      'assets/image/index3.jpeg',
      'assets/image/index4.jpeg',
      'assets/image/index5.jpeg',

    ]
  }
}
