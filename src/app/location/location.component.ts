import { Component, EventEmitter, Output, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-location',
	templateUrl: './location.component.html',
	styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
	@Output() changed = new EventEmitter;

	locations = [
		{ name: 'Warsaw', lat: 52.229829, lon: 21.011733, msl: 100 },
		{ name: 'Krakow', lat: 50.064649, lon: 19.944962, msl: 219 },
		{ name: 'Katowice', lat: 50.264377, lon: 19.023525, msl: 290 },
		{ name: 'Rysy', lat: 49.179580, lon: 20.088045, msl: 2503 },
	];

	locationForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
	) {

	}

	ngOnInit(): void {
		this.locationForm = this.formBuilder.group({
			location: '',
		});
	}

	onSubmit(data: { location: string }): void {
		const location = this.locations[parseInt(data.location)];
		this.changed.emit(location);
	}

}
