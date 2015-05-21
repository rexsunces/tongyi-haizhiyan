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
                $(fromPage).find("*").addClass("hide");

                $(toPage).addClass('page-current');
                $(toPage).removeClass(inClass);
                $(toPage).find("*").removeClass("hide");

                pageCtl.isAnimating = false;
            }, 600);
        }
    }
}