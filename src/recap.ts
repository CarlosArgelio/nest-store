const myName = 'Nicolas';
const myAge = 12;
const sum = (a: number, b: number) => a + b;

sum(1, 2);

class Person {
  constructor(
    private age: number,
    private name: string,
  ) {}

  getSummary() {
    return `${this.name} is ${this.age} years old`;
  }
}

const carlos = new Person(19, 'Carlos');
console.log(carlos.getSummary());
