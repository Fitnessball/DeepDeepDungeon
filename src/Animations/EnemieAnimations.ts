import 'phaser';
export const createSlimeAnimation = (anims: Phaser.Animations.AnimationManager)=>{
        //ENEMY SLIME
        anims.create({
            key: 'enemy1-idle',
            frames: anims.generateFrameNumbers('enemy1_idle', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });
        anims.create({
            key: 'enemy1-walk',
            frames: anims.generateFrameNumbers('enemy1_walk', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
}
