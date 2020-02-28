import { MoProduct } from './MoProduct';

export interface MoWeatherData {
	weatherdata?: {
		product: Array<MoProduct>
	}
}