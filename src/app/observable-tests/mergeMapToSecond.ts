import { take, map, mergeMap } from "rxjs/operators";
import { TimedSubject } from "../TimedSubject"
import { ObservableTest } from "./ObservableTest"

export function createMergeMapToSecondTest(): ObservableTest {
	const first = new TimedSubject<number>(i => i);
	const second = new TimedSubject<number>(i => i);
	const result = (([s1, s2]) => s1.subject.pipe(
		mergeMap(x => s2.subject.pipe(
			take(3),
			map(y => x+' / '+y)
		))
	));

	return {
		headline: 'mergeMap to a Second TimedSubject',
		description: `The first timedSubject mergeMaps to the second
		TimedSubject (taking 3 values of the second). Use to test how switchMap works when both subjects
		generate their values over time (i.e. none of the subjects generates
		them immediately).`,
		subjects: [ first, second ],
		result,
	}
}
