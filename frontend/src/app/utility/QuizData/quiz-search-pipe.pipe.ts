import { Pipe, PipeTransform } from '@angular/core';
import { IQuiz } from '../interfaces/iquiz';
import { Quiz } from './Quiz';
@Pipe({
  name: 'quizSearchPipe'
})
export class QuizSearchPipePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items
    }
    searchText = searchText.toLocaleLowerCase();
    return items.filter(it => {
      return it.name.toLocaleLowerCase().includes(searchText);
    });
  }
}
