let currentMenu = "";
let currentShopping = [];


function splitFoods(text){

return text
.replace(/、/g,",")
.split(",")
.map(x=>x.trim())
.filter(x=>x);

}



function createMenu(){


const food =
document.getElementById("food").value;


const fridge =
document.getElementById("fridge").value;


const avoid =
document.getElementById("avoid").value;


const family =
document.getElementById("family").value;


const budget =
document.getElementById("budget").value;


const time =
document.getElementById("time").value;


const child =
document.getElementById("child").value;



let wantFoods = splitFoods(food);

let fridgeFoods = splitFoods(fridge);

let avoids = splitFoods(avoid);



let allFoods = [
...wantFoods,
...fridgeFoods
];



// 重複削除
allFoods = [...new Set(allFoods)];



let main="🍛 節約料理";
let side="🥗 野菜サラダ";
let soup="🍲 味噌汁";



if(allFoods.some(x=>x.includes("鶏"))){

main = child==="あり"
? "🍖 子ども向け鶏むね照り焼き"
: "🍖 鶏むね照り焼き";

}


if(allFoods.some(x=>x.includes("キャベツ"))
&&!avoids.includes("キャベツ")){

side="🥗 キャベツサラダ";

}



if(allFoods.some(x=>x.includes("卵"))
&&!avoids.includes("卵")){

soup="🍳 卵スープ";

}



currentShopping = allFoods;



currentMenu =

`
${main}
${side}
${soup}

👨‍👩‍👧 家族：${family}人
💰予算：${budget}円以内
⏰時間：${time}分以内
👧子ども向け：${child}

🚫避ける食材：
${avoids.length ? avoids.join("、") : "なし"}
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


<p>
🚫避ける食材：
<br>
${avoids.length ? avoids.join("、") : "なし"}
</p>


<button onclick="saveFavorite()">
⭐お気に入り保存
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

<h3>🛒買い物リスト</h3>

${
currentShopping.length

?

currentShopping.map(item=>

`

<div style="padding:10px 0;">

<label>

<input type="checkbox">

${item}

</label>

</div>

`

).join("")

:

"食材なし"

}

</div>
`;

}




function saveFavorite(){

localStorage.setItem(
"favoriteMenu",
currentMenu
);


alert("⭐保存しました");

}



function showFavorite(){

let data =
localStorage.getItem("favoriteMenu");


document.getElementById("menu").innerHTML =

`
<div class="menu-card">

<h2>⭐お気に入り</h2>

<p>
${data || "まだありません"}
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

<h2>📜履歴</h2>

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

<p>月 🍖鶏むね照り焼き</p>
<p>火 🍛カレー</p>
<p>水 🐟魚料理</p>
<p>木 🍳オムライス</p>
<p>金 🥘豚丼</p>
<p>土 🍝パスタ</p>
<p>日 🍲鍋</p>

</div>
`;

}