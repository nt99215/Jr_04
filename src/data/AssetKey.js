export default class AssetKey {

    static get DEFAULT_GAME_ATLAS() {return 'default_gameAtlas';}
    static get BTN_ASSET()  {   return 'game-main-button'; }
    static get INTRO_ASSET() { return 'intro-asset';}
    static get RESULT_ASSET() {return 'ending-asset';}
    static get TUTOR_TEXT_ASSET() {return 'tutor-text-asset';}
    static get TUTOR_ASSET() {return 'tutor-asset';}


    /**
     * Intro
     */

    static get INTRO_BG() { return 'bg_intro';}
    static get INTRO_CHARACTER() { return 'introCharacter';}
    static get IMG_TITLE() { return 'title';}
    static get IMG_SMOKE_1() { return 'smoke_01';}
    static get IMG_SMOKE_2() { return 'smoke_02';}
    static get INTRO_CHARACTER_MAIN() { return 'introCharacter';}
    static get INTRO_CHARACTER_1() { return 'introCharacter_1';}
    static get INTRO_CHARACTER_2() { return 'introCharacter_2';}
    static get INTRO_CHARACTER_3() { return 'introCharacter_3';}
    static get INTRO_CHARACTER_4() { return 'introCharacter_4';}

    /**
     * inGame
     */

    static get IN_GAME_BG() {return 'img_bg' ;}
    static get INFO_HAND() {return 'img_hand';}
    static get INFO_TOUCH() {return 'img_touch';}


    static get MACHINE() {return 'img_machine' ;}
    static get ARM() {return 'arm' ;}
    static get PIPE() {return 'img_pipe' ;}


    static get SHADOW() {return "shadow"; }
    static get DOWN_POSTFIX() {return "_down"; }
    static get RIGHT_EFFECT() {  return "right_effect"; }
    static get WRONG_X() { return "x"; }
    static get COMBO_TEXT(){return "combo"; }

    static get SMOKE_1(){return "smoke_01"; }
    static get SMOKE_2(){return "smoke_02"; }


    /**
     * Result
     */

    static get BTN_CLOSE_DEFAULT() { return'btn_close_default'; }
    static get BTN_CLOSE_OVER() { return'btn_close_over'; }

    static get ENDING_BG() { return'endingBg'; }
    static get RESULT_IMG_POPUP() { return'img_popup'; }
    static get IMG_GAMEOVER() { return'img_gameover'; }
    static get IMG_SPEECHBUBBLE_01() { return'img_speechbubble_01'; }
    static get IMG_SPEECHBUBBLE_02() { return'img_speechbubble_02'; }
    static get IMG_TWINKLE_01() { return'img_twinkle_01'; }
    static get IMG_TWINKLE_02() { return'img_twinkle_02'; }


    /**
     * Button
     * @returns {string}
     * @constructor
     */
    static get START_BUTTON() { return 'start-button.png'}
    static get RETRY_BUTTON() { return 'retry-button.png'}
    static get RETRY_BUTTON_OVER() { return 'retry-button-over.png'}

    static get BTN_BACK_DEFAULT() { return 'btn_Back_default'}
    static get BTN_BACK_OVER() { return 'btn_Back_over'}

    static get BTN_SOUNDON_DEFAULT() { return 'btn_soundon_default'}
    static get BTN_SOUNDON_OVER() { return 'btn_soundon_over'}

    static get BTN_SOUNDOFF_DEFAULT() { return 'btn_soundoff_default'}
    static get BTN_SOUNDOFF_OVER() { return 'btn_soundoff_over'}


    /**
     * BTN_TUTORIAL CONTENT
     * @returns {string}
     * @constructor
     */

    static get BTN_TUTORIAL_DEFAULT() { return 'btn_tutorial_default'}
    static get BTN_TUTORIAL_OVER() { return 'btn_tutorial_over'}

    static get BTN_TUTORIAL_CLOSE_DEFAULT() {return 'btn_close_default'}
    static get BTN_TUTORIAL_CLOSE_OVER() {return 'btn_close_over'}

    static get IMG_HELP() { return 'img_help'}

}
