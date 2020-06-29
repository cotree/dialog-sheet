export default {
  id: 'user_pre_reservation',
  title: 'コーチング事前アンケート',
  detail: `いまのあなたに合わせたコーチングを受けるために、コーチングを受ける前の期待や気持ちをコーチに伝えましょう。所要時間は10分程度です。`,
  templateGroups: [
    {
      title: '動機について',
      key: 'motivation',
      detail:
        'コーチングを申し込んだ動機について、以下の４項目の<u><b><font color="teal">合計点が20点</font></b></u>になるように点数をつけてください',
      templateItems: [
        {
          title: '１．自分の性格特性への理解を深めたい',
          key: 'self_understanding',
          type: 'radio-11',
          options: { showNumber: true },
          labels: ['当てはまらない', '当てはまる']
        },
        {
          title: '２．自分のやりたいことや、将来のキャリアを明確化したい',
          key: 'clarify_future_vision',
          type: 'radio-11',
          options: { showNumber: true },
          labels: ['当てはまらない', '当てはまる']
        },
        {
          title:
            '３．いま直面している課題について、どう対処していけばいいのか、相談したい',
          key: 'problem_solved',
          type: 'radio-11',
          options: { showNumber: true },
          labels: ['当てはまらない', '当てはまる']
        },
        {
          title: '４．コーチングを体験して、どんなものか知りたい',
          key: 'coaching_understanding',
          type: 'radio-11',
          options: { showNumber: true },
          labels: ['当てはまらない', '当てはまる']
        },
        {
          title: '上記以外に、申し込んだ動機があれば教えてください',
          key: 'other_motivation_text',
          type: 'textarea',
          validation: { required: false }
        }
      ]
    },
    {
      title: '相談内容について',
      key: 'complaint',
      detail: 'このセクションでは、あなたの相談内容についてお伺いします',
      templateItems: [
        {
          key: 'themes',
          type: 'checkbox',
          title: '話したいテーマが以下のなかにあれば３つまで選択してください',
          listArray: [
            { id: 1, label: '不安が強い' },
            { id: 2, label: '自己理解を深めたい' },
            { id: 3, label: '課題を明確化したい' },
            { id: 4, label: '思考が整理できない' },
            { id: 5, label: '解決策が見えない' },
            { id: 6, label: '行動できない' },
            { id: 7, label: '決断できない' },
            { id: 8, label: '同じパターンが繰り返される' }
          ],
          validation: {
            max: 3,
            message: '※選択できるのは３つまでです',
            required: false
          }
        },
        {
          key: 'complaint_text',
          type: 'textarea',
          title: '話したいテーマについて詳しく教えてください',
          detail: '相談したいテーマが複数浮かぶ場合は、複数書いてください'
        },
        {
          key: 'current_location',
          type: 'radio',
          title: '話したいテーマに関する今の状態を教えてください ',
          detail:
            'テーマが複数ある場合は、最も相談したいテーマに関して、選んでください',
          listArray: [
            {
              id: 1,
              label:
                '最近このテーマでモヤモヤしているが、改善の方向性は見えていない'
            },
            {
              id: 2,
              label:
                '改善の方向性はなんとなく浮かぶが、具体的な目標や行動にできていない'
            },
            {
              id: 3,
              label:
                '実現したい明確な目標はあるが、改善に向けて行動できていない'
            },
            {
              id: 4,
              label:
                'すでに改善に向けて行動しているが、今の進め方でいいのか振り返りたい'
            },
            { id: 5, label: 'その他' }
          ]
        },
        {
          key: 'current_location_text',
          type: 'text',
          placeholder: 'その他の内容',
          condition: { key: 'current_location', method: 'equal', value: 5 }
        },
        {
          title: '理想の状態を10とすると、現在の状態は何点ですか？',
          key: 'current_location_level',
          type: 'radio-11',
          options: { showNumber: true },
          labels: ['', '理想通り']
        }
      ]
    },
    {
      title: '現在の調子について',
      key: 'health',
      templateItems: [
        {
          title: '調子の良いときの点数を10として、今の心の調子は何点ですか？',
          key: 'mental_condition',
          type: 'radio-11',
          options: { showNumber: true },
          labels: ['0', '10']
        },
        {
          title: '治療履歴や留意点があれば教えてください',
          detail: '※２回目以降の方は飛ばしていただいても構いません',
          key: 'remarks_text',
          type: 'textarea',
          validation: { required: false }
        }
      ]
    },
    {
      title: 'コーチの関わり方について',
      key: 'involvement',
      detail:
        'コーチの関わり方について、あなたの要望に近いものにチェックをつけてください',
      templateItems: [
        {
          key: 'ideal_amount_of_listening',
          type: 'radio-6',
          title: '考えを深めたいときに期待する関わり方',
          labels: ['話をきいてほしい', '質問してほしい']
        },
        {
          key: 'ideal_priority_of_convincing',
          type: 'radio-6',
          title: '悩み事があるときに期待する関わり方',
          labels: ['理解して納得したい', '解決のアイデアがほしい']
        }
      ]
    },
    {
      title: '今後のコーチングの使い方について',
      key: 'use_plan',
      templateItems: [
        {
          key: 'next_use_plan',
          type: 'radio',
          title: '今後のコーチングの使い方を教えてください',
          listArray: [
            { id: 1, label: '受けてから考えるつもり' },
            { id: 2, label: '今回だけ利用するつもり' },
            { id: 3, label: '継続して利用するつもり' },
            { id: 4, label: 'その他' }
          ]
        },
        {
          key: 'next_use_plan_text',
          type: 'text',
          placeholder: 'その他の内容',
          condition: { key: 'next_use_plan', method: 'equal', value: 4 },
          validation: { required: false }
        }
      ]
    }
  ]
};
