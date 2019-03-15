var obj = {
    a: 1,
    getA: function(){
        console.log( this === obj );//输出:ture
        console.log( this.a );//输出1
    }
};
obj.getA();//作为对象的方法调用，this指向该对象


window.name = 'globalName'
var getName = function(){
    return this.name;
}
console.log(getName());//作为普通函数调用

window.id='window';
document.getElementById('div1').onclick = function(){
    alert(this.id);             //输出div1
    var callback = function(){
        alert(this.id);         //输出'window'
    }
    callback();//普通函数的调用this指向全局对象
    //这是一种困扰。我们往往是更倾向于他输出div1而不是window。
    //为了解决这个问题，这里可以用一个变量保存div节点的引用
}

document.getElementById('div1').onclick = function(){
    var that =this;//保存div的引用
    var callback = function(){
        alert(that.id);//输出div1
    }
    callback();
}

// 构造器调用，js没有类，但可以从构造器里创建对象，也提供了new运算符，不同于其他语言的class
// 它的构造器看起来更像类，大部分js函数都可以当作构造器，它与普通函数的区别为被调用的方式
// 当用new运算符调用函数时，该函数会返回一个对象，通常这个指针会指向这个返回对象
var MyClass = function(){
    this.name = 'sven';
};
var obj = new MyClass();
alert(obj.name);    //输出sven

var MyClass = function(){
    this.name = 'sven';
    return {//显式地返回一个对象
        name:  'anne'
    }
}

var obj = new MyClass();
alert(obj.name);//输出anne
//如果构造器不显式的返回任何数据，或者是返回一个非对象类型的数据，就不会造成上面的情况

var MyClass = function(){
    this.name = 'sevn'
    return 'anne';//返回String 类型
};
var obj = new MyClass();
alert(obj.name);//输出sven,因为这个中返回类型为String,实例化后的这个对象的属性name为sevn
            
var obj1 = {
    name: 'sven',
    getName: function(){
        return 'anne';//返回string类型
    }
};

var obj2 = {
    name: 'anna'
}

console.log(obj1.name);//输出：sevn
console.log(obj1.getName.call(obj2));//输出anna
//Function.prototype.call和Function.prototype.apply可以动态的改变传入函数的this:


//丢失的this
var obj = {
    myName:'sevn',
    getName:function(){
        return this.myName;
    }
};

console.log(obj.getName());//输出：'sevn'

var getName2 = obj.getName;
console.log(getName2());//输出:' undefined'
//因为第一个getName是由obj这个对象的属性调用起来的，所以this指向了对象obj，而第二个则是用
//getname2来引用obj.getname2,调用getName2是是普通调用方式，所以this指向全局window的。
//所以结果是undefined

var getId = function(id) {
    return document.getElementById(id);
};

getId('div1');

var getId = document.getElementById;
getId('div1');//这样子是不行的，因为getElementById中的内置方法中是需要频繁调用document这个
//对象的，所以需要将document这个对象传入。要不然getid这个使用的this指针将指向全局对象window.
//所以会抛出异常。

//我们可以尝试利用apply把docunment当作this传入getid函数
document.getElementById = (function(func){
    return function(){
        return func.apply(document,arguments);
    }
})(document.getElementById);

var getId = document.getElementById;
var div = getid('div1');

alert(div.id);//输出div1

//call和apply的区别
//这两个都是非常常用的方法
//apply接受两个参数，第一个参数指定了函数体内this对象的指向，第二个参数为一个带下标的集合
//他可以是集合，也可以是类数组。apply方法把这个集合中的元素作为参数传递给被调用的函数

var func = function(a,b,c){
    alert([a,b,c]);     //输出[1,2,3]
};

func.apply(null,[1,2,3]);

//call传入的参数数量不固定，第一个参数指定了函数体内this对象的指向，第二个参数往后，每个参数
//被依次传入函数。
var func = function(a,b,c){
    alert([a,b,c]);     //输出[1,2,3]
};

func.call(null,1,2,3)






