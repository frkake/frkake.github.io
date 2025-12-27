+++
type = "biography"
title = "Takumi Iida"
biography = "Machine Learning/ Computer Vision"
description = "Japanese page has more information!"
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
course = "Master of Electronic System"
university = "Ritsumeikan University"
years = "2018-2020"

[[education]]
course = "Bachelor of Electronic and Computer Engineering"
university = "Ritsumeikan University"
years = "2014-2018"

[[experience]]
logo = "/images/LayerX_Logo_Vertical_RGB_Color.png"
institute = "LayerX Inc."
role = "Machine Learning Engineer"
duration = "2025.3 - Present"
location = "Remote"
active = true
projects = [
]

[[experience]]
logo = "/images/elith_logo.webp"
institute = "Elith Inc."
role = "Research Manager"
duration = "2024.10 - 2025.2"
location = "Remote"
projects = [
    {name = "Research and development of multi-agent systems for LLM content inference", description = "Developed a multi-agent system to infer content from LLM titles. Aimed for co-authoring a paper, and the project was accepted at ICLR 2025 Workshop and JSAI 2025."}
]

[[experience]]
logo = "/images/lpixel.jpg"
institute = "LPIXEL Inc. "
role = "Machine Learning Engineer"
duration = "2024.4 - 2024.9"
location = "Remote"
projects = [
    {name = "Anomaly Detection in X-ray Images", description = "Developed a model to detect anomalies from chest X-ray images."}
]

[[experience]]
logo = "/images/sensetime.png"
institute = "SenseTime Japan, Ltd. "
role = "Researcher"
duration = "2020.4 - 2023.3"
location = "Kyoto"
projects = [
    {name = "Fallen Object Detection Project", description = "Developed a system to detect fallen objects on roads from front camera images. Since fallen objects are not specific predefined items, the challenge was exploring methods to detect such unknown objects. Proposed and implemented various detection approaches, from which a primary approach was selected. Implemented and evaluated a novel proposed method, handling everything from data collection and annotation to implementation and evaluation."},
    {name = "Highway Surveillance Camera Image Analysis", description = "Developed a system to detect road anomalies (wrong-way driving, fallen objects, etc.) from object detection results in highway CCTV cameras. Extracted driving paths by analyzing vehicle trajectories using 2D bounding boxes from object detection results, and performed 3D bounding box conversion. Using these techniques, built a system to estimate wrong-way driving and vehicle speed."},
]

[[experience]]
logo = "/images/datagrid.png"
institute = "DATAGRID Inc. "
role = "Part-time"
duration = "2019.12 - 2020.3"
location = "Kyoto"
hide = true

[[experience]]
logo = "/images/sensetime.png"
institute = "SenseTime Japan, Ltd. "
role = "Intern"
duration = "2019.6 - 2019.9"
location = "Kyoto"
hide = true

[[experience]]
logo = "/images/hacarus.png"
institute = "Hacarus Inc. "
role = "Part-time"
duration = "2019.1 - 2019.4"
location = "Kyoto"
hide = true

[[experience]]
logo = "/images/denso.png"
institute = "DENSO Corp. "
role = "Intern"
duration = "2019.2 - 2019.2"
location = "Tokyo"
hide = true

[[experience]]
logo = "/images/hitachi.png"
institute = "Hitachi, Ltd. "
role = "Intern"
duration = "2018.8 - 2018.8"
location = "Kanagawa"
hide = true

[[qualification]]
name = "Computer Graphics Engineer Certification Test (Expert)"
date = "2023.12"
institute = "Computer Graphic Arts Society (CG-ARTS)"
number = "2312300081"

[[qualification]]
name = "Image Processing Engineer Certification Test (Expert)"
date = "2023.08"
institute = "Computer Graphic Arts Society (CG-ARTS)"
number = "2302400126"

[[qualification]]
name = "TOEIC L&R 815"
date = "2023.05"
institute = "Educational Testing Service (ETS)"
# link = "https://iibc.cloudcerts.jp/viewer/cert/5aJemlWBgNAqgu68NgOA5VmIbVAVQ8JRRp0VZdV6ROK6FV9O813NxWs4gK1RDjJl"

[[qualification]]
name = "JDLA Deep Learning For GENERAL"
date = "2018.06"
institute = "Japan Deep Learning Association (JDLA)"
number = "6914272004"

[[qualification]]
name = "Applied Information Technology Engineer Examination"
date = "2016.10"
institute = "Information-technology Promotion Agency (IPA)"
number = "AP-2016-10-06502"

[[qualification]]
name = "Fundamental Information Technology Engineer Examination"
date = "2014.10"
institute = "Information-technology Promotion Agency (IPA)"
number = "FE-2014-10-09168"

[[qualification]]
name = "Information Technology Passport Examination"
date = "2011.10"
institute = "Information-technology Promotion Agency (IPA)"
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

[[post]]
title = "OCR技術の変遷と日本語対応モデルの性能検証"
postlink = "https://tech.layerx.co.jp/entry/2025/12/01/161913"
date = "2025-12-01"

[[post]]
title = "Removing Reflections from RAW Photos"
postlink = "https://speakerdeck.com/frkake/removing-reflections-from-raw-photos"
event = "第64回 コンピュータビジョン勉強会＠関東（後編）"
eventlink = "https://kantocv.connpass.com/event/360322/"
date = "2025-08-24"

[[post]]
title = "衛星画像からの地上画像生成"
postlink = "https://speakerdeck.com/elith/eccv2024du-mihui-wei-xing-hua-xiang-karanodi-shang-hua-xiang-sheng-cheng"
event = "第62回 コンピュータビジョン勉強会＠関東"
eventlink = "https://kantocv.connpass.com/event/331970/"
date = "2025-11-15"

[[post]]
title = "[CorrMLP] Correlation-aware Coarse-to-fine MLPs for Deformable Medical Image Registrationの論文紹介"
postlink = "https://speakerdeck.com/frkake/corrmlp-correlation-aware-coarse-to-fine-mlps-for-deformable-medical-image-registration"
event = "第61回 コンピュータビジョン勉強会＠関東（前編）"
eventlink = "https://kantocv.connpass.com/event/321174/"
date = "2024-07-07"

[[post]]
title = "ゼロショット物体検出の研究動向"
event = "【SenseTime Japan × Sansan】画像処理勉強会"
postlink = "https://speakerdeck.com/sensetime_japan/zerosiyotutowu-ti-jian-chu-falseyan-jiu-dong-xiang"
eventlink = "https://sansan.connpass.com/event/230636/"
date = "2021-12-03"

[[post]]
title = "INTERN 2.5のまとめ＆関連論文"
event = "MIRU2023企業展示 & SSII企業展示"
postlink = "https://speakerdeck.com/sensetime_japan/intern-2-dot-5nomatome-and-guan-lian-lun-wen"
date = "2023-07-20"

[[post]]
title = "OKdoの格安LiDARで遊んでみた"
event = "SenseTime Japanアドベントカレンダー2021"
postlink = "https://tech.sensetime.jp/?p=1616"
date = "2021-12-22"

[[post]]
title = "Zero-Shot Detectionの研究まとめ"
postlink = "https://tech.sensetime.jp/?p=1080"
date = "2021-12-01"

[[post]]
title = "CVPR2020でセンスタイムが発表した、仮想試着を行うACGPNの論文を紹介します"
postlink = "https://tech.sensetime.jp/?p=596"
date = "2021-03-01"

[[post]]
title = "GANについて概念から実装まで　～DCGANによるキルミーベイベー生成～"
postlink = "https://qiita.com/frkake/items/0093a68bfae0b0ff879d"
date = "2018-03-14"

+++

