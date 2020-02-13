import GameConfig from "../data/GameConfig";
import AssetKey from "../data/AssetKey";
import SoundManager from "../manager/SoundManager";
import SoundAssetKey from "../data/SoundAssetKey";
import MouseEffect from "../ui/MouseEffect";
import ScreenManager from "../loader/manager/ScreenManager";

export default class Intro {
    constructor(game, parent) {

        this._game = game;
        // this._dispatcher = dispatcher;
        this._parent = parent;
        this._gameGroup = this._game.add.group();

        if(GameConfig.SCENE_STATE === 'intro') this._init();

        //APP
        if(GameConfig.APP_ENBLED) this._rotation();
    }

    _init() {


        this.bg = new Phaser.Image(this._game, 0, 0, AssetKey.INTRO_ASSET, AssetKey.INTRO_BG);
        this._gameGroup.addChild(this.bg);
        this.bg.inputEnabled = true;
        this.bg.events.onInputDown.add(this._bgClick, this);

        this.title = this._gameGroup.add(this._game.make.image(43, 29,  AssetKey.INTRO_ASSET, AssetKey.IMG_TITLE));
        this.mainCharacter = this._gameGroup.add(this._game.make.image(77, 701,  AssetKey.INTRO_ASSET, AssetKey.INTRO_CHARACTER_MAIN));
        this.character_1 = this._gameGroup.add(this._game.make.image(40, 653,  AssetKey.INTRO_ASSET, AssetKey.INTRO_CHARACTER_1));
        this.character_2 = this._gameGroup.add(this._game.make.image(197, 541,  AssetKey.INTRO_ASSET, AssetKey.INTRO_CHARACTER_2));
        this.character_3 = this._gameGroup.add(this._game.make.image(385, 599,  AssetKey.INTRO_ASSET, AssetKey.INTRO_CHARACTER_3));
        this.character_4 = this._gameGroup.add(this._game.make.image(496, 665,  AssetKey.INTRO_ASSET, AssetKey.INTRO_CHARACTER_4));

        this.smoke_1 = this._gameGroup.add(this._game.make.image(108, 197, AssetKey.INTRO_ASSET, AssetKey.IMG_SMOKE_1));
        this.smoke_2 = this._gameGroup.add(this._game.make.image(547, 191, AssetKey.INTRO_ASSET, AssetKey.IMG_SMOKE_2));
        this.title.anchor.setTo(0, 1);
        this.title.y += this.title.height;

        this.mainCharacter.anchor.setTo(0, 1);
        this.mainCharacter.y += this.mainCharacter.height;
        this.smoke_1.x += this.smoke_1.width/2;
        this.smoke_2.x += this.smoke_2.width/2;
        this.smoke_1.y += this.smoke_1.height/2;
        this.smoke_2.y += this.smoke_2.height/2;
        this.smoke_1.anchor.setTo(0.5, 0.5);
        this.smoke_2.anchor.setTo(0.5, 0.5);


        this._game.add.tween(this.mainCharacter.scale).to({y : 1.02}, 600, Phaser.Easing.Linear.Out, true, 0, 1000, true);

        this._characterAni();



        this._game.add.tween(this.smoke_1.scale).to({x:1.3, y:1.3}, 1000, Phaser.Easing.Exponential.Out, true, 0, 1000, false);
        this._game.add.tween(this.smoke_1).to({alpha : 0}, 1000, Phaser.Easing.Exponential.Out, true, 0, 1000, false);

        this._game.add.tween(this.smoke_2.scale).to({x:1.3, y:1.3}, 800, Phaser.Easing.Exponential.Out, true, 0, 1000, false);
        this._game.add.tween(this.smoke_2).to({alpha : 0}, 800, Phaser.Easing.Exponential.Out, true, 0, 1000, false);


        // this.startBtn = this._gameGroup.add(this._game.make.image(0, 0, AssetKey.BTN_ASSET, AssetKey.START_BUTTON));
        // this.startBtn.inputEnabled = true;
        // this.startBtn.events.onInputDown.add(this._gameStart, this);
        // this.startBtn.x= 166;
        // this.startBtn.y= this._game.height - this.startBtn.height - 78;

        this.startBtn = this._gameGroup.addChild(this._game.make.button(0, 0, AssetKey.BTN_ASSET, this._gameStart.bind(this), this, AssetKey.START_BUTTON, AssetKey.START_BUTTON, AssetKey.START_BUTTON));
        this.startBtn.x= 166;
        this.startBtn.y= this._game.height - this.startBtn.height - 78;

    }

    _bgClick() {
        // if(! GameConfig.IN_GAME) return;
        SoundManager.instance.play(SoundAssetKey.BASIC_TOUCH_SOUND, false);
        // new MouseEffect(this._game, this._game.input.x, this._game.input.y, 50, 1);
        new MouseEffect(this._game, this._game.input.x, this._game.input.y, 50, 1);
    }

    /**
     * ANIMATION
     */

    _characterAni() {

        let term = -20;
        this._game.add.tween(this.title.scale).to({y:0.98}, 200, Phaser.Easing.Linear.Out, true, 0, 0, true);
        this._game.add.tween(this.character_1).to({y : this.character_1.y + term}, 200, Phaser.Easing.Linear.Out, true, 0, 0, true);
        this._game.add.tween(this.character_2).to({y : this.character_2.y + term}, 200, Phaser.Easing.Linear.Out, true, 200, 0, true);
        this._game.add.tween(this.character_3).to({y : this.character_3.y + term}, 200, Phaser.Easing.Linear.Out, true, 400, 0, true);
        this.characterTween4 =  this._game.add.tween(this.character_4).to({y : this.character_4.y + term}, 200, Phaser.Easing.Linear.Out, true, 600, 0, true);

        this.characterTween4.onComplete.add(this._characterAni, this);
    }


    /**
     * GAME START
     */
    _gameStart() {


        SoundManager.instance.allSoundPause();
        SoundManager.instance.play(SoundAssetKey.START_SOUND);
        GameConfig.TUTORIAL_DISABLED = true;
        this.startBtn.input.enabled = false;
        this._game.time.events.add(1200, enabled, this);
        if(!this._game.device.desktop && this._game.device.fullscreen){
            ScreenManager.instance.fullScreen();
        }

        function enabled() {
            this._game.time.events.removeAll();
            GameConfig.TUTORIAL_DISABLED = false;
            this._parent._create();
        }

    }

    _destroy() {
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        this._game.time.events.removeAll();
    }

    _rotation() {
        this._gameGroup.angle = -90;
        this._gameGroup.y = this._game.world.height;
        this.startBtn.y= this._game.width - this.startBtn.height - 78;
    }

}