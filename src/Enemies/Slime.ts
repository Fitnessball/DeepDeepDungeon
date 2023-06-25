import 'phaser';
enum Directions{
    UP,
    DOWN,
    LEFT,
    RIGHT,
    STAY
}
enum CurrentHealth{
    IDLE,
    DAMAGE,
    DEAD
}

const randomDirection = (sameDirection: Directions) => {
    let changeDirection = Phaser.Math.Between(0,4);
    while(changeDirection === sameDirection){
        changeDirection = Phaser.Math.Between(0,4);
    }
    return changeDirection;
}
export class Slime extends Phaser.Physics.Arcade.Sprite{
    private direction = Directions.RIGHT;  
    private changeWalkEvent: Phaser.Time.TimerEvent
    private _slimehealth = 2;
    private currentHealth = CurrentHealth.IDLE
    private healthTimedt = 0;
    get slimehealth(){return this._slimehealth}
    constructor(scene:Phaser.Scene, x: number, y:number, texture: string, frame?: string | number){
        super(scene,x,y,texture,frame);
        this.anims.play('enemy1-walk'); 
        this.setPipeline('Light2D');
        this.setDepth(3);
        this.setActive(true)
        this.setVisible(true)
        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE,this.slimeTileCollisionHandler,this)
        scene.physics.world.on(Phaser.Physics.Arcade.Events.COLLIDE,this.slimeTileCollisionHandler,this)
        this.changeWalkEvent = scene.time.addEvent({
            delay: 1500,
            callback:()=>{
                this.direction = randomDirection(this.direction)
            }, 
            loop: true
        })
    }
    destroy(fromScene?: boolean){
        this.changeWalkEvent.destroy()
        super.destroy(fromScene)
    }

   private slimeTileCollisionHandler(gameObj: Phaser.GameObjects.GameObject){
       if(gameObj !== this){
           return
       }
       this.direction = randomDirection(this.direction);
   }
   public handleSlimeHit(){
        if(this.slimehealth===0){return}
        if(this.currentHealth === CurrentHealth.DAMAGE){return}

        --this._slimehealth
        if(this._slimehealth <= 0){
            //death
            this.currentHealth = CurrentHealth.DEAD
            this.anims.play('enemy1-death');
            this.setVelocity(0,0);

        }else{
            //Damage Color
            this.setTint(0xff0000)
            this.currentHealth = CurrentHealth.DAMAGE
            this.healthTimedt = 0
        }
    }
    preUpdate(time: number, delta: number): void {
        super.preUpdate(time,delta);

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
        const vel = 30;
        //||this.currentHealth===CurrentHealth.DAMAGE um knockback der slimes zu deaktivieren
        if(this.currentHealth===CurrentHealth.IDLE){
        switch (this.direction){
            case Directions.RIGHT:
                this.setVelocity(vel,0);

                break
            case Directions.LEFT:
                this.setVelocity(-vel,0);
                this.anims.play('enemy1-walk',true); 
                break
            case Directions.UP:
                this.setVelocity(0,-vel);
                this.anims.play('enemy1-walk',true); 
                break
            case Directions.DOWN:
                this.anims.play('enemy1-walk',true); 
                this.setVelocity(0,vel);

                break
            case Directions.STAY:
                this.setVelocity(0,0);
                this.anims.play('enemy1-idle',true); 
                break
        }
    }}
}
