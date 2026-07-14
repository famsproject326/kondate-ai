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

    // 正しい形式（gsk_から始まっているか）を簡易チェック
    if (!apiKey.startsWith("gsk_") && !apiKey.startsWith("sk-")) {
        alert("⚠️ APIキーの形式が正しくない可能性があります。「gsk_」から始まるキーを入力してください！\n（前後に余計な文字が入っていないか確認してな！）");
    }

    // 次回のためにキーを記憶しておく
    localStorage.setItem('groq_api_key', apiKey);

    // ボタンを「考え中」に変更
    const btn = document.getElementById('generateBtn');
    btn.disabled = true;
    btn.innerText = "⏳ 無料AIが献立を考えています...";

    const menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = `<div class="menu-card"><p>🍳 冷蔵庫の食材をチェックして、最高のメニューを構築中やで。ちょっと待ってな...</p></div>`;

    // AIへの指示書（プロンプト）の作成
    const systemPrompt = `あなたは忙しい共働き家庭や子育て家庭を支える、プロの献立マイスター（栄養士）です。
与えられた食材や家族の条件をもとに、最適で美味しい献立を提案してください。
提案する献立は「主菜」「副菜」「汁物」の3品。
子ども向けが「あり」の場合は、子どもが食べやすくテンションが上がる工夫を記載すること。`;

    const userPrompt = `以下の条件で今日の献立を提案してください。

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
以下の項目を、分かりやすい日本語（マークダウン形式）で出力してください。改行を多くして読みやすくしてください。
1. 今日のメニュー（主菜・副菜・汁物の名前）
2. 必要な材料と、忙しい時でも作れる超簡単な作り方のコツ
3. 必要な買い物リスト`;

    try {
        // 無料で爆速な Groq API を呼び出す
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama3-8b-8192', // 無料で使える超高速AIモデル
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();

        // エラーレスポンスがあった場合、その中身をしっかり画面に出す
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
                <h2>✨ 今日のAI提案メニュー（無料版）</h2>
                <p>${formattedResult}</p>
            </div>
        `;

    } catch (error) {
        // エラーが起きたら何が原因か詳しく日本語で解説する
        let errorHint = "ネットワーク通信に失敗したか、APIキーが間違っています。";
        if (error.message.includes("API key")) {
            errorHint = "APIキーが間違っているか、無効化されています。Groqの管理画面で新しいキーを発行してみてください。";
        }

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
