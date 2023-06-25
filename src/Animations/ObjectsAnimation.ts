import 'phaser';
export const ObjectsAnimation = (anims: Phaser.Animations.AnimationManager)=>{
    anims.create({
        key: 'normal-Chest-Open',
        frames: anims.generateFrameNumbers('normal_Chest', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: 0
    });
    anims.create({
        key: 'normal-Chest-Closed',
        frames: anims.generateFrameNumbers('normal_Chest', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: 0
    });
    anims.create({
        key: 'small-lightPillar-Glow',
        frames: anims.generateFrameNumbers('small_lightPillar', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: 0
    });
    anims.create({
        key: 'small-lightPillar-Off',
        frames: anims.generateFrameNumbers('small_lightPillar', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: 0
    });
    anims.create({
        key: 'small-lightPillar-Stays',
        frames: anims.generateFrameNumbers('small_lightPillar_Stays', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    
}