import { sequence } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { interval, OperatorFunction, Subject, } from 'rxjs';
import { map, mergeMap, takeWhile, tap, } from 'rxjs/operators';

interface TimedData<T> {
  position: number;
  data: T;
}

class TimedSubject<T> {
  private positions: { [key in number]: TimedData<T> } = {};
  private allPositions: number[] = [];
  private s = new Subject<TimedData<T>>();

  constructor(s?: Subject<TimedData<T>>) {
    if(s) {
      this.s = s;
    }
  }

  public get subject() {
    return this.s.pipe(map(d => d.data));
  }

  public setAt(position: number, data: T): void {
    this.positions[position] = { position, data, };
    this.allPositions.push(position);
  }

  public doAt(position: number): void {
    if(this.positions[position]) {
      this.s.next(this.positions[position]);
    }
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rxjs-explorer';

  ngOnInit(): void {
    console.log('initializing');

    const s1 = new TimedSubject<number>();
    const s2 = new TimedSubject<number>();

    const result = s1.subject.pipe(
      mergeMap(x => s2.subject.pipe(map(y => x+'/'+y))),
    );
    result.subscribe(x => console.log(x))

    s1.setAt(1,1);
    s1.setAt(5,5);
    s1.setAt(8,8);
    s1.setAt(14,14);
    s1.setAt(17,17);

    s2.setAt(3,3);
    s2.setAt(5,5);
    s2.setAt(16,16);

    this.runAll(s1, s2);
  }

  private runAll(...ts: TimedSubject<unknown>[]): void {
    const runner = interval(200).pipe(
      takeWhile(i => i<=20),
      tap(i => ts.forEach(t => t.doAt(i)))
    );
    runner.subscribe();
  }
}
