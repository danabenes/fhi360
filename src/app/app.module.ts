import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';

import { TextFieldModule } from '@angular/cdk/text-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColorPickerModule } from 'ngx-color-picker';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { TileComponent } from './components/shared/tile/tile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectsComponent } from './components/projects/projects.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ReportsOverviewComponent } from './components/reports-overview/reports-overview.component';
import { ReportsDatatableComponent } from './components/reports-datatable/reports-datatable.component';
import { SignupComponent } from './components/signup/signup.component';
import { CreateComponent } from './components/create/create.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { CreateHeaderComponent } from './components/create/create-header/create-header.component';
import { CreateSidebarComponent } from './components/create/create-sidebar/create-sidebar.component';
import { RichTextToolbarComponent } from './components/shared/rich-text-toolbar/rich-text-toolbar.component';
import { ResizableModule } from 'angular-resizable-element';
import { ApiService } from './services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { PreloaderComponent } from './components/shared/preloader/preloader.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    HeaderComponent,
    SidebarComponent,
    TileComponent,
    ProjectsComponent,
    TemplatesComponent,
    ReportsComponent,
    ReportsOverviewComponent,
    ReportsDatatableComponent,
    SignupComponent,
    CreateComponent,
    ModalComponent,
    CreateHeaderComponent,
    CreateSidebarComponent,
    RichTextToolbarComponent,
    PaginationComponent,
    PreloaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule,
    MatTableModule,
    MatDialogModule,
    TextFieldModule,
    DragDropModule,
    ResizableModule,
    ColorPickerModule,
    HttpClientModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatMenuModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSliderModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
