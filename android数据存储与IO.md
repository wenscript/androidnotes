# 1、使用ShareedPreferences #
从用法的角度看，SharedPreferences负责根据key读取数据，而SharedPreferences.Editor则用于写入数据
###SharedPreferences的主要方法有：
* boolean contains(String key)
* Map getALL()
* getXxx(String key,defValue)
###Editor提供的方法：
* putXxx(String key,xxx value)
* commit()

需要注意的是SharedPreferences本身是一个接口，无法创建实例，只能通过Context提供的getSharedPreferences(String name,int mode)来获取实例，mode分为三种：Context.MODE_PRIVATE,Context.MODE_WORLD_READABLE,Context.MODE_WORLD_WRITEABLE
# 2、File存储 #
###Context提供两种方法来打开本应用程序的数据文件夹里的文件I/O流：openFileInput(String name)，openFileOutput(String name,int mode)
     FileOutputStream out=openFileOutput("hehesyw",MODE_APPEND);
     BufferedWriter writer=new BufferedWriter(new OutputStreamWriter(out));
     String ss=writeText.getText().toString();
     Log.d("ssyy",ss);
     writer.write(ss, 0, ss.length() - 1);
     writer.close();

	BufferedReader reader=null;
    StringBuilder builder=new StringBuilder("");
    FileInputStream input=openFileInput("hehesyw");
    reader=new BufferedReader(new InputStreamReader(input));
    String line=null;
    while ((line = reader.readLine()) != null){
         builder.append(line);
			}
         
一定要注意最后一定要关闭资源，否则无法读写。	

####sd卡的读写
    File targetFile=new File(Environment.getExternalStorageDirectory(),FILE_NAME);
    if(Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)){//必须判断
    try {
         FileOutputStream out=new FileOutputStream(targetFile);
         BufferedWriter writer=new BufferedWriter(new OutputStreamWriter(out));
         String s=writeText.getText().toString();
         writer.write(s,0,s.length());
         writer.close();
         } catch (FileNotFoundException e) {
               e.printStackTrace();
         } catch (IOException e) {
                e.printStackTrace();
        }
需要注意权限问题：android.permission.MOUNT_UNMOUNT_FILESYSTEMS、android.permission.WRITE_EXTERNAL_STORAGE

# 对于这部分的练习可以参考android疯狂讲义的p412的文件夹管理器 #
# 3、SQLite数据库 #



