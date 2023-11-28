import 'phaser'
import { sceneEvents } from '../Events/MainEvents';
export class normalChest extends Phaser.Physics.Arcade.Sprite{

    constructor(scene:Phaser.Scene,x:number,y:number,texture:string,frame:string|number){
        super(scene,x,y,texture,frame)
        //start mit chest die zu ist
        this.play('normal-Chest-Closed');
        this.setPipeline('Light2D');
    }
    normalChestOpen(){
        if(this.anims.currentAnim?.key === 'normal-Chest-Open'){return 0}
        this.play('normal-Chest-Open');
        sceneEvents.emit('Chest_open')
        return Phaser.Math.Between(10,30);
    }
}