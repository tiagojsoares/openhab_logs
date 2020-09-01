import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { switchMap } from 'rxjs/operators';

@Injectable()
export class TableService {
  constructor(private http: HttpClient) {
  
  }
  getEvents() {

    return this.http.get('/assets/filePath.json')
      .pipe(
        switchMap((response: any) => this.http.get(response.pathToFile, {
          responseType: 'text'
        }))
      );
  }
}
