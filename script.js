function createMenu() {

  const food = document.querySelector("input").value;

  let main = "";
  let side = "";
  let soup = "";

  if (food.includes("鶏") || food.includes("肉")) {

    main = "🍖 鶏むね照り焼き";
    side = "🥗 キャベツサラダ";
    soup = "🍲 味噌汁";

  } else if (food.includes("卵")) {

    main = "🍚 親子丼";
    side = "🥗 ほうれん草のおひたし";
    soup = "🍲 豆腐味噌汁";

  } else {

    main = "🍛 節約カレー";
    side = "🥗 野菜サラダ";
    soup = "🍎 フルーツ";

  }


  document.getElementById("menu").innerHTML =

  `
  <div class="menu-card">

    <h2>🍳 今日のおすすめ献立</h2>

    <p>${main}</p>
    <p>${side}</p>
    <p>${soup}</p>

    <hr>

    <p>💰 目安：500円以内</p>
    <p>⏰ 調理時間：約15分</p>

  </div>
  `;

}