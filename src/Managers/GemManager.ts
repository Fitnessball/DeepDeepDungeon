import 'phaser';
import { sceneEvents } from '../Events/MainEvents';

export class GemManager extends Phaser.Scene{
    constructor(){
        super({key:'GemManager'})
    }
    create(){
        const gemsLabel = this.add.text(0,0,'0', {
            fontSize: '10px'

        });

        gemsLabel.setOrigin(0.5); // Set the origin to the center of the text
        gemsLabel.setPosition(this.game.canvas.width / 2, (this.game.canvas.height / 2)-16);
        sceneEvents.on('player-gems-changed',(gems: number)=> {
            gemsLabel.text = gems.toString()
        });
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, ()=>{
            sceneEvents.off('player-gems-changed');
           })
    }
    
}