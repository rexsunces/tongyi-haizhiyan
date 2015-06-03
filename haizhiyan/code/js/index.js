var pageCtl = {
    currentPageNumber: 0,

    effects: { moveUp: 1, moveDown: 2, fade: 3 },

    pageMove: function (effect, pageNumber) {
        if (!pageCtl.isAnimating) {
            pageCtl.isAnimating = true;
            var fromPage = ".page-" + pageCtl.currentPageNumber;
            var toPage = ".page-" + pageNumber;
            pageCtl.currentPageNumber = pageNumber;

            switch (effect) {
                case pageCtl.effects.fade:
                    outClass = 'ani-fadeOut';
                    inClass = 'ani-fadeIn';
                    break;
            }
            $(toPage).removeClass("hide");
            $(fromPage).addClass(outClass);
            $(toPage).addClass(inClass);

            setTimeout(function () {
                $(fromPage).removeClass('page-current');
                $(fromPage).removeClass(outClass);
                $(fromPage).addClass("hide");
                // $(fromPage).find("*").addClass("hide");
                $(toPage).addClass('page-current');
                $(toPage).removeClass(inClass);
                //$(toPage).find("*").removeClass("hide");
                pageCtl.isAnimating = false;
            }, 600);
        }
    },
    loadComplete: function () {
        pageCtl.pageMove(pageCtl.effects.fade, 1);
    }
}
var answerQuestion = new Array()
for (var i = 0; i < 9; i++) {
    answerQuestion[i] = new Array();
}
var maxQuestionIndex = 9;//每个城市最多的题目索引号，即最多10个题目
var maxWrongAnswers = 4;//最多允许答错的题目数
var currentAnswerNums = 0;//当前用户的答题数目(0-10)
var currentAnswerCorrectNums = 0;
var questionClicked = new Array();
var nowQuestion = -1;
;//answerQuestion[i][0~10];
var mapInited = false;
var timer = null;
var timer_time = {
    timer0: 0.00,
    timer1: 0.00,
    timer2: 0.00,
    timer3: 0.00,
    timer4: 0.00,
    timer5: 0.00,
    timer6: 0.00,
    timer7: 0.00,
    timer8: 0.00,
    timer9: 0.00
}
var questionInfo = {
    game0: [{ question: "上海是什么市？呵呵呵 aaaaa呵呵daddada呵呵哈哈哈sasa", answers: ["A、直辖市", "B、地级市", "C、县级市", "D、我不知道~"], correctNo: 0 },
        { question: "我是谁？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
        { question: "我是谁1？", answers: ["A、上海1", "B、上海人1", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
        { question: "我是谁？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
        { question: "我是谁？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
        { question: "我是谁？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }
    ],
    game1: [{ question: "上海是什么市？香港", answers: ["A、直辖市", "B、地级市", "C、县级市", "D、我不知道~"], correctNo: 0 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港1？", answers: ["A、上海1", "B、上海人1", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }
    ],
    game2: [{ question: "上海是什么市？悉尼", answers: ["A、直辖市", "B、地级市", "C、县级市", "D、我不知道~"], correctNo: 0 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港1？", answers: ["A、上海1", "B、上海人1", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }
    ],
    game3: [{ question: "上海是什么市？开普敦", answers: ["A、直辖市", "B、地级市", "C、县级市", "D、我不知道~"], correctNo: 0 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港1？", answers: ["A、上海1", "B、上海人1", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }
    ],
    game4: [{ question: "上海是什么市？布宜诺斯艾利斯", answers: ["A、直辖市", "B、地级市", "C、县级市", "D、我不知道~"], correctNo: 0 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港1？", answers: ["A、上海1", "B、上海人1", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }
    ],
    game5: [{ question: "上海是什么市？里约", answers: ["A、直辖市", "B、地级市", "C、县级市", "D、我不知道~"], correctNo: 0 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港1？", answers: ["A、上海1", "B、上海人1", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }
    ],
    game6: [{ question: "上海是什么市？纽约", answers: ["A、直辖市", "B、地级市", "C、县级市", "D、我不知道~"], correctNo: 0 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港1？", answers: ["A、上海1", "B、上海人1", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }
    ],
    game7: [{ question: "上海是什么市？伦敦", answers: ["A、直辖市", "B、地级市", "C、县级市", "D、我不知道~"], correctNo: 0 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港1？", answers: ["A、上海1", "B、上海人1", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }
    ],
    game8: [{ question: "上海是什么市？威尼斯", answers: ["A、直辖市", "B、地级市", "C、县级市", "D、我不知道~"], correctNo: 0 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港1？", answers: ["A、上海1", "B、上海人1", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }
    ],
    game9: [{ question: "上海是什么市？马赛", answers: ["A、直辖市", "B、地级市", "C、县级市", "D、我不知道~"], correctNo: 0 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港1？", answers: ["A、上海1", "B、上海人1", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }, { question: "上海简称是啥？", answers: ["A、呵呵", "B、小黄", "C、沪", "D、我不知道~"], correctNo: 2 },
    { question: "我是谁香港？", answers: ["A、上海", "B、上海人", "C、答案C是错的", "D、我不知道（正确）~"], correctNo: 3 }
    ]

}
var gameInfo = {
    game0: { Name: "sh", Letter: { left: 83, top: 58 }, Position: { left: 81, top: 53.5 }, Boat: { startLeft: 85, startTop: 59, endLeft: 85, endTop: 60, inverse: 0 } },
    game1: { Name: "hk", Letter: { left: 79, top: 61 }, Position: { left: 77, top: 56 }, Boat: { startLeft: 85, startTop: 59, endLeft: 76, endTop: 64, inverse: 0, a: 0.0389, b: -6.82, c: 357.4 } },
    game2: { Name: "sy", Letter: { left: 93, top: 74 }, Position: { left: 92, top: 69 }, Boat: { startLeft: 76, startTop: 64, endLeft: 82, endTop: 75.5, inverse: 1, a: -0.268, b: 37.95, c: -1255.31 } },
    game3: { Name: "kpt", Letter: { left: 45, top: 73 }, Position: { left: 44, top: 68.4 }, Boat: { startLeft: 82, startTop: 75.5, endLeft: 45, endTop: 75, inverse: 0, a: -0.0131, b: 1.6928, c: 25.386 } },
    game4: { Name: "bn", Letter: { left: 22, top: 71 }, Position: { left: 21.5, top: 66 }, Boat: { startLeft: 45, startTop: 75, endLeft: 15, endTop: 73, inverse: 0, a: -0.00889, b: 0.6, c: 66 } },
    game5: { Name: "ly", Letter: { left: 7, top: 62 }, Position: { left: 5.5, top: 57.5 }, Boat: { startLeft: 15, startTop: 73, endLeft: 5, endTop: 65, inverse: 0, a: 0, b: 0.8, c: 61 } },
    game6: { Name: "ny", Letter: { left: 13, top: 48 }, Position: { left: 12, top: 43.5 }, Boat: { startLeft: 5, startTop: 65, endLeft: 4, endTop: 50, inverse: 3, a: 0.0351, b: -3.972, c: 114.8 } },
    game7: { Name: "ld", Letter: { left: 48, top: 53 }, Position: { left: 48, top: 50 }, Boat: { startLeft: 4, startTop: 50, endLeft: 54, endTop: 52, inverse: 2, a: 0.00557, b: -0.27897, c: 50.8865 } },
    game8: { Name: "wns", Letter: { left: 40, top: 55 }, Position: { left: 39.5, top: 52.5 }, Boat: { startLeft: 54, startTop: 52, endLeft: 30, endTop: 56, inverse: 0, a: 0, b: -0.1667, c: 61 } },
    game9: { Name: "ms", Letter: { left: 43, top: 59 }, Position: { left: 42, top: 55 }, Boat: { startLeft: 30, startTop: 56, endLeft: 35, endTop: 61, inverse: 2, a: 0, b: 1, c: 26 } }
}
var userInfo = {
    userId: null,
    userAllGameOk: false,
    nowUserPlayedIndex: 0,
    userGameInfo: { game0: null, game1: null, game2: null, game3: null, game4: null, game5: null, game6: null, game7: null, game8: null, game9: null },
    currentGameScore:
        {
            game0: { answerNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game1: { answerNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game2: { answerNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game3: { answerNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game4: { answerNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game5: { answerNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game6: { answerNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game7: { answerNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game8: { answerNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game9: { answerNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null }
        }
}
var rankInfo = [
 { userId: "123", col2: '小旋风1', col3: 2, col4: 18.88, col5: 10 }, { userId: "123", col2: '小旋风2', col3: 2, col4: 18.88, col5: 10 },
 { userId: "123", col2: '小旋风3', col3: 2, col4: 18.88, col5: 10 }, { userId: "123", col2: '小旋风4', col3: 2, col4: 18.88, col5: 10 },
 { userId: "123", col2: '小旋风5', col3: 2, col4: 18.88, col5: 10 }, { userId: "123", col2: '小旋风6', col3: 2, col4: 18.88, col5: 10 },
 { userId: "123", col2: '小旋风7', col3: 2, col4: 18.88, col5: 10 }, { userId: "123", col2: '小旋风8', col3: 2, col4: 18.88, col5: 10 },
 { userId: "123", col2: '小旋风9', col3: 2, col4: 18.88, col5: 10 }, { userId: "123", col2: '小旋风10', col3: 2, col4: 18.88, col5: 10 },//col1是序号，前台生成
]

var $j;
$(function () {
    $j = jQuery.noConflict();
    $('.rule-btn').singleTap(function () {
        pageCtl.pageMove(pageCtl.effects.fade, 99);
    })
    $('.normal-return-btn').singleTap(function () {
        pageCtl.pageMove(pageCtl.effects.fade, 1);
    })
    $('.xunbao-btn').singleTap(function () {
        pageCtl.pageMove(pageCtl.effects.fade, 2);
        if (mapInited == false) {//地图还未设置，则设置地图
            setTimeout(function () {
                SetPosition();
                SetScoreAboveCity();
                SetBoatAnimation();
                mapInited = true;
            }, 600);
        }

    })
    //排行榜部分
    $('.rank-btn').singleTap(function () {
        $('.rank-table').html("");
        var myRankInfo = rankInfo;//此处的rankinfo应该是ajax获取
        var rankstr = "<tr><th class='th-xuhao'>序号</th><th class='th-normal'>昵称</th><th class='th-normal'>答题次数</th><th class='th-normal'>答题时间</th><th class='th-normal'>正确题数</th>";
        for (var i = 0; i < myRankInfo.length; i++) {
            rankstr += "<tr>" +
                "<td class='th-align-center'>" +parseInt( i + 1) +
                "</td><td class='th-align-center'>" + formatPalyerName(myRankInfo[i].col2 == null ? myRankInfo[i].userId : myRankInfo[i].col2) +
                "</td><td class='th-align-center'>" + myRankInfo[i].col3 +
                "</td><td class='th-align-center'>" + myRankInfo[i].col4 +" S"+
                "</td><td class='th-align-center'>" + myRankInfo[i].col5 +
                "</td>" +
                "</tr>";
        }
        $('.rank-table').append(rankstr);
        pageCtl.pageMove(pageCtl.effects.fade, "rank");
    })
    $('.page-rank .rank-return-btn').singleTap(function () {
        pageCtl.pageMove(pageCtl.effects.fade, 1);
    })
    $('.result-next').singleTap(function () {
        ActionPreHidePositionAndBoat();//动画优化，先隐藏船和定位标志
        userInfo.nowUserPlayedIndex = userInfo.nowUserPlayedIndex + 1;
        pageCtl.pageMove(pageCtl.effects.fade, 2);
        setTimeout(function () {
            SetPosition();
            SetScoreAboveCity();
            SetBoatAnimation();
            mapInited = true;
        }, 600);
        GameReset();
    })
    $('.result-return').singleTap(function () {
        //ActionPreHidePositionAndBoat();//动画优化，先隐藏船和定位标志
        //$('#boat').css('left', gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.startLeft + '%').css('top', gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.startTop + '%').css('width', 30 + 'px').css('zIndex', '998');
        pageCtl.pageMove(pageCtl.effects.fade, 2);
        SetPosition();
        SetScoreAboveCity();
        GameReset();
    })

    //地图上的标志点击时间
    $('.position').singleTap(function () {
        pageCtl.pageMove(pageCtl.effects.fade, "city-" + gameInfo["game" + userInfo.nowUserPlayedIndex].Name);
        setTimeout(function () {
            pageCtl.pageMove(pageCtl.effects.fade, "question");
            setTimeout(function () {
                QuestionStart();
            }, 1000);
        }, 2000)
    })


})

function GameReset() {
    currentAnswerNums = 0;//当前用户的答题数目(0-10)
    currentAnswerCorrectNums = 0;
    questionClicked = null;
    questionClicked = new Array();
}
function QuestionTimerStart() {
    timer = setInterval(function () {
        timer_time["timer" + userInfo.nowUserPlayedIndex]++;
        $('.using-time-span').text((timer_time["timer" + userInfo.nowUserPlayedIndex] / 100).toFixed(2) + "S");
    }, 10);
}
function QuestionStart() {

    GetCityQuestionInfo(userInfo.nowUserPlayedIndex);

    QuestionTimerStart();
    QuestionInit();
}

//题目生成
function QuestionInit() {

    var currentCityQuestions = questionInfo["game" + userInfo.nowUserPlayedIndex].slice(0);
    maxQuestionIndex = currentCityQuestions.length > 0 ? currentCityQuestions.length - 1 : 0;
    var perQuestion = new Array();
    var i = 0;
    while ((perQuestion = currentCityQuestions.shift()) != null) {
        if (nowQuestion == -1) {
            nowQuestion = i;
        }
        if (nowQuestion == i) {
            //var answerQuestion[userInfo.nowUserPlayedIndex][i]
            var question = "<div class='perquestion-div' id= 'question_" + i + "'><span class='question_desc'>" + (i + 1) + "、" + perQuestion.question + "</span><br /><br/>" +
                "<span id='" + i + "_" + 0 + "' class='answer' data_qid='" + i + "' data_a='0' data_correct='" + perQuestion.correctNo + "'>" + perQuestion.answers[0] + "</span><br/><br/>" +
                 "<span id='" + i + "_" + 1 + "' class='answer' data_qid='" + i + "' data_a='1' data_correct='" + perQuestion.correctNo + "'>" + perQuestion.answers[1] + "</span><br/><br/>" +
                  "<span id='" + i + "_" + 2 + "' class='answer' data_qid='" + i + "' data_a='2' data_correct='" + perQuestion.correctNo + "'>" + perQuestion.answers[2] + "</span><br/><br/>" +
                   "<span id='" + i + "_" + 3 + "' class='answer' data_qid='" + i + "' data_a='3' data_correct='" + perQuestion.correctNo + "'>" + perQuestion.answers[3] + "</span><br/><br/></div>";
            $('.question-div-text').append(question);
        }
        else {
            var question = "<div class='hide perquestion-div' id='question_" + i + "'><span class='question_desc'>" + (i + 1) + "、" + perQuestion.question + "</span><br /><br/>" +
                "<span id='" + i + "_" + 0 + "' class='answer' data_qid='" + i + "' data_a='0' data_correct='" + perQuestion.correctNo + "'>" + perQuestion.answers[0] + "</span><br/><br/>" +
                 "<span id='" + i + "_" + 1 + "' class='answer' data_qid='" + i + "' data_a='1' data_correct='" + perQuestion.correctNo + "'>" + perQuestion.answers[1] + "</span><br/><br/>" +
                  "<span id='" + i + "_" + 2 + "' class='answer' data_qid='" + i + "' data_a='2' data_correct='" + perQuestion.correctNo + "'>" + perQuestion.answers[2] + "</span><br/><br/>" +
                   "<span id='" + i + "_" + 3 + "' class='answer' data_qid='" + i + "' data_a='3' data_correct='" + perQuestion.correctNo + "'>" + perQuestion.answers[3] + "</span><br/><br/></div>";
            $('.question-div-text').append(question);
        }
        i++;
    }
    $('.question-div').css("height", $('.question-div-text').height() + "px");
    $('.answer').each(function () {
        $(this).singleTap(function () {
            if (questionClicked[$(this).attr("id")] == 1) {
                return false;
            }
            if (questionClicked[$(this).attr("id")] == null) {
                questionClicked[$(this).attr("id")] = 1;
            }
            $(this).addClass("bolder");
            currentAnswerNums++;
            var nowQuestionId = $(this).attr("data_qid");

            var nextQuestionId = parseInt(nowQuestionId) + 1;

            if ($(this).attr("data_a") == $(this).attr("data_correct")) {
                currentAnswerCorrectNums++;
                SetUserCurrentScore(currentAnswerNums, currentAnswerCorrectNums, timer_time["timer" + userInfo.nowUserPlayedIndex]);
                $(this).append("<font style='color:green;font-weight:bolder'>&nbsp;√</font>");
                setTimeout(function () {
                    if (nextQuestionId > maxQuestionIndex) {
                        ActionAnswerAll();
                        return false;
                    }
                    else {
                        $('#question_' + nowQuestionId).addClass("hide");
                        $('#question_' + nextQuestionId).removeClass("hide");
                        $('.question-div').css("height", $('.question-div-text').height() + "px");
                    }
                }, 300);

            }
            else {
                SetUserCurrentScore(currentAnswerNums, currentAnswerCorrectNums, timer_time["timer" + userInfo.nowUserPlayedIndex]);
                $(this).append("<font style='color:red;font-weight:bolder'>&nbsp;×</font>");
                setTimeout(function () {
                    if (nextQuestionId > maxQuestionIndex) {
                        ActionAnswerAll();
                        return false;
                    }
                    else {
                        $('#question_' + nowQuestionId).addClass("hide");
                        $('#question_' + nextQuestionId).removeClass("hide");
                        $('.question-div').css("height", $('.question-div-text').height() + "px");
                    }

                }, 300);
            }
        })
    })
}

function SetUserCurrentScore(answerNums, answerCorrectNums, answerTime) {
    userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].answerNums = answerNums;
    userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].answerTime = (answerTime / 100).toFixed(2);
}
function GetCityQuestionInfo(cityId) {
    $('.testend').text("[测试]第" + cityId + "个城市的十个题目，点击进入下一步");
    //发送请求，请求内容为城市Id cityId，即gamei的“i”
    //返回城市cityId的十个随机题目数组（包括题目内容，三个选项以及正确结果，如下所示）
    var questions = new Array;//ajax返回数组questions
    for (var j = 0; j < questions.length; j++) {
        questionInfo[cityId][j] = { question: questions[j].question, answer1: questions[j].answer1, answer2: questions[j].answer2, answer3: questions[j].answer3, correctNo: questions[j].correctNo };
    }
}

//答题10道完毕
function ActionAnswerAll() {
    clearInterval(timer);
    $('.using-time-span').text("0.00S");
    timer_time["timer" + userInfo.nowUserPlayedIndex] = 0;
    $('.question-div-text').html("");
    if (currentAnswerCorrectNums < 6) {
        alert("你总共答对了" + currentAnswerCorrectNums + "题，答对6题可以进入下一关！");
        pageCtl.pageMove(pageCtl.effects.fade, 2);
        SetScoreAboveCity();
        SetPosition();
        GameReset();
    }
    else {
        userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].answerCorrectRate = (currentAnswerCorrectNums / (maxQuestionIndex + 1)).toFixed(2);
        //根据算法求得等级
        var level = "";
        var _time = userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].answerTime;
        //测试算法：
        if (_time < 2) {
            level = "S";
        }
        else if (_time < 10) {
            level = "A";
        }
        else if (_time < 15) {
            level = "B";
        }
        else if (_time < 20) {
            level = "C";
        }
        else if (_time < 25) {
            level = "D";
        }
        else {
            level = "E";
        }
        userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].scoreLevel = level;
        //上传分数
        //ajax
        /* 
        //正确率
        userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].answerCorrectRate
        //总共答题数目（无意义，都为10）
        userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].answerNums
        //答题时间，格式：10.00
        userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].answerTime
        //经计算的level级别 SABCDE
        userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].scoreLevel
        */

        //ajax发送成功后，对当前信息进行更新，更新最新城市的成绩
        userInfo.userGameInfo["game" + userInfo.nowUserPlayedIndex] = userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].scoreLevel;
        ShowResult();
    }
}
//显示结果
function ShowResult() {
    var level = userInfo.userGameInfo["game" + userInfo.nowUserPlayedIndex];
    $(".result-board").attr("src", "img/result-board-" + level + ".png");
    $(".result-letter").attr("src", "img/result-" + level + ".png");
    pageCtl.pageMove(pageCtl.effects.fade, "result");
}


/************************** new, no swipe **********************/

function ActionPreHidePositionAndBoat() {
    $j('.position').css("opacity", "0");
    $j('.page-2 .boat').css("opacity", "0");
}

function SetPosition() {
    $('.position').css('left', gameInfo["game" + userInfo.nowUserPlayedIndex].Position.left + '%').css('top', gameInfo["game" + userInfo.nowUserPlayedIndex].Position.top + '%');
    $j('.position').animate({
        opacity: 1
    }, 500, 'linear');
}
function SetScoreAboveCity() {
    var level = "";
    for (var i = 0; i < 10; i++) {
        if ((level = userInfo.userGameInfo["game" + i]) != null) {
            if ($('#letter-game-' + i).size() == 0) {
                var letter = "<img id='letter-game-" + i + "' class='letter' src='img/letter-" + level + ".png'/>";
                $('.page-2').append($(letter));
            }
            else {

            }
            $('#letter-game-' + i).css('left', gameInfo["game" + i].Letter.left + '%').css('top', gameInfo["game" + i].Letter.top + '%');
            //if (i == userInfo.nowUserPlayedIndex) {//避免等级图片和标志重合
            //    $('.position').css('left', (parseInt($('.position').css("left").substring(0, $('.position').css("left").indexOf("%"))) - 3) + "%");
            //}
            $j('#letter-game-' + i).animate({
                opacity: 1
            }, 500, 'linear');
        }
    }
}
function SetBoatAnimation() {
    $('.page-2 .boat').css('left', gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.startLeft + '%').css('top', gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.startTop + '%')
    $j('.page-2 .boat').animate({
        opacity: 1
    }, 500, 'linear');
    setTimeout(function () {
        if (gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.inverse == 0) {//x从大到小
            var m = $('.page-2 .boat');
            var x = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.startLeft;
            var a = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.a;
            var b = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.b;
            var c = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.c;

            var t = setInterval(function () {
                var top = a * x * x + b * x + c;
                $(m).css('left', x + '%').css('top', top + '%');
                x = x - 0.1;
                if (x < gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.endLeft) {
                    clearInterval(t);
                }
            }, 10)
        }
        else if (gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.inverse == 1) {//y变为x，从小到大
            var m = $('.page-2 .boat');
            var y = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.startTop;
            var a = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.a;
            var b = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.b;
            var c = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.c;

            var t = setInterval(function () {
                var left = a * y * y + b * y + c;
                $(m).css('left', left + '%').css('top', y + '%');
                y = y + 0.05;
                if (y > gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.endTop) {
                    clearInterval(t);
                }

            }, 10)
        }
        else if (gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.inverse == 2) {//x从小到大
            var m = $('.page-2 .boat');
            var x = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.startLeft;
            var a = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.a;
            var b = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.b;
            var c = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.c;

            var t = setInterval(function () {
                var top = a * x * x + b * x + c;
                $(m).css('left', x + '%').css('top', top + '%');
                x = x + 0.1;
                if (x > gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.endLeft) {
                    clearInterval(t);
                }
            }, 10)
        }
        else if (gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.inverse == 3) {//y变为x，从大到小
            var m = $('.page-2 .boat');
            var y = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.startTop;
            var a = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.a;
            var b = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.b;
            var c = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.c;

            var t = setInterval(function () {
                var left = a * y * y + b * y + c;
                $(m).css('left', left + '%').css('top', y + '%');
                y = y - 0.05;
                if (y < gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.endTop) {
                    clearInterval(t);
                }

            }, 10)
        }
    }, 500);

}


/////////////////////////
function formatPalyerName(strName) {
    var lengthx2 = 4;
    var j = 0;
    var str = "";
    if (strlen(strName) > 6) {
        // return strName.substr(0, 4) + '...';
        for (var i = 0; i < strName.length; i++) {

            if (j <= lengthx2) {
                var c = strName.charCodeAt(i);
                if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                    j++;
                    str = str + strName[i];
                }
                else {
                    j = j + 2;
                    str = str + strName[i];
                }
            }
            else {
                str = str + "...";
                break;
            }
        }
        return str;
    }
    else {
        return strName;
    }

}
function strlen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1 
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        }
        else {
            len += 2;
        }
    }
    return len;
}