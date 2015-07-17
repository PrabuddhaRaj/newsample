sap.ui.jsview("view.Master",{
	
	getControllerName : function() {
		return "view.Master";
	},
	
	createContent:function(oController){
		 var listofTasks = new sap.m.List(
	                "list", {
	                    inset: false,
	                    mode: "SingleSelect",
	                    noDataText: "Test",
	                    selectionChange: function(oEvent) {
	                        oController.onSelect(oEvent);
	                    },
	                    growing: "true",
	                    growingScrollToLoad: true,
	                });
		
		 var itemTemplate = sap.m.ObjectListItem({
           press: function(oEvent) {
               oController.onSelect(oEvent);
           },
           title: "{DEVICES}",
           number: "{DEVICEQTY}",
           numberUnit: "{DEVICEDUE}",
           attributes: [
               new sap.m.ObjectAttribute("duedateAttribute",{
                   text: "{DUEDATE}" 

               }),
               new sap.m.ObjectAttribute("devicesDue",{
                   text: "{DEVICESDUE}" 

               })
           ],
           press: [oController.onSelect, oController]

       });
//		 this.itemTemplate.getAttributes()[0].bindProperty("text", "Date", function(value) {
//	            return getDTFormated(value);
//	        }.bind(this));
		 var oModel = new sap.ui.model.odata.ODataModel(
					"/demo_content/MaintainIT/srvices/getdetails.xsodata",
					true);
		 sap.ui.getCore().setModel(oModel);
         // Create Aggregation Binding
         listofTasks.setModel(oModel);
         listofTasks.bindAggregation("items", "/Devices", itemTemplate);
         return new sap.m.Page("page",{
        	 content:listofTasks
         })
	}
})