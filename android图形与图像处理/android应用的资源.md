> android 应用的资源主要分为两大类：
> 
- 无法通过R清单访问的原生资源，保存在assets目录下
- 可通过R清单访问的资源，保存在res目录下

android使用资源的方式:1、使用R文件来引用文件。2、使用Android的Resources类可以访问实际的android资源文件。Resources类主要提供两类方法:getXxx(int id)(根据资源清单ID来获取实际资源)、getAssets()(获取访问/assets目录下的资源的AssetManager对象)

颜色值的定义:
android支持的颜色值形式:

- \#RGB:分别有(0-f)16个等级的颜色
- \#ARGB:加上A这个透明度的
- \#RRGGBB:分别有(00-ff)256个等级的颜色
- \#AARRGGBB:外加上A这个透明度值

字符串资源应该放在/res/values/

    <resources>
			<string name="hello">hello world</string>
			<string name="c1">jkkdk</string>
			<string name="c2">ddddd</string>
	</resources>

颜色资源的使用

    <resources>
			<color name="c1">#FF0</color>
			<color name="c2">#F00</color>
			<color name="c3">#FFF</color>
			<color name="c4">#0F0</color>
			<color name="c5">#000</color>
	</resources>

尺寸资源的使用

	<resources>
			<dimen name="spacing">8dp</dimen>
			<dimen name="cell_width">20dp</dimen>
			<dimen name="cell_height">19dp</dimen>
	</resources>

下面程序同时使用上面的资源

    package com.example.wenscript.myproject;
    
    import android.content.res.Resources;
    import android.os.Bundle;
    import android.support.v7.app.AppCompatActivity;
    import android.view.View;
    import android.view.ViewGroup;
    import android.widget.BaseAdapter;
    import android.widget.GridView;
    import android.widget.TextView;
    
    public class MainActivity extends AppCompatActivity {
    private GridView gridView;
    int[] mString={R.string.c1,R.string.c2,R.string.c3,R.string.c4,R.string.c5,R.string.c6,R.string.c7,
    R.string.c8,R.string.c9};
    int[] mColor={R.color.c1,R.color.c2,R.color.c3,R.color.c4,R.color.c5,R.color.c6,R.color.c7,R.color.c8,
    R.color.c9};
    @Override
    protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    gridView= (GridView) findViewById(R.id.grid_view);
    gridView.setAdapter(new MyAdapter());
    }
    class MyAdapter extends BaseAdapter{
    
    @Override
    public int getCount() {
    return mString.length;
    }
    
    @Override
    public Object getItem(int position) {
    return null;
    }
    
    @Override
    public long getItemId(int position) {
    return 0;
    }
    
    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
    Resources res=MainActivity.this.getResources();
    TextView tv=new TextView(MainActivity.this);
    tv.setWidth((int) res.getDimension(R.dimen.cell_width));//使用尺度资源设置
    tv.setHeight((int) res.getDimension(R.dimen.cell_height));
    tv.setBackgroundResource(mColor[position]);
    tv.setText(mString[position]);
    return tv;
    }
    }
    }

**数组资源**
在android可以用arrays.xml定义数组，在resources标签下，一共有三种形式的标签:

- < array......>:定义普通类型的数组
- < string-array......>:定义字符串数组
- < integer-array.....>:定义整数数组

在java程序中，Resources提供如下方法，访问上面的数组getStringArray、getIntArray、obtainTypedArray.

下面是示例：

    <?xml version="1.0" encoding="utf-8"?>
    <resources>
    <array name="plain_attr">
    <item>#f0f</item>
    <item>#0ff</item>
    <item>#ff0</item>
    <item>#00f</item>
    <item>#f00</item>
    </array>
    <string-array name="string_array">
    <item>kkkkkkkkkkk6</item>
    <item>kkkkkkkkkkk5</item>
    <item>kkkkkkkkkkk4</item>
    <item>kkkkkkkkkkk3</item>
    <item>kkkkkkkkkkk2</item>
    <item>kkkkkkkkkkk1</item>
    </string-array>
    <integer-array name="integer_array">
    <item>12</item>
    <item>13</item>
    <item>14</item>
    <item>15</item>
    <item>16</item>
    <item>17</item>
    </integer-array>
    </resources>

**使用Drawable资源**


- 图片资源



- StateListDrawable资源
StateListDrawable资源用于将多个Drawable资源组织在一起，当组件的状态发生改变时，对象会显示不同的drawable。以selector为根元素。该元素可以指定以下的属性：android:color、android:state_xxx

下面示例代码

    <?xml version="1.0" encoding="utf-8"?>
    <selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item
    android:drawable="@mipmap/passport_ic_contact_photo_fg"
    android:state_pressed="true"
    />
    <item android:drawable="@mipmap/passport_ic_contact_photo_mask"/>
    
    </selector>



- LayerDrawable资源
与StateListDrawable类似，LayerDrawable也是有一组Drawable数组，它会将索引最大的drawable显示在最上面，它有android:drawable、android:bottom|top|left这些属性

下面是示例代码:

    <?xml version="1.0" encoding="utf-8"?>
    <layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@mipmap/hfb_step1"
    android:left="20dp"/>
    <item android:drawable="@mipmap/hfb_step2"
    android:right="20dp"/>
    <item android:drawable="@mipmap/hfb_step3"
    android:bottom="20dp"/>
    </layer-list>

- ShapeDrawable资源

 
- ClipDrawable资源

 
- AnimationDrawable资源

- 属性动画(Property Animation)资源

- 使用原始xml资源

- layout资源

- 菜单(menu)资源

- 样式(Style)和主题(Theme)资源

- 属性(Attribute)资源

