## 在android绘图的思路就是开发一个自定义的view组件，android的绘图应该继承View组件，并重写它的onDraw(Canvas canvas)。
> 在重写onDraw方法时，我们注意到有一个Canvas类，该类相当于一个依附于view组件的画布，它提供一系列用于绘制各种图形的方法，比如：drawBitmap、drawCircle、drawLine、drawOval、drawPath、drawRect方法

> 除此之外，这里还有另外一个API：Paint，Paint代表Canvas上的画笔，因此该类主要用于设置绘制风格

> 另外一个api就是Path，它可以画出任何图形