import AssetKey from '../data/AssetKey';
import GameConfig from "../data/GameConfig";

let xPos, yPos, circle, hand;
export default class GuideView extends Phaser.Group{
    constructor(game, x, y) {
        super(game);
        this._game = game;
        this._gameGroup = this._game.add.group();
        xPos = x;
        yPos = y;

        this._infoAni();

        if(GameConfig.APP_ENBLED) this._rotation();


    }


    _infoAni() {

        circle = new Phaser.Image(this._game, xPos, yPos, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.INFO_TOUCH);
        // obj.push(circle);
        this._gameGroup.addChild(circle);
        circle.y = yPos - 10;
        circle.anchor.setTo(0.5, 0.5);
        circle.scale.setTo(0.1, 0.1);
        circle.alpha = 0;
        this._game.add.tween(circle.scale).to({x:1.1, y:1.1}, 1000, Phaser.Easing.Bounce.Out, true, 0, 0, false );
        let circleTween = this._game.add.tween(circle).to({alpha:1}, 1000, Phaser.Easing.Bounce.Out, true, 0, 0, false );
        circleTween.onComplete.add( () => {
          /*  if(! infoSnd)
            {
                SoundManager.instance.effectSound(SoundAssetKey.INFO_SND, 0.8);
                infoSnd = true;
            }*/
        });

        hand = new Phaser.Image(this._game, xPos, yPos, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.INFO_HAND);
        // obj.push(hand);
        this._gameGroup.addChild(hand);
        hand.anchor.setTo(0.5, 0.5);
        hand.scale.setTo(0.5, 0.5);
        hand.alpha = 0;
        hand.x = xPos + 70;
        hand.y = yPos + 50;
        // this._game.add.tween(hand.scale).to({x:1, y:1}, 500, Phaser.Easing.Elastic.Out, true, 1000, 0, false );
        this._game.add.tween(hand).to({alpha:1}, 500, Phaser.Easing.Linear.Out, true, 800, 0, false );
        let handCursor = this._game.add.tween(hand.scale).to({x:1.2, y:1.2}, 500, Phaser.Easing.Bounce.Out, true, 1000, 0, false );
        handCursor.onComplete.add(timeHandler, this);

       /* let txtBox = this._game.add.image(xPos, yPos, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.INFO_TEXTBOX);
        // obj.push(txtBox);
        txtBox.anchor.setTo(0.5, 0.5);
        txtBox.x = xPos + 200;
        txtBox.y = yPos + 180;
        txtBox.alpha = 0;
        this._game.add.tween(txtBox).to({alpha:1}, 800, Phaser.Easing.Linear.Out, true, 0, 0, false );*/

        function handReplay() {

            handCursor = this._game.add.tween(hand.scale).to({x:1, y:1}, 500, Phaser.Easing.Circular.Out, true, 500, 1000, true );
            handCursor.onComplete.add(timeHandler, this);
        }


        function timeHandler() {

            this._game.time.events.add(500, handReplay, this);
        }

    }

    _infoRemove() {

        // SoundManager.instance.effectSoundStop(SoundAssetKey.INFO_SND);
        this._gameGroup.removeChildren(0, this._gameGroup.length);
        this.destroy(true);
    }

    _rotation() {

        this._gameGroup.angle = -90;
        this._gameGroup.y = this._game.world.height;

    }

}