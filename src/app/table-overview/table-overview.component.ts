import { EventLog } from './EventLog';
import { Component, ViewChild } from "@angular/core";
import { TableService } from "./table.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.css']
})

export class TableOverviewExample {
  checks: EventLog[];

  displayedColumns = ["DateT", "Event", 'check'];
  dataSource: MatTableDataSource<EventLog>;
  logs: any;
  events: EventLog[] = [];
  filter: string = '';
  hide = true;
  user;
  password;
  session = false;
  sts: any = true;
  cld: any = false;
  login: any = false;
  check: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('formLogin', { static: true }) formLogin: NgForm;

  constructor(private eventService: TableService) {
    this.ObterEvento();

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.events);




  }

  ngOnInit() {
    this.TimerValida();
  }

  listarTodos(): EventLog[] {
    return this.eventService.listarTodos();
  }






  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  clear() {
    this.events = [];
    this.dataSource = new MatTableDataSource(this.events);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ObterEvento() {
    this.events = [];
    this.eventService.getEvents()
      .pipe(
        filter(response => response.includes('HL746')),
        tap(i => {

        }))
      .subscribe(response => {
        let logs = response.split("\n");
        let arr_logs = [];
        let date_time_arr = [];


        for (let index = 0; index < logs.length; index++) {
          if (logs[index].includes('HL746')) {

            let temp = logs[index].split('HL746_');
            let time = (logs[index].split(' '));
            let letTimeTemp = time[1].split('.');

            let datetime = time[0] + " " + letTimeTemp[0];


            if (temp.length == 2) {
              temp[1] = temp[1].replace('changed from UNDEF to ON', 'mudou de UNDEF para ON');
              temp[1] = temp[1].replace('changed from NULL to UNDEF', 'mudou de NULL para UNDEF');
              temp[1] = temp[1].replace('predicted to become ON', 'previsto para se tornar ON');
              temp[1] = temp[1].replace('received command ON', 'comando recebido ON');
              temp[1] = temp[1].replace('changed from NULL to UNDEF', 'mudou de NULL para UNDEF');
              temp[1] = temp[1].replace('changed from NULL to UNDEF', 'mudou de NULL para UNDEF');
              temp[1] = temp[1].replace('changed from UNDEF to OFF', 'mudou de UNDEF para OFF');
              temp[1] = temp[1].replace('changed from OFF to ON', 'mudou de OFF para ON');
              temp[1] = temp[1].replace('changed from ON to OFF', 'mudou de ON para OFF');




              let str: string = temp[1];

              str.split(',');

              if (logs[index].includes('STS') && this.sts) {
                arr_logs.push(str);
                date_time_arr.push(datetime);
              }

              if (logs[index].includes('CLD') && this.cld) {
                arr_logs.push(str);
                date_time_arr.push(datetime);
              }

            }


          }
        }

        for (let index = 0; index < arr_logs.length; index++) {
          this.events.push(
            new EventLog(
              date_time_arr[index],
              arr_logs[index]
            ));

        }

        this.events.reverse();

      });
  }

  TimerValida() {
    const timeValue = setInterval((interval) => {

      if (this.events.length === 0) {
        this.ObterEvento();
      } else {
        this.checks = this.listarTodos();
        for (let index = 0; index < this.checks.length; index++) {

          const i = this.events.findIndex(e => e.datetime === this.checks[index].toString());
          this.events[i].check = true;
        }


        this.dataSource = new MatTableDataSource(this.events);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


        this.applyFilter(this.filter);


      }
    }, 2000);


  }

  Efet_login(): void {
    if (this.session) {
      this.session = false;
      this.user = '';
      this.password = '';
    }
    if (this.user === 'controller' && this.password === "P@ssw0rd123") {
      this.session = true;

    } else {
      this.user = '';
      this.password = '';
    }

  }
  applyFilter(filterValue: string) {
    this.filter = filterValue;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  gravarEvent(row: any, event: any): void {
    this.eventService.gravarEventos(row, event);
  }
}


