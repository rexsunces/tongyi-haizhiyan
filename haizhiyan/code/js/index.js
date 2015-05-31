var pageCtl = {
    currentPageNumber: 1,

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
                $(fromPage).find("*").addClass("hide");

                $(toPage).addClass('page-current');
                $(toPage).removeClass(inClass);
                $(toPage).find("*").removeClass("hide");

                pageCtl.isAnimating = false;
            }, 300);
        }
    }
}
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
var gameInfo = {
    game0: { Name: "sh", Position: { left: 67, top: 47 }, Boat: { startLeft: 75, endLeft: 75, startTop: 50, endTop: 50 } },
    game1: { Name: "hk", Position: { left: 61, top: 51 }, Boat: { startLeft: 65, endLeft: 55, startTop: 50, endTop: 55, a: 0.056, b: -7.2, c: 281 } },
    game2: { Name: "sy", Position: { left: 75, top: 69 }, Boat: { startLeft: 62, startTop: 55, endLeft: 80, endTop: 72, inverse: 1, a: -0.22, b: 28.53, c: -845.87 } },
    game3: { Name: "kpt", Position: { left: 18.8, top: 67 }, Boat: { startLeft: 80, endLeft: 25, startTop: 72, endTop: 77, a: -0.008, b: 0.889, c: 52.85 } },
    game4: { Name: "bn", Position: { left: 34, top: 67 } },
    game5: { Name: "ly", Position: { left: 0, top: 0 } },
    game6: { Name: "ny", Position: { left: 0, top: 0 } },
    game7: { Name: "ld", Position: { left: 0, top: 0 } },
    game8: { Name: "wns", Position: { left: 0, top: 0 } },
    game9: { Name: "ms", Position: { left: 0, top: 0 } }
}
var userInfo = {
    userId: null,
    userAllGameOk: false,
    nowUserPlayedIndex: 0,
    userGameInfo: { game0: "S", game1: "A", game2: "A", game3: "A", game4: "B", game5: "B", game6: "B", game7: "B", game8: null, game9: null }
}
var questionInfo = new Array();
for (var i = 0; i < 10; i++) {
    questionInfo[i] = new Array();
    //发送请求，请求内容为城市gamei的“i”
    //返回城市gamei的十个随机题目（包括题目内容，三个选项以及正确结果，如下所示）
    for (var j = 0; j < 10; j++) {
        questionInfo[i][j] = { question: '城市I的第J个问题是什么？', answer1: "A选项", answer2: "B选项", answer3: "C选项", correctNo: 1 };
    }
}
$(function () {
    $('.rule-btn').singleTap(function () {
        pageCtl.pageMove(pageCtl.effects.fade, 99);
    })
    $('.normal-return-btn').singleTap(function () {
        pageCtl.pageMove(pageCtl.effects.fade, 1);
    })
    $('.xunbao-btn').singleTap(function () {
        pageCtl.pageMove(pageCtl.effects.fade, 2);

        InitCurrentMap();


    })

    $('.testend').singleTap(function () {
        clearInterval(timer);
        $('.using-time-span').text("0.00S");
        timer_time["timer" + userInfo.nowUserPlayedIndex] = 0;
        pageCtl.pageMove(pageCtl.effects.fade, "result");
    })

    $('.result-next').singleTap(function () {
        userInfo.nowUserPlayedIndex = userInfo.nowUserPlayedIndex + 1;
        pageCtl.pageMove(pageCtl.effects.fade, 2);
        mySwipe.next()
        SetBoatAndPosition();

        // InitCurrentMap();
    })
    $('.result-return').singleTap(function () {
        pageCtl.pageMove(pageCtl.effects.fade, 2);
        SetBoatAndPosition();
        // InitCurrentMap();
    })


})
function QuestionTimerStart() {
    timer = setInterval(function () {
        timer_time["timer" + userInfo.nowUserPlayedIndex]++;
        $('.using-time-span').text((timer_time["timer" + userInfo.nowUserPlayedIndex] / 100).toFixed(2) + "S");
    }, 10);
}
function QuestionStart() {

    GetCityQuestionInfo(userInfo.nowUserPlayedIndex);
    QuestionTimerStart();
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
function InitCurrentMap() {
    SetBoatAndPosition();
    window.mySwipe = new Swipe(document.getElementById('slider'), {
        startSlide: userInfo.nowUserPlayedIndex,
        auto: false,
        continuous: true,
        callback: function (index, elem) {
            $('#position').remove();
            $('#boat').remove();
        },
        transitionEnd: function (index, elem) {
            $('#position').remove();
            $('#boat').remove();
            //判断如果当前用户玩到第N张图，则在滑动到第N张时，轮船移动

            if (index == userInfo.nowUserPlayedIndex) {
                SetBoatAndPosition();
            }
        }
    });
}
function SetBoatAndPosition() {
    $('#position').remove();
    $('#boat').remove();
    var positionImg = "<img id='position' src='img/position.png'  />";
    $('.page-2').append(positionImg);
    $('#position').css('left', gameInfo["game" + userInfo.nowUserPlayedIndex].Position.left + '%').css('top', gameInfo["game" + userInfo.nowUserPlayedIndex].Position.top + '%').css('width', 30 + 'px').css('zIndex', '999');
    $('#position').singleTap(function () {
        pageCtl.pageMove(pageCtl.effects.fade, "city-" + gameInfo["game" + userInfo.nowUserPlayedIndex].Name);
        setTimeout(function () {
            pageCtl.pageMove(pageCtl.effects.fade, "question");
            setTimeout(function () {
                QuestionStart();
            }, 1000);
        }, 2000)
    })

    var boatImg = "<img id='boat' src='img/boat.png' style='width:39px;height:21px;z-index:' />";
    if (gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.inverse == 1) {
        $('.page-2').append(boatImg);
        var m = $('#boat');
        var y = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.startTop;
        var a = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.a;
        var b = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.b;
        var c = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.c;
        var t = setInterval(function () {

            var left = a * y * y + b * y + c;

            $(m).css('left', left + '%').css('top', y + '%');

            y = y + 0.1;
            if (y > gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.endTop) {
                clearInterval(t);


            }

        }, 10)
    }
    else {
        $('.page-2').append(boatImg);
        var m = $('#boat');
        var x = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.startLeft;
        $(m).css('left', x + '%').css('top', gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.startTop + '%');
        var a = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.a;
        var b = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.b;
        var c = gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.c;
        var t = setInterval(function () {
            x = x - 0.1;
            var top = a * x * x + b * x + c;
            if (x < gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.endLeft) {
                clearInterval(t);


            }
            $(m).css('left', x + '%').css('top', top + '%');
        }, 10)
    }
}