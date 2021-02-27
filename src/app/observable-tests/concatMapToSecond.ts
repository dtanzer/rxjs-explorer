import { take, map, concatMap } from "rxjs/operators";
import { TimedSubject } from "../TimedSubject"
import { ObservableTest } from "./ObservableTest"

export function createConcatMapToSecondTest(): ObservableTest {
	const first = new TimedSubject<number>(i => i);
	const second = new TimedSubject<number>(i => i);
	const result = (([s1, s2]) => s1.subject.pipe(
		concatMap(x => s2.subject.pipe(
			take(3),
			map(y => x+' / '+y),
		))
	));

	return {
		headline: 'mergeMap to a Second TimedSubject',
		description: `The first timedSubject mergeMaps to the second
		TimedSubject (taking three values from the second). Use to test how switchMap works when both subjects
		generate their values over time (i.e. none of the subjects generates
		them immediately).`,
		subjects: [ first, second ],
		result,
	}
}
