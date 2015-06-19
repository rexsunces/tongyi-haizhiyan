var answerQuestion = new Array()
for (var i = 0; i < 9; i++) {
    answerQuestion[i] = new Array();
}
var questionStartFlag = false;
var maxTotalQuestions = 15;//每个城市最多存在的题目，应该是15个
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
    game0: [{ question: "中国·上海的美称是什么？", answers: ["A: 东方巴黎", "B：东方明珠", "C：东方魔都"], correctNo: 0 },
        { question: "中国最大的外贸港口是哪个城市？", answers: ["A：天津", "B：上海", "C：青岛"], correctNo: 1 }, { question: "统一海之言绿色瓶装的是什么口味？", answers: ["A：西柚味", "B：柠檬味", "C：卡曼橘味"], correctNo: 2 },
        { question: "以下哪一个是上海新八景？", answers: ["A：海天旭日", "B：黄浦秋涛", "C：十里霓虹"], correctNo: 2 }, { question: "“豆蔻”是指多少岁？", answers: ["A：13岁", "B：15岁", "C：20岁"], correctNo: 0 },
        { question: "“四羊方尊”是哪个朝代的文物？", answers: ["A：周", "B：商", "C：夏"], correctNo: 1 }, { question: "以下哪个是上海老八景？", answers: ["A：外滩晨钟", "B：摩天览胜", "C：龙华晚钟"], correctNo: 2 },
        { question: "《登高》是唐代哪位诗人所写的？", answers: ["A：李白", "B：杜甫", "C：王维"], correctNo: 1 }, { question: "下面不是“四书”的是哪一个？", answers: ["A：《尚书》", "B：《大学》", "C：《孟子》"], correctNo: 0 },
        { question: "下列传统节日中，哪一个是来源于二十四节气？", answers: ["A：元宵节", "B：中秋节", "C：清明节"], correctNo: 2 }, { question: "下列文学家中，不属于“唐宋八大家”的是？", answers: ["A：王勃", "B：柳宗元", "C：王安石"], correctNo: 0 },
        { question: "下面哪个字常用作表示顺序的第五位？", answers: ["A：戌", "B：戊", "C：戍"], correctNo: 1 }, { question: "戛纳电影节在哪国举办？", answers: ["A：英国", "B：美国", "C：法国"], correctNo: 2 },
        { question: "六一居士”是谁的别号？", answers: ["A：欧阳修", "B：关汉卿", "C：李清照"], correctNo: 0 }, { question: "《本草纲目》的作者是谁？", answers: ["A：华佗", "B：李时珍", "C：扁鹊"], correctNo: 1 }
    ],
    game1: [{ question: "下面哪个城市没有纽伦港美称？", answers: ["A：中国香港", "B：英国伦敦", "C：法国巴黎"], correctNo: 2 },
        { question: "以下哪个不是中国香港的美誉之称？", answers: ["A：东方之珠", "B：狂欢之城", "C：购物天堂"], correctNo: 1 }, { question: "统一海之言粉红色瓶装的是什么口味？", answers: ["A：西柚味", "B：柠檬味", "C：卡曼橘味"], correctNo: 0 },
        { question: "以下哪一个不是香港八景？", answers: ["A：快活啼声", "B：旗山星火", "C：石梁月夜"], correctNo: 2 }, { question: "猫在哪个国家内受到严格保护？", answers: ["A：古埃及", "B：中国", "C：波兰"], correctNo: 0 },
        { question: "水在摄氏多少度时密度最大？", answers: ["A：3度", "B：4度", "C：5度"], correctNo: 1 }, { question: "“腊八粥”最早起源于？", answers: ["A：基督教", "B：伊斯兰教", "C：佛教"], correctNo: 2 },
        { question: "太阳系中最大的行星是哪个？", answers: ["A：土星", "B：木星", "C：金星"], correctNo: 1 }, { question: "举重比赛中，最重的杠铃片是哪个？", answers: ["A：红色的", "B：蓝色的", "C：黄色的"], correctNo: 0 },
        { question: "血液中的红细胞可以活多少天？", answers: ["A：100天", "B：110天", "C：120天"], correctNo: 2 }, { question: "冬季奥运会如何计算届次？", answers: ["A：3年1次", "B：5年2次", "C：4年1次"], correctNo: 2 },
        { question: "连接深圳与香港的边界桥叫什么？", answers: ["A：深圳桥", "B：罗湖桥", "C：深港桥"], correctNo: 1 }, { question: "在香港上市的内地公司股票称为？", answers: ["A：港股", "B：普通股", "C：红筹股"], correctNo: 2 },
        { question: "下面哪首歌不是香港乐队beyond的作品？", answers: ["A：永远不回头", "B：海阔天空", "C：真的爱你"], correctNo: 0 }, { question: "香港第二任行政长官选举于2002年几月举行？", answers: ["A：1月", "B：3月", "C：5月"], correctNo: 1 }
    ],
    game2: [{ question: "下面哪个城市没有纽伦港美称？", answers: ["A：中国香港", "B：英国伦敦", "C：法国巴黎"], correctNo: 2 },
        { question: "以下哪个不是中国香港的美誉之称？", answers: ["A：东方之珠", "B：狂欢之城", "C：购物天堂"], correctNo: 1 }, { question: "统一海之言粉红色瓶装的是什么口味？", answers: ["A：西柚味", "B：柠檬味", "C：卡曼橘味"], correctNo: 0 },
        { question: "以下哪一个不是香港八景？", answers: ["A：快活啼声", "B：旗山星火", "C：石梁月夜"], correctNo: 2 }, { question: "猫在哪个国家内受到严格保护？", answers: ["A：古埃及", "B：中国", "C：波兰"], correctNo: 0 },
        { question: "水在摄氏多少度时密度最大？", answers: ["A：3度", "B：4度", "C：5度"], correctNo: 1 }, { question: "“腊八粥”最早起源于？", answers: ["A：基督教", "B：伊斯兰教", "C：佛教"], correctNo: 2 },
        { question: "太阳系中最大的行星是哪个？", answers: ["A：土星", "B：木星", "C：金星"], correctNo: 1 }, { question: "举重比赛中，最重的杠铃片是哪个？", answers: ["A：红色的", "B：蓝色的", "C：黄色的"], correctNo: 0 },
        { question: "血液中的红细胞可以活多少天？", answers: ["A：100天", "B：110天", "C：120天"], correctNo: 2 }, { question: "冬季奥运会如何计算届次？", answers: ["A：3年1次", "B：5年2次", "C：4年1次"], correctNo: 2 },
        { question: "连接深圳与香港的边界桥叫什么？", answers: ["A：深圳桥", "B：罗湖桥", "C：深港桥"], correctNo: 1 }, { question: "在香港上市的内地公司股票称为？", answers: ["A：港股", "B：普通股", "C：红筹股"], correctNo: 2 },
        { question: "下面哪首歌不是香港乐队beyond的作品？", answers: ["A：永远不回头", "B：海阔天空", "C：真的爱你"], correctNo: 0 }, { question: "香港第二任行政长官选举于2002年几月举行？", answers: ["A：1月", "B：3月", "C：5月"], correctNo: 1 }
    ],
    game3: [{ question: "下面哪个城市没有纽伦港美称？", answers: ["A：中国香港", "B：英国伦敦", "C：法国巴黎"], correctNo: 2 },
        { question: "以下哪个不是中国香港的美誉之称？", answers: ["A：东方之珠", "B：狂欢之城", "C：购物天堂"], correctNo: 1 }, { question: "统一海之言粉红色瓶装的是什么口味？", answers: ["A：西柚味", "B：柠檬味", "C：卡曼橘味"], correctNo: 0 },
        { question: "以下哪一个不是香港八景？", answers: ["A：快活啼声", "B：旗山星火", "C：石梁月夜"], correctNo: 2 }, { question: "猫在哪个国家内受到严格保护？", answers: ["A：古埃及", "B：中国", "C：波兰"], correctNo: 0 },
        { question: "水在摄氏多少度时密度最大？", answers: ["A：3度", "B：4度", "C：5度"], correctNo: 1 }, { question: "“腊八粥”最早起源于？", answers: ["A：基督教", "B：伊斯兰教", "C：佛教"], correctNo: 2 },
        { question: "太阳系中最大的行星是哪个？", answers: ["A：土星", "B：木星", "C：金星"], correctNo: 1 }, { question: "举重比赛中，最重的杠铃片是哪个？", answers: ["A：红色的", "B：蓝色的", "C：黄色的"], correctNo: 0 },
        { question: "血液中的红细胞可以活多少天？", answers: ["A：100天", "B：110天", "C：120天"], correctNo: 2 }, { question: "冬季奥运会如何计算届次？", answers: ["A：3年1次", "B：5年2次", "C：4年1次"], correctNo: 2 },
        { question: "连接深圳与香港的边界桥叫什么？", answers: ["A：深圳桥", "B：罗湖桥", "C：深港桥"], correctNo: 1 }, { question: "在香港上市的内地公司股票称为？", answers: ["A：港股", "B：普通股", "C：红筹股"], correctNo: 2 },
        { question: "下面哪首歌不是香港乐队beyond的作品？", answers: ["A：永远不回头", "B：海阔天空", "C：真的爱你"], correctNo: 0 }, { question: "香港第二任行政长官选举于2002年几月举行？", answers: ["A：1月", "B：3月", "C：5月"], correctNo: 1 }
    ],
    game4: [{ question: "下面哪个城市没有纽伦港美称？", answers: ["A：中国香港", "B：英国伦敦", "C：法国巴黎"], correctNo: 2 },
        { question: "以下哪个不是中国香港的美誉之称？", answers: ["A：东方之珠", "B：狂欢之城", "C：购物天堂"], correctNo: 1 }, { question: "统一海之言粉红色瓶装的是什么口味？", answers: ["A：西柚味", "B：柠檬味", "C：卡曼橘味"], correctNo: 0 },
        { question: "以下哪一个不是香港八景？", answers: ["A：快活啼声", "B：旗山星火", "C：石梁月夜"], correctNo: 2 }, { question: "猫在哪个国家内受到严格保护？", answers: ["A：古埃及", "B：中国", "C：波兰"], correctNo: 0 },
        { question: "水在摄氏多少度时密度最大？", answers: ["A：3度", "B：4度", "C：5度"], correctNo: 1 }, { question: "“腊八粥”最早起源于？", answers: ["A：基督教", "B：伊斯兰教", "C：佛教"], correctNo: 2 },
        { question: "太阳系中最大的行星是哪个？", answers: ["A：土星", "B：木星", "C：金星"], correctNo: 1 }, { question: "举重比赛中，最重的杠铃片是哪个？", answers: ["A：红色的", "B：蓝色的", "C：黄色的"], correctNo: 0 },
        { question: "血液中的红细胞可以活多少天？", answers: ["A：100天", "B：110天", "C：120天"], correctNo: 2 }, { question: "冬季奥运会如何计算届次？", answers: ["A：3年1次", "B：5年2次", "C：4年1次"], correctNo: 2 },
        { question: "连接深圳与香港的边界桥叫什么？", answers: ["A：深圳桥", "B：罗湖桥", "C：深港桥"], correctNo: 1 }, { question: "在香港上市的内地公司股票称为？", answers: ["A：港股", "B：普通股", "C：红筹股"], correctNo: 2 },
        { question: "下面哪首歌不是香港乐队beyond的作品？", answers: ["A：永远不回头", "B：海阔天空", "C：真的爱你"], correctNo: 0 }, { question: "香港第二任行政长官选举于2002年几月举行？", answers: ["A：1月", "B：3月", "C：5月"], correctNo: 1 }
    ],
    game5: [{ question: "下面哪个城市没有纽伦港美称？", answers: ["A：中国香港", "B：英国伦敦", "C：法国巴黎"], correctNo: 2 },
         { question: "以下哪个不是中国香港的美誉之称？", answers: ["A：东方之珠", "B：狂欢之城", "C：购物天堂"], correctNo: 1 }, { question: "统一海之言粉红色瓶装的是什么口味？", answers: ["A：西柚味", "B：柠檬味", "C：卡曼橘味"], correctNo: 0 },
         { question: "以下哪一个不是香港八景？", answers: ["A：快活啼声", "B：旗山星火", "C：石梁月夜"], correctNo: 2 }, { question: "猫在哪个国家内受到严格保护？", answers: ["A：古埃及", "B：中国", "C：波兰"], correctNo: 0 },
         { question: "水在摄氏多少度时密度最大？", answers: ["A：3度", "B：4度", "C：5度"], correctNo: 1 }, { question: "“腊八粥”最早起源于？", answers: ["A：基督教", "B：伊斯兰教", "C：佛教"], correctNo: 2 },
         { question: "太阳系中最大的行星是哪个？", answers: ["A：土星", "B：木星", "C：金星"], correctNo: 1 }, { question: "举重比赛中，最重的杠铃片是哪个？", answers: ["A：红色的", "B：蓝色的", "C：黄色的"], correctNo: 0 },
         { question: "血液中的红细胞可以活多少天？", answers: ["A：100天", "B：110天", "C：120天"], correctNo: 2 }, { question: "冬季奥运会如何计算届次？", answers: ["A：3年1次", "B：5年2次", "C：4年1次"], correctNo: 2 },
         { question: "连接深圳与香港的边界桥叫什么？", answers: ["A：深圳桥", "B：罗湖桥", "C：深港桥"], correctNo: 1 }, { question: "在香港上市的内地公司股票称为？", answers: ["A：港股", "B：普通股", "C：红筹股"], correctNo: 2 },
         { question: "下面哪首歌不是香港乐队beyond的作品？", answers: ["A：永远不回头", "B：海阔天空", "C：真的爱你"], correctNo: 0 }, { question: "香港第二任行政长官选举于2002年几月举行？", answers: ["A：1月", "B：3月", "C：5月"], correctNo: 1 }
    ],
    game6: [{ question: "下面哪个城市没有纽伦港美称？", answers: ["A：中国香港", "B：英国伦敦", "C：法国巴黎"], correctNo: 2 },
        { question: "以下哪个不是中国香港的美誉之称？", answers: ["A：东方之珠", "B：狂欢之城", "C：购物天堂"], correctNo: 1 }, { question: "统一海之言粉红色瓶装的是什么口味？", answers: ["A：西柚味", "B：柠檬味", "C：卡曼橘味"], correctNo: 0 },
        { question: "以下哪一个不是香港八景？", answers: ["A：快活啼声", "B：旗山星火", "C：石梁月夜"], correctNo: 2 }, { question: "猫在哪个国家内受到严格保护？", answers: ["A：古埃及", "B：中国", "C：波兰"], correctNo: 0 },
        { question: "水在摄氏多少度时密度最大？", answers: ["A：3度", "B：4度", "C：5度"], correctNo: 1 }, { question: "“腊八粥”最早起源于？", answers: ["A：基督教", "B：伊斯兰教", "C：佛教"], correctNo: 2 },
        { question: "太阳系中最大的行星是哪个？", answers: ["A：土星", "B：木星", "C：金星"], correctNo: 1 }, { question: "举重比赛中，最重的杠铃片是哪个？", answers: ["A：红色的", "B：蓝色的", "C：黄色的"], correctNo: 0 },
        { question: "血液中的红细胞可以活多少天？", answers: ["A：100天", "B：110天", "C：120天"], correctNo: 2 }, { question: "冬季奥运会如何计算届次？", answers: ["A：3年1次", "B：5年2次", "C：4年1次"], correctNo: 2 },
        { question: "连接深圳与香港的边界桥叫什么？", answers: ["A：深圳桥", "B：罗湖桥", "C：深港桥"], correctNo: 1 }, { question: "在香港上市的内地公司股票称为？", answers: ["A：港股", "B：普通股", "C：红筹股"], correctNo: 2 },
        { question: "下面哪首歌不是香港乐队beyond的作品？", answers: ["A：永远不回头", "B：海阔天空", "C：真的爱你"], correctNo: 0 }, { question: "香港第二任行政长官选举于2002年几月举行？", answers: ["A：1月", "B：3月", "C：5月"], correctNo: 1 }
    ],
    game7: [{ question: "下面哪个城市没有纽伦港美称？", answers: ["A：中国香港", "B：英国伦敦", "C：法国巴黎"], correctNo: 2 },
         { question: "以下哪个不是中国香港的美誉之称？", answers: ["A：东方之珠", "B：狂欢之城", "C：购物天堂"], correctNo: 1 }, { question: "统一海之言粉红色瓶装的是什么口味？", answers: ["A：西柚味", "B：柠檬味", "C：卡曼橘味"], correctNo: 0 },
         { question: "以下哪一个不是香港八景？", answers: ["A：快活啼声", "B：旗山星火", "C：石梁月夜"], correctNo: 2 }, { question: "猫在哪个国家内受到严格保护？", answers: ["A：古埃及", "B：中国", "C：波兰"], correctNo: 0 },
         { question: "水在摄氏多少度时密度最大？", answers: ["A：3度", "B：4度", "C：5度"], correctNo: 1 }, { question: "“腊八粥”最早起源于？", answers: ["A：基督教", "B：伊斯兰教", "C：佛教"], correctNo: 2 },
         { question: "太阳系中最大的行星是哪个？", answers: ["A：土星", "B：木星", "C：金星"], correctNo: 1 }, { question: "举重比赛中，最重的杠铃片是哪个？", answers: ["A：红色的", "B：蓝色的", "C：黄色的"], correctNo: 0 },
         { question: "血液中的红细胞可以活多少天？", answers: ["A：100天", "B：110天", "C：120天"], correctNo: 2 }, { question: "冬季奥运会如何计算届次？", answers: ["A：3年1次", "B：5年2次", "C：4年1次"], correctNo: 2 },
         { question: "连接深圳与香港的边界桥叫什么？", answers: ["A：深圳桥", "B：罗湖桥", "C：深港桥"], correctNo: 1 }, { question: "在香港上市的内地公司股票称为？", answers: ["A：港股", "B：普通股", "C：红筹股"], correctNo: 2 },
         { question: "下面哪首歌不是香港乐队beyond的作品？", answers: ["A：永远不回头", "B：海阔天空", "C：真的爱你"], correctNo: 0 }, { question: "香港第二任行政长官选举于2002年几月举行？", answers: ["A：1月", "B：3月", "C：5月"], correctNo: 1 }
    ],
    game8: [{ question: "下面哪个城市没有纽伦港美称？", answers: ["A：中国香港", "B：英国伦敦", "C：法国巴黎"], correctNo: 2 },
        { question: "以下哪个不是中国香港的美誉之称？", answers: ["A：东方之珠", "B：狂欢之城", "C：购物天堂"], correctNo: 1 }, { question: "统一海之言粉红色瓶装的是什么口味？", answers: ["A：西柚味", "B：柠檬味", "C：卡曼橘味"], correctNo: 0 },
        { question: "以下哪一个不是香港八景？", answers: ["A：快活啼声", "B：旗山星火", "C：石梁月夜"], correctNo: 2 }, { question: "猫在哪个国家内受到严格保护？", answers: ["A：古埃及", "B：中国", "C：波兰"], correctNo: 0 },
        { question: "水在摄氏多少度时密度最大？", answers: ["A：3度", "B：4度", "C：5度"], correctNo: 1 }, { question: "“腊八粥”最早起源于？", answers: ["A：基督教", "B：伊斯兰教", "C：佛教"], correctNo: 2 },
        { question: "太阳系中最大的行星是哪个？", answers: ["A：土星", "B：木星", "C：金星"], correctNo: 1 }, { question: "举重比赛中，最重的杠铃片是哪个？", answers: ["A：红色的", "B：蓝色的", "C：黄色的"], correctNo: 0 },
        { question: "血液中的红细胞可以活多少天？", answers: ["A：100天", "B：110天", "C：120天"], correctNo: 2 }, { question: "冬季奥运会如何计算届次？", answers: ["A：3年1次", "B：5年2次", "C：4年1次"], correctNo: 2 },
        { question: "连接深圳与香港的边界桥叫什么？", answers: ["A：深圳桥", "B：罗湖桥", "C：深港桥"], correctNo: 1 }, { question: "在香港上市的内地公司股票称为？", answers: ["A：港股", "B：普通股", "C：红筹股"], correctNo: 2 },
        { question: "下面哪首歌不是香港乐队beyond的作品？", answers: ["A：永远不回头", "B：海阔天空", "C：真的爱你"], correctNo: 0 }, { question: "香港第二任行政长官选举于2002年几月举行？", answers: ["A：1月", "B：3月", "C：5月"], correctNo: 1 }
    ],
    game9: [{ question: "下面哪个城市没有纽伦港美称？", answers: ["A：中国香港", "B：英国伦敦", "C：法国巴黎"], correctNo: 2 },
        { question: "以下哪个不是中国香港的美誉之称？", answers: ["A：东方之珠", "B：狂欢之城", "C：购物天堂"], correctNo: 1 }, { question: "统一海之言粉红色瓶装的是什么口味？", answers: ["A：西柚味", "B：柠檬味", "C：卡曼橘味"], correctNo: 0 },
        { question: "以下哪一个不是香港八景？", answers: ["A：快活啼声", "B：旗山星火", "C：石梁月夜"], correctNo: 2 }, { question: "猫在哪个国家内受到严格保护？", answers: ["A：古埃及", "B：中国", "C：波兰"], correctNo: 0 },
        { question: "水在摄氏多少度时密度最大？", answers: ["A：3度", "B：4度", "C：5度"], correctNo: 1 }, { question: "“腊八粥”最早起源于？", answers: ["A：基督教", "B：伊斯兰教", "C：佛教"], correctNo: 2 },
        { question: "太阳系中最大的行星是哪个？", answers: ["A：土星", "B：木星", "C：金星"], correctNo: 1 }, { question: "举重比赛中，最重的杠铃片是哪个？", answers: ["A：红色的", "B：蓝色的", "C：黄色的"], correctNo: 0 },
        { question: "血液中的红细胞可以活多少天？", answers: ["A：100天", "B：110天", "C：120天"], correctNo: 2 }, { question: "冬季奥运会如何计算届次？", answers: ["A：3年1次", "B：5年2次", "C：4年1次"], correctNo: 2 },
        { question: "连接深圳与香港的边界桥叫什么？", answers: ["A：深圳桥", "B：罗湖桥", "C：深港桥"], correctNo: 1 }, { question: "在香港上市的内地公司股票称为？", answers: ["A：港股", "B：普通股", "C：红筹股"], correctNo: 2 },
        { question: "下面哪首歌不是香港乐队beyond的作品？", answers: ["A：永远不回头", "B：海阔天空", "C：真的爱你"], correctNo: 0 }, { question: "香港第二任行政长官选举于2002年几月举行？", answers: ["A：1月", "B：3月", "C：5月"], correctNo: 1 }
    ],

}
var gameInfo = {
    game0: { Name: "sh", Letter: { left: 83, top: 58 }, Position: { left: 81, top: 53.5 }, Boat: { startLeft: 85, startTop: 59, endLeft: 85, endTop: 60, inverse: 0 } },
    game1: { Name: "hk", Letter: { left: 79, top: 61 }, Position: { left: 77, top: 56 }, Boat: { startLeft: 85, startTop: 59, endLeft: 76, endTop: 64, inverse: 0, a: 0.0389, b: -6.82, c: 357.4 } },
    game2: { Name: "sy", Letter: { left: 93, top: 74 }, Position: { left: 92, top: 69 }, Boat: { startLeft: 76, startTop: 64, endLeft: 82, endTop: 75.5, inverse: 1, a: -0.268, b: 37.95, c: -1255.31 } },
    game3: { Name: "kpt", Letter: { left: 45, top: 73 }, Position: { left: 44, top: 68.4 }, Boat: { startLeft: 82, startTop: 75.5, endLeft: 45, endTop: 75, inverse: 0, a: -0.0131, b: 1.6928, c: 25.386 } },
    game4: { Name: "bn", Letter: { left: 22, top: 71 }, Position: { left: 21.5, top: 66 }, Boat: { startLeft: 45, startTop: 75, endLeft: 15, endTop: 73, inverse: 0, a: -0.00889, b: 0.6, c: 66 } },
    game5: { Name: "ly", Letter: { left: 7, top: 62 }, Position: { left: 5.5, top: 57.5 }, Boat: { startLeft: 15, startTop: 73, endLeft: 5, endTop: 65, inverse: 0, a: 0, b: 0.8, c: 61 } },
    game6: { Name: "ny", Letter: { left: 13, top: 48 }, Position: { left: 12, top: 43.5 }, Boat: { startLeft: 5, startTop: 65, endLeft: 4, endTop: 50, inverse: 3, a: 0.0351, b: -3.972, c: 114.8 } },
    game7: { Name: "ld", Letter: { left: 49, top: 54 }, Position: { left: 48, top: 50 }, Boat: { startLeft: 4, startTop: 50, endLeft: 54, endTop: 52, inverse: 2, a: 0.00557, b: -0.27897, c: 50.8865 } },
    game8: { Name: "wns", Letter: { left: 41, top: 56 }, Position: { left: 39.5, top: 52.5 }, Boat: { startLeft: 54, startTop: 52, endLeft: 30, endTop: 56, inverse: 0, a: 0, b: -0.1667, c: 61 } },
    game9: { Name: "ms", Letter: { left: 43, top: 59 }, Position: { left: 42, top: 55 }, Boat: { startLeft: 30, startTop: 56, endLeft: 35, endTop: 61, inverse: 2, a: 0, b: 1, c: 26 } }
}
var userInfo = {
    userId: null,
    userAllGameOk: false,
    nowUserPlayedIndex: 0,
    userGameInfo: { game0: null, game1: null, game2: null, game3: null, game4: null, game5: null, game6: null, game7: null, game8: null, game9: null },
    //userGameInfo: { game0: "B", game1: "B", game2: "B", game3: "B", game4: "B", game5: "B", game6: "S", game7: "S", game8: "S", game9: "S" },
    currentGameScore:
        {
            game0: { answerNumOfTimes: 0, answerNums: -1, answerCorrectNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game1: { answerNumOfTimes: 0, answerNums: -1, answerCorrectNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game2: { answerNumOfTimes: 0, answerNums: -1, answerCorrectNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game3: { answerNumOfTimes: 0, answerNums: -1, answerCorrectNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game4: { answerNumOfTimes: 0, answerNums: -1, answerCorrectNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game5: { answerNumOfTimes: 0, answerNums: -1, answerCorrectNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game6: { answerNumOfTimes: 0, answerNums: -1, answerCorrectNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game7: { answerNumOfTimes: 0, answerNums: -1, answerCorrectNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game8: { answerNumOfTimes: 0, answerNums: -1, answerCorrectNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null },
            game9: { answerNumOfTimes: 0, answerNums: -1, answerCorrectNums: -1, answerTime: -1, answerCorrectRate: -1, scoreLevel: null }
        }
}
var rankInfo = [
 { userId: "123", col2: '小旋风1', col3: 2, col4: 18.88, col5: 10 }, { userId: "123", col2: '小旋风2', col3: 2, col4: 18.88, col5: 10 },
 { userId: "123", col2: '小旋风3', col3: 2, col4: 18.88, col5: 10 }, { userId: "123", col2: '小旋风4', col3: 2, col4: 18.88, col5: 10 },
 { userId: "123", col2: '小旋风5', col3: 2, col4: 18.88, col5: 10 }, { userId: "123", col2: '小旋风6', col3: 2, col4: 18.88, col5: 10 },
 { userId: "123", col2: '小旋风7', col3: 2, col4: 18.88, col5: 10 }, { userId: "123", col2: '小旋风8', col3: 2, col4: 18.88, col5: 10 },
 { userId: "123", col2: '小旋风9', col3: 2, col4: 18.88, col5: 10 }, { userId: "123", col2: '小旋风10', col3: 2, col4: 18.88, col5: 10 },//col1是序号，前台生成
]

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
        //获取userInfo.userId
        userInfo.userId = "123123";
        GetNowUserInfo();
    }
}

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
        if (userInfo.userAllGameOk == true) {
            if (mapInited == false) {
                setTimeout(function () {
                    SetPositions();
                    SetScoreAboveCity();
                    mapInited = true;
                }, 600);
            }
        }
        else {
            if (mapInited == false) {//地图还未设置，则设置地图
                setTimeout(function () {
                    SetPosition();
                    SetScoreAboveCity();
                    SetBoatAnimation();
                    mapInited = true;
                }, 600);
            }
        }

    })
    //排行榜部分
    $('.rank-btn').singleTap(function () {
        $('.rank-table').html("");
        $.get("/index.php?r=haizhiyan/ranklist", {
           
        }, function (data, textStatus) {
            if (data.success = true) {
                //获取成功
                var rankstr = "<tr><th class='th-xuhao'>序号</th><th class='th-normal'>昵称</th><th class='th-normal'>答题时间</th><th class='th-normal'>正确题数</th>";
                for (var i = 0; i < data.data.length; i++) {
                    rankstr += "<tr>" +
                        "<td class='th-align-center'>" + parseInt(i + 1) +
                        "</td><td class='th-align-center'>" + formatPalyerName(data.data[i].name == null ? data.data[i].openid : data.data[i].name) +
                        "</td><td class='th-align-center'>" + data.data[i].sumtime + " S" +
                        "</td><td class='th-align-center'>" + data.data[i].sumnum +
                        "</td>" +
                        "</tr>";
                }
                $('.rank-table').append(rankstr);
                pageCtl.pageMove(pageCtl.effects.fade, "rank");
            }
            else {
                alert("数据获取失败！");
            }
        })

    })
    $('.page-rank .rank-return-btn').singleTap(function () {
        pageCtl.pageMove(pageCtl.effects.fade, 1);
    })
    $('.result-next').singleTap(function () {
        if (userInfo.userAllGameOk != true) {
            ActionPreHidePositionAndBoat();//动画优化，先隐藏船和定位标志
            userInfo.nowUserPlayedIndex = userInfo.nowUserPlayedIndex + 1;
            pageCtl.pageMove(pageCtl.effects.fade, 2);
            setTimeout(function () {
                SetPosition();
                SetScoreAboveCity();
                SetBoatAnimation();
                mapInited = true;
            }, 600);
        }
        else {
            SetUpdateScoreAboveCity();
            pageCtl.pageMove(pageCtl.effects.fade, 2);
        }
        GameReset();
    })
    $('.result-return').singleTap(function () {
        //ActionPreHidePositionAndBoat();//动画优化，先隐藏船和定位标志
        //$('#boat').css('left', gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.startLeft + '%').css('top', gameInfo["game" + userInfo.nowUserPlayedIndex].Boat.startTop + '%').css('width', 30 + 'px').css('zIndex', '998');
        pageCtl.pageMove(pageCtl.effects.fade, 2);
        if (userInfo.userAllGameOk == true) {
            //  SetPositions();
            SetUpdateScoreAboveCity();
        }
        else {
            SetPosition();
            SetScoreAboveCity();
        }
        GameReset();
    })

    //地图上的标志点击事件
    $('.default-position').singleTap(function () {
        pageCtl.pageMove(pageCtl.effects.fade, "city-" + gameInfo["game" + userInfo.nowUserPlayedIndex].Name);
        setTimeout(function () {
            pageCtl.pageMove(pageCtl.effects.fade, "question");
            setTimeout(function () {
                QuestionStart();
            },
                1000)
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
    userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].answerNumOfTimes++;//答题次数+1
    //GetCityQuestionInfo(userInfo.nowUserPlayedIndex);
    QuestionInit();
    // QuestionTimerStart();
}

//题目生成
function QuestionInit() {
    $('.question-div-text').html("");
    var currentCityQuestions = questionInfo["game" + userInfo.nowUserPlayedIndex].slice(0);
    // maxQuestionIndex = currentCityQuestions.length > 0 ? currentCityQuestions.length - 1 : 0;
    var random = new Array();
    random = GetRandom1to10();
    for (var i = 0; i < (maxQuestionIndex + 1) ; i++) {
        var tmp = currentCityQuestions[i];
        currentCityQuestions[i] = currentCityQuestions[random[i]];
        currentCityQuestions[random[i]] = tmp;
    }

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
                   "</div>";
            $('.question-div-text').append(question);
        }
        else {
            var question = "<div class='hide perquestion-div' id='question_" + i + "'><span class='question_desc'>" + (i + 1) + "、" + perQuestion.question + "</span><br /><br/>" +
                "<span id='" + i + "_" + 0 + "' class='answer' data_qid='" + i + "' data_a='0' data_correct='" + perQuestion.correctNo + "'>" + perQuestion.answers[0] + "</span><br/><br/>" +
                 "<span id='" + i + "_" + 1 + "' class='answer' data_qid='" + i + "' data_a='1' data_correct='" + perQuestion.correctNo + "'>" + perQuestion.answers[1] + "</span><br/><br/>" +
                  "<span id='" + i + "_" + 2 + "' class='answer' data_qid='" + i + "' data_a='2' data_correct='" + perQuestion.correctNo + "'>" + perQuestion.answers[2] + "</span><br/><br/>" +
                   "</div>";
            $('.question-div-text').append(question);
        }
        i++;
    }
    $('.question-div').css("height", $('.question-div-text').height() + "px");
    $('.answer').each(function () {
        $(this).singleTap(function () {
            if (questionStartFlag == false) {
                QuestionTimerStart();
                questionStartFlag = true;
            }
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

//答题10道完毕
//得分计算算法没有确定
function ActionAnswerAll() {
    clearInterval(timer);
    questionStartFlag = false;
    $('.using-time-span').text("0.00S");
    timer_time["timer" + userInfo.nowUserPlayedIndex] = 0;
    $('.question-div-text').html("");
    //正确率
    userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].answerCorrectRate = (currentAnswerCorrectNums / (maxQuestionIndex + 1)).toFixed(2);
    var level = "";
    //正确率
    var rate = userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].answerCorrectRate;
    userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].answerCorrectNums = rate * 10;
    //总共答题数目（无意义，都为10）
    //var userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].answerNums
    var myNumOfTimes = userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].answerNumOfTimes;
    //答题时间，格式：10.00
    var mytime = userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].answerTime;
    var myCorrectNums = userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].answerCorrectNums;
    level = CalLevel(mytime, rate);
    //经计算的level级别 SABCDE
    userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].scoreLevel = level;

    var submitInfo = { "userId": userInfo.userId, "gameId": userInfo.nowUserPlayedIndex, "time": mytime, "correctNums": myCorrectNums, "level": level };
    SubmitScore();
    //ajax发送成功后，对当前信息进行更新，更新最新城市的成绩
    setTimeout(function () {
        userInfo.userGameInfo["game" + userInfo.nowUserPlayedIndex] = userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].scoreLevel;
        ShowResult();
    }, 500);


}
function CalLevel(time, rate) {
    var level_t = "";
    var level_t_i = 0;
    var level_r = "";
    var level_r_i = 0;
    if (time <= 60) {
        level_t = "S";
        level_t_i = 5;
    }
    else if (time <= 80) {
        level_t_i = 4;
        level_t = "A";
    }
    else if (time <= 100) {
        level_t_i = 3;
        level_t = "B";
    }
    else if (time <= 120) {
        level_t_i = 2;
        level_t = "C";
    }
    else if (time <= 140) {
        level_t_i = 1;
        level_t = "D";
    }
    else {
        level_t_i = 0;
        level_t = "E";
    }

    if (rate >= 1) {
        level_r_i = 5;
        level_r = "S";
    }
    else if (rate >= 0.9) {
        level_r_i = 4;
        level_r = "A";
    }
    else if (rate >= 0.8) {
        level_r_i = 3;
        level_r = "B";
    }
    else if (rate >= 0.7) {
        level_r_i = 2;
        level_r = "C";
    }
    else if (rate >= 0.6) {
        level_r_i = 1;
        level_r = "D";
    }
    else {
        level_r_i = 0;
        level_r = "E";
    }

    if (level_r_i > level_t_i) {
        return level_t;
    }
    else {
        return level_r;
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
//用户玩过一轮之后的情况
function SetPositions() {
    $('.default-position').remove();
    for (var i = 0; i < (maxQuestionIndex + 1) ; i++) {
        var position = "<img gdata='" + i + "' id='position-game-" + i + "' class='position' src='img/position.png'/>";
        $('.page-2').append($(position));
        $('#position-game-' + i).css('left', gameInfo["game" + i].Position.left + '%').css('top', gameInfo["game" + i].Position.top + '%');
        $j('#position-game-' + i).animate({
            opacity: 1
        }, 500, 'linear');
    }
    $('.position').each(function () {
        $(this).singleTap(function () {
            userInfo.nowUserPlayedIndex = $(this).attr("gdata");
            pageCtl.pageMove(pageCtl.effects.fade, "city-" + gameInfo["game" + $(this).attr("gdata")].Name);
            setTimeout(function () {
                pageCtl.pageMove(pageCtl.effects.fade, "question");
                setTimeout(function () {
                    QuestionStart();
                }, 1000);
            }, 2000)
        })
    })
}
//非第一轮时，在地图上更新成绩
function SetUpdateScoreAboveCity() {
    for (var i = 0; i < (maxQuestionIndex + 1) ; i++) {
        $('#letter-game-' + i).attr("src", "img/letter-" + userInfo.userGameInfo["game" + i] + ".png");
        $('#letter-game-' + i).css('left', gameInfo["game" + i].Letter.left + '%').css('top', gameInfo["game" + i].Letter.top + '%');
        $j('#letter-game-' + i).animate({
            opacity: 1
        }, 500, 'linear');

    }
}
function SetPosition() {
    $('.position').css('left', gameInfo["game" + userInfo.nowUserPlayedIndex].Position.left + '%').css('top', gameInfo["game" + userInfo.nowUserPlayedIndex].Position.top + '%');
    $j('.position').animate({
        opacity: 1
    }, 500, 'linear');
}
function SetScoreAboveCity() {
    var level = "";
    for (var i = 0; i < (maxQuestionIndex + 1) ; i++) {
        if ((level = userInfo.userGameInfo["game" + i]) != null) {
            if ($('#letter-game-' + i).size() == 0) {
                var letter = "<img id='letter-game-" + i + "' class='letter' src='img/letter-" + level + ".png'/>";
                $('.page-2').append($(letter));
            }
                //更新成绩
            else if ($('#letter-game-' + i).size() != 0) {
                $('#letter-game-' + i).attr("src", "img/letter-" + userInfo.userGameInfo["game" + i] + ".png");
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
function GetRandom1to10() {
    var n = new Array();
    var m = new Array();
    var i = 0;

    while (i < (maxQuestionIndex + 1)) {
        var x = Math.floor(Math.random() * (maxTotalQuestions - 1));
        if (n[x] == 1) {

        }
        else {
            n[x] = 1;
            m[i] = x;
            i++;
        }
    }
    return m;
}

function GetNowUserInfo() {
    $.get("/index.php?r=haizhiyan/detail", {
        "userId": userInfo.userId,
    }, function (data, textStatus) {
        if (data.success = true) {
            for (var i = 0; i < 10; i++) {
                userInfo.userGameInfo["game" + i] = data.data["game" + i];
                userInfo.nowUserPlayedIndex = (parseInt(data.data["nowgame"]) != null ? (parseInt(data.data["nowgame"]) + 1) : 0);
                if (userInfo.nowUserPlayedIndex == 10) {
                    userInfo.userAllGameOk = true;
                }
            }
        }
        else {
            alert("数据获取失败！");
        }
    })
}
function SubmitScore() {
    $.get("/index.php?r=haizhiyan/play", {
        "userId": userInfo.userId,
        "gameId": userInfo.nowUserPlayedIndex,
        "time": userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].answerTime,
        "correctNums": userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].answerCorrectNums,
        "level": userInfo.currentGameScore["game" + userInfo.nowUserPlayedIndex].scoreLevel
    }, function (data, textStatus) {
        if (data.success = true) {
            //更新成功
        }
        else {
            alert("数据更新失败！");
        }
    })
}