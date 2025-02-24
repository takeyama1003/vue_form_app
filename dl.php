<!-- ■■■■■ LIFFダウンロード ■■■■■ -->
<?php
$json = json_decode($_POST['contents'], true);
// var_dump($json);
// echo '1';
// exit;
// echo '2';

if(isset($_POST['contents'])) {

  // ■■■■■ htmlファイル生成 ■■■■■//

  // 【index.html】出力のバッファリングを有効にする
  ob_start();
  ?>
<!-- ★ここから★ -->
<!DOCTYPE html>
<html lang="jp">
<head>
  <meta charset="UTF-8">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= $json[0]['tabTitle'] ?></title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jQuery-Validation-Engine/2.6.4/validationEngine.jquery.min.css">
	<link rel="stylesheet" href="css/loading.css">
	<link rel="stylesheet" href="css/style.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="js/jquery.validationEngine.min.js"></script>
	<script src="js/jquery.validationEngine-ja.js"></script>
  <script>
		$(document).ready(function () {
			$("#form-name").validationEngine();
		});
		//loader
		$(window).on('load', function () {
			$("#loader").addClass('loaded');
		});
		$(function () {
			setTimeout(function () {
				$("#loader").fadeOut();
			}, 5000);
		});

	</script>
</head>
<body>

<div id="loader">
		<div class="line-scale">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>

  <header>
		<h1><?= $json[0]['tabTitle'] ?></h1>
	</header>

  <div class="wrap">

  <section class="title">
      <?php
      //画像差し込み
      if (isset($json[0]['imagePath']) && !empty($json[0]['imagePath'])) {
          echo '<div id="header_image"><img src="' . htmlspecialchars($json[0]['imagePath'], ENT_QUOTES, 'UTF-8') . '" alt="ヘッダー画像"></div>';
      }
      ?>
			<h2><?= $json[0]['headerTitle'] ?></h2>
			<p><?= $json[0]['headerText'] ?></p>
		</section>

		<!-- 削除禁止 -->
		<form id="form-name" method="POST" action="###formurl###" novalidate>
			<!-- 削除禁止 -->
			<!-- 削除禁止 --><input type="hidden" id="useridfield" name="luid"><!-- 削除禁止 -->
			<!-- 削除禁止 --><input type="hidden" id="fid" name="fid" value="###fid###"><!-- 削除禁止 -->
			<!-- 削除禁止 --><input type="hidden" id="liffid" name="liffid" value="###liffid###"><!-- 削除禁止 -->
			<!-- 削除禁止 --><input type="hidden" id="bot_id" name="bot_id" value="###botid###"><!-- 削除禁止 -->
			<!-- 削除禁止 --><input type="hidden" id="add_tags" name="add_tags" value="<?= $json[0]['tagCode'] ?>"><!-- 削除禁止 -->
			<!-- 削除禁止 --><input type="hidden" id="del_tags" name="del_tags"><!-- 削除禁止 -->

      <?php
      foreach ( $json as $key => $content ) {
        if( $key == 0){
          continue;
        }

      echo '<section  class="q">';

      echo '<input type="hidden" name="col_'. ( $key ) .'_title" value="'.$content['question'].'">';

      echo '<div class="txt">';
      echo '<h3 class="pre-line">'.$content['question'];
      if($content['required']){
        echo '<span>*</span>';
      }
      echo '</h3>';

      echo '<ul class="note">';
      echo '<li>'.$content['microcopy'].'</li>';
      echo '</ul></div>';

      //radio
      if($content['type'] == 'type-radio'){
        if($content['columntype'] == 'col1'){
          echo '<ul class="col1">';
        }else if($content['columntype'] == 'col2'){
          echo '<ul class="col2">';
        }else if($content['columntype'] == 'col3'){
          echo '<ul class="col3">';
        }
        foreach ( $content['answer'] as $answer ) {
          echo '<li><label>';
          echo '<input type="radio" name="col_'.( $key ).'"';
          if($content['required']){
            echo 'class="validate[required]"';
          }
          echo 'data-tag="'.$answer['tag'].'"';
          echo 'value="'.$answer['label'].'" data-prompt-position="topLeft">';
          echo '<span>'.$answer['label'].'</span>';
          echo '</label></li>';
          }
        echo '</ul>';
      }

      //checkbox
      if($content['type'] == 'type-checkbox'){
        if($content['columntype'] == 'col1'){
          echo '<ul class="col1">';
        }else if($content['columntype'] == 'col2'){
          echo '<ul class="col2">';
        }else if($content['columntype'] == 'col3'){
          echo '<ul class="col3">';
        }
        foreach ( $content['answer'] as $answer ) {
          echo '<li><label>';
          echo '<input type="checkbox" name="col_'.( $key ).'[]"';
          if($content['required']){
            echo 'class="validate[required]"';
          }
          echo 'data-tag="'.$answer['tag'].'"';
          echo 'value="'.$answer['label'].'" data-prompt-position="topLeft">';
          echo '<span>'.$answer['label'].'</span>';
          echo '</label></li>';
          }
        echo '</ul>';
      }

      //select
      if($content['type'] == 'type-select'){
        echo '<div class="select">';
        echo '<select name="col_'.( $key ).'"';
          if($content['required']){
            echo 'class="validate[required]"';
          }
        echo 'data-prompt-position="topLeft">';
        echo '<option value="">選択して下さい</option>';
        foreach ( $content['answer'] as $answer ) {
          echo '<option data-tag="'.$answer['tag'].'" value="'.$answer['label'].'">'.$answer['label'].'</option>';
        }
        echo '</select>';
        echo '</div>';
      }

      //text
      if($content['type'] == 'type-text'){

        if($content['texttype'] == 'text'){
          echo '<input type="text" name="col_'.( $key ).'"';
          if($content['required']){
            echo 'class="validate[required]"';
          }
          echo 'placeholder="'.$content['placeholder'].'" data-prompt-position="topLeft">';
        }
        else if($content['texttype'] == 'name'){
          echo '<input type="text" name="col_'.( $key ).'_name"';
          if($content['required']){
            echo 'class="validate[required]"';
          }
          echo 'placeholder="'.$content['placeholder'].'" data-prompt-position="topLeft">';
        }
        else if($content['texttype'] == 'email'){
          echo '<input type="'.$content['texttype'].'" name="col_'.( $key ).'_'.$content['texttype'].'"';
          if($content['required']){
            echo 'class="validate[required,custom[email]]"';
          }else{
            echo 'class="validate[custom[email]]"';
          }
          echo 'placeholder="'.$content['placeholder'].'" data-prompt-position="topLeft">';
        }
        else if($content['texttype'] == 'tel'){
          echo '<input type="'.$content['texttype'].'" name="col_'.( $key ).'_'.$content['texttype'].'"';
          if($content['required']){
            echo 'class="validate[required,custom[number],minSize[10],maxSize[11]]"';
          }else{
            echo 'class="validate[custom[number],minSize[10],maxSize[11]]"';
          }
          echo 'placeholder="'.$content['placeholder'].'" data-prompt-position="topLeft">';
        }
      }

      //textarea
      if($content['type'] == 'type-textarea'){
        echo '<textarea type="text" name="col_'.( $key ).'"';
        if($content['required']){
          echo 'class="validate[required]"';
        }
        echo 'placeholder="'.$content['placeholder'].'" data-prompt-position="topLeft">';
        echo "</textarea>";
      }

      echo "</section>";
      }
      ?>

      <ul class="btn entry">
				<li>
					<button type="submit" class="btn-submit"><?= $json[0]['sendBtnText'] ?></button>
				</li>
			</ul>
			<div class="loading" style="border: none;"><img src="./images/loading.gif"></div>

    </form>
  </div><!-- ./wrap -->

  <footer><img src="images/logo.png" alt="ECAI"></footer>

    <!-- 削除禁止 -->
	<script charset="utf-8" src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
	<script src="liff-starter.js"></script>
	<script>
		window.onload = function (e) {
			liff.init({
					liffId: "###liffid###"
				}).then(() => {
					liff.getProfile().then(function (profile) {
						document.getElementById('useridfield').value = profile.userId;
					}).catch(function (error) {});
				})
				.catch((err) => {});
		};
	</script>
	<!-- 削除禁止 -->

  <script>
		//送信時処理
		$(function () {
			$('.btn-submit').on('click', function () {
				//連打防止ローディング
				if ($("#form-name").validationEngine('validate')) {
					$('.btn').hide();
					$('.loading').show();

					// 全ての質問セクションを取得
					const sections = document.querySelectorAll("section.q");
					const selectedTags = []; // 選択された data-tag を格納するオブジェクト

          const addTags = document.querySelector("#add_tags");
          selectedTags.push(addTags.value);

					// 各セクションをループ
					sections.forEach((section, index) => {
						const inputs = section.querySelectorAll("input, select"); // 入力要素を取得

						inputs.forEach(input => {
              // ラジオボタン
              if (input.type === "radio" && input.checked) {
                if(input.dataset.tag){
                  selectedTags.push(input.dataset.tag);
                }
              }
              // チェックボックス
              if (input.type === "checkbox" && input.checked) {
                if(input.dataset.tag){
                  selectedTags.push(input.dataset.tag);
                }
              }
              // セレクトボックス
              if (input.tagName === "SELECT") {
                const selectedOption = input.options[input.selectedIndex];
                if (selectedOption && selectedOption.dataset.tag) {
                selectedTags.push(selectedOption.dataset.tag);
                }
              }
						});

            addTags.value = selectedTags;

					});
          
          // return false;
				}
			});
		});


  //ヘッダーの余白調整
  $(function(){
      if($('#header_image').length){
        $('header').css('marginBottom','30px');
      }
  });
	</script>

</body>
</html>
  <!-- ★ここがバッファされます★ -->

  <?php
  // 同階層の index.html にphp実行結果を出力
  file_put_contents( 'index.html', ob_get_contents() );

  // 出力用バッファをクリア(消去)し、出力のバッファリングをオフにする
  ob_end_clean();

  // exit;

  // 【complete.html】出力のバッファリングを有効にする
  ob_start();
  ?>
<!-- ★ここから★ -->
<!DOCTYPE html>
<html lang="jp">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= $json[0]['completeTabTitle'] ?></title>
	<link rel="stylesheet" href="css/style.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

  <?php
  if($json[0]['sendBtnLink']){
    echo '<script>location.href = "'.$json[0]['sendBtnLink'].'";</script>';
  }
  ?>
</head>

<body <?php
  if($json[0]['sendBtnLink']){
    echo 'style="display: none;"';
  }
  ?>>
  <header>
		<h1><?= $json[0]['completeTabTitle'] ?></h1>
	</header>


  <div class="wrap">

    <section class="complete">
			<h3><?= $json[0]['completeHeaderTitle'] ?></h3>
			<p class="pre-line"><?= $json[0]['completeHeaderText'] ?></p>
			<div class="btn">
      <?php
        if($json[0]['closeBtnLink']){
          echo '<a href="'.$json[0]['closeBtnLink'].'" class="blue">'.$json[0]['closeBtnText'].'</a>';
        }
        else{
          echo '<a class="blue" onclick="liffclose();">'.$json[0]['closeBtnText'].'</a>';
        }
      ?>
			</div>
		</section>

  </div><!-- ./wrap -->

  <footer><img src="images/logo.png" alt="ECAI"></footer>

	<!-- 削除禁止 -->
	<script charset="utf-8" src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
	<script src="liff-starter.js"></script>
	<script>
		window.onload = function (e) {
			liff.init({ liffId: "###liffid###" }).then(() => {
				liff.getProfile().then(function (profile) {
					document.getElementById('useridfield').value = profile.userId;
					//alert(profile.userId);
				}).catch(function (error) {
					//window.alert('Error getting profile: ' + error);
				});
			})
				.catch((err) => {
				});
		};
	</script>
	<script>
		function liffclose() {
			liff.closeWindow();
		}
	</script>
	<!-- 削除禁止 -->

</body>
</html>
  <!-- ★ここがバッファされます★ -->

  <?php
  // 同階層の complete.html にphp実行結果を出力
  file_put_contents( 'complete.html', ob_get_contents() );

  // 出力用バッファをクリア(消去)し、出力のバッファリングをオフにする
  ob_end_clean();



  // ■■■■■ zipファイル生成 ■■■■■//

  // 出来上がるzipのファイル名
  $zip_file_name = "liff";

  $zip = new ZipArchive();
  $zip->open($zip_file_name, ZipArchive::CREATE|ZipArchive::OVERWRITE);

  // zipにしたいファイルを追加
  $zip->addFile('index.html');
  $zip->addFile('complete.html');
  $zip->addFile('images/logo.png');
  $zip->addFile('images/icon.png');
  $zip->addFile('images/dummy_image.png');
  $zip->addFile('images/loading.gif');
  $zip->addFile('css/style.css');
  $zip->addFile('js/jquery.validationEngine.min.js');
  $zip->addFile('js/jquery.validationEngine-ja.js');

  // zipファイル作成
  $zip->close();

  //■自動ダウンロード
  mb_http_output( "pass" );
  header('Content-Type: application/zip; name="'.$zip_file_name.'"');
  header('Content-Disposition: attachment; filename="liff.zip"');
  header('Content-Length: '.filesize($zip_file_name));
  ob_end_clean();
  // echo file_get_contents($zip_file_name);
  readfile($zip_file_name);

  // zipを削除
  unlink($zip_file_name);
 
}
?>
