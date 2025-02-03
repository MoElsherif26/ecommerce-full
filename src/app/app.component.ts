import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './core/services/flowbite.service';
import { BrandsComponent } from "./pages/brands/brands.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ecommerce-full';
  constructor(private flowbiteService: FlowbiteService) {}
  ngOnInit(): void {
    initFlowbite();
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      // console.log('Flowbite loaded', flowbite);
    });
  }
}
