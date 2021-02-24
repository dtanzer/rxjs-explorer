import { sequence } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { interval, OperatorFunction, Subject, } from 'rxjs';
import { map, mergeMap, take, takeWhile, tap, } from 'rxjs/operators';
import { ResultCollector } from './result/result.component';

export class TimedSubject {
  private positions: { [key in number]: number } = {};
  private allPositions: number[] = [];
  private s = new Subject<number>();
  
  constructor(s?: Subject<number>) {
    if(s) {
      this.s = s;
    }
  }

  public get subject() {
    return this.s;
  }

  public setAt(position: number): void {
    this.positions[position] = position;
    this.updateAllPositions();
  }

  public unsetAt(position: number): void {
    this.positions[position] = undefined;
    this.updateAllPositions();
  }

  private updateAllPositions() {
    this.allPositions = Object.keys(this.positions).map(p => parseInt(p));
    this.allPositions.sort((a, b) => a-b);
  }

  public doAt(position: number): void {
    if(this.positions[position]) {
      this.s.next(this.positions[position]);
    }
  }

  public contains(time: number): boolean {
    return this.positions[time] != null;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rxjs-explorer';
  subjects: TimedSubject[] = [];

  resultCollector = new ResultCollector();

  ngOnInit(): void {
    console.log('initializing');

    const s1 = new TimedSubject();
    //const s2 = new TimedSubject();

    this.subjects = [s1/*, s2*/];

    //const result = s1.subject.pipe(
    //  mergeMap(x => s2.subject.pipe(map(y => x+'/'+y))),
    //);
    const result = s1.subject.pipe(
      take(5)
    )
    result.subscribe(i => this.resultCollector.collect(i))
  }

  run() {
    this.runAll(...this.subjects);
  }

  private runAll(...ts: TimedSubject[]): void {
    const runner = interval(200).pipe(
      takeWhile(i => i<=20),
      tap(i => this.resultCollector.setTime(i)),
      tap(i => ts.forEach(t => t.doAt(i))),
      tap(_ => this.resultCollector.finish())
    );
    runner.subscribe();
  }
}

