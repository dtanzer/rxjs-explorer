import { take } from "rxjs/operators";
import { TimedSubject } from "../TimedSubject"
import { ObservableTest } from "./ObservableTest"

export function createTakeTest(): ObservableTest {
	const s1 = new TimedSubject<number>(i => i);
	const result = (([s]) => s.subject.pipe(
		take(5)
	));

	return {
		headline: 'take 5 from TimedSubject',
		description: `The result of this operation takes 5 values of the
		original TimedSubject`,
		subjects: [ s1 ],
		result,
	}
}
