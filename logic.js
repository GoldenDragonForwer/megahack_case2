var question = 1;

function StartTest()
{
	document.location.href = "test.html";
}

function CreateTest()
{
    document.getElementById("questNum").innerHTML = "Вопрос " + question + "/8";
    
    if(question == 1)
    {
    	document.getElementById("quest").innerHTML = "Вопрос: Сложно ли вам контролировать остаток вашего баланса?";
    } 
    if(question == 2)
    {
    	document.getElementById("quest").innerHTML = "Вопрос: Хотели бы вы моментально пополнять свой счёт при достижении минимальной суммы?";
    }
    if(question == 3)
    {
    	document.getElementById("quest").innerHTML = "Вопрос: Было бы вам удобно автоматическое пополнение баланса в определенный день?";
    }
    if(question == 4)
    {
    	document.getElementById("quest").innerHTML = "Вопрос: Хотели бы вы контролировать время пополнения счёта?";
    }
    if(question == 5)
    {
    	document.getElementById("quest").innerHTML = "Вопрос: Часто ли вы забываете оплатить услуги вовремя?";
    }
    if(question == 6)
    {
    	document.getElementById("quest").innerHTML = "Вопрос: Хотели бы вы не тратить время на оплату услуг?";
    }
    if(question == 7)
    {
    	document.getElementById("quest").innerHTML = "Вопрос: Совершаете ли вы покупки за счёт баланса сим-карты?";
    }
    if(question == 8)
    {
    	document.getElementById("quest").innerHTML = "Вопрос: Совершая покупку с помощью сим-карты, хотели бы вы автоматически пополнять баланс на сумму покупки?";
    }
}

function Answer(val)
{
    localStorage.setItem("answer_" + question, val);
    question++;

    if(parseInt(question - 1) != 8)
	CreateTest();
    else FinishTest();
}

function FinishTest()
{
	document.location.href = "finish.html";

	var thresholdAutopayment = 0;
    var byDate = 0;
    var forMonthly = 0;
    var forMobileCommerce = 0;

	for (var i = 1; i <= 10; i++)
	{
		if(i <= 2)
		{
			if(localStorage.getItem("answer_" + i) == 1)
				thresholdAutopayment++;
		}
		if(i > 2 && i <= 4)
		{
			if(localStorage.getItem("answer_" + i) == 1)
				byDate++;
		}
		if(i > 4 && i <= 6)
		{
			if(localStorage.getItem("answer_" + i) == 1)
				forMonthly++;
		}
		if(i > 6 && i <= 8)
		{
			if(localStorage.getItem("answer_" + i) == 1)
				forMobileCommerce++;
		}
	}

	localStorage.setItem("thresholdAutopayment", thresholdAutopayment);
	localStorage.setItem("byDate", byDate);
	localStorage.setItem("forMonthly", forMonthly);
	localStorage.setItem("forMobileCommerce", forMobileCommerce);
}

function ShowResult()
{
	var autopayments = "Рекомендуемые типы автоплатежей:<br><br>";

	if(localStorage.getItem("thresholdAutopayment") != 2 && localStorage.getItem("byDate") != 2 && localStorage.getItem("forMonthly") != 2 && localStorage.getItem("forMobileCommerce") != 2)
	{
	if(localStorage.getItem("thresholdAutopayment") == 1)
    	autopayments += "Автоплатеж по порогу<br>";
    if(localStorage.getItem("byDate") == 1)
    	autopayments += "Автоплатеж по дате<br>";
    if(localStorage.getItem("forMonthly") == 1)
        autopayments += "Автоплатеж на абонентскую плату<br>";
    if(localStorage.getItem("forMobileCommerce") == 1)
    	autopayments += "Автоплатеж на мобильную коммерцию";
	} else {	
    if(localStorage.getItem("thresholdAutopayment") == 2)
    	autopayments += "Автоплатеж по порогу<br>";
    if(localStorage.getItem("byDate") == 2)
    	autopayments += "Автоплатеж по дате<br>";
    if(localStorage.getItem("forMonthly") == 2)
        autopayments += "Автоплатеж на абонентскую плату<br>";
    if(localStorage.getItem("forMobileCommerce") == 2)
    	autopayments += "Автоплатеж на мобильную коммерцию";
    }

    if(localStorage.getItem("thresholdAutopayment") == 0 && localStorage.getItem("byDate") == 0 && localStorage.getItem("forMonthly") == 0 && localStorage.getItem("forMobileCommerce") == 0)
    	autopayments = "К сожалению, нам не удалось подобрать подходящий для вас тип автоплатежа.";

    document.getElementById("p").innerHTML = autopayments;
}