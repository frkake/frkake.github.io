+++
title = 'TensorRT Developer Guideを読んだメモ'
date = 2023-11-13T12:53:11
pubdate = 2023-03-01T00:00:00
# tags = 
draft = true
+++


{{< links project="https://docs.nvidia.com/deeplearning/tensorrt/developer-guide/" >}}

-----------

## 2. TensorRT's Capabilities

TensorRTには、モデルの定義とターゲットGPUへの最適化を行うビルドフェーズと、最適化されたモデルを実行する実行フェーズの2つのフェーズがあります。

### 2.1 Build Phase

`Builder` を使って、モデルの最適化や `Engine`の作成を行う。手順は次の通り。

1. ネットワークを定義する
   * `NetworkDefinition`インタフェースを定義する。2通りの方法がある。
     * ONNXからTensorRTのONNX parserを呼び出す方法
     * TensorRTの`Layer`や`Tensor`を直接呼び出してネットワークを定義する方法の2つがある。
   * 注意：出力としてマークされていないTensorは一時テンソルとして破棄されるので、出力したかったら名前を指定してやる必要がある。
2. ネットワークのconfigを指定する
   * `BuilderConfig`インタフェースでTensorRTがどうやってモデルを最適化するかを指定する。
     * 精度 (Precision)。
     * 実行時スピードとメモリ効率とのトレードオフの制御
     * CUDAカーネルの選択の制約
3. Builderを呼び出してEngineを作る
    * 1., 2.の情報を使って、`Engine`インタフェースを作る。
    * TensorRTのバージョンとターゲットGPUの種類によってエンジンが作成される。
    * TensorRTのネットワーク定義は浅いコピーなので、ビルドフェーズでメモリの開放はやらないで
    * ビルダは一つだけ動かす。
      * ビルダは最速時間を計測するが、他のGPUでビルダが動いていると実行タイミングがずれるので最適化が弱くなる

### 2.2 Runtime Phase

実行のさせかた。最高位APIは `Runtime` クラス。`Runtime`を使った実行のさせかたは次の通り。

1. TensorRTエンジンをデシリアライズ
2. エンジンから実行コンテクストを作成

そのとき、入出力バッファを用意する必要がある。
推論自体は `enqueueV3`をコールすれば実行できる。

`Engine`インタフェース最適化済みモデルを持っており、はネットワークの入出力情報を提供できる。
一方で、その`Engine`から作成された`ExecutionContext`は推論を呼び出すインタフェース。一つのエンジンに関連付けられた複数の実行コンテクストを作成して、並列実行できる。

入出力のバッファをCPUかGPU上に用意するが、エンジンに問い合わせてどちらにバッファを用意するかを決定できる。
バッファを用意したら`enqueueV3`で実行できる。これにより、必要なカーネルがCUDAストリームにエンキューされ、すぐにアプリケーションの制御が戻される。
CPUとGPUの転送で時間がかかるが、こういった非同期処理を待機したい場合は `cudaStreamSynchronize`を使ってストリームを同期する。

### 2.3 Plugins

TensorRTだけでは対応していないオペレーションの実装を提供する機構。TensorRTの`PluginRegistry`に登録することで、モデル変換時にONNXパーサがプラグインを利用できるようになる。
[詳細](https://docs.nvidia.com/deeplearning/tensorrt/developer-guide/index.html#extending)

### 2.4 Types and Precision

TensorRTはFP32, FP16, INT8, INT32, UINT8, BOOLのデータ型に対応している。

* FP32, FP16
  * 非量子化
* INT8
  * 暗黙的量子化
    * スケールファクタ(dynamic_ranges)が必要。（キャリブレーションか`setDynamicRange` APIで指定）
  * 明示的量子化
    * 符号付き整数に解釈する。Q/DQレイヤを明示的につかってINT8型に相互変換する。
* UINT8
  * 入出力タイプにだけ利用できるデータ型
  * 入力はUINT8からFP32 or FP16に変換される（`CastLayer`）
  * 出力も`CastLayer`でUINT8を出力する。
  * 量子化は非対応
  * `ConstantLayer`は出力タイプとしてはUINT8に非対応
* BOOL

Precisionを指定する方法は次の2つある。

* モデルレベル：`BuilderFlag`オプションで低精度を指定する
* レイヤレベル：レイヤごとに精度を指定して、数値的にセンシティブな箇所に対処する

### 2.5 Quantization

Dynamic rangeはビルダ（キャリブレーション）かQATで計算できる。

TODO: [ここはもう少し詳しく書く](https://docs.nvidia.com/deeplearning/tensorrt/developer-guide/index.html#working-with-int8)

### 2.7 Dynamic shape

TensorRTは入力形状に基づいてモデルを最適化するが、実行時に動的な形状をサポートしている。`OptimizationProfile`最小、最大入力形状を指定する。

TODO: [ここはもう少し詳しく書く](https://docs.nvidia.com/deeplearning/tensorrt/developer-guide/index.html#work_dynamic_shapes)

### 2.8 DLA

TODO: [ここはもう少し詳しく書く](https://docs.nvidia.com/deeplearning/tensorrt/developer-guide/index.html#dla_topic)

### 2.10 `trtexec`

* ランダム値 or ユーザ指定のデータを使ったネットワークベンチマーク
* モデルのエンジン化（シリアライズ化）
* ビルダからシリアライズ化されたタイミングキャッシュを作成

### 2.11 Polygraphy

TensorRTモデルの実行やデバッグをするためのツール。

* 複数のバックエンドで実行する (TensorRT, ONNX-runtime)
* モデルを複数フォーマットに変換する。
  * e.x. TensorRT engine with post-training quantization
* モデルの様々なタイプの情報表示
* ONNXモデルをコマンドラインから変更
  * サブグラフの抽出
  * 単純化やサニタイズ化 (simplify and sanitize)
