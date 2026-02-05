import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [JsonPipe],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  http = inject(HttpClient);
  properties = signal<unknown[]>([])

  constructor() {
    this.http.get('http://localhost:3000/api/properties').subscribe((data) => {
     this.properties.set(data as unknown[]);
    });
  }
  protected title = 'property-mono';
}
