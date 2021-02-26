import { map, switchMap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { RunnableTimedSubject, TimedSubject } from "../TimedSubject"
import { ObservableTest } from "./ObservableTest"

interface Result {
	id: number,
	firstName: string,
	lastName: string,
}
export function createSwitchMapToNewTest(): ObservableTest {
	const first = new TimedSubject<Observable<Result>>(i => generateResult(i));
	const result = (([s1]: RunnableTimedSubject<Observable<Result>>[]) => s1.subject.pipe(
		switchMap(x => x),
		map(x => x.firstName)
	));

	return {
		subjects: [ first ],
		result,
	}
}

function generateResult(time: number): Observable<Result> {
	const keys = Array.from(Array(time).keys());
	return of(...keys.map(i => { return { id: i, firstName: `Firstname ${i}`, lastName: `Lastname ${i}` }}));
}
