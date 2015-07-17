sap.ui.controller("maintainit.Maintain", {

	to : function (pageId, context) {
		
		var app = this.getView().app;
		
		// load page on demand
		var master = ("Master" === pageId);
		if (app.getPage(pageId, master) === null) {
			var page = sap.ui.view({
				id : pageId,
				viewName : "demo_content.MaintainIT.WebContent.view." + pageId,
				type : "JS"
			});
			page.getController().nav = this;
			app.addPage(page, master);
			jQuery.sap.log.info("app controller > loaded page: " + pageId);
		}
		
		// show the page
		app.to(pageId);
		
		// set data context on the page
		if (context) {
			var page = app.getPage(pageId);
			page.setBindingContext(context);
		}
	},
	
	/**
	 * Navigates back to a previous page
	 * @param {string} pageId The id of the next page
	 */
	back : function (pageId) {
		this.getView().app.backToPage(pageId);
	},
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf maintainit.Maintain
*/
	onInit: function() {
		this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		var bus = sap.ui.getCore().getEventBus();
		bus.subscribe("nav", "to", this.navToHandler, this);
		bus.subscribe("nav", "back", this.navBackHandler, this);
	},

	navToHandler : function(channelId, eventId, data) {
		if (data && data.id) {
			// lazy load view
			if (this.getView().app.getPage(data.id) === null) {
				jQuery.sap.log.info("now loading page '" + data.id + "'");
				this.app.addPage(sap.ui.jsview(data.id, "sap.m.mvc." + data.id));
			}
			// Navigate to given page (include bindingContext)
			this.getView().app.to(data.id, data.data.context);
		} else {
			jQuery.sap.log.error("nav-to event cannot be processed. Invalid data: " + data);
		}
	},

	navBackHandler : function() {
		this.app.back();
	}

	

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf maintainit.Maintain
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf maintainit.Maintain
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf maintainit.Maintain
*/
//	onExit: function() {
//
//	}

});