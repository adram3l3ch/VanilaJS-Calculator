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

  if (/[.]/.test(btmbtn.innerText) && num.innerText === ".") {
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
        btmbtn.innerText = arr[arr.length - 1];
        arr.pop();
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
    if (regexp.test(topbtn.innerText[topbtn.innerText.length - 1])) {
      let arr = topbtn.innerText.split("");
      let operation = arr[arr.length - 1];
      arr.pop();
      let firstNum = Number(arr.join(""));
      let secondNum = Number(btmbtn.innerText);
      topbtn.innerText += btmbtn.innerText;
      switch (operation) {
        case "/":
          btmbtn.innerText = firstNum / secondNum;
          break;
        case "*":
          btmbtn.innerText = firstNum * secondNum;
          break;
        case "+":
          btmbtn.innerText = firstNum + secondNum;
          break;
        case "-":
          btmbtn.innerText = firstNum - secondNum;
          break;
      }
    }
  }
};

// ---------------------------EvenListeners-------------------------------

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
