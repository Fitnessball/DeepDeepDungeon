export class PreLoadScene extends Phaser.Scene {
    constructor() {
        super('preloadscene')
    }
    preload() {

        //EBENE1
        this.load.image('tileEbene1', '../assets/images/Tilesets/TileSetEbene1ex.png');
        this.load.tilemapTiledJSON('Ebene1', '../assets/TileSets/Ebene-03.json');
        //CHARACTER
        //idles
        this.load.spritesheet('player_idle_down', '../assets/sprites/player/idle/1_Character_idle_down-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('player_idle_up', '../assets/sprites/player/idle/1_Character_idle_up-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('player_idle_right', '../assets/sprites/player/idle/1_Character_idle_right-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        //walk
        this.load.spritesheet('player_walk_down', '../assets/sprites/player/walk/4_Character_walk_down-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('player_walk_up', '../assets/sprites/player/walk/1_Character_walk_up-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('player_walk_right', '../assets/sprites/player/walk/1_Character_walk_right-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        //ENEMY1 SLIME
        //idle
        this.load.spritesheet('enemy1_idle', '../assets/sprites/enemy1/Slime_idle-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        //walk
        this.load.spritesheet('enemy1_walk', '../assets/sprites/enemy1/Slime_walk-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        //HERZEN
        this.load.image('herzLeer', '../assets/sprites/icons/HerzLeer.png');
        this.load.image('herzVoll', '../assets/sprites/icons/HerzVoll.png');


    }
    create() {
        this.scene.start('ebene1scene');
    }
}
