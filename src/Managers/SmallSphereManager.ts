import 'phaser';
import { sceneEvents } from '../Events/MainEvents';

export class SmallSphereManager extends Phaser.Scene{
    constructor(){
        super({key:'SmallSphereManager'})
    }
    create(){
        const container = this.add.container(0,0)
        const sphereLabel = this.add.text(0,0,'0', {
            fontSize: '10px'
        });
        const sphereImage = this.add.image(0,0,'small_Sphere');
    
        sphereLabel.setOrigin(0.5);
        sphereImage.setScale(0.9,0.9);
        container.add(sphereImage);
        container.add(sphereLabel);
        this.updateTextAndImagePosition(sphereLabel,sphereImage);
        sceneEvents.on('player-spheres-changed',(spheres: number)=> {
            sphereLabel.text = spheres.toString()
            this.updateTextAndImagePosition(sphereLabel,sphereImage);
        });
        
        container.setPosition(this.game.canvas.width / 2, this.game.canvas.height / 2-16);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, ()=>{
            sceneEvents.off('player-spheres-changed');
           })
    }
    
    updateTextAndImagePosition(gemsLabel:Phaser.GameObjects.Text,gemsImage:Phaser.GameObjects.Image) {
        const textWidth = gemsLabel.width;
        const totalWidth = textWidth + 2 + gemsImage.width;
        if(this.game.config.height == 440){
        
        gemsLabel.setPosition(-totalWidth / 2+5 + textWidth / 2, -110);
        gemsImage.setPosition(totalWidth / 2 - gemsImage.width/2, -110);
        }else{
        gemsLabel.setPosition(-totalWidth / 2+5 + textWidth / 2, 0);
        gemsImage.setPosition(totalWidth / 2 - gemsImage.width/2, 0);
        }
    }
}