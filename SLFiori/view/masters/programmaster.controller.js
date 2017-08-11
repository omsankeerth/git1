sap.ui.controller("SLFiori.view.masters.programmaster", {

	onInit: function() {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);

		this.NewEntry = {
		    EntrySaveToUpdate : "No",
			FormMode: "Add",
			PrcCode: "",
			PrcName: "",
			U_ParPgm: "",
				U_MngCd: "",
			U_Mangr: "",
			U_ExtText: "",
			U_GrRes: "",
			U_IKUPSAP: "N",
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
				U_MngCd: "",
			U_Mangr: "",
			U_ExtText: "",
			U_GrRes: "",
			U_IKUPSAP: "N",
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
		this.ProgramCode = data.mParameters.arguments.Key;
		//this.SessionID = data.mParameters.arguments.Session;

		if (this.ProgramCode === "0") {
		    this.byId("PrcCode").setEnabled(true);
		    
		    this.NewEntry = {
		    EntrySaveToUpdate : "No",
			FormMode: "Add",
			PrcCode: "",
			PrcName: "",
			U_ParPgm: "",
				U_MngCd: "",
			U_Mangr: "",
			U_ExtText: "",
			U_GrRes: "",
			U_IKUPSAP: "N",
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
			if (oParameter !== "masters.programmaster") {
				return;
			}
			var oModelData = this.oModel.getData();
			var that = this;
			that.byId("PrcCode").setEnabled(false);
			
			$.ajax({
				//url: "/b1s/v1/ProfitCenters('" + this.ProgramCode + "')?$select=CenterCode,CenterName,U_ParPgm,U_Mangr,U_GrRes,U_ExtText",
				url: "OData/masters/grantcode/grantcode_header.xsodata/Code?$filter=Code eq '" + this.ProgramCode + "'",
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
					that.oModel.setProperty("/U_ParPgm", oData.d.results[0].U_IKPRPRG);
					that.oModel.setProperty("/U_MngCd", oData.d.results[0].U_IKMAN);
					that.oModel.setProperty("/U_Mangr", oData.d.results[0].U_IKMANNM);
					that.oModel.setProperty("/U_ExtText", oData.d.results[0].U_IKEXTTXT);
					that.oModel.setProperty("/U_GrRes", oData.d.results[0].U_IKGRRS);

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
		if (!this.oProgramCodeDialog) {
			this.oProgramCodeDialog = sap.ui.xmlfragment("SLFiori.fragments.masters.programMaster.programcode_display_back", this);
		}
		//sap.ui.getCore().byId("ProgramCodeListTableBack").removeSelections();
		this.oProgramCodeDialog.setModel(this.oModel);
		$.ajax({
			//        		url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '4'",
			//url: "OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '4'",
			url: "OData/masters/grantcode/list_Display.xsodata/Code?$filter=U_IKDIMEN eq '4'",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().ProgramCodeList = oData.d.results; //oData.value;
				that.oModel.refresh();
				that.oProgramCodeDialog.open();
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

	handleProgramCodeOk_Back: function(oEvent) {
		//this.oProgramCodeDialog.close();

		var that = this;
		var oDonorListTable = sap.ui.getCore().byId("ProgramCodeListTableBack");
		var oSelectedGrant = oDonorListTable.getSelectedItem();
		if (oSelectedGrant) {
			var oSelctedCustContext = oSelectedGrant.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var DonorCode = this.oModel.getProperty(path);
			this.oProgramCodeDialog.close();
			that.router.navTo("masters.programmaster", {
				Key: DonorCode.Code
			});
		} else {
			//this.oCustomerMasterDialog.close();
			//that.router.navTo("DonorMaster",{Key:1});
			sap.m.MessageToast.show("Please select Program Code");
		}
	},

	handleProgramCodeClose_Back: function(oEvent) {
		this.oProgramCodeDialog.close();
		//this.router.navTo("DonorMaster");
	},

	handleSave: function(oEvent) {
		var oModelData = this.oModel.getData();

		var that = this;

		var jData = JSON.stringify({
			Code: oModelData.PrcCode,
			Name: oModelData.PrcName,
			U_IKPRPRG: oModelData.U_ParPgm,
			U_IKMAN: oModelData.U_MngCd,
			U_IKMANNM: oModelData.U_Mangr,
			U_IKEXTTXT: oModelData.U_ExtText,
			U_IKGRRS: oModelData.U_GrRes,
			//EffectiveFrom: "2016-01-01",
			U_IKDIMEN: "4",
			U_IKUPSAP: "N"
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
				// 	sap.m.MessageToast.show("Program Master updated sucessfully");
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
					sap.m.MessageToast.show("Program Master added sucessfully");
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
		if (!this.oProgramCodeDialog) {
			this.oProgramCodeDialog = sap.ui.xmlfragment("SLFiori.fragments.masters.programMaster.programcode_display_save", this);
		}
		//sap.ui.getCore().byId("ProgramCodeListTableBack").removeSelections();
		this.oProgramCodeDialog.setModel(this.oModel);
		$.ajax({
			//        		url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '4'",
			//url: "OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '4'",
			url: "OData/masters/grantcode/list_Display.xsodata/Code?$filter=U_IKDIMEN eq '4'",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().ProgramCodeList = oData.d.results; //oData.value;
				that.oModel.refresh();
				//Commented on 08-08-2017
				//that.oProgramCodeDialog.open();
				sap.m.MessageToast.show("Program Master updated successfully");
			},
		
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
	
	handleProgramCodeOk_Save: function(oEvent) {
		//this.oProgramCodeDialog.close();

		var that = this;
		var oDonorListTable = sap.ui.getCore().byId("ProgramCodeListTableSave");
		var oSelectedGrant = oDonorListTable.getSelectedItem();
		if (oSelectedGrant) {
			var oSelctedCustContext = oSelectedGrant.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var DonorCode = this.oModel.getProperty(path);
			this.oProgramCodeDialog.close();
			that.router.navTo("masters.programmaster", {
				Key: DonorCode.Code
			});
		} else {
			//this.oCustomerMasterDialog.close();
			//that.router.navTo("DonorMaster",{Key:1});
			sap.m.MessageToast.show("Please select Program Code");
		}
	},

	handleProgramCodeClose_Save: function(oEvent) {
		this.oProgramCodeDialog.close();
		//this.router.navTo("DonorMaster");
	},
	
	handleUserList: function(oEvent) {
		var that = this;
		if (!this.oUserMasterPgmDialog) {
			this.oUserMasterPgmDialog = sap.ui.xmlfragment("SLFiori.fragments.userMaster", this);
		}
		sap.ui.getCore().byId("UserListTable").removeSelections();
		this.oUserMasterPgmDialog.setModel(this.oModel);
		$.ajax({
			//url: "/b1s/v1/BusinessPartners?$select=CardCode,CardName,ContactPerson,Cellular,EmailAddress&$filter=Valid eq 'Y' and Frozen eq 'N' and CardType eq 'C' &$top=1000&$orderby=CardName",
			url: "OData/GrantContract_User.xsodata/USER_CODE",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().UserList = oData.d.results; //oData.value;
				that.oModel.refresh();
				that.oUserMasterPgmDialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			}
		});
	},

	handleUserOk: function(oEvent) {
		var oUserListTable = sap.ui.getCore().byId("UserListTable");
		var oSelectedUser = oUserListTable.getSelectedItem();
		if (oSelectedUser) {
			var oSelctedCustContext = oSelectedUser.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var User = this.oModel.getProperty(path);
			//this.oModel.setProperty("/GrFinManCode", User.USER_CODE);
			this.oModel.setProperty("/U_MngCd", User.USER_CODE);
			this.oModel.setProperty("/U_Mangr", User.U_NAME);

			//this.oModel.setProperty("/DonorCnt", Donor.CntctPrsn);
			//this.oModel.setProperty("/TelNo", User.Cellular);

			this.oModel.refresh();
			sap.ui.getCore().byId("UserListTable").removeSelections();
			this.oUserMasterPgmDialog.close();
		} else {
			sap.m.MessageToast.show("Please select User");
		}
	},

	handleUserClose: function() {
		sap.ui.getCore().byId("UserListTable").removeSelections();
		this.oUserMasterPgmDialog.close();
	},
	
	onPgmCodeSearchSave: function(oEvt) {
		var list = sap.ui.getCore().byId("ProgramCodeListTableSave"); //this.getView().byId("idList");
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
	
	onPgmCodeSearchBack: function(oEvt) {
		var list = sap.ui.getCore().byId("ProgramCodeListTableBack"); //this.getView().byId("idList");
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