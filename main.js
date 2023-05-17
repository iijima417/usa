'use strict'

//ブラウザがページを完全に読みこむまで待つ
addEventListener('load', () => {

    //変数gameに、あなたはゲームですよ、と教える
    const game = new Game();

    //マップの作成
    const map = [
        [11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
        [11, 10, 10, 10, 10, 10, 10, 10, 10, 11],
        [11, 4, 4, 4, 4, 4, 4, 4, 4, 11],
        [11, 4, 4, 4, 4, 11, 11, 11, 4, 11],
        [11, 4, 11, 11, 11, 11, 10, 10, 4, 11],
        [11, 4, 11, 10, 10, 11, 4, 4, 4, 11],
        [11, 4, 11, 4, 4, 11, 11, 11, 4, 11],
        [11, 4, 9, 4, 4, 9, 10, 10, 4, 11],
        [11, 4, 4, 4, 4, 4, 4, 4, 4, 11],
        [11, 11, 11, 11, 11, 11, 11, 11, 11, 11]
    ];
    //タイルのサイズ
    const TILE_SIZE = 32;
    //歩く速さ
    const WALKING_SPEED = 4;

    //変数sceneに、あなたはシーンですよ、と教える
    const scene = new Scene();

    //変数tilemapに、あなたはタイルマップですよ、と教える
    const tilemap = new Tilemap('tile.png');
    //tilemap.dataに、どんなマップなのか教える
    tilemap.data = map;
    //マップ全体の位置をずらす
    tilemap.x = TILE_SIZE * 4 - TILE_SIZE / 2;
    tilemap.y = TILE_SIZE * 3 - TILE_SIZE / 2;
    //移動できないタイルを指定する
	tilemap.obstacles = [0, 3, 6, 7, 8, 9, 10, 11];
    //マップを登録する
    scene.add(tilemap);

    // //変数startに、あなたはスタートのタイルですよ、と教える
	// const start = new Tile( 'img/start.png' );
	// //マップ左上からの座標を指定する
	// start.x = TILE_SIZE;
	// start.y = TILE_SIZE*2;
	// //スタートのタイルを、tilemapに追加して、とお願いする
	// tilemap.add( start );

	// //変数goalに、あなたはゴールのタイルですよ、と教える
	// const goal = new Tile( 'img/goal.png' );
	// //マップ左上からの座標を指定する
	// goal.x = TILE_SIZE*8;
	// goal.y = TILE_SIZE*8;
	// //ゴールのタイルを、tilemapに追加して、とお願いする
	// tilemap.add( goal );

    //変数usaに、あなたは山田先生のスプライト画像ですよ、と教える
    const usa = new CharacterTile('usa.PNG');
    //山田先生を画面の中央に配置
    usa.x = usa.y = TILE_SIZE * 5 - TILE_SIZE / 2;
    //タイルマップの動きと同期させない
	usa.isSynchronize = false;
    //tilemapに、山田先生のタイルを追加して、とお願いする
    tilemap.add(usa);

    //キャラクターのアニメーションのための変数
	let toggleForAnimation = 0;

    //ループから常に呼び出される
    scene.onenterframe = () => {
        //タイルマップの位置がタイルのサイズで割り切れるとき
        if ((tilemap.x - TILE_SIZE / 2) % TILE_SIZE === 0 && (tilemap.y - TILE_SIZE / 2) % TILE_SIZE === 0) {
            //タイルマップの移動速度に0を代入する
            tilemap.vx = tilemap.vy = 0;
            //山田先生の画像を切り替える
			usa.animation = 1;
			//方向キーが押されているときは、タイルマップの移動速度と、山田先生の向きに、それぞれの値を代入する
			if ( game.input.left ) {
				tilemap.vx = WALKING_SPEED;
				usa.direction = 1;
                
			}
			else if ( game.input.right ) {
				tilemap.vx = -1 * WALKING_SPEED;
				usa.direction = 2;
			}
			else if ( game.input.up ) {
				tilemap.vy = WALKING_SPEED;
				usa.direction = 3;
			}
			else if ( game.input.down ) {
				tilemap.vy = -1 * WALKING_SPEED;
				usa.direction = 0;
			}
            else if(game.input.space){
                tilemap.vy = 417*WALKING_SPEED;
                usa.direction =0;
            }

            //移動後のマップ座標を求める
			const usaCoordinateAfterMoveX = usa.mapX - tilemap.vx/WALKING_SPEED;
			const usaCoordinateAfterMoveY = usa.mapY - tilemap.vy/WALKING_SPEED;
			//もし移動後のマップ座標に障害物があるならば、移動量に0を代入する
			if ( tilemap.hasObstacle( usaCoordinateAfterMoveX, usaCoordinateAfterMoveY ) ) tilemap.vx = tilemap.vy = 0;
            //コンソールにマップ座標を表示（削除）
			// console.log( `${usa.mapX} ${usa.mapY}` );
        }
        //タイルマップのXとY座標両方がタイルのサイズで割り切れるとき以外で、タイルの半分のサイズで割り切れるとき
		else if ( ( tilemap.x + TILE_SIZE/2 ) % ( TILE_SIZE/2 ) === 0 && ( tilemap.y + TILE_SIZE/2 ) % ( TILE_SIZE/2 ) === 0 ) {
			//0と1を交互に取得できる
			toggleForAnimation ^= 1;
			//toggleForAnimationの数値によって、山田先生の画像を切り替える
			if ( toggleForAnimation === 0 ) usa.animation = 2;
			else usa.animation = 0;
		}
    } //scene.onenterframe 終了

    // //常に呼び出される
    // yamada.onenterframe = () => {
    // 	//キーが押されたとき、山田先生が移動する
    // 	if ( game.input.left ) yamada.x -= WALKING_SPEED;
    // 	if ( game.input.right ) yamada.x += WALKING_SPEED;
    // 	if ( game.input.up ) yamada.y -= WALKING_SPEED;
    // 	if ( game.input.down ) yamada.y += WALKING_SPEED;
    // } //yamada.onenterframe 終了
    //gameに、山田先生のスプライト画像を表示して、とお願いする
    //game.add( yamada );

    //gameに、シーンを追加して、とお願いする
    game.add(scene);

    //gameに、ゲームをスタートして、とお願いする
    game.start();

});
