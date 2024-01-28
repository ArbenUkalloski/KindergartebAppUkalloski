import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataComponent } from './dashboard/data/data.component';
import { AddDataComponent } from './dashboard/add-data/add-data.component';
import { HeaderComponent } from './header/header.component';
import { ButtonComponent } from './dashboard/button/button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { KindergartenDetailComponent } from './kindergarten-detail/kindergarten-detail.component';
 
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddDataComponent,
    DataComponent,
    HeaderComponent,
    ButtonComponent,
    KindergartenDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 
