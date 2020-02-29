import { Injectable } from '@angular/core';
import { MoAstroData } from './interface/MoAstroData';
import { SimplifiedSuntime } from './interface/SimplifiedSuntime';

@Injectable({
	providedIn: 'root'
})
export class SimplifySuntimeService {
	from(data: MoAstroData): SimplifiedSuntime<number> {
		const root = data.astrodata.location[0].time;

		const sundataVector: { [key: string]: number} = {};

		for(let entry of root) {
			try {
				const dateStart = new Date(entry.$.date);

				const sunrise = new Date(entry.sunrise[0].$.time);
				const sunset = new Date(entry.sunset[0].$.time);

				for(let i=0; i<24; i++) {
					const dateWithHour = new Date(dateStart);
					dateWithHour.setHours(i);

					const isAfterSunrise = dateWithHour.getTime() > sunrise.getTime();
					const isBeforeSunset = dateWithHour.getTime() < sunset.getTime();

					const key = dateWithHour.toISOString().replace(/\.000Z$/, 'Z');

					sundataVector[key] = (isAfterSunrise && isBeforeSunset) ? 0 : 1;
				}
			} catch(e) {
				
			}
		}

		return sundataVector;
	}
}
