import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { XmlTransformService } from '../xml-transform.service';
import { Location } from '../interface/Location';
import { SimplifiedForecast } from '../interface/SimplifiedForecast';
import { SimplifyWeatherService } from '../simplify-weather.service';
import { SimplifySuntimeService } from '../simplify-suntime.service';
import { SimplifiedSuntime } from '../interface/SimplifiedSuntime';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
	transformedSet: {
		forecast?: SimplifiedForecast<number>,
		suntime?: SimplifiedSuntime<number>,
	 } = {};

	constructor(
		private dataService: DataService,
		private xmlTransformService: XmlTransformService,
		private simplifyWeatherService: SimplifyWeatherService,
		private simplifySuntimeService: SimplifySuntimeService,
	) { }

	ngOnInit(): void {
	}

	fetch(location: Location): void {
		Promise.all([
			this.dataService.forecast(location.lat, location.lon, location.msl),
			this.dataService.suntime(location.lat, location.lon)
		]).then(([forecastData, sunData]) => {
			return Promise.all([
				this.xmlTransformService.from(forecastData),
				this.xmlTransformService.from(sunData)
			])
		})
		.then(([forecastResult, sunResult]) => {
			return Promise.all([
				this.simplifyWeatherService.from(forecastResult),
				this.simplifySuntimeService.from(sunResult)
			])
		}).then(([simplifiedForecast, simplifiedSuntime]) => {
			this.transformedSet = {
				forecast: simplifiedForecast,
				suntime: simplifiedSuntime,
			}
		});
	}

}
