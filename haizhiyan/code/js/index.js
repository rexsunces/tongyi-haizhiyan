var nowUserId = "";
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
//获取当前用户的微信Id
function GetNowUserId() {
    nowUserId = getUrlParam("openid");
    if (nowUserId != null) {
        window.localStorage.setItem('haizhiyan01', nowUserId);
        window.location = 'index.html?tag=0';
        return false;
    }
    nowUserId = window.localStorage.getItem('haizhiyan01');
    if (nowUserId == null || nowUserId == '') {
        //需要授权获取用户id
        window.location = '/wx/getopenidbyoath2.php?url=' + encodeURIComponent(window.location.pathname + window.location.search);
        return false;
    }
}

GetNowUserId();

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
    game2: [{ question: "2000年悉尼奥运会中国获得多少枚金牌？", answers: ["A：26", "B：28", "C：30"], correctNo: 1 },
        { question: "悉尼歌剧院出自哪国建筑设计师之手？", answers: ["A：丹麦", "B：荷兰", "C：波兰"], correctNo: 0 }, { question: "《清明上河图》作于哪个朝代？", answers: ["A：元代", "B：唐代", "C：宋代"], correctNo: 2 },
        { question: "数学符号中的\"0\"起源于哪里？", answers: ["A：古印度", "B：古埃及", "C：中国"], correctNo: 0 }, { question: "“黄果树瀑布”位于哪个省？", answers: ["A：贵州", "B：云南", "C：湖南"], correctNo: 0 },
        { question: "煤气表上的“度”表示？", answers: ["A：1立方米的煤气", "B：2立方米的煤气", "C：3立方米的煤气"], correctNo: 0 }, { question: "飞机总是如何起飞的？", answers: ["A：顺风", "B：迎风", "C：都一样"], correctNo: 1 },
        { question: "“名不正则言不顺”是哪家的思想？", answers: ["A：道家", "B：墨家", "C：儒家"], correctNo: 2 }, { question: "珠穆朗玛峰海拔多少？", answers: ["A：8848米", "B：8868米", "C：8878米"], correctNo: 0 },
        { question: "仙人掌进行光合作用是依靠什么？", answers: ["A：根", "B：茎", "C：叶"], correctNo: 2 }, { question: "人体如果失水多少就会危及生命？", answers: ["A：20%", "B：25%", "C：30%"], correctNo: 0 },
        { question: "“伯乐一顾”中的伯乐看的是什么？", answers: ["A：羊", "B：马", "C：猴"], correctNo: 1 }, { question: "被称为“液体面包”的是？", answers: ["A：奶酪", "B：果汁", "C：牛奶"], correctNo: 2 },
        { question: "人体中最大的消化腺是什么？", answers: ["A：肝脏", "B：胃", "C：肠"], correctNo: 0 }, { question: "唐太宗的“太宗”指的是他的？", answers: ["A：年号", "B：庙号", "C：国号"], correctNo: 1 }
    ],
    game3: [{ question: "开普敦的地形像什么？", answers: ["A：桌山", "B：凳山", "C：椅山"], correctNo: 0 },
        { question: "开普敦是世界产量最丰富之一的是什么？", answers: ["A：虾", "B：鱼", "C：海带"], correctNo: 1 }, { question: "坦克是哪个国家发明的？", answers: ["A：德国", "B：美国", "C：英国"], correctNo: 2 },
        { question: "“博士”作为官名最早出现在哪里？", answers: ["A：秦", "B：商", "C：夏"], correctNo: 0 }, { question: "人体含水量百分比最高的器官是什么？", answers: ["A：舌头", "B：眼球", "C：嘴巴"], correctNo: 1 },
        { question: "传说中的巫山神女名叫？", answers: ["A：甄姬", "B：女娲", "C：瑶姬"], correctNo: 2 }, { question: "我国历史上第一部编年体史书是？", answers: ["A：《春秋》", "B：《战国》", "C：《诗经》"], correctNo: 0 },
        { question: "人类最早使用的工具，是什么材料的？", answers: ["A：木", "B：石", "C：沙"], correctNo: 1 }, { question: "“知天命”代指什么年纪 ？", answers: ["A：六十岁", "B：四十岁", "C：五十岁"], correctNo: 2 },
        { question: "“金屋藏娇”的故事与哪一位皇帝有关？", answers: ["A：汉武帝", "B：汉文帝", "C：汉景帝"], correctNo: 0 }, { question: "我国海洋气温最高值出现在几月份？", answers: ["A：七月", "B：八月", "C：九月"], correctNo: 1 },
        { question: "被称为“诗圣”的唐代诗人哪一位？", answers: ["A：李白", "B：杜甫", "C：王维"], correctNo: 1 }, { question: "普洱茶的产地在哪？", answers: ["A：福建", "B：安徽", "C：云南"], correctNo: 2 },
        { question: "发表著名的“铁幕演说”的是谁？", answers: ["A：邱吉尔", "B：卡耐基", "C：希特勒"], correctNo: 0 }, { question: "梅林罐头是我国哪个地方的名特产品？", answers: ["A：北京", "B：上海", "C：广州"], correctNo: 1 }
    ],
   
    game4: [
{ question: "“斯特拉尔”是哪个国家的货币名称？", answers: ["A: 巴西", "B：阿根廷", "C：荷兰"], correctNo: 1 },
{ question: "唐代小说一般被称作什么？", answers: ["A：传奇", "B：小篆", "C：话剧"], correctNo: 0 },
{ question: "新加坡的国花是什么花？", answers: ["A：郁金香", "B：茉莉花", "C：万代兰"], correctNo: 2 },
{ question: "澳门被葡萄牙割占的时间是？", answers: ["A：1553年", "B：1563年", "C：1573年"], correctNo: 0 },
{ question: "为中国赢得第一块澳运会金牌的项目是？", answers: ["A：跳远", "B：射击", "C：跳水"], correctNo: 1 },
{ question: "我国少数民族最多的民族是？", answers: ["A：苗族", "B：藏族", "C：壮族"], correctNo: 2 },
{ question: "世界上最大的橡胶生产国是？", answers: ["A：泰国", "B：法国", "C：印度"], correctNo: 0 },
{ question: "欧洲人口、面积最大的国家是？", answers: ["A：英国", "B：法国", "C：荷兰"], correctNo: 1 },
{ question: "道统指的是什么思想？", answers: ["A：法家", "B：道家", "C：儒家"], correctNo: 2 },
{ question: "CT采用下列哪种射线？", answers: ["A：X射线", "B：γ射线", "C：β射线"], correctNo: 0 },
{ question: "三国演义中称为常胜将军的是？", answers: ["A：张飞", "B：赵云", "C：关羽"], correctNo: 1 },
{ question: "建立马奇诺防线的国家是？", answers: ["A：朝鲜", "B：意大利", "C：法国"], correctNo: 2 },
{ question: "“毛遂自荐”中的毛遂是哪国人？", answers: ["A：赵国", "B：燕国", "C：蜀国"], correctNo: 0 },
{ question: "《幻城》的作者是谁？", answers: ["A：郭沫若", "B：郭敬明", "C：韩寒"], correctNo: 1 },
{ question: "三藩市的金门桥是以什么颜色为主？", answers: ["A：棕色", "B：紫色", "C：红色"], correctNo: 2 }
    ],
    game5: [
{ question: "巴西最大的城市是？", answers: ["A: 里约热内卢", "B：圣保罗", "C：巴西利亚"], correctNo: 1 },
{ question: "巴西的通用语言是？", answers: ["A：葡萄牙语", "B：英语", "C：意大利语"], correctNo: 0 },
{ question: "有咖啡国之称的国家是？", answers: ["A：法国", "B：德国", "C：巴西"], correctNo: 2 },
{ question: "巴西嘉年华会所跳的舞是？", answers: ["A：桑巴舞", "B：霹雳舞", "C：波浪舞"], correctNo: 0 },
{ question: "参加世界杯次数最多的球队是？", answers: ["A：德国", "B：巴西", "C：意大利"], correctNo: 1 },
{ question: "《指环王》中的指环可以让人？", answers: ["A：跳跃", "B：飞行", "C：隐身"], correctNo: 2 },
{ question: "桃谷仙人一共有几个？", answers: ["A：6", "B：7", "C：8"], correctNo: 0 },
{ question: "局域网的英文缩写是？", answers: ["A：WAN", "B：LAN", "C：TCP"], correctNo: 1 },
{ question: "一场篮球赛每个运动员最多允许犯规几次？", answers: ["A：3次", "B：4次", "C：5次"], correctNo: 2 },
{ question: "眉毛的生长周期有多久？", answers: ["A：2个月", "B：3个月", "C：4个月"], correctNo: 0 },
{ question: "《白雪公主》的作者是谁？", answers: ["A：安徒生", "B：格林", "C：佩罗"], correctNo: 1 },
{ question: "哈雷彗星绕太阳运行的周期约为？", answers: ["A：56年", "B：66年", "C：76年"], correctNo: 2 },
{ question: "“碧螺春”是一种？", answers: ["A：绿茶", "B：红茶", "C：春茶"], correctNo: 0 },
{ question: "我国最早的表演艺术是？", answers: ["A：口技", "B：杂技", "C：魔术"], correctNo: 1 },
{ question: "下列各朝代疆域西至最远的是？", answers: ["A：明朝", "B：宋朝", "C：唐朝"], correctNo: 2 }
    ],
    game6: [
{ question: "低度酒的酒精含量不高于多少？", answers: ["A: 15%", "B：20%", "C：25%"], correctNo: 1 },
{ question: "被称为荷月的月份是？", answers: ["A：六月", "B：七月", "C：八月"], correctNo: 0 },
{ question: "现代人脑重约占体重的？", answers: ["A：1/20", "B：1/30", "C：1/40"], correctNo: 2 },

{ question: "以下哪种动物是软体动物？", answers: ["A：蜗牛", "B：水螅", "C：蛇"], correctNo: 0 },
{ question: "“沙龙”Salon是从哪国传进的外来语？", answers: ["A：德国", "B：法国", "C：意大利"], correctNo: 1 },
    { question: "徐悲鸿以画什么闻名世界？", answers: ["A：竹子", "B：虾", "C：奔马"], correctNo: 2 },

{ question: "雪莲花的颜色是？", answers: ["A：深红色", "B：白色", "C：橘黄色"], correctNo: 0 },
{ question: "企鹅产卵的季节一般是：", answers: ["A：夏季", "B：秋季", "C：冬季"], correctNo: 1 },
{ question: "黄金分割点是？", answers: ["A：0.616", "B：0.617", "C：0.618"], correctNo: 2 },
{ question: "排球比赛场上运动员人数为？", answers: ["A：6人", "B：7人", "C：8人"], correctNo: 0 },
{ question: "奥运会每四年举办一次，会期不超过？", answers: ["A：14", "B：16", "C：18"], correctNo: 1 },
{ question: "世界卫生组织的英文缩写是？", answers: ["A：WOT", "B：WTC", "C：WHO"], correctNo: 2 },
{ question: "我国国徽的通用尺度有几种？", answers: ["A：3种", "B：4种", "C：5种"], correctNo: 0 },
{ question: "古代一时辰相当于？", answers: ["A：1个小时", "B：2个小时", "C：3个小时"], correctNo: 1 },
{ question: "亚洲第一个举办奥运会的国家？", answers: ["A：韩国", "B：中国", "C：日本"], correctNo: 2 }
    ],
    game7:  [
{ question: "以下哪一个不是伦敦名胜？", answers: ["A: 大本钟", "B：卢浮宫", "C：大英博物馆"],correctNo: 1 },
{ question: "下列行星中，卫星最多的是？", answers: ["A：土星", "B：木星", "C：火星"], correctNo: 0 },
{ question: "穿什么颜色的衣服的人更容易挨蚊子叮？", answers: ["A：红色", "B：白色", "C：黑色"], correctNo: 2 },

{ question: "冰球比赛中每队上场多少人？", answers: ["A：6人", "B：7人", "C：8人"], correctNo: 0 },
{ question: "提出“信息高速公路”的美国总统是：", answers: ["A：布什", "B：克林顿", "C：奥巴马"], correctNo: 1 },
{ question: "我国第一大河长江有多长？", answers: ["A：6100公里", "B：6200公里", "C：6300公里"], correctNo: 2 },

{ question: "目前，我国目前住房信贷款年限最长为？", answers: ["A：30年", "B：35年", "C：40年"], correctNo: 0 },
{ question: "贫血主要原因是人体内缺少哪一种元素？", answers: ["A：钙", "B：铁", "C：铝"], correctNo: 1 },
{ question: "世界哪一个国家的茶叶产量最多？", answers: ["A：中国", "B：泰国", "C：印度"], correctNo: 2 },
{ question: "我国最古老的酒是？", answers: ["A：黄酒", "B：米酒", "C：白酒"], correctNo: 0 },
{ question: "“郁金香”是哪个国家的象征？", answers: ["A：波兰", "B：荷兰", "C：马赛"], correctNo: 1 },
    { question: "峨眉山位于我国哪个省份？", answers: ["A：湖南", "B：湖北", "C：四川"], correctNo: 2 },
{ question: "著名藏书楼天一阁在什么地方？", answers: ["A：浙江宁波", "B：浙江杭州", "C：浙江温州"], correctNo: 0 },
{ question: "古代一时辰相当于？", answers: ["A：1个小时", "B：2个小时", "C：3个小时"], correctNo: 1 },
{ question: "“知天命”代指什么年纪？", answers: ["A：三十岁", "B：四十岁", "C：五十岁"], correctNo: 2 }
],
    game8: [
{ question: "第一个国际电影节在哪举行？", answers: ["A: 华盛顿", "B：威尼斯", "C：巴黎"],correctNo: 1 },
{ question: "多少级以上的地震会造成破坏？", answers: ["A：5级", "B：6级", "C：7级"], correctNo: 0 },
{ question: "智商指数达到多少以上才能称得上“聪明”？", answers: ["A：100", "B：110", "C：120"], correctNo: 2 },

{ question: "美国迄今在任时间最长的总统是？", answers: ["A：罗斯福", "B：克林顿", "C：布什"], correctNo: 0 },
{ question: "“昙花一现”是“现”在？", answers: ["A：早晨", "B：晚上", "C：下午"], correctNo: 1 },
    { question: "我国有几个银行可以发行货币？", answers: ["A：3个", "B：2个", "C：1个"], correctNo: 2 },

{ question: "马是怎样睡觉的？", answers: ["A：侧卧睡", "B：躺着睡", "C：站着睡"], correctNo: 0 },
{ question: "公安机关传唤犯罪嫌疑人，最长不得超过？", answers: ["A：10小时", "B：12小时", "C：24小时"], correctNo: 1 },
{ question: "算盘的梁上一珠代表几？", answers: ["A：5", "B：6", "C：7"], correctNo: 2 },
{ question: "飞机上的航行灯有几种颜色？", answers: ["A：3种", "B：4种", "C：5种"], correctNo: 0 },
{ question: "“郁金香”是哪个国家的象征？", answers: ["A：波兰", "B：荷兰", "C：马赛"], correctNo: 1 },
{ question: "峨眉山位于我国哪个省份？", answers: ["A：湖南", "B：湖北", "C：四川"], correctNo: 2 },
{ question: "联合国的总部设在哪一个地方？", answers: ["A：纽约", "B：伦敦", "C：华盛顿"], correctNo: 0 },
{ question: "古代一时辰相当于？", answers: ["A：1个小时", "B：2个小时", "C：3个小时"], correctNo: 1 },
{ question: "评剧是我国哪个地方的主要戏曲？", answers: ["A：四川", "B：安徽", "C：辽宁"], correctNo: 2 }
    ],
    game9:    [
{ question: "亚、欧、非之间的内海是？", answers: ["A: 里海", "B：地中海", "C：死海"],correctNo: 1 },
{ question: "公元前5世纪雅典称霸于？", answers: ["A：地中海", "B：希腊", "C：意大利"], correctNo: 0 },
{ question: "跨亚欧两大洲的是？", answers: ["A：长岛", "B：济州岛", "C：地中海"], correctNo: 2 },

{ question: "乐器琵琶有几根弦？", answers: ["A：4根", "B：5根", "C：6根"], correctNo: 0 },
{ question: "“意大利的比萨斜塔倾斜达多少米？", answers: ["A：10米", "B：15米", "C：20米"], correctNo: 1 },
    { question: "馒头起源于？", answers: ["A：地中海", "B：北方", "C：南方"], correctNo: 2 },

{ question: "草圣是指哪位书法家？", answers: ["A：张旭", "B：王羲之", "C：武则天"], correctNo: 0 },
{ question: "公安机关传唤犯罪嫌疑人，最长不得超过？", answers: ["A：10小时", "B：12小时", "C：24小时"], correctNo: 1 },
{ question: "算盘的梁上一珠代表几？", answers: ["A：5", "B：6", "C：7"], correctNo: 2 },
{ question: "京剧服装中男性角色蟒袍上的动物是？", answers: ["A：龙", "B：蛇", "C：麒麟"], correctNo: 0 },
{ question: "“郁金香”是哪个国家的象征？", answers: ["A：波兰", "B：荷兰", "C：马赛"], correctNo: 1 },
{ question: "峨眉山位于我国哪个省份？", answers: ["A：湖南", "B：湖北", "C：四川"], correctNo: 2 },
{ question: "我国人口密度最高的省份是？", answers: ["A：江苏", "B：安徽", "C：上海"], correctNo: 0 },
{ question: "古代一时辰相当于？", answers: ["A：1个小时", "B：2个小时", "C：3个小时"], correctNo: 1 },
{ question: "避雷针的发明者是？", answers: ["A：爱迪生", "B：爱因斯坦", "C：富兰克林"], correctNo: 2 }
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
        pageCtl.pageMove(pageCtl.effects.fade, 98);
        //获取userInfo.userId
        userInfo.userId = nowUserId;
        GetNowUserInfo();
    }
}

var $j;
$(function () {
    $j = jQuery.noConflict();
    $('.enter-btn').singleTap(function () {
        pageCtl.pageMove(pageCtl.effects.fade, 1);
    })
    $('.rule-btn').singleTap(function () {
        pageCtl.pageMove(pageCtl.effects.fade, 99);
    })
    $('.page-1 .return-btn').singleTap(function () {
        pageCtl.pageMove(pageCtl.effects.fade, 98);
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
                        "</td><td class='th-align-center'>" + (data.data[i].sumtime == null ? "-" : data.data[i].sumtime) + " S" +
                        "</td><td class='th-align-center'>" + (data.data[i].sumnum == null ? "-" : data.data[i].sumnum) +
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
                userInfo.nowUserPlayedIndex = (data.data["nowgame"] != null ? (parseInt(data.data["nowgame"]) + 1) : 0);
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