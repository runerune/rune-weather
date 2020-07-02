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

	visible = false;

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
				ticks: {
					beginAtZero: true,
				},
				type: 'linear',
				position: 'right',
			}, {
				id: 'temperature',
				type: 'linear',
				offset: true,
				scaleLabel: {
					display: true,
					labelString: '°C',
				},
				ticks: {
					stepSize: 1,
				},
				stacked: true,
			}, {
				id: 'wind',
				type: 'linear',
				offset: true,
				gridLines: {
					drawOnChartArea: false,
				},
				scaleLabel: {
					display: true,
					labelString: 'km/h',
				},
				ticks: {
					suggestedMax: 50,
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
					suggestedMax: 3
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
					min: -100,
					max: 1,
				},
				display: false,
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
				order: 3,
				...this.lineOptions,
			}, {
				data: [],
				label: 'Wind',
				yAxisID: 'wind',
				backgroundColor: '#ec3d74',
				order: 2,
				...this.barOptions,
			}, {
				data: [],
				label: 'Rain',
				yAxisID: 'rain',
				backgroundColor: '#4d87c1',
				order: 4,
				...this.barOptions,
			}, {
				data: [],
				label: 'Clouds (low)',
				backgroundColor: 'rgba(108, 86, 123, .33)',
				order: 5,
				...this.fillOptions
			}, {
				data: [],
				label: 'Clouds (medium)',
				backgroundColor: 'rgba(192, 108, 132, .33)',
				order: 6,
				...this.fillOptions
			}, {
				data: [],
				label: 'Clouds (high)',
				backgroundColor: 'rgba(248, 177, 149, .33)',
				order: 7,
				...this.fillOptions
			}, {
				data: [],
				label: 'Night',
				backgroundColor: '#666',
				...this.fillOptions,
				yAxisID: 'daynight',
				steppedLine: true,
				order: 1
			}
		];
		this.cLabels = [];
	}

	ngOnChanges(changes: SimpleChanges): void {
		if(changes.data) {
			this.clear();

			const limit = 48;
			let count = 0;

			for(let i in changes.data.currentValue.forecast) {
				if(count > limit) break;

				const point = changes.data.currentValue.forecast[i];
				const date = (new Date(i));

				this.cLabels.push(date.toLocaleTimeString([], {
					hour: '2-digit',
				}));

				const windKmh = point.wind*3.6;

				this.cData[0].data.push(point.temp);
				this.cData[1].data.push([windKmh, windKmh-0.2]);
				this.cData[2].data.push(point.rain);
				this.cData[3].data.push(point.clouds.low);
				this.cData[4].data.push(point.clouds.medium);
				this.cData[5].data.push(point.clouds.high);

				const matchedSuntime = changes.data.currentValue.suntime[i];

				this.cData[6].data.push(matchedSuntime);

				count++;
			}

			setTimeout(() => {
				// prevent flashing of empty chart on first load
				this.visible = true;
			}, 100);
		}
	}
}
