import 'phaser';
import { createSlimeAnimation } from '../Animations/EnemieAnimations';
import { createCharacterAnimation } from '../Animations/CharacterAnimations';
import { createIconsAnimation } from '../Animations/IconsAnimations';
import { ObjectsAnimation } from '../Animations/ObjectsAnimation';

import { Slime } from '../Enemies/Slime';
import '../MainCharacter/Player'
import Player from '../MainCharacter/Player';
import { sceneEvents } from '../Events/MainEvents';
import LightManager from '../Managers/LightManager';
import { normalChest } from '../Objects/normalChest';
import { smallLightPillar } from '../Objects/smallLightPillar';
import { smallSphere } from '../Objects/smallSphere';
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
    glowingLightPillar: Phaser.GameObjects.Light;
    spell1Collide: boolean;
    lightPillarPositionx:number;
    lightPillarPositiony:number;
    constructor() {
        super('ebene1scene');
    }

    preload() {
        this.cursors = this.input.keyboard!.createCursorKeys();
    }

    create() {
        //CHESTS AND LIGHTS
        ObjectsAnimation(this.anims);
        //ICONS
        createIconsAnimation(this.anims);
        //SCENE OVERLAY RUN
        this.scene.run('GemManager');
        this.scene.run('HearthManager');
        
        //EBENE 1 TILESET
        const Ebene1 = this.make.tilemap({ key: 'Ebene1' });
        const TilesetEbene1 = Ebene1.addTilesetImage('Ebene1', 'tileEbene1', 16, 16, 1, 2);
        const Ebene1Ground = Ebene1.createLayer('Ground', (TilesetEbene1 as Phaser.Tilemaps.Tileset), 0, 0) as Phaser.Tilemaps.TilemapLayer;
        const Ebene1SideWalls = Ebene1.createLayer('SideWalls', (TilesetEbene1 as Phaser.Tilemaps.Tileset), 0, 0) as Phaser.Tilemaps.TilemapLayer;
        // Ebene1SideWalls.setCollisionByProperty({ collides: true })
        const Ebene1Walls = Ebene1.createLayer('Walls', (TilesetEbene1 as Phaser.Tilemaps.Tileset), 0, 0) as Phaser.Tilemaps.TilemapLayer;
        Ebene1Walls.setCollisionByProperty({ collides: true });
        //SMALL SPHERE
          const smallSphereGroup = this.physics.add.staticGroup({
              classType: smallSphere
          });
         const smallSphereLayer = Ebene1.getObjectLayer('SmallSpheres');
         smallSphereLayer?.objects.forEach(smallSphereObj =>{
             const smallSphere = smallSphereGroup.get(smallSphereObj.x!+smallSphereObj.width!*0.5,smallSphereObj.y!-smallSphereObj.height!*0.5,'small_Sphere') as smallSphere
             smallSphereGroup.setDepth(6);
             const smallSphereBody = smallSphere.body as Phaser.Physics.Arcade.Body;
             smallSphereBody.setSize(9,9)
              const xOffset = 4;
              const yOffset = 3;
              smallSphereBody.setOffset(xOffset, yOffset);
         });

        //NORMAL CHEST
        const normalChestGroup = this.physics.add.staticGroup({
            classType: normalChest
        });
        const normalChestLayer = Ebene1.getObjectLayer('NormalChests');
        normalChestLayer?.objects.forEach(normalChestObj => {
        normalChestGroup.get(normalChestObj.x!+normalChestObj.width!*0.5,normalChestObj.y!-normalChestObj.height!*0.5,'normal_Chest');
        normalChestGroup.setDepth(5);
        });
        //normalChestObj.x!+normalChestObj.width!*0.5,normalChestObj.y!-normalChestObj.height!*0.5
        // SMALL LIGHTPILLARS
        const smallLightPillarGroup = this.physics.add.staticGroup({
            classType: smallLightPillar
        });
        const smallLightPillarLayer = Ebene1.getObjectLayer('LightPillars');
        smallLightPillarLayer?.objects.forEach(smallLightPillarObj =>{
            smallLightPillarGroup.get(smallLightPillarObj.x!+smallLightPillarObj.width!*0.5,smallLightPillarObj.y!-smallLightPillarObj.height!*0.5,'small_lightPillar')
            smallLightPillarGroup.setDepth(7);
        });

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








        //SPELLS
        this.spell1 = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image,
            maxSize:1
        });
        //PLAYER
        createCharacterAnimation(this.anims);
        this.player = this.add.player(83, 83, 'player_idle_down');
        this.player.setSpell1(this.spell1);
        //Z ACHSE FUER BELEUCHTUNG
        this.lights.enable().setAmbientColor(0x000000);
        this.lightManager = new LightManager(this);
        this.playerlight = this.lightManager.addLight(this.player.x, this.player.y, 0xFFFFFF,0,0.7);
        this.spell1light = this.lightManager.addLight(this.player.x, this.player.y, 0xFFA500,0,0.8);
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
        
        

        
        //CAMERA
        this.cameras.main.startFollow(this.player, false, 1, 1);
        this.cameras.main.setZoom(1)
        //DEBUG COLLIDERS
        // const debugGraphics = this.add.graphics().setAlpha(0.8)
        // Ebene1Walls.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // })
        // TESTLOADIMAGE
        //const normalPillar = this.add.image(100,100,'small_Sphere').setDepth(3);
        // normalPillar.setPipeline('Light2D');
        // this.time.delayedCall(1000,()=>{
        //     normalPillar.play('normal-lightPillar-Glow')
        // })
        this.toggleSceneVisibility('HearthManager', 0)
        this.toggleSceneVisibility('GemManager', 0)
        

        //COLLIDERS
        //Player
        this.physics.add.collider(this.player, Ebene1Walls);
        this.physics.add.collider(this.player,normalChestGroup, this.playerNormalChestCollisionHandler,undefined,this);
        this.physics.add.collider(this.player,smallLightPillarGroup, this.playerSmallLightPillarCollisionHandler,undefined,this);
       // this.physics.add.collider(this.player,smallSphereGroup);
        //Slimes
        this.physics.add.collider(this.slimes, normalChestGroup);
        this.physics.add.collider(this.slimes, smallLightPillarGroup);
        this.physics.add.collider(this.slimes, Ebene1Walls);
        this.physics.add.collider(this.slimes, this.slimes);
        this.playerSlimeCollider = this.physics.add.collider(this.slimes, this.player, this.slimePlayerCollisionHandler, undefined, this)
        //Spell1
        this.physics.add.collider(this.spell1, Ebene1Walls, this.spell1WallsCollisionHandler, undefined, this);
        this.physics.add.collider(this.spell1, this.slimes, this.spell1SlimeCollisionHandler, undefined, this);

        
        sceneEvents.on('glow-Small-Pillar', () => {
            //small pillar beleuchtung
            const pillarglow = this.lightManager.addLight(this.lightPillarPositionx, this.lightPillarPositiony, 0x9370DB, 0, 1.2);
            this.setPillarGlow(pillarglow);
          });
    }
    //COLLSIONHANDLER
    //PLAYER -> NORMALCHEST
    private playerNormalChestCollisionHandler(obj1:any,obj2:any){
        const chest = obj2 as normalChest;
        this.player.setNormalChest(chest);
        this.toggleSceneVisibility('GemManager', 2000);
        const scene = this.scene.get('HearthManager');
        scene.sys.setVisible(false);
    }
    //PLAYER -> SMALLLIGHTPILLAR
    private playerSmallLightPillarCollisionHandler(obj1:any,obj2:any){
        const lightPillar = obj2 as smallLightPillar;
        this.player.setSmallLightPillar(lightPillar);
        this.setlightPillarPosition(lightPillar.x,lightPillar.y)
    }
    //SLIME -> PLAYER
    private slimePlayerCollisionHandler(obj1: any, slimeobj: any) {
        const slime = slimeobj as Slime
        const dx = this.player.x - slime.x;
        const dy = this.player.y - slime.y;
        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);
        this.player.handleEnemyHit(dir);
        sceneEvents.emit('player-On-Health-Damage', this.player.playerhealth);
        this.toggleSceneVisibility('HearthManager', 4000);
        const scene = this.scene.get('GemManager');
        scene.sys.setVisible(false);

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
        this.spell1Collide = true;
        spell1.destroy();
    }
    //SCENE HEARTHS VISIBILITY
    private toggleSceneVisibility(sceneName: string, duration: number) {
        const scene = this.scene.get(sceneName);
        scene.sys.setVisible(true);
        this.time.delayedCall(duration, () => {
            scene.sys.setVisible(false);
        });
    }
    private setlightPillarPosition(x:number,y:number){
        this.lightPillarPositionx = x;
        this.lightPillarPositiony = y;
    }
    private setPillarGlow(pillar:Phaser.GameObjects.Light){
        this.glowingLightPillar = pillar;
    }
    update() {
        //UPDATE LIGHT MANAGER
        this.lightManager.update();
        if(this.glowingLightPillar !== undefined){
        this.lightManager.increaseLightRadius(this.glowingLightPillar, 75,0.4);
        }
        this.lightManager.increaseLightRadius(this.playerlight, 55,0.2);

        //LIGHT FOLLOW PLAYER
        this.lightManager.updateLightPosition(this.playerlight,this.player.x,this.player.y)
        if (this.player) {
            this.player.update(this.cursors);
        }
        //TURN OFF LIGHT ON PLAYER DEATH
        if (this.player.playerhealth <= 0) {
            this.lightManager.reduceAllLightRadius(0,1000,0.3);
            if(this.glowingLightPillar !== undefined){
            this.lightManager.reduceLightRadius(this.glowingLightPillar, 0,1000,0.3);
            }
        }
        //TURN OFF LIGHT ON COLLIDE SPELL1
        if(this.spell1Collide === true){
            this.lightManager.setLightVisible(this.spell1light,true);
            this.lightManager.reduceLightRadius(this.spell1light,0,1000,0.3);
        }
        //LIGHT FOLLOW SPELL1
        this.spell1.getChildren().forEach((spell: any) => {
           this.lightManager.setLightRadius(this.spell1light,30);
           this.lightManager.setLightVisible(this.spell1light,true);
            const x = spell.x;
            const y = spell.y;
            this.lightManager.updateLightPosition(this.spell1light,x,y);
          });
    }
}