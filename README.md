# Game-Of-Life-2D-4D
This exploration examines the Game of Life in both two-dimensional and four-dimensional space. 

This code is for the Game of Life, a cellular automaton game created by John Conway in 1970. The game involves the evolution of a group of cells based on a set of rules that determine whether a cell will live, die, or be born in the next generation. 

## 1.1 2D Game of Life
In this version, the Game of Life is implemented in JavaScript using the p5.js library.

A graphical user interface (GUI) using the p5.gui library is created to allow users to adjust certain parameters of the game, such as the background color and the size of the grid.

The code also includes the ability to pause the game and reset it to the starting state. 

There is a portion of code in comments that can be used to print the nodes and links for the game to a JSON file, which can be used to visualize the game using a tool such as d3.js. This is shown in 1.2 & 1.3. 

[2D Game of Life](https://ameliagan.xyz/1.1_2D_GameofLife.html)

## 1.2 N-Dimension Game of Life

This iteration uses the D3.js library to create a force-directed graph that shows the evolution of the game in two dimensions. It starts by creating an SVG element and defining some basic styles for the graph. It then defines a force simulation using D3's forceSimulation() function and adds three forces to the simulation: a "link" force that maintains the connections between nodes, a "charge" force that repels nodes from each other, and a "center" force that keeps the nodes centered in the SVG element.

A JSON file containing the data for the graph, including the nodes and links that represent the cells and their states in the game is loaded. Circles are created to represent the nodes and lines to represent the links, and colors are assigned to the nodes based on their group using the D3 scaleOrdinal() function. It also adds drag-and-drop functionality to the nodes using the D3 drag() function.

Finally, the code starts the force simulation and runs it repeatedly using the D3 tick() function. This updates the positions of the nodes and links in the graph based on the forces applied to them. The code also includes some functions for handling the drag-and-drop events, such as dragstarted(), dragged(), and dragended().

[N-D Game of Life A](https://ameliagan.xyz/1.2_ND_GameofLIfe.html)

## 1.3 N-Dimension Game of Life

The second iteration of an Nth-dimensioned Game of Life uses the D3.js library to create a force-directed graph that shows the evolution of the game in two dimensions over 20 generations. It starts by creating an SVG element and defining some basic styles for the graph. It then defines a force simulation using D3's forceSimulation() function and adds three forces to the simulation: a "link" force that maintains the connections between nodes, a "charge" force that repels nodes from each other, and a "center" force that keeps the nodes centered in the SVG element.

The code then loads a JSON file containing the data for the graph, including the nodes and links that represent the cells and their states in the game over 20 generations. It creates circles to represent the nodes and lines to represent the links, and assigns colors to the nodes based on their group using the D3 scaleOrdinal() function. It also adds drag-and-drop functionality to the nodes using the D3 drag() function.

[N-D Game of Life B](https://ameliagan.xyz/1.3_ND_GameofLIfe.html)
