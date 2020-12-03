//importing the variables from leaderline as ll
import * as ll from './leader-line/leader-line.min.js';

// declaring variables
let child;
let count = 0;
let flag = 16;

// for loop for total possible rounds
for (let base = 1; base < 6; base++) {
    let half = 1;

    // for loop for calculation of the elementId of line starting
    for (let index = 0; index < flag; index++) {
        parent = "parent" + (index + 1) + "" + base;
        
        // for loop for calculation of the elementId of line ending
        if ((index + 1) % 2 != 0) {
            
            while ( half <= Math.ceil((index+1) / 2)){
                child = "parent" + half + "" + (base + 1);
                half++;
            }
        }

        // storing the calculated elementID of the brackets to connect
        let startT = parent;
        let endT = child;

        // using pre-defined function from LeaderLine.js to draw lines(connector)
        new ll.LeaderLine(
            // passing the params of the start location and the end location of the line with exact positions
            ll.LeaderLine.pointAnchor(document.getElementById(String(startT)), {x: '100%', y: 25}),
            ll.LeaderLine.pointAnchor(document.getElementById(String(endT)), { x: 0, y: 25 }),
            
            // defining the properties of the line
            {
                endPlug: 'behind',
                path: 'straight',
                color: 'white',
                size: 2
            }
        );
    }
    count++;

    // if statements to make following rounds half the length of previous
    if (count == 1) { flag = flag / 2; }
    if (count == 2) { flag = flag / 2; }

    // breaking the loop with if conditions based on total rounds
    if (count == 3) {if (!document.getElementById("parent15")) { break;} }
    if (count == 4) { break;}
}