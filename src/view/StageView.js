import Constant from "../data/Constant";
import Character from "./object/Character";
import GameConfig from "../data/GameConfig";
import WrongEffect from "./object/WrongEffect";

export default class StageView extends Phaser.Group{
    constructor(game) {
        super(game);
        this._game = game;
        this.characterContainer = this._game.add.group();
        this.characterContainer.x = this._game.width * 0.5;
        this.characterContainer.y = Constant.CHARACTER_START_Y;

        this.rightCharacterContainer = this._game.add.group();
        this.rightCharacterContainer.x = this._game.width * 0.5;
        this.rightCharacterContainer.y = Constant.CHARACTER_START_Y;

        //APP
        if(GameConfig.APP_ENBLED) this._rotation();


    }

    getFrontCharacter() {
        return this.characterContainer.getAt(this.characterContainer.total - 1);
    }

    getRandomCharacter() {
        const rnd = parseInt(Math.random() * this.characterContainer.total );
        return this.characterContainer.getAt( rnd );// this.characterContainer.total - 1 )
    }

    addCharacterToContainer(key, idx) {
        const sp = Constant.scalePositions[idx] ;
        //const s = new Character(this.game, key, Config.USE_SAD_TWEEN);//new Phaser.Sprite( this._game, x, y, key, key );
        const s = new Character(this._game, key, GameConfig.USE_SAD_TWEEN);
        s.scale.setTo( sp.scale  );
        s.alpha = 0;  //화면 깜빡임 문제로 추가
        this.characterContainer.addAt(s, idx);
        // if (this.feverBg.visible) s.showFever();
        return s ;
    }

    nextCharacter( button) {
        const g = this._game;
        const rc = this.rightCharacterContainer ;
        const positions = Constant.scalePositions;
        //APP
        let cx = this.characterContainer.x;
        if(GameConfig.APP_ENBLED) cx+=175;

        const easing = Phaser.Easing.Linear.None;//Quadratic.Out;
        // const feverBg = this.feverBg;s

        this.characterContainer.forEach( function(item) {
            let idx = item.parent.getChildIndex( item);

            if ( idx < Constant.MAX_CHARACTER_NUM_IN_ROW - 1  ) {
                let sp = positions[idx+1];
                let toY = sp.y ;
                let toScale = sp.scale;
                if ( item.tween_1) item.tween_1.stop(true);
                if ( item.tween_2) item.tween_2.stop(true);
                item.tween_1 =g.add.tween(item).to({"y":toY}, Constant.NEXT_DURATION, easing, true);
                item.tween_2 =g.add.tween(item.scale).to({"x":toScale, "y":toScale}, Constant.NEXT_DURATION, easing, true);

            }
            else {
                if ( item.tween_1) item.tween_1.stop(true);
                if ( item.tween_2) item.tween_2.stop(true);
                let toX = button.x - cx;
                let toY = button.y - 90;//+ 90;
                rc.addChild(item);
                //if (!feverBg.visible) item.showHappy();
                const lt = g.add.tween(item).to({"x":toX,"y":toY}, Constant.NEXT_DURATION, "Linear", true);
                lt.onComplete.add( function() {
                    item.destroy();
                }) ;
            }
        });
    }

    addNewCharacter( characterKey, score ) {
        let _alpha = 1;
        // const g = this._game;
        const s= this.addCharacterToContainer( characterKey, 0 );//;

        //최대 개수 이상 안나오도록
        if(score >=GameConfig.GOAL_SCORE - GameConfig.MAX_VISIBLE_CHARACTER)
        {
            _alpha = 0;
        }

        const sp = Constant.scalePositions[0];
        s.y = sp - 150 ;
        this._game.add.tween(s).to({y:sp.y}, Constant.NEXT_DURATION, Phaser.Easing.Linear.Out, true, 0, 0, false);
        this._game.add.tween(s).to({alpha:_alpha}, Constant.NEXT_DURATION, Phaser.Easing.Linear.Out, true, 0, 0, false);  // 화면 깜빡임 문제로 추가

    }

    showWrongEffect() {
        const wrongBg = new WrongEffect(this._game);
        this.characterContainer.addAt( wrongBg, this.characterContainer.total -1 );
        wrongBg.x = this._game.width * -0.5;
        wrongBg.y = Constant.CHARACTER_START_Y * -1;
        const onDelay = function() {
            wrongBg.destroy();
        };

        this._game.time.events.add( GameConfig.WRONG_DURATION, onDelay, this ) ;
    }

    removeFirstCharacter() {
        this.characterContainer.removeChildAt( this.characterContainer.total - 1);
    }

    _destroy() {
        this.characterContainer.removeChildren(0, this.characterContainer.length);
        this.rightCharacterContainer.removeChildren(0, this.rightCharacterContainer.length);
    }

    _rotation() {

        this.characterContainer.angle = -90;
        this.characterContainer.x = this._game.height * 0.5 - 150;
        this.characterContainer.y = Constant.CHARACTER_START_Y +130;
        // console.log(this._game.width/ this._game.height)

        this.rightCharacterContainer.angle = -90;
        this.rightCharacterContainer.x = this._game.height * 0.5 - 150;
        this.rightCharacterContainer.y = Constant.CHARACTER_START_Y + 130;
    }



}