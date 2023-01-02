// JavaScript Document

//------------ HOW TO KEEP NAVBAR FIXED ON SCROLL ------------ needs more work!!!

//document.addEventListener("click", function (){
//	document.querySelector("nav").classList.remove("my-4");		
//	document.querySelectorAll("#navigation div")[0].classList.add("fixed");
//});

//------------ HOW TO KEEP NAVBAR FIXED ON SCROLL FROM TOP > 150 ------------ needs more work!!!

//window.onscroll = function() {
//	if (document.documentElement.scrollTop > 150) {
//    document.querySelector("nav").classList.remove("my-4");	
//	document.querySelectorAll("#navigation div")[0].classList.add("fixed"); 
//	}
//}


// ------------- To Obtain Integer or float values from Id selector ------------


function getIdValueInteger(id) {
  return parseInt(document.getElementById(id).value);
}

function getIdValueFloat(id) {
  return parseFloat(document.getElementById(id).value);
}

function getInputValue(id) {
  return document.getElementById(id).value;
}


// -------  Income Radio Button 1 --------

document.querySelector("#other-yes").addEventListener("change", function () {
  document.querySelectorAll(".income-text div")[1].classList.remove("no-initial-display");
})

document.querySelector("#other-no").addEventListener("change", function () {
  document.querySelectorAll(".income-text div")[1].classList.add("no-initial-display");
  document.querySelectorAll("#income input")[3].value = 0;
  document.querySelectorAll("#income input")[5].checked = true;
})

// -------   Gather Income Input number values and If All Income Inputs are Validated move to Expenses Section--------

document.querySelector("#income-button").addEventListener("click", clickIncomeButton);

function clickIncomeButton() {
  if (areBothIncomesFilled() && isRadioQuestionTwoChecked()) {
    document.querySelector("#expenses").classList.remove("no-initial-display");
    document.querySelector("#footer").classList.remove("light-section");
    document.querySelector("#footer").classList.add("dark-section");
  }

  let netIncomeInputValue = getIdValueInteger("net-income-input");
  let otherIncomeInputValue = getIdValueInteger("other-income-input");

  return netIncomeInputValue + otherIncomeInputValue;

}

function areBothIncomesFilled() {
  if (document.querySelectorAll("#income input")[0].value === "" || document.querySelectorAll("#income input")[3].value === "") {
    document.querySelector("#income p a").setAttribute("href", "#income");
    alert("Please enter a value");
    return false;
  } else {
    document.querySelector("#income p a").setAttribute("href", "#expenses");
    return true;
  }
}

function isRadioQuestionTwoChecked() {
  if (document.querySelectorAll("#income input")[4].checked === false && document.querySelectorAll("#income input")[5].checked === false) {
    document.querySelector("#income p a").setAttribute("href", "#income");
    alert("Please select yes or no");
    return false;
  } else {
    return true;
  }
}


// -------  Gather Expenses Input number values and if All Validated move to Planner Section--------

document.querySelector("#expenses-button").addEventListener("click", clickExpensesButton);

function clickExpensesButton() {

  let groceriesInputValue = getIdValueInteger("monthly-groceries");
  let billsInputValue = getIdValueInteger("monthly-bills");
  let loansInputValue = getIdValueInteger("monthly-loans");
  let othersInputValue = getIdValueInteger("monthly-others");
  let totalExpensesInputValues = groceriesInputValue + billsInputValue + loansInputValue + othersInputValue;


  if (isNaN(totalExpensesInputValues)) {
    document.querySelector("#expenses p a").setAttribute("href", "#expenses");
    alert("Please enter a value");
  } else {
    document.querySelector("#expenses p a").setAttribute("href", "#planner");
    document.querySelector("#planner").classList.remove("no-initial-display");
    document.querySelector("#title").classList.add("no-initial-display");
    document.querySelector("#intro").classList.add("no-initial-display");
    document.querySelector("#income").classList.add("no-initial-display");
    document.querySelector("#expenses").classList.add("no-initial-display");
  }

  return totalExpensesInputValues * 12;

}

// -------  Subtract Expenses from Incomes and Fill in Savings Table including Table Validation --------

document.querySelector("#savings-button").addEventListener("click", clickSavingsButton);

function clickSavingsButton() {

  let moneyRemaining = clickIncomeButton() - clickExpensesButton();
  let monthsForPlan = parseInt(document.querySelector("#months-of-saving").value);
  let percentageWeightingTotal = 0;


  for (let i = 0; i < document.querySelectorAll(".percentage-weighting input").length; i++) {


    let savTypePercentageWeighting = parseFloat((document.querySelectorAll(".percentage-weighting input")[i].value) / 100);
    document.querySelectorAll(".y-amount")[i].innerHTML = Math.round((moneyRemaining * savTypePercentageWeighting)) + " €";
    document.querySelectorAll(".o-amount")[i].innerHTML = Math.round((moneyRemaining * savTypePercentageWeighting * (monthsForPlan / 12))) + " €";

    if (document.querySelectorAll(".y-amount")[i].innerHTML === "NaN €") {
      document.querySelectorAll(".y-amount")[i].innerHTML = "0 €";
    }

    if (document.querySelectorAll(".o-amount")[i].innerHTML === "NaN €") {
      document.querySelectorAll(".o-amount")[i].innerHTML = Math.round(((moneyRemaining * savTypePercentageWeighting) / 12)) + " €";
      if (document.querySelectorAll(".o-amount")[i].innerHTML === "NaN €") {
        document.querySelectorAll(".o-amount")[i].innerHTML = "0 €";
      }
    }

    percentageWeightingTotal += savTypePercentageWeighting;
    parseFloat(percentageWeightingTotal).toFixed(2)

  }

  if (percentageWeightingTotal > 1) {
    alert("The Total of % Weighting of each section needs to be less or equal than 100");
  } else {
    document.querySelector("#inv").classList.remove("no-initial-display");
  }


  return (moneyRemaining * (1 - parseFloat(percentageWeightingTotal))).toFixed(0); // amount of money left after factoring in savings (so it means what is left for investments)

}


document.querySelector("#investments-button").addEventListener("click", clickInvestmentsButton);

function clickInvestmentsButton() {

  let fundsLeftForInvestment = clickSavingsButton();

  document.querySelector(".investments-funds").classList.remove("no-initial-display");

  document.querySelectorAll(".investments-funds p")[1].innerHTML = "Yearly Investment Funds: " + fundsLeftForInvestment + " €";
  document.querySelectorAll(".investments-funds p")[0].innerHTML = "Monthly Investment Funds: " + Math.round(fundsLeftForInvestment / 12) + " €";

}
