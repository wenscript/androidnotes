按照目前的理解xfermode就是处理在已有图片绘制新图片的显示方法，xfermode主要三种类：

1. AvoidXfermode：指定了一个颜色和容差，强制Paint避免在它上面绘图(或者只在它上面绘图)。 
2. PixelXorXfermode： 当覆盖已有的颜色时，应用一个简单的像素异或操作。
3. PorterDuffXfermode： 这是一个非常强大的转换模式，使用它，可以使用图像合成的16条Porter-Duff规则的任意一条来控制Paint如何与已有的Canvas图像进行交互。到这我们终于知道为什么要介绍Xfermode的了

这次主要介绍是PorterDuffXfermode类，具体该类的含义可以参考下图：
![](http://img.blog.csdn.net/20150917220918913)

现在再来介绍下16种模式：

1. PorterDuff.Mode.CLEAR 
所绘制不会提交到画布上，也就是不显示内容。
2. PorterDuff.Mode.SRC 
显示绘制图片的上层图片。
3. PorterDuff.Mode.DST 
显示绘制图片下层图片。
4. PorterDuff.Mode.SRC_OVER 
正常绘制显示，上下层绘制叠盖。
5. PorterDuff.Mode.DST_OVER 
上下层都显示，下层居上显示。
6. PorterDuff.Mode.SRC_IN 
取两层绘制交集。显示上层。
7. PorterDuff.Mode.DST_IN 
取两层绘制交集。显示下层。
8. PorterDuff.Mode.SRC_OUT 
取上层绘制非交集部分。
9. PorterDuff.Mode.DST_OUT 
取下层绘制非交集部分。
10. PorterDuff.Mode.SRC_ATOP 
取下层非交集部分与上层交集部分。
11. PorterDuff.Mode.DST_ATOP
取上层非交集部分与下层交集部分。 
12. PorterDuff.Mode.XOR 
异或：去除两图层交集部分。
13. PorterDuff.Mode.DARKEN 
取两图层全部区域，交集部分颜色加深。
14. PorterDuff.Mode.LIGHTEN 
取两图层全部，点亮交集部分颜色。
15. PorterDuff.Mode.MULTIPLY 
取两图层交集部分叠加后颜色。
16. PorterDuff.Mode.SCREEN 
取两图层全部区域，交集部分变为透明色。

具体的使用程序如下：
    public class MyBitmapViewAnother extends View {
    private int width;//设置高
    private int height;//设置高
    private Paint mPaint;
    //设置一个Bitmap
    private Bitmap bitmap;
    //创建该Bitmap的画布
    private Canvas bitmapCanvas;
    private Paint mPaintCirlcle;
    private Paint mPaintRect;

    public MyBitmapViewAnother(Context context) {
        super(context);
    }

    public MyBitmapViewAnother(Context context, AttributeSet attrs) {
        super(context, attrs);
        mPaint = new Paint();//Bitmap的画笔

        mPaintCirlcle = new Paint();
        mPaintCirlcle.setAntiAlias(true);
        mPaintCirlcle.setColor(Color.YELLOW);
        mPaintRect = new Paint();
        mPaintRect.setAntiAlias(true);
        mPaintRect.setColor(Color.GRAY);
        PorterDuffXfermode mode = new PorterDuffXfermode(PorterDuff.Mode.XOR);
        mPaintRect.setXfermode(mode);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        width = getDefaultSize(getSuggestedMinimumWidth(), widthMeasureSpec);
        height = getDefaultSize(getSuggestedMinimumHeight(), heightMeasureSpec);
        setMeasuredDimension(width, height);//设置宽和高
        //自己创建一个Bitmap
        bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
        bitmapCanvas = new Canvas(bitmap);//该画布为bitmap的
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        //设置该View画布的背景
        canvas.drawColor(Color.LTGRAY);
        canvas.drawBitmap(bitmap, 0, 0, mPaint);

        bitmapCanvas.drawCircle(width / 2, height / 2, width / 2, mPaintCirlcle);
        bitmapCanvas.drawRect(0, 0, width / 2, height / 2, mPaintRect);
    }}
它的效果图如下：

![](http://img.blog.csdn.net/20150917223030229)