import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
	@Input() data;
	@ViewChild('chart') chart: BaseChartDirective;

	cData = [];
	cLabels = [];

	cOptions = {
		scaleShowVerticalLines: false,
		responsive: true,
		maintainAspectRatio: false,
		animation: {
			duration: 0,
		},
		scales: {
			xAxes: [{
				ticks: {
					maxRotation: 0,
				}
			}],
			yAxes: [{
				display: false,
				id: 'clouds',
				//stacked: true,
				ticks: {
					beginAtZero: true,
				},
				type: 'linear',
				position: 'right',
			}, {
				id: 'temperature',
				type: 'linear',
				scaleLabel: {
					display: true,
					labelString: '°C',
				},
				stacked: true,
			}, {
				id: 'wind',
				type: 'linear',
				gridLines: {
					drawOnChartArea: false,
				},
				scaleLabel: {
					display: true,
					labelString: 'km/h',
				},
				ticks: {
					max: 50,
					min: 0,
				},
				stacked: true,
			}, {
				id: 'rain',
				type: 'linear',
				gridLines: {
					drawOnChartArea: false,
				},
				position: 'right',
				ticks: {
					max: 3
				},
				scaleLabel: {
					display: true,
					labelString: 'mm/h',
				}
			}, {
				id: 'daynight',
				type: 'linear',
				gridLines: {
					drawOnChartArea: false,
				},
				ticks: {
					min: 0,
					max: 1,
				},
				display: true,
			}]
		},
		tooltips: {
			enabled: false,
		},
		events: [],
	};

	cLegend = true;
	cType = 'line';

	ngOnInit(): void {
		this.clear();
	}

	fillOptions = {
		lineTension: .5,
		borderWidth: 0,
		borderColor: 'transparent',
		pointRadius: 0,
		yAxisID: 'clouds',
	}

	lineOptions = {
		backgroundColor: 'transparent',
		pointRadius: 0,
	}

	barOptions = {
		type: 'bar',
		stack: 'windRain',
		barPercentage: 1,
		pointRadius: 0,
	}

	clear(): void {
		this.cData = [
			{
				data: [],
				label: 'Temperature',
				yAxisID: 'temperature',
				borderColor: '#71a95a',
				...this.lineOptions,
			}, {
				data: [],
				label: 'Wind',
				yAxisID: 'wind',
				backgroundColor: '#ec3d74',
				...this.barOptions,
			}, {
				data: [],
				label: 'Rain',
				yAxisID: 'rain',
				backgroundColor: '#4d87c1',
				...this.barOptions,
			}, {
				data: [],
				label: 'Clouds (low)',
				backgroundColor: 'rgba(108, 86, 123, .33)',
				...this.fillOptions
			}, {
				data: [],
				label: 'Clouds (medium)',
				backgroundColor: 'rgba(192, 108, 132, .33)',
				...this.fillOptions
			}, {
				data: [],
				label: 'Clouds (high)',
				backgroundColor: 'rgba(248, 177, 149, .33)',
				...this.fillOptions
			}, {
				data: [],
				label: 'Day/night',
				backgroundColor: 'rgba(0,0,0, .1)',
				...this.fillOptions,
				yAxisID: 'daynight',
				steppedLine: true,
			}
		];
		this.cLabels = [];
	}

	ngOnChanges(changes: SimpleChanges): void {
		if(changes.data) {
			this.clear();

			let limit = 48;
			let count = 0;

			let minTemp = Infinity;

			for(let i in changes.data.currentValue) {
				let point = changes.data.currentValue[i];
				if(point.temp < minTemp) minTemp = point.temp;
			}

			minTemp -= 1;

			for(let i in changes.data.currentValue) {
				if(count > limit) break;

				let point = changes.data.currentValue[i];
				let date = (new Date(i));

				this.cLabels.push(date.toLocaleTimeString([], {
					hour: '2-digit',
				}));

				let changedTemp = point.temp-minTemp;

				let windKmh = point.wind*3.6;

				this.cData[0].data.push(changedTemp);
				this.cData[1].data.push([windKmh, windKmh-0.2]);
				this.cData[2].data.push(point.rain);
				this.cData[3].data.push(point.clouds.low);
				this.cData[4].data.push(point.clouds.medium);
				this.cData[5].data.push(point.clouds.high);

				if(date.getHours() > 18  || date.getHours() < 7) {
					this.cData[6].data.push(0.05);
				} else {
					this.cData[6].data.push(0);
				}

				count++;
			}
		}
	}
}
