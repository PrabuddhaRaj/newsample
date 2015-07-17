sap.ui.jsview("demo_content.MaintainIT.WebContent.maintainit.Maintain", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf maintainit.Maintain
	*/ 
	getControllerName : function() {
		return "maintainit.Maintain";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf maintainit.Maintain
	*/ 
	createContent : function(oController) {
this.setDisplayBlock(true);
		
		this.app = new sap.m.SplitApp("idAppControl");
		var master = sap.ui.jsview("Master", "view.Master");
		this.app.addMasterPage(master);
		//master.getController().nav = this.getController();
		
		this.app.addDetailPage(sap.ui.jsview("Detail", "view.Detail"));
		
	return this.app;
	}
});