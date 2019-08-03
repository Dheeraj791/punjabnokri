import { Pipe, Injectable, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filter',
	pure: false
})
@Injectable()
export class FilterPipe implements PipeTransform {
	transform(items: any[], field: string, value: any, operator: string = 'equal'): any[] {
		if (!items) {
			return []
		};
		if (operator === 'greater') {
			return items.filter(it => it[field] > value);
		}
		else if (operator === 'less') {
			return items.filter(it => it[field] < value);
		}
		else if (operator === 'notequal') {
			return items.filter(it => it[field] !== value);
		}
		else if (operator === 'notnull'){
			return items.filter(it => it[field] !== null);
		}
		else if (operator === 'null'){
			return items.filter(it => it[field] === null);
		}
		else {
			return items.filter(it => it[field] === value);
		}
	}
}
