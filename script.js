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
    side = "🥗 キャベツサラダ";
    soup = "🍲 味噌汁";

    shopping = "☑ 鶏むね肉<br>☑ キャベツ<br>☑ 玉ねぎ<br>☑ 味噌";

  } 

  else if (food.includes("卵")) {

    main = "🍚 親子丼";
    side = "🥗 ほうれん草のおひたし";
    soup = "🍲 豆腐味噌汁";

    shopping = "☑ 卵<br>☑ 玉ねぎ<br>☑ 豆腐";

  }

  else if (food.includes("キャベツ")) {

    main = "🥬 キャベツ炒め";
    side = "🥗 キャベツサラダ";
    soup = "🍲 味噌汁";

    shopping = "☑ キャベツ<br>☑ 豚肉<br>☑ 味噌";

  }

  else {

    main = "🍛 節約カレー";
    side = "🥗 野菜サラダ";
    soup = "🍎 フルーツ";

    shopping = "☑ 肉類<br>☑ 野菜<br>☑ 調味料";

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