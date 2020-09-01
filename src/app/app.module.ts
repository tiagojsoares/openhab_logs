import { TableOverviewExample } from './table-overview/table-overview.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatCardModule } from '@angular/material/card';

import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TableService } from './table-overview/table.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';




@NgModule({
  declarations: [
    AppComponent,TableOverviewExample

  ],
  imports: [
    BrowserModule, MatTooltipModule, MatSelectModule, MatMenuModule, MatInputModule, MatBadgeModule, MatBadgeModule, MatChipsModule,
    AppRoutingModule, MatDialogModule, MatToolbarModule, HttpClientModule, MatProgressSpinnerModule,FormsModule,
    BrowserAnimationsModule, CommonModule, ScrollingModule, RouterModule, MatCardModule, MatDividerModule,
    MatCheckboxModule, MatListModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatButtonModule,MatIconModule,ReactiveFormsModule

  ],
  providers: [TableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
