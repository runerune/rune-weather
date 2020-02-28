import { Injectable } from '@angular/core';
import { Parser } from 'xml2js';

@Injectable({
	providedIn: 'root'
})
export class XmlTransformService {
	async from(input: string): Promise<Object> {
		let parser = new Parser();
		return parser.parseStringPromise(input);
	}
}
