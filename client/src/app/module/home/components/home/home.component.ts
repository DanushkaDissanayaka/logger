import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images = [
    {path:'/assets/img-home/img-carousel/1.jpg'},
    {path:'/assets/img-home/img-carousel/2.jpg'},
    {path:'/assets/img-home/img-carousel/3.jpg'},
    {path:'/assets/img-home/img-carousel/4.jpg'}

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
