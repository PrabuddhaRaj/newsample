sap.ui.controller("messagemgmt.message", {
oModel:null,
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf messagemgmt.message
*/
	onInit: function() {

	},
	createUser : function() {
		var oModel = sap.ui.getCore().byId("UserTable").getModel();
		var oEntry = {};
		oEntry.U_ID = sap.ui.getCore().byId("userText").getValue();
		oEntry.U_NAME = sap.ui.getCore().byId("UPassword").getValue();
		if(sap.ui.getCore().byId("chk").getChecked()){
		    oEntry.ISADMIN = "Y";
		}else{
		     oEntry.ISADMIN = "N";
		}
		console.log(oEntry);
		oModel.setHeaders({"content-type" : "application/json;charset=utf-8"});
		oModel.create('/users', oEntry, null, function() {
			alert("Create successful");
		}, function() {
			alert("Create failed");
		});

	},
	updateUser: function() {
		var oModel = sap.ui.getCore().byId("UserTable").getModel();
		var oTable = sap.ui.getCore().byId("UserTable");
	
	 var i = oTable.getSelectedIndex(); 
		 var oEntry = {};
		
	if(i>=0){
	 var selectedRow = oTable.getRows()[i];
		oEntry.U_ID = selectedRow.getCells()[0].getValue();
		oEntry.U_NAME = selectedRow.getCells()[1].getValue();
		oEntry.ISADMIN = selectedRow.getCells()[2].getValue();
		
		oModel.setHeaders({"content-type" : "application/json;charset=utf-8"});	
		var oParams = {};
		oParams.fnSuccess = function(){ alert("Update successful");};
		oParams.fnError = function(){alert("Update failed");};
		oParams.bMerge = true;
		oModel.update("/users('"+oEntry.U_ID+"')", oEntry,oParams);
		
		
		}else{
		    alert("select a row");
		}
	

		
		
	},
	deleteUser: function(){
	 	var oModel = sap.ui.getCore().byId("UserTable").getModel();
		var oTable = sap.ui.getCore().byId("UserTable");
	
	 var i = oTable.getSelectedIndex(); 
		 var oEntry = {};   
		 if(i>=0){
		      var selectedRow = oTable.getRows()[i];
		     oEntry.U_ID = selectedRow.getCells()[0].getValue();
		 }
	oModel.setHeaders({"content-type" : "application/json;charset=utf-8"});	
		var oParams = {};
		oParams.fnSuccess = function(){ alert("delete successful");};
		oParams.fnError = function(){alert("delete failed");};
		oParams.bMerge = true;
		oModel.remove("/users('"+oEntry.U_ID+"')",null,oParams);
	},
createService : function() {
	var oModel = sap.ui.getCore().byId("EmpTable").getModel();
	var oEntry = {};
	oEntry.EMP_ID = sap.ui.getCore().byId("eid").getValue();
	oEntry.EMP_NAME = sap.ui.getCore().byId("enameText").getValue();
	oEntry.TEAM_NAME = sap.ui.getCore().byId("teamText").getValue();
	oEntry.MANAGER_ID = sap.ui.getCore().byId("mText").getValue();
	oEntry.MANAGER_NAME = sap.ui.getCore().byId("mnameText").getValue();
	oEntry.TEAMLEAD_ID = sap.ui.getCore().byId("lText").getValue();
	oEntry.TEAMLEAD_NAME = sap.ui.getCore().byId("lnameText").getValue();
	oEntry.PHONE_NUMBER = sap.ui.getCore().byId("pText").getValue();
	
	oModel.setHeaders({"content-type" : "application/json;charset=utf-8"});
	oModel.create('/employee', oEntry, null, function() {
		alert("Create successful");
	}, function() {
		alert("Create failed");
	});

},
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf messagemgmt.message
*/
//	onBeforeRendering: function() {
//
//	},
updateService: function() {
	var oModel = sap.ui.getCore().byId("EmpTable").getModel();
	var oTable = sap.ui.getCore().byId("EmpTable");
 var i = oTable.getSelectedIndex();
 	var oEntry = {};
 if(i>=0){
	var selectedRow = oTable.getRows()[i];
	oEntry.EMP_ID  = selectedRow.getCells()[0].getValue();
	oEntry.EMP_NAME = selectedRow.getCells()[1].getValue();
	oEntry.TEAM_NAME = selectedRow.getCells()[2].getValue();
	oEntry.MANAGER_ID = selectedRow.getCells()[3].getValue();		
	oEntry.MANAGER_NAME = selectedRow.getCells()[4].getValue();
    oEntry.TEAMLEAD_ID =selectedRow.getCells()[5].getValue();
	oEntry.TEAMLEAD_NAME = selectedRow.getCells()[6].getValue();
	oEntry.PHONE_NUMBER =selectedRow.getCells()[7].getValue();
	
	oModel.setHeaders({"content-type" : "application/json;charset=utf-8"});	
	var oParams = {};
	oParams.fnSuccess = function(){ alert("Update successful");};
	oParams.fnError = function(){alert("Update failed");};
	oParams.bMerge = true;
	oModel.update("/employee('"+oEntry.EMP_ID+"')", oEntry,oParams);
	
	
	}else{
	    alert("select a row");
	}

	
	
},
deleteService : function() {
	var oModel = sap.ui.getCore().byId("EmpTable").getModel();
	var oTable = sap.ui.getCore().byId("EmpTable");
	var oEntry = {};
var i = oTable.getSelectedIndex();
 if(i>=0){
		      var selectedRow = oTable.getRows()[i];
		     oEntry.EMP_ID = selectedRow.getCells()[0].getValue();
		 }

	oModel.setHeaders({"content-type" : "application/json;charset=utf-8"});
	oModel.remove("/employee('"+oEntry.EMP_ID+"')", null, function() {
		alert("delete successful");
	}, function() {
		alert("delete failed");
	});
	},
	
updateMessage: function() {
		var oModel = sap.ui.getCore().byId("MessageTable").getModel();
		var oTable = sap.ui.getCore().byId("MessageTable");
		 var i = oTable.getSelectedIndex(); 
		 var oEntry = {};
if(i >= 0){
		
		 var selectedRow = oTable.getRows()[i];
		oEntry.MSG_ID = selectedRow.getCells()[0].getValue();
		oEntry.MSG_NAME = selectedRow.getCells()[1].getValue();
		oEntry.MSG_STATUS = selectedRow.getCells()[2].getValue();
		oEntry.ASSIGNEDTO_ID = selectedRow.getCells()[3].getValue();
		oEntry.ASSIGNEDTO_NAME = selectedRow.getCells()[4].getValue();
		oEntry.ASSIGNEDBY_ID = selectedRow.getCells()[5].getValue();
		oEntry.ASSIGNEDBY_NAME = selectedRow.getCells()[6].getValue();
		oEntry.COMMENTS = selectedRow.getCells()[7].getValue();
		oEntry.CURRENTSTATE = selectedRow.getCells()[8].getValue();
		
}
		oModel.setHeaders({"content-type" : "application/json;charset=utf-8"});	
		var oParams = {};
		oParams.fnSuccess = function(){ alert("Update successful");};
		oParams.fnError = function(){alert("Update failed");};
		oParams.bMerge = true;
		oModel.update( "/message('"+ oEntry.MSG_ID +"')", oEntry,oParams);
		
	},
deletemessage: function(){
    	var oModel = sap.ui.getCore().byId("MessageTable").getModel();
		var oTable = sap.ui.getCore().byId("MessageTable");
	
	 var i = oTable.getSelectedIndex(); 
		 var oEntry = {};   
		 if(i>=0){
		      var selectedRow = oTable.getRows()[i];
		     oEntry.MSG_ID = selectedRow.getCells()[0].getValue();
		 }
	oModel.setHeaders({"content-type" : "application/json;charset=utf-8"});	
		var oParams = {};
		oParams.fnSuccess = function(){ alert("delete successful");};
		oParams.fnError = function(){alert("delete failed");};
		oParams.bMerge = true;
		oModel.remove("/message('"+oEntry.MSG_ID+"')",null,oParams);
},
requestWithXCSRF : function (ioRequest){
            $.ajax({
                type: "HEAD",
                url: "/sap/hana/ide/common/remote/server/csrf.xsjs",
                headers: { "X-CSRF-Token": "Fetch" },
                success: function(data, textStatus, jqXHR) {
                    var securityToken = jqXHR.getResponseHeader("X-CSRF-Token");
                    if(ioRequest['headers']){
                        ioRequest['headers']['X-CSRF-Token'] = securityToken;
                    }else{
                        ioRequest.headers = {};
                        ioRequest['headers']['X-CSRF-Token'] = securityToken;
                    }
                    $.ajax(ioRequest);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    //do nothing
                }        

            });        

        }

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf messagemgmt.message
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf messagemgmt.message
*/
//	onExit: function() {
//
//	}

});