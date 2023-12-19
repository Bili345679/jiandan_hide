# jiandan_hide
煎蛋屏蔽，目前支持问答、树洞、随手拍、无聊图四个板块的层主屏蔽，以及吐槽屏蔽

# 安装方法
1.下载并安装[油猴](https://www.tampermonkey.net/)  
2.添加新脚本  
3.把 油猴.js 里面的内容复制全部覆盖到编辑器内  
4.点击 文件->保存，或者ctrl+s  
5.刷新煎蛋  

# 使用方法
简单来说，只要找到屏蔽两个字应该就会用了  
复杂来说：  
1.在每一层的举报选项前会新增一项屏蔽内容作者，点击后可屏蔽该内容作者的内容  
2.在每一层的每一条吐槽的举报选项前增加一项屏蔽吐槽作者，点击后可屏蔽该吐槽作者的吐槽  
3.在页面的右边栏，煎蛋二维码下方，增加 COMMENT作者屏蔽 与 吐槽作者屏蔽 两个模块，点击模块内的 查看被屏蔽的作者列表，可以查看已屏蔽的 内容作者 与 吐槽作者，点击作者昵称前的 移除屏蔽，可以不再作者  

# 问题
1.如果想要同一个用户有内容与吐槽，需要内 该用户的内容 与 该用户的吐槽 各点击一次屏蔽，因为内容屏蔽是根据作者防伪码屏蔽的，而吐槽是根据作者昵称屏蔽的，防伪码屏蔽较为严谨，而吐槽作者没有防伪码信息，所以暂时只能这样  
2.本插件不支持多端同步，之后可能添加屏蔽表导出导入功能，想要再新设备进行屏蔽，需要手动把屏蔽表导入新设备  
3.本插件暂未上传到 [greasyfork](https://greasyfork.org/zh-CN)，之后可能会上传  

如果插件有bug，或者希望增加功能，请在[issues](https://github.com/Bili345679/drag_to_run/issues)提交，如果在煎蛋提交，可能看不到（就算在github提交也不一定看得到，到现在还不知道issues咋用）
