
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
			imgTask(heroImg, './img/hero.png'),
			imgTask(allSpriteImg, './img/all.jpg'),
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
			console.log(this)
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
				this.bloodBox.style.left=`${this.rect.x}px`;
				this.bloodBox.style.top=`${this.rect.y+60}px`;
				this.bloodBox.innerHTML=`血量:${this.blood}`;
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
		var move=function(monster){
			let that=this;
			document.onkeyup=(event)=>{
				var e=event||window.event;
				that.clear()
				
				if(monster.blood!==0){
					var distanceX=that.rect.x-monster.rect.x;
					var distanceY=that.rect.y-monster.rect.y;
					var absdistanceX=Math.abs(that.rect.x-monster.rect.x);
					var absdistanceY=Math.abs(that.rect.y-monster.rect.y);
					var borderflag=absdistanceX <= 40 && absdistanceY <= 40;//英
				}else{
					var borderflag=false//英
					var distanceX=0;
					var distanceY=0
				}
				//英雄与怪物是否接触
				// 左上右下37 38 39 40
				let moveaction={
					39:function(){
						if(that.rect.x>=460||(borderflag && distanceX < 40 && absdistanceY<40)){
							if(that.rect.x>=460){
								return
							}
							that.attaccked(monster)
						}else{
							that.rect.x+=10
						}
						
					},
					37:function(){
						if(that.rect.x<=0||(borderflag && distanceX >-40 && absdistanceY<40)){
							if(that.rect.x<=0){
								return
							}
							that.attaccked(monster)
						}else{
							that.rect.x-=10
						}
						
					},
					38:function(){
						if(that.rect.y<=0||(borderflag && distanceY >-40 && absdistanceX<40)){
							if(that.rect.y<=0){
								return
							}
							that.attaccked(monster)
						}else{
							that.rect.y-=10
						}
						
					},
					40:function(){
						if(that.rect.y>=260||(borderflag && distanceY < 40 && absdistanceX<40)){
							if(that.rect.y>=260){
								return
							}
							that.attaccked(monster)
						}else{
							that.rect.y+=10
						}
						
					},
				}
				moveaction[e.keyCode]()
				that.draw();
				
			}
		}
		var attaccked=function(monster){
			this.blood-=50;
			monster.blood-=100;
			if(monster.blood==0){
				monster.clear();
				document.body.removeChild(monster.bloodBox);
				monster=null;
				return
			}
			if(this.blood<=0){
				alert('game over')
			}
			this.draw();
			monster.draw()
	
		}
		// 英雄类
		function Hero(){
			this.img = heroImg;
			this.context = context;
			this.blood=5000;
			this.imgPos = {
				x: 0,
				y: 0,
				width: 32,
				height: 32
			}
			this.rect = {
				x: 0,
				y: 0,
				width: 40,
				height: 40
			};
		
		}
		Hero.prototype={
			draw:draw,
			move:move,
			clear:clear,
			createBloodBox:createBloodBox,
			attaccked:attaccked
		};
		function Monster(){
			this.img = allSpriteImg;
			this.context = context;
			this.blood=200,
			this.imgPos = {
				x: 858,
				y: 529,
				width: 32,
				height: 32
			}
			this.rect = {
				x: 200,
				y:200,
				width: 40,
				height: 40
			}
		}
		Monster.prototype={
			draw:draw,
			clear:clear,
			createBloodBox:createBloodBox
		};
		function blankMonster(){
			Monster.call(this)
		}
		function createBloodBox(){
			var bloodBox=document.createElement('div');
			bloodBox.style.position='absolute';
			bloodBox.style.left=`${this.rect.x}px`;
			bloodBox.style.top=`${this.rect.y+60}px`;
			bloodBox.innerHTML=`血量:${this.blood}`;
			bloodBox.style.fontSize="12px";
			bloodBox.style.color='red';
			document.body.appendChild(bloodBox);
			return bloodBox;
		}
		blankMonster.prototype= Object.create(Monster.prototype);
		var blankMonster1 =new  blankMonster();
		var hero= new Hero();
		hero.bloodBox=hero.createBloodBox()
		hero.draw();
		blankMonster1.bloodBox=blankMonster1.createBloodBox();
		blankMonster1.draw();
		hero.move(blankMonster1);
	
	}
	var resourceManager = prepare();
	resourceManager.getResource(function (context, heroImg, allSpriteImg) {
		drawHero(context, heroImg, allSpriteImg);
	});
	
})();
