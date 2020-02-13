/**
 * Created by NAVER on 2017-07-14.
 */

import TextView from "./TextView";
import AssetKey from "../../data/AssetKey";

export default class ComboEffect extends Phaser.Group{
    constructor(game, num) {
        super(game);

        // const numText = new TextView( game, AssetKey.DEFAULT_GAME_ATLAS, "combo/", TextView.CENTER, TextView.BOTTOM);// game.add.bitmapText( 0, 0, AssetKey.COMBO_NUMBER, num, 72 );// "COMBO " + this.combo, style );
        const numText = new TextView( game, AssetKey.DEFAULT_GAME_ATLAS, "combo_", TextView.CENTER, TextView.BOTTOM);// game.add.bitmapText( 0, 0, AssetKey.COMBO_NUMBER, num, 72 );// "COMBO " + this.combo, style );
        this.add(numText);
        numText.setText(num, -8)
        numText.y = 20;

        const comboLabel = new Phaser.Sprite( game, 0, 0, AssetKey.DEFAULT_GAME_ATLAS, AssetKey.COMBO_TEXT);//happyImg;
        comboLabel.anchor.setTo(0.5, 0);
        this.add(comboLabel);
    }
}