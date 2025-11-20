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
/* Drawing Functions */

/* Example drawing function: you can add multiple drawing functions
that will be called in sequence each frame. It's a good idea to do 
one function per each object you are putting on screen, and you
may then want to break your drawing function down into sub-functions
to make it easier to read/follow */

gi.addDrawing(
  function ({ ctx, width, height, elapsed, stepTime }) {
    // This code was helped written by Github Copilot
    ctx.fillStyle = paddle.color;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    // Your drawing code here...    
  }
)

/* Input Handlers */

/* Example: Mouse click handler (you can change to handle 
any type of event -- keydown, mousemove, etc) */


gi.addHandler(
  "keydown",
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


