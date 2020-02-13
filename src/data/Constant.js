export default class Constant {

    static get NEXT_DURATION()  {   return 100;}

    static get START_DELAY()  {   return 1000;}

    static get CHARACTER_START_Y()  {   return 227;}
    static get RIGHT_DURATION()     {   return 75;}

    static get CHARACTER_BTN_WIDTH() {    return 181; }
    static get CHARACTER_BTN_HEIGHT() {   return 192; }
    static get BUTTON_PREFIX() {    return "btn_"; }
    static get CHARACTER_PREFIX() { return "cha_";}


    static get MAX_CHARACTER_NUM_IN_ROW() { return 6;}

    static get ptn_1()  { return [0, 1, 0, 2] } ;
    static get ptn_2()  { return [0, 2, 0, 1] } ;
    static get ptn_6()  { return [1, 2, 0, 2] } ;

    static get ptn_3()  { return [0, 1, 0, 1] } ;
    static get ptn_4()  { return [0, 2, 0, 2] } ;
    static get ptn_5()  { return [1, 2, 1, 2] } ;



    static get ptn_7()  { return [0, 0, 0, 0] } ;
    static get ptn_8()  { return [1, 1, 1, 1] } ;
    static get ptn_9()  { return [2, 2, 2, 2] } ;

    static get ptn_21()  { return [0, 0, 1, 1] } ;
    static get ptn_22()  { return [0, 0, 2, 2] } ;
    static get ptn_23()  { return [1, 1, 2, 2] } ;
    static get ptn_24()  { return [1, 1, 0, 0] } ;
    static get ptn_25()  { return [2, 2, 0, 0] } ;
    static get ptn_26()  { return [2, 2, 1, 1] } ;
    static get ptn_27()  { return [1, 1, 0, 0] } ;
    static get ptn_28()  { return [1, 2, 3, 1, 2, 3, 1, 2, 3, 1,2,3] } ;

    static get easyPtns() {
        return [
            Constant.ptn_3, Constant.ptn_4, Constant.ptn_5,
            Constant.ptn_7, Constant.ptn_8, Constant.ptn_9,

            Constant.ptn_21, Constant.ptn_22, Constant.ptn_23, Constant.ptn_24,
            Constant.ptn_25, Constant.ptn_26, Constant.ptn_27,
            Constant.ptn_21, Constant.ptn_22, Constant.ptn_23, Constant.ptn_24,
            Constant.ptn_25, Constant.ptn_26, Constant.ptn_27,
            Constant.ptn_21, Constant.ptn_22, Constant.ptn_23, Constant.ptn_24,
            Constant.ptn_25, Constant.ptn_26, Constant.ptn_27,
            Constant.ptn_21, Constant.ptn_22, Constant.ptn_23, Constant.ptn_24,
            Constant.ptn_25, Constant.ptn_26, Constant.ptn_27,
            Constant.ptn_21, Constant.ptn_22, Constant.ptn_23, Constant.ptn_24,
            Constant.ptn_25, Constant.ptn_26, Constant.ptn_27,
            Constant.ptn_21, Constant.ptn_22, Constant.ptn_23, Constant.ptn_24,
            Constant.ptn_25, Constant.ptn_26, Constant.ptn_27
        ] ;

    }
    static get ptns() {
        return [
            Constant.ptn_1, Constant.ptn_1,
            Constant.ptn_2, Constant.ptn_2,
            Constant.ptn_6, Constant.ptn_6,

            Constant.ptn_3, Constant.ptn_3,Constant.ptn_3, Constant.ptn_3,
            Constant.ptn_4, Constant.ptn_4,Constant.ptn_4, Constant.ptn_4,
            Constant.ptn_5, Constant.ptn_5,Constant.ptn_5, Constant.ptn_5,

            Constant.ptn_3, Constant.ptn_3,Constant.ptn_3, Constant.ptn_3,
            Constant.ptn_4, Constant.ptn_4,Constant.ptn_4, Constant.ptn_4,
            Constant.ptn_5, Constant.ptn_5,Constant.ptn_5, Constant.ptn_5,

            Constant.ptn_7, Constant.ptn_7,Constant.ptn_7, Constant.ptn_7,
            Constant.ptn_8, Constant.ptn_8,Constant.ptn_8, Constant.ptn_8,
            Constant.ptn_9, Constant.ptn_9,Constant.ptn_9, Constant.ptn_9,

            Constant.ptn_21, Constant.ptn_21,Constant.ptn_27, Constant.ptn_27,
            Constant.ptn_22, Constant.ptn_22,   Constant.ptn_22, Constant.ptn_22,
            Constant.ptn_23, Constant.ptn_23, Constant.ptn_23, Constant.ptn_23,
            Constant.ptn_24, Constant.ptn_24, Constant.ptn_24, Constant.ptn_24,
            Constant.ptn_25, Constant.ptn_25,  Constant.ptn_25, Constant.ptn_25,
            Constant.ptn_26, Constant.ptn_26,Constant.ptn_26, Constant.ptn_26,

            Constant.ptn_27, Constant.ptn_27,Constant.ptn_27, Constant.ptn_27

        ];
    }

    static get scalePositions() {

        return [
            {"scale": 10 / 26, "y": 50 + 25 + 70, "railScale": 8 / 26},
            {"scale": 13 / 26, "y": 86 + 35 + 20 + 70, "railScale": 8 / 26 * 0.95},
            {"scale": 16 / 26, "y": 154 + 50 + 15 + 70, "railScale": 12 / 26 * 0.94},
            {"scale": 19 / 26, "y": 235 + 64 + 10 + 70, "railScale": 16 / 26 * 0.93},
            {"scale": 22 / 26, "y": 321 + 82 + 5 + 70, "railScale": 20 / 26 * 0.93},
            {"scale": 1, "y": 446 + 85 + 70, "railScale": 25 / 26 * 0.94}
        ];
    }
}