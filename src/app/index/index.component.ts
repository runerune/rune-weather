import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { XmlTransformService } from '../xml-transform.service';
import { SimplifyService } from '../simplify.service';
import { Location } from '../interface/Location';
import { SimplifiedMoData } from '../interface/SimplifiedMoData';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
	transformedSet: SimplifiedMoData<number> = {};

	constructor(
		private dataService: DataService,
		private xmlTransformService: XmlTransformService,
		private simplifyService: SimplifyService,
	) { }

	ngOnInit(): void {
	}

	fetch(location: Location): void {
		this.dataService.load(location.lat, location.lon, location.msl)
			.then(data => this.xmlTransformService.from(data))
			.then(result => this.simplifyService.from(result))
			.then(simplified => {
				this.transformedSet = simplified;
			})
	}

}
