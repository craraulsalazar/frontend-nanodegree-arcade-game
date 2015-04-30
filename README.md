frontend-nanodegree-arcade-game
===============================

Students should use this rubric: https://www.udacity.com/course/viewer#!/c-ud015/l-3072058665/m-3072588797

--- Objective of the game ---

To challege player to walk across road while multiple enemies are flying by.
Player must try to avoid any collisions otherwise the game starts over.

--- How To play the game ---

The user can only use up/down/left/right keys to move all around the canvas
With the help of these keys you must avoid any collitions with the enemies.


-- How the application works ---

1. The application will run as soon as the page loads.
   first, it wil load the assets that update the background using Resources.onReady function,
   the callback function will trigger the init function which will create the enemies and player objects,
   setting their initial X and Y positions in the canvas.

2. The main function will call the 'requestAnimationFrame' every 16.6ms and the enemies will start
   flying along. several collition checks will be trigger whenever the user presses the arrow keys.

