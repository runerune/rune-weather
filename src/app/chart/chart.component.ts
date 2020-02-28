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
				display: false,
				id: 'clouds',
				//stacked: true,
				ticks: {
					beginAtZero: true,
					max: 150,
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
					labelString: 'm/h',
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
			}]
		},
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
	}

	clear(): void {
		this.cData = [
			{ data: [], label: 'Temperature', ...this.lineOptions, yAxisID: 'temperature', borderColor: '#00a8cc' },
			{ data: [], label: 'Wind', yAxisID: 'wind', backgroundColor: '#d45079', ...this.barOptions },
			{ data: [], label: 'Rain', backgroundColor: '#5fbdb0', yAxisID: 'rain', ...this.barOptions },
			{
				data: [],
				label: 'Clouds (low)',
				backgroundColor: 'rgba(108, 86, 123, .5)',
				...this.fillOptions
			},
			{
				data: [],
				label: 'Clouds (medium)',
				backgroundColor: 'rgba(192, 108, 132, .5)',
				...this.fillOptions
			},
			{
				data: [],
				label: 'Clouds (high)',
				backgroundColor: 'rgba(248, 177, 149, .5)',
				...this.fillOptions
			},
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

				this.cLabels.push(new Date(i).toLocaleTimeString([], {
					hour: '2-digit',
				}));

				let changedTemp = point.temp-minTemp;

				this.cData[0].data.push(changedTemp);
				this.cData[1].data.push([point.wind, point.wind-0.03]);
				this.cData[2].data.push(point.rain);
				this.cData[3].data.push(point.clouds.low);
				this.cData[4].data.push(point.clouds.medium);
				this.cData[5].data.push(point.clouds.high);

				count++;
			}
		}
	}
}
