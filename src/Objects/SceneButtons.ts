import 'phaser'

export default class SceneButtons extends Phaser.GameObjects.Container{
    private overImage: Phaser.GameObjects.Image
    private outImage: Phaser.GameObjects.Image
    
    constructor(scene:Phaser.Scene,x:number, y:number,overTexture:string,outTexture:string ){
        super(scene,x,y)

        this.overImage = scene.add.image(0,0,overTexture)
        this.outImage = scene.add.image(0,0,outTexture)
        this.add(this.overImage)
        this.add(this.outImage)

        this.outImage.setVisible(false)
        this.setSize(this.overImage.width,this.overImage.height)
        this.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
            this.overImage.setVisible(false)
            this.outImage.setVisible(true)

        }).on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
            this.overImage.setVisible(true)
            this.outImage.setVisible(false)
        })
    }
}