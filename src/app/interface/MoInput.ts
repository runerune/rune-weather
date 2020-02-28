import { MoProduct } from './MoProduct';

export interface MoInput {
	weatherdata?: {
		product: Array<MoProduct>
	}
}