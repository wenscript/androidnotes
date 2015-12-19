这方面的网上教程太少，还是翻译官方文档吧。

# Styles和Themes #
> style定义的是一个View的特性。style可以定义的特性有height, padding, font color, font size, background color。style被定义在value资源文件中，是和layout布局文件分离的。android中的styles设计其实和web 设计中的css方式很想，都是将内容和设计样式分离。

举个栗子，以下这个布局

    <TextView
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:textColor="#00FF00"
    android:typeface="monospace"
    android:text="@string/hello" />

可以转换成

    <TextView
    style="@style/CodeFont"
    android:text="@string/hello" />
> 所有与style相关的属性都被提取出来放在一个CodeFont中。

> Theme也是一种style，但是它是应用于整个Activity或Application中的，并不像style只是应用于一个view中。当一个style被当作一个Theme应用时，那么这个activity或application中所有的view都会应用这个样式。

# Defining Styles #
> 为了创建一个style，应该在你的工程目录下的res/values下创建一个.xml为扩展名的文件。这个xml文件的root节点一定是resources.对于每一个你想创建的style，你需要增加一个style节点，并且携带一个name属性来标记这个style。接下来，你应该为这个style的每一个特性增加一个item节点，并且携带一个name属性来标记这个特性。这个item的value值，可以是一个关键词、十六进制的颜色，这里有一个例子：

    <?xml version="1.0" encoding="utf-8"?>
    <resources>
    <style name="CodeFont" parent="@android:style/TextAppearance.Medium">
    <item name="android:layout_width">fill_parent</item>
    <item name="android:layout_height">wrap_content</item>
    <item name="android:textColor">#00FF00</item>
    <item name="android:typeface">monospace</item>
    </style>
    </resources>

每一个resources的子元素在编译的时候都会被编译成一个资源对象，并且可以通过style的名字进行引用。上面例子其实就可以在一个layout文件中被引用，style="@style/CodeFont"。另外这个parent属性是一个可选项，它表明的当前style继承的一个父style，当前这个style应该满足父style的一些属性，当然也可以重写这些属性。

# Inheritance #
这个parent属性可以让你的style继承这个父style的某些特性。你可以用这个属性继承一个现有样式，并且只是定义你想增加或者更改的属性。你既可以继承你自己创建的styles，你也可以继承系统自带的style。具体可以见[Platform Styles and Themes](http://wear.techbrood.com/guide/topics/ui/themes.html#PlatformStyles)
 举个例子，你可以继承android系统默认的字体，并且修改它：

    <style name="GreenText" parent="@android:style/TextAppearance">
    <item name="android:textColor">#00FF00</item>
    </style>
如果你想继承你自己创建的style，你并不需要parent属性，你只需要把你style的name属性写成父style在加上你要修改的属性，就行了，比如：

    <style name="CodeFont.Red">
    <item name="android:textColor">#FF0000</item>
    </style>

注意在上面的例子当中并没有parent属性，但是因为name属性的值中有你已经创建过的style，因此这个style将会继承之前的style。并且当前的这个style复写了颜色属性，并且将颜色设置成红色。以后你可以通过@style/CodeFont.Red来应用你创建的style。
你当然可以多次像这样来继承，通过多个.号，举个栗子，你可以扩展CondeFont.Red来使得变得更大一些

    <style name="CodeFont.Red.Big">
    <item name="android:textSize">30sp</item>
    </style>

注意：上面这种名字后面加点的方式只适用于继承自己创建的style。你不能通过这种方式来继承系统自带的style。如果要继承自带的style，你需要使用parent属性。

# Style Properties #
既然现在你已经理解一个style如何定义，接下来你需要了解这个item节点可以设置哪些特性。你可能对一些特性比较熟悉，比如layout_width、textColor。除此之外，这里有更多的特性你可以是使用。
找到这些特性最好的办法就是找到相关的类，并且列出这个类所的所有xml属性。比如，所有在TextView的xml中的属性都可以用来给TextView元素定义一个style。比如EditText有一个属性是android:inputType,那么你就可以给一个EditText定义一个style，就像这样：

    <EditText
    android:inputType="number"
    ... />
 
你可以创建一个style像这样：

    <style name="Numbers">
      <item name="android:inputType">number</item>
      ...
    </style>

所以你的layout文件可以这样引用:

    <EditText
    style="@style/Numbers"
    ... />

对于所有可用的特性，可以看`R.attr`这个类。但是记住并不是所有的view都支持这些特性，你应该经常查看，这个类支持什么特性。当你将一个style应用在一个View上，但是这个view不能支持所有的特性，那么这个view就会只使用它支持的特性，但是简单的忽略它不支持的特性。
有一些style特性，可能不被任何view支持，可能只能应用于一个theme中。这些style应用于整个window并且不适用任何view。举个例子，theme的特性可能是隐藏应用标题，隐藏状态栏，或者改变window的背景。这些特性不属于任何view对象。通过在`R.attr`找到以widow开头的属性，基本上就是theme相关的。
# Applying Styles and Themes to the UI #
对于设置一个style主要有两个方面：



- 对于一个单独的View来讲，只要在你的layout xml文件中增加一个style属性就可以了


- 对于整个Activity或application，你需要在Android manifest文件中的ativity或application元素中增加android：theme属性。

对于系统自带style的引用，你可以通过R.style来查看。





















































