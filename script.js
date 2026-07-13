function createMenu() {

  const food = document.querySelector("input").value;
  const family = document.getElementById("family").value;
  const budget = document.getElementById("budget").value;
  const time = document.getElementById("time").value;

  let main = "";
  let side = "";
  let soup = "";
  let shopping = "";


  if (food.includes("鶏") || food.includes("肉")) {

    main = "🍖 鶏むね照り焼き";

  } else {

    main = "🍛 節約カレー";

  }


  if (food.includes("キャベツ")) {

    side = "🥗 キャベツサラダ";

  } else {

    side = "🥗 野菜サラダ";

  }


  if (food.includes("卵")) {

    soup = "🍳 卵スープ";

  } else {

    soup = "🍲 味噌汁";

  }


  if (
    food.includes("鶏") ||
    food.includes("肉")
  ) {

    shopping += "☑ 鶏むね肉<br>";

  }


  if (food.includes("キャベツ")) {

    shopping += "☑ キャベツ<br>";

  }


  if (food.includes("卵")) {

    shopping += "☑ 卵<br>";

  }


  if (shopping === "") {

    shopping =
    "☑ 肉類<br>" +
    "☑ 野菜<br>" +
    "☑ 調味料";

  }


  document.getElementById("menu").innerHTML =

  `
  <div class="menu-card">

    <h2>🍳 今日のおすすめ献立</h2>

    <p>${main}</p>
    <p>${side}</p>
    <p>${soup}</p>

    <hr>

    <p>👨‍👩‍👧‍👦 家族人数：${family}人</p>
    <p>💰 予算：${budget}円以内</p>
    <p>⏰ 調理時間：${time}分以内</p>

    <h3>🛒 買い物リスト</h3>
    <p>${shopping}</p>

  </div>
  `;

}