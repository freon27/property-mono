import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { PropertiesStore } from './pages/properties/properties.store';
import { PropertiesService } from './pages/properties/properties.service';

@Component({
  imports: [JsonPipe],
  providers: [PropertiesStore, PropertiesService],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  store = inject(PropertiesStore);

  protected title = 'property-mono';
}
