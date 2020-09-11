import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { switchMap, retry, catchError } from 'rxjs/operators';
import { EventLog } from './EventLog';
import { throwError } from 'rxjs';

@Injectable()
export class TableService {
  constructor(private http: HttpClient) {

  }
  getEvents() {

    return this.http.get('/assets/filePath.json')
      .pipe(
        retry(3),
        catchError(error => {
          console.error('Inside catchError: ', error);



          return throwError('throwError: Error');
        }),
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
      this.remover(row.datetime);
      console.log('Falso');
    }
  }


  remover(id: any): void {
    let tarefas: EventLog[] = this.listarTodos();
    console.log(id);

    tarefas = tarefas.filter(tarefa => tarefa !== id);
    localStorage["eventos"] = JSON.stringify(tarefas);
  }

  listarTodos(): EventLog[] {
    const tarefas = localStorage["eventos"];
    //Operador Ternario
    return tarefas ? JSON.parse(tarefas) : [];
  }

}
