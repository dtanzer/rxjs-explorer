import { map, take, switchMap } from "rxjs/operators";
import { TimedSubject } from "../TimedSubject"
import { ObservableTest } from "./ObservableTest"

export function createSwitchMapToSecondTest(): ObservableTest {
	const first = new TimedSubject<number>(i => i);
	const second = new TimedSubject<number>(i => i);
	const result = (([s1, s2]) => s1.subject.pipe(
		switchMap(x => s2.subject.pipe(
			take(3),
			map(y => x+' / '+y)
		))
	));

	return {
		headline: 'switchMap to a Second TimedSubject',
		description: `The first timedSubject switchMaps to the second
		TimedSubject. Use to test how switchMap works when both subjects
		generate their values over time (i.e. none of the subjects generates
		them immediately).`,
		subjects: [ first, second ],
		result,
	}
}
