import { Stage, game, ColorLayer, BitmapText, level  } from 'melonjs/dist/melonjs.module.js';

class PlayScreen extends Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {

        // load a level
		level.load("Level Test");

    }

    
};

export default PlayScreen;
