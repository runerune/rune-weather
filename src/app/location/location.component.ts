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
		{ name: 'Katowice', lat: 50.264377, lon: 19.023525, msl: 290 },
		{ name: 'Foobar Town', lat: 41, lon: 5643, msl: 111 },
		{ name: 'Baz city', lat: -45, lon: 12, msl: -6 },
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
