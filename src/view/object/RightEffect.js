/**
 * Created by NAVER on 2017-07-14.
 */
/**
 * Created by NAVER on 2017-07-10.
 */
import AssetKey from "../../data/AssetKey";

export default class RightEffect extends Phaser.Group{
    constructor(game) {
        super(game);
        this._game = game;

        this.bg = new Phaser.Sprite( this.game, 0, 0, AssetKey.RIGHT_EFFECT, 500, 300, 3);
        this.bg.anchor.x = 0.5 ;
        this.bg.anchor.y = 0.5 ;
        this.bg.animations.add("pop");
        this.bg.play("pop", 20, false, false);
        // this.bg = new Phaser.Image(this._game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.RIGHT_EFFECT + '1', 500, 300, 3);
        this.add( this.bg);
    }
}