import { map, switchMap } from "rxjs/operators";
import { TimedSubject } from "../TimedSubject"
import { ObservableTest } from "./ObservableTest"

export function createSwitchMapToSecondTest(): ObservableTest {
	const first = new TimedSubject<number>(i => i);
	const second = new TimedSubject<number>(i => i);
	const result = (([s1, s2]) => s1.subject.pipe(
		switchMap(x => s2.subject.pipe(map(y => x+' / '+y)))
	));

	return {
		subjects: [ first, second ],
		result,
	}
}
