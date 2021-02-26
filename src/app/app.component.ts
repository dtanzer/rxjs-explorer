import { sequence } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { interval, OperatorFunction, Subject, } from 'rxjs';
import { map, mergeMap, take, takeWhile, tap, } from 'rxjs/operators';
import { createMapToFizzBuzzTest } from './observable-tests/mapToFizzBuzz';
import { ObservableTest } from './observable-tests/ObservableTest';
import { createSwitchMapToNewTest } from './observable-tests/switchMapToNew';
import { createSwitchMapToSecondTest } from './observable-tests/switchMapToSecond';
import { createSwitchMapToThirdTest } from './observable-tests/switchMapToThird';
import { createTakeTest } from './observable-tests/take';
import { ResultCollector } from './result/result.component';
import { RunnableTimedSubject, TimedSubject } from './TimedSubject';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'rxjs-explorer';
	test: ObservableTest;

	resultCollector = new ResultCollector();

	ngOnInit(): void {
		const takeTest = createTakeTest();
		const mapToFizzBuzzTest = createMapToFizzBuzzTest();
		const switchMapToSecondTest = createSwitchMapToSecondTest();
		const switchMapToThirdTest = createSwitchMapToThirdTest();
		const switchMapToNewTest = createSwitchMapToNewTest();

		this.test = switchMapToNewTest;
	}

	run() {
		const runnables = this.test.subjects.map(s => s.reset());
		this.test.result(runnables).subscribe(i => this.resultCollector.collect(i));

		this.runAll(...runnables);
	}

	private runAll(...ts: RunnableTimedSubject<unknown>[]): void {
		const runner = interval(200).pipe(
			takeWhile(i => i<=15),
			tap(i => this.resultCollector.setTime(i)),
			tap(i => ts.forEach(t => t.doAt(i))),
			tap(_ => this.resultCollector.finish())
		);
		runner.subscribe();
	}
}

