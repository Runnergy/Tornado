import * as ll from '../leader-line/leader-line.min.js';
let start;
let child;
let count = 0;
let flag = 16;
for (let base = 1; base < 6; base++) {
    let half = 1;
    for (let index = 0; index < flag; index++) {
        parent = "parent" + (index+1) + "" + base;
        if ((index+1) % 2 != 0) { 
            while ( half <= Math.ceil((index+1) / 2)){
                child = "parent" + half + "" + (base + 1);
                half++;
            }
        }
        let startT = parent;
        let endT = child;

        let start = String(startT);
        let end = String(endT);

        new ll.LeaderLine(
            ll.LeaderLine.pointAnchor(document.getElementById(String(startT)), {x: '100%', y: 25}),
            ll.LeaderLine.pointAnchor(document.getElementById(String(endT)), {x: 0, y: 25}),
            {
                endPlug: 'behind',
                path: 'straight',
                color: 'white',
                size: 2
            }
        );
    }
    count++;
    if (count == 1) { flag = flag / 2; }
    if (count == 2) { flag = flag / 2; }
    if (count == 3) {if (!document.getElementById("parent15")) { break;} }
    if (count == 4) { break;}
}