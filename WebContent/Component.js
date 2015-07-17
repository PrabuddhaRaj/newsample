jQuery.sap.declare( "demo_content.MaintainIT.WebContent.Component" );
jQuery.sap.require( "sap.ui.core.UIComponent" );
jQuery.sap.require( "demo_content.MaintainIT.WebContent.Router" );
sap.ui.core.UIComponent.extend( "demo_content.MaintainIT.WebContent.Component",{
	
	metadata : {
		name : "Demo App",
        version : "1.0",
        includes : [],
	rootView: "demo_content.MaintainIT.WebContent.view.App",
		dependencies: {
			minUI5Version: "1.28.0",
			libs: [ "sap.ui.core", "sap.m", "sap.ui.layout" ]
		},

		config: {
			"serviceUrl": "/demo_content/MaintainIT/srvices/getdetails.xsodata"
		},
		routing: {
			config: {
	            routerClass: "demo_content.MaintainIT.WebContent.Router",
	            viewType: "JS",
	            viewPath: "demo_content.MaintainIT.WebContent.view",
	            controlAggregation: "detailPages",
	            transition: "slide",
	            clearTarget: false	
	         },
			},
			routes : [
						{
							pattern : "",
							name : "main",
							view : "Master",
							viewType:"JS",
							targetAggregation : "masterPages",
							targetControl : "idAppControl",
							subroutes : [
								{
									pattern : "{printer}/:tab:",
									name : "printer",
									view : "Detail"
								}
							]
						},
						{
							name : "catchallMaster",
							view : "Master",
							viewType:"JS",
							targetAggregation : "masterPages",
							targetControl : "idAppControl",
							subroutes : [
								{
									pattern : ":all*:",
									name : "catchallDetail",
									view : "NotFound",
									transition : "show"
								}
							]
						}
					]
				},
			
init : function() {
    var mConfig = this.getMetadata().getConfig();
    sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
    
    // always use absolute paths relative to our own component
    // (relative paths will fail if running in the Fiori Launchpad)
    var rootPath = jQuery.sap.getModulePath("demo_content.MaintainIT.WebContent");
    
    // Create and set domain model to the component
    var sServiceUrl = mConfig.serviceUrl;
    var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
    this.setModel(oModel);

    // set device model
    var deviceModel = new sap.ui.model.json.JSONModel({
        isTouch : sap.ui.Device.support.touch,
        isNoTouch : !sap.ui.Device.support.touch,
        isPhone : sap.ui.Device.system.phone,
        isNoPhone : !sap.ui.Device.system.phone,
        listMode : sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
        listItemType : sap.ui.Device.system.phone ? "Active" : "Inactive"
    });
    deviceModel.setDefaultBindingMode("OneWay");
    this.setModel(deviceModel, "device");
    
   // this.getRouter().initialize();

        
},
/*createContent:function(){
	 var oView =  sap.ui.view({
	        id : "Maintain",
	        viewName : "demo_content.MaintainIT.WebContent.maintainit.Maintain",
	        type : "JS",
	        viewData : {component : this}
	    });
	 return oView;
}*/
});