import 'phaser';
import { sceneEvents } from '../Events/MainEvents';

export class HearthManager extends Phaser.Scene{
    private hearths: Phaser.GameObjects.Group;
    constructor(){
        super({key:'HearthManager'})
    }
    create(){
         this.hearths = this.add.group({
            //zu Animation ändern falls herzen auf sprites gelegt werden
            classType: Phaser.GameObjects.Sprite
        });
        this.hearths.createMultiple({
            key:'herzVoll',
            setXY:{
                x:144,
                y:144,
                stepX: 16
            },
            quantity: 3
        })
       sceneEvents.on('player-On-Health-Damage', this.playerHealthDamageHandler,this)
       this.events.on(Phaser.Scenes.Events.SHUTDOWN, ()=>{
        sceneEvents.off('player-On-Health-Damage',this.playerHealthDamageHandler,this)
       })
    }
    private playerHealthDamageHandler(health:number){
        this.hearths.children.each((gameObj, index)=>{

            const hearth = gameObj as Phaser.GameObjects.Sprite

            if(index < health){
                hearth.setTexture('herzVoll').setScale(0.8);
            
            }else if(index > health){
                hearth.setTexture('herzLeer').setScale(0.8).setVisible(false);

            }else{
                hearth.play('hearth-faint').setScale(0.8);
            }
            

            return null
        })
    }
}