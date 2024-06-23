# 個人ブログのリポジトリ

## インストール

### MacOS

1. [go](https://go.dev/doc/install)をpkgからインストール
2. Hugoのv0.118.2をインストール
　　brewのtrapを利用してインストールする。  
    - 方法1: Formulaのrbファイルをダウンロードして展開する。
        ```console
        $ brew tap-new $USER/hugo@v0.118.2
        $ curl https://raw.githubusercontent.com/Homebrew/homebrew-core/18196e52086719b14548a9f00bf6c751e5225d3f/Formula/h/hugo.rb -o /opt/homebrew/Library/Taps/iida/homebrew-hugo@v0.118.2/Formula/hugo.rb
        $brew install iida/hugo@v0.118.2/hugo
        ```
    - 方法2: [検索する方法](https://blog.chick-p.work/til/brew-install-specify-version/)があるらしい
