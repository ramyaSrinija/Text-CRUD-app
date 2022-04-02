import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(wordData: any[],searchTerm:string): any {
    if(!wordData || !searchTerm){
      return wordData
    }
    else{
      return wordData.filter(wordObj=>(wordObj.word.toLowerCase()).indexOf(searchTerm.toLowerCase())!==-1)
    }
  }

}
