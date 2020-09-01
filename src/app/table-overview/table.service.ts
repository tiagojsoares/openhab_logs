import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { switchMap } from 'rxjs/operators';
import { EventLog } from './EventLog';

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

  gravarEventos(row: any, event: any): void {
    if (event.checked === true) {
      const tarefas = this.listarTodos();
      let date = row.datetime;     
      
      tarefas.push(date);     
      localStorage["eventos"] = JSON.stringify(tarefas);
      
    } else {
      // console.log('Falso');
    }
  }

 


  listarTodos(): EventLog[] {
    const tarefas = localStorage["eventos"];
    //Operador Ternario
    return tarefas ? JSON.parse(tarefas) : [];
  }
}
