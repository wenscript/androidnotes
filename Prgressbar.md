##ProgressBar的使用
显示风格
    
    style="?android:attr/progressBarStyleLarge"
	style="?android:attr/progressBarStyleSmall"
	style="?android:attr/progressBarStyleHorizontal"
标题栏的ProgressBar
    
    //启用窗口特征，使用带进度和不带进度的ProgresBar
	requestWindowfeature(Window.FEATURE_PROGRESS);
	requestWindowfeature(Window.FEATURE_INDETERMINATE_PROGRESS);
	setProgressBarVisibility(true);
    setProgressBarIndeterminateVisibility(true);
	setProgressBar(400);

ProgressBar的关键属性

    android:max="100"
	android:progress="50"
	android:secondaryProgress="100"
	android:indeterminate="true"//设置是否精确显示

ProgressBar的关键方法

    setProgress(int)//设置第一进度
	setSecondaryProgress(int)//设置第二进度
	getProgress()//得到进度值
	getSecondaryProgress()//得到第二进度值
	inCrementProgreassBy(int)//增加或减少进度值
	inCrementSecondaryProgressBy(int)//增加或减少第二进度值
	getMax()//得到最大进度值