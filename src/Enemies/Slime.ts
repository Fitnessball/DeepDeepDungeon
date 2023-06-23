import 'phaser';
enum Directions{
    UP,
    DOWN,
    LEFT,
    RIGHT,
    STAY
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
    constructor(scene:Phaser.Scene, x: number, y:number, texture: string, frame?: string | number){
        super(scene,x,y,texture,frame);
        this.anims.play('enemy1-walk'); 
        this.setPipeline('Light2D');
        this.setDepth(3);
        this.setActive(true)
        this.setVisible(true)
        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE,this.slimeTileCollisionHandler,this)
        this.changeWalkEvent = scene.time.addEvent({
            delay: 2000,
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
        this.direction = randomDirection(this.direction)
    }
    preUpdate(time: number, delta: number): void {
        super.preUpdate(time,delta);
        const vel = 30;
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
                this.setVelocity(0,vel);
                this.anims.play('enemy1-walk',true); 

                break
            case Directions.STAY:
                this.setVelocity(0,0);
                this.anims.play('enemy1-idle',true); 
                break
        }
    }
}
