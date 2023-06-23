import 'phaser';
import { PreLoadScene } from './Scenes/PreLoadScene';
import { Ebene1Scene } from './Scenes/Ebene1Scene';
import { HearthManager } from './Scenes/HearthManager';
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 320,
    height: 320,
    backgroundColor: "#212121",
    scene:[
        PreLoadScene, Ebene1Scene, HearthManager
    ],
    scale: {
        // Größe des Screenformates
        zoom: 2,
        parent: 'mygame',
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render:{
            pixelArt: true,
            roundPixels: false,

    },
    physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0},
                debug: false,
                fixedStep: false
                
            }
            
    },fps: {
        target: 60,
        forceSetTimeOut: true
    }
};

const game = new Phaser.Game(config);