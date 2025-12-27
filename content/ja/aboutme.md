+++
type = "biography"
title = "飯田啄巳"
biography = "機械学習/ コンピュータビジョン"
profile_image = "/images/iida_takumi_italy.jpg"
# twitter = "https://twitter.com/frkake"
github = "https://github.com/frkake"
linkedin = "https://www.linkedin.com/in/takumi-iida/"
# facebook = "https://www.facebook.com/tkmiida/"
speakerdeck = "https://speakerdeck.com/frkake"
# gscholar = "https://scholar.google.co.jp/citations?user=d6oloLsAAAAJ"
# resume = "/pdf/[Takumi Iida] Resume.pdf"

skills = [
    {name = "Computer Vision", percentage=60},
    {name = "Computer Graphics", percentage=40},
    {name = "LLM", percentage=20},
]

[[education]]
course = "理工学研究科電子システム専攻"
university = "立命館大学大学院"
years = "2018-2020"

[[education]]
course = "理工学部電子情報工学科"
university = "立命館大学"
years = "2014-2018"

[[experience]]
logo = "/images/LayerX_Logo_Vertical_RGB_Color.png"
institute = "株式会社LayerX"
role = "機械学習エンジニア"
duration = "2025.3 - 現在"
location = "リモート"
active = true
projects = [
]

[[experience]]
logo = "/images/elith_logo.webp"
institute = "株式会社Elith"
role = "リサーチマネージャー"
duration = "2024.10 - 2025.2"
location = "リモート"
projects = [
    {name = "LLM のマルチエージェントシステムの研究開発", description = "タイトルから内容推定を行うマルチエージェントシステムを構築。論文の共同執筆を目標としており、ICLR2025 WorkshopとJSAI2025に採択。"},
]

[[experience]]
logo = "/images/lpixel.jpg"
institute = "エルピクセル株式会社"
role = "機械学習エンジニア"
duration = "2024.4 - 2024.9"
location = "リモート"
projects = [
    {name = "レントゲン画像の異常検知", description = "肺野のレントゲン画像から異常を検知するモデルを開発するプロジェクト。"}
]

[[experience]]
logo = "/images/sensetime.png"
institute = "株式会社センスタイムジャパン"
role = "リサーチャー"
duration = "2020.4 - 2023.3"
location = "京都"
projects = [
    {name = "落下物検出プロジェクト", description = "道路上の落下物をフロントカメラ画像から検知するプロジェクト。落下物は特定の決まったものではないため、学習困難な未知の物体をどう検知するのかを探索する。様々なアプローチの検知手法を提案し、デモ実装。その中から主要なアプローチの方向性を決定し、新規の提案手法を実装・評価。データの収集、アノテーションから実装・評価までを行った。"},
    {name = "高速道路の監視カメラ画像の解析", description = "高速道路のCCTV カメラからの物体検出結果から道路上の異常（逆走や落下物など）を検知する。物体検出結果の2D バウンディングボックスを用いて、車両の軌跡を解析することで走路の抽出、さらに、3Dバウンディングボックス化を行った。それらを利用することで、車両の逆走や速度の推定を行うシステムを構築した。"},
]

[[experience]]
logo = "/images/datagrid.png"
institute = "株式会社データグリッド"
role = "アルバイト"
duration = "2019.12 - 2020.3"
location = "京都"
hide = true

[[experience]]
logo = "/images/sensetime.png"
institute = "株式会社センスタイムジャパン"
role = "インターン"
duration = "2019.6 - 2019.9"
location = "京都"
hide = true

[[experience]]
logo = "/images/hacarus.png"
institute = "株式会社ハカルス"
role = "アルバイト"
duration = "2019.1 - 2019.4"
location = "京都"
hide = true

[[experience]]
logo = "/images/denso.png"
institute = "株式会社デンソー"
role = "インターン"
duration = "2019.2 - 2019.2"
location = "東京"
hide = true

[[experience]]
logo = "/images/hitachi.png"
institute = "株式会社日立製作所"
role = "インターン"
duration = "2018.8 - 2018.8"
location = "神奈川"
hide = true

[[qualification]]
name = "CGエンジニア検定 エキスパート"
date = "2023.12"
institute = "公益財団法人 画像情報教育振興協会 (CG-ARTS)"
number = "2312300081"

[[qualification]]
name = "画像処理検定 エキスパート"
date = "2023.08"
institute = "公益財団法人 画像情報教育振興協会 (CG-ARTS)"
number = "2302400126"

[[qualification]]
name = "TOEIC L&R 815"
date = "2023.05"
institute = "Educational Testing Service (ETS)"
# link = "https://iibc.cloudcerts.jp/viewer/cert/5aJemlWBgNAqgu68NgOA5VmIbVAVQ8JRRp0VZdV6ROK6FV9O813NxWs4gK1RDjJl"

[[qualification]]
name = "JDLA Deep Learning For GENERAL"
date = "2018.06"
institute = "一般社団法人 日本ディープラーニング協会 (JDLA)"
number = "6914272004"

[[qualification]]
name = "応用情報技術者試験"
date = "2016.10"
institute = "独立行政法人 情報処理推進機構 (IPA)"
number = "AP-2016-10-06502"

[[qualification]]
name = "基本情報技術者試験"
date = "2014.10"
institute = "独立行政法人 情報処理推進機構 (IPA)"
number = "FE-2014-10-09168"

[[qualification]]
name = "ITパスポート試験"
date = "2011.10"
institute = "独立行政法人 情報処理推進機構 (IPA)"
number = "IP-2011-10-18024"

[[publication]]
title = "Dynamic Knowledge Integration in Multi-Agent Systems for Content Inference"
authors = ["Atsushi Yamamoto", "Takumi Iida", "Taito Naruki", "Akihiko Katagiri", "Yudai Koike", "Ryuta Shimogauchi", "Kota Shimomura", "Eri Onami", "Koki Inoue", "Osamu Ito"]
bold = "Takumi Iida"
equal_contribution = ["Atsushi Yamamoto", "Takumi Iida", "Taito Naruki"]
conference = "ICLR 2025 Workshop on Towards Agentic AI for Science: Hypothesis Generation, Comprehension, Quantification, and Validation"
link = "https://openreview.net/forum?id=5XNYu4rBe4"
conferencelink = "https://iclragenticai.github.io/"
date = "2025"

[[publication]]
title = "動的な専門知識連携を意識したマルチエージェントシステム"
authors = ["山本篤", "成木太音", "片桐章彦", "小池湧大", "飯田啄巳", "下垣内隆太", "下村晃太", "大南英理", "井上顧基", "伊藤修"]
bold = "飯田啄巳"
conference = "JSAI 2025"
link = "https://confit.atlas.jp/guide/event/jsai2025/subject/3J5-GS-5-01/advanced"
date = "2025"

[[publication]]
title = "マルチモーダルRAGを用いた交通事故リスク推定"
authors = ["千葉 大幹", "伊藤修", "飯田啄巳"]
bold = "飯田啄巳"
conference = "JSAI 2025"
link = "https://confit.atlas.jp/guide/event/jsai2025/subject/4N2-GS-7-01/advanced"
date = "2025"

[[publication]]
title = "PCT: Perspective Cue Training Framework for Multi-Camera BEV Segmentation"
authors = ["Haruya Ishikawa", "Takumi Iida", "Yoshinori Konishi", "Yoshimitsu Aoki"]
bold = "Takumi Iida"
conference = "IROS 2024 (Oral)"
link = "https://arxiv.org/abs/2403.12530"
date = "2024"

[[publication]]
title = "LanesPose: 骨格推定によるレーン検出"
authors = ["玄元奏", "飯田啄巳", "小西嘉典"]
bold = "飯田啄巳"
conference = "MIRU 2023"
date = "2023"

[[publication]]
title = "Efficient Unknown Object Detection with Discrepancy Networks for Semantic Segmentation"
authors = ["Ryo Kamoi", "Takumi Iida", "Kaname Tomite"]
bold = "Takumi Iida"
conference = "NeurIPS 2021 Workshop on Machine Learning for Autonomous Driving"
link = "https://ml4ad.github.io/files/papers2021/Efficient%20Unknown%20Object%20Detection%20with%20Discrepancy%20Networks%20for%20Semantic%20Segmentation.pdf"
conferencelink = "https://ml4ad.github.io/"
date = "2021"

[[publication]]
title = "Detecting Backdoor Attacks on Deep Neural Networks by Saliency Map Clustering"
authors = ["Takumi Iida", "Kota Yoshida", "Takeshi Fujino"]
bold = "Takumi Iida"
conference = "NCSP'20"
date = "2020"

[[publication]]
title = "Bedside Event Real-time Recognition Using Low Resolution Infrared Array Sensor with Recurrent Convolutional Neural Network"
authors = ["Takumi Iida", "Kota Yoshida", "Takumi Hashimoto", "Masayoshi Shirahata", "Mitsuru Shiozaki", "Takaya Kubota", "Masafumi Kimata", "Takeshi Fujino"]
bold = "Takumi Iida"
conference = "NCSP'18"
date = "2018"

[[patent]]
title = "一种图像处理方法、装置、设备及存储介质"
translation = "落下物検知装置、落下物データ生成方法、および 落下物 学習用データ生成プログラム"
authors = ["饭田啄巳", "松永英树", ]
bold = "饭田啄巳"
patent_number = "CN116935353A"
application_number = "CN202310868168.3"
link = "https://www.patentguru.com/CN116935353A"

+++
