

function getArrayFromUser() {
    var numbers = [];
    while (true) {
        var input = prompt("Enter a number (or 'stop' to finish):");
        if (input === 'stop') {
            break;
        }
        numbers.push(parseFloat(input));

    }
    return numbers;
}
function getString() {
    var input2 = prompt('Enter a string to be reversed:');
    return input2;
}

function reverseString(string) {
    return string.split('').reverse().join('');
}
function maxNumber(arr){
    var max=arr[0];
    for (var i = 1; i < arr.length; i++) {
if(arr[i]>max)
{
    max=arr[i];
}
}
return max;

}
function calculateSum(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }  

    return sum;
}
function removingRepeated(arr) {
    var uniqueArray = [];
    for (var i = 0; i < arr.length; i++) {
        if (uniqueArray.indexOf(arr[i]) === -1) {
            uniqueArray.push(arr[i]);
        }
    }
    return uniqueArray;
}
var numbers = getArrayFromUser();

if (numbers) {
    var sum = calculateSum(numbers);
    alert("The sum of the numbers is: " + sum);
    var greatest=maxNumber(numbers);
alert('The greatest number is '+ greatest)
}
var uniqueNumbers = removingRepeated(numbers);
alert('Array after removing duplicates:' + uniqueNumbers);
var inputString = getString();
    var reversedString = reverseString(inputString);
    alert('The reversed string is: ' + reversedString);

    //TASK FOUR
    /*
    Arrow functions which provides easier way int writing functions
    */
   const add =(a, b)=> a+b;
   /*
   variable with block scope (let&const)
   */
   //The For/Of Loop
   let n = "Habiba";

let text = "";
for (let x of n) {
  text += x + "<br>";
}
//Classes introduced a more intuitive and cleaner syntax for creating classes and handling inheritance.
class Person {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}
//Allows for easy extraction of values from arrays or properties from objects into distinct variables.
const [a, b] = [1, 2];
const { name, age } = { name: 'John', age: 30 };
//map of objects    
const fruits=new Map([
["apples",1],["oranges",2],["strawberry ",3]

]
);

//spread operator ... which helps in putting arrays inside other arrays like this
const q1 = ["Jan", "Feb", "Mar"];
const q2 = ["Apr", "May", "Jun"];
const q3 = ["Jul", "Aug", "Sep"];
const q4 = ["Oct", "Nov", "May"];

const year = [...q1, ...q2, ...q3, ...q4];

//PART TOW
//fetch
const url = 'https://api.example.com/users';

fetch(url)
  .then(response => response.json()) 
  .then(data => {
    console.log(data); 
  })
  .catch(error => {
    console.error(error); 
  });
  //older method:XMLHttpRequest (XHR)
  function fetchData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.example.com/data', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
        }
    };
    xhr.send();
}

fetchData();

//axios 

function fetchData() {
    axios.get('https://api.example.com/data')
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was a problem with the axios request:', error);
        });
}

fetchData();
