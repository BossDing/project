Ext.ux.showForm=Ext.extend(Ext.FormPanel,{
		initComponent:function(){
			this.frame=true,
			this.autoHeight=true,
			this.buttonAlign='center',
			this.creatItems();
			this.creatButtons();
			Ext.ux.showForm.superclass.initComponent.call(this);
		},
		creatItems:function(){
			var imgGrid=this.imgGrid;
			this.items=[
				{layout:'column',items:[
					{columnWidth:.33,layout:'form',defaultType:'textfield',
					items:[ 
						{xtype:'label', height:200,html:'<div style="width:100%;vertical-align:middle" align="center" height="200"><img width="180" height="180" src="'+(this.good.goods_img?this.good.goods_img:'')+'"/></div>'}]},
					{columnWidth:.66,layout:'form',defaultType:'label',
					items:[
						{fieldLabel:'sku',text:this.good.sku},
						{fieldLabel:'产品名称',text:this.good.goods_name},
						{fieldLabel:'产品连接',html:this.good.goods_url?'<a target="_blank" href="'+this.good.goods_url+'" >'+this.good.goods_url+'</a>':''},
						{fieldLabel:'产品品牌',text:this.good.brand_name},
						{fieldLabel:'所属分类',text:this.good.cat_name},
						{fieldLabel:'产品价格',text:this.good.price},
						{fieldLabel:'产品规格',html:'长：'+this.good.l+'&nbsp;&nbsp;宽：'+this.good.w+'&nbsp;&nbsp;高：'+this.good.h},
						{fieldLabel:'产品重量',html:'净重：'+this.good.suttle+'&nbsp;&nbsp;毛重：'+this.good.weight},
						{fieldLabel:'产品颜色',text:this.good.colors},
						{fieldLabel:'尺码选择',text:this.good.sizes}
						]}
					]},
				(this.action_type==3)?{}:{layout:'form',defaultType:'label',items:[
					{html:'<hr style="color:#FFF" />'},
					{fieldLabel:'产品标题',text:this.good.goods_title},
					{fieldLabel:'产品属性',text:this.good.goods_attribute},
					{fieldLabel:'产品简述',text:this.good.resume},
					{fieldLabel:'产品描述',html:this.good.depict},
					{fieldLabel:'备注',text:this.good.comment},
					{html:'<br />'}
					]},
				{layout:'form',defaultType:'label',items:[imgGrid,{html:'<br />'},
					this.good.goods_audit?{fieldLabel:'已审意见',html:this.good.goods_audit}:{}]},
				{layout:'form',items:[
					{layout:'form',defaultType:'combo',
						items:[{xtype:'label',html:'<br />'},{
							store:new Ext.data.SimpleStore({fields:["id","key_type"],data:this.action_type==6?[[0,'审核通过'],[1,'审核信息失败'],[2,'审核图片失败'],[3,'审核描述失败']]:[[0,'审核通过'],[1,'审核失败']]}),
							valueField:"id",
							displayField:"key_type",mode:'local',
							width:200,
							editable:false,
							forceSelection:true,
							triggerAction:'all',
							hiddenName:'audit_status',
							name:'audit_status',
							value:0,
							allowBlank:false,
							fieldLabel:'审核状态'}]},
					{layout:'form',defaultType:'textarea',items:[
					{fieldLabel:'审核意见',id:'audit_advice',width:400,height:50}
					]}]}
				];
		},
		creatButtons:function(){
			this.buttons=[{text:'审核',type:'submit',handler:this.formsave.createDelegate(this)},
						  {text:'重置',handler:this.formreset.createDelegate(this)}];},
		formsave:function(){
			if(this.getForm().isValid()){
				this.getForm().submit({
					url:'index.php?model=newProduct&action=AuditGoods',
					waitMsg:'正在审核产品资料',
					params:{
						action_type:this.action_type,
						goods_id:this.good.goods_id,
						type:this.type
						},
					method:'post',success:function(form,action){
						if(action.result.success){
							Ext.example.msg('MSG','产品审核成功');
							if(this.action_type==6){
								//确认与系统对接产品的方式。							//window.location.href='index.php?model=newProduct&action=addProduct&goods_id='+action.result.msg;
							}
						}else{
							Ext.Msg.alert('产品审核提交失败',action.result.msg);
						}
					},
					failure:function(form,action){
						Ext.Msg.alert('产品审核提交失败',action.result.msg);
					}});
			}else{
				Ext.example.msg('ERROR','请正确完成表单内容');
			}
		},
		formreset:function(){
			this.form.reset();
		},
		formsubmit:function(){
			Ext.fly('status').dom.value=2;
			this.formsave();
		}
});