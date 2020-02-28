import { Injectable } from '@angular/core';
import { SimplifiedForecast } from './interface/SimplifiedForecast';
import { MoWeatherData } from './interface/MoWeatherData';
import { SimplifiedForecastRain } from './interface/SimplifiedForecastRain';

@Injectable({
	providedIn: 'root'
})
export class SimplifyWeatherService {
	from(data: MoWeatherData) {
		const root = data.weatherdata.product[0];

		const standardData = {} as SimplifiedForecast<number>;
		const rainData = {} as SimplifiedForecastRain<number>;

		for(let hour of root.time) {
			const cast = hour.location[0];

			if(cast.precipitation) {
				const startDate = (new Date(hour.$.from)).getTime();
				const endDate = (new Date(hour.$.to)).getTime();

				if(endDate-startDate === 3600000) {
					rainData[hour.$.from] = parseFloat(cast.precipitation?.[0].$.value);
				}
				// else ignore
			} else {
				standardData[hour.$.from] = {
					temp: parseFloat(cast.temperature?.[0].$.value),
					wind: parseFloat(cast.windSpeed?.[0].$.mps),
					clouds: {
						low: parseFloat(cast.lowClouds?.[0].$.percent),
						medium: parseFloat(cast.mediumClouds?.[0].$.percent),
						high: parseFloat(cast.highClouds?.[0].$.percent),
					},
					fog: parseFloat(cast.fog?.[0].$.percent) | 0,
					rain: 0,
				}
			}

		}

		for(let date in standardData) {
			if(typeof rainData[date] !== 'undefined') {
				standardData[date].rain = rainData[date];
			} else {
				delete standardData[date];
			}
		}

		return standardData;
	}
}
