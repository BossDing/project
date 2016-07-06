<!--{include file="header.tpl"}-->
<script type="text/javascript" src="js/orderviewpoint.js"></script>
<script type="text/javascript" src="js/order/4pxhandle.js"></script>
<script type="text/javascript">
Ext.onReady(function(){
Ext.QuickTips.init();
var account = [<!--{$allaccount}-->];
var salechannel = [<!--{$Sales_channels}-->];
var shipping = [<!--{$shipping}-->];
var orderstatus = [<!--{$orderstatus}-->];
var ships_account = [<!--{$ships_account}-->];
var user_action = object_Array([<!--{$user_action}-->]);
var templatelist = [<!--{$print_template}-->];
account.push(['0','所有账户']);
salechannel.push(['0','所有渠道']);
	var viewport =Ext.create('Ext.ux.depotmanagerView',{
		headers:[<!--{$fileds}-->],
        fields: ['order_id','print_status','order_status','paid_time','paypalid','ShippingService','eubpdf','sellsrecord','order_sn','currency','order_amount','goods','shipping_id','track_no','stockout_sn','userid','Sales_channels','Sales_account_id','pay_note','consignee','street1','street2','city','state','country','zipcode','tel','note','has_rma','has_msg','has_fbk','size','stock_place','esweight'],
		arrdata:[orderstatus,shipping,salechannel,account],
		step:'4pxhandle',
        action:user_action,
        is_more_ships:[<!--{$is_more_ships_account}-->],
		ships_account:ships_account,
        templatelist:templatelist,
		listURL:'index.php?model=order&action=Get4pxhandle',
		windowTitle:'高级搜索',
		windowWidth:320,
		windowHeight:345,
		pagesize:100
	});
	loadend();
});
</script>
  <div id="north-div"></div>
  <div id="center"></div>
<!--{include file="footer.tpl"}-->
