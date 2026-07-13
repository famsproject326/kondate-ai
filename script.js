function createMenu() {

  const fridge = document.getElementById("fridge").value;

  const family = document.getElementById("family").value;
  const budget = document.getElementById("budget").value;
  const time = document.getElementById("time").value;
  const child = document.getElementById("child").value;


  let main = "";
  let side = "";
  let soup = "";
  let shopping = "";


  if (fridge.includes("鶏")) {

    main = "🍖 甘辛チキン";

  } else {

    main = "🍛 節約カレー";

  }


  if (fridge.includes("キャベツ")) {

    side = "🥗 キャベツサラダ";

  } else {

    side = "🥗 野菜サラダ";

  }


  if (fridge.includes("卵")) {

    soup = "🍳 卵スープ";

  } else {

    soup = "🍲 味噌汁";

  }


  if (fridge.includes("鶏")) {

    shopping += "☑ 鶏むね肉<br>";

  }

  if (fridge.includes("キャベツ")) {

    shopping += "☑ キャベツ<br>";

  }

  if (fridge.includes("卵")) {

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

    <h2>🧊 冷蔵庫から作る献立</h2>

    <p>${main}</p>
    <p>${side}</p>
    <p>${soup}</p>

    <hr>

    <p>👨‍👩‍👧‍👦 家族人数：${family}人</p>
    <p>💰 予算：${budget}円以内</p>
    <p>⏰ 時間：${time}分以内</p>
    <p>👧 子ども向け：${child}</p>


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

  <p>月 🍖 甘辛チキン</p>
  <p>火 🍛 子どもカレー</p>
  <p>水 🐟 魚料理</p>
  <p>木 🍳 オムライス</p>
  <p>金 🥘 豚丼</p>
  <p>土 🍝 パスタ</p>
  <p>日 🍲 鍋</p>

  </div>
  `;

}