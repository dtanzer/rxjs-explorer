import { map, switchMap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { RunnableTimedSubject, TimedSubject } from "../TimedSubject"
import { ObservableTest } from "./ObservableTest"

interface Result {
	id: number,
	firstName: string,
	lastName: string,
}
export function createSwitchMapToSingleTest(): ObservableTest {
	const first = new TimedSubject<Observable<Result[]>>(i => usersFromServer(i));
	const result = (([s1]: RunnableTimedSubject<Observable<Result[]>>[]) => s1.subject.pipe(
		switchMap(x => x),
		switchMap(x => of(...x)),
		map(x => x.firstName)
	));

	return {
		headline: 'switchMap to Single Array',
		description: `The timed subject calls "usersFromServer" every time it fires, 
			which returns a single array of users (not doing an actual server call).
			The result switchMaps to this array, and then again switchMaps to a new
			observable made of the entries of this array.`,
		subjects: [ first ],
		result,
	}
}

function usersFromServer(time: number): Observable<Result[]> {
	const keys = Array.from(Array(time).keys());
	return of(keys.map(i => { return { id: i, firstName: `F ${i}`, lastName: `L ${i}` }}));
}
