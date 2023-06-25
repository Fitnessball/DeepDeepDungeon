import 'phaser'
export class normalChest extends Phaser.Physics.Arcade.Sprite{

    constructor(scene:Phaser.Scene,x:number,y:number,texture:string,frame:string|number){
        super(scene,x,y,texture,frame)
        //start mit chest die zu ist
        this.play('normal-Chest-Closed');
        this.setPipeline('Light2D')
    }
    normalChestOpen(){
        if(this.anims.currentAnim?.key === 'normal-Chest-Open'){return 0}
        this.play('normal-Chest-Open');
        return Phaser.Math.Between(5,25);
    }
}