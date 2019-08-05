
(function () {
	function prepare() {

		const imgTask = (img, src) => {
			return new Promise(function (resolve, reject) {
				img.onload = resolve;
				img.onerror = reject;
				img.src = src;
			});
		};

		const context = document.getElementById('content').getContext('2d');
		const heroImg = new Image();
		const allSpriteImg = new Image();

		const allresourceTask = Promise.all([
			imgTask(heroImg, './hero.png'),
			imgTask(allSpriteImg, './all.jpg'),
		]);

		return {
			/**
			 * @param {Function} [callback] - 当准备好了之后要调用的回掉函数
			 */
			getResource(callback) {
				allresourceTask.then(function () {
					callback && callback(context, heroImg, allSpriteImg);
				});
			}
		};
	}
	function drawHero(context, heroImg, allSpriteImg) {

		var draw = function () {
			this.context
				.drawImage(
					this.img,
					this.imgPos.x,
					this.imgPos.y,
					this.imgPos.width,
					this.imgPos.height,
					this.rect.x,
					this.rect.y,
					this.rect.width,
					this.rect.height
				);
		}
		// 	清除图像
		var clear = function (){
			
			this.context
					.clearRect(
						this.rect.x,
						this.rect.y,
						this.rect.width,
						this.rect.height
					)
		}
		//英雄移动
		var move=function(){
			let that=this;
			document.onkeyup=(event)=>{
				var e=event||window.event;
				that.clear()
				let distanceX=that.rect.x-monster.rect.x;
				let distanceY=that.rect.y-monster.rect.y;
				let absdistanceX=Math.abs(that.rect.x-monster.rect.x);
				let absdistanceY=Math.abs(that.rect.y-monster.rect.y);
				let borderflag=absdistanceX <= 40 && absdistanceY <= 40;//英雄与怪物是否接触
				// 左上右下37 38 39 40
				let moveaction={
					39:function(){
						if(that.rect.x>=460||(borderflag && distanceX < 40 && absdistanceY<40)){
							return
						}else{
							that.rect.x+=10
						}
						
					},
					37:function(){
						if(that.rect.x<=0||(borderflag && distanceX >-40 && absdistanceY<40)){
							return
						}else{
							that.rect.x-=10
						}
						
					},
					38:function(){
						if(that.rect.y<=0||(borderflag && distanceY >-40 && absdistanceX<40)){
							return
						}else{
							that.rect.y-=10
						}
						
					},
					40:function(){
						if(that.rect.y>=260||(borderflag && distanceY < 40 && absdistanceX<40)){
							return
						}else{
							that.rect.y+=10
						}
						
					},
				}
				moveaction[e.keyCode]()
				console.log(that.rect);
				that.context
				.drawImage(
					that.img,
					that.imgPos.x,
					that.imgPos.y,
					that.imgPos.width,
					that.imgPos.height,
					that.rect.x,
					that.rect.y,
					that.rect.width,
					that.rect.height
				)
			}
		}

		var hero = {
			img: heroImg,
			context: context,
			imgPos: {
				x: 0,
				y: 0,
				width: 32,
				height: 32
			},

			rect: {
				x: 0,
				y: 0,
				width: 40,
				height: 40
			},

			draw: draw,
			move: move,
			clear:clear
		};

		var monster = {
			img: allSpriteImg,
			context: context,
			imgPos: {
				x: 858,
				y: 529,
				width: 32,
				height: 32
			},

			rect: {
				x: 100,
				y: 100,
				width: 40,
				height: 40
			},

			draw: draw,
			move: move,
			clear:clear
		};

		hero.draw();
		monster.draw();
		hero.move()
	}

	var resourceManager = prepare();

	resourceManager.getResource(function (context, heroImg, allSpriteImg) {
		drawHero(context, heroImg, allSpriteImg);
	});
	

})();