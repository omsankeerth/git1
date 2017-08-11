sap.ui.controller("SLFiori.view.masters.grantcode", {

	onInit: function() {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
        
		this.NewEntry = {
			EntrySaveToUpdate: "No",
			FormMode: "Add",
			PrcCode: "",
			PrcName: "",
			U_GrCur: "",
			U_MngCd: "",
			U_Mangr: "",
			U_ExtText: "",
			U_GrRes: "",
			CurrCode: "",
			ComboRes: [{
				key: "",
				value: ""
 			}, {
				key: "U",
				value: "UnRestricted"
			}, {
				key: "R",
				value: "Restricted"
			}, {
				key: "URP",
				value: "UnRestricted to program"
			}, {
				key: "RCP",
				value: "Restricted to country & program"
			}, {
				key: "UC",
				value: "UnRestricted to country"
			}]
		};

		this.list = {
			EntrySaveToUpdate: "No",
			FormMode: "Update",
			PrcCode: "",
			PrcName: "",
			U_GrCur: "",
			U_MngCd: "",
			U_Mangr: "",
			U_ExtText: "",
			U_GrRes: "",
			CurrCode: "",
			ComboRes: [{
				key: "",
				value: ""
 			}, {
				key: "U",
				value: "UnRestricted"
			}, {
				key: "R",
				value: "Restricted"
			}, {
				key: "URP",
				value: "UnRestricted to program"
			}, {
				key: "RCP",
				value: "Restricted to country & program"
			}, {
				key: "UC",
				value: "UnRestricted to country"
			}]
		};

		this.oModel = new sap.ui.model.json.JSONModel(this.list);
		this.getView().setModel(this.oModel);
	},

	onAfterRendering: function() {
	    
	    var oModelData = this.oModel.getData();
	    
		var view = this.getView();
		

		
		//sap.ui.getCore().getControl("UName").focus();
		//this.byId("UName").focus();
		view.addDelegate({
			onsapenter: function(e) {
				view.getController().handleSave();
			}
		});
	},

	handleSave: function(oEvent) {
		var oModelData = this.oModel.getData();

		var that = this;

		var jData = JSON.stringify({
			Code: oModelData.PrcCode,
			Name: oModelData.PrcName,
			U_IKGRCUR: oModelData.CurrCode,
			U_IKMAN: oModelData.U_MngCd,
			U_IKMANNM: oModelData.U_Mangr,
			U_IKEXTTXT: oModelData.U_ExtText,
			U_IKGRRS: oModelData.U_GrRes,
			//EffectiveFrom: "2016-01-01",
			U_IKDIMEN: "1",
			U_IKUPSAP: "N"
		});
		//|| oModelData.U_MngCd === ""
		if (oModelData.U_Mangr === "") {
		    this.getView().byId("Error").setVisible(true);
			this.getView().byId("U_Mangr").setValueState("Error");
		} else if (oModelData.PrcName === "") {
			this.getView().byId("PrcName").setValueState("Error");
		} else if (oModelData.PrcCode === "") {
			this.getView().byId("PrcCode").setValueState("Error");
		} else if (oModelData.U_GrCur === "") {
			this.getView().byId("U_GrCur").setValueState("Error");
		} else if (oModelData.U_GrRes === "") {
			//this.getView().byId("U_GrRes").setValueState("Error");
			this.getView().byId('U_GrRes').addStyleClass('myStateError');
			sap.m.MessageToast.show("Please select Grant Restricted field");
		} else {
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
					// 	success:function(xhr, status) {
					// 	    ListUpdated = "Yes";
					// 	},
					success: this.handlelistSave1(),
					error: function(xhr, status, errorThrown) {
						sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
					},
					complete: function(xhr, status) {
						//ListUpdated = "Yes";
					}
					//complete: this.handlelistSave()
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
						sap.m.MessageToast.show("Grant Code Added Sucessfully");
					},
					error: function(xhr, status, errorThrown) {
						sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
					},
					complete: function(xhr, status) {}
				});
			}
		}
		if (oModelData.EntrySaveToUpdate === "Yes") {
			this.handlelistSave();
			oModelData.EntrySaveToUpdate = "No";
			//this.handlelistSave();
		}
		//var oModelData = this.oModel.getData();

	},

	handlelistSave1: function(oEvent) {
		var oModelData = this.oModel.getData();
		oModelData.EntrySaveToUpdate = "Yes";
		//sap.m.MessageToast.show("");

	},

	handlelistSave: function(oEvent) {
		var that = this;
		that.router.navTo("Dashboard");
		if (!this.oSaveDialog) {
			this.oSaveDialog = sap.ui.xmlfragment("SLFiori.fragments.masters.grantcode_display_save", this);
		}
		sap.ui.getCore().byId("CostCentersListTableSave").removeSelections();
		this.oSaveDialog.setModel(this.oModel);
		$.ajax({
			//url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '1'",
			url: "OData/masters/grantcode/list_Display.xsodata/Code?$filter=U_IKDIMEN eq '1'",
			//url: "OData/masters/grantcode/list_Display.xsodata/Code",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().CostCentersListSave = oData.d.results; //oData.value;
				that.oModel.refresh();
				that.router.navTo("Dashboard");
				//Commented on 08-08-2017 
				//that.oSaveDialog.open();
				sap.m.MessageToast.show("Grant Code Updated Sucessfully");
			},
			error: function(oError) {
				if (oError.status === 404) {
					sap.m.MessageToast.show("Session timed out,please close the tab and login again");
				} else {
					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				}
			}
		});
		return;
	},

	handleCostCentersOk_Save: function(oEvent) {
		//this.oDialog.close();

		var that = this;
		var oDonorListTable = sap.ui.getCore().byId("CostCentersListTableSave");
		var oSelectedGrant = oDonorListTable.getSelectedItem();
		if (oSelectedGrant) {
			var oSelctedCustContext = oSelectedGrant.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var DonorCode = this.oModel.getProperty(path);
			this.oSaveDialog.close();
			that.router.navTo("masters.grantcode", {
				Key: DonorCode.Code
			});
		} else {
			//this.oCustomerMasterDialog.close();
			//that.router.navTo("DonorMaster",{Key:1});
			sap.m.MessageToast.show("Please select Grant");
		}
	},

	handleCostCentersClose_Save: function(oEvent) {
		this.oSaveDialog.close();
		//this.router.navTo("DonorMaster");
	},

	_handleRouteMatched: function(data) {
		this.GrantCode = data.mParameters.arguments.Key;
		this.EntrySaveToUpdate = "No";
		//this.SessionID = data.mParameters.arguments.Session;
		this.getView().byId("PrcName").setValueState("None");
		this.getView().byId("PrcCode").setValueState("None");
		this.getView().byId("U_Mangr").setValueState("None");
		this.getView().byId("U_GrCur").setValueState("None");
		
		this.getView().byId('U_GrRes').removeStyleClass('myStateError');

		if (this.GrantCode === "0") {
			this.byId("PrcCode").setEnabled(true);
			this.byId("U_GrCur").setEnabled(true);
			this.byId("U_GrRes").setEnabled(true);
			this.NewEntry = {
				EntrySaveToUpdate: "No",
				FormMode: "Add",
				PrcCode: "",
				PrcName: "",
				U_GrCur: "",
				U_MngCd: "",
				U_Mangr: "",
				U_ExtText: "",
				U_GrRes: "",
				CurrCode: "",
				ComboRes: [{
					key: "",
					value: ""
 			}, {
					key: "U",
					value: "UnRestricted"
			}, {
					key: "R",
					value: "Restricted"
			}, {
					key: "URP",
					value: "UnRestricted to program"
			}, {
					key: "RCP",
					value: "Restricted to country & program"
			}, {
					key: "UC",
					value: "UnRestricted to country"
			}]
			};

			this.oModel = new sap.ui.model.json.JSONModel(this.NewEntry);
			this.getView().setModel(this.oModel);
		} else {
			//this.byId("PrcCode").setEditable = false;
			var oParameter = data.getParameter("name");
			if (oParameter !== "masters.grantcode") {
				return;
			}
			var oModelData = this.oModel.getData();
			var that = this;
			that.byId("PrcCode").setEnabled(false);

			//Checking Whether any Grant Contract has raised for this GrantCode(To make uneditable of few fields)
			$.ajax({
				//url: "/b1s/v1/ProfitCenters('" + this.GrantCode + "')?$select=CenterCode,CenterName,U_GrCur,U_Mangr,U_GrRes,U_ExtText",
				url: "/b1s/v1/IK_GNCT?$filter=U_GCode eq '" + this.GrantCode + "'",
				xhrFields: {
					withCredentials: true
				},
				async: false,
				type: "GET",
				dataType: "json",
				success: function(oData, oResponse) {
					if (oData.value.length === 0) {
						that.byId("U_GrCur").setEnabled(true);
						that.byId("U_GrRes").setEnabled(true);
					} else {
						that.byId("U_GrCur").setEnabled(false);
						that.byId("U_GrRes").setEnabled(false);
					}

					that.oModel.refresh();
				},
				error: function(oError) {
					this.byId("PrcName").setEnabled(true);
					//sap.m.MessageToast.show("Error: " + oError);
				}
			});

			//Checking Whether any Grant Allocation has raised for this GrantCode(To make uneditable of few fields)
			$.ajax({
				//url: "/b1s/v1/ProfitCenters('" + this.GrantCode + "')?$select=CenterCode,CenterName,U_GrCur,U_Mangr,U_GrRes,U_ExtText",
				url: "/b1s/v1/IK_GRALC?$filter=U_GCode eq '" + this.GrantCode + "'",
				xhrFields: {
					withCredentials: true
				},
				async: false,
				type: "GET",
				dataType: "json",
				success: function(oData, oResponse) {
					if (oData.value.length === 0) {
						that.byId("U_GrCur").setEnabled(true);
						that.byId("U_GrRes").setEnabled(true);
					} else {
						that.byId("U_GrCur").setEnabled(false);
						that.byId("U_GrRes").setEnabled(false);
					}

					that.oModel.refresh();
				},
				error: function(oError) {
					this.byId("PrcName").setEnabled(true);
					//sap.m.MessageToast.show("Error: " + oError);
				}
			});

			$.ajax({
				//url: "/b1s/v1/ProfitCenters('" + this.GrantCode + "')?$select=CenterCode,CenterName,U_GrCur,U_Mangr,U_GrRes,U_ExtText",
				url: "OData/masters/grantcode/grantcode_header.xsodata/Code?$filter=Code eq '" + this.GrantCode + "'",
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
					that.oModel.setProperty("/CurrCode", oData.d.results[0].U_IKGRCUR);
					that.oModel.setProperty("/U_GrCur", oData.d.results[0].U_IKGRCUR);
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

	onBack: function() {
		//var that = this;
		//that.router.navTo("Dashboard");

		var that = this;
		if (!this.oDialog) {
			this.oDialog = sap.ui.xmlfragment("SLFiori.fragments.masters.grantcode_display_back", this);
		}
		sap.ui.getCore().byId("CostCentersListTableBack").removeSelections();
		this.oDialog.setModel(this.oModel);
		$.ajax({
			//url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '1'",
			url: "OData/masters/grantcode/list_Display.xsodata/Code?$filter=U_IKDIMEN eq '1'",
			//url: "OData/masters/grantcode/list_Display.xsodata/Code",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().CostCentersListBack = oData.d.results; //oData.value;
				that.oModel.refresh();
				that.oDialog.open();
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

	handlegoBack: function() {
		var that = this;
		that.router.navTo("Dashboard");
	},

	handleCostCentersOk: function(oEvent) {
		//this.oDialog.close();

		var that = this;
		var oDonorListTable = sap.ui.getCore().byId("CostCentersListTableBack");
		var oSelectedGrant = oDonorListTable.getSelectedItem();
		if (oSelectedGrant) {
			var oSelctedCustContext = oSelectedGrant.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var DonorCode = this.oModel.getProperty(path);
			this.oDialog.close();
			that.router.navTo("masters.grantcode", {
				Key: DonorCode.Code
			});
		} else {
			//this.oCustomerMasterDialog.close();
			//that.router.navTo("DonorMaster",{Key:1});
			sap.m.MessageToast.show("Please select Donor");
		}
	},

	handleCostCentersClose: function(oEvent) {
		this.oDialog.close();
		//this.router.navTo("DonorMaster");
	},

	handleCurrency: function(oEvent) {
		var that = this;
		if (!this.oCurrencyrDialog) {
			this.oCurrencyrDialog = sap.ui.xmlfragment("SLFiori.fragments.CurrencyMasterV1", this);
		}
		sap.ui.getCore().byId("CurrencyListTable").removeSelections();
		this.oCurrencyrDialog.setModel(this.oModel);
		$.ajax({
			//url: "https://172.31.28.160:50000/b1s/v1/BusinessPartners?$select=CardCode,CardName,CntctPrsn,Cellular&$filter=CardType eq 'C'",
			//url: "https://172.31.28.160:50000/b1s/v1/BusinessPartners?$select=CardCode,CardName,ContactPerson,Cellular",
			//url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/GrantContract_Currencies.xsodata/Currency",
			url: "OData/GrantContract_Currencies.xsodata/Currency",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().CurrencyList = oData.d.results; //oData.value;
				that.oModel.refresh();
				that.oCurrencyrDialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			}
		});
	},

	handleCurrencyOk: function(oEvent) {
		var oDonorListTable = sap.ui.getCore().byId("CurrencyListTable");
		var oSelectedDonor = oDonorListTable.getSelectedItem();
		if (oSelectedDonor) {
			var oSelctedCustContext = oSelectedDonor.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Donor = this.oModel.getProperty(path);
			this.oModel.setProperty("/U_GrCur", Donor.CurrName);
			this.oModel.setProperty("/CurrCode", Donor.CurrCode);
			//this.oModel.setProperty("/DonorCnt", Donor.CntctPrsn);
			//this.oModel.setProperty("/TelNo", Donor.Cellular);

			this.oModel.refresh();
			sap.ui.getCore().byId("CurrencyListTable").removeSelections();
			this.oCurrencyrDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Currency");
		}
	},

	handleCurrencyClose: function() {
		sap.ui.getCore().byId("CurrencyListTable").removeSelections();
		this.oCurrencyrDialog.close();
	},

	handleUserList: function(oEvent) {
		var that = this;
		if (!this.oUserMasterDialog) {
			this.oUserMasterDialog = sap.ui.xmlfragment("SLFiori.fragments.userMaster", this);
		}
		sap.ui.getCore().byId("UserListTable").removeSelections();
		this.oUserMasterDialog.setModel(this.oModel);
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
				that.oUserMasterDialog.open();
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
			this.oUserMasterDialog.close();
		} else {
			sap.m.MessageToast.show("Please select User");
		}
	},

	handleUserClose: function() {
		sap.ui.getCore().byId("UserListTable").removeSelections();
		this.oUserMasterDialog.close();
	},

	handleCapital: function(oEvent) {
		//var that = this;
		//	   var Capital = this.byId("PrcName").mProperties.value;
		var Capital = oEvent.mParameters.value;
		Capital = Capital.toUpperCase();
		this.oModel.setProperty("/PrcName", Capital);
	},

	onDim1Search: function(oEvt) {
		var list = sap.ui.getCore().byId("CostCentersListTableBack"); //this.getView().byId("idList");
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