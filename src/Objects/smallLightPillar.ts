import 'phaser'
import { sceneEvents } from '../Events/MainEvents';
export class smallLightPillar extends Phaser.Physics.Arcade.Sprite{

    constructor(scene:Phaser.Scene,x:number,y:number,texture:string,frame:string|number){
        super(scene,x,y,texture,frame)
        //start mit chest die zu ist
        this.play('small-lightPillar-Off');
        this.setPipeline('Light2D');
    }
    smallLightPillarGlow(){
        if(this.anims.currentAnim?.key === 'small-lightPillar-Glow'){return 0}
        this.play('small-lightPillar-Glow',true);
        sceneEvents.emit('glow-Small-Pillar');
    }
}