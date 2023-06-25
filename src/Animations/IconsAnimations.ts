import 'phaser';
export const createIconsAnimation = (anims: Phaser.Animations.AnimationManager)=>{
    anims.create({
        key: 'hearth-faint',
        frames: anims.generateFrameNumbers('hearth_faint', { start: 0, end: 16 }),
        frameRate: 32,
        repeat: 0
    });
}