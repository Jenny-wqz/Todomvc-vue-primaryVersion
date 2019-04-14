## Todomvc(vue 初级版) 步骤

### 1. 引入 vue,创建 vue 实例,并动态绑定数据

> 1.1 遍历 list,根据 list 动态渲染列表 ( v-for 指令,添加 :key='item.id')

### 2. 点击删除按钮,删除该条数据

> 2.1 给删除按钮注册点击事件,点击时,拿到对应的下标或者 id
> 2.2 根据 id 或者下标删除对应的数据

```js
//根据传过来的id去删除对应的数据
//1.过滤出id!=id的项,重新赋值给list
// this.list = this.list.filter(item => item.id !== id);
//2.根据id找到对应的索引,根据索引去删除对应的任务
// let index = this.list.findIndex(item => item.id === id);
// this.list.splice(index, 1);
//3.传过来的是索引,根据索引去删除对应的数据
// console.log(idx);
// this.list.splice(idx, 1);
```

## 3. 按回车键添加数据

> 3.1 先将输入框和数据库用一个 todoName 绑定,
> 3.2 绑定后,按回车键,拿到输入框的内容,拼接成一个对象.

- 3.2.1 对象添加一个 id 是 list 的最后一个的 id+1,如果 list 没有数据,默认给 1

- 3.2.2 输入框的内容如果是空,不能添加到 list 中去

> 3.3 把对象再插入到 list 中
> 3.4 清空输入框

```js
//拿到输入框的内容
//添加id(list的最后一个元素的id+1),如果没有数据,默认给1
let id = this.list.length > 0 ? this.list[this.list.length - 1].id + 1 : 1;
//先判断: 输入框是否有内容
let name = this.todoName.trim();
if (name === "") {
	return;
}
let obj = {
	id,
	name,
	done: false
};
//拼接成对象后,添加到list中
this.list.push(obj);
//添加成功后,清空文本框的内容
this.todoName = "";
```

## 4. 显示编辑状态

> 4.1 首先在 data 中声明一个 editId = -1;
> 4.2 判断 editId 和 item.id 是否相等,如果相等,显示编辑状态;如果不相等,则不显示编辑状态

## 5. 双击显示编辑状态

> 5.1 点击时拿到传过来的 id,
> 5.2 更改 editId = id,(data 中的数据一旦更新,页面中的指令和变大时都要重新计算)
> 5.3 此时 editId = id,编辑状态可以展示
> 5.4 显示编辑状态时要拿到对应的内容(双向数据绑定)

## 6.按 enter 键隐藏编辑状态

> 6.1 按下回车键,只需要更改 editId 的值,让其不等于其中任何一个的 id,
> 6.2 由于//data 中数据更改,指令和表达式自动重新计算,所以不需要进行任何操作,vue 会自动更新数据

## 7. 底部的显示与隐藏

> 7.1 底部的显示与隐藏只与 list 是否有数据有关
> 7.2 list.length>0,显示;否则隐藏

#### 可以有三种方法实现底部的显示与隐藏

`方法1` 直接在 头标签中判断<footer class="footer" v-show="list.length>0">

`方法2` 声明一个函数,通过这个函数判断 list 的长度是否大于 0;
**问题:** 在文本框中无论输入什么(并没有按下 enter 键),方法 2 都会执行,因为文本框绑定了 data 中的 todoName,当 data 中的数据改变了,指令和表达式都会重新计算,导致该函数一直执行.(所以该方法不合适)

`方法3` 通过计算属性 computed 来实现
计算属性,只会根据相关属性的变化而变化!
**使用**:

- 1 : 写起来像方法,用起来就是属性

- 2 : 里面用到的数据可以是 data 中存在的数据
- 3 : 只根据相关数据的变化而变化,其他操作不会引起变化
- 4 : 里面的属性不能和 data 中的重名
- 5 : 一定要有返回值!!!(使用的时候拿到的就是返回值)

```js
computed: {
    isFooterShow() {
        //里面的list才是相关的数据,只有按下enter键,数组发生变化,才会引起变化
        console.log("我发生变化了");
        return this.list.length > 0;
    }
},

```

## 8. 实现左下角 Left 数据的同步

> 8.1 left 的数据是根据 list 的未完成数据来变化的(一直变化的,所以需要使用计算属性来完成)
> 过滤出 done = false 的任务的个数,赋值给 itemleft

## 9. 实现 clearCompleted 按钮的显示与隐藏

> 9.1 clearCompleted 按钮的显示与隐藏 是根据 list 中的 done = true 来变化的(一直变化,所以需要使用计算属性来完成)
> 9.2 判断 list 中是否有 done=true 的,只要找到了,就显示;否则隐藏

## 10. 实现 点击 clearCompleted 按钮,删除已完成的任务

> 10.1 点击时,过滤出未完成的任务,再重新赋值给 list

## 11. 实现全选和反选案例

> 11.1 当所有的任务都完成了,全选才选中;
> 11.2 全选被选中,所有任务都已完成
> 11.3 上面两步都是动态的,一直在变化,所以要使用计算属性来完成

```js
// checkAll() {
//     // 当所有的任务都完成了,全选才选中;只要有一个没有完成,都不能选中全选
//     return this.list.every(item => item.done);
// }
//但是这样只能由反选控制全选....

// 一个真正的计算属性其实有两部分构成
checkAll:{
    //设置值时触发
    set(newVal){
        // console.log(newVal);
        //设置值时,通过形参拿到设置的新值,然后让list中所有任务都和该新值值相等
		this.list.forEach(item => item.done = newVal);
    },
    //获取值时触发
    get(){
        //绑定的获取到的值就是return 出去的值,所以必须要有返回值
        return this.list.every(item => item.done);
    }
}
```

## 12. 全选按钮是否展示

> 12.1 全选按钮的展示是根据 list 的长度来判断是否展示(计算属性)

## 13. 实现数据持久化(本地存储)

> 13.1 现象: 无论如何操作,每次一刷新,都只有我们自己在 data 中写的数据
> 13.2 原因: 由于没有进行本地存储,所以不能实现数据存储.
> 13.3 解决:将数据存在本地存储中
> 何时存储数据?

    方式1: 不管CURD(增删改查),只要改变了数据,都要进行保存(不推荐,操作太频繁)
    方式2: 监听list的变化,只有list发生了变化,才进行数据的存储

**vue 中提供了配置项,使用 watch 可以监听数据的变化**
注意: 使用 watch 监听引用数据类型,监听的是地址,其具体属性发生变化时监听不到的,这时要使用深度监听,通过 handler 函数来监听变化

```js
watch: {
    list: {
        deep: true,
        handler(newVal) {
            //通过形参拿到变化的新值
            console.log(newVal);
            // 再把新值存在本地(最好转化成json格式的字符串)
            localStorage.setItem("list", JSON.stringify(newVal));
        }
    }
},
```

以后获取数据就从本地存储中获取(再把 json 格式字符串转化成数组)
