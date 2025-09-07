import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  // Return name initials in capital
  transform(name: string): string {
    if (name) {
      const separator_index: number = name.search("\\s")
      return name[0].toUpperCase() + name[separator_index + 1].toUpperCase();
    }
  }

}
