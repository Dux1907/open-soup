// interface Person{
//   name:string,
//   age:number
// }

// const greet = (person:Person):string => {
//   return "Hello "+person.name+" you are "+person.age+" years old";
// }

// console.log(greet({name:'kartik',age:22}))
// interface PersonInterface{
//   name:string,
//   age:number
// }

// class Person implements PersonInterface{
//   name:string;
//   age:number;

//   constructor(name:string,age:number){
//     this.name = name;
//     this.age = age;
//   }
//   greetAge():string {
//     return "My age is " + this.age
//   }
// }

// console.log(new Person("Jhon Doe",33).greetAge())

enum Arithmatic{
  'Add',
  'Subtract',
  'Multiply',
  "Div"
}

function calculate(a:number,b:number,c:Arithmatic){
  return c
}
console.log(calculate(1,2,2))