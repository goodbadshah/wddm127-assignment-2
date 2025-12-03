const randNum = Math.floor(Math.random() * 10) + 1; // Random number between 1-10
let userPick = 5; // user guesses 5

let message = randNum === userPick ? "You guessed right!" : "You guessed wrong!";
 
console.log(message)