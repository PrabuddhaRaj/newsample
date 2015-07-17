sap.ui
    .jsview(
        "messagemgmt.message", {

            /**
             * Specifies the Controller belonging to this View. In the
             * case that it is not implemented, or that "null" is
             * returned, this View does not have a Controller.
             *
             * @memberOf messagemgmt.message
             */
            getControllerName: function() {
                return "messagemgmt.message";
            },

            /**
             * Is initially called once after the Controller has been
             * instantiated. It is the place where the UI is
             * constructed. Since the Controller is given to this
             * method, its event handlers can be attached right away.
             *
             * @memberOf messagemgmt.message
             */
            createContent: function(oController) {
                var is_admin_user;
                var sessionUser;

                function getsessionUserid() {
                    $
                        .ajax({
                            url: "/demo_content/MessageMngmt/services/sessionUser.xsjs",
                            success: function(result) {
                                sessionUser = result;
                            },
                            async: false
                        });
                }

                function isSessionUserAdmin() {
                    $
                        .ajax({
                            url: "/demo_content/MessageMngmt/services/isUserAdmin.xsjs",
                            success: function(result) {
                                is_admin_user = result;

                            },
                            async: false
                        });
                }
                getsessionUserid();
                isSessionUserAdmin();

                function createUser() {
                    $
                        .ajax({
                            type: "POST",
                            url: "/demo_content/MessageMngmt/services/users.xsjs?CMD=create&Username=" + sap.ui.getCore().byId(
                                "userText").getValue() + "&Password=" + sap.ui.getCore().byId(
                                "UPassword").getValue() + "&isAdmin=" + oCB.getChecked(),
                            success: function(result) {
                                sap.ui.commons.MessageBox
                                    .alert(result);
                                sap.ui.getCore().byId("userText")
                                    .setValue("");
                                sap.ui.getCore().byId("UPassword")
                                    .setValue("");
                            }
                        });
                }

                var oLayoutDialog = new sap.ui.commons.layout.MatrixLayout({
                    columns: 2,
                    width: "100%"
                });
                var oUserLabel = new sap.ui.commons.Label("userLabel");
                oUserLabel.setText("Username");

                var oUtext = new sap.ui.commons.TextField("userText");
                oLayoutDialog.createRow(oUserLabel, oUtext);

                var oPLabel = new sap.ui.commons.Label("passwrd");
                oPLabel.setText("Password");

                var oPText = new sap.ui.commons.PasswordField(
                    "UPassword");
                oPText
                    .setTooltip("Password : Minimum 8 characters with atleast a starting letter and integer");
                oLayoutDialog.createRow(oPLabel, oPText);

                var oCB = new sap.ui.commons.CheckBox("chk",{
                    text: 'Admin User'

                });
                var createButton = new sap.ui.commons.Button({
                    text: "Create",
                    press: function() {
                        oController.createUser();
                    }
                });
                oLayoutDialog.createRow(oCB, createButton);
                var oModelUser = new sap.ui.model.odata.ODataModel(
                    "/demo_content/MessageMngmt/services/users.xsodata",
                    true);
                var oTableUser = new sap.ui.table.Table({
                    id: "UserTable",
                    title: "USERS",
                    visibleRowCount: 7,
                    firstVisibleRow: 3,
                    selectionMode: sap.ui.table.SelectionMode.Single,
                    rowSelectionChange: function(oEvent) {},
                    toolbar: new sap.ui.commons.Toolbar({
                        items: [

                            new sap.ui.commons.Button({
                                text: "Update",
                                press: function() {
                                    oController.updateUser();
                                }
                            }), new sap.ui.commons.Button({
                                text: "Delete",
                                press: function() {
                                    oController.deleteUser();
                                }
                            })
                        ]

                    }),
                    navigationMode: sap.ui.table.NavigationMode.Paginator,
                    fixedColumnCount: 2
                });
                var oMetaUser = oModelUser.getServiceMetadata();
                var oControl;

                for (var i = 0; i < oMetaUser.dataServices.schema[0].entityType[0].property.length; i++) {
                    var property = oMetaUser.dataServices.schema[0].entityType[0].property[i];

                    oControl = new sap.ui.commons.TextField({
                        //change: oController.updateService
                    }).bindProperty("value", property.name);

                    oTableUser
                        .addColumn(new sap.ui.table.Column({
                            label: new sap.ui.commons.Label({
                                text: property.name
                            }),
                            template: oControl,
                            sortProperty: property.name,
                            filterProperty: property.name,
                            filterOperator: sap.ui.model.FilterOperator.EQ,
                            flexible: true,
                            width: "125px"
                        }));
                }
                oTableUser.setModel(oModelUser);
                oTableUser.bindRows("/users");
                oTableUser.setTitle("Users");
                oLayoutDialog.createRow(oTableUser);

                // Create a panel instance
                var oPanel = new sap.ui.commons.Panel({
                    width: "800px",
                    height: "600px",
                    content: [oLayoutDialog, oTableUser]
                });

                // Set the title of the panel
                oPanel.setTitle(new sap.ui.core.Title({
                    text: "Manage User"

                }));

                var oLayoutFile = new sap.ui.commons.layout.MatrixLayout({
                    id: "fileUpload",
                    layoutFixed: false
                });
                var oLabelMsg = new sap.ui.commons.Label("MsgUpload");
                oLabelMsg.setText("Message Upload : ");
                var oFileUploaderMsg = new sap.ui.commons.FileUploader(
                    "fileUploadMsg", {

                        uploadUrl: "/demo_content/MessageMngmt/services/UploadMsg.xsjs", // URL
                        // to
                        // submit
                        // the
                        // form
                        // to
                        name: "simpleUploader", // name of
                        // the
                        // input
                        // type=file
                        // element
                        // within the
                        // form
                        uploadOnChange: false // immediately
                        // upload the file
                        // after selection
                    });
                oFileUploaderMsg.attachUploadComplete(function(oEvent) {
                    var sResponse = oEvent.getParameter("response");
                    if (sResponse) {
                        sap.ui.commons.MessageBox.show(sResponse);
                    }
                });
                var oButtonEmp = new sap.ui.commons.Button({
                    text: "Upload",
                    press: function(oEvent) {
                        var file_field_value = sap.ui.getCore().byId(
                            "fileUploadMsg");
                        var filename_msg = file_field_value.getValue();
                        if (filename_msg == "") {
                            sap.ui.commons.MessageBox
                                .show("Please choose File");
                        } else {
                            oFileUploaderMsg.upload();
                        }
                    },
                    success: function() {
                        sap.ui.commons.MessageBox
                            .alert('Data is Uploaded');
                    }
                });
                oLayoutFile.createRow(oLabelMsg, oFileUploaderMsg,
                    oButtonEmp);

                // var json_model=new
                // sap.ui.model.json.JSONModel("../../../services/messages.xsodata/employee?$format=json");
                // sap.ui.getCore().byId('userText').setValue(json_model.getData().result[0].EMP_NAME);

                // return oPanel;

                /*
                 * oTable.addColumn(new sap.ui.table.Column({ label :
                 * new sap.ui.commons.Label({ text : "Employee Id" }),
                 * template : new sap.ui.commons.TextView()
                 * .bindProperty("text", "EMP_ID"), width : "100px" }));
                 * oTable.addColumn(new sap.ui.table.Column({ label :
                 * new sap.ui.commons.Label({ text : "Employee Name" }),
                 * template : new sap.ui.commons.TextView()
                 * .bindProperty("text", "EMP_NAME"), width : "100px"
                 * }));
                 */
                var oLayoutEmpNdMessage = new sap.ui.commons.layout.MatrixLayout({
                    layoutFixed: false,
                    width: "100%"
                });
                var oLayoutMessage = new sap.ui.commons.layout.MatrixLayout({
                    layoutFixed: false,
                    width: "100%"
                });

                // creating employee entities
                var oModel = new sap.ui.model.odata.ODataModel(
                    "/demo_content/MessageMngmt/services/messages.xsodata",
                    true);
                var oMeta = oModel.getServiceMetadata();

                var oeLabel = new sap.ui.commons.Label("eLabel");
                oeLabel.setText("Employee Id");

                var oEidtext = new sap.ui.commons.TextField("eid");
                oLayoutEmpNdMessage.createRow(oeLabel, oEidtext);

                var oEnameLabel = new sap.ui.commons.Label("enameLabel");
                oEnameLabel.setText("Employee Name");

                var oEnametext = new sap.ui.commons.TextField(
                    "enameText");
                oLayoutEmpNdMessage.createRow(oEnameLabel, oEnametext);

                var oteamLabel = new sap.ui.commons.Label("teamLabel");
                oteamLabel.setText("Team Name");

                var ottext = new sap.ui.commons.TextField("teamText");
                oLayoutEmpNdMessage.createRow(oteamLabel, ottext);

                var oManLabel = new sap.ui.commons.Label("manLabel");
                oManLabel.setText("Manager Id");
                var oMtext = new sap.ui.commons.TextField("mText");
                oLayoutEmpNdMessage.createRow(oManLabel, oMtext);

                var oManNameLabel = new sap.ui.commons.Label(
                    "mannameLabel");
                oManNameLabel.setText("Manager Name");
                var oMnametext = new sap.ui.commons.TextField(
                    "mnameText");
                oLayoutEmpNdMessage
                    .createRow(oManNameLabel, oMnametext);

                var oleadLabel = new sap.ui.commons.Label("leadLabel");
                oleadLabel.setText("TeamLead Id");
                var oLtext = new sap.ui.commons.TextField("lText");
                oLayoutEmpNdMessage.createRow(oleadLabel, oLtext);

                var oLnameLabel = new sap.ui.commons.Label("lnameLabel");
                oLnameLabel.setText("Manager Name");
                var oLnametext = new sap.ui.commons.TextField(
                    "lnameText");
                oLayoutEmpNdMessage.createRow(oLnameLabel, oLnametext);

                var opLabel = new sap.ui.commons.Label("pLabel");
                opLabel.setText("Phone Number");
                var optext = new sap.ui.commons.TextField("pText");
                oLayoutEmpNdMessage.createRow(opLabel, optext);

                var oTable = new sap.ui.table.Table({
                    id: "EmpTable",
                    title: "Employee",
                    visibleRowCount: 8,
                    firstVisibleRow: 5,
                    selectionMode: sap.ui.table.SelectionMode.Single,
                    rowSelectionChange: function(oEvent) {},
                    toolbar: new sap.ui.commons.Toolbar({
                        items: [
                            new sap.ui.commons.Button({
                                text: "Create",
                                press: function(
                                    oEvent) {
                                    oController
                                        .createService(oEvent);
                                }
                            }),
                            new sap.ui.commons.Button({
                                text: "Update",
                                press: function(
                                    oEvent) {
                                    oController
                                        .updateService(oEvent);
                                }
                            }),
                            new sap.ui.commons.Button({
                                text: "Delete",
                                press: function(
                                    oEvent) {
                                    oController
                                        .deleteService(oEvent);
                                }
                            })
                        ]

                    }),
                    navigationMode: sap.ui.table.NavigationMode.Paginator,
                    fixedColumnCount: 2
                });
                for ( i = 0; i < oMeta.dataServices.schema[0].entityType[0].property.length; i++) {
                    var property = oMeta.dataServices.schema[0].entityType[0].property[i];

                    oControl = new sap.ui.commons.TextField({
                        //change: oController.updateService
                    }).bindProperty("value", property.name);

                    oTable
                        .addColumn(new sap.ui.table.Column({
                            label: new sap.ui.commons.Label({
                                text: property.name
                            }),
                            template: oControl,
                            sortProperty: property.name,
                            filterProperty: property.name,
                            filterOperator: sap.ui.model.FilterOperator.EQ,
                            flexible: true,
                            width: "125px"
                        }));
                }


               

                /*
						oComboBoxState.addItem(oItem);
						oItem = new sap.ui.core.ListItem("state2");
						oItem.setText("Low");
						oComboBoxState.addItem(oItem);
						oItem = new sap.ui.core.ListItem("state3");
						oItem.setText("Medium");
						oComboBoxState.addItem(oItem);
						oItem = new sap.ui.core.ListItem("state4");
						oItem.setText("High");
						oComboBoxState.addItem(oItem);
						*/
 
                // oLayoutEmpNdMessage.createRow(oTable);
                var oTable1 = new sap.ui.table.Table({
                    id: "MessageTable",
                    title: "Messages",
                    visibleRowCount: 7,
                    firstVisibleRow: 5,
                    selectionMode: sap.ui.table.SelectionMode.Single,
                    toolbar: new sap.ui.commons.Toolbar({
                        items: [new sap.ui.commons.Button({
                            text: "Update",
                            press: function(oEvent) {
                                oController.updateMessage(oEvent);
                            }
                        }), new sap.ui.commons.Button({
                            text: "Delete",
                            press: function() {
                                oController.deletemessage();
                            }
                        })]

                    }),
                    navigationMode: sap.ui.table.NavigationMode.Paginator,
                    fixedColumnCount: 2
                });


                for ( i = 0; i < oMeta.dataServices.schema[0].entityType[1].property.length; i++) {
                    var property = oMeta.dataServices.schema[0].entityType[1].property[i];


                    if (property.name == 'CURRENTSTATE') {
                        //oControl = oComboBoxState.bindProperty
                        oTable1.addColumn(new sap.ui.table.Column({
                            label: new sap.ui.commons.Label({
                                text: property.name
                            }),
                            template: new sap.ui.commons.ComboBox({
                                items: [new sap.ui.core.ListItem({
                                        text: "High"
                                    }),
                                    new sap.ui.core.ListItem({
                                        text: "Medium"
                                    }),
                                    new sap.ui.core.ListItem({
                                        text: "Low"
                                    }),
                                    new sap.ui.core.ListItem({
                                        text: "Documentation"
                                    }),
                                    new sap.ui.core.ListItem({
                                        text: "User Consulting"
                                    })
                                ]
                            }).bindProperty("value", "CURRENTSTATE"),
                            sortProperty: property.name,
                            filterProperty: property.name,
                            filterOperator: sap.ui.model.FilterOperator.EQ,
                            flexible: true,
                            width: "125px"
                        }));

                    } else {
                        if(property.name == 'COMMENTS'){
                             oControl = new sap.ui.commons.TextField({
                            change: oController.updateService
                        }).bindProperty("value", property.name);

                        oTable1
                            .addColumn(new sap.ui.table.Column({
                                label: new sap.ui.commons.Label({
                                    text: property.name
                                }),
                                template: oControl,
                                sortProperty: property.name,
                                filterProperty: property.name,
                                filterOperator: sap.ui.model.FilterOperator.EQ,
                                flexible: true,
                                width: "125px"
                            }));
                    }else
                        {
                        
                        oControl = new sap.ui.commons.TextField({
                            change: oController.updateService
                        }).bindProperty("value", property.name);

                        oTable1
                            .addColumn(new sap.ui.table.Column({
                                label: new sap.ui.commons.Label({
                                    text: property.name
                                }),
                                template: oControl,
                                sortProperty: property.name,
                                filterProperty: property.name,
                                filterOperator: sap.ui.model.FilterOperator.EQ,
                                editable:false,
                                flexible: true,
                                width: "125px"
                            }));
                    }}
                }
  oTable1.setModel(oModel);
                oTable.setModel(oModel);

                var oPanelHome = new sap.ui.commons.Panel({
                    width: "1800px",
                    height: "1600px",
                    content: [oLayoutEmpNdMessage,oTable,oTable1]
                });
                var oPanelFile = new sap.ui.commons.Panel({
                    width: "1800px",
                    height: "1600px",
                    content: [oLayoutFile, oTable1]
                });
                // Set the title of the panel
                oPanelFile.setTitle(new sap.ui.core.Title({
                    text: "Upload messageFile"
                }));

                var oPanelMessage = new sap.ui.commons.Panel({
                    width: "1800px",
                    height: "5000px"
                });

              
                oPanelMessage.addContent(oLayoutMessage);
                oTable.bindRows("/employee");
                oTable1.bindRows("/message");

                var oPanelContent;
                if (is_admin_user == 'Y')
                    oPanelContent = oPanelHome;
                else {
                    oPanelContent = oPanelMessage;
                }
                
                // oPanel1.setTitle(new sap.ui.core.Title({
                // text : "Messages"
                // }));
var reportView = sap.ui.view({id : "report_view",viewName : "messagemgmt.MsgReporting",type : sap.ui.core.mvc.ViewType.JS});
                // code ends here and shell starts
                var oShell = new sap.ui.ux3.Shell("messageShell", {
                    appTitle: "Message manager",
                    appIcon: "/images/SAP.png",
                    designType: sap.ui.ux3.ShellDesignType.Light,
                    appIconTooltip: "SAP logo",
                    showLogoutButton: true,
                    showSearchTool: false,
                    showInspectorTool: false,
                    showFeederTool: false,
                    selectedWorksetItem: "WI_home",
                    worksetItems: [
                        new sap.ui.ux3.NavigationItem("WI_home", {
                            key: "wi_home",
                            text: "Message Details"
                        }),
                        new sap.ui.ux3.NavigationItem("WI_User", {
                            key: "wi_user",
                            text: "UserManagement"
                        }),
                        new sap.ui.ux3.NavigationItem("WI_msg", {
                            key: "wi_msg",
                            text: "Upload"
                        }),
                         new sap.ui.ux3.NavigationItem("WI_report", {
                            key: "wi_report",
                            text: "Analysis"
                        })
                    ],
                    paneBarItems: [new sap.ui.core.Item("PI_Help", {
                        key: "pi_help",
                        text: "Help"
                    })],
                    
                    content: oPanelContent,

                    headerItems: [new sap.ui.commons.TextView({
                            text: sessionUser,
                            tooltip: "User"
                        })

                    ],
                    worksetItemSelected: function(oEvent) {
                        var sid = oEvent.getParameter("id");
                        var oShell = oEvent.oSource;
                        switch (sid) {
                            case "WI_home":
                                if (is_admin_user == 'Y')
                                    oShell.setContent(oPanelHome);
                                else {
                                    oShell.setContent(oPanelMessage);
                                }
                                break;
                            case "WI_User":
                                if (is_admin_user == 'Y')
                                    oShell.setContent(oPanel);
                                break;
                            case "WI_msg":
                                if (is_admin_user == 'Y')
                                    oShell.setContent(oPanelFile);
                                break;
                             case "WI_report":
                                if (is_admin_user == 'Y')
                                    oShell.setContent(reportView );
                                break;    
                            default:
                                break;
                        }
                    },
 logout : function() {
            oController.requestWithXCSRF({
                url: "/sap/hana/ide/common/remote/server/logout.xscfunc",
                type: "POST",
                success: function(ret) {
                    document.location.reload(true);
                }
            }); 
        }  
                });
                return oShell;

            }

        });