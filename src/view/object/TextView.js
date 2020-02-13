/**
 * Created by NAVER on 2017-07-03.
 * 수정이력.
 * 2017-07-05  removeAll(false) -> removeAll(true)
 */



export default class TextView extends Phaser.Group {

	/**
	 * @param game {Phaser.Game}
	 * @param atlasKey {string}
	 * @param fontName {string}
	 */

    static get TOP() 	{	return "top"; };
    static get BOTTOM() {	return "bottom"; };

	static get LEFT() 	{	return "left"; };
    static get CENTER() {	return "center"; };
    static get RIGHT() {	return "right"; };


    constructor(game, atlasKey, fontName, hAlign, vAlign) {
		super(game);
		this._fontName = fontName;
		this._atlasKey = atlasKey;
        hAlign = hAlign || TextView.LEFT;
		this._hAlign = hAlign;

        vAlign = vAlign || TextView.TOP;
        this._vAlign = vAlign;
	}

	/**
	 * @param value {string | any}
	 * @param letterSpacing {number} 기본값 0
	 */
	setText(value, letterSpacing) {
		letterSpacing = letterSpacing || 0;

		this._text = value;
		this.removeAll(true);
		if (value === null || value === undefined || !String(value)) return;
		let v = String(value);
		let img;
		let tempX = 0;
		for (let i = 0; i < v.length; i++) {
			img = new Phaser.Image( this.game, tempX, 0, this._atlasKey, this._fontName + v.charCodeAt(i) );
			this.addChild(img);
			tempX += ( img.width + letterSpacing );
		}
		let addedX = 0;
		if ( this._hAlign === TextView.RIGHT) {
			addedX = this.width * -1;
		} else if ( this._hAlign === TextView.CENTER) {
            addedX = this.width * -0.5;
		}

        let addedY = 0;
        if ( this._vAlign === TextView.BOTTOM) {
            addedY = this.height * -1;
        }  else if ( this._vAlign === TextView.CENTER) {
            addedY =  this.height* -0.5;
        }
		this.adjustXY(addedX, addedY)
	}

	adjustXY(addedX, addedY) {
        this.forEach( function(item) {
			item.x += addedX;
            item.y += addedY;
		});
	}

	/**
	 * 할당된 문자열 리턴
	 * @returns {string}
	 */
	getText() { return this._text; }

}



