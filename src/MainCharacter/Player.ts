import 'phaser';
import { normalChest } from '../Objects/normalChest';
import { sceneEvents } from '../Events/MainEvents';
import { smallLightPillar } from '../Objects/smallLightPillar';
import { smallSphere } from '../Objects/smallSphere';
import { hearthChest } from '../Objects/hearthChest';

declare global{
    namespace Phaser.GameObjects{
        interface GameObjectFactory{
            player(x:number,y:number,texture:string,frame?:string|number): Player
        }
    }
}
enum CurrentHealth{
    IDLE,
    DAMAGE,
    DEAD,
    INVIS
}
enum PlayerState{
    IDLE,
    CAST_SPELL
}
export default class Player extends Phaser.Physics.Arcade.Sprite{


    private currentHealth = CurrentHealth.IDLE
    private healthTimedt = 0;
    private _playerhealth = 3;
    private _gems = 0;
    private _spheres = 0;
    private spell1?: Phaser.Physics.Arcade.Group;
    private direction = false;
    private playerState = PlayerState.IDLE;
    private activeNormalChest?: normalChest;
    private activeHearthChest?: hearthChest;
    private activeSmallLightPillar?: smallLightPillar;
    private activeSmallSphere: smallSphere;
    private isInvincible: boolean;
    get playerhealth(){return this._playerhealth}
    get playergems(){return this._gems}
    constructor(scene: Phaser.Scene, x:number,y:number,texture:string,frame?:string|number){
        super(scene,x,y,texture,frame)
        scene.physics.world.enable(this);
        this.setSize(this.width * 0.8, this.height * 1)
        this.anims.play('player-idle-down');
        this.isInvincible = false;
    }
    //SETSPELLS
    setSpell1(spell1:Phaser.Physics.Arcade.Group){
        this.spell1 = spell1;
    }
    //SETCHESTS
    setNormalChest(chest: normalChest){
        this.activeNormalChest = chest;
    }
    setHearthChest(chest: hearthChest){
        this.activeHearthChest = chest;
    }
    setSmallLightPillar(lightPillar: smallLightPillar){
        this.activeSmallLightPillar = lightPillar;
    }
    setSmallSphere(smallSphere: smallSphere){
        this.activeSmallSphere = smallSphere;
        this._spheres += 1;
        sceneEvents.emit('player-spheres-changed',this._spheres);
    }
    //added schaden auf collision
    handleEnemyHit(dirvec:Phaser.Math.Vector2){

        if(this.playerhealth === 0 || this.currentHealth === CurrentHealth.DAMAGE||this.isInvincible){return}

            --this._playerhealth
            sceneEvents.emit('character_hit')
            this.isInvincible = true;
            sceneEvents.emit('player-On-Health-Damage', this._playerhealth);

            setTimeout(() => this.isInvincible = false, 500)

        console.log(this._playerhealth)
        if(this._playerhealth <= 0){
            //death
            this.currentHealth = CurrentHealth.DEAD
            this.anims.play('player-faint');
            this.setVelocity(0,0);
        }else{
            this.setVelocity(dirvec.x,dirvec.y);
            //Damage Color
            this.setTint(0xff0000)
            this.currentHealth = CurrentHealth.DAMAGE
            this.healthTimedt = 0
        }
    }
    preUpdate(time: number, delta: number){
        super.preUpdate(time,delta)
        //Rückstoß und schadensanimation
        switch(this.currentHealth){
            case CurrentHealth.IDLE:
                break
            case CurrentHealth.DAMAGE:
                this.healthTimedt += delta
                if(this.healthTimedt >= 200){
                    this.currentHealth = CurrentHealth.IDLE;
                    this.setTint(0xffffff);
                    this.healthTimedt = 0;
                }
                break
            case CurrentHealth.DEAD:
                this.currentHealth = CurrentHealth.DEAD
                break
        }
        
    }
    private castSpell1(){

        const animpart = this.anims.currentAnim?.key.split('-');
        if(animpart){
        if(!this.spell1){
            return
        }
        const spell1 = this.spell1.get(this.x,this.y,'spell1') as Phaser.Physics.Arcade.Image;

        if(!spell1){return}
        const playerdirection = animpart[2]
        //console.dir(playerdirection)
        const vec = new Phaser.Math.Vector2(0,0);
        this.playerState = PlayerState.CAST_SPELL;
        switch(playerdirection){
            case'up':
            vec.y = -1
            spell1.setSize(spell1.width*0.6,spell1.height*0.9)
            this.anims.play('player-attack-up');
            this.setVelocity(0,0);
            break

            case'down':
            vec.y = 1
            spell1.setSize(spell1.width*0.6,spell1.height*0.9)
            this.anims.play('player-attack-down');
            this.setVelocity(0,0);
            break

            default:
            case'right':
            spell1.setSize(spell1.width*0.9,spell1.height*0.6)
                if(this.direction === true){
                    vec.x = -1
                this.anims.play('player-attack-right');
                this.setVelocity(0,0);
                }else{
                    vec.x = 1
                this.anims.play('player-attack-right');
                this.setVelocity(0,0);
                }
            break
        }
        const rotationangle = vec.angle()

        spell1.setPipeline('Light2D');
        
        spell1.setDepth(3);
        spell1.setActive(true);
        spell1.setVisible(true);

        spell1.setRotation(rotationangle);
        spell1.x += vec.x;
        spell1.y += vec.y;

        spell1.setVelocity(vec.x * 200, vec.y * 200);
        setTimeout(() => {
            this.playerState = PlayerState.IDLE;
          }, 350);
        sceneEvents.emit('Character_spell')
        
    }
    }

    
    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys){
        if(this.currentHealth === CurrentHealth.DAMAGE || this.currentHealth === CurrentHealth.DEAD){return}

        if(!cursors){return}
        if(Phaser.Input.Keyboard.JustDown(cursors.space)){
            if(this.playerState === PlayerState.CAST_SPELL){return}
            if(this.activeNormalChest){
                const gems = this.activeNormalChest.normalChestOpen();
                this._gems += gems;
                sceneEvents.emit('player-gems-changed',this._gems);
                //console.log(this._gems)
            }else if(this.activeHearthChest){
                const [hearth, gems] = this.activeHearthChest.hearthChestOpen(this._playerhealth,this._gems);
                this._playerhealth += hearth
                this._gems += gems
                console.log(this._playerhealth)
                console.log(this._gems)
                sceneEvents.emit('player-gems-changed',this._gems);

            }else if(this.activeSmallLightPillar){
                
                if(this._spheres !== 0){
                const spheres = this.activeSmallLightPillar.smallLightPillarGlow();
                this._spheres -= spheres;
                }
                sceneEvents.emit('player-spheres-changed',this._spheres);
            }else{
                this.castSpell1()
            }
            return
        }
        if(this.playerState === PlayerState.IDLE){
            
         const vel = 60;
         if(cursors.left.isDown){
             this.setVelocity(-vel,0);
             this.anims.play('player-walk-right',true);
             this.setFlipX(true);
             this.direction = true
             this.activeHearthChest = undefined;
             this.activeNormalChest = undefined;
             this.activeSmallLightPillar = undefined;
         }else if(cursors.right?.isDown){
             this.setVelocity(vel,0);
             this.anims.play('player-walk-right',true);
             this.setFlipX(false);
             this.direction = false
             this.activeHearthChest = undefined;
             this.activeNormalChest = undefined;
             this.activeSmallLightPillar = undefined;
         }else if(cursors.down?.isDown){
             this.setVelocity(0,vel);
             this.anims.play('player-walk-down',true);
             this.direction = false
             this.activeNormalChest = undefined;
             this.activeHearthChest = undefined;
             this.activeSmallLightPillar = undefined;
         }else if(cursors.up?.isDown){
             this.setVelocity(0,-vel);
             this.anims.play('player-walk-up',true);
             this.direction = false
             this.activeHearthChest = undefined;
             this.activeNormalChest = undefined;
             this.activeSmallLightPillar = undefined;
         }else{
              const animpart = this.anims.currentAnim?.key.split('-');
              if(animpart){
                  animpart[1] = 'idle';
                  this.anims.play(animpart.join('-'),true);
              } 
              this.setVelocity(0,0);

          }}
    }
}
Phaser.GameObjects.GameObjectFactory.register('player',function(this: Phaser.GameObjects.GameObjectFactory,x:number,y:number,texture:string,frame?:string|number){
    var sprite = new Player(this.scene,x,y,texture,frame);
    this.displayList.add(sprite);
    this.updateList.add(sprite);
    this.scene.physics.world.enableBody(sprite,Phaser.Physics.Arcade.DYNAMIC_BODY);
    sprite.body?.setSize(sprite.width * 0.8, sprite.height * 0.6);
    sprite.body?.setOffset(2,7)
    sprite.setPipeline('Light2D');
    return sprite;
});