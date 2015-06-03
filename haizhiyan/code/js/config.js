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
    //  game1: [{ question: "香港英文缩写是啥？", answers: ["A、SH", "B、HK", "C、PK", "D、我不知道~"], correctNo: 1 }, { question: "香港人是啥？", answers: ["A、答案是B", "B、答案是C", "C、A和B说谎了", "D、我不知道~"], correctNo: 3 }],
    game2: [{ question: "悉尼在哪个国家？", answers: ["A、澳大利亚", "B、奥地利", "C、中国", "D、我不知道~"], correctNo: 0 }],
}
var gameInfo = {
    game0: { Name: "sh", Position: { left: 81.5, top: 54 }, Boat: { startLeft: 75, endLeft: 75, startTop: 50, endTop: 50, inverse: 0 } },
    game1: { Name: "hk", Position: { left: 77, top: 56 }, Boat: { startLeft: 65, endLeft: 55, startTop: 50, endTop: 55, inverse: 0, a: 0.056, b: -7.2, c: 281 } },
    game2: { Name: "sy", Position: { left: 92, top: 69 }, Boat: { startLeft: 62, startTop: 55, endLeft: 80, endTop: 72, inverse: 1, a: -0.22, b: 28.53, c: -845.87 } },
    game3: { Name: "kpt", Position: { left: 44, top: 68.4 }, Boat: { startLeft: 80, endLeft: 25, startTop: 72, endTop: 77, inverse: 0, a: -0.008, b: 0.889, c: 52.85 } },
    game4: { Name: "bn", Position: { left: 21.5, top: 66 }, Boat: { startLeft: 60, endLeft: 30, startTop: 77, endTop: 74, inverse: 0, a: -0.0022, b: 0.3, c: 67 } },

    game5: { Name: "ly", Position: { left: 28, top: 58 }, Boat: { startLeft: 40, startTop: 76, endLeft: 23, endTop: 65, inverse: 0, a: 0.0461, b: -2.256, c: 92.51 } },
    game6: { Name: "ny", Position: { left: 35.5, top: 42 }, Boat: { startLeft: 22, startTop: 62, endLeft: 28, endTop: 48, inverse: 3, a: 0.1198, b: -13.63, c: 406.5 } },
    game7: { Name: "ld", Position: { left: 50.8, top: 50 }, Boat: { startLeft: 10, startTop: 45, endLeft: 58, endTop: 53, inverse: 2, a: 0.00417, b: -0.1167, c: 45.75 } },
    game8: { Name: "wns", Position: { left: 0, top: 0 }, Boat: { startLeft: 60, endLeft: 30, startTop: 77, endTop: 74, inverse: 0, a: -0.0022, b: 0.3, c: 67 } },
    game9: { Name: "ms", Position: { left: 0, top: 0 }, Boat: { startLeft: 60, endLeft: 30, startTop: 77, endTop: 74, inverse: 0, a: -0.0022, b: 0.3, c: 67 } }
}
var userInfo = {
    userId: null,
    userAllGameOk: false,
    nowUserPlayedIndex: 3,
    userGameInfo: { game0: "S", game1: "A", game2: "A", game3: "A", game4: "B", game5: "B", game6: "B", game7: "B", game8: null, game9: null },
    currentGameScore:
        {
            game0: { answerNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game1: { answerNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game2: { answerNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game3: { answerNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null }
        }



}

for (var i = 0; i < 10; i++) {
    questionInfo[i] = new Array();
    //发送请求，请求内容为城市gamei的“i”
    //返回城市gamei的十个随机题目（包括题目内容，三个选项以及正确结果，如下所示）
    for (var j = 0; j < 10; j++) {
        questionInfo[i][j] = { question: '城市I的第J个问题是什么？', answer1: "A选项", answer2: "B选项", answer3: "C选项", correctNo: 1 };
    }
}