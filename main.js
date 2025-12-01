/* Main game file: main.js */
/* Game: [Reverse Pong] */
/* Authors: [Adam Tran] */
/* Description: [This goal of this game is to hit the ball with the pong paddle and as the game goes on, the ball gets slower making it easier for the player to catch the ball] */
/* Citations: [Significant AI help of Github Copilot and Mr. Hinkle was used to help write parts of this code] 
/* Note: If you use significant AI help you should cite that here as well */
/* including summaries of prompts and/or interactions you had with the AI */
/* In addition, of course, any AI-generated code should be clearly maked */
/* in comments throughout the code, though of course when using e.g. CoPilot */
/* auto-complete it maye be impractical to mark every line, which is why you */
/* should also include a summary here */

import "./style.css";

import { GameInterface } from "simple-canvas-library";

let gi = new GameInterface();

/* Variables: Top-Level variables defined here are used to hold game state */
// This code was helped written by Github Copilot
const paddle = {
  width: 100,
  height: 16,
  x: 340,
  y: 560,
  color: "white",
};
// This code was helped written by Github Copilot
// Make a function to create a ball object with properties for position
let ball = {
  x: 400,
  y: 300,
  radius: 10,
  color: "blue",
  width: 10,
  height: 10,
};
// Define variables for velocity of the ball
let velocityX = 200;
let velocityY = 150;
let gameWidth = 0;
let gameHeight = 0 // set up variables we will populate in the drawing function
// Define game over and win conditions
let gameOver = false;
let gameWon = false;
/* Drawing Functions */
gi.getContainer().querySelector('canvas').focus();

/* Example drawing function: you can add multiple drawing functions
that will be called in sequence each frame. It's a good idea to do 
one function per each object you are putting on screen, and you
may then want to break your drawing function down into sub-functions
to make it easier to read/follow */

gi.addDrawing(function ({ ctx, width, height, elapsed, stepTime }) {
  gameWidth = width;
  gameHeight = height;
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
  // Make the ball move fast
  ball.x += velocityX * (stepTime / 1000) * 5;
  ball.y += velocityY * (stepTime / 1000) * 5;
  // Add bounce to the ball when it hits the walls
  // This code was helped written by Github Copilot but it used OR operators which is "||" and I had to change it to else if statements
  if (ball.x + ball.radius > width) {
    // If the ball hits the right wall...
    velocityX += velocityX * -1.5;
    ball.x = width - ball.radius; // Prevent sticking to the wall
  } else if (ball.x - ball.radius < 0) {
    // If the ball hits the left wall...
    ball.x = ball.radius; // Prevent sticking to the wall
    velocityX += velocityX * -1.5;
  }
  if (ball.y + ball.radius > height) {
    // If the ball hits the bottom wall...
    ball.y = height - ball.radius; // Prevent sticking to the wall
    velocityY -= velocityY * 2;
  } else if (ball.y - ball.radius < 0)
    // If the ball hits the top wall...
    //ball.y = ball.radius; // Prevent sticking to the wall
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
  // Set a time limit of the game to 10 seconds
  gi.addDrawing(function ({ ctx, width, height, elapsed, stepTime }) {
    if (elapsed >= 10000) {
      // Freeze the game
      velocityX = 0;
      velocityY = 0;
      // Remove control of the paddle
      gi.removeHandler("keydown");
      // Display "Time's Up!" text in the center of the screen
      ctx.fillStyle = "red";
      ctx.font = "48px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Time's Up!", width / 2, height / 2);
      // Show a restart button below the "Time's Up!" text
      ctx.fillStyle = "green";
      ctx.fillRect(width / 2 - 75, height / 2 + 50, 150, 50);
      ctx.fillStyle = "white";
      ctx.font = "24px Arial";
      ctx.fillText("Restart", width / 2, height / 2 + 85);
  
      // Add a click handler to the restart button
    }
  });

  if (
    ball.x + ball.radius > paddle.x &&
    ball.x - ball.radius < paddle.x + paddle.width &&
    ball.y + ball.radius > paddle.y &&
    ball.y - ball.radius < paddle.y + paddle.height
  ) {
    velocityY -= velocityY * 2;
    // Freeze the game
    velocityX = 0;
    velocityY = 0;
    // Remove control of the paddle
    gi.removeHandler("keydown");
    // Display "You win text in the center of the screen
    ctx.fillStyle = "green";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("You Win!", width / 2, height / 2);
    // Show a restart button below the "Game Over" text
    ctx.fillStyle = "green";
    ctx.fillRect(width / 2 - 75, height / 2 + 50, 150, 50);
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Restart", width / 2, height / 2 + 85);
    // Add a click handler to the restart button
  }
});
gi.addHandler("click", function ({ event, x, y }) {
  const rect = gi.canvas.getBoundingClientRect();
  
  if (
    x >= gameWidth / 2 - 75 &&
    x <= gameWidth / 2 + 75 &&
    y >= gameHeight / 2 + 50 &&
    y <= gameHeight / 2 + 100
  ) {
    // Reset the game state
    velocityX = 200;
    velocityY = 150;
    ball.x = 400;
    ball.y = 300;
    paddle.x = 340;
    paddle.y = 560;
    // Re-add the keydown handler to allow player control again
    gi.addHandler(
      "keydown",
      function ({ event }) {
        if (event.key === "ArrowLeft") {
          paddle.x -= 30;
        } else if (event.key === "ArrowRight") {
          paddle.x += 30;
        } else if (event.key === "ArrowUp") {
          paddle.y -= 30;
        } else if (event.key === "ArrowDown") {
          paddle.y += 30;
        }
      }
    );
  }
});

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
    } else if (event.key === "ArrowDown") {
      paddle.y += 30;
    }
  }
);
/* Run the game */
gi.run();
