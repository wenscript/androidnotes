## Activity的生命周期
在android的生命周期中主要是在运行、暂停、停止三种可能的状态间进行转换。
> 运行状态就是正常的状态，程序能够与用户交互的正常状态
> 暂停状态就是当程序调出一个对话框，程序可见，但不能与用户进行交互的状态
> 停止状态就是当另外一个程序来到前台，程序不可见，也不能同用户进行交互的状态

## 设备旋转与Activity生命周期
* 当设备进行旋转之后，Activity就会被销毁，因此之前的数据都会被丢失。
* 为匹配不同的设置，应该为程序准备一个水平布局，也就是在res目录下创建一个新文件夹layout-land
* 在onCreate（Bundle savedInstanceState）方法中我们看到一个bundle参数，通过该参数可以将设备旋转前的数据保存下来，并进行读取
* 其实在onPause、onStop、onDestroy方法运行之前，会运行一个onSaveInstanceState(Bundle outState)
* Bundle参数是一个键值对变量，在设备旋转之前，先用Bundle变量将数据存储下来

## 启动Activity
误区：之前一直认为通过startActivity是Activity自身去启动另一个Activity，其实中间有一个Android操作系统的ActivityManager，是ActivityManager来调用另一Activity

## 从子Activity返回结果
使用StartActivityResult（），并且在子Activity中使用setResult，最后在主Activity中的onActivityResult()方法中处理数据