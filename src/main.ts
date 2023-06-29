import 'phaser';
import { PreLoadScene } from './Scenes/PreLoadScene';
import { Ebene1Scene } from './Scenes/Ebene1Scene';
import { HearthManager } from './Managers/HearthManager';
import { GemManager } from './Managers/GemManager';
import { SmallSphereManager } from './Managers/SmallSphereManager';
import { PriceManager } from './Managers/PriceManager';
import { Ebene2Scene } from './Scenes/Ebene2Scene';
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    title: 'DeepDeepDungeon',
    width: 320,
    height: 320,
    backgroundColor: "#212121",
    //powerPreference: "high-performance",
    scene:[
        PreLoadScene, Ebene1Scene,Ebene2Scene, HearthManager, GemManager, SmallSphereManager, PriceManager
    ],
    scale: {
        // Größe des Screenformates
        zoom:2,
        parent: 'mygame',
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render:{
            pixelArt: true,
            roundPixels: false,
            antialias: true,
            maxLights:50
    },
    physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0},
                debug: true,
                fixedStep: true,
                useTree: true,
                maxEntries:5000
                
            }
            
    },fps: {
        forceSetTimeOut: true,
        //min:60
    }
};

const game = new Phaser.Game(config);