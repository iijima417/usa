'use strict'

/**
 * タイルに関してのクラス
 */
class Tile extends Sprite {

	/**
	 * 引数
	 * img : 画像ファイルまでのパス
	 * size : タイルの大きさ
	 */
	constructor( img, size ) {
		//親クラスのコンストラクタを呼び出す
		super( img, size, size );
		//引数sizeが指定されていない場合、this.sizeに32を代入
		this.size = size || 32;
		//マップ座標に0を代入。（マップ座標は、タイルマップの左上から何番目のタイルの位置にあるのか、という意味でここでは使っています）
		this.mapX = this.mapY = 0;
        //タイルマップと同期して動くかどうか
		this.isSynchronize = true;
	} //constructor() 終了

}
