import { computed, inject } from '@angular/core';
import { signalStore, withProps, withComputed } from '@ngrx/signals';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { PropertiesService } from './properties.service';
import { SelectProperty } from '@property-mono/shared';

export const PropertiesStore = signalStore(
  withProps(() => {
    const propertiesService = inject(PropertiesService);

    return {
      propertiesQuery: injectQuery<SelectProperty[]>(() => ({
        queryKey: ['propertyData'],
        queryFn: () =>
          lastValueFrom(
            propertiesService.getProperties()
          ),
        
      })),
    };
  }),
  withComputed((state) => ({
    properties: computed(() => state.propertiesQuery.data() ?? []),
  }))
);
 