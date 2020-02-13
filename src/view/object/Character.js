/**
 * Created by NAVER on 2017-06-26.
 */

import AssetKey from "../../data/AssetKey";

export default class Character extends Phaser.Group {
    constructor(game, key, useSadTween) {
        super(game);
        this._game = game;
        this._gameGroup = this._game.add.group();
        this._key = key;
        this.useSadTween = useSadTween;

        this.shadow = new Phaser.Image( game, 0, -45, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.SHADOW);
        this.shadow.anchor.setTo(0.5, 0.5);
        this.addChild(this.shadow);

        this.defaultImg = new Phaser.Image( game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, this._key);//happyImg;
        this.defaultImg.anchor.setTo(0.5, 1);

       // this.happyImg = new Phaser.Image( game, 0, 0, ImageKey.DEFAULT_ATLAS, this._key + "_o");//happyImg;
       // this.happyImg.anchor.setTo(0.5, 1);

        this.sadImg = new Phaser.Image( game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, this._key + "_x");//happyImg;
        this.sadImg.anchor.setTo(0.5, 1);

        // this.feverImg = new Phaser.Image( game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, this._key + "_fever");//happyImg;
        // this.feverImg.anchor.setTo(0.5, 1);

       // this.addChild(this.happyImg);
        this.addChild(this.sadImg);
        this.addChild(this.defaultImg);
        // this.addChild(this.feverImg);

        this._showOneImg(this.defaultImg);
    }

    get key() {
        return this._key;
    }

    showSad() {
        this._showOneImg(this.sadImg);
        if ( this.useSadTween ) {
            this.sadImg.angle = 5;
            const DURA = 50;
            this.t = this.game.add.tween(this.sadImg).to({"angle":-5}, DURA, "Linear", true, 0, -1);
            this.t.yoyo(true);
        }
    }

    showDefault() {
        if ( this.useSadTween ) this.t.stop();
        this._showOneImg(this.defaultImg);
    }
/*
    showHappy() {
        if ( this.useSadTween ) this.t.stop();
        this._showOneImg(this.happyImg);
    }
*/
    showFever() {
        // if ( this.useSadTween ) this.t.stop();
        // this._showOneImg(this.feverImg);
        // this.t = this.game.add.tween(this.feverImg.scale).to({"y":1.05}, 50, "Linear", true, 0, -1, true);
    }

    _showOneImg(img) {
        this.defaultImg.visible = false;
        this.sadImg.visible = false;
       // this.happyImg.visible = false;
       //  this.feverImg.visible = false;
        img.visible = true;
    }

    blink() {
        //properties, duration, ease, autoStart, delay, repeat, yoyo
        // this.game.add.tween(this.defaultImg.scale).to({"y":1.05}, 100, "Linear", true, 0, 0, true );
        this.game.add.tween(this.defaultImg.scale).to({y:1.05}, 100, Phaser.Easing.Linear.Out, true, 0, 0, true );
    }

    peep() {
        const rnd = parseInt(Math.random() * 2);
        let angle = 30;
        if ( rnd == 0 ) angle = -30;
        this.game.add.tween(this).to({"angle":angle}, 100, "Linear", true, 0, 0, true );
    }
}
