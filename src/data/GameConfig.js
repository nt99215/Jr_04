let currentScene = null;
let introSnd = true;
let pause = true;
let device;
let scene = '';
let reset;
let soundEnabled = true;
let bgmEnabled = true;
let mainController;
let tutorialDisabled = false;
let pop = false;
let finish = false;
let currentScore = 0;
let maxVisibleCharacter = 6;
// let bestTime = 90;
let bestTime = 90;
let resultTime = 0;
// let goalScore = 100;
let goalScore = 100;
let objectScale = 0.85;
let shakeEnabled = true;  //camera shake
let inGameTimerEnabled = false;
let helpBtn = null;
let timerObj = null;
const appUrl = 'https://jr.msdl.naver.com/jrapp?cmd=close&type=webview&version=1';
const appEnabledString = 'app';
const webEnabledString = 'web';
let appEnabled = false;
let mobileDirection = -90;


export default class GameConfig {

    static get INTRO_SND_PLAY() {return introSnd; }
    static set INTRO_SND_PLAY(bool) {introSnd = bool; }
    static get CURRENT_SCENE() { return currentScene}
    static set CURRENT_SCENE(obj){currentScene = obj; }
    static get GAME_RESET() { return reset;}
    static set GAME_RESET(bool) { reset = bool;}
    static get SCENE_STATE() { return scene; }
    static set SCENE_STATE(str) {scene = str; }

    static get IN_GAME() { return pause; }
    static set IN_GAME(bool) { return pause = bool; }

    static get USE_SAD_TWEEN()     {   return false;}
    static get COMBO() {   return 4;  }
    static get WRONG_DURATION()     {   return 500;}

    static get GAME_DURATION()      {   return 30;  }
    static get FEVER_COMBO() {   return 8;  }
    static get RIGHT_SCORE() {  return 100 ;    }
    static get FEVER_RIGHT_SCORE() {   return 200;  }

    static get SOUND_ENABLED() {return soundEnabled; }
    static set SOUND_ENABLED(bool) {soundEnabled = bool; }

    static get BGM_ENABLED() {return bgmEnabled; }
    static set BGM_ENABLED(bool) {bgmEnabled = bool; }

    static get CURRENT_DEVICE()  { return device; }
    static set CURRENT_DEVICE(str)  { device = str; }

    static get MAIN_CONTROLLER() { return mainController; }
    static set MAIN_CONTROLLER(obj) { mainController = obj; }

    static get TUTORIAL_DISABLED() {return tutorialDisabled ; }
    static set TUTORIAL_DISABLED(bool) {tutorialDisabled = bool;}

    static get POP_ENABLED() { return pop;}
    static set POP_ENABLED(bool) { pop = bool; }

    static get GAME_FINISH() { return finish; }
    static set GAME_FINISH(bool) { finish = bool; }

    static get CURRENT_SCORE() { return currentScore;}
    static set CURRENT_SCORE(num) { currentScore +=num;}

    static get GOAL_SCORE() { return goalScore;}

    static get MAX_VISIBLE_CHARACTER() { return maxVisibleCharacter;}

    static get BEST_TIME() { return bestTime;}

    static get RESULT_TIME() { return resultTime;}
    static set RESULT_TIME(num) { resultTime = num;}

    static get INGAME_TIMER_ENABLED() { return inGameTimerEnabled;}



    static get SHAKE_ENABLED() { return shakeEnabled; }
    static set SHAKE_ENABLED(bool) { shakeEnabled = bool; }

    static get OBJECT_SCALE() { return objectScale; }

    static get HELP_BUTTON() { return helpBtn; }
    static set HELP_BUTTON(obj) { helpBtn = obj; }

    static get TIMER_OBJECT() { return timerObj; }
    static set TIMER_OBJECT(obj) { timerObj = obj; }

    static get CHECK_APP_STRING() { return appEnabledString; }
    static get CHECK_WEB_STRING() { return webEnabledString; }
    static get APP_URL() { return appUrl; }

    static get MOBILE_DIRECTION() { return mobileDirection; }
    static set MOBILE_DIRECTION(ang) { mobileDirection = ang; }

    static get APP_ENBLED() { return appEnabled; }
    static set APP_ENBLED(bool) { appEnabled = bool; }


}

