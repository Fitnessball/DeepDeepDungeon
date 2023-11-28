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
    const Xoffset = -60
    const Yoffset = 0
    this.buttonAttack = new SceneButtons(this,269+Xoffset,207+Yoffset,'Attack_UP','Attack_DOWN')
    this.arrowDown = new SceneButtons(this,92+Xoffset,207+Yoffset,'ArrowKey_Down_UP','ArrowKey_Down_DOWN');
    this.arrowUp = new SceneButtons(this,92+Xoffset,182+Yoffset,'ArrowKey_Up_UP','ArrowKey_Up_DOWN');
    this.arrowLeft = new SceneButtons(this,71+Xoffset,207+Yoffset,'ArrowKey_Left_UP','ArrowKey_Left_DOWN');
    this.arrowRight = new SceneButtons(this,113+Xoffset,207+Yoffset,'ArrowKey_Right_UP','ArrowKey_Right_DOWN');
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