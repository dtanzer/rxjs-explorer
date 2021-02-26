import { Subject } from "rxjs";

export type PayloadGenerator<T> = (position: number) => T;

export class TimedSubject<T> {
	private positions: { [key in string]: T } = {};
	private allPositions: number[] = [];
	private s = new Subject<T>();
	
	constructor(private generatePayload: PayloadGenerator<T>, s?: Subject<T>) {
		if(s) {
			this.s = s;
		}
	}

	public setAt(position: number, payloadToSet?: T): void {
		const payload = payloadToSet || this.generatePayload(position);
		this.positions[''+position] = payload;
		this.updateAllPositions();
	}

	public unsetAt(position: number): void {
		this.positions[position] = undefined;
		this.updateAllPositions();
	}

	private updateAllPositions() {
		this.allPositions = Object.keys(this.positions).map(p => parseInt(p));
		this.allPositions.sort((a, b) => a-b);
	}

	public contains(time: number): boolean {
		return this.positions[time] != null;
	}

	public at(time: number): T {
		return this.positions[''+time];
	}

	public reset() : RunnableTimedSubject<T> {
		this.s = new Subject<T>();
		return new RunnableTimedSubject<T>(this, this.s);
	}
}

export class RunnableTimedSubject<T> {
	constructor(private timedSubject: TimedSubject<T>, private s: Subject<T>) {}

	public get subject() {
		return this.s;
	}

	public doAt(position: number): void {
		if(this.timedSubject.at(position) != null) {
			this.s.next(this.timedSubject.at(position));
		}
	}

}
