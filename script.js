function createMenu() {

  const family = document.getElementById("family").value;
  const budget = document.getElementById("budget").value;
  const time = document.getElementById("time").value;
  const child = document.getElementById("child").value;

  let main = "";
  let side = "";
  let soup = "";


  if (child === "あり") {

    main = "🍖 甘辛チキン";
    side = "🌽 コーン入りサラダ";
    soup = "🍲 優しい味の味噌汁";

  } else {

    main = "🍖 鶏むね照り焼き";
    side = "🥗 キャベツサラダ";
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

    <h3>🛒 買い物リスト</h3>

    <p>
    ☑ 鶏むね肉<br>
    ☑ キャベツ<br>
    ☑ コーン<br>
    ☑ 玉ねぎ<br>
    </p>

  </div>
  `;

}



function createWeek() {

  const family = document.getElementById("family").value;
  const budget = document.getElementById("budget").value;
  const time = document.getElementById("time").value;
  const child = document.getElementById("child").value;


  document.getElementById("menu").innerHTML =

  `
  <div class="menu-card">

    <h2>📅 1週間献立</h2>

    <p>月 🍖 甘辛チキン</p>
    <p>火 🍛 子どもカレー</p>
    <p>水 🐟 魚の照り焼き</p>
    <p>木 🍳 オムライス</p>
    <p>金 🥘 豚丼</p>
    <p>土 🍝 パスタ</p>
    <p>日 🍲 鍋料理</p>

    <hr>

    <p>👨‍👩‍👧‍👦 家族人数：${family}人</p>
    <p>💰 予算：${budget}円以内</p>
    <p>⏰ 時間：${time}分以内</p>
    <p>👧 子ども向け：${child}</p>

  </div>
  `;

}