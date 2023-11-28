import 'phaser';
import SceneButtons from '../Objects/SceneButtons'
export default class WinningScene extends Phaser.Scene {
    private wiederbeleben: SceneButtons
    private hauptmenu: SceneButtons
    constructor(){
        super('WinningScene')
     }
 create(){
  this.sound.setVolume(0.5)
    
  const WINNING_Background = this.add.image(110,110,'WINNING_Background')
  const Winning_TEXT = this.add.image(110,65,'Winning_TEXT')

  this.hauptmenu = new SceneButtons(this,110,110,'Hauptmenu_UP','Hauptmenu_DOWN');
  

  this.add.existing(this.hauptmenu);


  this.hauptmenu.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
    this.sound.play('Button_pressed')
    this.scene.stop('ebene');
    this.scene.start('MainMenu');
  })
}

}