import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	constructor(
		private http: HttpClient,
	) { }

	load(lat: number, lon: number, msl: number): Promise<string> {
		let url = 'https://api.met.no/weatherapi/locationforecast/1.9/?lat='+lat+'&lon='+lon+'&msl='+msl;
		return this.http.get(url, {responseType: 'text'}).toPromise();
	}

}
