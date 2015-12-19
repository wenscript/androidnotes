## 使用fragment argument
> 从fragment中启动activity，其实和在activity中启动另外一个activity没什么大的区别。

例如：
    `Intent i=new Intent(getActivity(),CrimeActivity.class);
	startActivity(i);`

> 于此同时，我们可以通过Intent的putExtra方法，将数据绑定在Intent上，然后将数据发送出去。但是呢，在获取数据时就存在两种方式：

1. 比较简单的方式：直接在跳转子activity托管的fragment中，先通过getActivity方法获得托管activity，然后获取Intent，最终获得数据。缺点就是破坏了fragment的封装性，fragment被指定的activity绑定。
2. 比较复杂的方式：fragment argument方法，破环封装性的原因就是，数据被保存在activity的私有空间中，比较好的做法就是将数据保存在fragment的某个地方，这样fragment就无需依赖于它的托管activity。其实这个地方就是他的arguments bundle。
我们知道每一个fragment都可带有一个Bundle对象，该对象包含一个key-value对，我们可以通过bundle的put方法，将数据存在bundle中。** 还有需要注意的一点就是 **，就是将argument bundle附加给fragment，需调用Fragment的setArguemnts（bundle）
，该方法必须在fragment创建后，被添加到activity前完成。

具体操作的方法就是：在fragment中创建一个静态方法newInstance(int i)，这个i就是托管activity接收到的数据，在这个静态方法中我们需要完成如下几步：1、将数据存入bundle对象中2、创建一个fragment3、通过fragment的setArgument方法将bundle放入argument中4、返回一个fragment对象。具体的见书P170页。

获取数据就比较简单了，在fragment中通过getArgument（）方法可以得到数据。 


    