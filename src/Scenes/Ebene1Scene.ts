import 'phaser';
import { createSlimeAnimation } from '../Animations/EnemieAnimations';
import { createCharacterAnimation } from '../Animations/CharacterAnimations';
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
    constructor() {
        super('ebene1scene')
    }

    preload() {
        this.cursors = this.input.keyboard!.createCursorKeys();
    }

    create() {
        //GITTESTPUSH
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

        //PLAYER
        createCharacterAnimation(this.anims);
        this.player = this.add.player(83, 83, 'player_idle_down')


        //LIGHTS
        this.lights.enable().setAmbientColor(0x000000);//setAmbientColor makes ground darker
        const darkOverlay = this.add.rectangle(0, 0, 2000, 2000, 0x000000, 0.8);//make walls darker

        Ebene1Ground.setPipeline('Light2D')
        Ebene1SideWalls.setPipeline('Light2D')

        Ebene1Walls.setDepth(0);
        darkOverlay.setDepth(1);
        Ebene1SideWalls.setDepth(2);
        Ebene1Ground.setDepth(3);
        this.player.setDepth(4);
        this.light = this.lights.addLight(140, 100, 50, 0xffffff, 0.8);

        //ENEMY1 SLIME
        createSlimeAnimation(this.anims);
        const slimes = this.physics.add.group({
            classType: Slime,
            createCallback: (gameObj) => {
                const gameObjSlime = gameObj as Slime
                if (gameObjSlime.body !== null) {
                    gameObjSlime.body.onCollide = true
                }
            }
        })
        slimes.get(140, 90, 'slime')
        //COLLIDERS
        this.physics.add.collider(this.player, Ebene1Walls);
        this.physics.add.collider(slimes, Ebene1Walls);
        this.physics.add.collider(slimes, slimes);
        this.physics.add.collider(slimes, this.player, this.slimePlayerCollisionHandler, undefined, this)


        //CAMERA

        this.cameras.main.startFollow(this.player, false, 1, 1);
        //DEBUG COLLIDERS
        //const debugGraphics = this.add.graphics().setAlpha(0.8)
        //Ebene1Walls.renderDebug(debugGraphics, {
        //    tileColor: null,
        //    collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        //    faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        //})
        this.toggleSceneVisibility('HearthManager',1)
    }
    private slimePlayerCollisionHandler(obj1: any, obj2: any) {
        const slime = obj2 as Slime
        const dx = this.player.x - slime.x
        const dy = this.player.y - slime.y
        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)
        this.player.handleEnemyHit(dir)
        sceneEvents.emit('player-On-Health-Damage', this.player.playerhealth);
        this.toggleSceneVisibility('HearthManager',2000)
    }
    private toggleSceneVisibility(sceneName: string, duration:number) {
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
        //uebergibt den Input an die playerklasse
        if (this.player) {
            this.player.update(this.cursors)                                                                                                                                       
        }
    }
}
