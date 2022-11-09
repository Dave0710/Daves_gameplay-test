import {
    audio,
    loader,
    state,
    device,
    video,
    utils,
    plugin,
    pool, input
} from 'melonjs/dist/melonjs.module.js';

import 'index.css';

import TitleScreen from 'js/stage/title.js';
import PlayScreen from 'js/stage/play.js';
import PlayerEntity from 'js/renderables/player.js';

import DataManifest from 'manifest.js';


device.onReady(() => {

    // initialize the display canvas once the device/browser is ready
    if (!video.init(640, 480, {parent : "screen", scale : "auto"})) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // initialize the debug plugin in development mode.
    if (process.env.NODE_ENV === 'development') {
        import('js/plugin/debug/debugPanel.js').then((debugPlugin) => {
            // automatically register the debug panel
            utils.function.defer(plugin.register, this, debugPlugin.DebugPanelPlugin, "debugPanel");
        });

    }

    // Initialize the audio.
    audio.init("mp3,ogg");

    // allow cross-origin for image/texture loading
    loader.crossOrigin = "anonymous";

    // set and load all resources.
    loader.preload(DataManifest, function() {
        // set the user defined game stages
        state.set(state.MENU, new TitleScreen());
        state.set(state.PLAY, new PlayScreen());

        // add our player entity in the entity pool
        pool.register("mainPlayer", PlayerEntity);

         // enable the keyboard
         input.bindKey(input.KEY.LEFT,  "left");
         input.bindKey(input.KEY.RIGHT, "right");
         // map X, Up Arrow and Space for jump
         input.bindKey(input.KEY.X,      "jump", true);
         input.bindKey(input.KEY.UP,     "jump", true);
         input.bindKey(input.KEY.SPACE,  "jump", true);

        // Start the game
        state.change(state.PLAY);
    });
});
// /Users/daveslaptop/Tiled Project/Level Test.tmx