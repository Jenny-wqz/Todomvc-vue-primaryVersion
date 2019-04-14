(function(window) {
	("use strict");
	//以后获取数据就从本地存储中获取(再把接送格式字符串转化成数组)
	// 防止本地中没有数据
	const list = JSON.parse(localStorage.getItem("list")) || [];
	const vm = new Vue({
		el: "#app",
		data: {
			//根据list渲染列表
			// list: [
			// 	{ id: 1, name: "吃饭", done: true },
			// 	{
			// 		id: 2,
			// 		name: "睡觉",
			// 		done: false
			// 	},
			// 	{
			// 		id: 3,
			// 		name: "打豆豆",
			// 		done: false
			// 	}
			// ],
			list,
			// 绑定输入框
			todoName: "",
			editId: -1
		},
		//监听数据变化
		watch: {
			list: {
				deep: true,
				handler(newVal) {
					//通过形参拿到变化的新值
					// console.log(newVal);
					// 再把新值存在本地(最好转化成json格式的字符串)
					localStorage.setItem("list", JSON.stringify(newVal));
				}
			}
		},

		//计算属性,只会根据相关数据的变化而变化!
		computed: {
			//判断底部是否展示
			isFooterShow() {
				//里面的list才是相关的数据,只有按下enter键,数组发生变化,才会引起变化
				// console.log("我发生变化了");
				return this.list.length > 0;
			},
			//itemLeft 数据的动态绑定
			itemLeft() {
				//过滤出done = false 的任务的个数,赋值给itemleft
				return this.list.filter(item => !item.done).length;
			},
			//实现 clearCompleted按钮的显示与隐藏
			showCompleted() {
				//判断list 中是否有done=true的,只要找到了,就显示;否则隐藏
				return this.list.find(item => item.done);
			},

			//全选按钮是否展示
			isAllShow() {
				return this.list.length;
			},

			// 实现全选和反选案例
			// checkAll() {
			// 	// 当所有的任务都完成了,全选才选中;只要有一个没有完成,都不能选中全选
			// 	return this.list.every(item => item.done);
			// }

			checkAll: {
				//设置值时触发
				set(newVal) {
					// console.log(newVal);
					//设置值时让list中所有任务都和该值相等
					this.list.forEach(item => (item.done = newVal));
				},
				//获取值时触发
				get() {
					//绑定的获取到的值就是return 出去的值
					return this.list.every(item => item.done);
				}
			}
		},
		methods: {
			//点击删除按钮,删除一条数据
			delTodo(idx) {
				//根据传过来的id去删除对应的数据
				//1.过滤出id!=id的项,重新赋值给list
				// this.list = this.list.filter(item => item.id !== id);
				//2.根据id找到对应的索引,根据索引去删除对应的任务
				// let index = this.list.findIndex(item => item.id === id);
				// this.list.splice(index, 1);
				//3.传过来的是索引,根据索引去删除对应的数据
				// console.log(idx);
				this.list.splice(idx, 1);
			},
			//添加数据
			addTodo() {
				//拿到输入框的内容
				//添加id(list的最后一个元素的id+1),如果没有数据,默认给1
				let id =
					this.list.length > 0 ? this.list[this.list.length - 1].id + 1 : 1;
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
			},
			//双击展示编辑状态
			showEdit(id) {
				//双击后,拿到传过来的id,将editId更改为这个id
				this.editId = id;
				//然后把内容给编辑状态
			},
			//按回车键,隐藏编辑状态
			hideEdit() {
				//按下回车键,只需要更改editId的值,让其不等于其中任何一个的id
				this.editId = -1;
				//data中数据更改,指令和表达式自动重新计算
			},
			//底部的显示与隐藏
			//方式2:
			// isFooterShow1() {
			// 	//任何操作都会触发该函数,所以该方式不合适
			// 	// console.log("我被执行了");
			// 	return this.list.length > 0;
			// }

			//实现 点击 clearCompleted 按钮,删除已完成的任务
			delCompleted() {
				//点击时,过滤出未完成的任务,再重新赋值给 list
				this.list = this.list.filter(item => !item.done);
			}
		}
	});
})(window);
