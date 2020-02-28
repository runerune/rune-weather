import { MoForecast } from './MoForecast';

export interface MoHour {
	$: { from: string, to: string }
	location: Array<MoForecast>
}
