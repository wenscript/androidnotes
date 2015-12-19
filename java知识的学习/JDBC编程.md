##MySQL数据库与JDBC编程
###SQL语法
> 数据库语法总体上分为三种:DDL,DML,DCL,查询语句，事务控制语句

Mysql的基本命令：

    show databases;//查看当前实例下有多少数据库
	drop database 数据库名;//删除指定的数据库
	create database 数据库名;//创建数据库
	use 数据库名;//连接某个数据库
	show tables;//在连接进某个数据库后，查看它包含多少数据表
	desc 表名;//查看数据表的结构

DDL语句
> DDL是Data Definition Language的简称，主要通过create、drop、alter来操作数据库对象

下面是一个建表语句的范例：

    create table test
	(
		test_id int,
		test_price decimal,
		test_name varchar(255) default 'xxx',
		test_desc text,
		test_img blob,
		test_date datetime
	);

下面是一些修改表结构的例子：

    alter table hehe
	add hehe_id int;#向hehe表中增加一个hehe_id列
	alter table hehe
	add
	(
		aaa varchar(255),
		bbb varchar(255)
	);#向表中同时增加aaa、bbb
	alter table hehe
	modify hehe_id varchar(255);#将hehe中的hehe_id字段的列定义修改为varchar(255)
	alter table hehe
	drop aaa;#删除aaa字段
	drop table hehe;#删除数据表，将其中所有的数据和表结构一齐删除
	truncate hehe;#只删除数据，但是不会删除表结构

**数据库约束**
> 大部分数据库支持下面的五种约束：NOT NULL、UNIQUE、PRIMARY KEY、FOREIGN KEY、CHECK

- NOT NULL
> 用于确保指定列不允许为空，与java类似，null不等于空字符，也不等于0

建表语句如下：

    create table hehe
	(
		hehe_id int not null,
		hehe_name varchar(255),
		hehe_gender varchar(2)
	);
- UNIQUE
> 唯一约束用于保证指定列或指定列组合不允许出现重复值。

    create table hehe
	(
		hehe_id int,
		hehe_name varchar(255) unique,
		hehe_gender varchar(2)
	);

如果想为多个列进行组合约束，或者指定约束名，则需要表级约束法

    create table hehe
	(
		hehe_id int,
		hehe_name varchar(255),
		hehe_gender varchar(2),
		unique(hehe_name),#使用表级约束法，建立唯一约束
		constraint hehe_uk unique(hehe_name)#使用表级约束法，建立唯一约束,并指定约束名
	);
	create table hehe
	(
		hehe_id int,
		hehe_name varchar(255),
		hehe_gender varchar(2),
		constraint hehe_uk1(hehe_name,hehe_gender)#hehe_name和hehe_gender的组合不能重复
	);

- PRIMARY KEY
> 这个primary key其实相当于同时满足not null和unique，因此也叫主键约束。

一个常用的例子如下：

    create table hehe
	(
		hehe_id int auto_increment primary key
	);


**DML语句**
> DML语句主要就是insert into,update,delete from这三个命令组成

- insert into

使用的范例如下：

    insert into hehe
	values('ddd',13,'nanjing',null);

- update

使用的范例如下:

    update hehe
	set hehe_name='ddd'
	where hehe_id>1;

- delete from

使用的范例如下:

    delete from hehe
	where hehe_id>10;#删除hehe表中hehe_id>10的记录


**查询语句**
	
直接看例子吧：

    select hehe_name 
	from hehe
	where hehe_id>90;#从hehe表中查询hehe_id大于90的hehe_name列的数据
	select * from hehe;#查询所有的数据		
	
基本的sql语句我们已经过了一遍，现在我们可以进行JDBC的学习了。

**JDBC编程**

在JDBC编程中主要有这么几个常用的类

1. DriverManager，主要用来管理JDBC的驱动服务类，主要的方法有getConnection(),该方法获得对于url数据库的连接
2. Connection,代表数据库连接对象,主要的方法有createStatement(),prepareStateMent,prepareCall
3. Statement,用于执行数据库的工具接口，主要的方法有executeQuery(用于执行查询语句)，executeUpdate(用于执行DDL、DML语句)，execute(可以执行任何语句)
4. ResultSet，结果集对象，它的主要方法有absolute、first、previous、next、last

JDBC的编程步骤：

直接看下面的实例吧：

    package mysqlTest;
    
    import java.sql.Connection;
    import java.sql.DriverManager;
    import java.sql.ResultSet;
    import java.sql.Statement;
    
    /*
     * JDBC编程的操作步骤大致分为以下五步:
     * 1、加载数据库驱动
     * 2、通过DriverManager获取数据库连接
     * 3、通过Connection获得Statement对象
     * 4、操作结果集
     * 5、回收数据库资源
     */
    
    public class ConnMySql {
    	public static void main(String[] args) throws Exception{
    		Class.forName("com.mysql.jdbc.Driver");//mysql就是这么写
    		try{
    			Connection conn=DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/sywtest", "root", "syw1992");
    			Statement statement=conn.createStatement();
    			ResultSet set=statement.executeQuery("select * from hehe1");
    			while(set.next()){
    				System.out.println(set.getString(1)+"\t"+set.getInt(2)+"\t"+set.getString(3)+"\t"+set.getInt(4));
    			}
    		}finally{
    			
    		}
    	}
    }

使用executeUpdate方法执行DDL和DML语句

    package mysqlTest;
    
    import java.sql.Connection;
    import java.sql.DriverManager;
    import java.sql.Statement;
    
    public class ExecuteUpdateTest {
    	public static void main(String[] args) throws Exception{
    		Class.forName("com.mysql.jdbc.Driver");
    		try{
    			Connection conn= DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/sywtest","root","syw1992");
    			Statement statement=conn.createStatement();
    			statement.executeUpdate("create table hehe2 "+
    			"( name varchar(255), "+"age int, "+"address varchar(255), "+"hehe2_id int auto_increment primary key);");
    			System.out.println("djjew");
    			for(int i=0;i<100;i++){
    				statement.executeUpdate("insert into hehe2 "+" values('syw',"+i+",'nanjing',null)");
    				
    			}
    		}finally{
    			
    		}
    	}
    }

使用execute方法执行SQL语句

    package mysqlTest;
    
    import java.sql.Connection;
    import java.sql.DriverManager;
    import java.sql.ResultSet;
    import java.sql.ResultSetMetaData;
    import java.sql.Statement;
    
    public class ExecuteTest {
    	public static void main(String[] args) throws Exception{
    		Class.forName("com.mysql.jdbc.Driver");
    		try{
    			Connection conn=DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/sywtest","root","syw1992");
    			Statement state=conn.createStatement();
    			state.execute("drop table if exists hehe2");
    			System.out.println("hehe2删除成功");
    			boolean flag=state.execute("create table hehe2"+" (name varchar(255), "
    			+"age int, "+"address varchar(255), "+"hehe2_id int auto_increment primary key);");
    			if(flag){
    				System.out.println("该条语句影响的语句条数:"+state.getUpdateCount());
    			}
    			for(int i=0;i<100;i++){
    			boolean flag1=state.execute("insert into hehe2 "+" values('syw',"+i+",'nanjing',null)");
    			}
    			System.out.println("数据添加成功");
    			boolean flag2=state.execute("select * from hehe2;");
    			if(flag2){
    				ResultSet result=state.getResultSet();
    				ResultSetMetaData rsmd=result.getMetaData();
    				int column=rsmd.getColumnCount();
    				while(result.next()){
    					for(int j=1;j<=column;j++){
    						System.out.println(result.getString(j)+"\t");
    					}
    				}
    			}
    		}finally{
    			
    		}
    	}
    }

使用PrepareStatement执行SQL语句

    package mysqlTest;
    
    import java.sql.Connection;
    import java.sql.DriverManager;
    import java.sql.PreparedStatement;
    
    public class PrepareStatementTest {
    	public static void main(String[] args) throws Exception{
    		Class.forName("com.mysql.jdbc.Driver");
    		try{
    			Connection conn=DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/sywtest","root","syw1992");
    			PreparedStatement ps=conn.prepareStatement("insert into hehe2 values(?,?,'Beijing',null);");
    			for(int i=0;i<100;i++){
    				ps.setString(1, "syw"+i);//当中的Index指的是第几个？
    				ps.setInt(2,i);
    				ps.executeUpdate();
    			}
    			System.out.println("添加成功");
    		}finally{
    			
    		}
    	}
    }




































































