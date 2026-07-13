function createMenu() {

  const family = document.getElementById("family").value;
  const budget = document.getElementById("budget").value;
  const time = document.getElementById("time").value;

  document.getElementById("menu").innerHTML =

  `
  <div class="menu-card">

    <h2>🍳 今日のおすすめ献立</h2>

    <p>🍖 鶏むね照り焼き</p>
    <p>🥗 キャベツサラダ</p>
    <p>🍲 味噌汁</p>

    <hr>

    <p>👨‍👩‍👧‍👦 家族人数：${family}人</p>
    <p>💰 予算：${budget}円以内</p>
    <p>⏰ 時間：${time}分以内</p>

    <h3>🛒 買い物リスト</h3>

    <p>
    ☑ 鶏むね肉<br>
    ☑ キャベツ<br>
    ☑ 玉ねぎ<br>
    ☑ 味噌
    </p>

  </div>
  `;

}



function createWeek() {

  const family = document.getElementById("family").value;
  const budget = document.getElementById("budget").value;
  const time = document.getElementById("time").value;


  document.getElementById("menu").innerHTML =

  `
  <div class="menu-card">

    <h2>📅 1週間献立</h2>

    <p>月 🍖 鶏むね照り焼き</p>
    <p>火 🍛 節約カレー</p>
    <p>水 🐟 焼き魚定食</p>
    <p>木 🍳 オムライス</p>
    <p>金 🥘 豚丼</p>
    <p>土 🍝 パスタ</p>
    <p>日 🍲 鍋料理</p>


    <hr>

    <p>👨‍👩‍👧‍👦 家族人数：${family}人</p>
    <p>💰 予算：${budget}円以内</p>
    <p>⏰ 時間：${time}分以内</p>


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