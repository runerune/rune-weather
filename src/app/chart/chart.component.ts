import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
	@Input() data;

	cData = [];
	cLabels = [];

	cOptions = {
		scaleShowVerticalLines: false,
		responsive: true,
		animation: {
			duration: 0,
		},
		scales: {
			xAxes: [{
				ticks: {
					autoSkip: false,
					maxRotation: 0,
				}
			}],
			yAxes: [{
				ticks: {
					min: 0,
				}
			}]
		}
	};
	cLegend = true;
	cType = 'line';

	ngOnInit(): void {
		this.clear();
	}

	clear(): void {
		this.cData = [
			{ data: [], label: 'Temperature' },
			{ data: [], label: 'Wind' },
			{ data: [], label: 'Rain', type: 'bar' },
			{ data: [], label: 'Fog', type: 'bar' },
			{ data: [], label: 'Clouds (low)' },
			{ data: [], label: 'Clouds (medium)' },
			{ data: [], label: 'Clouds (high)' },
		];
		this.cLabels = [];
	}

	ngOnChanges(changes: SimpleChanges): void {
		if(changes.data) {
			this.clear();

			let limit = 24;
			let count = 0;

			for(let i in changes.data.currentValue) {
				if(count > limit) break;

				let point = changes.data.currentValue[i];

				this.cLabels.push(new Date(i).toLocaleTimeString([], {
					hour: '2-digit',
				}));

				this.cData[0].data.push(point.temp);
				this.cData[1].data.push(point.wind);
				this.cData[2].data.push(point.rain*100);
				//this.cData[3].data.push(point.fog);
				this.cData[3].data.push(Math.random()*50);
				this.cData[4].data.push(point.clouds.low);
				this.cData[5].data.push(point.clouds.medium);
				this.cData[6].data.push(point.clouds.high);

				count++;
			}
		}
	}
}
