var dropdownValue = {
    deposit: [1000, 2000, 3000, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000],
    spend: [500, 750, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500, 11000],
};

var infoText = "Your bonus KrisFlyer miles for savings is capped at {miles} miles based on 5% of MAB";
var salaryIsCredited = 0;
(function() {

    $(function(e) {
        console.log('doc.ready');
        initSelect();
    });


    function initSelect() {

        // Init Monthly Spend
        $('#input-spend').html('<option value="0">Please select</option>');

        for (var i = 0; i < dropdownValue.spend.length; i++) {
            $('#input-spend').append('<option value="' + dropdownValue.spend[i] + '">' + numberWithCommas(dropdownValue.spend[i]) + '</option>');
        }

        // Init Average Monthly Savings Balance
        $('#input-deposit').html('<option value="0">Please select</option>');
        for (var i = 0; i < dropdownValue.deposit.length; i++) {
            $('#input-deposit').append('<option value="' + dropdownValue.deposit[i] + '">' + numberWithCommas(dropdownValue.deposit[i]) + '</option>');
        }

        initCalculator();
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // fetch values from elements on change. 

    function initCalculator() {
        $('#input-spend').change(function(e) {
            calculateAll();
        });

        $('#input-deposit').change(function(e) {
            calculateAll();
        });

        $('.btn-toggle-salary-credit').on('click',function(e) {
            salaryIsCredited = $(this).data('val');
            calculateAll();            
        });
    }

    function calculateAll() {

        var kfAccount = salaryIsCredited;

            if($('#input-account [name="krisflyerAccount"]:checked').val() == '1'){
                $('#input-account-yes').closest(".btn").addClass('active');
               

            }
            else{
                $('#input-account-no').closest(".btn").addClass('active');
                
            }

              //alert($('#input-account [name="krisflyerAccount"]:checked').val());
        var inputSpend = parseInt($('#input-spend').val());
        var inputBalance = parseInt($('#input-deposit').val());
        var capPercentage = 0.05;
        var milesEarned;
        var capValue = inputBalance * capPercentage;

        if (kfAccount == 1) {
            milesEarned = inputSpend * 6;
            // console.log(milesEarned);
        } else {
            milesEarned = inputSpend * 5;
            // console.log(milesEarned);
        }

        if (inputBalance > 0) {
            $('.calculator-container .info').removeClass('hidden');
            $('.calculator-container .prompter-2').html(infoText.replace(/{miles}/gi, numberWithCommas(capPercentage * inputBalance * 12)));
        }

        var result = 0;
        if (milesEarned >= capValue) {
            console.log(capValue);
            // document.getElementById('miles-earned-val').innerHTML = numberWithCommas(capValue);

            result = capValue * 12;
            updateDigits('.spend-miles', (capValue * 12));
        }
        if (milesEarned <= capValue) {
            console.log(milesEarned);
            // document.getElementById('miles-earned-val').innerHTML = numberWithCommas(milesEarned);
            
            result = milesEarned * 12;
            updateDigits('.spend-miles', (milesEarned * 12));
        }

        // con
        setTimeout(function(){
            var $container = $('.odometer').eq(0),
            odometer = new Odometer({
                el: $container.get(0),
            }),
            value = capValue * 12;
            $container.html(result);
            if(result > 0){
                $('.calculator-notes').show();
                $('.calculator-notes').html('<p>Your bonus KrisFlyer miles for savings is capped at ' + numberWithCommas(value) + ' miles based on 5% of MAB</p>');
            }
        }, 300);


    }

    function updateDigits(elem, miles) {
        milesString = '0000000' + miles.toString();
        milesString = milesString.substring(milesString.length - 6);
        console.log(milesString);

        for (var i = 0; i < milesString.length; i++) {
            $(elem).find('.digit:eq(' + i + ')').html(milesString[i]);
        }
    }

})();


$(document).ready(function(){
  var iconMobileWidth = $('.custom-mobile-table .table-icon').outerWidth(),
      iconSizeAll = iconMobileWidth+40,
      //boxFormWidth = $('.int-calc-holder .boxes-form .box-item-form').innerHeight(),
      meterImgWidth = $('.odometer-wrap img').outerWidth();

      $('.custom-mobile-table .align_icon').css('padding-left', iconSizeAll+'px');

  var screen = $(window);
  if (screen.width() > 768) {
    $('.odometer-wrap').css('margin-left','-'+meterImgWidth+'px');
  }

  $('.btn-adjust').click(function(e){
      e.preventDefault();
  });

  $('.selectpicker').selectpicker();

  //STYLE CALLER (REMOVE BEFORE DEPLOYMENT)
  if (jQuery(window).width() < 768) {
      $(".desktop1").attr("href", "../../../mobile0c9a66/iwov-resources/css/mobile-style.css");
      $(".desktop2").attr("href", "../../../mobile0c9a66/iwov-resources/css/mobile-style.css");
      $(".desktop3").attr("href", "../../../mobile0c9a66/iwov-resources/css/product-card-detail/product-card-detail-mobile-style.css");
      $('.breadcrumb').hide();
  }
});
