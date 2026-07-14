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
    btn.innerText = "⏳ 美味しい定番献立を考えています...";

    const menuDiv = document.getElementById('menu');
    menuDiv.innerHTML = `<div class="menu-card"><p>🍳 冷蔵庫の食材をチェックして、最高のメニューを構築中やで。ちょっと待ってな...</p></div>`;

    // AIへの指示書（プロンプトを日本の定番料理に超強化！）
    const systemPrompt = `あなたは忙しい共働き家庭や子育て家庭を全力で応援する、日本のプロの料理研究家（栄養士）です。

【重要ルール】
1. 提案する料理は、必ず「日本の一般的な家庭でよく食べられている、定番で美味しい家庭料理（例：照り焼き、生姜焼き、親子丼、肉じゃが、唐揚げなど）」に限定してください。
2. 奇抜な創作料理、珍しいスパイス（クミンやコリアンダー等）、特殊なハーブを使う料理は絶対に提案しないでください。
3. 使う調味料は、日本の一般的な家庭にあるもの（醤油、酒、みりん、砂糖、味噌、塩、コショウ、マヨネーズ、ポン酢、めんつゆなど）だけにしてください。
4. 調理時間は指定された時間内で作れるよう、フライパン1つや電子レンジで完結するような超簡単な手順にしてください。
5. 「主菜」「副菜」「汁物」の3品を提案してください。
6. 子ども向けが「あり」の場合は、子どもがパクパク喜んで食べる工夫（甘めの味付け、一口サイズなど）を必ず記載してください。`;

    const userPrompt = `以下の条件で今日の定番献立を提案してください。

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
以下の構成で、改行を多くして、スマホでめちゃくちゃ見やすい日本語（マークダウン形式）で出力してください。
1. ✨今日のメニュー（主菜・副菜・汁物の名前）
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
                temperature: 0.6 // 少し低めにして、変な冒険をせずに手堅く定番を出すように調整
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
                <h2>✨ 今日のAI提案メニュー（無料・定番版）</h2>
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
