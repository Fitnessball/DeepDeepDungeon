import 'phaser';
import SceneButtons from '../Objects/SceneButtons'
export default class DeathScene extends Phaser.Scene {
    private wiederbeleben: SceneButtons
    private hauptmenu: SceneButtons
    constructor(){
        super('DeathScene')
     }
 create(){
  this.sound.setVolume(0.5)
    
  const DEATH_Background = this.add.image(110,110,'DEATH_Background')
  const MagieEntflossen_TEXT = this.add.image(110,65,'MagieEntflossen_TEXT')
  this.wiederbeleben = new SceneButtons(this,110,110,'Wiederbeleben_UP','Wiederbeleben_DOWN');
  this.hauptmenu = new SceneButtons(this,110,150,'Hauptmenu_UP','Hauptmenu_DOWN');
  
  this.add.existing(this.wiederbeleben);
  this.add.existing(this.hauptmenu);

  this.wiederbeleben.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
    this.sound.play('Button_pressed')
    this.scene.stop('ebene')
    this.scene.start('ebene')

  })
  this.hauptmenu.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
    this.sound.play('Button_pressed')

    this.scene.stop('ebene')
    this.scene.start('MainMenu')
  })
}

}