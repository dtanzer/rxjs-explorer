import { Observable } from "rxjs";
import { RunnableTimedSubject, TimedSubject } from "../TimedSubject";

export interface ObservableTest {
	headline: string,
	description: string,
	subjects: TimedSubject<any>[],
	result: (subjects: RunnableTimedSubject<any>[]) => Observable<any>,
}
