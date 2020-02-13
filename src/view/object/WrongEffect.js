/**
 * Created by NAVER on 2017-07-10.
 */
import AssetKey from "../../data/AssetKey";
import GameConfig from "../../data/GameConfig";

export default class WrongEffect extends Phaser.Group{
    constructor(game) {
        super(game);

        this._game = game;
        this.bg = new Phaser.Sprite(game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, "red");
        this.bg.width = this._game.width;
        this.bg.height = this._game.height;
        this.bg.alpha = 0.3;
        this.add(this.bg);

        //APP
        if(GameConfig.APP_ENBLED) this._rotation();

    }

    _rotation() {
        this.bg.y -=20;
        this.bg.height = this._game.width + 20;
    }
}