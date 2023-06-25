import 'phaser';
import { sceneEvents } from '../Events/MainEvents';

export class GemManager extends Phaser.Scene{
    constructor(){
        super({key:'GemManager'})
    }
    create(){
        const container = this.add.container(0,0)
        const gemsLabel = this.add.text(0,0,'0', {
            fontSize: '10px'
        });
        const gemsImage = this.add.image(0,0,'normal_Gem');
        function updateTextAndImagePosition() {
            const textWidth = gemsLabel.width;
            const totalWidth = textWidth + 2 + gemsImage.width;
        
            gemsLabel.setPosition(-totalWidth / 2+5 + textWidth / 2, 0);
            gemsImage.setPosition(totalWidth / 2 - gemsImage.width/2, 0);
        }
        gemsLabel.setOrigin(0.5);
        gemsImage.setScale(0.8,0.8);
        container.add(gemsImage);
        container.add(gemsLabel);
        updateTextAndImagePosition();
        sceneEvents.on('player-gems-changed',(gems: number)=> {
            gemsLabel.text = gems.toString()
            updateTextAndImagePosition();
        });
        
        container.setPosition(this.game.canvas.width / 2, this.game.canvas.height / 2-16);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, ()=>{
            sceneEvents.off('player-gems-changed');
           })
    }
}