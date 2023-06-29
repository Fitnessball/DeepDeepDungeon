import 'phaser';
enum CurrentHealth{
    IDLE,
    DAMAGE,
    DEAD
}
export class Follower extends Phaser.Physics.Arcade.Sprite{

    private _followerhealth = 2;
    private currentHealth = CurrentHealth.IDLE
    private healthTimedt = 0;
    get followerhealth(){return this._followerhealth}
    constructor(scene:Phaser.Scene, x: number, y:number, texture: string, frame?: string | number){
        super(scene,x,y,texture,frame);
        this.anims.play('enemy4-idle'); 
        this.setPipeline('Light2D');
        this.setDepth(14);
        this.setActive(true)
        this.setVisible(true)
    }
    destroy(fromScene?: boolean){
        super.destroy(fromScene)
    }
followPlayer(playerX:number,playerY:number,follower:Phaser.GameObjects.GameObject){
    
            this.scene.tweens.add({
                targets:follower,
                x: playerX,
                y: playerY,
                duration:2000,
                ease:'Linear',
                repeat: -1,
                yoyo: true
            });
 
};
handleFollowerHit(){
    if(this.followerhealth===0){return}
    if(this.currentHealth === CurrentHealth.DAMAGE){return}

    --this._followerhealth
    if(this._followerhealth <= 0){
        //death
        this.currentHealth = CurrentHealth.DEAD
        this.anims.play('enemy4-idle');
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
}}