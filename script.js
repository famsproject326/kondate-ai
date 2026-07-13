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

    shopping =
    "☑ 鶏むね肉（入力済み）<br>" +
    "☑ キャベツ<br>" +
    "☑ 玉ねぎ<br>" +
    "☑ 味噌";

  }

  else if (food.includes("卵")) {

    main = "🍚 親子丼";
    side = "🥗 ほうれん草のおひたし";
    soup = "🍲 豆腐味噌汁";

    shopping =
    "☑ 卵（入力済み）<br>" +
    "☑ 玉ねぎ<br>" +
    "☑ 豆腐<br>" +
    "☑ ほうれん草";

  }

  else if (food.includes("キャベツ")) {

    main = "🥬 キャベツ炒め";
    side = "🥗 コールスロー";
    soup = "🍲 味噌汁";

    shopping =
    "☑ キャベツ（入力済み）<br>" +
    "☑ 豚肉<br>" +
    "☑ 味噌<br>" +
    "☑ 卵";

  }

  else {

    main = "🍛 節約カレー";
    side = "🥗 野菜サラダ";
    soup = "🍎 フルーツ";

    shopping =
    "☑ 肉類<br>" +
    "☑ 野菜<br>" +
    "☑ カレールー";

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



function createWeek() {


  document.getElementById("menu").innerHTML =

  `
  <div class="menu-card">

    <h2>📅 1週間献立</h2>

    <p>月 🍖 鶏むね照り焼き</p>
    <p>火 🍛 節約カレー</p>
    <p>水 🐟 焼き魚定食</p>
    <p>木 🍝 ミートパスタ</p>
    <p>金 🥘 豚丼</p>
    <p>土 🍳 オムライス</p>
    <p>日 🍲 鍋料理</p>

    <hr>

    <h3>🛒 まとめ買いリスト</h3>

    <p>
    ☑ 鶏むね肉<br>
    ☑ 豚肉<br>
    ☑ 卵<br>
    ☑ キャベツ<br>
    ☑ 玉ねぎ<br>
    ☑ 米<br>
    ☑ 調味料
    </p>

  </div>
  `;

}