"use strict";

require('./Extruder.js');

/**
 * @author       Niklas Berg <nkholski@niklasberg.se>
 * @copyright    2018 Niklas Berg
 * @license      {@link https://github.com/nkholski/phaser3-animated-tiles/blob/master/LICENSE|MIT License}
 */

//
// This plugin is based on Photonstorms Phaser 3 plugin template with added support for ES6.
// 

class TileExtruder {
    constructor(scene) {
       this.extruder = new Extruder();
    }
    boot() {
    
    }
    // Initilize support for animated tiles on given map
    extrude(map) {
       
    }
};

//  Static function called by the PluginFile Loader.
TileExtruder.register = function (PluginManager) {
    //  Register this plugin with the PluginManager, so it can be added to Scenes.
    PluginManager.register('TileExtruder', TileExtruder, 'tileExtruder');
}

module.exports = TileExtruder;