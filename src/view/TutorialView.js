import AssetKey from "../data/AssetKey";
import GameConfig from "../data/GameConfig";
import SoundAssetKey from "../data/SoundAssetKey";
import SoundManager from "../manager/SoundManager";
import MouseEffect from "../ui/MouseEffect";

let chapter;
export default class TutorialView extends Phaser.Group{
    constructor(game, parent) {
        super(game);

        this.assetKey = AssetKey.BTN_ASSET;
        this._game = game;
        this._gameGroup = this._game.add.group();

        this._createBg();
        this._createBtn();
        this._createNarration();
        if(GameConfig.APP_ENBLED) this._rotation();

    }

    _createBtn() {

        /**
         * SkipBtn
         * @type {Phaser.Image}
         */
        this.skipBtn = this._gameGroup.add(this._game.make.button(0, 0,  this.assetKey, this.onSkip.bind(this), this, AssetKey.BTN_TUTORIAL_CLOSE_DEFAULT, AssetKey.BTN_TUTORIAL_CLOSE_DEFAULT, AssetKey.BTN_TUTORIAL_CLOSE_OVER));
        this.skipBtn.x = this._game.width - this.skipBtn.width - 22;
        // this.skipBtn.y = 68;
        this.skipBtn.y = 52;
        this.skipBtnSound = null;
        // this._buttonSndPlay(SoundAssetKey.BASIC_TOUCH_SOUND, this.skipBtnSound, this.skipBtn)
        this._buttonSndPlay(SoundAssetKey.TUTORIAL_BUTTON_SOUND, this.skipBtnSound, this.skipBtn);

    }

    _buttonSndPlay(sndKey, snd, btn) {
        if(!GameConfig.SOUND_ENABLED) return;
        snd = this._game.add.audio(sndKey);
        btn.setDownSound(snd);

    }


    onSkip() {

        // SoundManager.instance.allSoundPause();
        // this._game.time.events.removeAll();
        this._removeImage();
        this._destroy();

    }


    _createBg() {

        this._graphics =  new Phaser.Graphics(this._game, 0, 0);
        this._graphics.beginFill(0x000000, 0.8);
        this._graphics.drawRect(0, 0, 720, 1280);
        this._graphics.endFill();
        this._graphics.inputEnabled =  true;
        // this._graphics.events.onInputDown.add(this.bgClick, this);
        this._gameGroup.add(this._graphics);


        this.bgImg = new Phaser.Image(this._game, this._game.width/2, this._game.height/2, AssetKey.TUTOR_ASSET, AssetKey.IMG_HELP);
        this.bgImg.anchor.setTo(0.5, 0.5);
        this.bgImg.inputEnabled = true;
        this.bgImg.events.onInputDown.add(this._bgClick, this);
        this._gameGroup.addChild(this.bgImg);
    }

    _bgClick() {
        // if(! GameConfig.IN_GAME) return;
        SoundManager.instance.play(SoundAssetKey.BASIC_TOUCH_SOUND, false);
        // new MouseEffect(this._game, this._game.input.x, this._game.input.y, 50, 1);
        new MouseEffect(this._game, this._game.input.x, this._game.input.y, 50, 1);
    }

    _removeImage() {

        if(chapter)
        {
            chapter._destroy();
            chapter.destroy();
        }

    }


    _destroy() {

        // this._game.remove([this.skipBtn, this.prevBtn, this.nextBtn, this.startBtn, this.skipBtn], true);

        // SceneManager.instance._restore();
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        this._gameGroup.destroy();
        GameConfig.POP_ENABLED = false;
        SoundManager.instance.allSoundPause();
        SoundManager.instance.bgmStart();

    }

    _createNarration() {

        SoundManager.instance.bgmPause();
        GameConfig.POP_ENABLED = true;
        SoundManager.instance.play(SoundAssetKey.tutorNarr_1);

    }

    _rotation() {
        this._gameGroup.angle = -90;
        this._gameGroup.y = this._game.world.height;
        this.bgImg.x = this._game.height/2;
        this.bgImg.y = this._game.width/2;
        this.skipBtn.x = this._game.height - this.skipBtn.width - 22;
        this.skipBtn.y = 52;
    }


}