import AssetKey from "../data/AssetKey";
import TutorialView from "../view/TutorialView";
import GameConfig from "../data/GameConfig";
import SoundManager from "../manager/SoundManager";
import SoundAssetKey from "../data/SoundAssetKey";
import SceneManager from "../manager/SceneManager";
import WebEnabledCheck from "../util/WebEnabledCheck";


export default class Controller extends Phaser.Group{
    constructor(game, parent) {
        super(game);

        this.assetKey = AssetKey.BTN_ASSET;
        this._game = game;
        this._gameGroup = this._game.add.group();
        // this._dispatcher = dispatcher;
        this._parent = parent;

        this._btnInit();
        this._webCheck();

        //App
        if(GameConfig.APP_ENBLED) this._rotation();


    }

    _webCheck() {
        WebEnabledCheck.instance.backBtnEnabled(this.backBtn);
    }


    _btnInit(){

        /**
         * Back btn
         * @type {Phaser.Image}
         */

        this.backBtn = this._gameGroup.add(this._game.make.button(24,24,  this.assetKey, this.onBack.bind(this), this, AssetKey.BTN_BACK_DEFAULT, AssetKey.BTN_BACK_DEFAULT, AssetKey.BTN_BACK_OVER));
        this.backBtnSound = null;
        // this._buttonSndPlay(SoundAssetKey.SND_PREV, this.backBtnSound, this.backBtn);


        /**
         * Sound btn
         * @type {Phaser.Image}
         */
        this.soundOnBtn = this._gameGroup.add(this._game.make.button(0,24,  this.assetKey, this.onSound.bind(this), this, AssetKey.BTN_SOUNDON_DEFAULT, AssetKey.BTN_SOUNDON_DEFAULT, AssetKey.BTN_SOUNDON_OVER));
        this.soundOnBtn.x = this._game.width - this.soundOnBtn.width - 24;
        this.soundOnBtn.visible = GameConfig.SOUND_ENABLED;
        this.soundOnBtnSound = null;
        this._buttonSndPlay(SoundAssetKey.SND_OFF, this.soundOnBtnSound, this.soundOnBtn);


        this.soundOffBtn = this._gameGroup.add(this._game.make.button(0,24,  this.assetKey, this.onSound.bind(this), this, AssetKey.BTN_SOUNDOFF_DEFAULT, AssetKey.BTN_SOUNDOFF_DEFAULT, AssetKey.BTN_SOUNDOFF_OVER));
        this.soundOffBtn.x = this._game.width - this.soundOffBtn.width - 24;
        this.soundOffBtn.visible = !GameConfig.SOUND_ENABLED;
        this.soundOffBtnSound = null;
        this._buttonSndPlay(SoundAssetKey.SND_ON, this.soundOffBtnSound, this.soundOffBtn);

        /**
         * Help btn
         * @type {Phaser.Image}
         */
        this.helpBtn = this._gameGroup.add(this._game.make.button(0, 0,  this.assetKey, this.onHelp.bind(this), this, AssetKey.BTN_TUTORIAL_DEFAULT, AssetKey.BTN_TUTORIAL_DEFAULT, AssetKey.BTN_TUTORIAL_OVER));
        this.helpBtn.x = this._game.width - this.helpBtn.width- 24;
        this.helpBtn.y = this._game.height -this.helpBtn.height - 9;
        GameConfig.HELP_BUTTON = this.helpBtn;

    }


    onHelp(){

        if(GameConfig.TUTORIAL_DISABLED) return;
        SoundManager.instance.allSoundPause();
        // SceneManager.instance._destroy();
        // SoundManager.instance.play(SoundAssetKey.BASIC_TOUCH_SOUND, false);
        SoundManager.instance.effectSound(SoundAssetKey.TUTORIAL_BUTTON_SOUND);

        this.helpView = new TutorialView(this._game, this._parent);
        GameConfig.POP_ENABLED = true;

    }

    onBack(){
        SoundManager.instance.play(SoundAssetKey.SND_PREV, false);
        this._game.time.events.add(400, close, this);
        function close() {
            top.location.href = GameConfig.APP_URL;
        }
    }

    onSound(){

        if(this.soundOnBtn.visible)
        {
            SoundManager.instance.bgmPause(SoundAssetKey.BGM_HOME);
            SoundManager.instance.bgmPause(SoundAssetKey.MAIN_BGM);
            SoundManager.instance.effectSoundStop(SoundAssetKey.GAME_INTRO);
           // this._game.sound.stopAll();
            GameConfig.SOUND_ENABLED = false;

        }
        if(this.soundOffBtn.visible)
        {
            GameConfig.SOUND_ENABLED = true;
            SoundManager.instance.bgmResume();
        }

        this.soundOnBtn.visible = !this.soundOnBtn.visible;
        this.soundOffBtn.visible = !this.soundOffBtn.visible;

    }

    _buttonSndPlay(sndKey, snd, btn) {

        SoundManager.instance.allSoundPause();
        snd = this._game.add.audio(sndKey);
        btn.setDownSound(snd);

    }

    _sndPlay(on, off) {

        this.soundOnBtn.visible = !this.soundOnBtn.visible;
        this.soundOffBtn.visible = !this.soundOffBtn.visible;
        if(SoundManager.instance._queue[on] && SoundManager.instance._queue[off].snd.isPlaying)
        {
            SoundManager.instance._queue[off].snd.stop();
        }
        SoundManager.instance.play(on, false);
    }

    _btnDisabled() {
        this._gameGroup.visible = false;
    }

    _btnEnabled() {
        this._gameGroup.visible = true;
    }

    _rotation() {

        this._gameGroup.angle = -90;
        this._gameGroup.y = this._game.world.height;

        this.soundOnBtn.x = this._game.height - this.soundOnBtn.width - 24;
        this.soundOffBtn.x = this._game.height - this.soundOffBtn.width - 24;
        this.helpBtn.x = this._game.height - this.helpBtn.width- 24;
        this.helpBtn.y = this._game.width -this.helpBtn.height - 9;
    }

}
