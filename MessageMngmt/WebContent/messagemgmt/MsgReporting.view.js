sap.ui.jsview("messagemgmt.MsgReporting", {
  
  	getControllerName : function() {
		return "messagemgmt.MsgReporting";
	},
    createContent: function(oController){
       
       var oModel =  new sap.ui.model.odata.ODataModel(
                    "/demo_content/MessageMngmt/services/reporting.xsodata/",
                    true);
        var oDataset = new sap.viz.ui5.data.FlattenedDataset({

		// a Bar Chart requires exactly one dimension (x-axis) 
		dimensions : [ 
			{
				axis : 1, // must be one for the x-axis, 2 for y-axis
				name : 'Processor', 
				value : "{ASSIGNEDTO_ID}"
			},
			{
				axis : 1, // must be one for the x-axis, 2 for y-axis
				name : 'Processor', 
				value : "{CURRENTSTATE}"
			}
			
		],

		// it can show multiple measures, each results in a new set of bars in a new color 
		measures : [ 
		    // measure 1
			{
				name : 'State', // 'name' is used as label in the Legend 
				value : '{checki}' // 'value' defines the binding for the displayed value   
			}
		],
		
		// 'data' is used to bind the whole data collection that is to be displayed in the chart 
		data : {
			path : "/MSGSTATUS"
		}
		
	});
		var oBarChart = new sap.viz.ui5.StackedColumn ({
		width : "80%",
		height : "300px",
		plotArea : {
		'colorPalette' : ["#31B404","#FFFF00","#DF3A01"]
		},
		title : {
			visible : true,
			text : 'Message Status Overview'
		},
		dataset : oDataset
	});

	oBarChart.setModel(oModel);
	
return oBarChart;
    }
});
    
