# Client

This is the client for this multiplayer game. It's built using Defold, a game engine written in Lua.
The engine is pretty simple and solves a lot of common issues like collision, sprite animation and more.
I managed to complicate the implementation details by using [observables](https://github.com/bjornbytes/RxLua) for EVERYTHING :), just for fun and because I can.

## Installation

You'll need Defold IDE to compile the game. You can edit the source files with your favorite text editor though.
The IDE is very lightweight and installs quickly. Get it [here](https://dashboard.defold.com).
Then open the `client` folder from this repo.
Hitting `Ctrl + B` will compile the game and run it. To run a second client for the second player you can use the correct executable under `client/bin` folder.
At the moment the game is multiplayer only and it will throw an error if server is not reachable. Run the server on the background. instructions on the server README.
