sap.ui.controller("view.Master", {
	
	onInit: function() {// handle data loaded events
	    var bus = sap.ui.getCore().getEventBus();
	    bus.subscribe("app", "DataLoaded", function () {

	      // show list, hide busy indicator
	      var list = this.getView().byId("list");
	      list.setVisible(true);

	      // default selection
	      this._selectDetail();

	    }, this);

	    // handle select events
	    bus.subscribe("app", "SelectDetail", this._selectDetail, this);

	    // move the search bar below the pullToRefresh on touch devices
	    if (sap.ui.Device.support.touch) {
	      var bar = this.getView().byId("searchBar");
	      var page = this.getView().byId("page");
	     // page.insertAggregation("content", bar, 1);
	    }
	  },
	  _selectDetail : function () {
		    var list = this.getView().byId("list");
		    var items = list.getItems();
		    if (!jQuery.device.is.phone && items.length > 0 && !list.getSelectedItem()) {
		      list.setSelectedItem(items[0], true);
		      this._showDetail(items[0]);
		    }
		  },

	onRouteMatched : function(oEvent) {		
		var sName = oEvent.getParameter("name");

			if (sName !== "main") {
				return;
			}

			//Load the detail view in desktop
			this.getRouter().myNavToWithoutHash({ 
				currentView : this.getView(),
				targetViewName : "demo_content.MaintainIT.WebContent.view.Detail",
				targetViewType : "JS"
			});

			//Wait for the list to be loaded once
			this.waitForInitialListLoading(function () {

				//On the empty hash select the first item
				this.selectFirstItem();

			});

		},
	
onSelectionChange: function(oEvent) {
        this.switchAlert(oEvent.getParameter("listItem"));
    },
    onListItemPressed: function(oEvent) {
    	 this._showDetail(evt.getSource());
    },
    getRouter: function() {
        return sap.ui.core.UIComponent.getRouterFor(this);
    },
    _showDetail : function (item) {

        // navigate to detail page
        sap.ui.getCore().getEventBus().publish("nav", "to", {
          id : "Detail"
        });

        // tell detail to update
        sap.ui.getCore().getEventBus().publish("app", "RefreshDetail", {
          context : item.getBindingContext()
        });
      },

    onSelect: function(oEvent) {
        // Get the list item, either from the listItem parameter or from the event's
        // source itself (will depend on the device-dependent mode).
    	var context = oEvent.getParameter("listItem").getBindingContext();
    	  this._showDetail(oEvent.getParameter("listItem"));
    },
    showDetail: function(oItem) {
        // If we're on a phone, include nav in history; if not, don't.
        var bReplace = jQuery.device.is.phone ? false : true;
    	this.navTo("DEVICE_ID", {
			objectId: oItem.getBindingContext().getProperty("DEVICE_ID")
		}, bReplace);
    },
});