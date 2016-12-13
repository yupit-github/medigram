//Smooth Scroll
function initSmoothScrollToAnchor(config) {
    var linksSelector,
        scrollDurationMS,
        deltaHeightFixedHeader;

    if ((config) && (config.linksSelector)) {
        linksSelector = config.linksSelector;
    } else {
        linksSelector = "a[href^='#']";
    }

    if ((config) && (config.scrollDurationMS)) {
        scrollDurationMS = config.scrollDurationMS;
    } else {
        scrollDurationMS = 400;
    }

    if ((config) && (config.header) && !isMobileDeviceUsed()) {
        deltaHeightFixedHeader = $(config.header).outerHeight();
    } else {
        deltaHeightFixedHeader = 0;
    }

    $(linksSelector).click(function(e) {
        e.preventDefault();
        $('.content-page').stop();
       
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if (target.length) {
                if ($(".navigation-menu").hasClass("menu-opened")) {
                    $(".display-menu").click();
                    setTimeout(function() {
                        startAnimate(target, scrollDurationMS, deltaHeightFixedHeader);
                    }, 500);
                } else {
                    startAnimate(target, scrollDurationMS, deltaHeightFixedHeader);
                }
                return false;
            }
        }
    });
};

function startAnimate(target, scrollDurationMS, deltaHeightFixedHeader) {
    var content = $('.content-page'),
        scrolledTopNow = content.scrollTop();

    content.animate({
        scrollTop: (target.offset().top + scrolledTopNow - deltaHeightFixedHeader)
    }, scrollDurationMS, function() {
        if (target.selector == '#contact-form' && !isMobileDeviceUsed()) {
            setFocusedFieldAfterAnchorScroll();
        }
    });
};