## BillRecords
### 福建商学院2016年校职业技能大赛移动互联网类参赛App项目

## 0x01 概述
 
 “记个账” 是一款轻量级的记账 APP，用户可以根据个人消费情况设置每月的预算。在 软件的首页有很显眼的预算余额显示，以及当天和本月消费的总收支。本软件在记账的时候 可以选择支出/收入的分类，以及从哪一个账户支出/收入，同时还可以为每一笔在账单进行 备注，方便后期查帐。
 
## 0x02 功能
 
 1. 收入/支出多种分类，方便记录不同收支 
 2. 多个帐户，方便记录多种收入支出 * 
 3. 可对每一笔账目进行备注，更加详细的记录消费情况 
 4. 流水账单，方便查帐 
 5. 登录后可以进行账单同步，多设备无缝对接 * 
 6. 用户反馈:提供反馈接口，用户可进行 bug 反馈，建议提交 * 
 7. 记个账社区，用户交流平台 *
 
## 0x03 开发团队: BOOM工作室

#### Cphayim &nbsp;&nbsp;&nbsp;&nbsp; 前端开发工程师 
* 负责用户界面，交互逻辑与本地数据操作的编码，以及前后端联调。
* 前端代码仓库 本仓库
* 个人博客站点: https://cphayim.me
 

#### 迎風别葉index &nbsp;&nbsp;&nbsp;&nbsp; PHP开发工程师 
* 负责该项目服务器端的编码，以及前后端联调，实现同步功能。
* 后端代码仓库 https://github.com/yingfeng-studio/BillRecords_Server
* 个人博客站点: https://yingfeng.me

## 0x04 版本迭代 

### 目前该项目停止更新
---
### Beta 3 (2016.10.30)

v0.3.71
 * Beta 3项目开启，更换了Sass全局UI配色
 * 移除了主界面轮播组件
 
---

### Beta 2 (2016.10.25)

v0.2.63
 * 数据同步上线，点击流水账单界面右上角即可同步。Beta2测试通过，上线

v0.2.57
 * 修复了一个导致编辑界面Tab自动定向失败的Bug

v0.2.56
 * 添加了编辑功能，流水账单界面点击单条记录即可编辑

v0.2.51
 * 完善了图表模块，可以按需动态绘制饼图与柱状图

v0.2.47
 * 图表：饼状分布图功能(当月) 开发完成 

v0.2.45
 * 登录注册模块逻辑重构，前后端数据交互采用更安全的授权码

v0.2.43
 * 添加了图表tab(功能未开发)

v0.2.39
 * 前后端联调解决了一些bug

v0.2.35
 * 完善了"登录/注册"成功后的跳转逻辑
 * "设置"模块重写，完善了"退出登录"功能
 * 流水账单页右上角加入"数据同步"按钮(功能未开发)

v0.2.34
 * 修复了部分Android设备在"沉浸式"下返回主界面"闪白屏"问题

v0.2.32
 * 紧急修复了登录和注册表单因"MD5加密失败"导致的请求阻断问题

v0.2.31
 * 添加了登录和注册模块界面，前后端对接成功

v0.2.28
 * iOS 7+, Android 4.4+ 开启"沉浸式"状态栏
 * 采用预加载技术提高数据载入速度
 * Android 5.0+ 开启硬件加速提高转场动画流畅度

v0.2.22
 * 变更了部分界面样式布局

v0.2.20
 * Beta 2项目开启，更换了全局UI配色

---

### Beta 1 (2016.10.08)

v0.1.16
 * Beta1测试通过，上线
 
v0.1.10
 * 基础模块交互逻辑编码完成
 
v0.1.8
 * 基础界面编码完成
 
v0.1.1
 * 项目启动

