sap.ui.jsview("view.Detail",{
	
	getControllerName : function() {
		return "view.Detail";
	},
	
	createContent:function(oController){
		var aColumns = [
		        		new sap.m.Column({
		        			styleClass : "DEVICE_ID",
		        			hAlign : "Left",
		        			width : "30%",
		        			header : new sap.m.Label({
		        				text : "Device Id"
		        			})
		        		}),
		        		new sap.m.Column({
		        			hAlign : "Center",
		        			styleClass : "DEVICETYPE",
		        			width : "30%",
		        			popinDisplay : "Inline",
		        			header : new sap.m.Label({
		        				text : "Device Type"
		        			}),
		        			minScreenWidth : "Tablet",
		        			demandPopin : true
		        		}),
		        		new sap.m.Column({
		        			hAlign : "Right",
		        			styleClass : "LOCATION",
		        			width : "30%",
		        			header : new sap.m.Label({
		        				text : "Location"
		        			}),
		        			minScreenWidth : "XXSmall",
		        			demandPopin : true
		        		}),
		        		new sap.m.Column({
		        			hAlign : "Right",
		        			styleClass : "DUEDATE",
		        			width : "30%",
		        			popinDisplay : "Inline",
		        			header : new sap.m.Label({
		        				text : "Due Date"
		        			}),
		        			minScreenWidth : "400px",
		        			demandPopin : true
		        		}),
		        		new sap.m.Column({
		        			styleClass : "LSERVICEDATE",
		        			hAlign : "Left",
		        			width : "30%",
		        			header : new sap.m.Label({
		        				text : "Last service date"
		        			})
		        		}),
		        		new sap.m.Column({
		        			styleClass : "PURCHASEDON",
		        			hAlign : "Left",
		        			width : "30%",
		        			header : new sap.m.Label({
		        				text : "Purchased on"
		        			})
		        		}),
		        		new sap.m.Column({
		        			hAlign : "Right",
		        			styleClass : "AMCCOST",
		        			width : "30%",
		        			popinDisplay : "Inline",
		        			header : new sap.m.Label({
		        				text : "AMC Cost"
		        			}),
		        			minScreenWidth : "400px",
		        			demandPopin : true
		        		})
		        	];
		
		
		var oTable = new sap.m.Table("items",
				{
					growing : false,
					growingThreshold: 2,
					inset : false,
					mode: "SingleSelect",
					showUnread : true,
					growingScrollToLoad : false,
					selectionChange : function(e) {
						jQuery.sap.log.info("selectionChanged", Date.now());
					},
					itemPress : function(e) {
						jQuery.sap.log.info("itemPressed", e.getParameter("listItem").getId(), e.getParameter("srcControl").getId());
					},
					updateStarted : function(e) {
						jQuery.sap.log.info("updateStarted ", JSON.stringify(e.getParameters()), Date.now());
					},
					updateFinished : function(e) {
						jQuery.sap.log.info("updateFinished ", JSON.stringify(e.getParameters()), Date.now());
					},
					footerText : "This is a table footer",
					columns: aColumns
				});
		var oTemplate = new sap.m.ColumnListItem({
			type : "Navigation",
			unread : false,
			vAlign : "Middle",
			cells : [
				new sap.m.Input({
					value : "{DEVICE_ID}",
					wrapping : true
				}),
				new sap.m.Input({
					value: "{DEVICETYPE}",
					wrapping : false
				}),
				new sap.m.Text({
					text: "{LOCATION}",
					wrapping : false
				}), 
				new sap.m.Text({
					text: "{DUEDATE}",
					wrapping : false
				}),
				new sap.m.Text({
					text: "{LSERVICEDATE}",
					wrapping : false
				}),
				new sap.m.Text({
					text: "{PURCHASEDON}",
					wrapping : false
				}),
				new sap.m.Text({
					text: "{AMCCOST}",
					wrapping : false
				})
			]
		});
		
				var oPage = new sap.m.Page({
					title : "Devices Details",
					enableScrolling : true,
					content : [oTable]
				});
		 var oModel = new sap.ui.model.odata.ODataModel(
							"/demo_content/MaintainIT/srvices/getdetails.xsodata",
							true);
		
		oTable.setModel(oModel);
		oTable.bindAggregation("items", "/DeviceInfo", oTemplate);
		return oPage;
	}
})