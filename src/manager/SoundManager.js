/**
 * Created by naver on 2017. 9. 13..
 */

import GameConfig from "../data/GameConfig";
import SoundAssetKey from "../data/SoundAssetKey";

export default class SoundManager{
    constructor(game) {
        SoundManager.instance = this;
        this._game = game;
        this._queue = {}     // key {key:Key , snd:soundObj}
    }

    intro() {

        if(GameConfig.INTRO_SND_PLAY)
        {
            this.effectSound(SoundAssetKey.GAME_INTRO, 0.8);
            GameConfig.INTRO_SND_PLAY = false;
            setTimeout(this.bgmStart, 2500, this);

        }
    }

    bgmCheck() {
        let sndKey;
        if(GameConfig.SCENE_STATE === 'intro') sndKey = SoundAssetKey.BGM_HOME;
        else sndKey = SoundAssetKey.MAIN_BGM;
        return sndKey;
    }

    bgmStart() {

       let key = this.bgmCheck;
        if(GameConfig.SCENE_STATE === 'intro') key = SoundAssetKey.BGM_HOME;
        else key = SoundAssetKey.MAIN_BGM;

        if(! GameConfig.POP_ENABLED && GameConfig.SOUND_ENABLED)
        {
            if(! SoundManager.instance._queue[key])
            {
                SoundManager.instance.play(key, true);

            }

            else
            {
                if(! SoundManager.instance._queue[key].snd.isPlaying)
                {

                    SoundManager.instance.bgmResume();
                }

            }
        }
    }


    effectSound(key, volume = 0.8) {

        // console.log(this._game.cache.checkSoundKey(key));
        if(! GameConfig.SOUND_ENABLED) return;

        if (this._queue[key])
        {

            if(this._queue[key].snd.isPlaying)
            {
                this._queue[key].snd.stop();
            }
        }
        else
        {
            this._queue[key] = {
                snd: this._game.make.audio(key, volume),
                volume: volume,
            }
        }

        this._queue[key].snd.play();

    }

    effectSoundStop(key) {

        if(SoundManager.instance._queue[key])
        {

            if(SoundManager.instance._queue[key].snd.isPlaying)
            {
                SoundManager.instance._queue[key].snd.stop();
            }
        }
    }


    allSoundPause(){

        this._game.sound.pauseAll();

    }


    bgmPause() {
        let key = this.bgmCheck();
        if(this._queue[key])
        {
            this._queue[key].snd.pause();
        }

    }

    bgmResume() {

        let key = this.bgmCheck();

        if(GameConfig.BGM_ENABLED && GameConfig.SOUND_ENABLED)
        {

            if(this._queue[key])
            {
                this._queue[key].snd.resume();

            }

            else
            {
                SoundManager.instance.play(key, true);
            }
        }


    }



    /**
     *
     * @param key : 사운드 키
     * @param loop : 계속 제생인지
     * @param volume : 볼륨은 몇인지
     * @param nextKey : 재생하고 다음에 제생할 사운드
     * @param isCompliteRemove : 재생완료후 삭제할지
     * @returns {*}
     */
    play(key, loop = false, volume = 0.7, nextKey=null, isCompleteRemove = false){
        if(! GameConfig.SOUND_ENABLED) return;

        //var snd = null;
        // console.log("play",key);


        if(this._queue[key]){
            this._queue[key].snd.play();

        }else{
            // console.log(key, volume);
            //let snd = this._game.add.audio(key, volume);
            this._queue[key] = {snd:this._game.make.audio(key, volume), loop:loop, volume:volume, nextKey:nextKey, isCompleteRemove:isCompleteRemove}

            //console.log(key)

            if(loop){
                this._queue[key].snd.loopFull();
            }else{
                if(isCompleteRemove || nextKey) {
                    // console.log("Event 추가 ", this._queue[key].snd);
                    this._queue[key].snd.onStop.add(this.onCompleteSound, this);

                }

                this._queue[key].snd.play();
                //
            }
        }
    }

    onCompleteSound(e){
        // console.log("Complite~~", e, e.key);

        let key = e.key;
        //
        if(this._queue[key]){
            // console.log(this._queue[key].nextKey);
            //
            if(this._queue[key].nextKey){
                this.play(this._queue[key].nextKey, false, 0.8, null, false)
            }
            //
            //    //this._queue[key].snd.onStop.dispose();
            //    //this._queue[key].snd.onStop.remove();
            //    this.remove(key);
            //
            if(this._queue[key].isCompleteRemove){
                this.remove(key)
            }
        }
    }

    stop(key){
        //if(this._queue[key]){
        //    this._queue[key].snd.stop();
        //}
        this.remove(key)
    }

    remove(key){
        // console.log("remove", key);
        if(!key){
            //throw "not key~~"
            return;
        }

        if(this._queue[key]){
            this._queue[key].snd.onStop.dispose();
            this._queue[key].snd.destroy();
            this._queue[key].snd = null;
            delete this._queue[key];
        }
    }


}

SoundManager.instance = null;
