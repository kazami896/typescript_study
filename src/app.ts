// メインのファイル

// サンプル1
/*SimpleCanvasGameLibrary.prepare().then((game) => {
	// キャンバスをクリア
	game.clear();

	// 塗りの色の変更
	game.draw.fillStyle = 'blue';

	// 長方形を塗りつぶしで描画
	game.draw.fillRect(0, 0, game.width, game.height);

	// 塗りの色の変更
	game.draw.fillStyle = 'gray';

	// 長方形を塗りつぶしで描画
	game.draw.fillRect(10, 10, game.width - 20, game.height - 20);

	// クリックイベントを登録
	game.onClick = (event) => {
		// クリック座標（スクリーン座標変換済み）を取得
		console.log(`${event.x} x ${event.y}`);
		// console.log(event);

		// 背景の描き直し
		game.clear();
		game.draw.fillStyle = 'blue';
		game.draw.fillRect(0, 0, game.width, game.height);
		game.draw.fillStyle = 'gray';
		game.draw.fillRect(10, 10, game.width - 20, game.height - 20);

		// クリック地点に赤い丸を描く
		game.draw.fillStyle = '#ff0000'; // redでも良い
		game.draw.beginPath();
		game.draw.arc(event.x, event.y, 10, 0, Math.PI * 2);
		game.draw.fill();
		game.draw.closePath();
	};
});*/

// サンプル2
SimpleCanvasGameLibrary.prepare().then(async (game) => {
	// 円のデータ
	const position = { x: 320, y: 240 };
	// フレーム数
	let frame = 0;
	let anime_frame = 0;

	// charaのpng画像
	const image_char = await game.loadImage('./char01.PNG');

	// ブラウザの描画に合わせてだいたい60FPSくらいでいい感じに呼び出される処理の追加
	game.onUpdate = (game) => {
		// フレーム数をカウントアップ
		++frame;
		++anime_frame;

		// キャンバスをクリア
		game.clear();

		// 塗りの色の変更
		game.draw.fillStyle = 'blue';

		// 長方形を塗りつぶしで描画
		game.draw.fillRect(0, 0, game.width, game.height);

		// 塗りの色の変更
		game.draw.fillStyle = 'gray';

		// 長方形を塗りつぶしで描画
		game.draw.fillRect(10, 10, game.width - 20, game.height - 20);

		/*
		// 画像を描画
		// (0, 0)から100x100の画像を切り出し(101, 102)の位置に100x50で描画
		switch(anime_frame) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
				game.draw.drawImage(image_char, 0, 0, 100, 100, 102, 102, 100, 100);
				break;
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
				game.draw.drawImage(image_char, 100, 0,100,100,102,102,100,100);
				break;
			case 15:
			case 16:
			case 17:
			case 18:
			case 19:
			case 20:
			case 21:
				game.draw.drawImage(image_char, 200, 0, 100, 100, 102, 102, 100, 100);
				anime_frame = 0;
				break;
		}
		*/
		// 座標の位置に円を描く
		game.draw.fillStyle = '#ff0000'; // redでも良い
		game.draw.beginPath();
		game.draw.arc(position.x, position.y, 10, 0, Math.PI * 2);
		game.draw.fill();
		game.draw.closePath();

		// 現在のフレーム数を描画する
		game.draw.fillStyle = 'white';
		// 文字列を上を基準に描画する
		game.draw.textBaseline = 'top';
		// 上を基準に0, 0の位置から文字列を描画する
		game.draw.fillText(`Frame: ${frame}`, 0, 0);
	};

	// クリックイベントを登録
	game.onClick = (event) => {
		// クリック座標（スクリーン座標変換済み）を取得
		position.x = event.x;
		position.y = event.y;
	};

	// 停止ボタンをクリックしたら更新を止める
	document.getElementById('stop')?.addEventListener('click', () => {
		// 更新停止
		game.onUpdate = null;
	});
});
