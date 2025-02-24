<!-- 
※送信ボタンのリンク先指定、閉じるボタンのリンク先指定
※チェックボックスの不具合修正 
-->
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="msapplication-TileImage" content="./images/cropped-favicon_ECAI-270x270.png">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://ecai.v9h1ss.net/form_app/stable/index.php">
  <meta property="og:title" content="ECAIアンケート生成アプリ - ECAI" />
  <meta name="description" content="ECAIアンケート生成アプリ - ECAI">
  <meta property="og:description" content="ECAIアンケート生成アプリ - ECAI" />
  <meta name="thumbnail" content="https://ecai.v9h1ss.net/form_app/stable/images/ecai_icon_1910_1000.png" />
  <meta property="og:image" content="https://ecai.v9h1ss.net/form_app/stable/images/ecai_icon_1910_1000.png">
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="ECAIアンケート生成アプリ - ECAI" />
  <meta name="twitter:image" content="https://ecai.v9h1ss.net/form_app/stable/images/ecai_icon_1910_1000.png" />
  <title>【v2.4.1】アンケート生成アプリ</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="./css/form.css">
  <link rel="icon" href="./images/cropped-favicon_ECAI-32x32.png" sizes="32x32">
  <link rel="icon" href="./images/cropped-favicon_ECAI-192x192.png" sizes="192x192">
  <link rel="apple-touch-icon" href="./images/cropped-favicon_ECAI-180x180.png">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

  <style>

    </style>

</head>

<body>
  <div class="wrap">

  <div class="header">
    <h1 class="title">アンケート生成アプリ</h1>
  </div>

  <div id="app" class="container">

  <section class="input_page_header">
    <h2>【入力ページ】</h2>
    <dl>
      <dt>ページタイトル</dt>
      <dd><input type="text" v-model="contents[0].tabTitle" ></dd>
      

      <dt>ヘッダー画像（※ファイルサイズは1MB以内）</dt>
      <dd v-if="contents[0].imagePath"><img :src="contents[0].imagePath" alt="アップロードされた画像" style='max-width:500px;'><br></dd>

      <?php
      // エラー表示
      if (isset($_GET['error'])) {
          echo "<p style='color:red;'>エラー: " . htmlspecialchars($_GET['error']) . "</p>";
      }
      // 成功メッセージ
      // if (isset($_GET['success'])) {
      //     echo "<p style='color:green;'>画像がアップロードされました！</p>";

      //     echo "<p id='image_path'>画像パス: <a href='" . htmlspecialchars($_GET['success']) . "' target='_blank'>" . htmlspecialchars($_GET['success']) . "</a></p>";
      //     echo "<input type='hidden' id='image_path' value='". htmlspecialchars($_GET['success'])."'>";

      //     echo "<img src='" . htmlspecialchars($_GET['success']) . "' alt='アップロードされた画像' style='max-width:300px;'><br>";
      // }
      ?>
      <dd>
        <div class="file_input">
          <form action="upload.php" name="image_upload" method="post" enctype="multipart/form-data">
              <!-- <label for="image">画像を選択してください:</label><br> -->
              <input type="file" name="image" id="image" class="upload-limit" accept="image/*" required>⇒ <button type="submit">アップロード</button><button type="button" v-on:click="deleteImage()" style="margin-left: 120px;">画像削除</button>
          </form>
        </div>
      </dd>

      <dt>ヘッダータイトル</dt>
      <dd><input type="text" v-model="contents[0].headerTitle" ></dd>
      <dt>ヘッダーテキスト</dt>
      <dd><textarea v-model="contents[0].headerText" ></textarea></dd>
      <dt>送信ボタンテキスト</dt>
      <dd><input type="text" v-model="contents[0].sendBtnText" ></dd>

      <dd class="detail" @click="toggleVisibility('content1')">詳細設定</dd>
      <dt v-if="contents[0].isVisible.content1">送信ボタンのリンク先指定（※指定なしの場合は完了ページに遷移します）</dt>
      <dd v-if="contents[0].isVisible.content1"><input type="text" id="send_btn_link" v-model="contents[0].sendBtnLink" ></dd>

      <dt>送信時タグコード（※複数の場合は「,」区切り）</dt>
      <dd><input type="text" v-model="contents[0].tagCode" ></dd>
    </dl>
  </section>

<section class="question-container">
    <!-- <div>質問</div> -->
    <template>
      <div>
        <component 
          v-for="(content, i) in contents"
          :is="content.comptype"
          :key="content.id"
          :id="content.id"
          :key2="i"
          :type="content.type"

          :answer="content.answer"
          :question="content.question"
          :microcopy1="content.microcopy"
          :required="content.required"
          :placeholder="content.placeholder"
          :texttype="content.texttype"
          :columntype="content.columntype"

          @numberling="numberLing"
          @deletelist="sendDeletelist"
          @deletecontent="sendDeleteContent"
          @answerlist="sendAnswerlist"
          @answertag="sendAnswerTag"

          @compquestion="sendCompQuestion"
          @compmicrocopy1="sendCompMicrocopy1"
          @comprequired="sendCompRequired"
          @companswer="sendCompAnswer"

          @textplaceholder="sendTextPlaceholder"
          @texttype="sendTextType"

          @columntype="sendColumnType"
        ></component>
      </div>
  </template>

  <div class="select">
    <select name="" id="add-content" class="add-content-btn" v-on:change="addContent" v-model="contentType">
      <option value="">＋質問追加</option>
      <option value="type-radio">Radio</option>
      <option value="type-checkbox">Checkbox</option>
      <option value="type-select">Select</option>
      <option value="type-text">Text</option>
      <option value="type-textarea">Textarea</option>
    </select>
    <!-- <button id="sort_btn" type="button">並べ替え</button> -->
  </div>
  </section>

  <section class="sortable-list" style="display: none;">
    <ul id="sortable-list"></ul>
    <button onclick="saveToLocalStorage()">保存</button>
  </section>


  <section class="complete_page">
  <h2>【完了ページ】</h2>
  <dl>
  <dt>ページタイトル</dt>
  <dd><input type="text" v-model="contents[0].completeTabTitle" ></dd>
  <dt>ヘッダータイトル</dt>
  <dd><input type="text" v-model="contents[0].completeHeaderTitle" ></dd>
  <dt>ヘッダーテキスト</dt>
  <dd><textarea v-model="contents[0].completeHeaderText" ></textarea></dd>
  <dt>閉じるボタンテキスト</dt>
  <dd><input type="text" v-model="contents[0].closeBtnText" ></dd>
  <dd class="detail" @click="toggleVisibility('content2')">詳細設定</dd>
  <dt v-if="contents[0].isVisible.content2">閉じるボタンのリンク先指定（※指定なしの場合はLINEのトーク画面に戻ります）</dt>
  <dd v-if="contents[0].isVisible.content2"><input type="text" v-model="contents[0].closeBtnLink" ></dd>
  </dl>
  </section>

  </div>


  <section class="footer">
  <ul class="data_process_btn">
    <li id="save_btn"><a>保存</a></li><!-- 保存 -->
    <li id="file_creat_btn"></li><!-- 一時ファイル出力 -->
    <li>
      <form name="file_read">
        <label for="file_upload">ファイル読み込み
          <input type="file" name="form_text_file" id="file" onchange="$('#fake_text_box').val($(this).val())">
          <input type="text" id="file_upload" value="ファイル選択" onClick="$('#file').click();">
        </label>
        <input type="text" id="fake_text_box" value="" size="35" readonly disabled onClick="$('#file').click();">
      </form>
    </li>
    <li id="data_reset_btn"><a>リセット</a></li>
  </ul>

    <ul class="liff_process_btn">
      <li>
        <a href="./preview/index.html" target="_blank">プレビュー</a>
      </li>
      <li>
        <a id="download" href="dl.php">LIFFダウンロード</a>
      </li>
    </ul>
  
    <footer>
      <ul>
        <li><a href="./index.php">©️アンケート生成アプリ</a></li>
        <li><a href="./rule.html" target="_blank">利用規約</a></li>
      </ul>
    </footer>
  </section>

  </div>


<script>

//■■■■■ 並べ替え部分 ■■■■■//
const sortBtn = document.getElementById("sort_btn");


// 📌 初期データ（ローカルストレージが空の場合に使用）
const initialData = [];

// 📌 ローカルストレージからデータを取得（なければ初期データを設定）
function loadFromLocalStorage() {
    const storedData = localStorage.getItem("contents");
    return storedData ? JSON.parse(storedData) : JSON.parse(JSON.stringify(initialData)); // deep copy
}

// 📌 配列の内容をHTMLリストに反映
function renderList() {
    const data = loadFromLocalStorage();
    const listElement = document.getElementById("sortable-list");
    listElement.innerHTML = ""; // 一旦リストをクリア

    data.forEach((item, index) => {
        const li = document.createElement("li");

        if (index === 0) {
            li.textContent = '並べ変え'; // 0番目の要素は固定
            li.classList.add("fixed");
        } else {
            li.innerHTML = `
                質問${item.id}（${item.type}）
                <input type="number" class="sort-input" value="${index}" min="1" max="${data.length - 1}" data-index="${index}">
            `;
        }

        listElement.appendChild(li);
    });
}

// 📌 並び替え後のデータを更新
function updateDataOrder() {
    const data = loadFromLocalStorage();
    const fixedItem = data[0]; // 0番目の要素を固定
    const newData = [fixedItem]; // 新しい配列を作成

    // ユーザーが入力した順番を取得
    const sortInputs = document.querySelectorAll(".sort-input");
    let sortedItems = [];

    sortInputs.forEach(input => {
        let index = parseInt(input.dataset.index, 10);
        let newOrder = parseInt(input.value, 10);
        if (newOrder >= 1 && newOrder <= sortInputs.length) {
            sortedItems.push({ newOrder, item: data[index] });
        }
    });

    // 入力順にソート
    sortedItems.sort((a, b) => a.newOrder - b.newOrder);
    
    // 新しい順番でデータを更新
    sortedItems.forEach((entry, index) => {
        entry.item.id = (index + 1).toString(); // id を 1 から振り直し
        newData.push(entry.item);
    });

    // ローカルストレージを更新
    localStorage.setItem("contents", JSON.stringify(newData));
}

// 📌 「保存」ボタンを押したときにデータを保存
function saveToLocalStorage() {
    if (!isValidSequence()) {
        alert("入力された番号が連番になっていません。正しい順番を入力してください。");
        return;
    }

    updateDataOrder(); // データの並び順を更新
    alert("データを保存しました！");
    // renderList(); // 再描画して変更を反映

    // 📌 ページをリロードして変更を確実に反映
    location.reload();
}

// 📌 連番チェック関数
function isValidSequence() {
    const sortInputs = document.querySelectorAll(".sort-input");
    let numbers = [];

    sortInputs.forEach(input => {
        let num = parseInt(input.value, 10);
        if (!isNaN(num)) {
            numbers.push(num);
        }
    });

    // 数字を昇順にソート
    numbers.sort((a, b) => a - b);

    // 連番になっているかチェック
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] !== i + 1) {
            return false; // 連番でない場合は false を返す
        }
    }

    return true; // 連番なら true を返す
}

// 📌 ページ読み込み時にリストを表示
document.addEventListener("DOMContentLoaded", renderList);


//■■■■■ 画像アップロード ■■■■■//
  //容量制限
    const fileLimit = 1024 * 1024 * 1;
    const fileUploads = document.querySelectorAll('.upload-limit');
    fileUploads.forEach(fileUpload => {
    fileUpload.addEventListener('change', () => {
        const files = fileUpload.files;
        for (const file of files) {
          if (file.size > fileLimit) {
              alert('ファイルサイズが1MBを超えています');
              fileUpload.value = "";
              return;
          }
        }
    })
    });

  //■■■■■ 保存（リロード） ■■■■■//
  let saveBtn = document.getElementById('save_btn');
  saveBtn.addEventListener('click', function () {
      window.location.reload();
  });


  //■■■■■ JSONファイル出力 ■■■■■//

  // 保存するJSONファイルの名前
  const fileName = "data.json";

  // データをJSON形式の文字列に変換する。
  let data = JSON.parse(localStorage.getItem('contents'))
  data = JSON.stringify(data);

  // HTMLのリンク要素を生成する。
  const link = document.createElement("a");
  link.innerHTML = "ファイル出力";
  link.setAttribute("download", fileName);

  // リンク先にJSON形式の文字列データを置いておく。
  link.href = "data:text/plain," + encodeURIComponent(data);

  var btn = document.getElementById("file_creat_btn");
  btn.appendChild(link);


  //■■■■■ JSONファイル読み込み ■■■■■//
  var form = document.forms.file_read;

  form.form_text_file.addEventListener('change', function (e) {

    var result = e.target.files[0];

    //FileReaderのインスタンスを作成する
    var reader = new FileReader();

    //読み込んだファイルの中身を取得する
    reader.readAsText(result);

    //ファイルの中身を取得後に処理を行う
    reader.addEventListener('load', function () {
      var readerResult = JSON.parse(reader.result);
      localStorage.setItem('contents', JSON.stringify(readerResult));
      location.reload();
    })
  })

  //■■■■■ ローカルストレージリセット ■■■■■//
  document.getElementById("data_reset_btn").addEventListener("click",function(){
    const v = window.confirm('フォームデータをリセットしますか？');
    if(v === true){
      localStorage.removeItem("contents");
      location.reload();
    }
},false);

//■■■■■ LIFFダウンロード ■■■■■//
const submit = (selector, key)=>{

  // 引数のselectorから要素を取得
  let a = document.querySelector(selector);

  // イベントリスナー
  a.addEventListener('click', () => {

      // 要素のデフォルトイベントキャンセル
      event.preventDefault();

      // 要素のhref取得（送信先PHP）
      let href = a.getAttribute('href');

      // 引数のkeyからSessionStorageのデータを取得
      let value = localStorage.getItem(key);

      // PHPにデータを送信するform要素を生成
      let form = document.createElement('form');
      form.method = 'post';
      form.action = href;

      // form要素に追加するinput要素を生成
      let input = document.createElement('input');
      input.name = key;
      input.value = value;
      input.type = 'hidden';

      // form要素にinput要素を追加
      form.appendChild(input);

      // body要素にform要素を追加
      document.body.appendChild(form);

      // formを送信（submit）
      form.submit();
  });
}
submit('#download', 'contents');

</script>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <!-- <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script> -->
  <script src="js/app.js"></script>
</body>

</html>
