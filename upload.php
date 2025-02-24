<?php
// アップロードディレクトリ
$uploadDir = __DIR__ . '/uploads/';
$webPath = 'uploads/';

// アップロードディレクトリが存在しない場合は作成
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// ファイルが送信されているか確認
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $file = $_FILES['image'];

    // エラーチェック
    if ($file['error'] !== UPLOAD_ERR_OK) {
        header('Location: index.php?error=アップロード中にエラーが発生しました');
        exit();
    }

    // ファイルの種類を確認 (画像のみ許可)
    $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!in_array($file['type'], $allowedMimeTypes)) {
        header('Location: index.php?error=許可されていないファイル形式です');
        exit();
    }

    // ユニークなファイル名を生成
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION); // 拡張子を取得
    $uniqueName = uniqid('img_', true) . '.' . $ext;

    // ファイルの保存先パス
    $filePath = $uploadDir . $uniqueName;
    $webFilePath = $webPath . $uniqueName;

    // ファイルを移動
    if (move_uploaded_file($file['tmp_name'], $filePath)) {
        // 成功時のリダイレクト
        header('Location: index.php?success=' . urlencode($webFilePath));
    } else {
        header('Location: index.php?error=ファイルの保存に失敗しました');
    }
    exit();
} else {
    header('Location: index.php?error=画像が選択されていません');
    exit();
}
