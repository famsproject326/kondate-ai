function createMenu() {

  const fridge = document.getElementById("fridge").value;
  const avoid = document.getElementById("avoid").value;

  const family = document.getElementById("family").value;
  const budget = document.getElementById("budget").value;
  const time = document.getElementById("time").value;
  const child = document.getElementById("child").value;


  let main = "";
  let side = "";
  let soup = "";



  if (fridge.includes("鶏")) {

    main = "🍖 甘辛チキン";

  } else {

    main = "🍛 節約カレー";

  }



  if (
    fridge.includes("キャベツ") &&
    !avoid.includes("キャベツ")
  ) {

    side = "🥗 キャベツサラダ";

  } else {

    side = "🥗 野菜サラダ";

  }



  if (
    fridge.includes("卵") &&
    !avoid.includes("卵")
  ) {

    soup = "🍳 卵スープ";

  } else {

    soup = "🍲 味噌汁";

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

    <p>⏰ 時間：${time}分以内</p>

    <p>👧 子ども向け：${child}</p>


    <p>
    🚫 避ける食材：${avoid || "なし"}
    </p>



    <h3>🛒 買い物リスト</h3>


    <p>
    ☑ 鶏むね肉<br>
    ☑ キャベツ<br>
    ☑ 味噌<br>
    </p>



  </div>

  `;


}




function createWeek() {


  const avoid = document.getElementById("avoid").value;


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
  <p>日 🍲 鍋料理</p>


  <hr>


  <p>
  🚫 避ける食材：${avoid || "なし"}
  </p>


  </div>

  `;


}