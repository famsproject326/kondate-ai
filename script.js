// APIキーをローカルストレージ（ブラウザの記憶領域）から読み込む
document.getElementById('apiKey').value = localStorage.getItem('groq_api_key') || '';

async function createMenuWithAI() {
    let apiKey = document.getElementById('apiKey').value.trim(); // 空白を自動で消去する
    const food = document.getElementById('food').value;
    const fridge = document.getElementById('fridge').value;
    const avoid = document.getElementById('avoid').value;
    const family = document.getElementById('family').value;
    const budget = document.getElementById('budget').value;
    const time = document.getElementById('time').value;
    const child = document.getElementById('child').value;

    if (!apiKey) {
        alert("🔑 Groqの無料APIキー（gsk_...）を入力してください！");
        return;
    }

    // 次回のためにキーを記憶しておく
    localStorage.setItem('groq_api_key', apiKey);

    // ボタンを「考え中」に変更
    const btn = document.getElementById('generateBtn');
    btn.disabled = true;
    btn.innerText = "⏳ 正しい和食バランスで考えています...";

    const menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = `<div class="menu-card"><p>🍳 食材のバランスと日本の常識をチェック中やで。ちょっと待ってな...</p></div>`;

    // AIへの指示書（日本の食文化の役割分担を徹底教育！）
    const systemPrompt = `あなたは忙しい共働き家庭や子育て家庭を全力で応援する、日本のプロの料理研究家（栄養士）です。
日本の「一汁二菜（または一汁三菜）」の基本ルールを完璧に守って献立を作ってください。

【絶対に厳守するルール（役割の混ざり防止）】
1. 主食・主菜・副菜・汁物の役割を絶対に混同しないでください。
   - 「主菜（メイン）」：肉や魚、卵、大豆製品を使ったメインのおかず（例：鶏むね肉の照り焼き、ハンバーグ等）
   - 「副菜（おかず・小鉢）」：野菜、きのこ、海藻などをメインに使った小鉢料理（例：ほうれん草のお浸し、キャベツの塩昆布和え、マカロニサラダ等）。※ここに「おにぎり」や「味噌汁」を絶対に配置しないでください。
   - 「汁物」：必ず水分（スープ）であること（例：味噌汁、中華スープ、お吸い物、コンソメスープ等）。※ここに「おにぎり」や「白ご飯」などの固形物を絶対に配置しないでください。
2. 提案する料理は、日本の一般的な家庭でよく食べられている「超定番の和食・洋食・中華」に限定してください。奇抜なスパイスや珍しい食材は使用不可です。
3. 調味料は、醤油、酒、みりん、砂糖、味噌、塩、コショウ、マヨネーズ、ポン酢、めんつゆなどの定番のみにしてください。`;

    const userPrompt = `以下の条件で今日の定番献立を正しく提案してください。

【冷蔵庫・食材状況】
- 使いたい食材: ${food || "特になし"}
- 冷蔵庫にある食材: ${fridge || "特になし"}
- 避ける食材: ${avoid || "なし"}

【家族・制限条件】
- 家族構成: ${family}人分
- 予算: ${budget}円以内
- 目安調理時間: ${time}分以内
- 子ども向け配慮: ${child}

【出力フォーマット】
以下の構成で、スマホでパッと見やすいように改行を多くして出力してください。
1. ✨今日のメニュー
   - 主菜（お肉やお魚のメイン）：[料理名]
   - 副菜（野菜などの小鉢）：[料理名]
   - 汁物（スープ）：[料理名]

2. 📝材料と超カンタン作り方（フライパンなどでパパッと作れる3ステップ程度の手順）
3. 🛒買い物リスト（これだけ買えばOKなリスト）
4. 💡忙しいママ・パパへの一言コツ（子どもが喜ぶポイントなど）`;

    try {
        // 無料で爆速な Groq API を呼び出す
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant', 
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.5 // さらに温度を下げて、AIの勘違い・暴走を防ぎ、手堅くルールを守らせる
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(`${data.error.message} (コード: ${data.error.code || '不明'})`);
        }

        const aiOutput = data.choices[0].message.content;

        // マークダウン形式の出力を簡易的にHTMLに変換して表示
        const formattedResult = aiOutput
            .replace(/\n/g, '<br>')
            .replace(/### (.*?)(<br>|$)/g, '<h4>$1</h4>')
            .replace(/## (.*?)(<br>|$)/g, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        menuDiv.innerHTML = `
            <div class="menu-card">
                <h2>✨ 今日のAI提案メニュー（ルール修正版）</h2>
                <p>${formattedResult}</p>
            </div>
        `;

    } catch (error) {
        let errorHint = "ネットワーク通信に失敗したか、APIキーが間違っています。";
        menuDiv.innerHTML = `
            <div class="menu-card" style="background: #fff0f0; border: 1px solid #ffaaaa;">
                <h3 style="color: red;">❌ 接続エラーが発生しました</h3>
                <p><strong>エラー内容:</strong> ${error.message}</p>
                <p style="margin-top: 10px; font-size: 12px; color: #666;">💡 <strong>ヒント:</strong> ${errorHint}</p>
            </div>
        `;
    } finally {
        // ボタンを元に戻す
        btn.disabled = false;
        btn.innerText = "🍳 AIに献立を作ってもらう";
    }
}
