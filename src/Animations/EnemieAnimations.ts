import 'phaser';
export const createSlimeAnimation = (anims: Phaser.Animations.AnimationManager)=>{
        //ENEMY SLIME1
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
        anims.create({
            key:'enemy1-death',
            frames: anims.generateFrameNumbers('enemy1_death',{start: 0, end: 3}),
            frameRate: 5,
            repeat: 0
        })
        //ENEMY SLIME2
        anims.create({
            key: 'enemy2-idle',
            frames: anims.generateFrameNumbers('enemy2_idle', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });
        anims.create({
            key: 'enemy2-walk',
            frames: anims.generateFrameNumbers('enemy2_walk', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        anims.create({
            key:'enemy2-death',
            frames: anims.generateFrameNumbers('enemy2_death',{start: 0, end: 3}),
            frameRate: 5,
            repeat: 0
        })
        //ENEMY SLIME3
        anims.create({
            key: 'enemy3-idle',
            frames: anims.generateFrameNumbers('enemy3_idle', { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });
        anims.create({
            key: 'enemy3-walk',
            frames: anims.generateFrameNumbers('enemy3_walk', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        anims.create({
            key:'enemy3-death',
            frames: anims.generateFrameNumbers('enemy3_death',{start: 0, end: 3}),
            frameRate: 5,
            repeat: 0
        });
}
