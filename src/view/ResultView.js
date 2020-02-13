import AssetKey from "../data/AssetKey";
import GameConfig from "../data/GameConfig";
import SoundManager from "../manager/SoundManager";
import SoundAssetKey from "../data/SoundAssetKey";
import BackgroundEffect from "../ui/BackgroundEffect.js";
import ConfigManager from "../manager/ConfigManager";
import TextView from "./object/TextView";
import WebEnabledCheck from "../util/WebEnabledCheck";


let guideSnd, snd;
let speechBubbleArr = [AssetKey.IMG_SPEECHBUBBLE_01, AssetKey.IMG_SPEECHBUBBLE_02];
let starXpos = [173, 305, 435];
let starYpos = [420, 398, 420];

let txtXpos = ['','',157, 93];
let txtYpos = ['','',608, 608];

export default class ResultView extends Phaser.Group{
    constructor(game, parent) {
        super(game);

        this._game = game;
        this._gameGroup = this._game.add.group();
        // this._dispatcher = dispatcher;
        this._parent = parent;

        GameConfig.POP_ENABLED = true;
        GameConfig.SCENE_STATE = "result";

        this._init();
        this._resultSnd();
        this._webCheck();
        //APP
        if(GameConfig.APP_ENBLED) this._rotation();
    }

    _webCheck() {
        WebEnabledCheck.instance.backBtnEnabled(this.closeBtn);
    }

    _resultSnd() {
        // let sndArr = [SoundAssetKey.SFX_HIDDEN_1, SoundAssetKey.SFX_HIDDEN_2, SoundAssetKey.SFX_HIDDEN_4];

        if(this._scoreCheck()) snd = SoundAssetKey.RESULT_GREAT;
        else snd = SoundAssetKey.RESULT_GOOD;
        SoundManager.instance.allSoundPause();
        SoundManager.instance.effectSound(snd);
        // SoundManager.instance.effectSound(sndArr[parseInt(Math.random() * sndArr.length)]);
        // console.log(sndArr[parseInt(Math.random() * sndArr.length)])

    }

    _init() {

        /**
         * BG & TEXT
         * @type {Phaser.Image}
         */

        this.bgImg = new Phaser.Image(this._game, 0, 0, AssetKey.RESULT_ASSET, AssetKey.ENDING_BG);
        this.character = new Phaser.Image(this._game, 215, 145, AssetKey.RESULT_ASSET, AssetKey.IMG_GAMEOVER);
        this.character.y += this.character.height;
        this.imgPop = new Phaser.Image(this._game, 37, 362, AssetKey.RESULT_ASSET, AssetKey.RESULT_IMG_POPUP);
        this.star1 = new Phaser.Image(this._game, 258, 225, AssetKey.RESULT_ASSET, AssetKey.IMG_TWINKLE_01);
        this.star1.scale.setTo(0.6, 0.6);
        this.star2 = new Phaser.Image(this._game, 269, 179, AssetKey.RESULT_ASSET, AssetKey.IMG_TWINKLE_01);
        this.star3 = new Phaser.Image(this._game, 467, 197, AssetKey.RESULT_ASSET, AssetKey.IMG_TWINKLE_02);

        this.character.anchor.setTo(0,1);
        this._game.add.tween(this.character.scale).to({y:1.03}, 500, Phaser.Easing.Linear.Out, true, 0, 1000, true);

        this.star1.alpha = 0;
        this._game.add.tween(this.star1).to({alpha : 1},  500, Phaser.Easing.Bounce.Out, true, 0, 1000, true);

        this.star2.alpha = 0;
        this._game.add.tween(this.star2).to({alpha : 1},  700, Phaser.Easing.Bounce.Out, true, 0, 1000, true);

        this.star3.alpha = 0;
        this._game.add.tween(this.star3).to({alpha : 1},  800, Phaser.Easing.Bounce.Out, true, 0, 1000, true);

        this._gameGroup.addChild(this.bgImg);
        this._gameGroup.addChild(this.character);
        this._gameGroup.addChild(this.imgPop);
        this._gameGroup.addChild(this.star1);
        this._gameGroup.addChild(this.star2);
        this._gameGroup.addChild(this.star3);

        this._addCounterText();
        this._showCount();


        /**
         * BUTTON
         */
        this.closeBtn = this._gameGroup.add(this._game.make.button(0, 0,  AssetKey.BTN_ASSET, this._onClose.bind(this), this, AssetKey.BTN_CLOSE_DEFAULT, AssetKey.BTN_CLOSE_DEFAULT, AssetKey.BTN_CLOSE_OVER));
        this.closeBtn.x = this._game.width - this.closeBtn.width- 24;
        this.closeBtn.y = 24;
        this.closeBtnSound = null;
        this._buttonSndEnabled(SoundAssetKey.SND_CLOSE, this.closeBtnSound, this.closeBtn);

        this.restartBtn = this._gameGroup.add(this._game.make.button(0, 0,  AssetKey.BTN_ASSET, this._onRestart.bind(this), this, AssetKey.RETRY_BUTTON, AssetKey.RETRY_BUTTON, AssetKey.RETRY_BUTTON_OVER));
        this.restartBtn.x = 226;
        // this.restartBtn.y = this._game.height - this.closeBtn.height- 144;
        this.restartBtn.y = 1023;
        this.restartBtnSound = null;
        this._buttonSndEnabled(SoundAssetKey.RESTART_SOUND, this.restartBtnSound, this.restartBtn);


        /**
         *
         * STAR SET
         */
        this._starInit();


    }

    /**
     * TIME SET
     */

    _scoreCheck() {


        if(GameConfig.RESULT_TIME < GameConfig.BEST_TIME) return true;
        else return false;

    }

    _addCounterText() {
        this.counterText = new TextView( this._game, AssetKey.DEFAULT_GAME_ATLAS, "time_", TextView.CENTER, TextView.CENTER );
        this._gameGroup.add( this.counterText );
        this.counterText.x = this._game.width * 0.5;
        this.counterText.y = 730;
    }

    _showCount() {
        let currentTime = this._convertCount(GameConfig.RESULT_TIME);
        const letterSpacing = 3;
        this.counterText.setText(currentTime, letterSpacing);
    }

    _convertCount(num) {
        let min = parseInt(num/60);
        let sec = num%60;
        if(min<10) min = '0' + String(min);
        if(sec<10) sec = '0' + String(sec);
        // console.log(min,   ':',  sec);
        return String(min +':'+ sec);
    }

    _starInit() {

        let num, speech;

        if(this._scoreCheck()) num = 3;
        else num = 2;

        if(GameConfig.SCENE_STATE === "result")
        {

            for(let i=0; i<num; i++)
            {
                let img2 = this._game.add.image(starXpos[i], starYpos[i], AssetKey.RESULT_ASSET, 'img_staron_0' + (i + 1));
                this._gameGroup.addChild(img2);
            }

            if(num === 3)
            {
                guideSnd = SoundAssetKey.RESULT_GREAT;
                speech = speechBubbleArr[1];
            }
            else
            {
                //star off img
                let img = this._game.add.image(starXpos[2], starYpos[2], AssetKey.RESULT_ASSET, 'img_staroff_03');
                this._gameGroup.addChild(img);

                guideSnd = SoundAssetKey.RESULT_GOOD;
                speech = speechBubbleArr[0];
            }

            this.speechBubble = this._gameGroup.add(this._game.make.image(txtXpos[num], txtYpos[num], AssetKey.RESULT_ASSET, speech));

            /**
             *
             * CELEBARTION EFFECT
             * @type {BackgroundEffect}
             */
            this.backGroup = new BackgroundEffect(this._game);
            this._gameGroup.addChild(this.backGroup);

            // SoundManager.instance.allSoundPause();
            // SoundManager.instance.play(guideSnd, false);


        }


    }

    _buttonSndEnabled(sndKey, snd, btn) {
        if(!GameConfig.SOUND_ENABLED) return;
        snd = this._game.add.audio(sndKey);
        btn.setDownSound(snd);

    }

    _onClose(){
        this._disabledBtn();
        this._game.time.events.add(400, close, this);
        function close() {
            top.location.href = GameConfig.APP_URL;
        }

    }


    _onRestart() {
        this._disabledBtn();
        SoundManager.instance.effectSoundStop(snd);
        this._game.time.events.add(1000, enabled, this);

        function enabled() {

            this._gameGroup.removeChildren(0, this._gameGroup.length);
            ConfigManager.prototype.GAME_CONFIG_RESET();
            // this._dispatcher.dispatch();
            this._parent._create();
        }

    }

    _disabledBtn() {
        this.closeBtn.input.enabled = false;
        this.restartBtn.input.enabled = false;
    }

    _rotation() {
        this._gameGroup.angle = -90;
        this._gameGroup.y = this._game.world.height;
        this.counterText.x = this._game.height * 0.5;
        this.closeBtn.x = this._game.height - this.closeBtn.width- 24;
        this.closeBtn.y = 24;

    }

}