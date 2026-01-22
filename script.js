const IMAGES = {
    PHONE: 'assets/phone.png',
    POLICE: 'assets/police.png', // Using Police image for City Office/Bank staff as placeholder
    WARNING: 'assets/warning.png',
    SUCCESS: 'assets/success.png',
    WARRANT: 'assets/warrant.png',
    THREAT: 'assets/police_threat.png'
};

const flowData = {
    start: {
        speaker: "電話",
        text: "プルルルル……<br>電話がかかってきました。どうしますか？",
        advice: "まずは落ち着いて、相手を確認することが大切です。",
        image: IMAGES.PHONE,
        choices: [
            { text: "電話に出る", next: "step_scam_intro", style: "btn-danger" },
            { text: "番号を確認する", next: "check_number", style: "btn-safe" }
        ]
    },
    check_number: {
        speaker: "電話",
        text: "画面に表示された番号を確認しました。<br>よくわからない番号です。どうしますか？",
        advice: "知らない番号は詐欺の可能性があります。",
        image: IMAGES.PHONE,
        choices: [
            { text: "よくわからない番号なので出ない", next: "end_ignore_safe", style: "btn-safe" },
            { text: "出る", next: "step_scam_intro", style: "btn-danger" }
        ]
    },
    end_ignore_safe: {
        speaker: "解説",
        text: "正解です！<br>知らない番号には出ないのが一番安全です。",
        advice: "留守番電話設定にしておくと、さらに安心です。",
        image: IMAGES.SUCCESS,
        isEnd: true,
        type: "safe"
    },
    step_scam_intro: {
        speaker: "市役所職員（自称）",
        text: "「〇〇市役所の△△です。医療費の過払い分が戻ってきます。書類を送りましたが、ご覧になりましたか。」",
        advice: "「お金が戻る」と言われたら、まずは疑いましょう。",
        image: IMAGES.POLICE,
        choices: [
            { text: "見た", next: "step_pressure", style: "btn-danger" },
            { text: "見ていない", next: "step_pressure", style: "btn-danger" },
            { text: "覚えていない", next: "step_pressure", style: "btn-danger" }
        ]
    },
    step_pressure: {
        speaker: "市役所職員（自称）",
        text: "「今なら間に合いますが、手続きしますか？払い戻し期限が迫っています。」",
        advice: "「期限が迫っている」と急かして冷静な判断をさせないのが手口です。",
        image: IMAGES.POLICE,
        choices: [
            { text: "手続きをする", next: "step_bank_ask", style: "btn-danger" },
            { text: "手続をしない", next: "end_ignore_safe", style: "btn-safe" }
        ]
    },
    step_bank_ask: {
        speaker: "市役所職員（自称）",
        text: "「お近くのATMで手続きができます。どこの金融機関をお使いですか。」",
        advice: "市役所がATMに誘導することは絶対にありません！",
        image: IMAGES.POLICE,
        choices: [
            { text: "銀行を答える", next: "step_answer_bank", style: "btn-danger" },
            { text: "念のため、所属と連絡先を聞く", next: "step_ask_details", style: "btn-danger" },
            { text: "電話を切る", next: "end_hangup_safe", style: "btn-safe" }
        ]
    },
    step_answer_bank: {
        speaker: "あなた",
        text: "銀行を答える",
        advice: "銀行名を教えてしまいました。",
        image: IMAGES.POLICE,
        choices: [
            { text: "銀行名を答える", next: "step_call_center_intro", style: "btn-danger" }
        ]
    },
    step_ask_details: {
        speaker: "市役所職員（自称）",
        text: "「〇〇市役所の△△です。連絡先は、〇〇〇ー〇〇〇ー〇〇〇〇（実在の市役所の電話番号）です。」",
        advice: "相手は架空の部署や名前、デタラメな番号をスラスラと言って安心させようとします。",
        image: IMAGES.POLICE,
        choices: [
            { text: "一旦電話を切って、折り返し電話をかける", next: "step_pressure_callback", style: "btn-safe" },
            { text: "そのまま電話を続ける", next: "step_answer_bank", style: "btn-danger" }
        ]
    },
    step_pressure_callback: {
        speaker: "市役所職員（自称）",
        text: "「今日お手続きしないと過払い分は戻ってきませんが、それでもいいですか。」",
        advice: "「お金が戻らない」と損する気持ちをあおって引き止めようとしたり、考える時間を与えないようにします。",
        image: IMAGES.POLICE,
        choices: [
            { text: "やっぱり手続きをする", next: "step_answer_bank", style: "btn-danger" },
            { text: "はい", next: "end_pressure_safe", style: "btn-safe" }
        ]
    },
    end_pressure_safe: {
        speaker: "解説",
        text: "冷静に！焦らせるのは、犯人の手口の一つ！",
        image: IMAGES.SUCCESS,
        isEnd: true,
        type: "safe"
    },
    end_hangup_safe: {
        speaker: "解説",
        text: "ATMで還付金手続きは、全て詐欺！<br>ATMでお金が返ってくることは絶対にありません。",
        image: IMAGES.SUCCESS,
        isEnd: true,
        type: "safe"
    },
    step_call_center_intro: {
        speaker: "市役所職員（自称）",
        text: "「お使いの銀行でお手続きができるように、銀行のコールセンターにこちらから依頼しておきます。この後、コールセンターから電話が来ます。」",
        advice: "役所があなたの代わりに銀行へ連絡することはありません。",
        image: IMAGES.POLICE,
        choices: [
            { text: "待つ", next: "step_call_center_talk", style: "btn-danger" }
        ]
    },
    step_call_center_talk: {
        speaker: "銀行（自称）",
        text: "「コールセンターのサトウです。市役所からの依頼で電話しました。お調べしたところ、お手続きができるのは今日までです。」",
        advice: "犯人は複数の役を演じて信じ込ませようとします。「今日まで」は嘘です。",
        image: IMAGES.POLICE,
        choices: [
            { text: "すぐに手続きをお願いする", next: "step_to_atm", style: "btn-danger" },
            { text: "どうすれば良いかきく", next: "step_to_atm", style: "btn-danger" }
        ]
    },
    step_to_atm: {
        speaker: "銀行（自称）",
        text: "「こちらが提携している△△のATMへ行ってください。本人確認のため必要ですので、電話番号を教えてください。」",
        advice: "ATMで携帯電話を使わせるのは、詐欺師の指示通りに操作させるためです。",
        image: IMAGES.POLICE,
        choices: [
            { text: "教える", next: "step_atm_instructions", style: "btn-danger" },
            { text: "教えない", next: "step_cant_do_today", style: "btn-safe" }
        ]
    },
    step_atm_instructions: {
        speaker: "銀行（自称）",
        text: "「ATMに着いたら、あなたの携帯電話でコールセンターへ電話をしてください。電話番号は、〇〇〇ー〇〇〇ー〇〇〇〇です。電話をかけて頂ければ本人確認ができ、手続きに進めます。」",
        advice: "ATMに着いてから電話させるのは、周囲に相談させないためです。",
        image: IMAGES.POLICE,
        choices: [
            { text: "ATMヘ行く", next: "end_atm_scam", style: "btn-danger" },
            { text: "ATMへ行かない", next: "end_hangup_safe", style: "btn-safe" }
        ]
    },
    step_cant_do_today: {
        speaker: "銀行（自称）",
        text: "「今日しか手続きができませんがいいですか。」",
        advice: "「今日しかできない」と脅して焦らせてきますが、嘘です。",
        image: IMAGES.WARNING,
        choices: [
            { text: "教える", next: "step_atm_instructions", style: "btn-danger" },
            { text: "教えない", next: "end_refuse_number_safe", style: "btn-safe" }
        ]
    },
    end_atm_scam: {
        speaker: "警告",
        text: "ATMで還付金手続きは、全て詐欺！<br>ATMでお金が返ってくることは絶対にありません。",
        advice: "「ATMで還付金手続き」は全て詐欺！絶対にお金は戻ってきません。",
        image: IMAGES.WARNING,
        isEnd: true,
        type: "danger"
    },
    end_refuse_number_safe: {
        speaker: "解説",
        text: "素晴らしいです。<br>個人情報を教えない、ATMに行かないことが大切です。",
        image: IMAGES.SUCCESS,
        isEnd: true,
        type: "safe"
    }
};

const messageEl = document.getElementById('message-text');
const speakerEl = document.getElementById('speaker-name');
const sceneImg = document.getElementById('scene-image');
const choicesContainer = document.getElementById('choices-container');
const adviceBox = document.getElementById('advice-box');
const resetBtn = document.getElementById('reset-btn');
const backBtn = document.getElementById('back-btn');

let historyStack = [];
let currentNodeId = null;

function startGame() {
    historyStack = [];
    currentNodeId = null;
    renderNode('start');
    resetBtn.classList.remove('hidden');
}

function resetGame() {
    startGame();
}

function goBack() {
    if (historyStack.length > 0) {
        const prev = historyStack.pop();
        renderNode(prev, false);
    }
}

function renderNode(nodeId, pushToHistory = true) {
    const node = flowData[nodeId];
    if (!node) return;

    if (pushToHistory && currentNodeId) {
        historyStack.push(currentNodeId);
    }

    currentNodeId = nodeId;

    if (historyStack.length > 0) {
        backBtn.classList.remove('hidden');
    } else {
        backBtn.classList.add('hidden');
    }

    messageEl.innerHTML = node.text;
    speakerEl.textContent = node.speaker || "状況";

    if (node.image) {
        sceneImg.src = node.image;
    }

    if (node.advice) {
        adviceBox.innerHTML = `💡 ポイント：${node.advice}`;
        adviceBox.classList.remove('hidden');
        if (node.type === 'danger') {
            adviceBox.className = 'advice-box warning';
        } else if (node.type === 'safe') {
            adviceBox.className = 'advice-box safe';
        } else {
            adviceBox.className = 'advice-box';
        }
    } else {
        adviceBox.classList.add('hidden');
    }

    choicesContainer.innerHTML = '';

    if (node.isEnd) {
        const endBtn = document.createElement('button');
        endBtn.className = 'btn btn-primary';
        endBtn.innerHTML = '最初に戻る';
        endBtn.setAttribute('data-label', '↻');
        endBtn.onclick = resetGame;
        choicesContainer.appendChild(endBtn);
    } else {
        const labels = ['A', 'B', 'C'];
        node.choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = `btn ${choice.style || 'btn-primary'}`;
            btn.innerHTML = choice.text;
            btn.setAttribute('data-label', labels[index] || '');
            btn.onclick = () => renderNode(choice.next);
            choicesContainer.appendChild(btn);
        });
    }
}

startGame();
