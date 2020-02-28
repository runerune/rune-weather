import { Injectable } from '@angular/core';
import { MoAstroData } from './interface/MoAstroData';

@Injectable({
	providedIn: 'root'
})
export class SimplifySuntimeService {
	from(data: MoAstroData) {
		const sunrise = data.astrodata.location[0].time[0].sunrise[0].$.time;
		const sunset = data.astrodata.location[0].time[0].sunset[0].$.time;

		console.log(sunrise, sunset);
	}
}
