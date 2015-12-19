# 线程的概述 #
> 一般的程序都顺序运行，但是多线程能就意味着一个程序可能有多个运行次序。

线程与进程的区别：

1. 几乎所有的操作系统都支持进程的概念，操作系统中每一个任务也就对应一个进程，这些进程都是一些独立的关系，它们都拥有自己独立的资源
2. 线程是进程的组成部分，一个进程可以有多个子线程，而一个线程必须要有一个父进程，多个线程可以拥有自己的资源、堆栈，但是这些线程共享其父进程的所有资源。

线程的创建有两种方式：

1. 使用Thread的子类的方法：

ThreadTest.java:示例程序

    package threadTest;
    
    public class ThreadTest extends Thread{
    	private int i=0;
    	@Override
    	public void run() {
    		// TODO Auto-generated method stub
    		super.run();
    		for(;i<100;i++){
    			System.out.println("当前的进程名是:"+getName()+i);
    		}
    		
    	}
    	public static void main(String[] args){
    		for(int i=0;i<100;i++){
    			System.out.println("当前的进程名是:"+Thread.currentThread().getName()+i);
    			if(i==20){
    				new ThreadTest().start();
    				new ThreadTest().start();
    			}
    		}
    	}
    }

2. 使用Runnable方法

Runnable.java:

    package threadTest;
    
    public class RunnableTest implements Runnable {
    	private int i;
    	@Override
    	public void run() {
    		// TODO Auto-generated method stub
    		for(;i<100;i++){
    			System.out.println("当前的线程名是:"+Thread.currentThread()+" "+i);
    		}
    			
    	}
    	public static void main(String[] args){
    		for(int i=0;i<100;i++){
    			System.out.println("当前线程名是:"+Thread.currentThread().getName()+" "+i);
    			if(i==20){
    				new Thread(new RunnableTest(),"新线程1").start();
    				new Thread(new RunnableTest(),"新线程2").start();
    			}
    		}
    	}
    }
# 线程的生命周期 #
> 线程的生命周期一共有五种状态：新建、就绪、运行、阻塞、死亡，这个地方要注意的就是不要对一个已经死亡的线程调用start()方法使它重新启动，死亡就是死亡，该线程不可再作为线程执行。

控制线程：
1. join线程
Thread提供了让一个线程等待另外一个线程完成的方法join方法。当在某个程序执行流中调用其它线程的join方法时，调用线程将会被阻塞，直到被调用的线程执行完为止。

    JoinThreadTest.java:
    
    package threadTest;
    
    public class JoinThreadTest implements Runnable {
    	@Override
    	public void run() {
    		for(int i=0;i<100;i++){
    			System.out.println("当前的进程名:"+Thread.currentThread().getName()+" "+i);
    		}
    	}
    	public static void main(String[] args) throws Exception{
    		new Thread(new JoinThreadTest(),"新线程").start();
    		for(int i=0;i<100;i++){
    			System.out.println("当前的进程名:"+Thread.currentThread().getName()+" "+i);
    			if(i==20){
    				Thread t=new Thread(new JoinThreadTest(),"被join的thread");
    				t.start();
    				t.join();
    			}
    		}
    	}
    
    
    }

