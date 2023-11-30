import 'phaser';
import SceneButtons from '../Objects/SceneButtons';
import { sceneEvents } from '../Events/MainEvents';
import { Scene } from 'phaser';
export default class TouchScene extends Phaser.Scene {
    private arrowDown:SceneButtons
    private arrowUp:SceneButtons
    private arrowLeft:SceneButtons
    private arrowRight:SceneButtons
    private buttonAttack:SceneButtons
    constructor(){
        super('TouchScene')
     }
 create(){
    const Xoffset = -45
    const Yoffset = 110
    const GBC_Blue = this.add.image(110,220,'GBC_Blue');

    this.buttonAttack = new SceneButtons(this,219+Xoffset,177+Yoffset,'GBC_Attack_UP','GBC_Attack_DOWN')
    this.arrowDown = new SceneButtons(this,103+Xoffset,222+Yoffset,'GBC_Cross_Down_UP','GBC_Cross_Down_DOWN');
    this.arrowUp = new SceneButtons(this,103+Xoffset,168+Yoffset,'GBC_Cross_Up_UP','GBC_Cross_Up_DOWN');
    this.arrowLeft = new SceneButtons(this,73+Xoffset,195+Yoffset,'GBC_Cross_Left_UP','GBC_Cross_Left_DOWN');
    this.arrowRight = new SceneButtons(this,133+Xoffset,195+Yoffset,'GBC_Cross_Right_UP','GBC_Cross_Right_DOWN');
    this.add.existing(this.arrowDown);
    this.add.existing(this.arrowUp);
    this.add.existing(this.arrowLeft);
    this.add.existing(this.arrowRight);
    this.add.existing(this.buttonAttack);
    this.buttonAttack.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
        sceneEvents.emit('ButtonCastSpell');
    })
    this.buttonAttack.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
        sceneEvents.emit('arrowUp');
    })
    this.arrowDown.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
        sceneEvents.emit('arrowDownDown');
    })
    this.arrowDown.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
        sceneEvents.emit('arrowUp');
    })
    this.arrowUp.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
        sceneEvents.emit('arrowDownUp');
    })
    this.arrowUp.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
        sceneEvents.emit('arrowUp');
    })
    this.arrowLeft.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
        sceneEvents.emit('arrowDownLeft');
    })
    this.arrowLeft.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
        sceneEvents.emit('arrowUp');
    })
    this.arrowRight.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
        sceneEvents.emit('arrowDownRight');
    })
    this.arrowRight.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
        sceneEvents.emit('arrowUp');
    })

}   
} 