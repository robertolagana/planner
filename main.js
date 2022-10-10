// JavaScript Document

// below are functions that replace longer pieces of code - so it will be a function within a function. I will always leave a couple of lines with the original longer code for comparison

function getIdValueInteger(id) {
  return parseInt(document.getElementById(id).value);
}

function getIdValueFloat(id) {
  return parseFloat(document.getElementById(id).value);
}

function noDisplay(id) {
  return document.getElementById(id).style.display = "none";
}

function yesDisplay(id) {
  return document.getElementById(id).style.display = "block";
}

// now below are the functions that are linked to the html - eg. onclick

function switchpanel0() {
  document.getElementById("main-home").style.display = "block";
  document.getElementById("sidecontent").style.display = "block";
  document.getElementById("main-intro").style.display = "none";
  document.getElementById("main-expenses").style.display = "none";
  document.getElementById("main-savings").style.display = "none";
  document.getElementById("main-invest").style.display = "none"; 
  document.getElementById("main-property").style.display = "none"; //document.getElementById("btnNavHome").style.backgroundColor = "#266751";
  //document.getElementById("btnNavExp").style.backgroundColor = "#41AF71";
}

function switchpanel1() {
  yesDisplay("main-expenses");
  yesDisplay("sidecontent");
  noDisplay("main-intro");
  noDisplay("main-home");
  noDisplay("main-savings");
  noDisplay("main-invest");
  noDisplay("main-property");
  //document.getElementById("btnNavExp").style.backgroundColor = "#266751";
  //document.getElementById("btnNavHome").style.backgroundColor = "#41AF71";
}

function switchpanel2() {
  yesDisplay("main-savings");
  yesDisplay("sidecontent");
  noDisplay("main-intro");
  noDisplay("main-home");
  noDisplay("main-expenses");
  noDisplay("main-invest"); 
  noDisplay("main-property");
  //document.getElementById("btnNavExp").style.backgroundColor = "#266751";
  //document.getElementById("btnNavHome").style.backgroundColor = "#41AF71";
}

function switchpanel3() {
  yesDisplay("main-invest");
  yesDisplay("sidecontent");
  noDisplay("main-intro");
  noDisplay("main-home");
  noDisplay("main-expenses");
  noDisplay("main-savings");
  noDisplay("main-property");
  //document.getElementById("btnNavExp").style.backgroundColor = "#266751";
  //document.getElementById("btnNavHome").style.backgroundColor = "#41AF71";
}
function switchpanel4() {
  yesDisplay("main-property");
  yesDisplay("sidecontent");
  noDisplay("main-intro");
  noDisplay("main-home");
  noDisplay("main-expenses");
  noDisplay("main-savings");
  noDisplay("main-invest");
  //document.getElementById("btnNavExp").style.backgroundColor = "#266751";
  //document.getElementById("btnNavHome").style.backgroundColor = "#41AF71";
}

function radiobuttonselection0() {
  if (document.getElementById("other-no").checked) {
    noDisplay("otherincome");
  }
}

function radiobuttonselection1() {
  if (document.getElementById("other-yes").checked) {
    yesDisplay("otherincome");
  }
}

function radiobuttonselection2() {
  if (document.getElementById("propinterest-no").checked) {
    noDisplay("propsurvey");
  }
}

function radiobuttonselection3() {
  if (document.getElementById("propinterest-yes").checked) {
    yesDisplay("propsurvey");
  }
}

function radiobuttonselection4() {
  if (document.getElementById("propowned-no").checked) {
    noDisplay("showownedpropcostinput");
  }
}

function radiobuttonselection5() {
  if (document.getElementById("propowned-yes").checked) {
    yesDisplay("showownedpropcostinput");
  }
}


let a = 0;
let b = 0;
let btax = 0;
let tinc = 0;
let c = 0;
let d = 0;
let e = 0;
let f = 0;
let texp = 0;
let rem = 0;
let rem2 = 0;
let g = 0;
let tinv = 0;


function myIncome() {
  a = parseInt(document.getElementById("netincomeinput").value);
  b = parseInt(document.getElementById("otherincomeinput").value);

  if (Number.isNaN(a)) {
    a = 0;
  }
  if (Number.isNaN(b)) {
    b = 0;
  }
  if (document.getElementById("other-no").checked) {
    b = 0;
  }
  if (document.getElementById("save-no").checked) {
    tinc = a + b;
    b = 0;
    btax = (tinc - a) * 0.15;
  } else {
    tinc = a;
    btax = b * 0.15;
  }

  yesDisplay("main-expenses");
  noDisplay("main-home");
}

function myExpenses() {
  c = getIdValueInteger("monthly-groceries");
  d = getIdValueInteger("monthly-bills");
  e = getIdValueInteger("monthly-others");
  f = getIdValueInteger("monthly-loan");
  if (Number.isNaN(c)) {
    c = 0;
  }
  if (Number.isNaN(d)) {
    d = 0;
  }
  if (Number.isNaN(e)) {
    e = 0;
  }
  if (Number.isNaN(f)) {
    f = 0;
  }
  texp = c + d + e + f;
  rem = tinc - texp;

  yesDisplay("main-savings");
  noDisplay("main-expenses");

}

function showmesavings() {

  g = getIdValueInteger("monthsofsaving");
  rem2 = rem - btax;

  if (Number.isNaN(g)) {
    g = 1;
  }

  if (g == 1) {
    document.getElementById("overall-or-monthly").innerHTML = "Monthly Amount";
  } else {
    document.getElementById("overall-or-monthly").innerHTML = "Overall Amount";
  }

  if (b > 550) {
    document.getElementById("pen-weighting").innerHTML = "20% of Remaining Funds";
    document.getElementById("pen-yearly-sav").innerHTML = rem * 0.2 * 12;
    document.getElementById("pen-overall-sav").innerHTML = rem * 0.2 * g;
    document.getElementById("vac-weighting").innerHTML = "25% of Remaining Funds";
    document.getElementById("vac-yearly-sav").innerHTML = rem * 0.25 * 12;
    document.getElementById("vac-overall-sav").innerHTML = rem * 0.25 * g;
    document.getElementById("home-weighting").innerHTML = "15% of Remaining Funds";
    document.getElementById("home-yearly-sav").innerHTML = rem * 0.15 * 12;
    document.getElementById("home-overall-sav").innerHTML = rem * 0.15 * g;
    document.getElementById("rain-weighting").innerHTML = "85% of Other Income";
    document.getElementById("rain-yearly-sav").innerHTML = b * 0.85 * 12;
    document.getElementById("rain-overall-sav").innerHTML = b * 0.85 * g;
    confirm("Remember that you have to pay " + btax * 12 + " euros in taxes per year from your other income. This amount is already deducted from your savings and investment funds!")
  } else if (btax > 0 && b < 550) {
    document.getElementById("pen-weighting").innerHTML = "12% of Remaining Funds";
    document.getElementById("pen-yearly-sav").innerHTML = rem2 * 0.12 * 12;
    document.getElementById("pen-overall-sav").innerHTML = rem2 * 0.12 * g;
    document.getElementById("vac-weighting").innerHTML = "18% of Remaining Funds";
    document.getElementById("vac-yearly-sav").innerHTML = rem2 * 0.18 * 12;
    document.getElementById("vac-overall-sav").innerHTML = rem2 * 0.18 * g;
    document.getElementById("home-weighting").innerHTML = "10% of Remaining Funds";
    document.getElementById("home-yearly-sav").innerHTML = rem2 * 0.10 * 12;
    document.getElementById("home-overall-sav").innerHTML = rem2 * 0.10 * g;
    document.getElementById("rain-weighting").innerHTML = "35% of Remaining Funds";
    document.getElementById("rain-yearly-sav").innerHTML = rem2 * 0.35 * 12;
    document.getElementById("rain-overall-sav").innerHTML = rem2 * 0.35 * g;
    confirm("Remember that you have still have to pay " + btax * 12 + " euros in taxes per year from your other income. This amount is already deducted from your savings and investment funds!")
  } else {
    document.getElementById("pen-weighting").innerHTML = "12% of Remaining Funds";
    document.getElementById("pen-yearly-sav").innerHTML = rem2 * 0.12 * 12;
    document.getElementById("pen-overall-sav").innerHTML = rem2 * 0.12 * g;
    document.getElementById("vac-weighting").innerHTML = "18% of Remaining Funds";
    document.getElementById("vac-yearly-sav").innerHTML = rem2 * 0.18 * 12;
    document.getElementById("vac-overall-sav").innerHTML = rem2 * 0.18 * g;
    document.getElementById("home-weighting").innerHTML = "10% of Remaining Funds";
    document.getElementById("home-yearly-sav").innerHTML = rem2 * 0.10 * 12;
    document.getElementById("home-overall-sav").innerHTML = rem2 * 0.10 * g;
    document.getElementById("rain-weighting").innerHTML = "35% of Remaining Funds";
    document.getElementById("rain-yearly-sav").innerHTML = rem2 * 0.35 * 12;
    document.getElementById("rain-overall-sav").innerHTML = rem2 * 0.35 * g;
  }

  document.getElementById("savings-table").style.display = "table";
}


function showmeinvest() {

  if (b > 550) {
    tinv = rem * 0.4;
  } else {
    tinv = rem2 * 0.25;
  }

  document.getElementById("monthly-invfunds").innerHTML = tinv;
  document.getElementById("yearly-invfunds").innerHTML = tinv * 12;
  document.getElementById("total-invfunds").innerHTML = tinv * g;

  yesDisplay("amounts-invfunds");
}


function showmeprop() {
				
  yesDisplay("amounts-propfunds");
}

// below is the sidecontent calculator javascript

function calculator() {

  let firstNum = 0;
  let secondNum = 0;
  let operator = "";
  let answer = 0;

  firstNum = getIdValueFloat("num1");
  secondNum = getIdValueFloat("num2");
  operator = document.getElementById("operation").value;

  switch (operator) {
    case "+":
      answer = firstNum + secondNum;
      break;
    case "-":
      answer = firstNum - secondNum;
      break;
    case "*":
      answer = firstNum * secondNum;
      break;
    case "/":
      answer = firstNum / secondNum;
      break;
  }

  if (Number.isNaN(answer)) {
    answer = 0;
  }

  document.getElementById("result").innerHTML = answer;
}
