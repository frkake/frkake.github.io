+++
title = 'Albumentationsにおける自作変換クラス作成'
date = 2024-06-13T23:06:34
pubdate = 2024-06-12T23:06:34
tags = ['Python', 'Albumentations', 'Data Augmentation']
draft = false
+++


{{< links project="https://albumentations.ai/" paper="https://arxiv.org/abs/1809.06839" code="https://github.com/albumentations-team/albumentations" other="https://github.com/frkake/albumentations_post" >}}

-----------

なんだかものすごく久しぶりの投稿ですが、今回はAlbumentationsにおける自作変換クラス作成について書いていきます。

画像変換するとき、Albumentationsって便利ですよね。なんといっても変換できる種類の数が豊富なのが嬉しいです。  
ただ、自分で新たに変換クラスを作成しようとすると、ドキュメントが豊富とは言えないと思うので、誰かの役に立てばと思い、今回の記事を書くことにしました（未来の自分のためかもしれない）。

実行例はすべて[このリポジトリ](https://github.com/frkake/albumentations_post)にあります。

## 基本的な使い方

### マスク画像を使って画像をクロップする

Albumentationsの基本的な使い方を確認するために、以下のコードを実行してみます。画像とマスクの大きさが中途半端で申し訳ないです。

```python
image = cv2.imread('data/images/dog_and_cat.png') # image.shape: (340, 500, 3)
mask = cv2.imread('data/masks/dog.png', cv2.IMREAD_GRAYSCALE) # mask.shape: (340, 500)

transform = A.Compose([
    A.CropNonEmptyMaskIfExists(height=200, width=200, p=1),
    A.PadIfNeeded(min_height=210, min_width=210, border_mode=cv2.BORDER_CONSTANT, 
                  value=(128, 128, 128), mask_value=128, p=1),
])

transformed = transform(image=image, mask=mask_dog)
grid_image = make_grid_image(transformed.values(), n_cols=2) # 結果の画像をタイル状に並べる
cv2.imwrite('data/results/crop_dog_by_mask.png', grid_image)
```

{{< collapse "make_grid_image()" >}}

`make_grid_image`関数は、複数の画像をタイル状に並べる関数です。

```python
def make_grid_image(
    images: Sequence[np.ndarray],
    n_cols: int,
):
    images = [  cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)
                if image.ndim == 2 else image for image in images]
    n_rows = len(images) // n_cols
    h, w, c = images[0].shape
    grid_image = np.zeros((h * n_rows, w * n_cols, c), dtype=np.uint8)
    for i, image in enumerate(images):
        row = i // n_cols
        col = i % n_cols
        grid_image[row * h:(row + 1) * h, col * w:(col + 1) * w] = image
        
    return grid_image
```
{{< /collapse >}}

{{< tile-images cols=3 >}}
![images/dog_and_cat.png](data/images/dog_and_cat.png)
![masks/dog.png](data/masks/dog.png)
![data/results/crop_dog_by_mask.png](data/results/crop_dog_by_mask.png)
{{< /tile-images >}}

ここでは、画像(=image)に犬と猫が写った写真。マスク(=mask)には犬の領域に対応したマスク画像を与えています。
データ変換のパイプラインとしては次の処理を行っています。

1. `A.CropNonEmptyMaskIfExists`でマスクを含むような形で画像を200x200にクロップ
2. `A.Resize`で256x256にリサイズ
3. `A.PadIfNeeded`で外周4ピクセル分をを128でパディング

ご覧の通り、犬の領域に合わせて画像がクロップされていることがわかります。  
imageとmaskが同様に変換されていることが確認できます。  
解像度の関係でわかりにくいかもしれませんが、imageとmaskによってResizeによる補間処理は異なっています。imageの方は、引数通り線形補間が行われますが、maskの方は最近傍補間が行われています。

`A.Compose`に一連の変換処理をリストで渡すことで、変換処理をパイプラインとして実行できます。  
基本的にAlbumentationsの変換処理のフォーマットはNumpy形式と決まっており、`A.Compose`は、まず初めに入力がそれらの形式になっているのかのチェックやimageとmaskが同じshapeなのかなどのチェックを行います。その後、変換処理を実行していきます。

今回の記事ではRGB画像とマスク画像しか扱いませんが、他にもBBoxやキーポイントなどもいい感じに変換できます。

### マスクが複数になったら

マスクが複数になったら、maskの代わりに各マスクをリストにしたmasksを引数として渡してあげると複数のマスクに同様の変換を適用してくれます。

```python
image = cv2.imread('data/images/dog_and_cat.png') # image.shape: (340, 500, 3)
mask_dog = cv2.imread('data/masks/dog.png', cv2.IMREAD_GRAYSCALE) # mask_dog.shape: (340, 500)
mask_cat = cv2.imread('data/masks/cat.png', cv2.IMREAD_GRAYSCALE) # mask_cat.shape: (340, 500)
transformed = transform(image=image, masks=[mask_dog, mask_cat])

grid_image = make_grid_image([transformed["image"], ] + transformed['masks'], n_cols=3)
cv2.imwrite('data/results/crop_dog_and_cat_by_masks.png', grid_image)
```

{{< tile-images cols=2 >}}
![images/dog_and_cat.png](data/images/dog_and_cat.png)
![masks/dog.png](data/masks/dog.png)
![masks/cat.png](data/masks/cat.png)
![data/results/crop_dog_and_cat_by_masks.png](data/results/crop_dog_and_cat_by_masks.png)
{{< /tile-images >}}

`A.CropNonEmptyMaskIfExists`は、複数のマスクがあると、それらのマスク領域の和集合を含むようにしてクロップします。この場合、犬か猫の領域のどちらかを少なくとも含むように、領域をクロップします。

Albumentationsの各変換モジュールがどのターゲット（mask, bbox, keypoint, global_label）に対して作用するのかは、[リファレンス](https://albumentations.ai/docs/api_reference/full_reference/)を見るとわかりやすいです。  
Pixel-levelの変換は、輝度調整や色調変換、ボケやノイズなどの効果をつけたりするものが多く、画像にのみ作用します。  
Spatial-levelの変換は、クロップやリサイズ、パディングや回転などの幾何変換を伴うものが多く、画像以外にもマスクやBBox、キーポイントなどにも作用します。各クラスによって作用するターゲットが異なるので、リファレンスの表を見て確認する必要があります。

## 自作クラスの作成

さて、ここからが本題です。自作の変換クラスを作成してみます。まずは基本的な自作クラスの作成方法を解説します。

### 基本編

Albumentationsでは、主に次の3つのクラスをベースクラスとして自作クラスを作成します。

1. `A.BasicTransform`  
    `A.ImageOnlyTransform`と`A.DualTransform`の基底クラス。  
    色々な変換をするときのパラメータを設定するメソッドを持っています。
2. `A.ImageOnlyTransform`  
    画像のみを変換するときに使う基底クラス。
3. `A.DualTransform`  
    画像とマスクやBBox、キーポイントを同時に変換するときに使う基底クラス

特殊な変換クラスでもない限り、基本的には`A.ImageOnlyTransform`か`A.DualTransform`を継承して作成していくのが一般的だと思います。

#### ImageOnlyTransformを継承したクラス

`A.ImageOnlyTransform`を継承して、画像の特定のチャネルだけ残して他を0にする自作変換クラス`SelectChannel`を作成してみます。

```python
class SelectChannel(A.ImageOnlyTransform):
    def __init__(self, channel: int, always_apply=False, p=1):
        super(SelectChannel, self).__init__(always_apply, p)
        self.channel = channel
    
    def apply(self, image: np.ndarray, **params) -> np.ndarray:
        H, W, C = image.shape
        canvas = np.zeros_like(image)
        canvas[..., self.channel] = image[..., self.channel]
        return canvas
    
    def get_transform_init_args_names(self):
        return ("channel",)
```

{{< collapse "実行例" >}}

青だけ残す処理を行ってみます。OpenCVで読み込んでおり、BGRなので0チャネル目が青です。   

```python
transform = A.Compose([
    SelectChannel(channel=0, p=1),
])

image = cv2.imread('data/images/dog_and_cat.png')
transformed = transform(image=image)
cv2.imwrite('data/results/select_b.png', transformed["image"])
```

{{< tile-images cols=2 >}}
![images/dog_and_cat.png](data/images/dog_and_cat.png)
![results/select_b.png](data/results/select_b.png)
{{< /tile-images >}}

{{< /collapse >}}

このように画像への処理内容は`apply()`に記述します。  
`get_transform_init_args_names()`というメソッドは、`A.ReplayCompose`を使うときに必要になるメソッドです。まだ必要ないのですが、後で`A.ReplayCompose`の説明もしたいので、まとめて定義しておきます。  
`apply()`には、`transform(image=image)`で渡されたimageが渡されます。それに対して処理を行って返却すると、返り値の辞書の`image`キーに値が格納されます。  

#### DualTransformを継承したクラス

さて、次は指定した領域をクロップするクラス `Crop`を作成してみます。`A.Crop`の簡略版です。

```python
class Crop(A.DualTransform):
    def __init__(
        self, 
        x_min: int, 
        y_min: int, 
        x_max: int, 
        y_max: int, 
        always_apply=False, 
        p=1,
    ):
        super(Crop, self).__init__(always_apply, p)
        self.x_min = x_min
        self.y_min = y_min
        self.x_max = x_max
        self.y_max = y_max

    def apply(self, image, **params):
        return image[self.y_min:self.y_max, self.x_min:self.x_max]

    def apply_to_mask(self, mask: np.ndarray, **params) -> np.ndarray:
        return mask[self.y_min:self.y_max, self.x_min:self.x_max]

    def apply_to_masks(self, masks: List[np.ndarray], **params) -> List[np.ndarray]:
        return [mask[self.y_min:self.y_max, self.x_min:self.x_max] for mask in masks]

    def get_transform_init_args_names(self):
        return ("x_min", "y_min", "x_max", "y_max")
```

{{< collapse "実行例" >}}

```python
transform = A.Compose([
    Crop(x_min=100, y_min=100, x_max=300, y_max=300, p=1),
    A.PadIfNeeded(min_height=210, min_width=210, border_mode=cv2.BORDER_CONSTANT, 
                  value=(128, 128, 128), mask_value=128, p=1),
])

image = cv2.imread('data/images/dog_and_cat.png')
mask_dog = cv2.imread('data/masks/dog.png', cv2.IMREAD_GRAYSCALE)
mask_cat = cv2.imread('data/masks/cat.png', cv2.IMREAD_GRAYSCALE)
transformed = transform(image=image, masks=[mask_dog, mask_cat])
grid_image = make_grid_image([transformed["image"],] + transformed['masks'], n_cols=3)
cv2.imwrite('data/results/crop_constant.png', grid_image)
```

{{< tile-images cols=2 >}}
![images/dog_and_cat.png](data/images/dog_and_cat.png)
![results/crop_constant.png](data/results/crop_constant.png)
{{< /tile-images >}}

`Crop`クラスで指定した領域がクロップされていることが確認できます。

{{< /collapse >}}

このクラスは、画像とマスクを同時にクロップする処理を行います。`apply()`メソッドは画像に対する処理、`apply_to_mask()`メソッドはマスクに対する処理、`apply_to_masks()`メソッドは複数のマスクに対する処理を行います。

`A.DualTransform`では、他にも `apply_to_bbox()`、`apply_to_keypoint()`、`apply_to_global_label()` などがあり、それぞれのターゲットに対してメソッドを定義することができます。

{{< notice note >}}
実は、上の変換クラス`Crop`はさらに単純化することができます。`apply_to_mask()`と`apply_to_masks`を定義していますが、次のように`apply()`メソッドを定義するだけで、maskも同様にクロップされます。imageとmaskは対応したものとして扱われ、同じ変換処理が適用されます。  
そのため、次の`Crop`クラスは上の`Crop`クラスと同じ挙動をします。

```python
class Crop(A.DualTransform):
    def __init__(self, x_min, y_min, x_max, y_max, always_apply=False, p=1):
        super(Crop, self).__init__(always_apply, p)
        self.x_min = x_min
        self.y_min = y_min
        self.x_max = x_max
        self.y_max = y_max

    def apply(self, image, **params):
        return image[self.y_min:self.y_max, self.x_min:self.x_max]

    def get_transform_init_args_names(self):
        return ("x_min", "y_min", "x_max", "y_max")
```

唯一違うのはリサイズなどで補間処理を見つけたら、mask（およびmasks）の場合は最近傍補間が適用されるように自動的に修正されるという点です。  
imageとは異なる処理をしたい場合や可読性を上げたい場合を除けば、`apply()` メソッドのみを定義しておけば十分です。
{{< /notice >}}

### 応用編

応用編では、より複雑な変換クラスを作成してみます。

#### ランダム値を扱いたい

##### 適用するごとにランダム値を生成する

まずは、ランダムなシフトを行う変換クラス`RandomShift`を作成してみます。

```python
class RandomShift(A.DualTransform):
    def __init__(
        self, 
        x_shift: Tuple[int, int],
        y_shift: Tuple[int, int],
        always_apply=False, 
        p=1,
    ):
        super().__init__(always_apply, p)
        self.x_shift = x_shift
        self.y_shift = y_shift

    def apply(
        self, 
        image: np.ndarray, 
        x_shift: int, 
        y_shift: int, 
        **params: Any,
    ) -> np.ndarray:
        H, W, *_ = image.shape
        canvas = np.zeros_like(image)
        x_min = max(0, x_shift)
        y_min = max(0, y_shift)
        x_max = min(W, W + x_shift)
        y_max = min(H, H + y_shift)
        
        canvas[y_min:y_max, x_min:x_max] = image[max(0, -y_shift):min(H, H - y_shift), 
                                                 max(0, -x_shift):min(W, W - x_shift)]
        
        return canvas

    def get_transform_init_args_names(self):
        return ("x_shift", "y_shift")
    
    def get_params(self):
        return {
            "x_shift": np.random.randint(*self.x_shift),
            "y_shift": np.random.randint(*self.y_shift),
        }
```

{{< collapse "実行例" >}}

上下左右に[-100, 100]ピクセルの範囲でランダムにシフトする処理を行ってみます。

```python
transform = RandomShift(x_shift=(-100, 100), y_shift=(-100, 100), p=1)

for i in range(2):
    image = cv2.imread('data/images/dog_and_cat.png')
    mask_dog = cv2.imread('data/masks/dog.png', cv2.IMREAD_GRAYSCALE)
    mask_cat = cv2.imread('data/masks/cat.png', cv2.IMREAD_GRAYSCALE)
    transformed = transform(image=image, masks=[mask_dog, mask_cat])
    grid_image = make_grid_image([transformed["image"],] + transformed['masks'], n_cols=3)
    cv2.imwrite(f'data/results/shift_{i:02d}.png', grid_image)
```

{{< tile-images cols=1 >}}
![data/results/shift_00.png](data/results/shift_00.png)
![data/results/shift_01.png](data/results/shift_01.png)
{{< /tile-images >}}

ランダムになっていることを確認するために2回実行してみました。2回とも異なるシフトが適用されていることがわかります。さらに、画像とマスクの両方で同じシフトが適用されていることも確認できます。

{{< /collapse >}}

`get_params()`で、適用するごとにランダムな値を生成しています。  
`get_params()`の返り値は、`apply()`メソッドの引数に渡されます。今回は`apply()`の引数に`x_shift`と`y_shift`を追加して直接受けてみましたが、特に指定しないと`**params`で受け取ることができます。  
コラムでも述べたように、`apply()`メソッドは他のターゲットにも適用されるので、`apply_to_mask()`や`apply_to_bbox()`などでも共有して使うことができます。これにより、画像とマスクが同じシフトを受けることが保証されます。

##### 入力データに依存したランダム値を生成する

次に、ランダムにクロップする変換クラス`RandomCrop`を作成してみます。`RandomCrop`は、ランダムにクロップする位置を変更しますが、クロップする矩形が画像の範囲を超えないようにするため、画像のサイズに依存したランダム値を生成する必要があります。

```python
class RandomCrop(A.DualTransform):
    def __init__(
        self, 
        height: int,
        width: int,
        always_apply=False, 
        p=1,
    ):
        super().__init__(always_apply, p)
        self.height = height
        self.width = width

    def apply(
        self, 
        image: np.ndarray,
        x_min: int,
        y_min: int,
        x_max: int,
        y_max: int,
        **params,
    ) -> np.ndarray:
        return image[y_min:y_max, x_min:x_max]

    def get_transform_init_args_names(self):
        return ("height", "width")
    
    def get_params_dependent_on_targets(self, params):
        image = params["image"]
        H, W, C = image.shape
        x_min = np.random.randint(0, W - self.width)
        y_min = np.random.randint(0, H - self.height)
        x_max = x_min + self.width
        y_max = y_min + self.height
        
        return {
            "x_min": x_min,
            "y_min": y_min,
            "x_max": x_max,
            "y_max": y_max,
        }

    @property
    def targets_as_params(self):
        return ["image"]
```

{{< collapse "実行例" >}}

画像から200x200サイズの領域をランダムにクロップしてみます。今回もランダムになっているか確認するために2回実行してみます。

```python
transform = A.Compose([
    RandomCrop(height=200, width=200, p=1),
    A.PadIfNeeded(min_height=210, min_width=210, border_mode=cv2.BORDER_CONSTANT, 
                value=(128, 128, 128), mask_value=128, p=1),
])

for i in range(2):
    image = cv2.imread('data/images/dog_and_cat.png')
    mask_dog = cv2.imread('data/masks/dog.png', cv2.IMREAD_GRAYSCALE)
    mask_cat = cv2.imread('data/masks/cat.png', cv2.IMREAD_GRAYSCALE)
    transformed = transform(image=image, masks=[mask_dog, mask_cat])
    grid_image = make_grid_image([transformed["image"],] + transformed['masks'], n_cols=3)
    cv2.imwrite(f'data/results/randomcrop_{i:02d}.png', grid_image)
```

{{< tile-images cols=2 >}}
![data/results/randomcrop_00.png](data/results/randomcrop_00.png)
![data/results/randomcrop_01.png](data/results/randomcrop_01.png)
{{< /tile-images >}}

画像内のランダムな位置がクロップされていることが確認できます。クロップ領域が画像の範囲を超えないようになっていることも確認できます。

{{< /collapse >}}

`get_params_dependent_on_targets()`で、`params`に含まれる`image`からランダムな値を生成しています。`get_params_dependent_on_targets()`で利用したいターゲットは、`targets_as_params`プロパティで指定しておかなければなりません。`target_as_params`で`params`のパラメータを収集（辞書を構築）して、`get_params_dependent_on_targets()`を実行する流れになっています。
`get_params()`と`get_params_dependent_on_targets()`を別々に紹介しましたが、`get_params_dependent_on_targets()`は`get_params()`の代わりに使うこともできます。両方定義した場合は、互いの返り値の辞書がマージされます。

#### 他のデータ形式も変換したい

Albumentationsの標準では、画像とマスク、BBox、キーポイント、グローバルラベルへの処理をサポートしています。  
しかし、中には文字列やリストなどの他のデータ形式を変換したい場合もあるでしょう。ここでは、入力画像ファイル名の末尾（suffix）に変換した処理名を追加する処理を加えてみましょう。

```python
class CropAndAddSuffix(Crop):
    def apply_to_str(self, string: str, **params) -> str:
        return string + "/cropped"
    
    @property
    def targets(self) -> List[str]:
        return {
            "image": self.apply,
            "mask": self.apply,
            "image_name": self.apply_to_str,
        }
```

{{< collapse "実行例" >}}

`CropAndAddSuffix`を実行しています。

```python
transform = CropAndAddSuffix(100, 100, 300, 300, p=1)

image_path = Path('data/images/dog_and_cat.png')
image = cv2.imread(str(image_path))
transformed = transform(image=image, image_name=image_path.stem)

print(f"transformed.keys(): {transformed.keys()}")
# ==> transformed.keys(): dict_keys(['image', 'masks', 'image_name'])

print(f"transformed['image_name']: {transformed['image_name']}")
# ==> transformed['image_name']: dog_and_cat/cropped
```

実行結果を見てみると、`image_name`キーに渡したファイル名が`dog_and_cat/cropped`に変換されていることがわかります。

{{< /collapse >}}

前節で作成した`Crop`クラスに`apply_to_str()`と`targets`プロパティを追加しています。このように `targets`プロパティで渡したキーに対して、処理させたいメソッドを指定することで、他のデータ形式にも変換処理を適用できます。  
こうすると、変換時に`image_name`というキーで渡した文字列に対して、`apply_to_str()`が適用され、`/cropped`というsuffixを追加します。  
あまりやらないですが、どういう処理をした画像なのかをファイル名に残しておきたい場合などに使えるかもしれません。  


#### 他の入力情報を利用した変換をしたい

[マスクが複数になったら](#マスクが複数になったら)で紹介したように、複数のマスクがある場合には次のように`masks`にマスクのリストを渡すことで、それぞれのマスクに同じ変換を適用できます。

```python
transformed = transform(image=image, masks=[mask_dog, mask_cat])
```

例えば、犬と猫のマスクを両方渡して、犬の方のマスク領域だけを抽出する変換クラス`ExtractDogArea`を素朴に作成すると次のようになります。

```python
class CropDogArea(A.DualTransform):
    def __init__(self, always_apply=False, p=1):
        super().__init__(always_apply, p)
    
    def apply(
        self, 
        image: np.ndarray,
        x_min: int,
        y_min: int,
        x_max: int,
        y_max: int,
        **params,
    ) -> np.ndarray:
        return image[y_min:y_max, x_min:x_max]
    
    def get_params_dependent_on_targets(self, params):
        mask = params["masks"][0] # HERE!
        indices = np.where(mask > 0)
        y_min, y_max = indices[0].min(), indices[0].max()
        x_min, x_max = indices[1].min(), indices[1].max()
        
        return {
            "x_min": x_min,
            "y_min": y_min,
            "x_max": x_max,
            "y_max": y_max,
        }

    @property
    def targets_as_params(self):
        return ["masks"]
```

{{< collapse "実行例" >}}

```python
transform = A.Compose([
    CropDogArea(p=1), 
    A.PadIfNeeded(
        min_height=200,
        min_width=130,
        value=(128, 128, 128),
        mask_value=128,
    )],
)

image = cv2.imread('data/images/dog_and_cat.png')
mask_dog = cv2.imread('data/masks/dog.png', cv2.IMREAD_GRAYSCALE)
mask_cat = cv2.imread('data/masks/cat.png', cv2.IMREAD_GRAYSCALE)
transformed = transform(image=image, masks=[mask_dog, mask_cat])
grid_image = make_grid_image([transformed["image"],] + transformed['masks'], n_cols=3)
cv2.imwrite('data/results/crop_dog_area.png', grid_image)
```

左から画像、犬のマスク画像、猫のマスク画像に対応しており、それぞれの犬のマスク領域に対応した領域がクロップされていることがわかります。

![data/results/crop_dog_area.png](data/results/crop_dog_area.png)

{{< /collapse >}}

しかし、これでは入力したマスクの順序を覚えておかなければならないという問題があります。様々な変換を組み合わせて適用する場合に、それらすべてのクラスで0番目のマスクが犬のマスクであることを共通化するのは難しいですし、利用する際に順序を間違えてしまう可能性もあります。`get_params_dependent_on_targets()`の中が見苦しいことになっています。

ですので、`mask_dog`と`mask_cat`を`masks`にまとめて渡すのではなく、`mask_dog`と`mask_cat`をそれぞれ`dog_mask`と`cat_mask`として渡せるようにしてみましょう。

```python
class CropDogArea(A.DualTransform):
    def __init__(self, always_apply=False, p=1):
        super().__init__(always_apply, p)
    
    def apply(
        self, 
        image: np.ndarray,
        x_min: int,
        y_min: int,
        x_max: int,
        y_max: int,
        **params,
    ) -> np.ndarray:
        return image[y_min:y_max, x_min:x_max]
    
    def get_params_dependent_on_targets(self, params):
        mask = params["mask_dog"]
        indices = np.where(mask > 0)
        y_min, y_max = indices[0].min(), indices[0].max()
        x_min, x_max = indices[1].min(), indices[1].max()
        
        return {
            "x_min": x_min,
            "y_min": y_min,
            "x_max": x_max,
            "y_max": y_max,
        }

    @property
    def targets_as_params(self):
        return ["mask_dog"]
```

`get_params_dependent_on_targets()`や`targets_as_params`が`mask_dog`をそのまま利用できるようになりました。  
しかし、なにも考えずに利用すると、`mask_dog`と`mask_cat`はマスクとして扱われないため、クロップされません。なので、実行時に「`mask_dog`と`mask_cat`はマスク処理をする対象のデータである」ことを明示的に指定する必要があります。

`A.Compose`の`additional_targets`引数を使って、キーにターゲット名、値にターゲットの種類を指定します。

```python
transform = A.Compose([
    CropDogArea(p=1), 
    A.PadIfNeeded(
        min_height=210,
        min_width=140,
        value=(128, 128, 128),
        mask_value=128,
    )], 
    additional_targets={"mask_dog": "mask", "mask_cat": "mask"}
)
```

{{< collapse "実行例" >}}

`mask_dog`, `mask_cat`をそれぞれ処理した結果は同じキーに格納されて返ってきます。

```python
image = cv2.imread('data/images/dog_and_cat.png')
mask_dog = cv2.imread('data/masks/dog.png', cv2.IMREAD_GRAYSCALE)
mask_cat = cv2.imread('data/masks/cat.png', cv2.IMREAD_GRAYSCALE)
transformed = transform(image=image, mask_dog=mask_dog, mask_cat=mask_cat)
grid_image = make_grid_image([
    transformed["image"], 
    transformed["mask_dog"], 
    transformed["mask_cat"]], n_cols=3)
cv2.imwrite('data/results/crop_dog_area.png', grid_image)
```

処理結果の画像は上の結果と同じですが再掲します。  
左から画像、犬のマスク画像、猫のマスク画像に対応しており、それぞれの犬のマスク領域に対応した領域がクロップされていることがわかります。

{{< tile-images cols=1 >}}
![data/results/crop_dog_area.png](data/results/crop_dog_area.png)
{{< /tile-images >}}

{{< /collapse >}}

`additional_targets` --> `targets`のように辞書をたどって行くことで、処理対象のメソッドへとたどり着きます。  
`A.DualTransform`には次の`targets`が定義されているので、`"mask_dog"` --> `"mask"` --> `apply_to_mask()` にたどり着きます。

```python
    @property
    def targets(self) -> Dict[str, Callable[..., Any]]:
        return {
            "image": self.apply,
            "mask": self.apply_to_mask,
            "masks": self.apply_to_masks,
            "bboxes": self.apply_to_bboxes,
            "keypoints": self.apply_to_keypoints,
        }
```

#### 複数種類の入力データを組み合わせた処理をしたい && 返り値を追加したい

これまでの変換処理は、それぞれの画像やマスクに対して処理を行い、その結果を`image`や`masks`として返していました。しかし、処理結果に追加の情報を返したい場合や、複数種類の入力データを組み合わせた処理を行いたい場合もあるでしょう。

この節では、複数の別々に用意したカテゴリマスクを一枚の画像にまとめる処理を行う変換クラス`MergeMasks`を作成してみます。  
具体的には、犬、猫、芝生、木の4つのマスクを別々に用意したので、それらを一枚の画像にまとめてセグメンテーション用のマスクを作成します。ただし、犬、猫はオブジェクトクラス、芝生、木は背景クラスとしてラベルをまとめます。

```python
class MergeMasks(A.DualTransform):
    def __init__(
        self, 
        object_value: Tuple[int, int, int] = (255, 0, 0),
        bg_value: Tuple[int, int, int] = (0, 255, 0),
        always_apply=False,
        p=1,
    ):
        super().__init__(always_apply, p)
        self.object_value = object_value
        self.bg_value = bg_value
    
    def apply(self, img: np.ndarray, **params) -> np.ndarray:
        return img
    
    def apply_with_params(
        self, 
        params: Dict[str, Any], 
        *args: Any, 
        **kwargs: Any,
    ) -> Dict[str, Any]:
        res = super().apply_with_params(params, *args, **kwargs)
        
        H, W = res["mask_dog"].shape
        canvas = np.zeros((H, W, 3), dtype=np.uint8)
        
        mask_object = np.logical_or(res["mask_dog"], res["mask_cat"])
        mask_bg = np.logical_or(res["mask_grass"], res["mask_tree"])
        
        canvas[mask_object] = self.object_value
        canvas[mask_bg] = self.bg_value        
        res["mask_merged"] = canvas
        res["image_overlay"] = cv2.addWeighted(res["image"], 0.5, canvas, 0.5, 0)
        
        return res
    
    def get_transform_init_args_names(self) -> Tuple[str]:
        return ("object_value", "bg_value")
```

{{< collapse "実行例" >}}

画像と各マスクを[-10, 10]度の範囲でランダムに回転させ、`MergeMasks`でマスクをマージしてみます。

処理の対象がわかりやすいように、少しコードが長くなってしまいますが、犬、猫、芝生、木のマスクを読み込んでtransformに渡しています。  
返り値には、マージ後のマスク`mask_merged`と、画像とマスクを重ねた画像`image_overlay`が追加されているので、それらを描画してみました。

```python
transform = A.Compose([
    A.Rotate(limit=10, border_mode=0, p=1), 
    MergeMasks(object_value=(0, 170, 246), bg_value=(255, 90, 0), p=1),
], additional_targets={
    "mask_dog": "mask", 
    "mask_cat": "mask",
    "mask_grass": "mask",
    "mask_tree": "mask",
})

image = cv2.imread('data/images/dog_and_cat.png')
mask_dog = cv2.imread('data/masks/dog.png', cv2.IMREAD_GRAYSCALE)
mask_cat = cv2.imread('data/masks/cat.png', cv2.IMREAD_GRAYSCALE)
mask_grass = cv2.imread('data/masks/grass.png', cv2.IMREAD_GRAYSCALE)
mask_tree = cv2.imread('data/masks/tree.png', cv2.IMREAD_GRAYSCALE)
transformed = transform(
    image=image, 
    mask_dog=mask_dog, 
    mask_cat=mask_cat,
    mask_grass=mask_grass,
    mask_tree=mask_tree,
)
grid_image = make_grid_image([
    transformed["image"], 
    transformed["mask_merged"], 
    transformed["image_overlay"]], n_cols=3)
cv2.imwrite('data/results/merged_mask.png', grid_image)
```

![data/results/merged_mask.png](data/results/merged_mask.png)

{{< /collapse >}}

複数のマスクを組み合わせたり、追加の情報を返す場合は、`apply_with_params()`メソッドを使うと実現できます。  
本来の`apply_with_params()`は、各ターゲットに対して適用するメソッドの選択やちょっとしたパラメータの更新を行い、実際に各処理（`apply()`や`apply_to_mask()`など）を実行するメソッドです。
言い換えると、各入力情報を保持しており、`apply_with_params()`の返り値がtransformしたときの返り値となります。ですので、ここでは返り値の辞書に新たな要素を追加しています。
引数である`params`には、`get_params()`と`get_params_dependent_on_targets()`から受け取った値が入っており、`args`, `kwargs`には、各入力データが入っています。

## ベースクラスのリファレンス

|メソッド or プロパティ | 説明 |
| --- | --- |
| `apply()` | 画像に対する変換処理を行うメソッド。 `A.DualTransform` の場合は、マスクに対する処理も行う。 |
| `targets_as_params` | `get_params_dependent_on_targets()`で利用するターゲットを指定 |
| `add_targets()` | 辞書形式で追加で処理したいターゲット名とその対象として扱わせたいターゲット名を指定します。上の例で出していた`A.Compose`の`additional_targets`と同じです。`A.Compose`で`additional_targets`を指定すると、内部的には各変換クラスの`add_targets()`が呼ばれています。 |
| `apply_with_params()` | `targets`で指定した辞書に従って、各ターゲットに対する処理を行う。処理を行う前に`update_params()`によるパラメータ更新も行う。 |
| `get_params()` | 入力データに依存しないパラメータを準備する関数。変換ごとに一度しか呼ばれないので、同時に入力したデータでランダム値を共有したい場合に便利。 |
| `get_params_dependent_on_targets()` | 入力データに依存したパラメータを準備する関数。`get_params()`の上位互換という印象。 |
| `get_transform_init_args_names()` | そのクラスを初期化するのに必要なパラメータ名のリストを返す。通常は不要だが、`A.ReplanCompose`などで同じパラメータを使いまわす場合に使う。 |
| `set_deterministic()` | |
| `targets` | 変換対象のターゲット名とそれを処理するメソッドを指定する。 |
| `update_params()` | `apply_with_params()`内部で最初に呼ばれる。 `params`と`kwargs`の両方が渡されるので、`get_params()`, `get_params_dependent_on_targets()`の中で一番使える情報が多い。 |

変換に利用されるパラメータ`params`は、次の3つのメソッドを順番に呼び出し、辞書を更新していきます。

1. `get_params()`
2. `get_params_dependent_on_targets()`
3. `update_params()`
