import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	constructor(
		private http: HttpClient,
	) { }

	forecast(lat: number, lon: number, msl: number): Promise<string> {
		const url = 'https://api.met.no/weatherapi/locationforecast/1.9/?lat='+lat+'&lon='+lon+'&msl='+msl;
		return this.http.get(url, {responseType: 'text'}).toPromise();
	}

	suntime(lat: number, lon: number): Promise<string> {
		const date = new Date();

		const dateFormatted = date.toISOString().slice(0,10);
		const offset = this.formatOffset(date.getTimezoneOffset()*-1);

		const url = 'https://api.met.no/weatherapi/sunrise/2.0/?lat='+lat+'&lon='+lon+'&date='+dateFormatted+'&offset='+offset;
		return this.http.get(url, {responseType: 'text'}).toPromise();
	}

	private formatOffset(offset: number) {
		const hours = Math.floor(offset/60).toString().padStart(2, '0');
		const minutes = (offset%60).toString().padStart(2, '0');
		const sign = Math.sign(offset) ? '+' : '-';

		return sign+hours+':'+minutes;
	}

}
