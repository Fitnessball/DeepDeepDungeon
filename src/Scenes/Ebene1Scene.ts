import 'phaser';
import { createSlimeAnimation } from '../Animations/EnemieAnimations';
import { createCharacterAnimation } from '../Animations/CharacterAnimations';
import { createIconsAnimation } from '../Animations/IconsAnimations';
import { Slime } from '../Enemies/Slime';
import '../MainCharacter/Player'
import Player from '../MainCharacter/Player';
import { sceneEvents } from '../Events/MainEvents';
import LightManager from '../Managers/LightManager';
export class Ebene1Scene extends Phaser.Scene {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    animpart: null;
    player: Player;
    slime: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    //COLLIDER
    playerSlimeCollider?: Phaser.Physics.Arcade.Collider;
    //PHYSICS GROUPS
    spell1!: Phaser.Physics.Arcade.Group;
    slimes!: Phaser.Physics.Arcade.Group;
    //LICHTER
    lightManager: LightManager;
    playerlight: Phaser.GameObjects.Light;
    spell1light: Phaser.GameObjects.Light;
    spell1Collide: boolean;
    constructor() {
        super('ebene1scene');
    }

    preload() {
        this.cursors = this.input.keyboard!.createCursorKeys();
    }

    create() {
        //ICONS
        createIconsAnimation(this.anims);
        //SCENE OVERLAY RUN
        this.scene.run('HearthManager');
        //EBENE 1 TILESET
        const Ebene1 = this.make.tilemap({ key: 'Ebene1' });
        const TilesetEbene1 = Ebene1.addTilesetImage('Ebene1', 'tileEbene1', 16, 16, 1, 2);
        const Ebene1Ground = Ebene1.createLayer('Ground', (TilesetEbene1 as Phaser.Tilemaps.Tileset), 0, 0) as Phaser.Tilemaps.TilemapLayer;
        const Ebene1SideWalls = Ebene1.createLayer('SideWalls', (TilesetEbene1 as Phaser.Tilemaps.Tileset), 0, 0) as Phaser.Tilemaps.TilemapLayer;
        // Ebene1SideWalls.setCollisionByProperty({ collides: true })
        const Ebene1Walls = Ebene1.createLayer('Walls', (TilesetEbene1 as Phaser.Tilemaps.Tileset), 0, 0) as Phaser.Tilemaps.TilemapLayer;
        Ebene1Walls.setCollisionByProperty({ collides: true });
        //SPELLS
        this.spell1 = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image,
            maxSize:1
        });
        //PLAYER
        createCharacterAnimation(this.anims);
        this.player = this.add.player(83, 83, 'player_idle_down');
        this.player.setSpell1(this.spell1)
        //Z ACHSE FUER BELEUCHTUNG
        this.lights.enable().setAmbientColor(0x000000);
        this.lightManager = new LightManager(this);
        this.playerlight = this.lightManager.addLight(this.player.x, this.player.y, 0xffffff,70,0.8);
        this.spell1light = this.lightManager.addLight(this.player.x, this.player.y, 0xFFA500,30,0.8);
        this.lightManager.toggleAllLights(true);
        this.lightManager.setLightVisible(this.spell1light,false);
        
        const darkOverlay = this.add.rectangle(0, 0, 2000, 2000, 0x000000, 0.8);//make walls darker

        Ebene1Ground.setPipeline('Light2D');
        Ebene1SideWalls.setPipeline('Light2D');
        Ebene1Walls.setDepth(0);
        darkOverlay.setDepth(1);
        Ebene1SideWalls.setDepth(2);
        Ebene1Ground.setDepth(3);
        this.player.setDepth(4);
        //ENEMY1 SLIME
        
        createSlimeAnimation(this.anims);
        this.slimes = this.physics.add.group({
            classType: Slime,
            createCallback: (gameObj) => {
                const gameObjSlime = gameObj as Slime
                if (gameObjSlime.body !== null) {
                    gameObjSlime.body.onCollide = true
                }
            }
        });
        const slimesLayer = Ebene1.getObjectLayer('Slimes')
        slimesLayer?.objects.forEach(slimeObj => {
            const slime = this.slimes.get(slimeObj.x! + slimeObj.width!*0.5,slimeObj.y!-slimeObj.height!*0.5,'slime')
            this.physics.world.enable(this.slimes);
            const slimeBody = slime.body as Phaser.Physics.Arcade.Body;
            slimeBody.setSize(14,8)
            const xOffset = 0;
            const yOffset = 8;
            slimeBody.setOffset(xOffset, yOffset);
        });
        //CAMERA
        this.cameras.main.startFollow(this.player, false, 1, 1);
        //DEBUG COLLIDERS
        // const debugGraphics = this.add.graphics().setAlpha(0.8)
        // Ebene1Walls.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // })
        this.toggleSceneVisibility('HearthManager', 1)
        //COLLIDERS
        this.physics.add.collider(this.player, Ebene1Walls);
        this.physics.add.collider(this.slimes, Ebene1Walls);
        this.physics.add.collider(this.slimes, this.slimes);
        this.playerSlimeCollider = this.physics.add.collider(this.slimes, this.player, this.slimePlayerCollisionHandler, undefined, this)
        this.physics.add.collider(this.spell1, Ebene1Walls, this.spell1WallsCollisionHandler, undefined, this);
        this.physics.add.collider(this.spell1, this.slimes, this.spell1SlimeCollisionHandler, undefined, this);
        
    }
    //COLLSIONHANDLER
    //SLIME -> PLAYER
    private slimePlayerCollisionHandler(obj1: any, obj2: any) {
        const slime = obj2 as Slime
        const dx = this.player.x - slime.x;
        const dy = this.player.y - slime.y;
        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);
        this.player.handleEnemyHit(dir);
        sceneEvents.emit('player-On-Health-Damage', this.player.playerhealth);
        this.toggleSceneVisibility('HearthManager', 4000)
        if (this.player.playerhealth <= 0) {
            this.playerSlimeCollider?.destroy();
        }
    }
    //SPELL1 -> SLIME
    private spell1SlimeCollisionHandler(spell1: any, slime: any) {
        this.spell1.killAndHide(spell1);
        this.spell1Collide = true
        spell1.destroy()
        slime.handleSlimeHit();
        //sceneEvents.emit('player-On-Health-Damage', this.player.playerhealth);

        if (slime.slimehealth <= 0) {
            setTimeout(() => {
            slime.destroy()
            this.slimes.killAndHide(slime);
              }, 950);
            
        }
    }
    //SPELL1 WALLS
    private spell1WallsCollisionHandler(spell1: any, obj2: any) {
        this.spell1.killAndHide(spell1);
        this.spell1Collide = true
        spell1.destroy()
    }
    //SCENE HEARTHS VISIBILITY
    private toggleSceneVisibility(sceneName: string, duration: number) {
        const scene = this.scene.get(sceneName);
        scene.sys.setVisible(true);
        this.time.delayedCall(duration, () => {
            scene.sys.setVisible(false);
        });
    }

    update() {
        //UPDATE LIGHT MANAGER
        this.lightManager.update();
        //LIGHT FOLLOW PLAYER
        this.lightManager.updateLightPosition(this.playerlight,this.player.x,this.player.y)
        if (this.player) {
            this.player.update(this.cursors)
        }
        //TURN OFF LIGHT ON PLAYER DEATH
        if (this.player.playerhealth <= 0) {
            this.lightManager.reduceLightRadius(this.playerlight,0,1000,0.3)
        }
        //TURN OFF LIGHT ON COLLIDE SPELL1
        if(this.spell1Collide === true){
            this.lightManager.setLightVisible(this.spell1light,true);
            this.lightManager.reduceLightRadius(this.spell1light,0,1000,0.3);
        }
        //LIGHT FOLLOW SPELL1
        this.spell1.getChildren().forEach((spell: any) => {
           this.lightManager.setLightRadius(this.spell1light,30)
           this.lightManager.setLightVisible(this.spell1light,true);
            const x = spell.x;
            const y = spell.y;
            this.lightManager.updateLightPosition(this.spell1light,x,y);
          });
    }
}