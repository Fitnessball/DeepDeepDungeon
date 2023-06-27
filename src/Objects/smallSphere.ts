import 'phaser'
export class smallSphere extends Phaser.Physics.Arcade.Image{

    constructor(scene:Phaser.Scene,x:number,y:number,texture:string,frame:string|number){
        super(scene,x,y,texture,frame)
        this.setPipeline('Light2D');
    }
}