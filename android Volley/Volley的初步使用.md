## Volley的定义和使用场景 
**Volley是google提倡使用的一种网络框架，因此这个东西很有学习的必要，Volley适用的场景是频繁需要网络请求和连接，但是数据量不大的情况下。它的主要用途有以下几个方面：1.json，图片等的异步下载2.网络请求排序3.网络请求的优先处理4.缓存5.多级别取消请求6.和Activity和生命周期的联动（Activity结束时同时取消所有网络请求）**


*Volley的使用步骤如下：*

1. 新建请求队列
  `RequestQueue requestQueue=Volley.newRequestQueue(this);`
2. 定义请求类型
  `StringRequest stringRequest=new StringRequest(,,,)`
3. 添加请求到请求队列中
  `requestQueue.add(stringRequest);`

**注意：这个请求队列RequestQueue只需要创建一次，Volley是支持高并发的，创建的过多浪费资源**


    public class MainActivity extends AppCompatActivity {
    private TextView textView;
    private ImageView imageView;
    private static final int STABLE=0x1004;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    textView= (TextView) findViewById(R.id.textview);
    imageView= (ImageView) findViewById(R.id.image);
    RequestQueue requestQueue= Volley.newRequestQueue(this);
    StringRequest stringRequest=new StringRequest("https://www.baidu.com", new Response.Listener<String>() {
    @Override
    public void onResponse(String response) {
    textView.setText(response);
    }
    }, new Response.ErrorListener() {
    @Override
    public void onErrorResponse(VolleyError error) {
    
    }
    });
    requestQueue.add(stringRequest);
    ImageRequest imageRequest=new ImageRequest("http://avatar.csdn.net/4/1/D/1_yueqinglkong.jpg", new Response.Listener<Bitmap>() {
    @Override
    public void onResponse(Bitmap response) {
    imageView.setImageBitmap(response);
    }
    }, 200, 200, ImageView.ScaleType.CENTER, Bitmap.Config.RGB_565, new Response.ErrorListener() {
    @Override
    public void onErrorResponse(VolleyError error) {
    }
    });
    requestQueue.add(imageRequest);
    //另外还有一个JsonRequest用法差不多
    }
    
    }

