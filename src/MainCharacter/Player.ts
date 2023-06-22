import 'phaser';
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
    DEAD
}
export default class Player extends Phaser.Physics.Arcade.Sprite{
    private currentHealth = CurrentHealth.IDLE
    private healthTimedt = 0;
    private _playerhealth = 3;

    get playerhealth(){return this._playerhealth}
    constructor(scene: Phaser.Scene, x:number,y:number,texture:string,frame?:string|number){
        super(scene,x,y,texture,frame)
        scene.physics.world.enable(this);
        //this.setSize(this.width * 0.8, this.height * 1)
        this.anims.play('player-idle-down');
    }
    //added schaden auf collision
    handleEnemyHit(dirvec:Phaser.Math.Vector2){
        if(this.playerhealth === 0){return}
        if(this.currentHealth === CurrentHealth.DAMAGE){return}
        this.setVelocity(dirvec.x,dirvec.y);
        //Damage Color
        this.setTint(0xff0000)
        this.currentHealth = CurrentHealth.DAMAGE
        this.healthTimedt = 0
        --this._playerhealth
        if(this._playerhealth <= 0){
            //death
            this.currentHealth = CurrentHealth.DEAD
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
                
                break
        }
    }
    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys){

        if(this.currentHealth === CurrentHealth.DAMAGE || this.currentHealth === CurrentHealth.DEAD){return}
        if(!cursors){return}
        const vel = 45;
        if(cursors.left.isDown){
            this.setVelocity(-vel,0);
            this.anims.play('player-walk-right',true);
            this.setFlipX(true);
        }
        else if(cursors.right?.isDown){
            this.setVelocity(vel,0);
            this.anims.play('player-walk-right',true);
            this.setFlipX(false);
        }else if(cursors.down?.isDown){
            this.setVelocity(0,vel);
            this.anims.play('player-walk-down',true);

        }else if(cursors.up?.isDown){
            this.setVelocity(0,-vel);
            this.anims.play('player-walk-up',true);
        }
        else{
            const animpart = this.anims.currentAnim?.key.split('-');
            if(animpart){
                animpart[1] = 'idle';
                this.anims.play(animpart.join('-'),true);


            }
            
            this.setVelocity(0,0);
            //this.player.anims.play('player-idle-down',true);
        }
    }
}
Phaser.GameObjects.GameObjectFactory.register('player',function(this: Phaser.GameObjects.GameObjectFactory,x:number,y:number,texture:string,frame?:string|number){
    var sprite = new Player(this.scene,x,y,texture,frame);
    this.displayList.add(sprite);
    this.updateList.add(sprite);
    this.scene.physics.world.enableBody(sprite,Phaser.Physics.Arcade.DYNAMIC_BODY);
    sprite.body?.setSize(sprite.width * 0.8, sprite.height * 1)   
    sprite.setPipeline('Light2D');

    return sprite;
});