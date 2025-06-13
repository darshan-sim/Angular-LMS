import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: string | undefined): string | undefined {
    if (value) {
      if (!value || value.length < 4) {
        return value;
      }
      const firstDigits =
        value[0] === '(' ? value.slice(0, value.indexOf(')') + 1) : value[0];
      const lastDigits = value[value.length - 2] + value[value.length - 1];
      const hiddenPart = '*'.repeat(value.length - 3);
      return `${firstDigits}${hiddenPart}${lastDigits}`;
    }
    return undefined;
  }
}
