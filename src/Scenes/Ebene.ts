import 'phaser';
import { Slime1 } from '../Enemies/Slime1';
import '../MainCharacter/Player'
import Player from '../MainCharacter/Player';
import { sceneEvents } from '../Events/MainEvents';
import LightManager from '../Managers/LightManager';
import { normalChest } from '../Objects/normalChest';
import { smallLightPillar } from '../Objects/smallLightPillar';
import { smallSphere } from '../Objects/smallSphere';
import { Slime2 } from '../Enemies/Slime2';
import { Slime3 } from '../Enemies/Slime3';
import { hearthChest } from '../Objects/hearthChest';
import { Stairs } from '../Objects/Stairs';
export class Ebene extends Phaser.Scene {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    animpart: null;
    player: Player;
    slime: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    //COLLIDER
    playerSlimeCollider?: Phaser.Physics.Arcade.Collider;
    playerSlime2Collider?: Phaser.Physics.Arcade.Collider;
    playerSlime3Collider?: Phaser.Physics.Arcade.Collider;
    playerNormalChestCollider?: Phaser.Physics.Arcade.Collider;
    playerHearthChestCollider?: Phaser.Physics.Arcade.Collider;
    playerSmallSphereCollider?: Phaser.Physics.Arcade.Collider;
    playerSmallLightPillarCollider?: Phaser.Physics.Arcade.Collider;
    playerStairsCollider?: Phaser.Physics.Arcade.Collider;
    playerWallsCollider?: Phaser.Physics.Arcade.Collider;
    //PHYSICS GROUPS
    spell1!: Phaser.Physics.Arcade.Group;
    slimes!: Phaser.Physics.Arcade.Group;
    slimes2!: Phaser.Physics.Arcade.Group;
    slimes3!: Phaser.Physics.Arcade.Group;
    //LICHTER
    lightManager: LightManager;
    playerlight: Phaser.GameObjects.Light;
    spell1light: Phaser.GameObjects.Light;
    glowingLightPillars: Phaser.GameObjects.Light[];
    spell1Collide: boolean;
    lightPillarPositionx:number;
    lightPillarPositiony:number;
    counterPillar:number=0;
    isIncreasingRadius: boolean = false;
    ebeneCounter: number;
    characterCamera: any;
    gemsCoutner: number;

    testmusic:any;
    constructor(ebeneCounter:number,gemsCounter:number) {
        super('ebene');
    }
    init(args: any){
        this.ebeneCounter = args[0];
        this.gemsCoutner = args[1];
        console.log(args)
    }
    preload() {
        this.cursors = this.input.keyboard!.createCursorKeys();
        this.glowingLightPillars = []
        console.log(this.glowingLightPillars)
    }

    create() {
        //ICONS
        //SCENE OVERLAY RUN
        if(this.game.config.height == 440){
        this.scene.run('TouchScene');
        }

        this.scene.run('GemManager');
        this.scene.run('HearthManager');
        this.scene.run('SmallSphereManager');
        this.scene.run('PriceManager');
        this.scene.stop('DeathScene');
        this.scene.stop('WinningScene');

        //SOUNDS
        this.testmusic = this.sound.add('background',{
            volume:0.2,
            loop: true
        })
        this.testmusic.play()
        //EBENE 1 TILESET
        const Ebene1 = this.make.tilemap({ key: 'Ebene'+this.ebeneCounter });
        const TilesetEbene1 = Ebene1.addTilesetImage('Ebene1', 'tileEbene', 16, 16, 1, 2);
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
        //STAIRS
        const StairsGroup = this.physics.add.staticGroup({
           classType: Stairs
        });
       const stairsLayer = Ebene1.getObjectLayer('Stairs');
       stairsLayer?.objects.forEach(stairsObj =>{
           const stairs = StairsGroup.get(stairsObj.x!+stairsObj.width!*0.5,stairsObj.y!-stairsObj.height!*0.5,'Stairs') as Stairs
           StairsGroup.setDepth(7);
       });
        //NORMAL CHEST
        const normalChestGroup = this.physics.add.staticGroup({
            classType: normalChest
        });
        const normalChestLayer = Ebene1.getObjectLayer('NormalChests');
        normalChestLayer?.objects.forEach(normalChestObj => {
        normalChestGroup.get(normalChestObj.x!+normalChestObj.width!*0.5,normalChestObj.y!-normalChestObj.height!*0.5,'normal_Chest');
        normalChestGroup.setDepth(7);
        });
        //HEARTH CHEST
        const hearthChestGroup = this.physics.add.staticGroup({
            classType: hearthChest
        });
        const hearthChestLayer = Ebene1.getObjectLayer('HearthChests');
        hearthChestLayer?.objects.forEach(hearthChestObj => {
        hearthChestGroup.get(hearthChestObj.x!+hearthChestObj.width!*0.5,hearthChestObj.y!-hearthChestObj.height!*0.5,'hearth_Chest');
        hearthChestGroup.setDepth(8);
        });
        // SMALL LIGHTPILLARS
        const smallLightPillarGroup = this.physics.add.staticGroup({
            classType: smallLightPillar
        });
        const smallLightPillarLayer = Ebene1.getObjectLayer('LightPillars');
        smallLightPillarLayer?.objects.forEach(smallLightPillarObj =>{
            const smallLightPillar = smallLightPillarGroup.get(smallLightPillarObj.x!+smallLightPillarObj.width!*0.5,smallLightPillarObj.y!-smallLightPillarObj.height!*0.5,'small_lightPillar') as smallLightPillar;
            smallLightPillarGroup.setDepth(5);
            const smallLightPillarBody = smallLightPillar.body as Phaser.Physics.Arcade.Body;
               smallLightPillarBody.setSize(16,15)
                const xOffset = 0;
                const yOffset = 8;
                smallLightPillarBody.setOffset(xOffset, yOffset);
              
              console.log(this.counterPillar+=1)
        });

        //ENEMY1 SLIME        
        this.slimes = this.physics.add.group({
            classType: Slime1,
            createCallback: (gameObj) => {
                const gameObjSlime = gameObj as Slime1
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
            const xOffset = 1;
            const yOffset = 8;
            slimeBody.setOffset(xOffset, yOffset);
        });
        //ENEMY2 SLIME2        
        this.slimes2 = this.physics.add.group({
            classType: Slime2,
            createCallback: (gameObj) => {
                const gameObjSlime2 = gameObj as Slime2
                if (gameObjSlime2.body !== null) {
                    gameObjSlime2.body.onCollide = true
                }
            }
        });
        const slimes2Layer = Ebene1.getObjectLayer('Slimes2')
        slimes2Layer?.objects.forEach(slime2Obj => {
            const slime2 = this.slimes2.get(slime2Obj.x! + slime2Obj.width!*0.5,slime2Obj.y!-slime2Obj.height!*0.5,'slime')
            this.physics.world.enable(this.slimes2);
            const slime2Body = slime2.body as Phaser.Physics.Arcade.Body;
            slime2Body.setSize(14,8)
            const xOffset = 1;
            const yOffset = 8;
            slime2Body.setOffset(xOffset, yOffset);
        });
        //ENEMY3 SLIME3        
        this.slimes3 = this.physics.add.group({
            classType: Slime3,
            createCallback: (gameObj) => {
                const gameObjSlime3 = gameObj as Slime3
                if (gameObjSlime3.body !== null) {
                    gameObjSlime3.body.onCollide = true
                }
            }
        });
        const slimes3Layer = Ebene1.getObjectLayer('Slimes3')
        slimes3Layer?.objects.forEach(slime3Obj => {
            const slime3 = this.slimes3.get(slime3Obj.x! + slime3Obj.width!*0.5,slime3Obj.y!-slime3Obj.height!*0.5,'slime')
            this.physics.world.enable(this.slimes);
            const slime3Body = slime3.body as Phaser.Physics.Arcade.Body;
            slime3Body.setSize(14,8)
            const xOffset = 1;
            const yOffset = 8;
            slime3Body.setOffset(xOffset, yOffset);
        });


        



        //SPELLS
        this.spell1 = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Image,
            maxSize:1
        });
        //PLAYER
        this.player = this.add.player(720, 400, 'player_idle_down');
        this.player.setSpell1(this.spell1);
        //Z ACHSE FUER BELEUCHTUNG
        this.lights.enable().setAmbientColor(0x000000);
        this.lightManager = new LightManager(this);
        this.playerlight = this.lightManager.addLight(this.player.x, this.player.y, 0xFFFFFF,0,0.9);
        this.spell1light = this.lightManager.addLight(this.player.x, this.player.y, 0xFFA500,0,0.8);
        this.lightManager.toggleAllLights(true);
        this.lightManager.setLightVisible(this.spell1light,false);
        
        const darkOverlay = this.add.rectangle(0, 0, 200000, 200000, 0x000000, 0.8);//make walls darker

        Ebene1Ground.setPipeline('Light2D');
        Ebene1SideWalls.setPipeline('Light2D');

        Ebene1Walls.setDepth(0);
        darkOverlay.setDepth(1);
        Ebene1SideWalls.setDepth(2);
        Ebene1Ground.setDepth(3);
        this.player.setDepth(20);
        
        
        
        //CAMERA
        this.characterCamera = this.cameras.main.startFollow(this.player, false, 1, 1,0, this.game.config.height == 440 ? -110 : 0 );
        this.characterCamera.setZoom(1)

        this.toggleSceneVisibility('HearthManager', 0)
        this.toggleSceneVisibility('GemManager', 0)
        this.toggleSceneVisibility('SmallSphereManager', 0)
        this.toggleSceneVisibility('PriceManager', 0);
       
        //COLLIDERS
        //Player
        this.playerWallsCollider=this.physics.add.collider(this.player, Ebene1Walls);
        this.playerNormalChestCollider=this.physics.add.collider(this.player,normalChestGroup, this.playerNormalChestCollisionHandler,undefined,this);
        this.playerHearthChestCollider=this.physics.add.collider(this.player,hearthChestGroup, this.playerHearthChestCollisionHandler,undefined,this);
        this.playerSmallLightPillarCollider=this.physics.add.collider(this.player,smallLightPillarGroup, this.playerSmallLightPillarCollisionHandler,undefined,this);
        this.playerSmallSphereCollider=this.physics.add.collider(this.player,smallSphereGroup,this.playerSmallSphereCollisionHandler,undefined,this);
        this.playerStairsCollider = this.physics.add.collider(this.player,StairsGroup,this.playerStairsCollisionHandler,undefined,this);
        //Slimes1
        this.physics.add.collider(this.slimes,StairsGroup);
        this.physics.add.collider(this.slimes, normalChestGroup);
        this.physics.add.collider(this.slimes, hearthChestGroup);
        this.physics.add.collider(this.slimes, smallLightPillarGroup);
        this.physics.add.collider(this.slimes, smallSphereGroup);
        this.physics.add.collider(this.slimes, Ebene1Walls);
        this.physics.add.collider(this.slimes, this.slimes2);
        this.physics.add.collider(this.slimes, this.slimes);
        this.physics.add.collider(this.slimes, this.slimes3);
        this.playerSlimeCollider = this.physics.add.collider(this.slimes, this.player, this.slimePlayerCollisionHandler, undefined, this)
        //Slimes2
        this.physics.add.collider(this.slimes2,StairsGroup);
        this.physics.add.collider(this.slimes2, normalChestGroup);
        this.physics.add.collider(this.slimes2, hearthChestGroup);
        this.physics.add.collider(this.slimes2, smallLightPillarGroup);
        this.physics.add.collider(this.slimes2, smallSphereGroup);
        this.physics.add.collider(this.slimes2, Ebene1Walls);
        this.physics.add.collider(this.slimes2, this.slimes2);
        this.physics.add.collider(this.slimes2, this.slimes);
        this.physics.add.collider(this.slimes2, this.slimes3);
        this.playerSlime2Collider = this.physics.add.collider(this.slimes2, this.player, this.slimePlayerCollisionHandler, undefined, this)
        //Slimes3
        this.physics.add.collider(this.slimes3,StairsGroup);
        this.physics.add.collider(this.slimes3, normalChestGroup);
        this.physics.add.collider(this.slimes3, hearthChestGroup);
        this.physics.add.collider(this.slimes3, smallLightPillarGroup);
        this.physics.add.collider(this.slimes3, smallSphereGroup);
        this.physics.add.collider(this.slimes3, Ebene1Walls);
        this.physics.add.collider(this.slimes3, this.slimes2);
        this.physics.add.collider(this.slimes3, this.slimes);
        this.physics.add.collider(this.slimes3, this.slimes3);
        this.playerSlime3Collider = this.physics.add.collider(this.slimes3, this.player, this.slimePlayerCollisionHandler, undefined, this)
        //Spell1
        this.physics.add.collider(this.spell1, Ebene1Walls, this.spell1ObjectCollisionHandler, undefined, this);
        this.physics.add.collider(this.spell1, this.slimes, this.spell1SlimeCollisionHandler, undefined, this);
        this.physics.add.collider(this.spell1, this.slimes2, this.spell1SlimeCollisionHandler, undefined, this);
        this.physics.add.collider(this.spell1, this.slimes3, this.spell1SlimeCollisionHandler, undefined, this);
        this.physics.add.collider(this.spell1, normalChestGroup, this.spell1ObjectCollisionHandler, undefined, this);
        this.physics.add.collider(this.spell1, hearthChestGroup, this.spell1ObjectCollisionHandler, undefined, this);
        this.physics.add.collider(this.spell1, smallLightPillarGroup, this.spell1ObjectCollisionHandler, undefined, this);
        this.physics.add.collider(this.spell1, smallSphereGroup, this.spell1ObjectCollisionHandler, undefined, this);
        this.physics.add.collider(this.spell1, StairsGroup, this.spell1ObjectCollisionHandler, undefined, this);

       
        sceneEvents.on('glow-Small-Pillar', () => {
            //small pillar beleuchtung
            this.glowingLightPillars.push(this.lightManager.addLight(this.lightPillarPositionx, this.lightPillarPositiony, 0x9340FB, 0, 1.4));
            });
        sceneEvents.on('character_hit',()=>{this.sound.play('Character_hit')});
        sceneEvents.on('Character_spell',()=>{this.sound.play('Character_spell')});
        sceneEvents.on('Slime_hit',()=>{this.sound.play('Slime_hit')});
        sceneEvents.on('Chest_open',()=>{this.sound.play('Chest_open')});
        sceneEvents.on('pillar_activate',()=>{this.sound.play('pillar_activate')});
   }
    //COLLSIONHANDLER
    //PLAYER -> NORMALCHEST
    private playerNormalChestCollisionHandler(obj1:any,obj2:any){
        const chest = obj2 as normalChest;
        this.player.setNormalChest(chest);
        this.toggleSceneVisibility('GemManager', 2000);
        const sceneHearthManager = this.scene.get('HearthManager');
        sceneHearthManager.sys.setVisible(false);

        const sceneSphereManager = this.scene.get('SmallSphereManager');
        sceneSphereManager.sys.setVisible(false);

        const scenePriceManager = this.scene.get('PriceManager');
        scenePriceManager.sys.setVisible(false);

    }
    //PLAYER -> HEARTHCHEST
    private playerHearthChestCollisionHandler(obj1:any,obj2:any){
        const chest = obj2 as hearthChest;
        this.player.setHearthChest(chest);
        this.toggleSceneVisibility('GemManager', 2000);
        this.toggleSceneVisibility('PriceManager', 2000);
        const sceneHearthManager = this.scene.get('HearthManager');
        const sceneSphereManager = this.scene.get('SmallSphereManager');
        sceneSphereManager.sys.setVisible(false);
        sceneHearthManager.sys.setVisible(false);
    }
    //PLAYER -> SMALLLIGHTPILLAR
    private playerSmallLightPillarCollisionHandler(obj1:any,obj2:any){
        const lightPillar = obj2 as smallLightPillar;
        this.toggleSceneVisibility('SmallSphereManager', 2000);
        const sceneHearthManager = this.scene.get('HearthManager');
        const sceneSphereManager = this.scene.get('GemManager');
        sceneSphereManager.sys.setVisible(false);
        sceneHearthManager.sys.setVisible(false);
        this.player.setSmallLightPillar(lightPillar);
        this.setlightPillarPosition(lightPillar.x,lightPillar.y);
       
    }
    //PLAYER -> SMALLSPHERE
    private playerSmallSphereCollisionHandler(obj1:any,obj2:any){
           const smallSphere = obj2 as smallSphere;
           this.player.setSmallSphere(smallSphere);
           smallSphere.destroy();
           this.toggleSceneVisibility('SmallSphereManager', 3000);
           const sceneHearthManager = this.scene.get('HearthManager');
           const sceneSphereManager = this.scene.get('GemManager');
           sceneSphereManager.sys.setVisible(false);
           sceneHearthManager.sys.setVisible(false);
            this.sound.play('sphere')
            
    }
    //PLAYER -> STAIRS
    private playerStairsCollisionHandler(obj1:any,obj2:any){
        const stairs = obj2 as Stairs;
        const sceneHearthManager = this.scene.get('HearthManager');
        const sceneSphereManager = this.scene.get('GemManager');
        sceneSphereManager.sys.setVisible(false);
        sceneHearthManager.sys.setVisible(false);  

        if(this.counterPillar === this.glowingLightPillars.length){
        this.lightManager.removeAllLights();
        sceneEvents.destroy();
        this.sound.play('stairs');
        if(this.ebeneCounter === 2){
            this.scene.run('WinningScene');
            this.scene.stop('TouchScene');
        }else{
            this.scene.stop(this);
            this.scene.start('ebene',[++this.ebeneCounter]);
        }
        this.counterPillar = 0;
        this.sound.stopAll();
        this.testmusic.stop();
        }
    }
    
    //SLIME -> PLAYER
    private slimePlayerCollisionHandler(obj1: any, slimeobj: any) {
        const slime = slimeobj as Slime1
        const dx = this.player.x - slime.x;
        const dy = this.player.y - slime.y;
        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);
        this.player.handleEnemyHit(dir);
        this.toggleSceneVisibility('HearthManager', 3000);
        const sceneGemManager = this.scene.get('GemManager');
        const sceneSphereManager = this.scene.get('SmallSphereManager');
        sceneSphereManager.sys.setVisible(false);
        sceneGemManager.sys.setVisible(false);
        if (this.player.playerhealth <= 0) {
            this.playerSlimeCollider?.destroy();
            this.playerSlime2Collider?.destroy();
            this.playerSlime3Collider?.destroy();
            this.playerHearthChestCollider?.destroy();
            this.playerNormalChestCollider?.destroy();
            this.playerSmallLightPillarCollider?.destroy();
            this.playerSmallSphereCollider?.destroy();
            this.playerWallsCollider?.destroy();
            this.playerStairsCollider?.destroy();
            

            sceneEvents.destroy()
            this.counterPillar = 0;
            setTimeout(()=>{
                //this.scene.stop();
                //this.scene.start('ebene',[this.ebeneCounter]);
                this.scene.stop('TouchScene');
                this.scene.run('DeathScene');
                this.sound.stopAll();
                this.testmusic.stop();
            },5500);
        }
    }
    //SPELL1 -> SLIME
    private spell1SlimeCollisionHandler(spell1: any, slime: any) {
        this.spell1.killAndHide(spell1);
        this.spell1Collide = true
        spell1.destroy()
        slime.handleSlimeHit();
        sceneEvents.emit('Slime_hit')
        if (slime.slimehealth <= 0) {
            slime.body.destroy()
            
            setTimeout(() => {
            slime.destroy()
            this.slimes.killAndHide(slime);
              }, 950);
        }
    }

    //SPELL1 WALLS
    private spell1ObjectCollisionHandler(spell1: any, obj2: any) {
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

    update() {
        //UPDATE LIGHT MANAGER
        this.lightManager.update();
        if(this.glowingLightPillars !== undefined){
            this.glowingLightPillars.forEach((pillar)=>{
               this.lightManager.increaseLightRadius(pillar, 130,0.7)
            })}
        if (this.player.playerhealth === 3) {
        this.lightManager.increaseLightRadius(this.playerlight, 95,0.8);
        }
        //LIGHT FOLLOW PLAYER
        this.lightManager.updateLightPosition(this.playerlight,this.player.x,this.player.y)
        if (this.player) {
            this.player.update(this.cursors);
        }
        //TURN OFF LIGHT ON PLAYER DEATH
        if (this.player.playerhealth === 0) {
            this.lightManager.reduceAllLightRadius(0,1000,0.3);
            if(this.glowingLightPillars !== undefined){
                this.glowingLightPillars.forEach((pillar)=>{
                    this.lightManager.reduceLightRadius(pillar, 0,1000,0.3);
                })
            }
        }
        //TURN OFF LIGHT ON COLLIDE SPELL1
        if(this.spell1Collide === true){
            this.lightManager.setLightVisible(this.spell1light,true);
            this.lightManager.reduceLightRadius(this.spell1light,0,1000,1.6);
        }
        //LIGHT FOLLOW SPELL1
        this.spell1.getChildren().forEach((spell: any) => {
           this.lightManager.setLightRadius(this.spell1light,50);
           this.lightManager.setLightVisible(this.spell1light,true);
            const x = spell.x;
            const y = spell.y;
            this.lightManager.updateLightPosition(this.spell1light,x,y);
          });
    }
}