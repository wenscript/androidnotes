## 10/12/2015 10:14:41 PM 
##今天研究的是android模拟时钟的画法，涉及到的主要方法有rotate()、save()、restore()。rotate方法讲的就是一种旋转画法，但是它的这个旋转指的是画布，也就是Canvas的旋转，因此，我们的父布局不动，这样显示起来，就相当于进行了旋转，还有在实践中发现，这个旋转应该是顺时针方向的。另外这个save()方法，根据官方api的解释：Subsequent calls to translate,scale,rotate,skew,concat or clipRect, clipPath will all operate as usual, but when the balancing call to restore() is made, those calls will be forgotten, and the settings that existed before the save() will be reinstated.
在进行旋转、放大等转换执行之前，可以用save方法设置一个还原点，当使用restore方法后，就可以将画布转化回转换之前的状态了。
###还有今天发生了一个bug，View程序里的变量初始化，一定要放在带两个参数的构造函数中，默认调用的是带两个参数的构造器。


以下就是今天的代码：

    package com.example.wenscript.myapplication;
    public class ClockView extends View {
    private int width;
    private int height;
    private Paint drawLinePaint;//用来画刻度盘的
    private Paint secondLinePaint;//用来画表盘指针的
    private Paint interCirclePaint;//画内圆
    private Paint circlePaint;//画外缘
    private Paint textPaint;//画出表盘的刻度
    private Calendar calendar;
    public static final int  NEED_INVALID=0x1034;
    private Handler handler=new Handler(){
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            switch (msg.what){
                case NEED_INVALID:
                    calendar=Calendar.getInstance();
                    invalidate();
                    handler.sendEmptyMessageDelayed(NEED_INVALID,1000);
                    break;
            }
        }
    };
    public ClockView(Context context) {
        super(context);

    }

    public ClockView(Context context, AttributeSet attrs) {
        super(context, attrs);
        drawLinePaint=new Paint();
        drawLinePaint.setAntiAlias(true);
        drawLinePaint.setColor(Color.GRAY);
        drawLinePaint.setStyle(Paint.Style.STROKE);
        drawLinePaint.setStrokeWidth(20);


        secondLinePaint=new Paint();
        secondLinePaint.setAntiAlias(true);
        secondLinePaint.setColor(Color.GRAY);
        secondLinePaint.setStyle(Paint.Style.STROKE);
        secondLinePaint.setStrokeWidth(15);


        interCirclePaint=new Paint();
        interCirclePaint.setAntiAlias(true);
        interCirclePaint.setColor(Color.DKGRAY);
        interCirclePaint.setStyle(Paint.Style.STROKE);
        interCirclePaint.setStrokeWidth(5);

        circlePaint=new Paint();
        circlePaint.setAntiAlias(true);
        circlePaint.setColor(Color.GRAY);
        circlePaint.setStyle(Paint.Style.STROKE);
        circlePaint.setStrokeWidth(15);

        textPaint=new Paint();
        textPaint.setAntiAlias(true);
        textPaint.setColor(Color.GRAY);
        textPaint.setTextSize(30);
        textPaint.setTextAlign(Paint.Align.CENTER);
        textPaint.setStyle(Paint.Style.STROKE);
        textPaint.setStrokeWidth(5);

        calendar=Calendar.getInstance();
        handler.sendEmptyMessageDelayed(NEED_INVALID,2000);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        width = getDefaultSize(getSuggestedMinimumWidth(), widthMeasureSpec);
        height = getDefaultSize(getSuggestedMinimumHeight(), heightMeasureSpec);
        setMeasuredDimension(width, height);//设置宽和高

    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.drawCircle(width / 2, height / 2, 300, interCirclePaint);
        canvas.drawCircle(width / 2, height / 2, 340, circlePaint);
        for (int i=1;i<=12;i++){
            canvas.save();
            canvas.rotate((i*360)/12,width/2,height/2);
            canvas.drawLine(width/2,height/2-300,width/2,height/2-270,drawLinePaint);
            canvas.drawText(""+i,width/2,height/2-240,textPaint);
            canvas.restore();
        }
        int minute=calendar.get(Calendar.MINUTE);
        canvas.save();
        canvas.rotate((minute * 360) / 60, width / 2, height / 2);
        canvas.drawLine(width / 2, height / 2 + 15, width / 2, height / 2 - 200, secondLinePaint);
        canvas.restore();
        int hour=calendar.get(Calendar.HOUR);
        if (hour>12){
            hour=hour-12;
        }
        float hourDegree=hour*360/12+minute*30/60;
        canvas.save();
        canvas.rotate(hourDegree, width / 2, height / 2);
        canvas.drawLine(width / 2, height / 2 + 20, width / 2, height / 2 - 160, secondLinePaint);
        canvas.restore();

        int second=calendar.get(Calendar.SECOND);
        canvas.save();
        canvas.rotate((second*360)/60,width/2,height/2);
        canvas.drawLine(width/2,height/2+23,width/2,height/2-250,secondLinePaint);
    canvas.restore();
    }
    }

下面是效果图：
![](http://img.blog.csdn.net/20150916220205311)