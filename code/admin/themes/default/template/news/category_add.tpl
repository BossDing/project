<!--{include file="header.tpl"}-->
<script type="text/javascript">
Ext.onReady(function(){
	   Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
     var top=new Ext.FormPanel({
		labelWidth:40,
        bodyStyle:'padding:5px 5px 0',
		frame:true,
		defaults: {width: 175},
		defaultType: 'textfield',
        items: [{
        		id:'nc_caption',
                fieldLabel: '名称',
                allowBlank:false,
<!--{if $info.nc_caption}-->
				value: '<!--{$info.nc_caption}-->',
<!--{/if}-->
                name: 'nc_caption'
            },{
				xtype:'textarea',
                fieldLabel: '说明',
                id:'note',
<!--{if $info.note}-->
				value: '<!--{$info.note}-->',
<!--{/if}-->
                name: 'note'
            },{
				xtype:'combo',
				store: new Ext.data.SimpleStore({
					fields: ["retrunValue", "displayText"],
<!--{if $category}-->
					data: [[0,'无'],<!--{$category}-->]
<!--{else}-->
					data: [[0,'无']]
<!--{/if}-->
				}),
				valueField :"retrunValue",
				displayField: "displayText",
				mode: 'local',
				editable: false,
				forceSelection: true,
				triggerAction: 'all',
				hiddenName:'parent',
				fieldLabel: '父类',
				emptyText:'选择',
				name: 'parent',
<!--{if $info.parent_id}-->
				value: <!--{$info.parent_id}-->
<!--{else}-->
				value: 0
<!--{/if}-->
            },{
				xtype:'hidden',
				name: 'id',
				id:'id',
				value: '<!--{$info.id}-->'
			}],

        buttons: [{
            text: '保存',
				handler:function(){
					if(top.form.isValid()){
						top.form.doAction('submit',{
							 url:'index.php?model=category&action=save',
							 method:'post',
							 params:'',
							 success:function(form,action){
							 	if (!Ext.fly('id').dom.value) top.form.reset();
							 	Ext.example.msg('操作','保存成功!');
							 },
							 failure:function(){
									Ext.example.msg('操作','服务器出现错误请稍后再试！');
							 }
                      });
					}
				}
        },{
            text: '重置',
			handler:function(){top.form.reset();}
        }]
    });
    top.render(document.body);
	loadend();
});</script>

<!--{include file="footer.tpl"}-->