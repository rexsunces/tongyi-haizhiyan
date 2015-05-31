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
            }, 600);
        }
    }
}
var gameInfo = {
    game0: { Name: "sh", Position: {left:0,top:0} },
    game1: { Name: "hk", Position: { left: 0, top: 0 } },
    game2: { Name: "sy", Position: { left: 0, top: 0 } },
    game3: { Name: "kpt", Position: { left: 18.8, top: 67 } },
    game4: { Name: "bn", Position: { left: 0, top: 0 } },
    game5: { Name: "ly", Position: { left: 0, top: 0 } },
    game6: { Name: "ny", Position: { left: 0, top: 0 } },
    game7: { Name: "ld", Position: { left: 0, top: 0 } },
    game8: { Name: "wns", Position: { left: 0, top: 0 } },
    game9: { Name: "ms", Position: { left: 0, top: 0 } }
}
var userInfo = {
    userId: null,
    userAllGameOk: false,
    nowUserPlayedIndex:3,
    userGameInfo: { game0: "S", game1: "A", game2: "A", game3: "A", game4: "B", game5: "B", game6: "B", game7: "B", game8: null, game9:null }
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
        var nowUserPlayedIndex = userInfo.nowUserPlayedIndex;//悉尼-开普敦
        //if()用户
        var slider =
          Swipe(document.getElementById('slider'), {
              auto: false,
              continuous: true,
              callback:function(index, elem) {
                  $('#position').remove();
                  $('#boat').remove();
              },
              transitionEnd: function (index, elem) {
  
                  //判断如果当前用户玩到第N张图，则在滑动到第N张时，轮船移动
                  if (index == nowUserPlayedIndex) {
                     
                      var positionImg = "<img id='position' src='img/position.png'  />";
                      $('.page-2').append(positionImg);
                      $('#position').css('left', gameInfo["game" + nowUserPlayedIndex].Position.left + '%').css('top', gameInfo["game" + nowUserPlayedIndex].Position.top + '%').css('width', 30 + 'px').css('zIndex', '999');
                      $('#position').singleTap(function () {
                          pageCtl.pageMove(pageCtl.effects.fade, "city-"+gameInfo["game"+nowUserPlayedIndex].Name);
                          setTimeout(function () {
                              pageCtl.pageMove(pageCtl.effects.fade, "question");
                              setTimeout(function () {
                                  QuestionStart();
                              }, 1000);
                          }, 1000)
                      })
                      
                      var boatImg = "<img id='boat' src='img/boat.png' style='width:39px;height:21px;top:70%;left:80%;z-index:' />";
                      $('.page-2').append(boatImg);
                      var m = $('#boat');
                      var x = 80;
                      var t = setInterval(function () {

                          var top = (-1 / 180) * x * x + (17 / 30) * x + 61;

                          $(m).css('left', x + '%').css('top', top + '%');
                          console.log($(m).css("top"));
                          x = x - 0.5;
                          if (x < gameInfo["game" + nowUserPlayedIndex].Position.left) {
                              clearInterval(t);

                          }

                      }, 10)
                  }
              }
          });

    })


})
function QuestionStart() {
    var t = setInterval(function () {

    }, 10);
}
function GetCityQuestionInfo(cityId) {
    //发送请求，请求内容为城市Id cityId，即gamei的“i”
    //返回城市cityId的十个随机题目数组（包括题目内容，三个选项以及正确结果，如下所示）
    var questions = null;//ajax返回数组questions
    for (var j = 0; j < questions.length; j++) {
        questionInfo[cityId][j] = { question: questions[j].question, answer1: questions[j].answer1, answer2: questions[j].answer2, answer3: questions[j].answer3, correctNo: questions[j].correctNo };
    }
}