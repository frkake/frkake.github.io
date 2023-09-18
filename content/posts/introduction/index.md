+++
title = '移行しました'
date = 2023-09-18T18:04:19+09:00
math = true
tags = ["General", ]
draft = false
+++

## 所感

以前はJekyllを使って自前サイトを作っていたのですが、なんか微妙に感じていました。<br>
Hugoもちょっと触ってみたいと思ったので、触ってみたら結構簡単でかつ好みのテーマがあったので、乗り換えてみようかなと感じました。

もう見なくなるサイトなので、写真だけ貼って供養します。<br>
論文を時系列に並べて関係性を広い意味で整理しようと `Archive` を投稿順に並べるところに当時はこだわりましたが、あんまり使わなかったですね。
あと、あんまり長い記事は書かなかったので、記事のスクロールに合わせて「アウトライン」のハイライトが遷移する機能も必要なかったですね...。

### ちょっとした旧ページのギャラリー

トップページ

![](image.png)

---
記事ページ
![](image-3.png)

---

アーカイブページ<br>
わりかし苦労したやつ。レイアウトにこだわった。改善余地はあるが、当時の自分としては満足した。

![](image-1.png)

---

## 移行に当たってのメモ

### 環境

- [Git](https://git-scm.com/download/linux)
- [Go](https://go.dev/doc/install)
- [Hugo-extended](https://gohugo.io/installation/linux/)<br>
    バイナリファイルを[ダウンロード](https://github.com/gohugoio/hugo/releases)
- [PaperMod](https://adityatelange.github.io/hugo-PaperMod/)
- [Hugo Icons Module](https://icons.hugomods.com/en/)

起動コマンド忘れそうなのでメモ。

```bash
# 起動
$ hugo server -D
```
