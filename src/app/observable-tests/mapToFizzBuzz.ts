import { map } from "rxjs/operators";
import { RunnableTimedSubject, TimedSubject } from "../TimedSubject";

function fizzBuzz(i: number) {
	let result = '';

	if(i % 3 === 0) { result += 'Fizz' }
	if(i % 5 === 0) { result += 'Buzz' }

	return result || i;
}

export function createMapToFizzBuzzTest() {
	const s1 = new TimedSubject<number>(i => i);
	const result = (([s]: RunnableTimedSubject<number>[]) => s.subject.pipe(
		map(i => fizzBuzz(i))
	));

	return {
		subjects: [ s1 ],
		result,
	}
}
