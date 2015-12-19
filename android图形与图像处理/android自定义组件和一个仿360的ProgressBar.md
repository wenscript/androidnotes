**对于绘制android自定义组件的过程，这几天的心得是：1、其实android自定义组件就是一个View类，这个自定义的View类可以像一般的android控件一样被引用和被创建2、android自定义View主要就是通过三个方法来实现onDraw()、onMesure()、invalidate()。具体的绘图过程就是：在onDraw()方法中绘制图像，然后再其他进程或函数中通过invalidate来通知onDraw函数重新绘制图像。3、在android绘图中也有一个双缓冲机制，具体的缓冲过程就是：首先程序在Bitmap内存中先将图片绘制，在图片绘制成功以后，再将图像输入到屏幕中。4、在android绘图中有几个比较重要的类，分别是：Canvas、Paint、Path，其中Canvas类可以理解成画布的意思，Paint类可以理解成画笔的意思，Path类就是android的绘图路径，通过Path的绘制理论上可以绘制出任何图像。**

一个比较简单的自定义progressBar的例子如下：

    public class MyProgressCircle extends View {
    private int width;//设置高
    private int height;//设置高
    //设置画笔
    private Paint mPaintBackground;
    private Paint mPaintCurrent;
    private Paint mPaintText;

    //设置进度
    private int maxProgress=100;
    private int currentProgress=0;

    public int getMaxProgress() {
        return maxProgress;
    }
    public void setMaxProgress(int maxProgress) {
        this.maxProgress = maxProgress;
    }

    public int getCurrentProgress() {
        return currentProgress;
    }
    public void setCurrentProgress(int currentProgress) {
        this.currentProgress = currentProgress;
        invalidate();//实时更新进度
    }

    public MyProgressCircle(Context context, AttributeSet attrs) {
        super(context, attrs);
        //绘制未下载时背景圆的画笔
        mPaintBackground = new Paint();
        mPaintBackground.setAntiAlias(true);
        mPaintBackground.setColor(Color.LTGRAY);
        //绘制下载时显示进度圆的画笔
        mPaintCurrent = new Paint();
        mPaintCurrent.setAntiAlias(true);
        mPaintCurrent.setColor(Color.GRAY);
        //绘制显示下载进度文字的画笔
        mPaintText = new Paint();
        mPaintText.setAntiAlias(true);
        mPaintText.setColor(Color.BLACK);
        mPaintText.setTextAlign(Paint.Align.CENTER);
        mPaintText.setTextSize(100);
    }

    public MyProgressCircle(Context context) {
        super(context);
    }
    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        width = getDefaultSize(getSuggestedMinimumWidth(), widthMeasureSpec);
        height = getDefaultSize(getSuggestedMinimumHeight(), heightMeasureSpec);
        setMeasuredDimension(width, height);//设置宽和高
    }
    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);

        canvas.drawCircle(width / 2, height / 2, 300, mPaintBackground);
        canvas.drawCircle(width/2, height/2, currentProgress*300f/maxProgress, mPaintCurrent);
        canvas.drawText(currentProgress*100f/maxProgress+"%", width/2, height/2, mPaintText);
    }


它的效果图如下：

![](http://img.blog.csdn.net/20150916222638959)

下面介绍的就是一个仿360的自定义组件
    public class MyProgressAnimation extends View {
    private int width;//设置高
    private int height;//设置高

    private Bitmap bitmap;//定义Bitmap
    private Canvas bitmapCanvas;//定义Bitmap的画布

    private Path mPath;    //定义路径
    private Paint mPathPaint;//定义路径的画笔

    private Paint mPaintCircle;//定义圆形的画笔

    private Paint mPaintText; //定义绘制文字的画笔

    //设置进度
    private int maxProgress = 100;
    private int currentProgress = 0;

    public int getMaxProgress() {
        return maxProgress;
    }

    public void setMaxProgress(int maxProgress) {
        this.maxProgress = maxProgress;
    }

    public int getCurrentProgress() {
        return currentProgress;
    }

    public void setCurrentProgress(int currentProgress) {
        this.currentProgress = currentProgress;
        invalidate();//实时更新进度
    }


    private int count = 0;
    private static final int NEED_INVALIDATE = 0X6666;
    //操作UI主线程
    private Handler handler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            switch (msg.what) {
                case NEED_INVALIDATE:
                    //更新时间
                    count += 5;
                    if (count > 80) {
                        count = 0;
                    }
                    invalidate();
                    sendEmptyMessageDelayed(NEED_INVALIDATE, 50);
                    break;
            }

        }
    };

    public MyProgressAnimation(Context context, AttributeSet attrs) {
        super(context, attrs);
        //初始化一个路径
        mPath = new Path();
        //初始化绘制路径的画笔
        mPathPaint = new Paint();
        mPathPaint.setAntiAlias(true);
        mPathPaint.setColor(Color.argb(0xff, 0xff, 0x69, 0x5a));
        mPathPaint.setStyle(Paint.Style.FILL);//设置为填充，默认为填充，这里我们还是定义下
        mPathPaint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.SRC_IN));

        mPaintCircle = new Paint();
        mPaintCircle.setAntiAlias(true);
        mPaintCircle.setColor(Color.argb(0xff, 0xf8, 0x8e, 0x8b));

        mPaintText = new Paint();
        mPaintText.setAntiAlias(true);
        mPaintText.setColor(Color.argb(0xff, 0xFF, 0xF3, 0xF7));
        mPaintText.setTextAlign(Paint.Align.CENTER);
        mPaintText.setTextSize(50);

        handler.sendEmptyMessageDelayed(NEED_INVALIDATE, 50);
    }

    public MyProgressAnimation(Context context) {
        super(context);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        width = getDefaultSize(getSuggestedMinimumWidth(), widthMeasureSpec);
        height = getDefaultSize(getSuggestedMinimumHeight(), heightMeasureSpec);
        setMeasuredDimension(width, height);//设置宽和高

        bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
        bitmapCanvas = new Canvas(bitmap);
    }


    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        //绘制Bitmap上的圆形
        bitmapCanvas.drawCircle(width / 2, height / 2, 150, mPaintCircle);
        //通过Path绘制贝塞尔曲线
        mPath.reset();
        mPath.moveTo(width, (height / 2 + 150) - (currentProgress * 300f / maxProgress));
        mPath.lineTo(width, height / 2 + 200);
        mPath.lineTo(count, height / 2 + 200);
        mPath.lineTo(count, (height / 2 + 150) - (currentProgress * 300f / maxProgress));
        for (int i = 0; i < 10; i++) {
            mPath.rQuadTo(20, 5, 40, 0);
            mPath.rQuadTo(20, -5, 40, 0);
        }
        mPath.close();
        //将贝塞尔曲线绘制到Bitmap的Canvas上
        bitmapCanvas.drawPath(mPath, mPathPaint);
        //将Bitmap绘制到View的Canvas上
        bitmapCanvas.drawText(currentProgress * 100f / maxProgress + "%", width / 2, height / 2, mPaintText);
        canvas.drawBitmap(bitmap, 0, 0, null);
    }}
它的效果图如下：
![](http://img.blog.csdn.net/20150918214101256)