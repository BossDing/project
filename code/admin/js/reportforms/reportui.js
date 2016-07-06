﻿Ext.ux.RmaGrid = Ext.extend(Ext.ux.ComlGrid, {
    initComponent: function() {
        Ext.ux.RmaGrid.superclass.initComponent.call(this);
    },
	createColumns: function() {
        var cols = [new Ext.grid.RowNumberer(),{
						header: '销售量',
						dataIndex: 'order_gross',
						width:60
					},{
						header: '订单量',
						dataIndex: 'good_gross',
						width:60
					}
					];
        this.columns = cols;
    },
	createTbar:function(){
        Ext.ux.RmaGrid.superclass.createTbar.call(this);
		this.tbar=new Array();
		var arr=[
				 {
					xtype:'label',
					text: '开始时间：',
					style:'font-size:12px;font-family:Arial, Helvetica, sans-serif'
				},
				{
					xtype:'datefield',
					name: 'starttime',
					format:'Y-m-d',
					editable: false,
					allowBlank:false,
					blankText:'不能为空',
					invalidText:'格式错误！'
				},
				{
					xtype:'label',
					text: '截止时间：',
					style:'font-size:12px;font-family:Arial, Helvetica, sans-serif'
				},
				{
					xtype:'datefield',
					name: 'endtime',
					format:'Y-m-d',
					editable: false,
					allowBlank:false,
					blankText:'不能为空',
					invalidText:'格式错误！'
				},
				 {
					 text:'查询',
					 xtype:'button',
					 style:'margin-left:20px',
					 pressed:true,
					 handler: this.createScanWin.createDelegate(this)
				 }
				 ];
		var url=this.listURL;
		var form = new Ext.FormPanel({
									 id:'queryform',
									 layout: 'column',
									 columns:3,
									 border:false,
									 items:arr
									 });
		this.tbar.push(form)
	},
	createScanWin:function(){
		var form = Ext.getCmp("queryform").getForm();
		if(form.isValid()) {
			this.getStore().load({
				params:{start:0,limit:this.pagesize,starttime:form.findField('starttime').getValue(),endtime:form.findField('endtime').getValue()}
			});
		}
	},
	onBeforechange : function(_p, _o) {
		var form = Ext.getCmp("queryform").getForm();
		Ext.apply(_o, {
			starttime     : form.findField('starttime').getValue().format('Y-m-d'),
			endtime:form.findField('endtime').getValue().format('Y-m-d')			
		});
		return true;
	}	
});