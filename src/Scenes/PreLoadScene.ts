import { createCharacterAnimation } from "../Animations/CharacterAnimations";
import { createSlimeAnimation } from "../Animations/EnemieAnimations";
import { createIconsAnimation } from "../Animations/IconsAnimations";
import { ObjectsAnimation } from "../Animations/ObjectsAnimation";

export class PreLoadScene extends Phaser.Scene {
    constructor() {
        super('preloadscene')
    }
    preload() {

        //EBENE1
        this.load.image('tileEbene', 'assets/images/Tilesets/TileSetEbene1ex.png');
        this.load.tilemapTiledJSON('Ebene1', 'assets/TileSets/Ebene-01.json');
        this.load.tilemapTiledJSON('Ebene2', 'assets/TileSets/Ebene-02.json');
        //this.load.tilemapTiledJSON('Ebene3', 'assets/TileSets/Ebene-03.json');
        //this.load.tilemapTiledJSON('Ebene4', 'assets/TileSets/Ebene-04.json');
        //this.load.tilemapTiledJSON('Ebene5', 'assets/TileSets/Ebene-05.json');

        //MAINMENU
        //Hintergrund
        this.load.image('Background_MAINMENU','assets/images/Buttons/MENU_Background.png')
        //Start und Anleitung
        this.load.image('BigButton_UP_START','assets/images/Buttons/BigButton_UP_START.png')
        this.load.image('BigButton_DOWN_START','assets/images/Buttons/BigButton_DOWN_START.png')
        this.load.image('BigButton_UP_ANLEITUNG','assets/images/Buttons/BigButton_UP_ANLEITUNG.png')
        this.load.image('BigButton_DOWN_ANLEITUNG','assets/images/Buttons/BigButton_DOWN_ANLEITUNG.png')
        //Zurück und Weiter
        this.load.image('Weiter_DOWN','assets/images/Buttons/Weiter_DOWN.png')
        this.load.image('Weiter_UP','assets/images/Buttons/Weiter_UP.png')
        this.load.image('Zurück_DOWN','assets/images/Buttons/Zurück_DOWN.png')
        this.load.image('Zurück_UP','assets/images/Buttons/Zurück_UP.png')
        //STEUERUNG
        //Pfeiltasten
        this.load.image('ArrowKey_Down_DOWN','assets/images/Buttons/Steuerung/ArrowKey_Down_DOWN.png')
        this.load.image('ArrowKey_Down_UP','assets/images/Buttons/Steuerung/ArrowKey_Down_UP.png')
        this.load.image('ArrowKey_Up_DOWN','assets/images/Buttons/Steuerung/ArrowKey_Up_DOWN.png')
        this.load.image('ArrowKey_Up_UP','assets/images/Buttons/Steuerung/ArrowKey_Up_UP.png')
        this.load.image('ArrowKey_Left_DOWN','assets/images/Buttons/Steuerung/ArrowKey_Left_DOWN.png')
        this.load.image('ArrowKey_Left_UP','assets/images/Buttons/Steuerung/ArrowKey_Left_UP.png')
        this.load.image('ArrowKey_Right_DOWN','assets/images/Buttons/Steuerung/ArrowKey_Right_DOWN.png')
        this.load.image('ArrowKey_Right_UP','assets/images/Buttons/Steuerung/ArrowKey_Right_UP.png')
        //SpaceBar
        this.load.image('Spacebar_DOWN','assets/images/Buttons/Steuerung/Spacebar_DOWN.png')
        this.load.image('Spacebar_UP','assets/images/Buttons/Steuerung/Spacebar_UP.png')
        //Text
        this.load.image('Laufen_TEXT','assets/images/Buttons/Text/Laufen.png')
        this.load.image('IntundAng_TEXT','assets/images/Buttons/Text/Interagieren und Angreifen.png')
        this.load.image('Seite_2_TEXT','assets/images/Buttons/Text/Seite_2_TEXT.png')
        this.load.image('Ziel_TEXT','assets/images/Buttons/Text/Ziel_TEXT.png')
        this.load.image('Steuerung_TEXT','assets/images/Buttons/Text/Steuerung_TEXT.png')
        this.load.image('TitleDeepDeepDungeon','assets/images/Buttons/Text/TitleDeepDeepDungeon.png')
        //WinningScreen
        this.load.image('Winning_TEXT','assets/images/Buttons/Text/Winning_TEXT.png')
        this.load.image('WINNING_Background','assets/images/Buttons/WINNING_Background.png')
        //DeathScreen
        this.load.image('MagieEntflossen_TEXT','assets/images/Buttons/Text/MagieEntflossen_TEXT.png')
        this.load.image('Hauptmenu_DOWN','assets/images/Buttons/Hauptmenü_DOWN.png')
        this.load.image('Hauptmenu_UP','assets/images/Buttons/Hauptmenü_UP.png')
        this.load.image('Wiederbeleben_DOWN','assets/images/Buttons/Wiederbeleben_DOWN.png')
        this.load.image('Wiederbeleben_UP','assets/images/Buttons/Wiederbeleben_UP.png')
        this.load.image('DEATH_Background','assets/images/Buttons/DEATH_Background.png')
        //GBC
        this.load.image('GBC_Blue','assets/images/Buttons/GameBoy/GBC_Grey.png');
        this.load.image('GBC_Cross_Right_UP','assets/images/Buttons/GameBoy/GBC_Cross_Right_UP.png');
        this.load.image('GBC_Cross_Right_DOWN','assets/images/Buttons/GameBoy/GBC_Cross_Right_DOWN.png');
        this.load.image('GBC_Cross_Left_UP','assets/images/Buttons/GameBoy/GBC_Cross_Left_UP.png');
        this.load.image('GBC_Cross_Left_DOWN','assets/images/Buttons/GameBoy/GBC_Cross_Left_DOWN.png');
        this.load.image('GBC_Cross_Up_UP','assets/images/Buttons/GameBoy/GBC_Cross_Up_UP.png');
        this.load.image('GBC_Cross_Up_DOWN','assets/images/Buttons/GameBoy/GBC_Cross_Up_DOWN.png');
        this.load.image('GBC_Cross_Down_UP','assets/images/Buttons/GameBoy/GBC_Cross_Down_UP.png');
        this.load.image('GBC_Cross_Down_DOWN','assets/images/Buttons/GameBoy/GBC_Cross_Down_DOWN.png');
        this.load.image('GBC_Attack_UP','assets/images/Buttons/GameBoy/GBC_Attack_UP.png');
        this.load.image('GBC_Attack_DOWN','assets/images/Buttons/GameBoy/GBC_Attack_DOWN.png');
        //SOUND
        this.load.audio('Character_hit','assets/sounds/Character/PlayerHitHurt.wav');
        this.load.audio('Character_spell','assets/sounds/Character/SpellShoot.wav');
        this.load.audio('Slime_hit','assets/sounds/Enemies/SlimeHitHurt.wav');
        this.load.audio('Button_pressed','assets/sounds/Objects/Button/click.wav');
        this.load.audio('Chest_open','assets/sounds/Objects/Chest/pickupCoin.wav');
        this.load.audio('pillar_activate','assets/sounds/Objects/Pillar/pillar.wav');
        this.load.audio('sphere','assets/sounds/Objects/Pillar/sphere.wav');
        this.load.audio('stairs','assets/sounds/Objects/Stairs/stairs.wav');
        this.load.audio('background','assets/sounds/Dungeon-Crawler.ogg');


        //CHARACTER
        //idles
        this.load.spritesheet('player_idle_down', 'assets/sprites/player/idle/1_Character_idle_down-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('player_idle_up', 'assets/sprites/player/idle/1_Character_idle_up-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('player_idle_right', 'assets/sprites/player/idle/1_Character_idle_right-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        //walk
        this.load.spritesheet('player_walk_down', 'assets/sprites/player/walk/4_Character_walk_down-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('player_walk_up', 'assets/sprites/player/walk/1_Character_walk_up-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('player_walk_right', 'assets/sprites/player/walk/1_Character_walk_right-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        //attack
        this.load.spritesheet('player_attack_right','assets/sprites/player/attack/Character_attack_right-Sheet.png',{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('player_attack_down','assets/sprites/player/attack/Character_attack_down-Sheet.png',{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('player_attack_up','assets/sprites/player/attack/Character_attack_up-Sheet.png',{
            frameWidth: 16,
            frameHeight: 16
        });
        //death
        this.load.spritesheet('player_faint', 'assets/sprites/player/death/V1Character_death-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        //ENEMY1 SLIME1
        //idle
        this.load.spritesheet('enemy1_idle', 'assets/sprites/enemy1/Slime_idle-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        //walk
        this.load.spritesheet('enemy1_walk', 'assets/sprites/enemy1/Slime_walk-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        //death
        this.load.spritesheet('enemy1_death','assets/sprites/enemy1/Slime_death-Sheet.png',{
            frameWidth: 16,
            frameHeight: 16
        })
        //ENEMY2 SLIME2
        //idle
        this.load.spritesheet('enemy2_idle', 'assets/sprites/enemy2/Slime2_idle-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        //walk
        this.load.spritesheet('enemy2_walk', 'assets/sprites/enemy2/Slime2_walk-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        //death
        this.load.spritesheet('enemy2_death','assets/sprites/enemy2/Slime2_death-Sheet.png',{
            frameWidth: 16,
            frameHeight: 16
        })
        //ENEMY3 SLIME3
        //idle
        this.load.spritesheet('enemy3_idle', 'assets/sprites/enemy3/Slime3_idle-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        //walk
        this.load.spritesheet('enemy3_walk', 'assets/sprites/enemy3/Slime3_walk-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        //death
        this.load.spritesheet('enemy3_death','assets/sprites/enemy3/Slime3_death-Sheet.png',{
            frameWidth: 16,
            frameHeight: 16
        })
        //HERZEN
        this.load.image('herzLeer', 'assets/sprites/Icons/HerzLeer.png');
        this.load.image('herzVoll', 'assets/sprites/Icons/HerzVoll.png');
        this.load.spritesheet('hearth_faint','assets/sprites/Icons/HerzVerschwindet-Sheet.png',{
            frameWidth: 16,
            frameHeight: 16
        });
        //STAIRS
        this.load.image('Stairs','assets/sprites/Objects/stairs/Stairs.png');
        //SPHERES
        this.load.image('small_Sphere','assets/sprites/Icons/Small_LightPillar_Sphere.png');
        //GEMS
        this.load.image('normal_Gem','assets/sprites/Icons/normal_Gem.png')
        //SPELLS
        this.load.image('spell1','assets/sprites/Spells/Spell2.png');
        //CHESTS
        this.load.spritesheet('normal_Chest','assets/sprites/Objects/chests/normal_Chest-Sheet.png',{
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('hearth_Chest','assets/sprites/Objects/chests/hearth_Chest-Sheet.png',{
            frameWidth: 16,
            frameHeight: 16
        });
        //LIGHTPILLARS
        this.load.spritesheet('small_lightPillar','assets/sprites/Objects/lightPillar/Small_LightPillar-Sheet.png',{
            frameWidth: 16,
            frameHeight: 24
        });
        this.load.spritesheet('small_lightPillar_Stays','assets/sprites/Objects/lightPillar/Small_LightPillar_Stays-Sheet.png',{
            frameWidth: 16,
            frameHeight: 24
        });
    }
    create() {
        ObjectsAnimation(this.anims);
        createIconsAnimation(this.anims);
        createSlimeAnimation(this.anims);
        createCharacterAnimation(this.anims);
        this.scene.start('MainMenu');
    }
}
