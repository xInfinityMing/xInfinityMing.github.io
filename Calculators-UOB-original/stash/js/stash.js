(function(){
    // // console.log('self-invoking');
    var sliders = [];
    var calculatorData = {
        default: {
            value: [ 21000, 22000, 48000, 49000, 50000, 200000, 100000, 77000, 78000, 79000, 80000, 100000],
        },
        firstMonth: {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear()
        },
        sliders: {
            ticks: {
                min: 3000,
                max: 220000
            },
        },
        scales: [
            {
                value: 10000,
                text: "10k"
            },
            {
                value: 50000,
                text: "50k"
            },
            {
                value: 100000,
                text: "100k"
            },
            {
                value: 150000,
                text: "150k"
            },
            {
                value: 200000,
                text: "200k"
            }
        ],
        tier: [
            {
                "max": 10000,
                "interest": 0.0005
            },
            {
                "max": 30000,
                "interest": 0.0030
            },
            {
                "max": 30000,
                "interest": 0.0060
            },
            {
                "max": 30000,
                "interest": 0.0100
            },
            {
                "max": 100000,
                "interest": 0.0005
            },
            {
                "max": "other",
                "interest": 0.0005
            }
        ]
    };
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Document Loaded
    $(function(e){

        $('.carousel-table .left a').click(function(e){
            e.preventDefault();
            carouselScroll("left");
        });
        $('.carousel-table .right a').click(function(e){
            e.preventDefault();
            carouselScroll("right");
        });


        initCalculator();

        $(".carousel").on("touchstart", function (event) {
            var xClick = event.originalEvent.touches[0].pageX;
            $(this).one("touchmove", function (event) {
                var xMove = event.originalEvent.touches[0].pageX;
                if (Math.floor(xClick - xMove) > 5) {
                    $(this).carousel('next');
                }
                else if (Math.floor(xClick - xMove) < -5) {
                    $(this).carousel('prev');
                }
            });
            $(".carousel").on("touchend", function () {
                $(this).off("touchmove");
            });
        });


    });



    // Window Loaded
    $(window).load(function(e){


        $(".responsive-content").mCustomScrollbar({
            axis: "x",
            theme: "dark-thick",
            setWidth: "100%",
            callbacks: {
                onScroll: function() {
                },
            },
        });


    });


    // Window Resize
    $(window).resize(function(e) {
        // // console.log('window.resize');

        resize();
    });



    // Window Resize
    $(window).scroll(function(e) {
        // // console.log('window.scroll');

    });















//
// INTEREST CALCULATION
//

    function initCalculator() {
    // console.log('inside ');
        $('input.mabs').each(function(){
            index = $('input.mabs').index(this);
            defaultValue = calculatorData.default.value[index];

            thisMonth = calculatorData.firstMonth.month + index - 1;
            thisMonth = (thisMonth > 11) ? thisMonth - 12 : thisMonth;
            monthText = '<div class="info"></div>';
            monthText += monthNames[thisMonth];

            if (index == 0) {
                monthText += '<div class="note">(Account Opened)</div>';
            }

            $('.td-center .month .d-td:eq(' + index + ')').html(monthText);

            $(this).val('S$' + defaultValue.format(2) )
                .attr('placeholder', 'S$' + defaultValue.format(2) )
                .change(function(e){
                    updateMab($('.mabs').index(this), toFloat($(this).val()));
                });
        });
        $('.calc-table [data-toggle="tooltip"]').tooltip();



        $('input.sliders').each(function(){
            defaultValue = calculatorData.default.value[$('input.sliders').index(this)];
            sliders.push(
                $(this).slider({
                        "orientation": "vertical",
                        "reversed": true,
                        "selection": "after",
                        "ticks": [calculatorData.sliders.ticks.min, calculatorData.sliders.ticks.max],
                        "min": calculatorData.sliders.ticks.min,
                        "max": calculatorData.sliders.ticks.max,
                        "step": 500,
                        "value": defaultValue,
                        "tooltip": "hide",
                    })
                    .on('change', function(e) {
                        updateMab($('.sliders').index(this), e.value.newValue);
                    })
            );
        });


        calculateInterest();
        resize();
        carouselScroll("left");

    }


    function updateMab(index, currentMonthBalance) {
        // // console.log(index, currentMonthBalance);

        // update slider and text input
        $('input.mabs:eq(' + index + ')').val('S$' + currentMonthBalance.format(2) );
        sliders[index].slider('setValue', currentMonthBalance);

        // calculate interest for all months
        calculateInterest();

    }



    function calculateInterest() {
        var totalInterest = 0;
        for (var i = 0; i < $('input.mabs').length; i++) {
            previousMonthBalance = (i == 0) ? 0 : toFloat($('input#mab-' + i).val());
            currentMonthBalance = toFloat($('input#mab-' + (i + 1)).val());
            mabMonth = checkMonthYear(calculatorData.firstMonth.month + i, calculatorData.firstMonth.year);
            mab = calculateMAB(currentMonthBalance, previousMonthBalance, mabMonth.month, mabMonth.year);
            mabtotal = parseFloat(mab.total).toFixed(3).slice(0,-1);
            totalInterest += parseFloat(mabtotal);
            if (mab.maxRate == 0.05) {
                $('.total-interest .d-td:eq(' + i + ')').html(mab.maxRate.format(2) + "%");
            } else {
                $('.total-interest .d-td:eq(' + i + ')').html("up&nbsp;to " + mab.maxRate.format(2) + "%");
            }

            $('.interest-amount .d-td:eq(' + i + ')').html('S$' + mab.total.toFixed(3).slice(0,-1));

        }
        $('.totalInterest').html('S$' + totalInterest.toFixed(3).slice(0,-1));
    }



    function calculateMAB(currentMonthBalance, previousMonthBalance, month, year) {
        console.log("calculateMAB", currentMonthBalance, previousMonthBalance, month, year);
        var result = {
            total: 0,
            maxRate: 0
        };

        if (previousMonthBalance > currentMonthBalance) {
            result.total = calculatorData.tier[calculatorData.tier.length - 1].interest * currentMonthBalance * countDaysInMonth(month, year) / countDaysInYear(year);
            result.maxRate = calculatorData.tier[calculatorData.tier.length - 1].interest;
        } else {
            for (var i = 0; i < calculatorData.tier.length; i++) {
                tempAmount = (currentMonthBalance > calculatorData.tier[i].max) ? calculatorData.tier[i].max : currentMonthBalance;
                console.log('temp result', tempAmount, calculatorData.tier[i].interest * tempAmount * countDaysInMonth(month, year) / countDaysInYear(year));
                result.total += calculatorData.tier[i].interest * tempAmount * countDaysInMonth(month, year) / countDaysInYear(year);
                // // console.log(tempAmount, result.total);
                currentMonthBalance -= tempAmount;
                result.maxRate = (result.maxRate < calculatorData.tier[i].interest) ? calculatorData.tier[i].interest : result.maxRate;
                // console.log('temp result', result.total);
                if (currentMonthBalance <= 0) {
                    break;
                }
            }
        }


        result.maxRate *= 100;

        console.log(result);

        return result;
    }















    function carouselScroll(direction) {
        var container = $('.responsive-content');
        var content = $('.responsive-content .mCSB_container');
        var columnWidth = $('.sliders-wrapper .d-td').width();

        $('.carousel-table a').show();

        if (direction == "left") {
            minLeft = 0;
            newLeft = parseInt(content.css('left')) + Math.floor(container.width() / columnWidth) * columnWidth;
            newLeft = Math.floor(newLeft / columnWidth) * columnWidth;
            newLeft = (minLeft > newLeft) ? newLeft : minLeft;
            $(".responsive-content").mCustomScrollbar("scrollTo", newLeft);

        } else {
            maxRight = parseInt(container.width() - content.width());
            newRight = parseInt(content.css('left')) - Math.floor(container.width() / columnWidth) * columnWidth;
            newRight = (newRight < maxRight) ? maxRight : newRight;
            $(".responsive-content").mCustomScrollbar("scrollTo", newRight);

        }

    }









//
// RESIZING FUNCTIONS
//


    function resize() {
        resizeCalculatorTable();
        repositionScales();
    }


    function resizeCalculatorTable() {
        if ($('.calculator').length > 0) {
            // console.log('resizeCalculatorTable');
            $('.calculator .td-left .d-tr, .calculator .td-center .d-tr, .calculator .td-right .d-tr').height('');
            $('.calculator .td-center .d-tr, .calculator .td-left .d-tr').each(function(){
                var index = $(this).parent().find('.d-tr').index(this);
                var maxHeight = $(this).height();
                var tdRight = $('.calculator .td-center .d-tr:eq(' + index + ')').height();
                maxHeight = (tdRight > maxHeight) ? tdRight : maxHeight;
                // console.log(index, maxHeight);

                $('.calculator .td-left .d-tr:eq(' + index + '), .calculator .td-center .d-tr:eq(' + index + '), .calculator .td-right .d-tr:eq(' + index + '), .calculator .td-left-xs .d-tr:eq(' + index + ')').height(Math.ceil(maxHeight));
            });
            $('.calculator .td-span-content').width($('.calc-table').width());
        }
    }

    function repositionScales() {
        if ($('.slider-track').length > 0) {

            var sliderTop = $('.slider-track').offset().top;
            var sliderHeight = $('.slider-track').height();
            var calcTableTop = $('.calc-table').offset().top;

            var scaleTop1 = sliderTop - calcTableTop + (1 - (calculatorData.scales[0].value - calculatorData.sliders.ticks.min) / (calculatorData.sliders.ticks.max - calculatorData.sliders.ticks.min)) * sliderHeight - .5 * $('.scale-1').height();

            $('.scale-1').css('top', scaleTop1);

            var scaleTop2 = sliderTop - calcTableTop + (1 - (calculatorData.scales[1].value - calculatorData.sliders.ticks.min) / (calculatorData.sliders.ticks.max - calculatorData.sliders.ticks.min)) * sliderHeight - .5 * $('.scale-2').height();

            $('.scale-2').css('top', scaleTop2);

            var scaleTop3 = sliderTop - calcTableTop + (1 - (calculatorData.scales[2].value - calculatorData.sliders.ticks.min) / (calculatorData.sliders.ticks.max - calculatorData.sliders.ticks.min)) * sliderHeight - .5 * $('.scale-3').height();

            $('.scale-3').css('top', scaleTop3);

            var scaleTop4 = sliderTop - calcTableTop + (1 - (calculatorData.scales[3].value - calculatorData.sliders.ticks.min) / (calculatorData.sliders.ticks.max - calculatorData.sliders.ticks.min)) * sliderHeight - .5 * $('.scale-4').height();

            $('.scale-4').css('top', scaleTop4);

            var scaleTop5 = sliderTop - calcTableTop + (1 - (calculatorData.scales[4].value - calculatorData.sliders.ticks.min) / (calculatorData.sliders.ticks.max - calculatorData.sliders.ticks.min)) * sliderHeight - .5 * $('.scale-5').height();

            $('.scale-5').css('top', scaleTop5);

        }
    }
















//
// GENERAL FUNCTIONS
//


    function countDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }


    function countDaysInYear(year) {
        return (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) ? 366 : 365;
    }

    // check if month exceeds 12
    function checkMonthYear(month, year) {
        if (month > 12) {
            month -= 12;
            year += 1;
        }
        return {
            month: month,
            year: year
        };
    }

    function toFloat(value) {
        return parseFloat(value.replace(/[^0-9.]/g, ""));
    }

    Number.prototype.format = function(n, x) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
        return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
    };


    function getUrlVars() {
        var vars = [],
            hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }























})();
