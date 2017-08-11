sap.ui.controller("SLFiori.view.masters.grantinitiative", {

	onInit: function() {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
		
		this.NewEntry = {
		    EntrySaveToUpdate : "No",
			FormMode: "Add",
			PrcCode: "",
			PrcName: "",
			U_ParPgm: "",
			U_Mangr: "",
			U_ExtText: "",
			U_GrRes: "",
			ComboRes: [{
				key: "U",
				value: "UnRestricted"
			}, {
				key: "R",
				value: "Restricted"
			}]
		};

		this.list = {
		    EntrySaveToUpdate : "No",
			FormMode: "Update",
	    	PrcCode: "",
			PrcName: "",
			U_ParPgm: "",
			U_Mangr: "",
			U_ExtText: "",
			U_GrRes: "",
			ComboRes: [{
				key: "U",
				value: "UnRestricted"
			}, {
				key: "R",
				value: "Restricted"
			}]
		};

		this.oModel = new sap.ui.model.json.JSONModel(this.list);
		this.getView().setModel(this.oModel);
	},

	onAfterRendering: function() {
			var view = this.getView();
		//sap.ui.getCore().getControl("UName").focus();
		//this.byId("UName").focus();
		view.addDelegate({
			onsapenter: function(e) {
				view.getController().handleSave();
			}
		});
	},
	
	_handleRouteMatched: function(data) {
		this.grantinitiative = data.mParameters.arguments.Key;
		//this.SessionID = data.mParameters.arguments.Session;

		if (this.grantinitiative === "0") {
		    this.byId("PrcCode").setEnabled(true);
		    
		    this.NewEntry = {
		    EntrySaveToUpdate : "No",
			FormMode: "Add",
			PrcCode: "",
			PrcName: "",
			U_ParPgm: "",
			U_Mangr: "",
			U_ExtText: "",
			U_GrRes: "",
			ComboRes: [{
				key: "U",
				value: "UnRestricted"
			}, {
				key: "R",
				value: "Restricted"
			}]
		};
		
			this.oModel = new sap.ui.model.json.JSONModel(this.NewEntry);
			this.getView().setModel(this.oModel);
		} else {
			var oParameter = data.getParameter("name");
			if (oParameter !== "masters.grantinitiative") {
				return;
			}
			var oModelData = this.oModel.getData();
			var that = this;
			
			this.byId("PrcCode").setEnabled(false);
			
			$.ajax({
				//url: "/b1s/v1/ProfitCenters('" + this.ProgramCode + "')?$select=CenterCode,CenterName,U_ParPgm,U_Mangr,U_GrRes,U_ExtText",
				url: "OData/masters/grantcode/grantcode_header.xsodata/Code?$filter=Code eq '" + this.grantinitiative + "'",
				xhrFields: {
					withCredentials: true
				},
				async: false,
				type: "GET",
				dataType: "json",
				success: function(oData, oResponse) {

					that.oModel.setProperty("/FormMode", "Update");
					that.oModel.setProperty("/PrcCode", oData.d.results[0].Code);
					that.oModel.setProperty("/PrcName", oData.d.results[0].Name);
				// 	that.oModel.setProperty("/U_ParPgm", oData.d.results[0].U_IKPRPRG);
				// 	that.oModel.setProperty("/U_Mangr", oData.d.results[0].U_IKMAN);
				 	that.oModel.setProperty("/U_ExtText", oData.d.results[0].U_IKEXTTXT);
				// 	that.oModel.setProperty("/U_GrRes", oData.d.results[0].U_IKGRRS);

					that.oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError);
				}
			});
                
		}
	},

    handlegoBack: function() {
		var that = this;
		that.router.navTo("Dashboard");
	},
	
	onBack: function(oEvent) {
		var that = this;
		if (!this.oGrantInitiativeDialog) {
			this.oGrantInitiativeDialog = sap.ui.xmlfragment("SLFiori.fragments.masters.grantInitiative.grantinitiative_display_back", this);
		}
		sap.ui.getCore().byId("GrantInitiativeTableBack").removeSelections();
		this.oGrantInitiativeDialog.setModel(this.oModel);
		$.ajax({
			//url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '5'",
			//url: "OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '5'",
			url: "OData/masters/grantcode/list_Display.xsodata/Code?$filter=U_IKDIMEN eq '5'",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().GrantInitiativeList = oData.d.results; //oData.value;
				that.oModel.refresh();
				that.oGrantInitiativeDialog.open();
			},
			// 			error: function(oError) {
			// 				sap.m.MessageToast.show("Error: " + oError);
			// 			}
			error: function(oError) {
				//sap.m.MessageToast.show("Error: " + oError);
				if (oError.status === 404) {
					sap.m.MessageToast.show("Session timed out,please close the tab and login again");
				} else {
					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				}
			}
		});
	},

	handleGrantInitiativeOk_Back: function(oEvent) {
		//this.oGrantInitiativeDialog.close();

		var that = this;
		var oDonorListTable = sap.ui.getCore().byId("GrantInitiativeTableBack");
		var oSelectedGrant = oDonorListTable.getSelectedItem();
		if (oSelectedGrant) {
			var oSelctedCustContext = oSelectedGrant.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var DonorCode = this.oModel.getProperty(path);
			this.oGrantInitiativeDialog.close();
			that.router.navTo("masters.grantinitiative", {
				Key: DonorCode.Code
			});
		} else {
			//this.oCustomerMasterDialog.close();
			//that.router.navTo("DonorMaster",{Key:1});
			sap.m.MessageToast.show("Please select Grant Initiative Code");
		}
	},

	handleGrantInitiativeClose_Back: function(oEvent) {
		this.oGrantInitiativeDialog.close();
		//this.router.navTo("DonorMaster");
	},
	
	handleSave: function(oEvent) {
		var oModelData = this.oModel.getData();

		var that = this;
		
		var jData = JSON.stringify({
			Code: oModelData.PrcCode,
			Name:oModelData.PrcName,
            //U_IKPRPRG:oModelData.U_ParPgm,
            //U_IKMAN:oModelData.U_Mangr,
			U_IKEXTTXT:oModelData.U_ExtText,
			//U_IKGRRS:oModelData.U_GrRes,
			//EffectiveFrom: "2016-01-01",
			U_IKDIMEN: "5"
		});
		
		if (oModelData.FormMode !== "Add") {
			//sap.m.MessageToast.show("FormMode-Update");
			//this.GrantEntry=data.mParameters.arguments.Key;
			$.ajax({
				//url: "https://10.0.1.189:50000/b1s/v1/IK_GNCT(" + oModelData.GrantEntryNo + ")",
				url: "/b1s/v1/IK_COSTCENTER('" + oModelData.PrcCode + "')",
				xhrFields: {
					withCredentials: true
				},
				data: jData,
				type: "PATCH",
				dataType: "json",
				// success: function(json) {
				// 	sap.m.MessageToast.show("Grant Initiative updated sucessfully");
				// },
				success:this.handlelistSave1(),
				error: function(xhr, status, errorThrown) {
					sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
				},
				complete: function(xhr, status) {}
			});

		} else {
			//sap.m.MessageToast.show("FormMode-Add");
			$.ajax({

				//url: "https://10.0.1.189:50000/b1s/v1/IK_GNCT",
				url: "/b1s/v1/IK_COSTCENTER",
				xhrFields: {
					withCredentials: true
				},
				data: jData,
				type: "POST",
				dataType: "json",
				success: function(json) {
				    that.router.navTo("Dashboard");
					sap.m.MessageToast.show("Grant Initiative added sucessfully");
				},
				error: function(xhr, status, errorThrown) {
					sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
				},
				complete: function(xhr, status) {}
			});
		}
		
		 if (oModelData.EntrySaveToUpdate === "Yes") {
			this.handlelistSave();
			oModelData.EntrySaveToUpdate = "No";
		//this.handlelistSave();
		}
	},
	
	handlelistSave1: function(oEvent) {
	    var oModelData = this.oModel.getData();
	    oModelData.EntrySaveToUpdate = "Yes";
		//sap.m.MessageToast.show("");
	},
	
	handlelistSave: function(oEvent) {
		var that = this;
		that.router.navTo("Dashboard");
		if (!this.oGrantInitiativeDialog) {
			this.oGrantInitiativeDialog = sap.ui.xmlfragment("SLFiori.fragments.masters.grantInitiative.grantinitiative_display_save", this);
		}
		//sap.ui.getCore().byId("GrantInitiativeTableSave").removeSelections();
		this.oGrantInitiativeDialog.setModel(this.oModel);
		$.ajax({
			//url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '5'",
			//url: "OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '5'",
			url: "OData/masters/grantcode/list_Display.xsodata/Code?$filter=U_IKDIMEN eq '5'",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().GrantInitiativeList = oData.d.results; //oData.value;
				that.oModel.refresh();
				//Commented on 08-08-2017
				//that.oGrantInitiativeDialog.open();
				sap.m.MessageToast.show("Grant Initiative updated successfully");
			},
			error: function(oError) {
				if (oError.status === 404) {
					sap.m.MessageToast.show("Session timed out,please close the tab and login again");
				} else {
					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				}
			}
		});
	},
	
	handleGrantInitiativeOk_Save: function(oEvent) {
		//this.oGrantInitiativeDialog.close();

		var that = this;
		var oDonorListTable = sap.ui.getCore().byId("GrantInitiativeTableSave");
		var oSelectedGrant = oDonorListTable.getSelectedItem();
		if (oSelectedGrant) {
			var oSelctedCustContext = oSelectedGrant.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var DonorCode = this.oModel.getProperty(path);
			this.oGrantInitiativeDialog.close();
			that.router.navTo("masters.grantinitiative", {
				Key: DonorCode.Code
			});
		} else {
			//this.oCustomerMasterDialog.close();
			//that.router.navTo("DonorMaster",{Key:1});
			sap.m.MessageToast.show("Please select Grant Initiative Code");
		}
	},

	handleGrantInitiativeClose_Save: function(oEvent) {
		this.oGrantInitiativeDialog.close();
		//this.router.navTo("DonorMaster");
	},
	
		onGISearchBack: function(oEvt) {
		var list = sap.ui.getCore().byId("GrantInitiativeTableBack"); //this.getView().byId("idList");
		var oBinding = list.getBinding("items");
		// add filter for search
		var aFilters = [];
		var sQuery = oEvt.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}
		oBinding.filter(aFilters);
	},
	
		onGISearchSave: function(oEvt) {
		var list = sap.ui.getCore().byId("GrantInitiativeTableSave"); //this.getView().byId("idList");
		var oBinding = list.getBinding("items");
		// add filter for search
		var aFilters = [];
		var sQuery = oEvt.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}
		oBinding.filter(aFilters);
	}
	
});

