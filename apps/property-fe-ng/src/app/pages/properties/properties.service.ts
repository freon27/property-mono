import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { SelectProperty } from "@property-mono/shared";


@Injectable()
export class PropertiesService {
    
    http = inject(HttpClient);

    getProperties() {
        return this.http.get<SelectProperty[]>('http://localhost:3000/api/properties');
    }
}