//Conway Game of Life Simulation in 2D to ND 
//GSD 6483 - Amelia Gan - Assignment [1]

//Referenced the coding train - game of life for part using p5js 
//Referenced sample file workout 3 '30-lindenmayer-systems-p5-UI' for UI


//pop-up message for UI suggestions
alert("2D Game of Life: hit spacebar for a souvenir & click on your mouse to pause life");

//variables for game of life
let grid;
let cols;
let rows;
var GridSize = 10;
var originalGridSize;
var GridSizeMin = 10;
var GridSizeMax = 50;

//mouse click pause to pause life 
var pauseGame = 0;
var printTable=0;

//reset life 
var Restart=false;

//used to print / assign nodes and links for p5js sketch to Json to d3.js pipeline
var printTableLink=0;

//to assign unique color for each generation 
var r=0;
var g=0;
var b=0;

var counter=0;

//to switch between random color and unique generation color assignment
var ColorSwitch=false;

// GUI variables
var gui_lock= 0;
var visible = true;
var gui_controls;
var BackgroundColor = '#b19cd8';

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SETUP

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(200, 200)
  cols = parseInt(width / GridSize);
  rows = parseInt(height / GridSize);

  // print ('column '+ cols);
  // print ('rows ' + rows);

  originalGridSize = GridSize;

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      //to insert 0 or 1 into array; random creates float, floor takes nearest int
      grid[i][j] = floor(random(2));
    }
  }
    //create GUI on or off (0 or 1)
    if (gui_lock == 0){
      // Create Layout GUI
    gui_controls = createGui('Game of Life').setPosition(windowWidth-220,windowHeight-220);

    //p5.gui.js automatically identifies the type of UI element based on variable value. so we simply add them to our GUI.
    gui_controls.addGlobals('BackgroundColor', 'GridSize','ColorSwitch','Restart'); // Adding UI elements

    gui_lock++;
    }  
    

    //print array heads as nodes for JSON data conversion - group 1 vertical, group 2 horizontal
    // for (let i =0; i< cols; i++){
    //   let printNodes = {
    //     id: str(i)+"V",
    //     group: 1
    //   }
    //   let userStr = JSON.stringify(printNodes)+",";
    //   console.log(userStr);
    // }

    // for (let j =0; j< rows; j++){
    //   let printNodes = {
    //     id: str(j) +"H",
    //     group: 2
    //   }
    //   let userStr = JSON.stringify(printNodes)+",";
    //   console.log(userStr);
    // }
  
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DRAW

function draw() {
  background(BackgroundColor);
  stroke(BackgroundColor);

  // if current number is not the same as number started, restart 
  // for gridSize function to restart when slider is moved 
  if (originalGridSize != GridSize){
    setup();
  }

  //reset
  if (Restart==true){
    setup();
  }

  

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * GridSize;
      let y = j * GridSize;

      //random colour
      rr = random(0,255); // r is a random number between 0 - 255
      rg = random(0,255); // g is a random number betwen 100 - 200
      rb = random(0,255); // b is a random number between 0 - 100
      // // a = random(0,255); // a is a random number between 200 - 255

      //turning on 'random color' mode with ColorSwitch boolean above 
      if(ColorSwitch==false && grid[i][j] == 1){
        fill(rr,rg,rb);
        circle(x, y, GridSize);
      }
      //unique color
      else if(grid[i][j] == 1){
        fill(r%256, g%256, b%256);
          circle(x, y, GridSize);
      }
    }
  }
  r++;
  g++;
  b++;

  let next = make2DArray(cols, rows);

  //referenced the coding train - game of life

  // save next iteration state based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];

      // compute neighbours
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);

      // 0 is dead; 1 is alive
      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  
  grid = next;

  //print matrix to console
  if (printTable<3){
    console.table(grid);
    printTable++;
  }

  ///////////////////////////////////////////////////////////////////////////
  //print link group - generation 1 to n
  // {"source": "Napoleon", "target": "Myriel", "value": 8},
  
  if (printTableLink<3){
    for (let i =0; i <cols; i++){
      for (let j=0; j<rows; j++){
        if (grid[i][j]==1){
          let printLinks={
            source: str(i)+"V", 
            target: str(j) + "H",
            value: (printTableLink*2) + 1
        }
        let userStr = JSON.stringify(printLinks)+ ",";
        console.log(userStr);
    
        }
      }
    }
    printTableLink++;
  }

 /////////////////////////////////////////////////////////////////////////////
 //print links connecting matrices 

  // if (printTableLink<10){
  //   for (let i =0; i <cols; i++){
  //     for (let j=0; j<rows; j++){
  //       if (grid[i][j]==1){
  //         let printLinks={
  //           source: str(i) +"i"+ str(j)+"j" + str(printTableLink)+"g",
  //           target: str(i) +"i"+ str(j)+"j" + str(printTableLink+1)+"g",
  //           value: printTableLink
  //       }
  //       let userStr = JSON.stringify(printLinks)+ ",";
  //       console.log(userStr);
    
  //       }
  //     }
  //   }
  //   printTableLink++;
  // }

  ////////////////////////////////////////////////////////////////////////
  //print generation as nodes
  //{"id":"0V","group":1},
 
  
  // if (printTableLink<10){
  //   for (let i =0; i <cols; i++){
  //     for (let j=0; j<rows; j++){
  //         let printLinks={
  //           id: str(i) +"i"+ str(j)+"j" + str(printTableLink)+"g", 
  //           group: printTableLink
  //       }
  //       let userStr = JSON.stringify(printLinks)+ ",";
  //       console.log(userStr);
  //     }
  //   }
  //   printTableLink++;
  // }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTION

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  //sum will return total neighbors from 0 to 8 in a 3x3 grid [x][y] cell
  sum -= grid[x][y];
  return sum;
}

 

//pause life when mouse is pressed 
//save whether paused or not in pauseGame

function mousePressed(){
  if (pauseGame==0){
    pauseGame++;
  }
  else{
    pauseGame--;
  }
}

function mouseReleased(){
  if (pauseGame==0){
    loop();
  } 
  else{
    noLoop();
  }
}

function keyPressed(){
  if (key == ' '){ //this means space bar, since it is a space inside of the single quotes 
    save('myGOL.png');
    return false;
  }  
}