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
        function updateTextAndImagePosition() {
            const textWidth = sphereLabel.width;
            const totalWidth = textWidth + 2 + sphereImage.width;
        
            sphereLabel.setPosition(-totalWidth / 2+5 + textWidth / 2, 0);
            sphereImage.setPosition(totalWidth / 2 - sphereImage.width/2, 0);
        }
        sphereLabel.setOrigin(0.5);
        sphereImage.setScale(0.9,0.9);
        container.add(sphereImage);
        container.add(sphereLabel);
        updateTextAndImagePosition();
        sceneEvents.on('player-spheres-changed',(spheres: number)=> {
            sphereLabel.text = spheres.toString()
            updateTextAndImagePosition();
        });
        
        container.setPosition(this.game.canvas.width / 2, this.game.canvas.height / 2-16);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, ()=>{
            sceneEvents.off('player-spheres-changed');
           })
    }
}