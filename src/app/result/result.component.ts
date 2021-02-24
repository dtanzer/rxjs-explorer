import { Component, Input, OnInit } from '@angular/core';

export class ResultCollector {
  private time: number;
  private current: any[] = [];
  results: any[][] = [];

  collect(data: any): void {
    this.current.push(data);
  }

  setTime(time: number): void {
    if(time === 0) {
      this.results = [];
    }
    this.time = time;
  }

  finish(): void {
    this.results.push(this.current);
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
