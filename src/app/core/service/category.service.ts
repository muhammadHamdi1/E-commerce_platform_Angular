import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrlProducts } from '../apiRoot/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _httpClient: HttpClient) { }

  getAllCategory(): Observable<any> {
    return this._httpClient.get(`${baseUrlProducts}/category`);
  };

  getSpecificCategory(typeCategory:string): Observable<any> {
    return this._httpClient.get(`${baseUrlProducts}/category`, {
      params: {type: typeCategory }
    });
  };

}
