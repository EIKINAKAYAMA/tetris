# 最難テトリス ”ナカヤマン”

## 本ゲームについて

---

【URL】

【ルール】
　テトリスの公式ルールを参考に、作成致しました。
　・テトリミノは計７種類。
　・横一列並べると削除し、得点が加算。
　・同時に削除した列数に応じてボーナス得点が加算。
　・得点に応じて、落下速度が加速。（時間にはしておりません）

【攻略情報】
　・特定の得点を取得時後、一定列数を同時消した場合のみ攻略できるよう設定しています。



## 開発者向け

---

本テトリスは、Reactの学習の一環として作成致しました。

Reactチュートリアル https://ja.reactjs.org/tutorial/tutorial.html
で学習した後、本テトリスのロジックを作成している為、一般的なテトリスロジックとは異なっています。
（Reactチュートリアルで学習した際、作ってみた４目並べ：https://github.com/EIKINAKAYAMA/practice_react）

　・一般的なロジック
　　例1：ビット演算によるあたり判定。
　　例2 : テトリミノ単体に対して、二次元行列を作成し回転を考慮。
       
　　参考：http://kmaebashi.com/programmer/reacttetris/program.html
　　一般的なロジックを元に、Reactでテトリスを作成しているサイトになります。
　　UIや考え方など参考になったのでオススメです。

　・本ロジック
　　Reactチュートリアルと同様、盤面に対して全てのマス目の数を保持しています。
       ぜひ、Reactチュートリアルの作成を終えた方々が、次に進まれるステップになればと思います。



### 開発STEP

---

##### ①テトリスの盤面を作成する。盤面のマス目全てに番号を保持します。

##### ②保持する状態を決定する。（作成時は、盤面履歴と、色くらいで）

##### ③②で保持した色を実際に盤面に表示させ、時間と共に落下させるようにします。

##### ④落ちてくる色を配列に。（これによりテトリミノが落ちてくるようになります）

##### ⑤落ちてくる配列を複数用意し、最下層、または色がある場合はFixするようにします。

##### ⑥状態に、「落下中の配列」と「次に落下する配列」を保持し、Fixした際、「次に落下する配列」＝「落下中の配列」と変化するようにします。

〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜

ここまでで、次々と落下して積み上げられていく、テトリスもどきが完成します。
あとは、細かい動きをつけるだけとなります。

〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜

##### ⑦続いて、ブロックの左右の動きのロジックを作成。

##### ⑧ブロックの回転ロジックを作成。

##### ⑨横一列の際は、ブロックを削除するようにします。（注：削除された瞬間を描画する方が、テトリスらしくなる為、削除時の状態を保持する必要があります）

##### ⑩最後に、得点ロジックや、落下スピードの調整、UIの装飾などを任意に実施すると完成します。
