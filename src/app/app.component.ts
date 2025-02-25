import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { initFlowbite } from 'flowbite';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.component.html', 
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ecommerce-full';
  PID = inject(PLATFORM_ID);
  constructor(private flowbiteService: FlowbiteService) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.PID)) {
      initFlowbite();
      
    }
    this.flowbiteService.loadFlowbite(flowbite => {});
  }
}
