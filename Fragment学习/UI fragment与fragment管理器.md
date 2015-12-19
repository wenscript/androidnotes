## fragment托管
> fragment本身不能被显示出来，它需要Activity对其进行托管
> fragment托管方式有两种：一种是静态托管、另一种是动态托管，相比较而言，静态托管缺乏灵活性

## 动态托管的步骤
1. 首先，在fragment中应该使用onCreate方法进行初始化，而在onCreateView中进行fragment的组件拼装，同时该方法会返回一个view对象交付给它依附的Activity中
2. 在主Activity中，需要对fragment进行动态托管。第一步是通过getFragmentManager对象，其次通过fragment事务添加将fragment添加进去。片段代码如下：

    
    `FragmentManager fm=getFragmentManager();

    Fragment fragment=fm.findFragmentById(R.id.fragmentContainer);

    if (fragment==null){

      fragment=new CrimeFragment();

      fm.beginTransaction().add(R.id.fragmentContainer,fragment).commit();

    }`