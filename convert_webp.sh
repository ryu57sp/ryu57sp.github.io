#!/bin/bash

# デスクトップの絶対パス取得
DESKTOP="$HOME/Desktop"

# 入力・出力ディレクトリ
INPUT_DIR="$DESKTOP/jpeg"
OUTPUT_DIR="$DESKTOP/webp"

# 出力フォルダがなければ作る
mkdir -p "$OUTPUT_DIR"

# 拡張子 .jpg / .jpeg のファイルをループ処理
for img in "$INPUT_DIR"/*.{jpg,jpeg,JPG,JPEG}; do
  # ファイルが存在するか確認（拡張子にマッチしないと文字列がそのまま入ることがある）
  [ -e "$img" ] || continue

  # ファイル名だけ取り出し、拡張子を .webp に置換
  filename=$(basename "$img")
  output_name="${filename%.*}.webp"

  # 変換処理
  echo "Converting $img → $OUTPUT_DIR/$output_name"
  cwebp -q 75 "$img" -o "$OUTPUT_DIR/$output_name"
done

echo "✅ 変換完了！"