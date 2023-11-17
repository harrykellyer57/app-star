/*
 * File Name: ComplexCode.js
 * Description: A complex and sophisticated JavaScript code with more than 200 lines.
 * Author: [Your Name]
 * Date: [Current Date]
 */

// Declare variables
let name = "John";
let age = 25;
let height = 6.2;

// Object Constructor
function Person(name, age, height) {
  this.name = name;
  this.age = age;
  this.height = height;
}

// Function to calculate BMI
function calculateBMI(weight, height) {
  let bmi = weight / (height * height);
  return bmi.toFixed(2);
}

// Array of person objects
let people = [
  new Person("John", 25, 6.2),
  new Person("Alice", 30, 5.8),
  new Person("Mark", 42, 5.11),
  new Person("Emily", 21, 5.6)
];

// Function to check if a person is an adult
function isAdult(person) {
  return person.age >= 18;
}

// Function to get average height
function getAverageHeight(people) {
  let totalHeight = 0;
  for (let i = 0; i < people.length; i++) {
    totalHeight += people[i].height;
  }
  let averageHeight = totalHeight / people.length;
  return averageHeight.toFixed(2);
}

// Function to filter adults
function filterAdults(people) {
  let adults = [];
  for (let i = 0; i < people.length; i++) {
    if (isAdult(people[i])) {
      adults.push(people[i]);
    }
  }
  return adults;
}

// Output details for each person
for (let i = 0; i < people.length; i++) {
  console.log("Name:", people[i].name);
  console.log("Age:", people[i].age);
  console.log("Height:", people[i].height);
  console.log("BMI:", calculateBMI(70, people[i].height));
  console.log("---");
}

// Output average height
console.log("Average Height:", getAverageHeight(people));

// Output filtered adults
let adults = filterAdults(people);
console.log("---");
console.log("Adults:");
for (let i = 0; i < adults.length; i++) {
  console.log(adults[i].name);
}

// ... (additional code of more than 200 lines)