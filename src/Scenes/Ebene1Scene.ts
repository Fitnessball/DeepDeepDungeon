import 'phaser';
import { createSlimeAnimation } from '../Animations/EnemieAnimations';
import { createCharacterAnimation } from '../Animations/CharacterAnimations';
import { createIconsAnimation } from '../Animations/IconsAnimations';
import { Slime } from '../Enemies/Slime';
import '../MainCharacter/Player'
import Player from '../MainCharacter/Player';
import { sceneEvents } from '../Events/MainEvents';
export class Ebene1Scene extends Phaser.Scene {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    player: Player;
    slime: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    animpart: null;
    light: Phaser.GameObjects.Light;
    lightSpell1: Phaser.GameObjects.Light;
    playerSlimeCollider?: Phaser.Physics.Arcade.Collider;
    spell1!: Phaser.Physics.Arcade.Group;
    slimes!: Phaser.Physics.Arcade.Group;
    constructor() {
        super('ebene1scene')
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


        //LIGHTS
        this.lights.enable().setAmbientColor(0x000000);//setAmbientColor makes ground darker
        const darkOverlay = this.add.rectangle(0, 0, 2000, 2000, 0x000000, 0.8);//make walls darker

        Ebene1Ground.setPipeline('Light2D');
        Ebene1SideWalls.setPipeline('Light2D');

        Ebene1Walls.setDepth(0);
        darkOverlay.setDepth(1);
        Ebene1SideWalls.setDepth(2);
        Ebene1Ground.setDepth(3);
        this.player.setDepth(4);
        this.light = this.lights.addLight(140, 100, 80, 0xffffff, 0.8);
        this.lightSpell1 = this.lights.addLight(140, 100, 60, 0x440000, 0.9).setVisible(false);
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
        })
        //this.slimes.get(140, 90, 'slime')
        //this.slimes.get(100, 90, 'slime1')

        const slimesLayer = Ebene1.getObjectLayer('Slimes')
        slimesLayer?.objects.forEach(slimeObj => {
            this.slimes.get(slimeObj.x! + slimeObj.width!*0.5,slimeObj.y!-slimeObj.height!*0.5,'slime')
        })

        //CAMERA
        this.cameras.main.startFollow(this.player, false, 1, 1);
        //DEBUG COLLIDERS
        //const debugGraphics = this.add.graphics().setAlpha(0.8)
        //Ebene1Walls.renderDebug(debugGraphics, {
        //    tileColor: null,
        //    collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        //    faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        //})
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
    private slimePlayerCollisionHandler(obj1: any, obj2: any) {
        const slime = obj2 as Slime
        const dx = this.player.x - slime.x
        const dy = this.player.y - slime.y
        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)
        this.player.handleEnemyHit(dir)
        sceneEvents.emit('player-On-Health-Damage', this.player.playerhealth);
        this.toggleSceneVisibility('HearthManager', 4000)

        if (this.player.playerhealth <= 0) {
            //this.light.setColor(0x880000)
            this.playerSlimeCollider?.destroy()
            const lightRadiusTween = this.tweens.add({
                targets: this.light,
                radius: 0,
                duration: 4000,
                onComplete: () => {
                }
            });
        }
    }
    private spell1SlimeCollisionHandler(spell1: any, slime: any) {
        //Kann einen error erzeugen fehler muss noch behoben werden
        this.spell1.killAndHide(spell1);
        this.slimes.killAndHide(slime);
        slime.destroy()
        spell1.destroy()
        this.lightRadiusTweenSpell1()
    }
    private lightRadiusTweenSpell1(){
        //BUG FIXXEN
        const lightRadiusTween = this.tweens.add({
            targets: this.lightSpell1,
            radius: 0,
            duration: 300,
            onActive: () => {
                this.lightSpell1 = this.lights.addLight(140, 100, 60, 0x440000, 0.9).setVisible(false)
            }
        });

    }
    private spell1WallsCollisionHandler(spell1: any, obj2: any) {
        this.spell1.killAndHide(spell1);
        spell1.destroy()

        this.lightRadiusTweenSpell1()

    }
    private toggleSceneVisibility(sceneName: string, duration: number) {
        const scene = this.scene.get(sceneName);
        // Show the scene
        scene.sys.setVisible(true);
        // Set a timer to hide the scene after the specified duration
        this.time.delayedCall(duration, () => {
            scene.sys.setVisible(false);
        });
    }

    update() {
        this.light.setPosition(this.player.x, this.player.y)
        this.spell1.getChildren().forEach((spell: any) => {
           this.lightSpell1.setVisible(true);
            const x = spell.x;
            const y = spell.y;
            this.lightSpell1.setPosition(x,y)
          });
        //this.lightSpell1.setPosition(this.spell1)
        //uebergibt den Input an die playerklasse
        if (this.player) {
            this.player.update(this.cursors)
        }
    }
}
