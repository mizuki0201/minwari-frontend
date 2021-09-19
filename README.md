# みんわり（アプリ解説編）

技術選定・実装振り返り編は[こちら](https://github.com/mizuki0201/minwari-backend)。

## アプリについて

### アプリ概要

本アプリは、友達とグループを作り、その中で割り勘ができるアプリです。  
グループを作り、そのメンバーで出かけたりした際の支払管理を行うことができます。  
また、グループ内でイベントを複数作成できるため、たくさん遊んだりするメンバーでグループを作れば、「次回多めに払ってくれればいいよ〜」といったように、割り勘して支払いが発生した分を次回出かける際などに繰り越すこともできます。

### URL

[https://minwari.netlify.app/](https://minwari.netlify.app/)

### テスト用アカウント

email：test@gmail.com  
password：password

## アプリ詳細

### 作成動機

#### ① 自身の経験から

私は、よく一緒に遊ぶ 3 人のグループがあり、そのメンバーでよく遠出もしていました。  
遠出するときには、誰かが代わりに支払い、あとで立て替えするといったことが多々あり、平均して月に 1、2 回くらいは出かけたり遊んだりしていたため、毎回計算をするのがめんどうでした。  
また、どうせこのメンバーは来週も会うのにな、と思いながらも送金アプリでお金を送ることもありました。

そのような経験から、「一つのグループに対してイベントを複数作成でき、イベント単位での割り勘はもちろん、これまでイベントを合算したグループ単位での割り勘ができ、次のイベントに支払いを持ち越すことができたら便利だな」と思い至りました。

割り勘アプリで同じようなものがないか探してみましたが、飲み会の幹事が使うような「1 つのイベント内での割り勘のみ」のアプリが多く、グループごとに複数のイベントを登録できるようなアプリは存在していませんでした。  
また、カップルや夫婦が使いそうな家計管理アプリなども存在はしていましたが、肝心の割り勘機能が存在していないため、こちらも使用することが難しかったです。

#### ② 自身の学習のため

今後エンジニアを目指すに向けて、これまで学習してきた Ruby on Rails に加え、React を学習してみたいと思ったことから、自身の学習も兼ねてアプリ作成をしようと考えました。

以上 2 点の背景から、自分で作成してみようと踏み切りました。

### 本アプリの特徴

本アプリの特徴は、 _「グループごとでの割り勘」_ ができることです。

作成動機でも触れましたが、これまでは飲み会の幹事に役立ちそうな「イベントごと」の割り勘アプリは多数存在しました。  
しかし、「グループごと」の割り勘アプリはあまり普及していないようです。  
グループを作成し、イベントを複数登録できようにしたことで、毎回精算をして支払いを行う必要はなくなります。  
そのため、よく遊ぶ固定の友達がいる場合は、この「グループごと」での割り勘が役に立つのではないかと考えています。

### 本アプリの使い方

まず、メンバーを招待してグループを作成します。  
グループの中で、遊んだ日ごとにイベントが作成できます。  
一つのイベントの中で支出情報を記録し、支出情報を記録するとすぐにイベント内での割り勘した額が・表示されます。  
そのイベントが終わった後に、精算をして支払いを済ませた場合は、その支払いを支出情報として記録します。  
しかし、イベントが終わった後でも、また近々遊ぶ機会がある場合は、その場で支払いはせずに次のイベントに持ち越すことができます。  
2 つ目のイベントを作成し、その中でまた支出情報を記録します。  
そうすることで、イベントの中での割り勘はもちろん、前回までのイベントと合算した「グループ単位」での割り勘をしてくれるため、そのグループ内で誰がどのくらい支払っているかが一目でわかります。

## 課題

### ①UI/UX 設計

本アプリは一般ユーザーがターゲットとなりますが、ターゲットに即したレスポンシブ対応やスマホアプリ版の開発はしませんでした。  
理由としては、このアプリ作成の一番の目的が「自身の学習」であるため、まずは react や rails の学習を優先して開発を進めたためです。  
そのため、PC で確認をすることを前提としてアプリ作成をしており、そこについてはターゲットと仕様の一貫性がないことが課題として挙げられます。

### ② 世の中にほんとにニーズは存在するのか

「作成動機」にも記載しましたが、このアプリは「自身の経験から」作成しました。  
プログラミング学習のために作成したということもあり、自分以外で、世の中にニーズがあるのかを調べたりすることをせずにアプリを作成しました。

実際にユーザーを集めるとなると、そこのニーズ調査からする必要があると考えるため、「そもそもニーズが存在しない（他のアプリで代替可能である）可能性も考えられます。

今回の「学習のため」という理由を除き、アプリ単体で見れば、市場調査の不足が課題として挙げられます。

## 今後の展望

### ① モバイル向けの対応

課題の ① で挙げた通り、今回のターゲットとなる一般ユーザーはスマートフォンでこのアプリを使用することが大多数かと考えられます。  
そのため、最低でもレスポンシブ対応をさせ、スマホでも見やすくすることが必須であり、その後はスマートフォンのアプリを開発することがよりターゲットに即していると考えます。

よって、今後の展望としては、レスポンシブデザインやスマートフォンアプリの開発といった、UI/UX 向上が展望として挙げられます。
