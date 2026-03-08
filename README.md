1️⃣ What is the difference between var, let, and const?  
ANSWER:  
ver:
 1. var is function-scoped.
 2. var can be redeclared.
 3. var can also be reassigned.
 4. var is hoisted and initialized with undefined.
 5. var is an old way of declaring variables, so it is usually avoided in modern JavaScript. 

let:
1. let is block-scoped.
2. let cannot be redeclared in the same scope.
3. let can be reassigned.
4. let is hoisted but stays in the Temporal Dead Zone (TDZ) until it is declared.
5. let is used when the variable value needs to change.

const:
1. const is block-scoped.
2. const cannot be redeclared or reassigned.
3. const must be initialized when declared.
4. const is hoisted but stays in the Temporal Dead Zone (TDZ).
5. For objects and arrays, the contents can be changed, but the variable itself cannot be reassigned.

2️⃣ What is the spread operator (...)?  
ANSWER:  
The spread operator (...) in JavaScript is used to expand or spread elements of an array, object, or iterable into individual elements.It helps to copy, merge, or pass elements easily.Common Uses:   

1. Copy an Array:__  
const arr1 = [1, 2, 3];  
const arr2 = [...arr1];  
console.log(arr2); // [1,2,3]  

2. Merge Arrays__  
const a = [1, 2];  
const b = [3, 4];  
const result = [...a, ...b];  
console.log(result); // [1,2,3,4] 

3. Copy or Merge Objects__    
const user = {name: "Jui"};  
const updatedUser = {...user, age: 20};  
console.log(updatedUser);  

4. Pass Array Elements as Function Arguments__    
const numbers = [5, 10, 15];  
console.log(Math.max(...numbers));  

3️⃣ What is the difference between map(), filter(), and forEach()?  
ANSWER:  

These are JavaScript array methods used to loop through array elements, but they work differently.  
map()  
1. map() creates a new array.
2. It transforms each element of the original array.
3. The length of the array stays the same.  
4. map() returns a new array.  
example:  
const numbers = [1, 2, 3, 4];  
const result = numbers.map(num => num * 2);  
console.log(result);   
// [2, 4, 6, 8]  

filter()  
1. filter() creates a new array.  
2. It keeps elements that match a condition.  
3. The array length may be smaller.  
4. filter() returns elements that pass the condition.  
example:  
const numbers = [1, 2, 3, 4];  
const result = numbers.filter(num => num > 2);  
console.log(result);  
// [3, 4]  

forEach()  
1. forEach() is used to loop through an array.  
2. It does NOT return a new array.  
3. It is usually used for side effects (printing, updating UI, etc.).  
4. forEach() returns undefined.  
example:  
const numbers = [1, 2, 3];  
numbers.forEach(num => {  
  console.log(num);  
});  
output:  
1  
2  
3  

4️⃣ What is an arrow function?  
ANSWER:  
1. An arrow function is a shorter syntax for writing functions in JavaScript.
2. Arrow function uses =>.
3. Arrow functions make code shorter and cleaner.
4. It was introduced in ES6.  
example:1  
const add = (a, b) => a + b;   

example:2  
const greet = () => {  
console.log("Hello");  
};  

5️⃣ What are template literals?  
ANSWER:  
- Template literals are a way to create strings with embedded expressions in JavaScript. 
- They use backticks ` instead of single ' or double " quotes. 
- Template literals are special strings, written with backticks `.   
Benefits:  
1. Easy string interpolation (${...})  
2. Multi-line strings without \n  
3. Can include expressions or variables directly.  
example:  
```javascript
const a = 5;
const b = 10;
console.log(`The sum of ${a} and ${b} is ${a + b}.`);
// Output: The sum of 5 and 10 is 15
