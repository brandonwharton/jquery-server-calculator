# jQuery Server Calculator

## Description

Duration: Weekend Project

The goal of this project was to develop a simple calculator app utilizing data stored
and calculated on a separate server rather than in browser memory. The idea was to design
it to look and function like a real-world calculator, with individual number buttons adding
to a display. The result was to be displayed underneath the calculator after each use,
along with a running history of previous calculations to be stored on the server but displayed
under the last-calculated result. There is also a clear button next to the display that clears
the currently filled calculation without altering the history or last result display.

This calculator was designed to only allow complete inputs, requiring users to start with
an integer or decimal, only allowing one operand, and keeping the equals button from sending
data for calculation until a valid calculable expression was completed. It was asked that clicking
on an item in the equation history could be configured to run the same calculation again. Finally, 
a delete history button was implemented to have the server delete the entire equation history
and refresh the app page afterwards.

You can view this project [here](https://jquery-server-calculator0.herokuapp.com/)

## Prerequisites

- [Node.js](https://nodejs.org/en/)

## Installation

1. Navigate to the root directory of the project in your terminal.
2. Run `npm start` in your terminal.
3. Open your browser and navigate to [http://localhost:5000/](http://localhost:5000/)
4. When finished, run `ctrl-c` in your terminal to stop the local server.

## Built With

- Node.js
- JavaScript
- jQuery/Ajax
- Express
- Bootstrap

## Acknowledgement

Thanks to [Prime Digital Academy](https://www.primeacademy.io/) for teaching me the necessary tools and
knowledge to get this project off the ground, along with the members of my cohort that helped ideate 
and troubleshoot along the way. 

## Support

If you have any suggestions or find any bugs, pleace reach out to me at [whartonbm@gmail.com](whartonbm@gmail.com)
