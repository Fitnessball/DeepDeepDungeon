import 'phaser'
import { sceneEvents } from '../Events/MainEvents';
export class hearthChest extends Phaser.Physics.Arcade.Sprite{

    constructor(scene:Phaser.Scene,x:number,y:number,texture:string,frame:string|number){
        super(scene,x,y,texture,frame)
        //start mit chest die zu ist
        this.play('hearth-Chest-Closed');
        this.setPipeline('Light2D');
    }
    hearthChestOpen(hearths:number,gems:number): [number, number]{
        if(this.anims.currentAnim?.key === 'hearth-Chest-Open'|| hearths === 3 || gems < 100 ){return [0,0]}
        this.play('hearth-Chest-Open');
        sceneEvents.emit('Chest_open')

        return [1,-100];
    }
}