# TileExtruder
**Problem:** When using WebGL for rendering tilemaps tiles might pick up tiny slices of neighboring tiles due to how WebGL uses textures.
**Solution:** TileeExtruder separates tiles in an image and extend the border pixels so that the tiny slices blend in.

![The problem](https://user-images.githubusercontent.com/5206576/36196296-9172d088-1170-11e8-84b1-89f47d991fbf.png "The problem: Ugly stuff")

# WARNING
The repository is far from complete. You might manage to use it from node but probably not without going into the code, and the Phaser 3 plug-in will just generate errors ATM.

# Installation

Just run "npm i" as usual BUT:

Unless previously installed you'll need Cairo. For system-specific installation view the Wiki.

https://github.com/Automattic/node-canvas/wiki/_pages