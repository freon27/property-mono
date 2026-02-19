import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { PropertiesStore } from './pages/properties/properties.store';
import { PropertiesService } from './pages/properties/properties.service';
import { Button, Input, Select, Card, Label } from '@property-mono/nklt';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { DataTable } from './components/data-table/data-table';
import { JsonPipe } from '@angular/common';
import { DynamicForm } from './components/dynamic-form/dynamic-form';
import { FormFieldConfig } from './components/dynamic-form/dynamic-form.model';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  providers: [PropertiesStore, PropertiesService],
  imports: [Select, Input, Button, Card, Label, JsonPipe, DataTable, DynamicForm],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  store = inject(PropertiesStore);

  config = signal<FormFieldConfig[]>([
      { name: 'propertyName', label: 'Property Name', type: 'text' },
      { name: 'residentialUnitCount', label: 'Unit Count', type: 'number' },
      { name: 'purchaseDate', label: 'Purchase Date', type: 'date' }
    ]);

    propertyModel = signal({
      propertyName: 'My Property',
      residentialUnitCount: 10,
      purchaseDate: new Date().toISOString().substring(0, 10)
    });

  propertiesWithImages = computed(() =>
    this.store.properties().map((property) => ({
      ...property,
      imageUrl: `https://picsum.photos/300/200?random=${property.id}`,
    })),
  );
}
