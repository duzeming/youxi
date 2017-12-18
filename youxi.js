// * 游戏
// * 面向对象的方式
// * 属性（描述）
// *  字母表、几个字符、生命值、关卡、分值、速度
// * 方法
// *   开始、产生字符、下落、消失、进入下一关、重新开始
// *

class Code{
    constructor(){
        this.char = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
        // 字母表
        this.length = 5;
        // 字母的数量
        this.current = [];
        this.speed = 10;
    }

    start(){
        this.getChars(this.length);
        this.drop();
    }

    getChars(length){
        // 字母的个数
        for(let i=0;i<length;i++){
            this.getChar();
            // 注意不要写成getChars
        }
        console.log(length);
    }
    getChar(){
        // 一个字母的获取方法
        let num = Math.floor(Math.random()*this.char.length);
        console.log(num);
        let divs = document.createElement('div');
        let tops = Math.floor(Math.random()*100);
        let lefts = Math.floor((window.innerWidth - 400)*Math.random()+200);
        divs.style.cssText = `
        width:50px;height:50px;background:#ccc;
        border-radius:50%;text-align:center;
        line-height:50px;font-size:20px;
        position:absolute;top:${tops}px;left:${lefts}px;
        // 注意要写单位px
        `;
        this.current.push(divs);
        divs.innerText = this.char[num];
        document.body.appendChild(divs);
    }

    drop(){
        let _this = this;
        // console.log(1);
        setInterval(function () {
            for(let i=0;i<_this.current.length;i++){
                let tops = _this.current[i].offsetTop + _this.speed;
                _this.current[i].style.top = tops + 'px';

                if(tops>=500){
                    document.body.removeChild(_this.current[i]);
                    _this.current.splice(i,1);
                    _this.getChar();
                }

            }
        },100)
    }
}

