var checks = document.querySelectorAll(".check");
var max = 2;
for (var i = 0; i < checks.length; i++) checks[i].onclick = selectiveCheck;
function selectiveCheck(event) {
  var checkedChecks = document.querySelectorAll(".check:checked");
  if (checkedChecks.length >= max + 1) return false;
}
var chosenColors;
var firstForamtedColor = "black";
var secondForamtedColor = "";


function hidepopup() { 
   chosenColors = document.querySelectorAll(".check:checked");
  firstForamtedColor = chosenColors[0].value;
  if (chosenColors.length === 2) {
    secondForamtedColor = chosenColors[1].value;
  }
  console.log(firstForamtedColor, secondForamtedColor);
  var elms = document.getElementsByClassName("score");

  Array.from(elms).forEach((x) => {
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  })
return false;
}

