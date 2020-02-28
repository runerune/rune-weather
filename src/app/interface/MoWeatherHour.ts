import { MoForecast } from './MoForecast';

export interface MoWeatherHour {
	$: { from: string, to: string }
	location: Array<MoForecast>
}
