let currentMenu = "";



function createMenu() {

  const fridge = document.getElementById("fridge").value;
  const avoid = document.getElementById("avoid").value;

  const family = document.getElementById("family").value;
  const budget = document.getElementById("budget").value;
  const time = document.getElementById("time").value;
  const child = document.getElementById("child").value;


  let main = "🍛 節約カレー";
  let side = "🥗 野菜サラダ";
  let soup = "🍲 味噌汁";


  if(fridge.includes("鶏")){

    main = "🍖 甘辛チキン";

  }


  if(fridge.includes("キャベツ") && !avoid.includes("キャベツ")){

    side = "🥗 キャベツサラダ";

  }


  if(fridge.includes("卵") && !avoid.includes("卵")){

    soup = "🍳 卵スープ";

  }



  currentMenu =

`
${main}
${side}
${soup}

👨‍👩‍👧 家族：${family}人
💰予算：${budget}円以内
⏰時間：${time}分以内
👧子ども向け：${child}
`;



  document.getElementById("menu").innerHTML =

`
<div class="menu-card">

<h2>🍳 今日の献立</h2>

<p>${main}</p>
<p>${side}</p>
<p>${soup}</p>

<hr>

<p>👨‍👩‍👧 家族：${family}人</p>
<p>💰予算：${budget}円以内</p>
<p>⏰時間：${time}分以内</p>
<p>👧子ども向け：${child}</p>


<button onclick="saveFavorite()">
⭐ お気に入り保存
</button>

</div>
`;



saveHistory();

}




function saveFavorite(){

  if(currentMenu === ""){

    alert("先に献立を作ってください");

    return;

  }


  localStorage.setItem(
    "favoriteMenu",
    currentMenu
  );


  alert("⭐保存しました");

}




function showFavorite(){


const favorite =
localStorage.getItem("favoriteMenu");


document.getElementById("menu").innerHTML =


`
<div class="menu-card">

<h2>⭐お気に入り</h2>

<p>
${favorite || "まだありません"}
</p>

</div>
`;

}





function saveHistory(){


let history =
JSON.parse(localStorage.getItem("history")) || [];


history.push(currentMenu);


localStorage.setItem(
"history",
JSON.stringify(history)
);


}





function showHistory(){


let history =
JSON.parse(localStorage.getItem("history")) || [];


document.getElementById("menu").innerHTML =


`
<div class="menu-card">

<h2>📜献立履歴</h2>

<p>

${history.join("<br><br>") || "履歴なし"}

</p>

</div>
`;

}




function createWeek(){


document.getElementById("menu").innerHTML =

`
<div class="menu-card">

<h2>📅1週間献立</h2>

<p>月 🍖 甘辛チキン</p>
<p>火 🍛 カレー</p>
<p>水 🐟 焼き魚</p>
<p>木 🍳 オムライス</p>
<p>金 🥘 豚丼</p>
<p>土 🍝 パスタ</p>
<p>日 🍲 鍋</p>

</div>
`;

}