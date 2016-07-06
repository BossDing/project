/**
 * The Preview enables you to show a configurable preview of a record.
 *
 * This plugin assumes that it has control over the features used for this
 * particular grid section and may conflict with other plugins.
 */
Ext.define('Ext.ux.PreviewPlugin', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.preview',
    requires: ['Ext.grid.feature.RowBody', 'Ext.grid.feature.RowWrap'],
    
    // private, css class to use to hide the body
    hideBodyCls: 'x-grid-row-body-hidden',
    
    /**
     * @cfg {String} bodyField
     * Field to display in the preview. Must be a field within the Model definition
     * that the store is using.
     */
    bodyField: '',
    
    /**
     * @cfg {Boolean} previewExpanded
     */
    previewExpanded: true,
    
    setCmp: function(grid) {
        this.callParent(arguments);
        
        var bodyField   = this.bodyField,
            hideBodyCls = this.hideBodyCls,
            features    = [{
                ftype: 'rowbody',
                getAdditionalData: function(data, idx, record, orig, view) {
                    var getAdditionalData = Ext.grid.feature.RowBody.prototype.getAdditionalData,
                        additionalData = {
                            rowBody: data[bodyField],
                            rowBodyCls: grid.previewExpanded ? '' : hideBodyCls
                        };
                        
                    if (getAdditionalData) {
                        Ext.apply(additionalData, getAdditionalData.apply(this, arguments));
                    }
                    return additionalData;
                }
            }, {
                ftype: 'rowwrap'
            }];
        
        grid.previewExpanded = this.previewExpanded;
        if (!grid.features) {
            grid.features = [];
        }
        grid.features = features.concat(grid.features);
    },
    
    /**
     * Toggle between the preview being expanded/hidden
     * @param {Boolean} expanded Pass true to expand the record and false to not show the preview.
     */
    toggleExpanded: function(expanded) {
        var view = this.getCmp();
        this.previewExpanded = view.previewExpanded = expanded;
        view.refresh();
    }
});   
/**
 * @class FeedViewer.FeedPost
 * @extends Ext.panel.Panel
 *
 * Shows the detail of a feed post
 *
 * @constructor
 * Create a new Feed Post
 * @param {Object} config The config object
 */
Ext.define('FeedViewer.FeedPost', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.feedpost',
    cls: 'preview',
    autoScroll: true,
    border: true,
    
    initComponent: function(){
        Ext.apply(this, {
            dockedItems: [this.createToolbar()],
            tpl: Ext.create('Ext.XTemplate',
                '<div class="post-data" style="width:70%">',
                    '<span class="post-date">{pubDate}   by {author:this.defaultValue}</span></span>',
                    '<h3 class="post-title">{title}</h3>',
                '</div>',
                '<div class="post-body">{content:this.getBody}</div>',
                {
                    getBody: function(value, all){
                        return Ext.util.Format.stripScripts(value);
                    },

                    defaultValue: function(v){
                        return v ? v : 'Unknown';
                    },

                    formatDate: function(value){
                        if (!value) {
                            return '';
                        }
                        return Ext.Date.format(value, 'M j, Y, g:i a');
                    }
                }
             )
        });
        this.callParent(arguments);
    },

    /**
     * Set the active post
     * @param {Ext.data.Model} rec The record
     */
    setActive: function(rec) {
        var me = this,
            gotoButton = me.down('button[text=打开订单页面]');

        me.active = rec;
        me.update(rec.data);
        gotoButton.setHref(rec.get('link'));
    },

    /**
     * Create the top toolbar
     * @private
     * @return {Ext.toolbar.Toolbar} toolbar
     */
       createToolbar: function(){
        var items = [],
            config = {};
        if (!this.inTab) {
            items.push({
                scope: this,
                handler: this.openTab,
                text: '新窗口打开',
                iconCls: 'tab-new'
            }, '-');
        }
        else {
            config.cls = 'x-docked-noborder-top';
        }
        items.push({
            href: this.inTab ? this.data.url : '#',
            target: '_blank',
            text: '打开订单页面',
            iconCls: 'post-go'
        });
        config.items = items;
        return Ext.create('widget.toolbar', config);
    },

    /**
     * Navigate to the active post in a new window
     * @private
     */
    goToPost: function(){
        window.open(this.active.get('link'));
    },

    /**
     * Open the post in a new tab
     * @private
     */
    openTab: function(){
        this.fireEvent('opentab', this, this.active);
    }

});

 

function markAliMsg(read,orderid,account_id,index){
    if(read=='1')return false;
    var store = Ext.getCmp('grd').getStore();                         
    Ext.Ajax.request({
        url:'index.php?model=aliexpress&action=MarkMsgali',
        success:function(response){       
        var res = Ext.decode(response.responseText);
            if(res.success){
                Ext.example.msg('提示',res.msg);
                var feedgrid = new FeedViewer.FeedGrid();
                
                feedgrid.onRowDblClick();
                //document.getElementById('img'+orderid).src="js/feed-viewer/images/msg_readed.png";
                store.load();
            }
        },
        params:{id:account_id,orderId:orderid}             
    });    
}

Ext.define('FeedViewer.FeedGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.feedgrid',
    initComponent: function(){
        this.addEvents(  
            'rowdblclick',   
            'select'
        );
        var stroe = Ext.create('Ext.data.Store', {
            model: 'FeedItem',
            sortInfo: {
                property: 'message_id',
                direction: 'DESC'
            },
            proxy: {
                type: 'ajax',
                url: 'index.php?model=aliexpress&action=getMessageList',
                reader: {
                        type: 'json',
                        totalProperty: 'totalCount',
                        idProperty: 'message_id',
                        root: 'topics'
                },
                listeners: {
                    exception: this.onProxyException,
                    scope: this
                }
            },
            listeners: {
                load: this.onLoad,
                scope: this
            }
        });
        
       
        /*this.feedPanel = Ext.create('widget.feedpanel', {
            region: 'west',
            collapsible: true,
            width: 225,
            //floatable: false,
            split: true,
            minWidth: 175,
            feeds: [{
                title: '未读订单留言(5)',
                url: 'index.php?model=aliexpress&action=getMessageList&readed=0&type=order'
            },{
                title: '所有订单留言(1125)',
                url: 'index.php?model=aliexpress&action=getMessageList&type=order&readed=1'
            },{
                title: '未读站内信',
                url: 'index.php?model=aliexpress&action=getMessageList&type=msg&readed=0'
            },  {
                title: '所有站内信',
                url: 'index.php?model=aliexpress&action=getMessageList&type=msg&readed=1'
            }],
            listeners: {
                scope: this,
                feedselect: this.onFeedSelect
            }
        });
        return this.feedPanel;*/
        var sm = Ext.create('Ext.selection.CheckboxModel', {});
        
        Ext.apply(this, {
            cls: 'feed-grid',
            id:'grd',
            store: stroe,
            viewConfig: {
                itemId: 'view',
                plugins: [{
                    pluginId: 'preview',
                    ptype: 'preview',
                    bodyField: 'description',
                    expanded: true
                }],
                listeners: {
                    scope: this,
                    itemdblclick: this.onRowDblClick
                }
            },
            columns: [{
                text: '内容',
                dataIndex: 'title',
                flex: 1,
                renderer: this.formatTitle
            }, {
                text: '所属帐号',
                dataIndex: 'account_name',
                hidden: true,
                width: 160

            }, {
                text: '最后回复时间',
                dataIndex: 'pubDate',
                //renderer: this.formatDate,
                width: 230
            }],
            bbar:Ext.create('Ext.toolbar.Paging', {
                plugins: new Ext.ui.plugins.ComboPageSize(),
                pageSize: 25,
                displayInfo: true,
                displayMsg: '第{0} 到 {1} 条数据 共{2}条',
                emptyMsg: "没有数据",
                store: stroe,
                items:[
                    {
                        scope: this,
                        handler: this.openTab,
                        text: '批量模版回复',
                        iconCls: 'tab-new'
                    }, '-'
                ]   
            }),
            selModel: sm,
        }
        );
        this.callParent(arguments);
        this.on('selectionchange', this.onSelect, this);
    },

        /**
     * Reacts to a double click
     * @private
     * @param {Object} view The view
     * @param {Object} index The row index
     */
    onRowDblClick: function(view, record, item, index, e) {
        //this.store.getAt(index).get('message_id');
        this.fireEvent('rowdblclick', this, this.store.getAt(index));
    },


    /**
     * React to a grid item being selected
     * @private
     * @param {Ext.model.Selection} model The selection model
     * @param {Array} selections An array of selections
     */
    onSelect: function(model, selections){
        var selected = selections[0];
        if (selected) {
            this.fireEvent('select', this, selected);
        }
    },

    /**
     * Listens for the store loading
     * @private
     */
    onLoad: function(store, records, success) {
        if (this.getStore().getCount()) {
            this.getSelectionModel().select(0);
        }
    },

    /**
     * Listen for proxy eerrors.
     */
    onProxyException: function(proxy, response, operation) {
        Ext.Msg.alert("Error with data from server", operation.error);
        this.view.el.update('');
        
        // Update the detail view with a dummy empty record
        this.fireEvent('select', this, {data:{}});
    },

    /**
     * Instructs the grid to load a new feed
     * @param {String} url The url to load
     */
    loadFeed: function(url){
        var store = this.store;
        store.getProxy().extraParams.feed = url;
        store.load();
    },

    /**
     * Title renderer
     * @private
     */
    formatTitle: function(value, p, record,index){ 
        var check_read = record.get('readed');
        var img = 'msg_read.png';
        var me = this;
        var evenclick = '';
        var store = this.store;
        if(check_read == '1')img = 'msg_readed.png';
        var mid = record.get('message_id'); 
        var str = Ext.String.format('<div class="topic"><span id="'+mid+'"  class="TipDiv" data-qtip="双击快速回复" data-qtitle="提示" style="cursor:pointer;float:left;margin-right:10px"><img id="img'+record.get('orderId')+'" src="js/feed-viewer/images/'+img+'" /></span> <b>{0}</b></div>', value, record.get('author') || "Unknown");
        
        return str;
    },

    /**
     * Date renderer
     * @private
     */
    formatDate: function(date){
        if (!date) {
            return '';
        }

        var now = new Date(), d = Ext.Date.clearTime(now, true), notime = Ext.Date.clearTime(date, true).getTime();

        if (notime === d.getTime()) {
            return 'Today ' + Ext.Date.format(date, 'g:i a');
        }

        d = Ext.Date.add(d, 'd', -6);
        if (d.getTime() <= notime) {
            return Ext.Date.format(date, 'D g:i a');
        }
        return Ext.Date.format(date, 'Y/m/d g:i a');
    },
    test:function(i){
        alert(i);
    }
});

 /**
 * @class FeedViewer.FeedInfo
 * @extends Ext.tab.Panel
 *
 * A container class for showing a series of feed details
 * 
 * @constructor
 * Create a new Feed Info
 * @param {Object} config The config object
 */
Ext.define('FeedViewer.FeedInfo', {
    
    extend: 'Ext.tab.Panel',
    alias: 'widget.feedinfo',
    
    maxTabWidth: 230,
    border: false,

    initComponent: function() {
        this.tabBar = {
            border: true
        };
        
        this.callParent();
    },
    
    /**
     * Add a new feed
     * @param {String} title The title of the feed
     * @param {String} url The url of the feed
     */
    addFeed: function(title, url){
        var active = this.items.first();
        if (!active) {
            active = this.add({
                xtype: 'feeddetail',
                title: title,
                url: url,
                closable: false,
                listeners: {
                    scope: this,
                    opentab: this.onTabOpen,
                    openall: this.onOpenAll,
                    rowdblclick: this.onRowDblClick
                }
            });
        } else {
            active.loadFeed(url);
            active.tab.setText(title);
        }
        this.setActiveTab(active);
    },
    
    /**
     * Listens for a new tab request
     * @private
     * @param {FeedViewer.FeedPost} The post
     * @param {Ext.data.Model} model The model
     */
    onTabOpen: function(post, rec) {
        var items = [],
            item,
            title;
            
        if (Ext.isArray(rec)) {
            Ext.each(rec, function(rec) {
                title = rec.get('title');
                if (!this.getTabByTitle(title)) {
                    items.push({
                        inTab: true,
                        xtype: 'feedpost',
                        title: title,
                        closable: true,
                        data: rec.data,
                        active: rec
                    });
                }
            }, this);
            this.add(items);
        }
        else {
            title = rec.get('title');
            item = this.getTabByTitle(title);
            if (!item) {
                item = this.add({
                    inTab: true,
                    xtype: 'feedpost',
                    title: title,
                    closable: true,
                    data: rec.data,
                    active: rec
                });
            }
            this.setActiveTab(item);
        }
    },

    /**
     * Find a tab by title
     * @param {String} title The title of the tab
     * @return {Ext.Component} The panel matching the title. null if not found.
     */
    getTabByTitle: function(title) {
        var index = this.items.findIndex('title', title);
        return (index < 0) ? null : this.items.getAt(index);
    },
    
    /**
     * Listens for a row dblclick
     * @private
     * @param {FeedViewer.Detail} detail The detail
     * @param {Ext.data.Model} model The model
     */
    onRowDblClick: function(info, rec){
        this.onTabOpen(null, rec);
    },
    
    /**
     * Listens for the open all click
     * @private
     * @param {FeedViewer.FeedDetail}
     */
    onOpenAll: function(detail) {
        this.onTabOpen(null, detail.getFeedData());
    }
});



/**
 * @class FeedViewer.FeedPanel
 * @extends Ext.panel.Panel
 *
 * Shows a list of available feeds. Also has the ability to add/remove and load feeds.
 *
 * @constructor
 * Create a new Feed Panel
 * @param {Object} config The config object
 */

Ext.define('FeedViewer.FeedPanel', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.feedpanel',

    animCollapse: true,
    layout: 'fit',
    title: 'Messages',   

    initComponent: function(){
        Ext.apply(this, {
            items: this.createView(),
            dockedItems: this.createToolbar()
        });
        this.createMenu();
        this.addEvents(
            /**
             * @event feedremove Fired when a feed is removed
             * @param {FeedPanel} this
             * @param {String} title The title of the feed
             * @param {String} url The url of the feed
             */
            'feedremove',

            /**
             * @event feedselect Fired when a feed is selected
             * @param {FeedPanel} this
             * @param {String} title The title of the feed
             * @param {String} url The url of the feed
             */
            'feedselect'
        );

        this.callParent(arguments);
    },

    /**
     * Create the DataView to be used for the feed list.
     * @private
     * @return {Ext.view.View}
     */
    createView: function(){
        this.view = Ext.create('widget.dataview', {
            autoScroll: true,
            store: Ext.create('Ext.data.Store', {
                model: 'Feed',
                data: this.feeds
            }),
            selModel: {
                mode: 'SINGLE',
                listeners: {
                    scope: this,
                    selectionchange: this.onSelectionChange
                }
            },
            listeners: {
                scope: this,
                contextmenu: this.onContextMenu,
                viewready: this.onViewReady
            },
            trackOver: true,
            cls: 'feed-list',
            itemSelector: '.feed-list-item',
            overItemCls: 'feed-list-item-hover',
            tpl: '<tpl for="."><div class="feed-list-item">{title}</div></tpl>'
        });
        return this.view;
    },

    onViewReady: function(){
        this.view.getSelectionModel().select(this.view.store.first());
    },

    /**
     * Creates the toolbar to be used for controlling feeds.
     * @private
     * @return {Ext.toolbar.Toolbar}
     */
    createToolbar: function(){
        this.createActions();
        replace = function(config, name) {
                    var btns = Ext.getCmp('btns');
                    if (name && name != currentName) {
                        currentName = name;
                        if (btns.items.length) {
                            btns.remove(0, false);
                        } else {
                            btns.body.innerHTML = '';
                        }
                        config.border = false,
                        panel = panelCache[name] || (panelCache[name] = Ext.widget('panel', config));
                        btns.add(panel);
                    }
                };
        this.toolbar = Ext.create('widget.toolbar', {
            items: [
             
            this.addAction, this.removeAction]
        });
        return this.toolbar;
    },

    /**
     * Create actions to share between toolbar and menu
     * @private
     */
      createActions: function(){
        this.addAction = Ext.create('Ext.Action', {
            scope: this,                 
            handler: this.onAddFeedClick,
            text: '写信',
            iconCls: ''
        });

        this.removeAction = Ext.create('Ext.Action', {
            itemId: 'remove',
            scope: this,
            handler: this.onRemoveFeedClick,
            text: '标记已读',
            iconCls: ''
        });
    },

    /**
     * Create the context menu
     * @private
     */
    createMenu: function(){
        this.menu = Ext.create('widget.menu', {
            items: [{
                scope: this,
                handler: this.onLoadClick,
                text: 'Load feed',
                iconCls: 'feed-load'
            }, this.removeAction, '-', this.addAction
            ,{text:'ihihihi'}
            ],
            listeners: {
                hide: function(c){
                    c.activeFeed = null;
                }
            }
        });
    },

    /**
     * Used when view selection changes so we can disable toolbar buttons.
     * @private
     */
    onSelectionChange: function(){
        var selected = this.getSelectedItem();             
        this.toolbar.getComponent('remove').setDisabled(!selected);
        if (selected) {
            this.loadFeed(selected);
        }
    },

    /**
     * React to the load feed menu click.
     * @private
     */
    onLoadClick: function(){
        this.loadFeed(this.menu.activeFeed);
    },

    /**
     * Loads a feed.
     * @private
     * @param {Ext.data.Model} rec The feed
     */
    loadFeed: function(rec){
        if (rec) {
            
            //Ext.getCmp('grd').getProxy().url = rec.get('url');
            //Ext.getCmp('grd').getStore().load();
            this.fireEvent('feedselect', this, rec.get('title'), rec.get('url'));
        }
    },

    /**
     * Gets the currently selected record in the view.
     * @private
     * @return {Ext.data.Model} Returns the selected model. false if nothing is selected.
     */
    getSelectedItem: function(){
        return this.view.getSelectionModel().getSelection()[0] || false;
    },

    /**
     * Listens for the context menu event on the view
     * @private
     */
    onContextMenu: function(view, index, el, event){
        var menu = this.menu;

        event.stopEvent();
        menu.activeFeed = view.store.getAt(index);
        menu.showAt(event.getXY());
    },

    /**
     * React to a feed being removed
     * @private
     */
    onRemoveFeedClick: function() {
        var active = this.menu.activeFeed || this.getSelectedItem();


        if (active) {
            this.view.getSelectionModel().deselectAll();
            this.animateNode(this.view.getNode(active), 1, 0, {
                scope: this,
                afteranimate: function() {
                    this.view.store.remove(active);
                    
                }
            });
            this.fireEvent('feedremove', this, active.get('title'), active.get('url'));
        }
    },

    /**
     * React to a feed attempting to be added
     * @private
     */
    onAddFeedClick: function(){
        var win = this.addFeedWindow || (this.addFeedWindow = Ext.create('widget.feedwindow', {
            listeners: {
                scope: this,
                feedvalid: this.onFeedValid
            }
        }));
        win.form.getForm().reset();
        win.show();
    },

    /**
     * React to a validation on a feed passing
     * @private
     * @param {FeedViewer.FeedWindow} win
     * @param {String} title The title of the feed
     * @param {String} url The url of the feed
     */
    onFeedValid: function(win, title, url){
        var view = this.view,
            store = view.store,
            rec;

        rec = store.add({
            url: url,
            title: title
        })[0];
        this.animateNode(view.getNode(rec), 0, 1);
    },

    /**
     * Animate a node in the view when it is added/removed
     * @private
     * @param {Mixed} el The element to animate
     * @param {Number} start The start opacity
     * @param {Number} end The end opacity
     * @param {Object} listeners (optional) Any listeners
     */
    animateNode: function(el, start, end, listeners){
        Ext.create('Ext.fx.Anim', {
            target: Ext.get(el),
            duration: 500,
            from: {
                opacity: start
            },
            to: {
                opacity: end
            },
            listeners: listeners
         });
    },

    // Inherit docs
    onDestroy: function(){
        this.callParent(arguments);
        this.menu.destroy();
    }
});







/**
 * @class FeedViewer.FeedViewer
 * @extends Ext.container.Viewport
 *
 * The main FeedViewer application
 * 
 * @constructor
 * Create a new Feed Viewer app
 * @param {Object} config The config object
 */ 
/**
 * @class FeedViewer.FeedWindow
 * @extends Ext.window.Window
 *
 * Shows a dialog for creating and validating a new feed.
 * 
 * @constructor
 * Create a new Feed Window
 * @param {Object} config The config object
 */

Ext.define('FeedViewer.FeedWindow', {
    extend: 'Ext.window.Window',
    
    alias: 'widget.feedwindow',

    plain: true,
    resizable: false,
    modal: true,
    closeAction: 'hide',
    defaultFocus: '#feed',

    defaultFeeds: [
        ['http://rss.cnn.com/rss/edition.rss', 'CNN Top Stories'],
        ['http://sports.espn.go.com/espn/rss/news', 'ESPN Top News'],
        ['http://news.google.com/news?ned=us&topic=t&output=rss', 'Sci/Tech - Google News'],
        ['http://rss.news.yahoo.com/rss/software', 'Yahoo Software News']
    ],
    
    initComponent: function(){
        var me = this;
        me.addEvents(
            /**
             * @event feedvalid
             * @param {FeedViewer.FeedWindow} this
             * @param {String} title
             * @param {String} url
             * @param {String} description
             */
            'feedvalid'
        );
        
        me.form = Ext.create('widget.form', {
            bodyPadding: '12 10 10',
            border: false,
            unstyled: true,
            items: [{
                anchor: '100%',
                itemId: 'feed',
                fieldLabel: 'Enter the URL of the feed to add',
                labelAlign: 'top',
                msgTarget: 'under',
                xtype: 'combo',
                store: this.defaultFeeds,
                getInnerTpl: function(){
                    return '<div class="feed-picker-url">{field1}</div><div class="feed-picker-title">{field2}</div>'; 
                }
            }]
        });
        Ext.apply(me, {
            width: 500,
            title: 'Add Feed',
            iconCls: 'feed',
            layout: 'fit',
            items: me.form,
            buttons: [{
                xtype: 'button',
                text: 'Add Feed',
                scope: me,
                handler: me.onAddClick
            }, {
                xtype: 'button',
                text: 'Cancel',
                scope: me,
                handler: me.doHide
            }]
        });
        me.callParent(arguments);
    },
    
    doHide: function(){
        this.hide();
    },
    
    /**
     * React to the add button being clicked.
     * @private
     */
    onAddClick: function(addBtn) {
        addBtn.disable();
        var url = this.form.getComponent('feed').getValue();
        this.form.setLoading({
            msg: 'Validating feed...'
        });
        Ext.Ajax.request({
            url: 'js/feed-viewer/feed-proxy.php',
            params: {
                feed: url
            },
            success: this.validateFeed,
            failure: this.markInvalid,
            scope: this
        });
    },
    
    /**
     * React to the feed validation passing
     * @private
     * @param {Object} response The response object
     */
    validateFeed: function(response) {
        this.form.setLoading(false);
        this.down('button[text=Add Feed]').enable();
        
        var dq = Ext.DomQuery,
            url = this.form.getComponent('feed').getValue(),
            xml,
            channel,
            title;

        try {
            xml = response.responseXML;
            channel = xml.getElementsByTagName('channel')[0];
            if (channel) {
                title = dq.selectValue('title', channel, url);
                this.fireEvent('feedvalid', this, title, url);
                this.hide();
                return;
            }
        } catch(e) {
        }
        this.markInvalid();
        
    },
    
    /**
     * React to the feed validation failing
     * @private
     */
    markInvalid: function(){
        this.down('button[text=Add Feed]').enable();
        this.form.setLoading(false);
        this.form.getComponent('feed').markInvalid('The URL specified is not a valid RSS2 feed.');
    }
});