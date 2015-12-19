# 回调机制 #
> 所谓的回调机制，就是A类调用了B类的方法c，然后反过来B类去调用了A类的方法D.举一个比较通俗的例子就是：小王遇到一个很难的例子：1+1=？，所以他决定去问小李，于是向小李打电话问他问题，小李说暂时没有空，等忙完手中的事情就去告诉他。于是小王并没有傻傻的等小李打电话，自己先去逛街了。过了一会小李忙完手中的事，也解决了问题，就打小王的电话，把问题告诉了他。下面有一段代码可以解释：

首先是Callback.java

    package callbackTest;
    /*
     * 这个就是回调方法，相当于D方法
     */
    public interface Callback {
    	void solve(String result);
    }

接下来就是Wang.java

    package callbackTest;
    
    public class Wang implements Callback{
    	private Li li;
    	public Wang(Li li){
    		this.li=li;
    	}
    	public void askQuestion(String question){
    		System.out.println("小王的问题是:"+question);
    		new Thread(new Runnable() {
    			
    			@Override
    			public void run() {
    			
    				li.executeExample(question, Wang.this);
    				//小王在问问题，相当于A类调用了B类的C方法
    			}
    		}).start();
    		play();//模拟小王问完问题后，就去逛街了
    	}
    	private void play() {
    		System.out.println("小王去逛街了");
    	}
    	@Override
    	public void solve(String result) {
    		System.out.println("小王问的问题是"+result);
    	}
    }

接下来Li.java
    
    package callbackTest;
    
    public class Li {
    	public void executeExample(String question,Callback callback){
    		for(int i=0;i<10;i++){
    			System.out.println("小李在做自己的事");
    		}
    		String result="2";
    		callback.solve(result);//相当于类B回调了A类的D方法
    	}
    }
    