export interface SimplifiedForecast<T> {
	[key: string] : {
		temp: T,
		wind: T,
		clouds: {
			low: T,
			medium: T,
			high: T,
		}
		fog: T,
		rain: T,
	}
}