export interface MoForecast {
	precipitation?: Array<{ $: { value: string }}>
	temperature?: Array<{ $: { value: string }}>
	windSpeed?: Array<{ $: { mps: string }}>
	lowClouds?: Array<{ $: { percent: string }}>
	mediumClouds?: Array<{ $: { percent: string }}>
	highClouds?: Array<{ $: { percent: string }}>
	fog?: Array<{ $: { percent: string }}>
}