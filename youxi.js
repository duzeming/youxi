// * 游戏
// * 面向对象的方式
// * 属性（描述）
// *  字母表、几个字符、生命值、关卡、分值、速度
// * 方法
// *   开始、产生字符、下落、消失、进入下一关、重新开始
// *


// *1获取字母表
// *2写出调用的方法
// *3字母的个数  （多个）
// *4一个字母获取的方法
// *5写出调用的方法  drop和keys  添加和删除


class Code{
    constructor(){
        // this.char = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
        // 字母表
        this.char = [['Q','img/Q.png'],['W','img/W.png'],['E','img/E.png'],['R','img/R.png'],['T','img/T.png'],['Y','img/Y.png'],['U','img/U.png'],['I','img/I.png'],['O','img/O.png'],['P','img/P.png'],['A','img/A.png'],['S','img/S.png'],['D','img/D.png'],['F','img/F.png'],['G','img/G.png'],['H','img/H.png'],['J','img/J.png'],['K','img/K.png'],['L','img/L.png'],['Z','img/Z.png'],['X','img/X.png'],['C','img/C.png'],['V','img/V.png'],['B','img/B.png'],['N','img/N.png'],['M','img/M.png']];
        this.length = 6;
        // 字母的数量
        this.current = [];
        this.speed = 10;
        this.position = [];
        this.scoreObj = document.querySelector('.box>div:first-child>span');
        this.score=0;
        this.gq = 5;
        this.lifeObj = document.querySelector('.box>div:last-child>span');
        this.life = 10;

    }

    start(){
        this.getChars(this.length);
        this.drop();
        this.keys();
        // 添加方法  方便调用
    }
    getChars(length){
        // 字母的个数
        for(let i=0;i<length;i++){
            this.getChar();

            // this.getChar()  代表单个元素
            // this.getChars()代表多个元素
            // 注意不要写成getChars
        }
        // console.log(length);
    }
    checkExist(char){
        return this.current.some(element => element.innerText == char);
        // 判断数组里面是否有某一个元素内容存在
    };
    checkPosition(pos){
        return this.position.some(element=>Math.abs(element-pos)<120);
    }
    getChar(){
        // 一个字母的获取方法
        let num = Math.floor(Math.random()*this.char.length);
        // console.log(num);
        // 判断是否存在
        do{
            num = Math.floor(Math.random()*this.char.length);
        }while (this.checkExist(this.char[num][0]));

        let divs = document.createElement('div');
        let tops = Math.floor(Math.random()*100);
        let lefts = Math.floor((window.innerWidth - 400)*Math.random()+200);

        do{
            lefts = Math.random()*(window.innerWidth-400)+200;
        }while (this.checkPosition(lefts));


        divs.style.cssText = `
        width:50px;height:50px;color:rgba(0,0,0,0);
        border-radius:50%;text-align:center;
        line-height:50px;font-size:0;
        position:absolute;top:${tops}px;left:${lefts}px;
        background:url(${this.char[num][1]}) center/cover;
        // 注意要写单位px
        `;
        this.current.push(divs);
        this.position.push(lefts);
        divs.innerText = this.char[num][0];
        document.body.appendChild(divs);

    }
    drop(){
        let _this = this;
        // console.log(1);
        _this.t = setInterval(function () {
            for(let i=0;i<_this.current.length;i++){
                let tops = _this.current[i].offsetTop + _this.speed;
                _this.current[i].style.top = tops + 'px';

                if(tops>=500){
                    document.body.removeChild(_this.current[i]);
                    // 在页面中删除
                    _this.position.splice(i,1);
                    _this.current.splice(i,1);
                    // 在数组中删除
                    _this.getChar();
                    // 添加一个

                    _this.lifeObj.innerText = --_this.life;
                    if(_this.life <= 0){
                        let flag = confirm('是否重新开始');
                        if(flag){
                            _this.restart();
                        }else {
                            close();
                        }
                    }
                }
            }
        },100)
    }
    keys(){
        // 保存变量
        let that = this;
        document.onkeydown = function (e) {
            // e.key  e.keyCode 两种方法     转换大写
            let code = String.fromCharCode(e.keyCode);
            // console.log(code);
            for(let i=0;i<that.current.length;i++){
                if(code == that.current[i].innerText){
                    // 从页面中删除
                    document.body.removeChild(that.current[i]);
                    // 调用[i]的时候  记得给上面start中添加方法
                    that.position.splice(i,1);
                        that.current.splice(i,1);
                        // 删除 一个
                        that.getChar();
                        // 添加一个
                    that.scoreObj.innerText = ++that.score;
                    // 先赋值  然后先加后运算所以++在前面
                    if(that.score>=that.gq){
                        that.next();
                    }
                }
            }
        }
    }
    // 重置归0
    // 再产生一组
    next(){
        clearInterval(this.t);
        // 清掉
        this.current.forEach(element=>{
            document.body.removeChild(element);
        });
        // 删除页面视图
        this.current = [];
        // 产生一组
        this.position = [];
        this.length+=1;
        // 进入下一关，分值同步用++
        this.gq += 10;
        // 关卡分值的个数
        this.getChars(this.length);
        this.drop();
    }
    restart(){

        clearInterval(this.t);
        // 清掉
        this.current.forEach(element=>{
            document.body.removeChild(element);
        });
        this.current = [];
        this.score = 0;

        this.position = [];

        this.scoreObj.innerText = this.score;
        this.life=10;
        this.lifeObj .innerText = this.life;
        this.gq = 5;
        this.length = 5;
        this.getChars(this.length);
        this.drop();

    }

}

