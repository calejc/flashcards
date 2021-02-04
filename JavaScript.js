

{/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script> */}

{/* <script> */}

var upperBound = 0, totalCounter = -1, correctCounter = 0, attempts = 0, minTriesRequired = 3, userAnswer = "", answerKey = "", tmp = "";



function enter(){
  $("#answer").on("keyup", function(event){
    if (event.which === 13){
      event.preventDefault();
      $("#submit").click();
    }
  });
}
function randomInteger(upperBound){
  
  var tmp = Math.floor(Math.random() * 2);

  var x = Math.floor(Math.random() * upperBound) + 1;
  if (tmp == 0){
    x *= -1;
    return x;
  } else{
    return x;
  }
  return x;
}
function randomNegative(upperBound){
  var x = Math.floor(Math.random() * upperBound) + 1;
  return (x * -1);
}
function randomOperator(categorySelected){
  var op;
  if (categorySelected == "addSubtract"){
    var a = Math.floor(Math.random() * 2);
    if (a === 0){
      op = "+";
      upperBound = 25;
    } else if (a === 1){
      op = "&#x2212";
      upperBound = 25;
    }
  } else if (categorySelected == "timesDivide"){
    var x = Math.floor(Math.random() * 2);
    if (x === 0){
      op = "&divide";
      upperBound = 60;
    } else if (x === 1){
      op = "&times";
      upperBound = 10;
    }
  }
  return [op, upperBound]
}
function flash(color){
  $("#card").addClass(color);
  setTimeout(function(){
    $("#card").removeClass(color);
    $("#answer").val("");
  }, 500);
}
function answerReset(){
  attempts = 0;
  $("#answerDisplay").hide();
  $("#answer").show();
  $("#submit").show();
  $("#returnMain").show();
  $("#answer").val("");
  $("#skip").prop("disabled", true);
  $("#submit").prop("disabled", true);
  $("#answer").keyup(function(){
    $("#submit").prop("disabled", this.value == "" ? true : false);
  });
}
function selectCategory(){
  $("#addSubtract").on("click", function(){
    window.correctCounter = 0;
    window.totalCounter = -1;
    window.tmp = $(this).val();
    $("#card").addClass("flipped");
    newProblem(tmp);
  });
  $("#timesDivide").on("click", function(){
    window.correctCounter = 0;
    window.totalCounter = -1;
    window.tmp = $(this).val();
    $("#card").addClass("flipped");
    newProblem(tmp);
  });
}
function returnMain(){
  $("#returnMain").on("click", function(){
    tmp = ""
    $("#card").removeClass("flipped");
    selectCategory();
  });
}
function parseOp(operator){
  var localOp = "";
  if (operator === "&#x2212"){
    localOp = " - ";
  } else if (operator === "&times"){
    localOp = "*";
  } else if (operator === "&divide"){
    localOp = "/";
  } else {
    localOp = "+";
  }
  return localOp;
}
function check(operand1, operand2, operator){
  var localOp = parseOp(operator);
  $("#operator").html(operator);
  $("#operand1").html(operand1);

  if (operand2 < 0){
    $("#operand2").html("("+operand2+")");
  } else{
    $("#operand2").html(operand2);
  }

  $("#submit").off('click').on('click',function(){
    userAnswer = eval($("#answer").val());
    answerKey = eval((parseInt(operand1)) + localOp + (parseInt(operand2)));
    if (userAnswer == answerKey){
      if (attempts < 1){
        correctCounter++;
      }
      flash("green");
      newProblem(tmp);
    } else if (userAnswer != answerKey){
      attempts++;
      flash("red");
      if (attempts >= minTriesRequired){
        $("#answer").hide();
        $("#submit").hide();
        $("#returnMain").hide();
        $("#answerDisplay").html(answerKey);
        $("#answerDisplay").show().delay(5000).queue(function(next){
          newProblem(tmp);
          next();
        });

      }
    }
  });
}
function wholeNumber(n){
  var x = 0;
  var result = (n - Math.floor(n)) !== 0;
  if (result){
    x = 0;
  } else {
    x = 1;
  }
  return x;
}
function newProblem(categorySelected){
  answerReset();
  window.totalCounter++;
  $("#scoreCounter").html(correctCounter+"/"+totalCounter);
  var operand1 = "", operand2 = "";
  var values = randomOperator(categorySelected);
  upperBound = values[1];
  var operator = values[0];
  if (operator == "&divide"){
    do {
      var posInt = randomInteger(upperBound);
      var negInt = randomNegative(upperBound);
      var x = Math.floor(Math.random() * 2) + 1;
      if (x === 1){
        operand1 = posInt;
        operand2 = negInt;
      } else {
        operand1 = negInt;
        operand2 = posInt;
      }
      var tmpOp = parseOp(operator);
      answerKey = eval((parseInt(operand1)) + tmpOp + (parseInt(operand2)));
      var wholeNum = wholeNumber(answerKey);
    } while(wholeNum === 0);
    check(operand1, operand2, operator);
  } else {
    var posInt = randomInteger(upperBound);
    var negInt = randomNegative(upperBound);
    var x = Math.floor(Math.random() * 2) + 1;
    if (x === 1){
      operand1 = posInt;
      operand2 = negInt;
    } else {
      operand1 = negInt;
      operand2 = posInt;
    }
    check(operand1, operand2, operator);
  }
}

$(document).ready(function(){
  enter();
  selectCategory();
  returnMain();
});

{/* </script> */}
