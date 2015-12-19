##由于TableHost类已经淘汰，因此我们也应该与时俱进，使用FragmentTableHost。

> FragmentTableHost从这个类的名字上可以看出来，这是个TableHost，并且可以将每一个table都与一个Fragment相联系的Tablehost。

FragmentTableHost的具体使用步骤：
1. 从布局文件中找到TableHost，并且相关内容绑定到上面（使用setup方法）
2. 使用Tabspec给每个目标设置图片，文字内容
3. 使用addTab添加tab

下面是实例：

1. activity_main.xml 

    <?xml version="1.0" encoding="utf-8"?>
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
      android:layout_width="fill_parent"
      android:layout_height="fill_parent"
      android:orientation="vertical" >
    
      <FrameLayout
    android:id="@+id/realtabcontent"
    android:layout_width="fill_parent"
    android:layout_height="0dip"
    android:layout_weight="1" />
    
      <android.support.v4.app.FragmentTabHost
    android:id="@android:id/tabhost"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content" 
    android:background="@drawable/bg_tabhost_bg">
    
    <FrameLayout
      android:id="@android:id/tabcontent"
      android:layout_width="0dp"
      android:layout_height="0dp"
      android:layout_weight="0" />			
      </android.support.v4.app.FragmentTabHost>
    
    </LinearLayout>

2. tab_item_view.xml

    <?xml version="1.0" encoding="utf-8"?>
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:gravity="center"
      android:orientation="vertical" >
    
      <ImageView
    android:id="@+id/imageview"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:focusable="false"
    android:padding="3dp" 
    android:src="@drawable/tab_home_btn">
      </ImageView>
    
      <TextView
    android:id="@+id/textview"	   
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" 
    android:text=""
    android:textSize="10sp"
    android:textColor="#ffffff">
      </TextView>
    
    </LinearLayout>

3. fragment1.xml 就贴一个Fragment XML吧!其他的几个都一样，只是颜色不一样，
    
    <?xml version="1.0" encoding="utf-8"?>
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      android:orientation="vertical"
      android:background="#FBB55D" >
      
    
    </LinearLayout>

4. MainActivity 

    package com.example.fragmenttabhost;
    
    import android.os.Bundle;
    import android.support.v4.app.Fragment;
    import android.support.v4.app.FragmentActivity;
    import android.support.v4.app.FragmentTabHost;
    import android.view.LayoutInflater;
    import android.view.View;
    import android.widget.ImageView;
    import android.widget.TabHost.TabSpec;
    import android.widget.TextView;
    
    import com.example.fragment.Fragment1;
    import com.example.fragment.Fragment2;
    import com.example.fragment.Fragment3;
    import com.example.fragment.Fragment4;
    import com.example.fragment.Fragment5;
    
    /**
     * 
     * @author zqy
     * 
     */
    public class MainActivity extends FragmentActivity {
      /**
       * FragmentTabhost
       */
      private FragmentTabHost mTabHost;
    
      /**
       * 布局填充器
       * 
       */
      private LayoutInflater mLayoutInflater;
    
      /**
       * Fragment数组界面
       * 
       */
      private Class mFragmentArray[] = { Fragment1.class, Fragment2.class,
      Fragment3.class, Fragment4.class, Fragment5.class };
      /**
       * 存放图片数组
       * 
       */
      private int mImageArray[] = { R.drawable.tab_home_btn,
      R.drawable.tab_message_btn, R.drawable.tab_selfinfo_btn,
      R.drawable.tab_square_btn, R.drawable.tab_more_btn };
    
      /**
       * 选修卡文字
       * 
       */
      private String mTextArray[] = { "首页", "消息", "好友", "搜索", "更多" };
      /**
       * 
       * 
       */
      public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    
    initView();
      }
    
      /**
       * 初始化组件
       */
      private void initView() {
    mLayoutInflater = LayoutInflater.from(this);
    
    // 找到TabHost
    mTabHost = (FragmentTabHost) findViewById(android.R.id.tabhost);
    mTabHost.setup(this, getSupportFragmentManager(), R.id.realtabcontent);
    // 得到fragment的个数
    int count = mFragmentArray.length;
    for (int i = 0; i < count; i++) {
      // 给每个Tab按钮设置图标、文字和内容
      TabSpec tabSpec = mTabHost.newTabSpec(mTextArray[i])
      .setIndicator(getTabItemView(i));
      // 将Tab按钮添加进Tab选项卡中
      mTabHost.addTab(tabSpec, mFragmentArray[i], null);
      // 设置Tab按钮的背景
      mTabHost.getTabWidget().getChildAt(i)
      .setBackgroundResource(R.drawable.selector_tab_background);
    }
      }
    
      /**
       *
       * 给每个Tab按钮设置图标和文字
       */
      private View getTabItemView(int index) {
    View view = mLayoutInflater.inflate(R.layout.tab_item_view, null);
    ImageView imageView = (ImageView) view.findViewById(R.id.imageview);
    imageView.setImageResource(mImageArray[index]);
    TextView textView = (TextView) view.findViewById(R.id.textview);
    textView.setText(mTextArray[index]);
    
    return view;
      }
    
    }