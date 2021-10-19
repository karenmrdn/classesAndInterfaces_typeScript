// !!! Interfaces describe objects (or function types)
// but can't store/describe arbitrary types like union types.

// !!! We can only add readonly modifier to the interface property
interface Named {
  readonly name?: string;
  outputName?: string; // optional property
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

// We can implement multiple interfaces in on class
class Person implements Greetable {
  age = 22;

  constructor(public name?: string) {} // we also can set optional properties in classes,
  // but in should be also optional in interface, implemented by this class

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + " " + this.name);
    } else {
      console.log("Hello, anonymous user");
    }
  }
}

const user1: Greetable = new Person("Lara");
// user1.name = "NewName"; // error because name property is private in the interface

user1.greet("Hello World, my name is");
console.log(user1);

/* -------Interface as a function type------- */
// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};
