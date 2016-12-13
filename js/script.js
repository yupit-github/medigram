/*Global variables*/
var featuresListItems,
    viewportWidth,
    windowScrollPositionCurrent = 0,
    heigthFixedHeader,
    buttonDisplayNavigation = '.display-menu',
    navigationMenu = '.navigation-menu',
    allContentWrapper = '.content-page',
    parallaxSection = '.parallaxWrap',
    benefitListItems = '.benefit-item',
    parallaxTranslateValue,
    PARALLAX_STEP = 3;

function getScrollBarWidth() {
    var scrollbarWidth = function() {
        var a, b, c;
        if (c === undefined) {
            a = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
            b = a.children();
            c = b.innerWidth() - b.height(99).innerWidth();
            a.remove();
        }
        
        return c;
    };
    return scrollbarWidth();
}

//restructuring blocks in 'features' section on window resize
function checkClearfixToFeaturesListItems(list, viewportWidth) {
    list = $(list);

    for (var i = 0; i < list.length; i++) {
        $(list[i]).removeClass('clearfix');

        if (viewportWidth >= 991) {
            if (i != 0 && i % 3 == 0) {
                $(list[i]).addClass('clearfix');
            }
        } else if (viewportWidth >= 768 && viewportWidth < 991) {
            if (i != 0 && i % 2 == 0) {
                $(list[i]).addClass('clearfix');
            }
        }
    }
}

function navigationAnimate() {
    $(buttonDisplayNavigation).on('click', function(e) {
        e.preventDefault();

        if ($(allContentWrapper).hasClass('content-moved')) {
            $(allContentWrapper).removeClass('content-moved');
            $('.main-header').removeClass('main-header-hidden');

            this.classList.remove("active")
        }
        else {
            $(allContentWrapper).addClass('content-moved');
            $('.main-header').addClass('main-header-hidden');

            this.classList.add("active")
        }

        if ($(navigationMenu).hasClass('menu-opened')) {
            $(navigationMenu).removeClass('menu-opened');
        }
        else {
            $(navigationMenu).addClass('menu-opened');
        }
    })
}

function sloganParallax(sectionSelector, windowScrollPositionNow, parallaxStep) {
    parallaxTranslateValue = windowScrollPositionNow / parallaxStep;

    $(sectionSelector).css({
        "background-position-y": "-" + parallaxTranslateValue + "px",
    });
};

function initSlickSlider(sectionSelector) {
    $(sectionSelector).slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev-custom"></button>',
        nextArrow: '<button type="button" class="slick-next-custom"></button>',
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        adaptiveHeight: true,
        responsive: [
            {
                //ipad on portrait
                breakpoint: 769,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                //iphone 6+ on portrait
                breakpoint: 415,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
};

function initBenefitsItemsHeight(sectionSelector) {
    var benefitItemsMaxHeight = 0;

    setTimeout(function() {
        $(sectionSelector).each(function(item) {
            if ($(this).outerHeight() > benefitItemsMaxHeight) {
                benefitItemsMaxHeight = $(this).outerHeight();
            }
        });
        $(sectionSelector).map(function(item) {
            $(this).css({ 'height': benefitItemsMaxHeight + "px" });
        });
    }, 500);
}

function initVideoModal() {
    var video = $('[src^="https://www.youtube.com/"]');
    video.parent().append('<div class="over-video-wrapper" data-toggle="modal" data-target="#video-modal"></div>');

    var videoWrapper = $('.over-video-wrapper');

    videoWrapper.on('click', function(e) {
        e.preventDefault();

        var target = $(e.currentTarget),
            videoSrc = target.parent().find('iframe').attr('src'),
            modal = $(target.data('target'));

        modal
            .on('show.bs.modal', function() { // on opening the modal
                // set the video to autostart
                $(this).find('iframe').attr("src", videoSrc + '&autoplay=1');
            })
            .on('hidden.bs.modal', function(e) { // on closing the modal
                // stop the video
                $(this).find('iframe').attr('src', '');
            });
    });
};

function isMobileDeviceUsed() {
    var isMobile = false;
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;
    return isMobile;
}

function setFocusedFieldAfterAnchorScroll() {
    $('[name="name"]').focus();
};

function initEvents() {
    /*Actions on 'DOM ready' event*/
    $(function() {
        if (isMobileDeviceUsed()) {
            $('body').addClass('is-mobile-device');
        }
        navigationAnimate();
        $(".slogan").append('<div class="parallaxWrap"></div>');

        if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv 11/)) || $.browser.msie == 1) {
            $('body').addClass('ie-brouser-used');
        }
    });

    /*Actions on 'Window load' event*/
    $(window).on("load", function() {
        viewportWidth = $(window).width() + getScrollBarWidth();
        featuresListItems = $('.features').find('.features-list-item');
        benefitItems = $('.benefit-item');

        initBenefitsItemsHeight(benefitListItems);

        initSmoothScrollToAnchor({
            linksSelector: "a[href^='#']:not([href='#'])",
            scrollDurationMS: 700,
            header: '.main-header'
        });
        initSlickSlider('.benefits-slider', viewportWidth);
        checkClearfixToFeaturesListItems(featuresListItems, viewportWidth);
        formValidationController();
        initVideoModal();
    });

    /*Actions on 'Window resize' event*/
    $(window).resize(function() {
        viewportWidth = $(window).width() + getScrollBarWidth();

        initBenefitsItemsHeight(benefitListItems);
        checkClearfixToFeaturesListItems(featuresListItems, viewportWidth);
    });

    /*Actions on 'Document scroll' event*/
    $('.content-page').on('scroll', function() {
        windowScrollPositionCurrent = $(this).scrollTop();

        if (!isMobileDeviceUsed()) {
            sloganParallax(parallaxSection, windowScrollPositionCurrent, PARALLAX_STEP);
        }
    });
};

/*Start all functions and actions*/
initEvents();