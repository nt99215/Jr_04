import AssetKey from "../data/AssetKey";
import Constant from "../data/Constant";
import GameConfig from "../data/GameConfig";
import StageView from "../view/StageView";
import RightEffect from "../view/object/RightEffect";
import ComboEffect from "../view/object/ComboEffect";
import TextView from "../view/object/TextView";
import StringUtil from "../data/StringUtil";
import SoundAssetKey from "../data/SoundAssetKey";
import SoundManager from "../manager/SoundManager";
import GuideView from "../view/GuideView";
import MouseEffect from "../ui/MouseEffect";

let term = -35;
let infoAnsArr;
let infoAnswer;
let xPosArr = [0.2, 0.5, 0.8];

export default class ObjectManager extends Phaser.Group{
    constructor(game) {
        super(game);
        this._game = game;

        infoAnsArr = [];
        infoAnswer = 0;

        this._createBg();
        this._prepare();
        this._ready();

        //APP
        if(GameConfig.APP_ENBLED) this._rotation();


    }

    _createBg() {

        this.bgGroup = this._game.add.group();
        this.bg = new Phaser.Image(this._game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.IN_GAME_BG);
        this.bg.inputEnabled = true;
        this.bg.events.onInputDown.add(this._bgClick, this);

        this.machine = new Phaser.Image(this._game, -102, 340, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.MACHINE);
        this.arm = new Phaser.Image(this._game, 514, 290, AssetKey.DEFAULT_GAME_ATLAS,AssetKey.ARM);
        this.bgGroup.addChild(this.bg);
        this.bgGroup.addChild(this.arm);
        this.bgGroup.addChild(this.machine);

    }

    _bgClick() {
        if(! GameConfig.IN_GAME) return;
        SoundManager.instance.play(SoundAssetKey.BASIC_TOUCH_SOUND, false);
        // new MouseEffect(this._game, this._game.input.x, this._game.input.y, 50, 1);
        new MouseEffect(this._game, this._game.input.x, this._game.input.y, 50, 1);
    }

    _prepare() {

        this.rules = [1,2,3,4,5];
        this.stageView = new StageView(this._game);
        // this.add(this.stageView);


        this.buttonContainer = this._game.add.group();
        this.uiContainer = this._game.add.group();
        this.timerContainer = this._game.add.group();
        GameConfig.TIMER_OBJECT = this.timerContainer;

        this.isPlaying = true;
        this.countNum = 0;
        this.comboCount = 0;
        this.totalCombo = 0;
        this.maxCombo = 0;
        this.score = 0;
        this.patternIdx = 0;
        this.timer = this._game.time.create(false);
        this.timer.loop(1000, this._updateCount, this);


        this.pipe = new Phaser.Image(this._game, this._game.width/2, -96, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.PIPE);
        this.pipe.anchor.setTo(0.5, 0);
        this.uiContainer.addChild(this.pipe);

        this._addScoreText();
        this._showScore();
        this._addCounterText();

    }

    _ready() {

        this.isInputEnabled = false;
        this._makePatterns();
        this._changeRule_2();
        this.timer.start(1000);
        this._addButtons();
        this._showCount();
        this._addFirstCharacters();

        this._showDisableButtons(Constant.START_DELAY);
        this._game.time.events.add(Constant.START_DELAY, this._startStage, this ) ;


    }

    _startStage() {

        this.isInputEnabled = true;

        // this.btnDown = button;
        const currentIdx = this._getCurrentIndex();
        // const btnIndex = button ? button.name : 2 ;
        // const isRightAnswer = currentIdx === this.rules[btnIndex];

        infoAnswer = infoAnsArr.indexOf(currentIdx);

        //GUIDE POPUP
        let gw = this._posValue(this._game.width, 'width');
        let gh = this._posValue(this._game.height, 'height');

        let _xPos = xPosArr[infoAnswer];
        let _yPos = gh * 0.85 + term;
        this._addGuide(gw * _xPos, _yPos);
    }

    _showDisableButtons(duration) {

        const k_1 = Constant.BUTTON_PREFIX + "x";
        const k_2 = Constant.BUTTON_PREFIX + "x";
        const k_3 = Constant.BUTTON_PREFIX + "x";


        let xPos = this._posValue(this._game.width, 'width');
        let yPos = this._posValue(this._game.height, 'height');

        const BTN_Y = yPos * 0.85 + term;

        const s_1 = new Phaser.Image( this._game, xPos * 0.2, BTN_Y, AssetKey.DEFAULT_GAME_ATLAS, k_1);
        s_1.anchor.setTo(0.5);
        const s_2 = new Phaser.Image( this._game, xPos * 0.5, BTN_Y, AssetKey.DEFAULT_GAME_ATLAS, k_2 );
        s_2.anchor.setTo(0.5);
        const s_3 = new Phaser.Image( this._game, xPos * 0.8, BTN_Y, AssetKey.DEFAULT_GAME_ATLAS, k_3);
        s_3.anchor.setTo(0.5);


        this.uiContainer.addChild(s_1);
        this.uiContainer.addChild(s_2);
        this.uiContainer.addChild(s_3);

        const bc = this.buttonContainer;
        bc.visible = false ;
        let onDelay = function() {
            bc.visible = true ;
            s_1.destroy();
            s_2.destroy();
            s_3.destroy()

        };

        this._game.time.events.add( duration, onDelay, this ) ;
    }


    _addGuide(xPos, yPos) {
        this.guide = new GuideView(this._game, xPos, yPos);
    }

    _addCounterText() {

        if(GameConfig.INGAME_TIMER_ENABLED)
        {
            this.counterText = new TextView( this._game, AssetKey.DEFAULT_GAME_ATLAS, "time_", TextView.CENTER, TextView.CENTER );//s new Phaser.Text(this._game, this.worldWidth * 0.47, this.worldHeight * 0.05, "1000", style);
            this.timerContainer.add( this.counterText );
            this.counterText.x = this._game.width * 0.5;
            this.counterText.y = this._game.height - this.counterText.height/2 - 50 ;
            // this.counterText.width = this.counterText.width * 0.8;
            // this.counterText.height = this.counterText.height * 0.8;
        }


    }

    _addScoreText() {

        // this.scoreText = new TextView(this._game, AssetKey.DEFAULT_GAME_ATLAS, "score/", TextView.CENTER, TextView.CENTER);
        this.scoreText = new TextView(this._game, AssetKey.DEFAULT_GAME_ATLAS, "time_", TextView.CENTER, TextView.CENTER);
        this.uiContainer.add( this.scoreText );
        this.scoreText.x = 144; //this.worldWidth * 0.12;
        this.scoreText.y = 247;// this.worldHeight * 0.125;
        //this.scoreText.anchor.setTo(0.5);
        // 	this.scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    }

    _addButtons() {
        let xPos = this._posValue(this._game.width, 'width');
        let yPos = this._posValue(this._game.height, 'height');

        const BUTTON_Y = yPos * 0.85 +Constant.CHARACTER_BTN_HEIGHT * 0.5 + term;
        const onInputDown = this.onInputDown;
        const onInputUp = this.onInputUp;
        let idx, textureName, btn, downTextureName;
        for (let i = 0; i < 3; i++) {
            idx = this.rules[i];

            textureName = Constant.BUTTON_PREFIX + idx ;
            downTextureName = Constant.BUTTON_PREFIX + idx + AssetKey.DOWN_POSTFIX ;
            btn = new Phaser.Button(this._game, xPos * (0.2 + i * 0.3), BUTTON_Y, AssetKey.DEFAULT_GAME_ATLAS, null, null, textureName, textureName, downTextureName, textureName) ;//, 0, 0, 0);
            btn.events.onInputDown.add(this._onBtnDown, this);
            btn.events.onInputUp.add(this._onBtnUp, this);
            btn.name = i ;// key;
            btn.anchor.setTo(0.5, 1);
            this.buttonContainer.add(btn);

            infoAnsArr.push(idx);
        }
    }

    _onBtnDown(button) {

        if ( this.btnDown ) return;
        this.btnDown = button;
        if ( !this.isPlaying ) return ;
        if (!this.isInputEnabled) return;
        const currentIdx = this._getCurrentIndex();
        const btnIndex = button ? button.name : 2 ;
        const isRightAnswer = currentIdx === this.rules[btnIndex];
        // const COMBO_BONUS = 5;

        // let score = GameConfig.RIGHT_SCORE;
        let score = GameConfig.CURRENT_SCORE;

        if ( isRightAnswer )
        {

            // score = GameConfig.FEVER_RIGHT_SCORE;
            score ++;
            //sound
            SoundManager.instance.effectSound(SoundAssetKey.SFX_MACARON_BUTTON);
            this._plusTotalCombo();

            if ( this.comboCount >= GameConfig.COMBO || this.totalCombo >= GameConfig.COMBO ) {
                this._showCombo() ;
                // score += this.totalCombo * COMBO_BONUS;
            }

            this._showRightEffect();
            this._nextCharacter(button);
            this._updateScore( score );
            //this._game.time.events.add( 100, this.removeFirstCharacter, this ) ;
        }

        else
        {
            // if ( this.isFever ) return;
            this.totalCombo = 0;
            this.comboCount = 0;
            // this.stageView.feverGage.reset();

            this._game.time.events.add(250, onOosDelay, this);
            this._showWrongAnswer() ;
        }


        function onOosDelay() {

            // console.log('oops snd play');

            //sound
            while( this.oopsSoundRnd == this.lastOopsSoundRnd) this.oopsSoundRnd = parseInt( Math.random()*4);

            if (this.oopsSoundRnd == 0) {
                // this.sfx_oops.play();
                SoundManager.instance.effectSound(SoundAssetKey.SFX_OOPS_1, 1.4);
            } else if (this.oopsSoundRnd == 1) {
                // this.sfx_oops_1.play();
                SoundManager.instance.effectSound(SoundAssetKey.SFX_OOPS_2, 1.4);
            } else if (this.oopsSoundRnd == 2) {
                // this.sfx_oops_2.play();
                SoundManager.instance.effectSound(SoundAssetKey.SFX_OOPS_3, 1.4);
            } else if (this.oopsSoundRnd == 3) {
                // this.sfx_oops_3.play();
                SoundManager.instance.effectSound(SoundAssetKey.SFX_OOPS_3, 1.4);
            }
            this.lastOopsSoundRnd = this.oopsSoundRnd ;
        }
    }

    _onBtnUp(button) {
        if ( button == this.btnDown ) this.btnDown= null;
    }


    _makePatterns() {
        this.patterns = [];
        const len = Constant.ptns.length;
        const easyLen = Constant.easyPtns.length;
        let ptn;
        let rnd = 0;
        let prevRnd = -999;
        let ptnArr;
        for ( let i = 0; i < 128;i++) {
            if ( i < 16 ) {
                ptn = Constant.easyPtns;
                rnd = parseInt(Math.random() * easyLen);
                if (prevRnd == rnd) rnd = parseInt(Math.random() * easyLen);
            } else {
                ptn = Constant.ptns;
                rnd = parseInt(Math.random() * len) ;
                if ( prevRnd == rnd ) rnd = parseInt(Math.random() * len) ;
            }
            ptnArr = ptn[rnd];
            prevRnd = rnd;
            this.patterns = this.patterns.concat(ptnArr);
        }
    }

    _changeRule_2() {

        let bool_4 = true;
        let bool_5 = true;
        while (bool_4 && bool_5) {

            bool_4 = false;
            bool_5 = false;
            this._shuffleArray(this.rules);

            if ( this.rules[0] === 4  || this.rules[1] === 4  || this.rules[2] === 4 ) bool_4 = true;
            if ( this.rules[0] === 5  || this.rules[1] === 5  || this.rules[2] === 5 ) bool_5 = true;
        }
    }

    _shuffleArray(array){

        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;

        }

        return array;
    }

    _tickPipe() {
        const pipe = this.pipe ;
        pipe.scale.x = pipe.scale.y = 1;
        const tt = this._game.add.tween(pipe.scale).to({"y":1.1}, Constant.NEXT_DURATION * 0.5, "Linear", true, 0, 0, true);
        tt.yoyo(true);
    }

    _addFirstCharacters() {
        const index = this;
        const onRepeat = function() {
            index._nextCharacter();
        };
        this._game.time.events.repeat(150, Constant.MAX_CHARACTER_NUM_IN_ROW, onRepeat, this);
    }

    _nextCharacter(button) {

        const characterKey = this._getRandomCharacterKey()  ;
        this.stageView.nextCharacter(button);
        this.stageView.addNewCharacter( characterKey, this.score );

        //최대 개수 이상 안나오도록
        if(this.score >= GameConfig.GOAL_SCORE - GameConfig.MAX_VISIBLE_CHARACTER)
        {
            return;
        }

        this._tickPipe();
        // this.stageView.nextRail();
    }

    _getRandomCharacterKey() {
        // const rnd = parseInt(Math.random() * 3) ;
        const rnd = this.patterns[this.patternIdx];
        this.patternIdx++;
        if ( this.patternIdx === this.patterns.length) this.patternIdx = 0;
        return Constant.CHARACTER_PREFIX + this.rules[rnd];
    }

    _getCurrentIndex() {
        return this.rules[this.patterns[this.patternIdx - Constant.MAX_CHARACTER_NUM_IN_ROW]];
    }

    _plusTotalCombo() {
        this.totalCombo++ ;
        if ( this.maxCombo < this.totalCombo ) this.maxCombo = this.totalCombo;
    }

    _showRightEffect() {

        //GUIDE POP REMOVE
        this.guide._infoRemove();


        const g = this._game;

        // const rightEffect = new RightEffect(this._game, this.worldWidth, this.worldHeight);
        const rightEffect = new RightEffect(this._game);
        this.uiContainer.add( rightEffect );
        let xPos = this._posValue(this._game.width, 'width');
        let yPos = this._posValue(this._game.height, 'height');

        rightEffect.x = xPos * 0.5;
        rightEffect.y = yPos * 0.6;

        const t = g.add.tween(rightEffect.scale).to({"x":1.2, "y":1.2}, 100, "Linear", true);
        t.onComplete.add( function() {
            rightEffect.destroy();
        });
    }

    _showCombo() {

        // combo 사운드가 겹치지 않게 하기 위해서 0.25 초 간격이 지나야 다음 사운드 플레이
        /*
        const dt = new Date().getTime();
        if ( dt - this.comboTime > 350) {
            while( this.soundRnd == this.lastSoundRnd) this.soundRnd = parseInt( Math.random()*3)+1;

            this["sfx_combo_"+this.soundRnd].play();
            this.comboTime = dt;
            this.lastSoundRnd = this.soundRnd;
        }
*/

        let xPos = this._posValue(this._game.width, 'width');
        let yPos = this._posValue(this._game.height, 'height');

        let sndArr = [SoundAssetKey.SFX_COMBO_1, SoundAssetKey.SFX_COMBO_2, SoundAssetKey.SFX_COMBO_3];
        if ( this.totalCombo % 10 === 0 ) {
            while( this.soundRnd === this.lastSoundRnd) this.soundRnd = parseInt( Math.random()*3);
            //sound
            // this["sfx_combo_"+this.soundRnd].play();
            SoundManager.instance.effectSound(sndArr[this.soundRnd]);
            this.lastSoundRnd = this.soundRnd;
        }
        const g = this._game;
        // const gg = this._gameScene.gameGroup;
        if ( this.comboEffect ) {
            this.comboEffect.destroy();
        }
        this.comboEffect = new ComboEffect(this._game, this.totalCombo);
        this.comboEffect.alpha = 0;
        const ce = this.comboEffect;
        const rnd = this.totalCombo % 2;//parseInt(Math.random() * 2);

        let angle = 10;
        if (rnd === 0) angle = -10;
        this.comboEffect.angle = angle;
        this.buttonContainer.add(this.comboEffect);

        let rndX = xPos * ( 0.2 + 0.6 * rnd );
        let rndY = yPos * 0.4;
        this.comboEffect.x = xPos * 0.5;// rndX;
        this.comboEffect.y = yPos * 0.6 ;//rndY;

        g.add.tween(this.comboEffect).to({alpha:1},100, Phaser.Easing.Linear.Out, true);
        const t_1 = g.add.tween(this.comboEffect.scale).to({"x": 1.2, "y": 1.2},100, Phaser.Easing.Back.Out, true);
        const t_2 = g.add.tween(this.comboEffect).to({"x":rndX, "y":rndY}, 100, Phaser.Easing.Back.Out, true);//, true, 500);
        const onDelay =function() {
            if ( ce && ce.parent ) ce.destroy();
        }
        t_2.onComplete.add(function() {
            g.time.events.add( 500, onDelay );//if ( ce ) ce.destroy();
        });

    }

    _showWrongEffect() {
        this.stageView.showWrongEffect() ;
    }

    _showWrongButton() {

        let xPos = this._posValue(this._game.width, 'width');
        let yPos = this._posValue(this._game.height, 'height');

        const BTN_Y = yPos * 0.85;

        const k_1 = Constant.BUTTON_PREFIX + "x";
        const k_2 = Constant.BUTTON_PREFIX + "x";
        const k_3 = Constant.BUTTON_PREFIX + "x";

        const s_1 = new Phaser.Sprite( this._game, xPos * 0.2, BTN_Y + term, AssetKey.DEFAULT_GAME_ATLAS, k_1);
        s_1.anchor.setTo(0.5);
        const s_2 = new Phaser.Sprite( this._game, xPos * 0.5, BTN_Y + term, AssetKey.DEFAULT_GAME_ATLAS, k_2 );
        s_2.anchor.setTo(0.5);
        const s_3 = new Phaser.Sprite( this._game, xPos * 0.8, BTN_Y + term, AssetKey.DEFAULT_GAME_ATLAS, k_3);
        s_3.anchor.setTo(0.5);

        const s_x = new Phaser.Sprite( this._game, xPos * 0.5, BTN_Y - 180, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.WRONG_X);
        s_x.anchor.setTo(0.5);

        this.uiContainer.add(s_1);
        this.uiContainer.add(s_2);
        this.uiContainer.add(s_3);
        this.uiContainer.add(s_x);

        const bc = this.buttonContainer;
        bc.visible = false ;

        const onDelay = function() {
            bc.visible = true ;
            s_1.destroy();
            s_2.destroy();
            s_3.destroy();
            s_x.destroy();

            this.isInputEnabled = true;
        }
        this._game.time.events.add( GameConfig.WRONG_DURATION, onDelay, this ) ;
    }
    _showWrongAnswer() {
        //sound
        // this.sfx_macaron_wrong.play();
        SoundManager.instance.effectSound(SoundAssetKey.SFX_MACARON_WRONG, 0.4);
        this.isInputEnabled = false;

        this._showWrongEffect();
        this._showWrongCharacter();
        this._showWrongButton();
    }

    _showWrongCharacter() {
        const ch = this.stageView.getFrontCharacter();
        ch.showSad();
        const onDelay = function() {
            ch.showDefault();
        };
        this._game.time.events.add( GameConfig.WRONG_DURATION, onDelay, this ) ;
    }




    _updateScore(addedScore) {

        this.showingScore = this.score;
        this.score += addedScore ;//Config.RIGHT_SCORE ;
        this._showScore() ;
    }


    _showScore() {
        const g = this._game;
        const st = this.scoreText;
        const letterSpacing = -5;

        this.scoreText.scale.setTo(1,1);
        // if (this.scoreTween) this.scoreTween.stop(true);
        if (this.showingScoreTween) {
            this.showingScoreTween.stop(true);
            this.scoreText.setText(StringUtil.toDigitStr(parseInt(this.showingScore)), letterSpacing);
        }
        if ( this.showingScore === this.score ) {
            this.scoreText.setText( "0", letterSpacing) ;
            return ;
        }
        this.showingScoreTween = this._game.add.tween( this).to({"showingScore":this.score}, 100, "Linear", true);
        this.showingScoreTween.onUpdateCallback( function() {
            this.scoreText.setText( StringUtil.toDigitStr(parseInt(this.showingScore)), letterSpacing) ;
        }, this);
        this.showingScoreTween.onComplete.add( function () {
            this.scoreText.setText( StringUtil.toDigitStr(this.score), letterSpacing) ;
            g.add.tween( st.scale).to( { "x":1.1, "y":1.1}, 100, "Linear", true, 0, 0, true);
        },this);


        //properties, duration, ease, autoStart, delay, repeat, yoyo

    }

    _updateCount() {
        // if ( this.isFever ) return;

        if(GameConfig.POP_ENABLED) return;
        this.countNum++ ;
        this._showCount();
        /* if ( GameConfig.GAME_DURATION - this.countNum === 5) {
             // this.sfx_timer.loop = true;
             // this.sfx_timer.play();
         }*/
        const front = this.stageView.getFrontCharacter();
        // if (front) front.blink();
        if (front !==-1) front.blink();

        const rnd = parseInt(Math.random() * 2) ;
        if ( rnd === 0 ) return;
        const rand = this.stageView.getRandomCharacter() ;
        if (rand && rand.parent) {
            if (rand === front) return;
            if (rand.peep) rand.peep();
        }

    }


    _showCount() {

        if(GameConfig.INGAME_TIMER_ENABLED)
        {
            const g = this._game;
            const st = this.counterText;
            let currentTime = this._convertCount(this.countNum);
            const letterSpacing = 0;

            this.counterText.scale.setTo(1,1);
            // if (this.scoreTween) this.scoreTween.stop(true);
            if (this.showingScoreTween) {
                this.showingScoreTween.stop(true);
                // this.counterText.setText(StringUtil.toDigitStr(parseInt(this.countNum)), letterSpacing);
                this.counterText.setText(currentTime, letterSpacing);
            }
            /* if ( this.showingScore === this.score ) {
                 this.counterText.setText( "0", letterSpacing) ;
                 return ;
             }*/
            /*this.showingScoreTween = this._game.add.tween( this).to({"showingScore":this.countNum}, 100, "Linear", true);
            this.showingScoreTween.onUpdateCallback( function() {
                this.counterText.setText( StringUtil.toDigitStr(parseInt(this.countNum)), letterSpacing) ;
            }, this);
            this.showingScoreTween.onComplete.add( function () {
                this.counterText.setText( StringUtil.toDigitStr(this.countNum), letterSpacing) ;
                g.add.tween( st.scale).to( { "x":1.1, "y":1.1}, 100, "Linear", true, 0, 0, true);
            },this);*/
        }


        //properties, duration, ease, autoStart, delay, repeat, yoyo

    }

    _convertCount(num) {
        let min = parseInt(num/60);
        let sec = num%60;
        if(min<10) min = '0' + String(min);
        if(sec<10) sec = '0' + String(sec);
        // console.log(min,   ':',  sec);
        return String(min +':'+ sec);


    }


    _update() {

        // console.log("update");
        if(this.score>=GameConfig.GOAL_SCORE)
        {
            this._end();
            return;
        }

    }

    _end() {

        this.timer.stop();
        GameConfig.RESULT_TIME = this.countNum;
        this.isInputEnabled = false;
        this.isPlaying = false;
        this._destroy();
        // this.counterText.y = 660;
        GameConfig.GAME_FINISH = true;

    }


    _destroy() {
        // this._bgGroup.destroy();
        this.bgGroup.removeChildren(0, this.bgGroup.length);
        this.uiContainer.removeChildren(0, this.uiContainer.length);
        this.buttonContainer.removeChildren(0, this.buttonContainer.length);
        this.timerContainer.removeChildren(0, this.timerContainer.length);
        this.stageView._destroy();
        this.stageView.destroy(true);
    }

    _posValue(val, pos) {

        let _val = val;
        if(!GameConfig.APP_ENBLED)
        {
            if(pos ==="width") _val = this._game.width;
            else _val = this._game.height;
        }
        else
        {
            if(pos ==="width") _val = this._game.height;
            else _val = this._game.width;
        }
        return _val;
    }

    _rotation() {
        this.bgGroup.angle = -90;
        this.uiContainer.angle = -90;
        this.buttonContainer.angle = -90;
        // this.stageView.angle = -90;

        this.bgGroup.y = this._game.world.height;
        this.uiContainer.y = this._game.world.height;
        this.buttonContainer.y = this._game.world.height;
        // this.stageView.y = this._game.world.height;

        this.pipe.x = this.game.height/2;


    }

}