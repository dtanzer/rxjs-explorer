import { Component, Input, OnInit } from '@angular/core';
import { TimedSubject } from '../TimedSubject';

@Component({
	selector: 'app-subject-editor',
	templateUrl: './subject-editor.component.html',
	styleUrls: ['./subject-editor.component.css']
})
export class SubjectEditorComponent implements OnInit {
	times = Array.from(Array(16).keys());

	@Input()
	timedSubject: TimedSubject<any>;

	constructor() { }

	ngOnInit(): void {
	}

	containsTime(time: number): boolean {
		return this.timedSubject.contains(time);
	}

	toggleTime(time: number): void {
		if(this.timedSubject.contains(time)) {
			this.timedSubject.unsetAt(time);
		} else {
			this.timedSubject.setAt(time);
		}
	}

	checkAll() {
		this.times.forEach(t => {this.timedSubject.setAt(t)});
	}

	checkEven() {
		this.uncheckAll();
		this.times.filter(t => t%2===0).forEach(t => {this.timedSubject.setAt(t)});
	}

	checkOdd() {
		this.uncheckAll();
		this.times.filter(t => t%2!==0).forEach(t => {this.timedSubject.setAt(t)});
	}

	uncheckAll() {
		this.times.forEach(t => {this.timedSubject.unsetAt(t)});
	}
}
