import { Component, Input, OnInit } from '@angular/core';

export class ResultCollector {
  private time: number;
  private current: any[] = [];
  results: any[][] = new Array(16);

  collect(data: any): void {
    this.current.push(data);
  }

  setTime(time: number): void {
    if(time === 0) {
      this.results = new Array(16);
    }
    this.time = time;
  }

  finish(): void {
    this.results[this.time] = this.current;
    this.current = [];
  }
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Input()
  resultCollector: ResultCollector;

  constructor() { }

  ngOnInit(): void {
  }

}
