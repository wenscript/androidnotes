> Java的IO机制是通过java.io包下的类和接口来实现的，java的IO总体上可以分为输入流和输出流，而输入和输出流又可以分为字节流和字符流，另外还有一种分类就是节点流和处理流。

# File类 #
> File类是在进行文件处理时比较基础的一个类，这个File类代表的是与平台无关的文件或者目录。这个类主要有以下几个方法。

1. getName()得到这个File类所代表的文件或目录的文件名或目录名。
2. getPath()得到这个File对象的路径名
3. getAbsoluteFile()得到当前File对象的绝对路径的File对象
4. getAbsolutePath()得到当前File对象的决定路径
5. getParent()得到此File对象的上一级目录
6. 一些文件检测方法如：exists()、canWrite()、canRead()、isFile()、isDirectory()，还有List方法可以列出File对象代表的目录的有哪些文件或者目录。下面是两个程序：

FileTest.java:File的基本使用

    package ioTest;
    
    import java.io.File;
    import java.io.IOException;
    /*
     * File类指的可能就是一个目录
     */
    public class FileTest {
    	public void fileTest() throws IOException{
    		File file=new File(".");
    		System.out.println(file.getName());
    		System.out.println(file.getParent());
    		System.out.println(file.getAbsoluteFile());
    		System.out.println(file.getAbsoluteFile().getParentFile());//不能直接得出相对路径的父路径
    		File newFile=new File(System.currentTimeMillis()+"1");
    		newFile.createNewFile();//要想文件存在必须要用这个方法
    		System.out.println(newFile.getName());
    		System.out.println("当前对象是否存在"+newFile.exists());
    		System.out.println(newFile.getAbsoluteFile().getParentFile().getParentFile().getParentFile());
    		File parent=newFile.getAbsoluteFile().getParentFile().getParentFile().getParentFile();
    		String[] fileList=parent.list();
    		for(String s:fileList){
    			System.out.println(s);
    		}
    		File[] files=File.listRoots();//列出系统路径
    		for(File file1:files){
    			System.out.println(file1);
    		}
    	}
    }

FileNameFilterTest.java:过滤文件以pdf结尾的文件：

    package ioTest;
    
    import java.io.File;
    import java.io.FilenameFilter;
    
    public class FileNameFilterTest implements FilenameFilter{
    
    	@Override
    	public boolean accept(File dir, String name) {
    		// TODO Auto-generated method stub
    		return name.endsWith(".pdf")||new File(name).isDirectory();
    	}
    
    }

**另外我们应该注意，windows路径的分隔符是\,但是java中的反斜线是转义字符，因此需要使用\ \来表示。另外java支持将/当作与平台无关的路径分隔符，所以可以直接使用/ **

# Java IO的理解 #
> Java对于IO的处理办法是将这些文件抽象成流的模型，java的流主要分为输入流和输出流InputStream/OutputStream,Reader/Writer。这两组类是所有IO类的抽象基类。因此不能直接使用，需要实现它们子类的对象。从上面可以看出java流还可分为字节流和字符流，它们的操作方法基本是一致的。

FileInputStreamTest.java:InputStream使用范例

    package ioTest;
    
    import java.io.FileInputStream;
    import java.io.FileNotFoundException;
    import java.io.IOException;
    /*
     * Java的IO从大的方面讲可以分为输入流、输出流也就是（InputStream/OutputStream、Reader/Writer）
     * 但是这几个类都是抽象基类，所有的io类都是继承它们的。
     * 从另外一个方面可以分为字符流，字节流，它们的用法差不多，只是一个对字符处理，一个对字节处理
     * 还有分类就是节点流，处理流，简单的判断就是节点流的构造器都是一些物理设备，而处理流的的构造器参数都是节点流
     */
    
    public class FileInputStreamTest {
    	public void test(){
    		try {
    			FileInputStream file=new FileInputStream("E:/hehe.txt");
    			byte[] bb=new byte[1024];
    			int i=0;
    			while((i=file.read(bb))!=-1){
    				System.out.println(new String(bb, 0, i));
    			}
    			
    		} catch (FileNotFoundException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		} catch (IOException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
    	}
    }

OutputStreamTest.java:OutputStream使用范例

    package ioTest;
    
    import java.io.File;
    import java.io.FileInputStream;
    import java.io.FileNotFoundException;
    import java.io.FileOutputStream;
    import java.io.IOException;
    /*
     * 将hehe.txt的内容复制到syw.txt中去
     */
    public class OutputStreamTest {
    	public void test(){
    		try {
    			FileOutputStream out=new FileOutputStream(new File("E:/syw.txt"));
    			FileInputStream in=new FileInputStream(new File("E:/hehe.txt"));
    			StringBuilder builder=new StringBuilder();
    			int bb=0;
    			byte[] temp=new byte[1024];
    			while((bb=in.read(temp))!=-1){
    				out.write(temp, 0, bb);
    			}
    			
    		} catch (FileNotFoundException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		} catch (IOException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
    	}
    }

FileWriter.java:Writer使用范例

    package ioTest;
    
    import java.io.File;
    import java.io.FileNotFoundException;
    import java.io.FileReader;
    import java.io.FileWriter;
    import java.io.IOException;
    
    /*
     * 将hehe.txt的内容复制到syw.txt中去
     * 注意用Writer时需要flush一下，才行
     */
    public class FileWriterTest {
    	public void test(){
    		try {
    			FileReader in=new FileReader("E:/hehe.txt");
    			FileWriter out=new FileWriter("E:/huhu.txt");
    			int bb=0;
    			char[] mchar=new char[40];
    			while((bb=in.read(mchar))!=-1){
    				System.out.print(mchar);
    				
    				out.write(new String(mchar,0,bb));
    				out.flush();
    				out.write("###");
    				out.flush();
    			}
    		} catch (FileNotFoundException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		} catch (IOException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
    		
    	}
    }

FileReader.java:Reader使用范例

    package ioTest;
    
    import java.io.FileNotFoundException;
    import java.io.FileReader;
    import java.io.IOException;
    
    public class FileReaderTest {
    	public void test(){
    		try {
    			FileReader reader=new FileReader("E:/hehe.txt");
    			int bb=0;
    			char[] mchar=new char[60];
    			while((bb=reader.read(mchar))!=-1){
    				System.out.println(new String(mchar, 0, bb));
    			}
    		} catch (FileNotFoundException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		} catch (IOException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
    	}
    }

# 处理流的用法 #
处理流就是对底层的节点流进行处理的高级流处理方式，这种方式让java开发者避免直接处理底层的节点流，判断一个流是否为处理流的方式就是看它的构造器的参数是否是底层的字节流。一些常用的处理流有：BufferedReader、PrintStream。
**注意，使用了处理流封装了底层的节点流后，在结束的时候，只需要关闭上层的处理流，并不需要关闭底层的节点流**

PrintStreamTest.java:演示了如何使用PrintStream类

    package ioTest;
    
    import java.io.FileNotFoundException;
    import java.io.FileOutputStream;
    import java.io.PrintStream;
    
    public class PrintStreamTest {
    	private PrintStream ps;
    	public void test(){
    		try {
    			ps=new PrintStream(new FileOutputStream("E:/syw.txt"));
    			ps.print("jjjjjjjjjjjjjjjjjjjjj");
    			ps.println(new PrintStreamTest());
    		} catch (FileNotFoundException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}finally {
    			ps.close();//对于处理流用完之后，只需要关闭处理流，下层的节点流会自动关闭
    		}
    	}
    }


# 转换流 #
> 另外java还提供两种转换流，InputStreamReader、OutprintStreamWriter,这两种处理流可以把字节流直接转换成字符流。

InputStreamReader.java:演示了转换流

    package ioTest;
    
    import java.io.BufferedReader;
    import java.io.IOException;
    import java.io.InputStreamReader;
    /*
     * BufferedReader有一个readline方法，可以很方便的处理字符串数据
     */
    public class InputStreamReaderTest {
    	public void test(){
    		try {
    			InputStreamReader isr=new InputStreamReader(System.in);
    			BufferedReader br=new BufferedReader(isr);
    			String buffer="";
    			while((buffer=br.readLine())!=null){
    				if(buffer.equals("exit")){
    					System.exit(0);
    				}
    				System.out.println(buffer);
    			}
    		} catch (IOException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
    	}
    }

# 重定向输入输出 #
另外在java中，还可以为标准的输入输出进行重定向。我们知道标准的输入输出指的就是键盘和屏幕，在java使用System.setIn()和System.setOut()方法可以进行重定向

SetoutOrSetIntTest.java:重定向输入输出的范例演示

    package ioTest;
    
    import java.io.FileInputStream;
    import java.io.FileNotFoundException;
    import java.io.FileOutputStream;
    import java.io.PrintStream;
    import java.util.Scanner;
    /*
     * 输入输出重定向只要记住System.setOut和System.setIn方法就行
     */
    public class SetoutOrSetIntTest {
    	public void test(){
    		PrintStream ps;
    		try {
    			ps = new PrintStream(new FileOutputStream("E:/syw.txt"));
    			System.setOut(ps);
    			for(int i=0;i<100;i++){
    				System.out.println(i+"hehe");
    				
    			}
    		} catch (FileNotFoundException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
    	}
    
    	public void test1() {
    		// TODO Auto-generated method stub
    		FileInputStream fis;
    		try {
    			fis = new FileInputStream("E:/hehe.txt");
    			System.setIn(fis);
    			Scanner scanner=new Scanner(System.in);
    			while(scanner.hasNext()){
    				System.out.println("键盘输入的shi"+scanner.next());
    			}
    		} catch (FileNotFoundException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
    	}
    }

# RandomAccessFile #
RandomAccessFile类是java的IO体系中功能最为丰富的类了，它跟一般的IO类大部分用法是相似的，但是这个类是专门用来处理文件内容的类，从该类的名字我们可以看出，这个类可以访问文件的任意地方。RandomAccessFile类允许记录文件的指针，因此它可以在文件的任何位置进行插入或追加内容，对于其记录指针，通过这两个方法：getFilePointer()、seek(),通过这两个方法我们可以准确的知道指针的位置以及移动指针。

RandomAccessFileTest.java:演示了文件的指定位置，读取数据

    package ioTest;
    
    import java.io.FileNotFoundException;
    import java.io.IOException;
    import java.io.RandomAccessFile;
    
    public class RandomAccessFileTest {
    	public void test(){
    		try {
    			RandomAccessFile raf=new RandomAccessFile("E:/hehe.txt","rw");
    			System.out.println("文件的初始化位置"+raf.getFilePointer());
    			raf.seek(300);
    			byte[] b=new byte[1024];
    			int bb=0;
    			while((bb=raf.read(b))>0){
    				System.out.println(new String(b,0,bb));
    			}
    			raf.seek(raf.length());
    			raf.write("I want to fuck you".getBytes());
    		} catch (FileNotFoundException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		} catch (IOException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
    	}
    }
    
**注意，目前来看，RandomAccessFile类依旧不能向文件的任何位置输入内容，如果在文件的中间位置写入内容的话，会将文件原本的内容覆盖掉，因此还需要开发者自己来实现，下面的程序就可以完成**

RandomAccessFileTest1.java:演示了向文件的指定位置写入内容

    package ioTest;
    
    import java.io.BufferedReader;
    import java.io.File;
    import java.io.FileInputStream;
    import java.io.FileNotFoundException;
    import java.io.FileOutputStream;
    import java.io.IOException;
    import java.io.InputStreamReader;
    import java.io.RandomAccessFile;
    import java.io.Reader;
    
    /*
     * 向文件的指定位置，追加文本
     */
    public class RandomAccessFileTest1 {
    	private RandomAccessFile raf;
    	public void test(){
    		try {
    			raf=new RandomAccessFile("E:/hehe.txt","rw");
    			File tmp=File.createTempFile("temp",null);
    			tmp.deleteOnExit();
    			FileInputStream fis=new FileInputStream(tmp);
    			FileOutputStream fos=new FileOutputStream(tmp);
    			System.out.println("目前指针位置"+raf.getFilePointer());
    			raf.seek(300);
    			byte[] b=new byte[1024];
    			int bb=0;
    			while((bb=raf.read(b))>0){
    				fos.write(b, 0, bb);
    			}
    			BufferedReader reader=new BufferedReader(new InputStreamReader(System.in));
    			String s="";
    			while((s=reader.readLine())!=null){
    				raf.seek(300);
    				raf.write(s.getBytes());
    				byte[] mb=new byte[1024];
    				int mbb=0;
    				while((mbb=fis.read(mb))>0){
    					raf.write(mb, 0, mbb);
    				}
    			}
    		} catch (FileNotFoundException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		} catch (IOException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
    	}
    }

# 对象的序列化 #
对象的序列化指的就是将对象转换成字节序列，并保存到磁盘当中。如果一个对象想要进行序列化，那么这个对象的类必须实现Serializable接口，下面是具体的程序：

SerializableTest.java:

    package serizableTest;
    
    import java.io.File;
    import java.io.FileInputStream;
    import java.io.FileNotFoundException;
    import java.io.FileOutputStream;
    import java.io.IOException;
    import java.io.ObjectInputStream;
    import java.io.ObjectOutputStream;
    
    public class SerializableTest {
    	private File file;
    	public void test(){
    		try {
    			file=new File("E:/serializable.txt");
    			file.createNewFile();
    			FileOutputStream fos=new FileOutputStream(file);
    			ObjectOutputStream oos=new ObjectOutputStream(fos);//这个ObjectOutputStream是一个高级的处理流，使用起来很方便
    			Person person=new Person("孙悟空",500);
    			oos.writeObject(person);
    		} catch (IOException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
    	
    		
    	}
    	public void readTest(){
    		FileInputStream fis;
    		try {
    			fis = new FileInputStream(file);
    			ObjectInputStream ois=new ObjectInputStream(fis);
    			Person p=(Person) ois.readObject();
    			System.out.println("name:"+p.getName()+",age:"+p.getAge());
    		} catch (FileNotFoundException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		} catch (IOException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		} catch (ClassNotFoundException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
    	}
    }

Person.java:

    package serizableTest;
    
    import java.io.Serializable;
    
    public class Person implements Serializable{
    	private String name;
    	private int age;
    	public Person(String name,int age){
    		this.name=name;
    		this.age=age;
    		
    	}
    	public String getName() {
    		return name;
    	}
    	public void setName(String name) {
    		this.name = name;
    	}
    	public int getAge() {
    		return age;
    	}
    	public void setAge(int age) {
    		this.age = age;
    	}
    
    }

Test.java:

    package serizableTest;
    
    public class Test {
    	public static void main(String[] args){
    		SerializableTest st=new SerializableTest();
    		st.test();
    		st.readTest();
    	}
    }
    