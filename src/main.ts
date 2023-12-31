import 'phaser';
import { PreLoadScene } from './Scenes/PreLoadScene';
import { HearthManager } from './Managers/HearthManager';
import { GemManager } from './Managers/GemManager';
import { SmallSphereManager } from './Managers/SmallSphereManager';
import { PriceManager } from './Managers/PriceManager';
import { Ebene } from './Scenes/Ebene';
import MainMenu from './Scenes/MainMenu';
import DeathScene from './Scenes/DeathScene';
import WinningScene from './Scenes/WinningScene';
import TouchScene from './Scenes/TouchScene';
import { StairsManager } from './Managers/StairsManager';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    title: 'DeepDeepDungeon',
    width: 220,
    height: window.innerHeight > window.innerWidth ? 440 : 220,
    backgroundColor: "#212121",
    
    //powerPreference: "high-performance",
    scene:[
        PreLoadScene, MainMenu, Ebene, HearthManager, GemManager, SmallSphereManager, PriceManager,StairsManager, DeathScene, WinningScene, TouchScene
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
                debug: false,
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
