let currentMenu = "";
let currentShopping = [];



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


let shopping = [];



if(fridge.includes("鶏")){

main = child === "あり"
? "🍖 甘辛チキン"
: "🍖 鶏むね照り焼き";

shopping.push("鶏むね肉");

}else{

shopping.push("肉類");

}



if(fridge.includes("キャベツ")
&& !avoid.includes("キャベツ")){

side="🥗 キャベツサラダ";
shopping.push("キャベツ");

}else{

shopping.push("野菜");

}



if(fridge.includes("卵")
&& !avoid.includes("卵")){

soup="🍳 卵スープ";
shopping.push("卵");

}else{

shopping.push("味噌");

}



currentShopping = shopping;



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


<br>

<button onclick="saveFavorite()">
⭐ お気に入り保存
</button>


</div>
`;



showShopping();

saveHistory();


}




function showShopping(){


document.getElementById("shopping").innerHTML =


`
<div class="menu-card">

<h3>🛒 買い物リスト</h3>


${currentShopping.map(item =>

`
<div style="padding:8px 0; font-size:18px;">

<label>

<input type="checkbox">

🛒 ${item}

</label>

</div>

`

).join("")}


</div>
`;

}





function saveFavorite(){


localStorage.setItem(
"favoriteMenu",
currentMenu
);


alert("⭐お気に入り保存しました");

}





function showFavorite(){


const data =
localStorage.getItem("favoriteMenu");


document.getElementById("menu").innerHTML =


`
<div class="menu-card">

<h2>⭐お気に入り</h2>

<p>
${data || "まだ保存されていません"}
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
<p>火 🍛 子どもカレー</p>
<p>水 🐟 焼き魚</p>
<p>木 🍳 オムライス</p>
<p>金 🥘 豚丼</p>
<p>土 🍝 パスタ</p>
<p>日 🍲 鍋料理</p>


</div>
`;

}