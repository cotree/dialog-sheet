export default {
  "id": "ui_index",
  "title": "タイトル",
  "detail": "説明分",
  "templateGroups": [
    {
      "title": "type boolean",
      "key": "ui_boolean",
      "detail": "boolean の UIサンプル",
      "templateItems": [
        {
          "key": "study_participation_consent",
          "type": "boolean",
          "title": "研究参加同意",
          "detail": "現在cotreeでは、カウンセリングの評価に関する共同研究を実施しております。<br class='uk-visible@m'>追加のアンケート調査は５分程度に終了します。",
          "labels": [
            "参加する",
            "参加しない"
          ],
          "footer": "※いつでも「戻る」ボタンから回答を中止することができます。"
        },
        {
          "key": "additional_text",
          "type": "text",
          "detail": "追加の質問",
          "placeholder": "追加の質問",
          "condition": {
            "key": "study_participation_consent",
            "method": "equal",
            "value": true
          }
        }
      ]
    },
    {
      "title": "type checkbox",
      "key": "ui_checkbox",
      "detail": "checkbox の UIサンプル",
      "templateItems": [
        {
          "key": "themes",
          "type": "checkbox",
          "title": "話したいテーマを以下から３つまで選択してください",
          "listArray": [
            {
              "id": 1,
              "label": "不安が強い"
            },
            {
              "id": 2,
              "label": "自己理解を深めたい"
            },
            {
              "id": 3,
              "label": "課題を明確化したい"
            },
            {
              "id": 4,
              "label": "思考が整理できない"
            },
            {
              "id": 5,
              "label": "解決策が見えない"
            },
            {
              "id": 6,
              "label": "行動できない"
            },
            {
              "id": 7,
              "label": "決断できない"
            },
            {
              "id": 8,
              "label": "同じパターンが繰り返される"
            }
          ],
          "validation": {
            "max": 3,
            "message": "※選択できるのは３つまでです"
          }
        }
      ]
    },
    {
      "title": "type radio-6",
      "key": "ui_radio-6",
      "detail": "radio-6 の UIサンプル",
      "templateItems": [
        {
          "key": "ideal_amount_of_listening",
          "type": "radio-6",
          "title": "カウンセラーの関わり方で、あなたの期待に近いものにチェックをつけてください",
          "labels": [
            "話をきいてほしい",
            "たくさん質問してほしい"
          ]
        }
      ]
    },
    {
      "title": "type radio-7",
      "key": "ui_radio-7",
      "detail": "radio-7 の UIサンプル",
      "templateItems": [
        {
          "key": "ideal_amount_of_listening",
          "type": "radio-7",
          "title": "カウンセラーの関わり方で、あなたの期待に近いものにチェックをつけてください",
          "labels": [
            "話をきいてほしい",
            "たくさん質問してほしい"
          ]
        }
      ]
    },
    {
      "title": "type radio-11",
      "key": "ui_radio-11",
      "detail": "radio-11 の UIサンプル",
      "templateItems": [
        {
          "title": "今日のセッション全体の満足度を教えてください",
          "key": "overall_satisfaction_level",
          "type": "radio-11",
          "labels": [
            "全く満足できなかった",
            "非常に満足した"
          ]
        },
        {
          "title": "調子の良いときの点数を10として、今のあなたの調子は何点ですか？",
          "detail": "showNumber optionで 数字を表示できます",
          "key": "mental_condition",
          "type": "radio-11",
          "options": {
            "showNumber": true
          },
          "labels": [
            "0",
            "10"
          ]
        }
      ]
    },
    {
      "title": "type radio",
      "key": "ui_radio",
      "detail": "radio の UIサンプル",
      "templateItems": [
        {
          "key": "next_use_plan",
          "type": "radio",
          "title": "今後もカウンセリングを継続して受けようと思いますか？",
          "listArray": [
            {
              "id": 1,
              "label": "いったん今回で終了する"
            },
            {
              "id": 2,
              "label": "次回を受けるか迷っている"
            },
            {
              "id": 3,
              "label": "継続して利用したい"
            },
            {
              "id": 4,
              "label": "その他"
            }
          ]
        },
        {
          "key": "next_use_plan_text",
          "type": "text",
          "placeholder": "その他の内容",
          "condition": {
            "key": "next_use_plan",
            "method": "equal",
            "value": 4
          }
        }
      ]
    },
    {
      "title": "type slider",
      "key": "ui_slider",
      "detail": "slider の UIサンプル",
      "templateItems": [
        {
          "key": "ideal_amount_of_listening",
          "type": "slider",
          "title": "カウンセラーの関わり方で、あなたの期待に近いものにチェックをつけてください",
          "labels": [
            "話をきいてほしい",
            "たくさん質問してほしい"
          ]
        }
      ]
    },
    {
      "title": "type sortable-choice",
      "key": "ui_sortable-choice",
      "detail": "sortable-choice の UIサンプル",
      "templateItems": [
        {
          "key": "ideal_condition_rankings",
          "type": "sortable-choice",
          "title": "カウンセリングの後にどうなっていたいですか？あなたが重要だと感じる順に、以下の項目を1つ以上選んでください",
          "detail": "深く考えず、感じたことを答えて頂いて構いません。もちろん、セッション中に変わっても構いません。",
          "listArray": [
            {
              "id": 1,
              "label": "溜め込んでいる気持ちを吐き出せて、気持ちが楽になっている"
            },
            {
              "id": 2,
              "label": "自分の心に生じているモヤモヤが、整理されている"
            },
            {
              "id": 3,
              "label": "問題の原因を、言葉で説明できるようになっている"
            },
            {
              "id": 4,
              "label": "問題への解決策のアイデアが出て、次のアクションが取れる"
            }
          ]
        }
      ]
    },
    {
      "title": "type textarea",
      "key": "ui_textarea",
      "detail": "textarea の UIサンプル",
      "templateItems": [
        {
          "key": "complaint_text",
          "type": "textarea",
          "title": "相談内容を具体的に教えてください。"
        }
      ]
    },
    {
      "title": "type number",
      "key": "ui_number",
      "detail": "number の UIサンプル",
      "templateItems": [
        {
          "key": "age",
          "type": "number",
          "title": "年齢",
          "validation": {
            "min": 18,
            "max": 120,
            "message": "年齢は18~120で入力してください"
          }
        }
      ]
    },
  ]
};
