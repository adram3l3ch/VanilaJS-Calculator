const number = document.querySelectorAll("[data-number]");
const operation = document.querySelectorAll("[data-operation]");
const ac = document.querySelector("[data-ac]");
const deletebtn = document.querySelector("[data-del]");
const equals = document.querySelector("[data-equals]");
const topbtn = document.querySelector("[data-top]");
const btmbtn = document.querySelector("[data-bottom]");

// -------------------Functions---------------------------

const updateDisplay = (num) => {
  let regexp = /[*-/+]/;
  let arr = topbtn.innerText.split("");

  // -----checking whether pointer is used -------------

  if (
    (/[.]/.test(btmbtn.innerText) && num.innerText === ".") ||
    btmbtn.innerText.length > 11
  ) {
  } else {
    // ------------------checking toptext contains characters and end is a character------------
    if (regexp.test(topbtn.innerText) && !regexp.test(arr[arr.length - 1])) {
      topbtn.innerText = "";
      btmbtn.innerText += num.innerText;
    } else {
      if (btmbtn.innerText === "0") {
        btmbtn.innerText = num.innerText;
      } else {
        btmbtn.innerText += num.innerText;
      }
    }
  }
};

const operations = (ope) => {
  // -----------------if btm text is zero do nothing---------------
  if (btmbtn.innerText === "0" && btmbtn.innerText.length === 1) {
  } else {
    // --------------if top text is empty------------
    if (topbtn.innerText === "") {
      topbtn.innerText += btmbtn.innerText + ope.innerText;
      btmbtn.innerText = "0";
    } else {
      find();
      topbtn.innerText = "";
      topbtn.innerText += btmbtn.innerText + ope.innerText;
      btmbtn.innerText = "0";
    }
  }
};

const deletekey = () => {
  // ----------if btm text is non zero or top text is not empty-----------
  if (
    btmbtn.innerText !== "0" ||
    btmbtn.innerText.length !== 1 ||
    topbtn.innerText
  ) {
    let arr = btmbtn.innerText.split("");
    let regexp = /[*-/+]/;
    if (arr.length === 1 && arr[arr.length - 1] === "0") {
      arr = topbtn.innerText.split("");
      if (regexp.test(arr[arr.length - 1])) {
        arr.pop();
        topbtn.innerText = "";
        btmbtn.innerText = arr.join("");
      } else {
        let arr2 = [];
        while (!regexp.test(arr[arr.length - 1])) {
          arr2.unshift(arr.pop());
        }
        btmbtn.innerText = arr2.join("");
        topbtn.innerText = arr.join("");
      }
    } else {
      arr.pop();
      btmbtn.innerText = arr.join("");
    }
  }
  if (btmbtn.innerText === "") {
    btmbtn.innerText = "0";
  }
};

const find = () => {
  if (
    topbtn.innerText === "" ||
    (btmbtn.innerText === "0" && btmbtn.innerText.length === 1)
  ) {
  } else {
    let regexp = /[*-/+]/;
    let result;
    if (regexp.test(topbtn.innerText[topbtn.innerText.length - 1])) {
      let arr = topbtn.innerText.split("");
      let operation = arr[arr.length - 1];
      arr.pop();
      let firstNum = Number(arr.join(""));
      let secondNum = Number(btmbtn.innerText);
      topbtn.innerText += btmbtn.innerText;
      switch (operation) {
        case "/":
          result = firstNum / secondNum;
          break;
        case "*":
          result = firstNum * secondNum;
          break;
        case "+":
          result = firstNum + secondNum;
          break;
        case "-":
          result = firstNum - secondNum;
          break;
      }
      resultString = `${result}`;
      // -----------------converting result to scientific Notation---------------
      if (resultString.length > 11) {
        result = result / 10 ** (resultString.length - 1);
        resultArray = `${result}`.split(".");
        console.log(resultArray);
        result = result.toFixed(8 - resultArray[0].length);
        result = `${result}e${resultString.length - 1}`;
      }

      btmbtn.innerText = result;
    }
  }
};

// ---------------------------EventListeners-------------------------------

number.forEach((num) => {
  num.addEventListener("click", () => {
    updateDisplay(num);
  });
});

operation.forEach((ope) => {
  ope.addEventListener("click", () => {
    operations(ope);
  });
});

ac.addEventListener("click", () => {
  topbtn.innerText = "";
  btmbtn.innerText = "0";
});

deletebtn.addEventListener("click", deletekey);

equals.addEventListener("click", find);
