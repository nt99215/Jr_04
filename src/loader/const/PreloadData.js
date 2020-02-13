import AssetKey from "../../data/AssetKey";
import GameConfig from "../../data/GameConfig";
import SoundAssetKey from "../../data/SoundAssetKey";

export default class PreloadResource{
    constructor(game) {
        PreloadResource.instance = this;
        this.game = game;
    }

    preload() {

        this.game.load.atlasJSONHash(AssetKey.INTRO_ASSET, 'asset/game/image/intro-asset.png', 'asset/game/image/intro-asset.json');
        this.game.load.atlasJSONHash( AssetKey.BTN_ASSET, 'asset/game/image/game-main-button.png', 'asset/game/image/game-main-button.json');
        this.game.load.atlasJSONHash(AssetKey.DEFAULT_GAME_ATLAS, 'asset/game/image/default_gameAtlas.png', 'asset/game/image/default_gameAtlas.json');
        this.game.load.atlasJSONHash(AssetKey.TUTOR_ASSET, 'asset/game/image/tutor-asset.png', 'asset/game/image/tutor-asset.json');
        this.game.load.atlasJSONHash(AssetKey.RESULT_ASSET, 'asset/game/image/ending-asset.png', 'asset/game/image/ending-asset.json');
        this.game.load.atlasJSONHash(AssetKey.RIGHT_EFFECT, 'asset/game/image/right-effect.png', 'asset/game/image/right-effect.json');

        let extension = ".mp3";

        if( this.game.device.desktop )
        {
            GameConfig.CURRENT_DEVICE = 'desktop';
        }
        else
        {
            if( this.game.device.android )
            {
                extension = ".ogg";
                GameConfig.CURRENT_DEVICE = 'android';
            }
            else
            {
                extension = ".m4a";
                GameConfig.CURRENT_DEVICE = 'ios';
            }

        }

        /**
         * misc Sound
         * @type {string}
         */

        const gameIntro = 'asset/game/sound/' + SoundAssetKey.GAME_INTRO + extension;
        const tutorNarr_1 = 'asset/game/sound/' + SoundAssetKey.tutorNarr_1 + extension;
        const result_good = 'asset/game/sound/' + SoundAssetKey.RESULT_GOOD + extension;
        const result_great = 'asset/game/sound/' + SoundAssetKey.RESULT_GREAT + extension;
        const sfx_retry = 'asset/game/sound/' + SoundAssetKey.RESTART_SOUND + extension;

        const basicTouchSnd = 'asset/game/sound/' + SoundAssetKey.BASIC_TOUCH_SOUND + extension;
        const tutorialBtnSnd = 'asset/game/sound/' + SoundAssetKey.TUTORIAL_BUTTON_SOUND + extension;
        const bgm_home= 'asset/game/sound/' + SoundAssetKey.BGM_HOME + extension ;
        const mainBgm = 'asset/game/sound/' + SoundAssetKey.MAIN_BGM + extension;
        const btnSnd = 'asset/game/sound/' + SoundAssetKey.BUTTON_SOUND + extension;
        const startSnd = 'asset/game/sound/' + SoundAssetKey.START_SOUND + extension;
        const selectedSnd = 'asset/game/sound/' + SoundAssetKey.SELECTED_SOUND + extension;

        /**
         *
         * effect Sound (add)
         */
        const sndClose = 'asset/game/sound/' + SoundAssetKey.SND_CLOSE + extension;
        const sndNext = 'asset/game/sound/' + SoundAssetKey.SND_NEXT + extension;
        const sndOff = 'asset/game/sound/' + SoundAssetKey.SND_OFF + extension;
        const sndOn = 'asset/game/sound/' + SoundAssetKey.SND_ON + extension;
        const sndPrev = 'asset/game/sound/' + SoundAssetKey.SND_PREV + extension;
        const sndSkip = 'asset/game/sound/' + SoundAssetKey.SND_SKIP + extension;


        const sfx_macaron_stand_by= 'asset/game/sound/' + SoundAssetKey.SFX_MACARON_STAND_BY + extension ;
        const sfx_macaron_button= 'asset/game/sound/' + SoundAssetKey.SFX_MACARON_BUTTON + extension ;
        const sfx_macaron_ambience= 'asset/game/sound/' + SoundAssetKey.SFX_MACARON_AMBIENCE + extension ;
        const sfx_macaron_wrong= 'asset/game/sound/' + SoundAssetKey.SFX_MACARON_WRONG + extension ;

        const sfx_combo_1= 'asset/game/sound/' + SoundAssetKey.SFX_COMBO_1 + extension ;
        const sfx_combo_2= 'asset/game/sound/' + SoundAssetKey.SFX_COMBO_2 + extension ;
        const sfx_combo_3= 'asset/game/sound/' + SoundAssetKey.SFX_COMBO_3 + extension ;
        const sfx_game_over= 'asset/game/sound/' + SoundAssetKey.SFX_GAME_OVER+ extension ;

        const sfx_oops_1= 'asset/game/sound/' + SoundAssetKey.SFX_OOPS_1+ extension ;
        const sfx_oops_2= 'asset/game/sound/' + SoundAssetKey.SFX_OOPS_2+ extension ;
        const sfx_oops_3= 'asset/game/sound/' + SoundAssetKey.SFX_OOPS_3+ extension ;


        /**
         * TUTOR NARRATION
         *@type {SoundQueue}
         * @private
         */
        this.game.load.audio( SoundAssetKey.GAME_INTRO, gameIntro);
        this.game.load.audio( SoundAssetKey.tutorNarr_1, tutorNarr_1);


        /**
         * RESULT PAGE
         * @type {SoundQueue}
         * @private
         */
        this.game.load.audio( SoundAssetKey.RESULT_GOOD, result_good);
        this.game.load.audio( SoundAssetKey.RESULT_GREAT, result_great);

        /**
         * EFFECT SOUND
         * @type {SoundQueue}
         * @private
         */

        this.game.load.audio( SoundAssetKey.BASIC_TOUCH_SOUND, basicTouchSnd);
        this.game.load.audio( SoundAssetKey.BUTTON_SOUND, btnSnd);
        this.game.load.audio( SoundAssetKey.MAIN_BGM, mainBgm);
        this.game.load.audio( SoundAssetKey.BGM_HOME, bgm_home);
        this.game.load.audio( SoundAssetKey.SELECTED_SOUND, selectedSnd);
        this.game.load.audio( SoundAssetKey.START_SOUND, startSnd);
        this.game.load.audio( SoundAssetKey.TUTORIAL_BUTTON_SOUND, tutorialBtnSnd);

        this.game.load.audio( SoundAssetKey.SND_CLOSE, sndClose);
        this.game.load.audio( SoundAssetKey.SND_NEXT, sndNext);
        this.game.load.audio( SoundAssetKey.SND_OFF, sndOff);
        this.game.load.audio( SoundAssetKey.SND_ON, sndOn);
        this.game.load.audio( SoundAssetKey.SND_PREV, sndPrev);
        this.game.load.audio( SoundAssetKey.SND_SKIP, sndSkip);


        this.game.load.audio( SoundAssetKey.BGM_HOME, sfx_macaron_stand_by);
        this.game.load.audio( SoundAssetKey.SFX_MACARON_STAND_BY, sfx_macaron_stand_by);
        this.game.load.audio( SoundAssetKey.SFX_MACARON_BUTTON, sfx_macaron_button);
        this.game.load.audio( SoundAssetKey.SFX_MACARON_AMBIENCE, sfx_macaron_ambience);
        this.game.load.audio( SoundAssetKey.SFX_MACARON_WRONG, sfx_macaron_wrong);

        this.game.load.audio( SoundAssetKey.SFX_COMBO_1, sfx_combo_1);
        this.game.load.audio( SoundAssetKey.SFX_COMBO_2, sfx_combo_2);
        this.game.load.audio( SoundAssetKey.SFX_COMBO_3, sfx_combo_3);
        this.game.load.audio( SoundAssetKey.SFX_GAME_OVER, sfx_game_over);

        this.game.load.audio( SoundAssetKey.SFX_OOPS_1, sfx_oops_1);
        this.game.load.audio( SoundAssetKey.SFX_OOPS_2, sfx_oops_2);
        this.game.load.audio( SoundAssetKey.SFX_OOPS_3, sfx_oops_3);
        this.game.load.audio( SoundAssetKey.RESTART_SOUND, sfx_retry);

    }


}


PreloadResource.instance = null;