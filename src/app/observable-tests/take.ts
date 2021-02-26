import { take } from "rxjs/operators";
import { TimedSubject } from "../TimedSubject"
import { ObservableTest } from "./ObservableTest"

export function createTakeTest(): ObservableTest {
	const s1 = new TimedSubject<number>(i => i);
	const result = (([s]) => s.subject.pipe(
		take(5)
	));

	return {
		subjects: [ s1 ],
		result,
	}
}
