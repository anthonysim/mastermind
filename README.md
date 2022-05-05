# Mastermind Game

## Demo

<span>Click</span>
<a target="_blank" href="https://drive.google.com/file/d/1NLoRm0B9ueeeHNVasq6o5gWarWf4S_Uj/view?usp=sharing">here
</a>
<span>to see demo.</span>
<br/>

## Table of Contents

1. [Rules](#Rules)
2. [Installation](#Installation)
3. [Overview](#Overview)
4. [Thoughts](#Thoughts)
5. [Tech](#Tech)

## Rules

At the start of the game the computer will randomly select a pattern of four different
numbers from a total of 8 different numbers.

- A player will have 10 attempts to guess the number combinations

At the end of each guess, computer will provide one of the following response
as feedback:

- The player had guess a correct number
- The player had guessed a correct number and its correct location
- The player’s guess was incorrect

## Installation

1) If node is not installed, please download and install node https://nodejs.org/en/download/

2) In your terminal, please clone this repo to your local machine by typing the **git clone** command
following by the https url that can be found pressing the green button that states "Code."

- ```git clone https://github.com/anthonysim/mastermind.git```

![Screen Shot 2022-05-04 at 5 16 54 PM](https://user-images.githubusercontent.com/31682285/166847133-6e476c89-c8a7-4476-9267-d266815b66d2.png)

3) In your terminal, install all packages by running ```npm install```.
4) In your terminal, start the program by running ```npm start```.
5) The game should appear on http://localhost:3000/ in your browser!
6) 😀

## Overview

Hello and thank you for taking the time to read what I wrote. This will be a high level overview of the code structure and general implementation. If you haven't already, please check out the demo video above in this read me! 😀

The mastermind game was created using Javascript / React - all the files are inside the ```src``` folder.

- ```src/components``` folder contains all the javascript files,
- ```src/stylings``` folder contains all the css / sass files, and the
- ```utils``` folder contains all the helper functions that were created.

<br/>

The bulk of the application is inside the ```App.js``` file located inside the ```src/components``` folder. ```Lines 15 to 137``` are the state and the various onClick handlers that listen for a user's click. ```Lines 139``` till the end are what is rendered on the browser when the application is started.


When the user begins the game, they are greeted with a welcome which can be seen on ```lines 147 to 158```. When the user selects a difficulty level the ```difficultyHandler``` function on ```line 84``` is invoked. This handler determines the max number that should be retrieved (4, 7, 10) depending on the difficulty level. The ```fetchData``` function located insided the ```utils``` folder is invoked. This function uses axios to fetch data from the ```random.org``` api and returns the random number combinations. The ```difficultyHandler``` function ends with the state updated accordingly and the timer initiated.

Since the state was updated, the welcome page is not rendered  and in its place a timer, title, shapes, an input bar, and guess history is shown.

The ```Timer``` function on ```lines 104 to 136``` that was invoked at the of end of the ```difficultyHandler``` basically calls a setTimeout everything second until the time reaches zero time.

The shapes titled ```Shapes.js``` in the same ```src/components``` folder, generates the number combination that the user needs to guess represented in shapes (triangle, square, circle).

The input bar inside ```lines 168 to 183``` is where the user types in their guesses. When a user types in a guess, the ```submitHandler``` on ```line 43``` is invoked. Based on the user's guess the following messages appear:

- 'Not a number, please type in numbers!'
- 'Guess is either too short or too long!'
- 'Guess matches data!'
- 'The player had guessed a correct number and its correct location!'
- 'The player had guess a correct number!'
- 'The player\'s guess was incorrect!'
- 'Something went wrong!'

A quick run through, let's say a user typed in a guess '1234', the ```submitHandler``` will invoke call the ```guessCheck``` function in the ```utils``` folder which returns a number, this number is used when the ```messages``` function, also in the ```utils``` folder to return one of the messages listed above. Depending on the user's guess, state is updated accordingly.

- If the user wins, they are greeted with a Congratulations modal from ```Modal.js``` located in the ```src/components``` folder with the option to play another game.
- If the user runs out of time, this modal would state that they lost and ran out of time.
- If the uses all their guesses up, they will receive an alert stating that they don't have any other attempts left and the game ends.

## Thoughts



## Tech

- React (Create-React-App) / Javascript
- CSS / SASS
