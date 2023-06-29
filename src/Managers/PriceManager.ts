import 'phaser';


export class PriceManager extends Phaser.Scene{
    constructor(){
        super({key:'PriceManager'})
    }
    create(){
        const container = this.add.container(0,0)
        const gemsLabel = this.add.text(0,0,'-100', {
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
        
        container.setPosition(this.game.canvas.width / 2-3, this.game.canvas.height / 2-27);
    }
}