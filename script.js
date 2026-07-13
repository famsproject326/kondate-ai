function createMenu() {

  const food = document.querySelector("input").value;

  let result = "";

  if (food.includes("鶏") || food.includes("肉")) {
    result =
    "🍳 鶏むね照り焼き<br>" +
    "🥗 キャベツサラダ<br>" +
    "🍲 味噌汁";
  } 
  else if (food.includes("卵")) {
    result =
    "🍚 親子丼<br>" +
    "🥗 ほうれん草のおひたし<br>" +
    "🍲 豆腐味噌汁";
  }
  else {
    result =
    "🍛 節約カレー<br>" +
    "🥗 サラダ<br>" +
    "🍎 デザート";
  }

  document.getElementById("menu").innerHTML = result;

}