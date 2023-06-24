import 'phaser';
const createCharacterAnimation = (anims: Phaser.Animations.AnimationManager)=>{
            //PLAYER
            anims.create({
                key: 'player-idle-down',
                frames: anims.generateFrameNumbers('player_idle_down', { start: 0, end: 2 }),
                frameRate: 2.5,
                repeat: -1
            });
            anims.create({
                key: 'player-idle-up',
                frames: anims.generateFrameNumbers('player_idle_up', { start: 0, end: 2 }),
                frameRate: 2.5,
                repeat: -1
            });
            anims.create({
                key: 'player-idle-right',
                frames: anims.generateFrameNumbers('player_idle_right', { start: 0, end: 2 }),
                frameRate: 2.5,
                repeat: -1
            });
            anims.create({
                key: 'player-walk-down',
                frames: anims.generateFrameNumbers('player_walk_down', { start: 0, end: 7 }),
                frameRate: 10,
                repeat: -1
            });
            anims.create({
                key: 'player-walk-up',
                frames: anims.generateFrameNumbers('player_walk_up', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
            anims.create({
                key: 'player-walk-right',
                frames: anims.generateFrameNumbers('player_walk_right', { start: 0, end: 6 }),
                frameRate: 10,
                repeat: -1
            });
            anims.create({
                key: 'player-faint',
                frames: anims.generateFrameNumbers('player_faint', { start: 0, end: 6 }),
                frameRate: 10,
                repeat: 0
            });
            anims.create({
                key: 'player-attack-right',
                frames: anims.generateFrameNumbers('player_attack_right',{start:0,end:3}),
                frameRate: 25,
                repeat: 0
            });
            anims.create({
                key: 'player-attack-down',
                frames: anims.generateFrameNumbers('player_attack_down',{start:0,end:3}),
                frameRate: 25,
                repeat: 0
            });
            anims.create({
                key: 'player-attack-up',
                frames: anims.generateFrameNumbers('player_attack_up',{start:0,end:3}),
                frameRate: 25,
                repeat: 0
            });
}

export{
    createCharacterAnimation
}