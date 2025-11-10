import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LabelModule } from '@progress/kendo-angular-label';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    GridModule,
    ButtonsModule,
    InputsModule,
    DateInputsModule,
    DropDownsModule,
    LabelModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
