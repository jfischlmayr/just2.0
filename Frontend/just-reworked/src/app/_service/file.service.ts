import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private url = 'https://localhost:5001/api/file';

  constructor(private http: HttpClient) {}

  public download(id : number) {
    return this.http.get(`${this.url}/download?id=${id}`, {
      observe:'response', responseType:'blob'
  });
  }
}
