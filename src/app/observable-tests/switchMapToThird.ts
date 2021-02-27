import { map, switchMap } from "rxjs/operators";
import { TimedSubject } from "../TimedSubject"
import { ObservableTest } from "./ObservableTest"

export function createSwitchMapToThirdTest(): ObservableTest {
	const first = new TimedSubject<number>(i => i);
	const second = new TimedSubject<number>(i => i);
	const third = new TimedSubject<number>(i => i);
	const result = (([s1, s2, s3]) => s1.subject.pipe(
		switchMap(x => s2.subject.pipe(map(y => x+' / '+y))),
		switchMap(x => s3.subject.pipe(map(y => x+' - '+y)))
	));

	return {
		headline: 'switchMaps to a Second Subject, and then to a Third',
		description: `Similar to switchMapToSecond. Use to test how it works
		with three TimedSubjects.`,
		subjects: [ first, second, third ],
		result,
	}
}
