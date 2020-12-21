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

//////////////////////// START OF CALCULATOR ////////////////////////
$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    });
};


//default field values
var dividend = 15000;
// var cardSpend = $('#cardSpend').val(500);
// var sallaryCredit = $('#sallaryCredit').val(2000);
// var giro = $('#giro').val(3);
// var acct_balance = $('#acct_balance').val(75000);


///////////////////////////// SCENARIO A ////////////////////////////
function calculateA(){
	// console.log('calculateA');
	// var dividend = 15000;
	var cardSpend = $('#cardSpend').val();
	// var sallaryCredit = $('#sallaryCredit').val();
	// var giro = $('#giro').val();

	var balance = $('#acct_balance').val();
	var divideResult = Math.floor(balance/dividend);
	var getModulus = balance % dividend;
	var calcResult = divideResult*dividend+getModulus;

	var setArray = [getModulus];
	for(i=0;i<divideResult;i++){
	  setArray.push(dividend);
	}
	setArray.push(setArray.shift());

	//set of first six array
	var itemA0 = setArray[0]*0.25 / 100 || 0;  
	var itemA1 = setArray[1]*0.25 / 100 || 0;
	var itemA2 = setArray[2]*0.25 / 100 || 0;
	var itemA3 = setArray[3]*0.25 / 100 || 0;
	var itemA4 = setArray[4]*0.25 / 100 || 0;
	var itemA5 = setArray[5]*0.05 / 100 || 0;

	//total of first six array
	var totalInterestSceneA = itemA0+itemA1+itemA2+itemA3+itemA4+itemA5;

	//slice from 6th array
	var sliceArray = setArray.slice(6);

	//multiply each array
	var multiply = sliceArray.map(function(x) { return x *0.05 / 100 || 0; });
	
	//remove last array from list
	//multiply.splice(-1,1)

	//sum of all list of array
	var sum = multiply.reduce(function (a, b) {
  return a + b;
}, 0);
	
	var totalArray = sum+totalInterestSceneA;

	//prevents rounding off of decimal
	var toFixed = function(val, decimals) {
		var arr = ("" + val).split(".");
		if(arr.length === 1) 
			return val;
		var int = arr[0],
		dec = arr[1],
		max = dec.length - 1;
		return decimals === 0 ? int :
		[int,".",dec.substr(0, decimals > max ? max : decimals)].join("");
	};
	var totalArrayNoroundOff = totalArray;
	//var totalArrayNoroundOff = toFixed(totalArray,2);

	//alert(sum+totalInterestSceneB);
	$('.interest-rate-total').text('S$'+totalArrayNoroundOff.toFixed(2));
	$('.interest-rate-total').digits();


	// get cash rebate
	if (cardSpend >= 2000){
		var cashRebate = 300*4;
		$('.cashRebate').text('S$'+cashRebate);
	}else if(cardSpend >= 1000){
		var cashRebate = 100*4;
		$('.cashRebate').text('S$'+cashRebate);
	}else if(cardSpend >= 500){
		var cashRebate = 50*4;
		$('.cashRebate').text('S$'+cashRebate);
	}else if (cardSpend < 500) {
		var cashRebate = 0;
		$('.cashRebate').text('S$'+cashRebate);
	}

	//add decimal point
	var InterestRebate = totalArrayNoroundOff+cashRebate;
	setTimeout(function(){
	var $container = $('.odometer').eq(0),
	odometer = new Odometer({
		el: $container.get(0),
	}),
	value = InterestRebate;
	$container.html(value);

	}, 300);
}
/////////////////////////// END : SCENARIO A //////////////////////////



//////////////////////////// SCENARIO B ///////////////////////////////
function calculateB(){
	var dividend = 15000;
	var cardSpend = $('#cardSpend').val();
	var sallaryCredit = $('#sallaryCredit').val();
	var giro = $('#giro').val();
	var balance = $('#acct_balance').val();

	// console.log('calculateB', cardSpend, sallaryCredit, giro, balance);
	var divideResult = Math.floor(balance/dividend);
	var getModulus = balance % dividend;
	var calcResult = divideResult*dividend+getModulus;

	var setArray = [getModulus];
	for(i=0;i<divideResult;i++){
	  setArray.push(dividend);
	}
	setArray.push(setArray.shift());

	//set of first six array
	var itemB0 = setArray[0]*0.50 / 100 || 0;  
	var itemB1 = setArray[1]*0.55 / 100 || 0;
	var itemB2 = setArray[2]*0.65 / 100 || 0;
	var itemB3 = setArray[3]*0.80 / 100 || 0;
	var itemB4 = setArray[4]*2.50 / 100 || 0;
	var itemB5 = setArray[5]*0.05 / 100 || 0;

	//total of first six array
	var totalInterestSceneB = itemB0+itemB1+itemB2+itemB3+itemB4+itemB5;

	//slice from 6th array
	var sliceArray = setArray.slice(6);

	//multiply each array
	var multiply = sliceArray.map(function(x) { return x *0.05 / 100 || 0; });
	
	//remove last array from list
	//multiply.splice(-1,1)

	//sum of all list of array
	var sum = multiply.reduce(function (a, b) {
		return a + b;
	}, 0);
	
	var totalArray = sum+totalInterestSceneB;

	//prevents rounding off of decimal
	var toFixed = function(val, decimals) {
		var arr = ("" + val).split(".");
		if(arr.length === 1) 
			return val;
		var int = arr[0],
		dec = arr[1],
		max = dec.length - 1;
		return decimals === 0 ? int :
		[int,".",dec.substr(0, decimals > max ? max : decimals)].join("");
	};
	var totalArrayNoroundOff = totalArray;
	//var totalArrayNoroundOff = toFixed(totalArray,2);

	//alert(sum+totalInterestSceneB);
	$('.interest-rate-total').text('S$'+totalArrayNoroundOff.toFixed(2));
	$('.interest-rate-total').digits();



	if (cardSpend >= 2000){
		var cashRebate = 300*4;
		$('.cashRebate').text('S$'+cashRebate);
	}else if(cardSpend >= 1000){
		var cashRebate = 100*4;
		$('.cashRebate').text('S$'+cashRebate);
	}else if(cardSpend >= 500){
		var cashRebate = 50*4;
		$('.cashRebate').text('S$'+cashRebate);
	}else if (cardSpend < 500) {
		var cashRebate = 0;
		$('.cashRebate').text('S$'+cashRebate);
	}

	var InterestRebate = totalArrayNoroundOff+cashRebate;
	setTimeout(function(){
		var $container = $('.odometer').eq(0),
		odometer = new Odometer({
			el: $container.get(0),
		}),
		value = InterestRebate;
		$container.html(value);

	}, 300);
}calculateB();
/////////////////////// END : SCENARIO B /////////////////////////


/////////////////////////// SCENARIO C ///////////////////////////
function calculateC(){
	// console.log('calculateC');
	var dividend = 15000;
	var cardSpend = $('#cardSpend').val();
	var sallaryCredit = $('#sallaryCredit').val();
	var giro = $('#giro').val();
	var balance = $('#acct_balance').val();

	var baseInterest = balance*0.050 / 100 || 0;

	//prevents rounding off of decimal
	var toFixed = function(val, decimals) {
		var arr = ("" + val).split(".");
		if(arr.length === 1) 
			return val;
		var int = arr[0],
		dec = arr[1],
		max = dec.length - 1;
		return decimals === 0 ? int :
		[int,".",dec.substr(0, decimals > max ? max : decimals)].join("");
	};
	var totalArrayNoroundOff = baseInterest;
	//var totalArrayNoroundOff = toFixed(baseInterest,2);



	$('.interest-rate-total').text('S$'+totalArrayNoroundOff.toFixed(2));
	$('.interest-rate-total').digits();

	if (cardSpend >= 2000){
		var cashRebate = 300*4;
		$('.cashRebate').text('S$'+cashRebate);
	}else if(cardSpend >= 1000){
		var cashRebate = 100*4;
		$('.cashRebate').text('S$'+cashRebate);
	}else if(cardSpend >= 500){
		var cashRebate = 50*4;
		$('.cashRebate').text('S$'+cashRebate);
	}else if (cardSpend < 500) {
		var cashRebate = 0;
		$('.cashRebate').text('S$'+cashRebate);
	}

	setTimeout(function(){
		var $container = $('.odometer').eq(0),
		odometer = new Odometer({
			el: $container.get(0),
		}),
		value = totalArrayNoroundOff;
		$container.html(value);

	}, 300);
}
//////////////////////// END : SCENARIO C //////////////////////////


//EXECUTE CONDITION
function exeCondition(){
	// console.log('exeCondition');
	var dividend = 15000;
	var cardSpend = $('#cardSpend').val();
	var sallaryCredit = $('#sallaryCredit').val();
	var giro = $('#giro').val();
	var balance = $('#acct_balance').val();

	// SCENARIO CALLER
	if(sallaryCredit >= 2000 && giro >= 3 ){
		calculateB();
	}else if(sallaryCredit >= 2000 && giro < 3){
		calculateB();
	}else if(sallaryCredit < 2000 && giro >= 3){
		calculateB();
	}else if(sallaryCredit < 2000 && giro < 3){
		calculateA();
	}

	if(cardSpend < 500 ){
		calculateC();
	}

	if (cardSpend >= 2000){
		var cashRebate = 300*4;
		$('.cashRebate').text('S$'+cashRebate);
	}else if(cardSpend >= 1000){
		var cashRebate = 100*4;
		$('.cashRebate').text('S$'+cashRebate);
	}else if(cardSpend >= 500){
		var cashRebate = 50*4;
		$('.cashRebate').text('S$'+cashRebate);
	}else if (cardSpend < 500) {
		var cashRebate = 0;
		$('.cashRebate').text('S$'+cashRebate);
	}

	//fake field trigger
	var cloneCardSpendAmountVal = $('#cardSpend').val();
	$('.fakeCardSpend').val(cloneCardSpendAmountVal);

	var cloneCreditAmountVal = $('#sallaryCredit').val();
	$('.fakeSalaryCredit').val(cloneCreditAmountVal);

	var cloneGiroAmountVal = $('#giro').val();
	$('.fakeGiro').val(cloneGiroAmountVal);

	var cloneAcctBalAmountVal = $('#acct_balance').val();
	$('.fakeAcctBal').val(cloneAcctBalAmountVal);
	//end : fake field trigger 

	$('.cashRebate').digits();

}
// END : EXECUTE CONDITION


$('.quantity').on('change keyup', function(){
	exeCondition();

});

$('.btn-adjust').on('click', function(){
	exeCondition();
});





$('.fake-input').bind('keyup keypress',function(){
	//fake field trigger
	var pushCardAmountGet = $('.fakeCardSpend').val();
	var pushCardAmountReplace = pushCardAmountGet.replace(/[^0-9.]/g,'');
	var pushCardAmountParseInt = parseInt(pushCardAmountReplace.replace(/[^0-9.]/g,''), 10);
	$('#cardSpend').val(pushCardAmountParseInt);

	///alert(pushCardAmountParseInt);

	var pushCreditAmountGet = $('.fakeSalaryCredit').val();
	var pushCreditAmountReplace = pushCreditAmountGet.replace(/[^0-9.]/g,'');
	var pushCreditAmountParseInt = parseInt(pushCreditAmountReplace.replace(/[^0-9.]/g,''), 10);
	$('#sallaryCredit').val(pushCreditAmountParseInt);

	var pushGiroAmountGet = $('.fakeGiro').val();
	var pushGiroAmountReplace = pushGiroAmountGet.replace(/[^0-9.]/g,'');
	var pushGiroAmountParseInt = parseInt(pushGiroAmountReplace.replace(/[^0-9.]/g,''), 10);
	$('#giro').val(pushGiroAmountParseInt);

	var pushAcctBalAmountGet = $('.fakeAcctBal').val();
	var pushAcctBalAmountReplace = pushAcctBalAmountGet.replace(/[^0-9.]/g,'');
	var pushAcctBalAmountParseInt = parseInt(pushAcctBalAmountReplace.replace(/[^0-9.]/g,''), 10);
	$('#acct_balance').val(pushAcctBalAmountParseInt);

	//end : fake field trigger 

	var cardSpend = $('#cardSpend').val();
	var sallaryCredit = $('#sallaryCredit').val();
	var giro = $('#giro').val();
	var balance = $('#acct_balance').val();

	// condition scenario
	if(sallaryCredit >= 2000 && giro >= 3 ){
		calculateB();
	}else if(sallaryCredit >= 2000 && giro < 3){
		calculateB();
	}else if(sallaryCredit < 2000 && giro >= 3){
		calculateB();
	}else if(sallaryCredit < 2000 && giro < 3){
		calculateA();
	}

	if(cardSpend < 500 ){
		calculateC();
	}

	if (cardSpend >= 2000){
		var cashRebate = 300*4;
		$('.cashRebate').text('S$'+cashRebate);
	}else if(cardSpend >= 1000){
		var cashRebate = 100*4;
		$('.cashRebate').text('S$'+cashRebate);
	}else if(cardSpend >= 500){
		var cashRebate = 50*4;
		$('.cashRebate').text('S$'+cashRebate);
	}else if (cardSpend < 500) {
		var cashRebate = 0;
		$('.cashRebate').text('S$'+cashRebate);
	}
});


//AUTONUMERIC AND ADD COMMA SEPARTION FOR FIELD
new AutoNumeric('#flexInput1', { 
    currencySymbol : 'S$',
    alwaysAllowDecimalCharacter : false,
	allowDecimalPadding : false,
	maximumValue : '1000000000',
	watchExternalChanges: true,
    emptyInputBehavior: "always"
});
new AutoNumeric('#flexInput2', { 
    currencySymbol : 'S$',
    alwaysAllowDecimalCharacter : false,
	allowDecimalPadding : false,
	maximumValue : '1000000000',
	watchExternalChanges: true,
	emptyInputBehavior: "always"
});
new AutoNumeric('#flexInput3', { 
    alwaysAllowDecimalCharacter : false,
	allowDecimalPadding : false,
	maximumValue : '3',
	watchExternalChanges: true,
	emptyInputBehavior: "always"
});
new AutoNumeric('#flexInput4', { 
    currencySymbol : 'S$',
    alwaysAllowDecimalCharacter : false,
	allowDecimalPadding : false,
	maximumValue : '1000000000',
	watchExternalChanges: true,
	emptyInputBehavior: "always"
});


jQuery('.number-input').each(function() {	
	var spinner = jQuery(this),
	input = spinner.find('input[type="number"]'),
	btnUp = spinner.find('.quantity-up.bt-1'),
	btnDown = spinner.find('.quantity-down.bt-1'),
	btnUp2 = spinner.find('.quantity-up.bt-2'),
	btnDown2 = spinner.find('.quantity-down.bt-2'),
	btnUp3 = spinner.find('.quantity-up.bt-3'),
	btnDown3 = spinner.find('.quantity-down.bt-3'),
	btnUp4 = spinner.find('.quantity-up.bt-4'),
	btnDown4 = spinner.find('.quantity-down.bt-4'),
	min = input.attr('min'),
	max = input.attr('max'),
	stepGetUp = input.attr('step'),
	stepGetDown = input.attr('step');

	btnUp.click(function() {
		var oldValue = parseFloat(input.val());
		if (oldValue >= max) {
			var newVal = oldValue;
		} else {
			var newVal = oldValue + 100;
		}
		spinner.find("input").val(newVal);
		spinner.find("input").trigger("change");
	});

	btnDown.click(function() {
		var oldValue = parseFloat(input.val());
		if (oldValue <= min) {
			var newVal = oldValue;
		} else {
			var newVal = oldValue - 100;
		}
		spinner.find("input").val(newVal);
		spinner.find("input").trigger("change");
	});

	btnUp2.click(function() {
		var oldValue = parseFloat(input.val());
		if (oldValue >= max) {
			var newVal = oldValue;
		} else {
			var newVal = oldValue + 500;
		}
		spinner.find("input").val(newVal);
		spinner.find("input").trigger("change");
	});

	btnDown2.click(function() {
		var oldValue = parseFloat(input.val());
		if (oldValue <= min) {
			var newVal = oldValue;
		} else {
			var newVal = oldValue - 500;
		}
		spinner.find("input").val(newVal);
		spinner.find("input").trigger("change");
	});

	btnUp3.click(function() {
		var oldValue = parseFloat(input.val());
		if (oldValue >= max) {
			var newVal = oldValue;
		} else {	
			var newVal = oldValue + 1;
		}
		spinner.find("input").val(newVal);
		spinner.find("input").trigger("change");
	});

	btnDown3.click(function() {
		var oldValue = parseFloat(input.val());
		if (oldValue <= min) {
			var newVal = oldValue;
		} else {
			var newVal = oldValue - 1;
		}
		spinner.find("input").val(newVal);
		spinner.find("input").trigger("change");
	});

	btnUp4.click(function() {
		var oldValue = parseFloat(input.val());
		if (oldValue >= max) {
			var newVal = oldValue;
		} else {
			var newVal = oldValue + 500;
		}
		spinner.find("input").val(newVal);
		spinner.find("input").trigger("change");
	});

	btnDown4	.click(function() {
		var oldValue = parseFloat(input.val());
		if (oldValue <= min) {
			var newVal = oldValue;
		} else {
			var newVal = oldValue - 500;
		}
		spinner.find("input").val(newVal);
		spinner.find("input").trigger("change");
	});





});




});