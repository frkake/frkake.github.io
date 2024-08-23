+++
title = 'AdvDM'
date = 2023-10-01T21:11:45
pubdate = 2023-02-02
tags = ["ICML", "Adversarial Examples", "Diffusion Model", "Art"]
cover.image = "image.png"
cover.caption = "コンセプト図"
+++

{{< cite >}}
@misc{liang2023adversarial,
      title={Adversarial Example Does Good: Preventing Painting Imitation from Diffusion Models via Adversarial Examples}, 
      author={Chumeng Liang and Xiaoyu Wu and Yang Hua and Jiaru Zhang and Yiming Xue and Tao Song and Zhengui Xue and Ruhui Ma and Haibing Guan},
      year={2023},
      eprint={2302.04578},
      archivePrefix={arXiv},
      primaryClass={cs.CV}
}
{{< /cite >}}

{{< links code="https://github.com/mist-project/mist" paper="https://arxiv.org/abs/2302.04578" project="https://mist-project.github.io/index_en.html" video="https://icml.cc/virtual/2023/oral/25469">}}

モンテカルロ法を用いて生成過程の潜在変数をおかしくするAEsを生成する手法を提案。PhotoGuardは実写画像がターゲットだったが、AdvDMはアートがターゲット。

-----------

## 課題

- AEsで拡散モデルを攻撃しようにも、分類モデルと比べて難しい
  - 最適化のフローが変分境界を通して間接的に行われる=AEsが直接適用不可能
  - 拡散モデルに対するAEsの既存の方法がない

## AdvDM

![コンセプト図。(1) 特徴抽出をOODにミスリード。(2) 摂動を付加して悪品質になるように最適化。](image.png)

特徴抽出をOODにするノイズが生成されるように学習。その損失関数にモンテカルロ法を使う。

### 前提

実分布を $ q(x) $ 生成分布を $ p(x) $ すると摂動 $ \delta $ は次式で求められる。

![](image-2.png)

しかし、 $ q(x) $ は未知なので、モンテカルロ法を使って近似する。$ p_\theta (x) $を使って、$ p_\theta (x+\delta) $を近似する。

![](image-1.png)

各時点の実分布の事後分布 $ q\left(x_{1: T}^{\prime} \mid x_0^{\prime}\right) $は画像 $ x_0 $と独立な固定パラメータのガウス分布なので、生成分布 $ p_\theta (x\prime_(0:T)) $ は$ q\left(x_{1: T}^{\prime} \mid x_0^{\prime}\right) $で正則化できる。

![](image-3.png)

### 最適化

$E_{x_{1: T} \sim u\left(x_{1: T}\right)} \mathcal{L}_{D M}(\theta)$は期待値の損失なので、普通のAEsと違い勾配がわからない。そこで、モンテカルロ法を使って勾配を推定する。

敵対的な生成分布 $ u (x\prime_(1:T)) $ から $ x\prime_(1:T) $ をサンプリングして、$ L_{D M}(\theta) $ の勾配を推定する。

![](image-4.png)

この推定された勾配を使ってFGSMを行う。

![](image-5.png)

異なる潜在変数になる各サンプルをイテレーション。

![AdvDMの最適化（生成）フロー](image-6.png)

### 評価
{{< notice note >}}
入力画像を使わずに、完全なガウスノイズから生成した画像は評価対象外<br>
＝コピーライトの心配なし
{{< /notice >}}

#### 特徴抽出された特徴がOODになっていることを評価

画像から実際に抽出される条件 $c_g$のほうが無条件でサンプリングされる $c$よりも画像との類似性が高いはず

![Advの条件cがOODになっていることの評価。$D$にはFIDやPrecision(prec., Kynkaanniemi, 2019) が利用される](image-7.png)

CFGっぽい

#### アートトレースが危惧されるシナリオ

1. Text InversionベースのT2I
2. Text Inversionベースのスタイル変換
3. I2Iの変換

## 結果

![Text-InversionベースのT2I](image-8.png)

![クリーン画像とAEsでスタイル変換したときの結果。（上段）クリーン画像（下段）AdvDMで作ったAEs。注：Strengthはスタイル変換の強さパラメータ。](image-9.png)

スタイルを強く転送しようとすると、崩壊している感じがする。

{{< tile-images cols=2 >}}
![異なるサンプリングステップを変えてAdvDMした結果。ステップを増やすほどクオリティが低いものが生成できる。](image-10.png)
![加える摂動の大きさによる攻撃効果。](image-11.png)
{{< /tile-images >}}

![条件付きT2I](image-12.png)

![AEsに対する防御策をAdvDMで試した結果。一定の効果がある。](image-14.png)

## 次に読む論文

- [Mist: Towards Improved Adversarial Examples for Diffusion Models](https://arxiv.org/abs/2305.12683)
