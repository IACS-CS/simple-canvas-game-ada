/* Main game file: main.js */
/* Game: [Your Game Name Here] */
/* Authors: [Your Name(s) Here] */
/* Description: [Short description of your game here] */
/* Citations: [List any resources, libraries, tutorials, etc you used here] 
/* Note: If you use significant AI help you should cite that here as well */
/* including summaries of prompts and/or interactions you had with the AI */
/* In addition, of course, any AI-generated code should be clearly maked */
/* in comments throughout the code, though of course when using e.g. CoPilot */
/* auto-complete it maye be impractical to mark every line, which is why you */
/* should also include a summary here */


import "./style.css";

import { GameInterface } from 'simple-canvas-library';

let gi = new GameInterface()


/* Variables: Top-Level variables defined here are used to hold game state */
// This code was helped written by Github Copilot
const paddle = {
  width: 200,
  height: 16,
  x: 340,
  y: 560,
  color: 'white'
}
// This code was helped written by Github Copilot
// Make a function to create a ball object with properties for position
let ball = {
  x: 400,
  y: 300,
  radius: 10,
  color: 'blue',
  width: 20,
  height: 20
}
// Define variables for velocity of the ball
let velocityX = 200; 
let velocityY = 150;
/* Drawing Functions */

/* Example drawing function: you can add multiple drawing functions
that will be called in sequence each frame. It's a good idea to do 
one function per each object you are putting on screen, and you
may then want to break your drawing function down into sub-functions
to make it easier to read/follow */

gi.addDrawing(
  function ({ ctx, width, height, elapsed, stepTime }) {
    // This function runs 60 times per second
    // This code was helped written by Github Copilot
    ctx.fillStyle = paddle.color;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    // Make a function to draw a ball
    // This code was helped written by Github Copilot
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    // Add gravity to the ball
    ball.x += velocityX * stepTime / 1000;
    ball.y += velocityY * stepTime / 1000;
    // Add bounce to the ball when it hits the walls
    // This code was helped written by Github Copilot but it used OR operators which is "||" and I had to change it to else if statements
    if (ball.x + ball.radius > width) {
      velocityX -= velocityX * 2;
    } else if (ball.x - ball.radius < 0) {
      velocityX -= velocityX * 2;
    }
    if (ball.y + ball.radius > height) {
      velocityY -= velocityY * 2; 
    } else if (ball.y - ball.radius < 0)
      velocityY -= velocityY * 2;
    // Keep paddle on the screen if user moves it off the screen
    // This code was helped written by Github Copilot
    if (paddle.x < 0) {
      paddle.x = 0;
    }
    if (paddle.x + paddle.width > width) {
      paddle.x = width - paddle.width;
    }
    if (paddle.y < 0) {
      paddle.y = 0;
    }
    if (paddle.y + paddle.height > height) {
      paddle.y = height - paddle.height;
    }  
  }
)

/* Input Handlers */

/* Example: Mouse click handler (you can change to handle 
any type of event -- keydown, mousemove, etc) */


gi.addHandler(
  "keydown",
  // Basic arrow key movement that is used to move the paddle whenever a key is pressed
  function ({ event }) {
    if (event.key === "ArrowLeft") {
      paddle.x -= 30;
    } else if (event.key === "ArrowRight") {
      paddle.x += 30;
    } else if (event.key === "ArrowUp") {
      paddle.y -= 30;
    } else if (event.key ==="ArrowDown") {
      paddle.y += 30;
    }
  }
);
/* Run the game */
gi.run();


