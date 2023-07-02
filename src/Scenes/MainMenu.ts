import 'phaser'
import SceneButtons from '../Objects/SceneButtons'
import { Scene } from 'phaser'
export default class MainMenu extends Phaser.Scene {
      private start: SceneButtons
      private anleitung: SceneButtons
      private spaceBar:SceneButtons
      private arrowDown:SceneButtons
      private arrowUp:SceneButtons
      private arrowLeft:SceneButtons
      private arrowRight:SceneButtons
      private weiterP1:SceneButtons
      private zurückP1:SceneButtons
      private Laufen_TEXT: Phaser.GameObjects.Image
      private IntundAng_TEXT: Phaser.GameObjects.Image
      private Steuerung_TEXT: Phaser.GameObjects.Image
      private Ziel_TEXT: Phaser.GameObjects.Image
      private seite_2_TEXT: Phaser.GameObjects.Image
      private kugel: Phaser.GameObjects.Image
      private pageCounter: number = 1;
      private lightpillar: Phaser.GameObjects.Image
 constructor(){
    super('MainMenu')
 }
 preload(){}
 create(){
  const Xoffset = -60
  const Yoffset = 0
  const background = this.add.image(110,110,'Background_MAINMENU');
  this.start = new SceneButtons(this,110,130,'BigButton_UP_START','BigButton_DOWN_START');
  this.anleitung = new SceneButtons(this,110,170,'BigButton_UP_ANLEITUNG','BigButton_DOWN_ANLEITUNG');
  this.Laufen_TEXT = this.add.image(111+Xoffset,135,'Laufen_TEXT').setVisible(false);
  this.IntundAng_TEXT = this.add.image(155,146,'IntundAng_TEXT').setVisible(false);
  this.seite_2_TEXT = this.add.image(110,135,'Seite_2_TEXT').setVisible(false);
  this.Steuerung_TEXT = this.add.image(110,25,'Steuerung_TEXT').setVisible(false);
  this.Ziel_TEXT = this.add.image(110,25,'Ziel_TEXT').setVisible(false);
  this.spaceBar = new SceneButtons(this,155,110,'Spacebar_UP','Spacebar_DOWN');
  this.arrowDown = new SceneButtons(this,110+Xoffset,110+Yoffset,'ArrowKey_Down_UP','ArrowKey_Down_DOWN');
  this.arrowUp = new SceneButtons(this,110+Xoffset,85+Yoffset,'ArrowKey_Up_UP','ArrowKey_Up_DOWN');
  this.arrowLeft = new SceneButtons(this,88+Xoffset,110+Yoffset,'ArrowKey_Left_UP','ArrowKey_Left_DOWN');
  this.arrowRight = new SceneButtons(this,132+Xoffset,110+Yoffset,'ArrowKey_Right_UP','ArrowKey_Right_DOWN');
  this.weiterP1 = new SceneButtons(this,177,200,'Weiter_UP','Weiter_DOWN');
  this.zurückP1 = new SceneButtons(this,43,200,'Zurück_UP','Zurück_DOWN');
  this.kugel = this.add.image(60,97,'small_Sphere').setVisible(false);
  this.lightpillar = this.add.image(160,90,'small_lightPillar').setVisible(false);
  

  this.add.existing(this.start);
  this.add.existing(this.anleitung);
  this.add.existing(this.arrowUp).setVisible(false);
  this.add.existing(this.arrowDown).setVisible(false);
  this.add.existing(this.arrowLeft).setVisible(false);
  this.add.existing(this.arrowRight).setVisible(false);
  this.add.existing(this.spaceBar).setVisible(false);
  this.add.existing(this.weiterP1).setVisible(false);
  this.add.existing(this.zurückP1).setVisible(false);
  this.start.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
        this.scene.start('ebene',[1]);
  })
  this.anleitung.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
      this.startSceneVisible(false)
      this.anleitungS1Visible(true)
      this.weiterP1.setVisible(true);
      this.zurückP1.setVisible(true);
})
this.zurückP1.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
      if(this.pageCounter===1){
      this.startSceneVisible(true)
      this.anleitungS1Visible(false)
      this.weiterP1.setVisible(false);
      this.zurückP1.setVisible(false);
      }else if(this.pageCounter===2){
            this.pageCounter--
            this.anleitungS1Visible(true)
            this.anleitungS2Visible(false)
             this.weiterP1.setVisible(true);

      }
})
this.weiterP1.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
      
      if(this.pageCounter===1){
      this.pageCounter++
      this.anleitungS1Visible(false);
      this.anleitungS2Visible(true);
      this.weiterP1.setVisible(false);
      }
})

 }
 anleitungS2Visible(visible:boolean){
      this.seite_2_TEXT.setVisible(visible);
      this.Ziel_TEXT.setVisible(visible);
      this.kugel.setVisible(visible);
      this.lightpillar.setVisible(visible);
 }
 anleitungS1Visible(visible:boolean){
      this.Steuerung_TEXT.setVisible(visible)
      this.spaceBar.setVisible(visible);
      this.arrowUp.setVisible(visible);
      this.arrowDown.setVisible(visible);
      this.arrowLeft.setVisible(visible);
      this.arrowRight.setVisible(visible);
      this.Laufen_TEXT.setVisible(visible);
      this.IntundAng_TEXT.setVisible(visible);
 }
 startSceneVisible(visible:boolean){
      this.start.setVisible(visible);
      this.anleitung.setVisible(visible);
 }

}