import { Component, computed, inject, signal } from '@angular/core';
import { PropertiesStore } from './pages/properties/properties.store';
import { PropertiesService } from './pages/properties/properties.service';
import { Button, Input, Select, Card, Label } from '@property-mono/nklt';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { DataTable } from './components/data-table/data-table';
import { JsonPipe } from '@angular/common';
import { DynamicForm } from './components/dynamic-form/dynamic-form';
import { FormFieldConfig } from './components/dynamic-form/dynamic-form.model';

ModuleRegistry.registerModules([AllCommunityModule]);


interface Property {
  propertyName: string;
  residentialUnitCount: number;
  purchaseDate: string;
}

@Component({
  providers: [PropertiesStore, PropertiesService],
  imports: [
    Select,
    Input,
    Button,
    Card,
    Label,
    JsonPipe,
    DataTable,
    DynamicForm,
  ],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      padding: 0 1rem 1rem 1rem;
      gap: 1rem;
      height: calc(100vh - 2rem);
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-block-start: 1.5rem;
    }

    :is(h1, h2, h3, h4, h5, h6):first-child {
      margin-block-start: 0;
    }
  `,
})
export class App {
  store = inject(PropertiesStore);

  config = signal<FormFieldConfig[]>([
    { name: 'propertyName', label: 'Property Name', type: 'text', required: true },
    { name: 'residentialUnitCount', label: 'Unit Count', type: 'number' },
    { name: 'purchaseDate', label: 'Purchase Date', type: 'date' },
  ]);

  propertyModel = signal<Property>({
    propertyName: 'My Property',
    residentialUnitCount: 10,
    purchaseDate: new Date().toISOString().substring(0, 10),
  });

  formValid = signal(false);

  setFormValue(value: Property) {
      this.propertyModel.set(value);
  
    this.formValid.set(this.formValid() || false);
  }

  setFormValid(isValid: boolean) {
    this.formValid.set(isValid);
  }
    

  propertiesWithImages = computed(() =>
    this.store.properties().map((property) => ({
      ...property,
      imageUrl: `https://picsum.photos/300/200?random=${property.id}`,
    })),
  );
}
