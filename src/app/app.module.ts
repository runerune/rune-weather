import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationComponent } from './location/location.component';
import { ChartComponent } from './chart/chart.component';
import { IndexComponent } from './index/index.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

@NgModule({
	declarations: [
		AppComponent,
		LocationComponent,
		ChartComponent,
		IndexComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
        ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		ChartsModule,
		RouterModule.forRoot([
			{ path: '', component: IndexComponent },
			{ path: 'location/:location', component: IndexComponent },
		])
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
