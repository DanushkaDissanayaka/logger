import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { HomeServiceService } from 'src/app/service/home-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  lineChartOptions: ChartOptions = {
    responsive: true,
    elements: { line: { fill: false } },
    scales: {
      xAxes: [{
        ticks: {
          callback: function (tick, index, array) {
            return (index % 2) ? "" : tick;
          },
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45
        }
      }]
    }
  };

  lineChartType: ChartType = 'line';
  lineChartLegend = true;
  lineChartPlugins = [];

  lineChartData!: ChartDataSets[]

  lineChartLabels!: Label[];

  showChart: boolean = false;
  date: string = moment().format('YYYY-MM-DD');
  today: string = moment().format('YYYY-MM-DD');

  constructor(private _homeService: HomeServiceService) { }

  ngOnInit(): void {
    this.getGraphData(this.date)
  }

  getGraphData(date: string): void {
    this._homeService.getGraphData(res => {
      console.log(res);
      this.lineChartData = [{ data: res.data, label: 'Current', borderColor: '#09828c', pointBackgroundColor: 'black' }];
      this.lineChartLabels = res.label;
      this.showChart = true;
    },
      e => {
        console.log(e);
      }, this.date)
  }

  OnDateChange() {
    this.showChart = false;
    this.getGraphData(this.date)
  }




}
