import { Component, EventEmitter, Output, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

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
	firstRun: boolean = true;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
	) {

	}

	ngOnInit(): void {
		this.locationForm = this.formBuilder.group({
			location: '2',
		});

		this.route.paramMap.subscribe(params => {
			if(params.has('location')) {
				const selectedLocation = params.get('location');

				for(let i in this.locations) {
					const candidate = this.locations[i];

					if(candidate.name === selectedLocation) {
						this.locationForm.controls['location'].setValue(i.toString());
						if(this.firstRun) {
							this.changed.emit(candidate);
							this.firstRun = false;
						}
						return;
					}
				}
			} else {
				this.changed.emit(this.locations[2]);
			}
		});
	}

	onSubmit(data: { location: string }): void {
		const location = this.locations[parseInt(data.location)];
		this.router.navigateByUrl('/location/'+location.name);
		this.changed.emit(location);
	}

}
