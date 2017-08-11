sap.ui.controller("SLFiori.view.transactions.expenseRequest", {

	onInit: function() {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
		this.ExpenseReqEntry = "";
		//this.getRouter().attachRoutePatternMatched(this.onRouteMatched, this);

		var CurrDate = new Date();

		var month = CurrDate.getMonth() + 1;
		var date = CurrDate.getDate();

		if (month < 10) {
			month = "0" + month;
		}

		if (date < 10) {
			date = "0" + date;
		}

		CurrDate = CurrDate.getFullYear() + "-" + month + "-" + date;

		this.NewEntry = {
			FormMode: "Add",
			ExpCode: "",

			Status: "O",
			VBNo: "",
			VBDate: "",
			VBDueDt: "",
			ReqTyp: "",
			ReqDate: CurrDate, //new Date(),
			ReqNo: "",
			ReqName: window.UserCode,
			ReqCode: "",
			ExpSubCd: "",
			ExpSubNm: "",
			SubCurCd: "",
			SubCurNm: "",
			ExpCurCd: "",
			ExpCurNm: "",
			Rmks: "",
			U_SbMgr: "",
					U_SbMail: "",

			ExpenseLines: [
				{
					LineId: "1",
					U_ExTyCd:"",
					U_ExpTyp: "",
					U_DescExp: "",
					U_CurrCode: "",
					U_CurrName: "",
					U_ExpAmt: "",
					U_GrCode: "",
					U_GrName: "",
					U_LocCode: "",
					U_LocName: "",
					U_PgmCode: "",
					U_PgmName: "",
					U_GICode: "",
					U_GIName: "",
					U_IsGRPO: "N",
					U_PgmMgr:"",
					U_PgmMail:"",
					U_UpMail: "No",
					U_Accpt: false,
					U_Rjct: false
				}
                      ],

			Attachments: [{
				LineId: "1",
				U_AttDesc: "",
				U_Attach: ""
				}],

			ComboListStatus: [{
				key: "C",
				value: "Closed"
			}, {
				key: "O",
				value: "Open"
			}, {
				key: "PA",
				value: "Pending for Approval"
			}, {
				key: "Approved",
				value: "Open"
			}, {
				key: "R",
				value: "Rejected"
			}, {
				key: "L",
				value: "Cancelled"
			}],

			RequestType: [{
				key: "1",
				value: "Self"
						}, {
				key: "2",
				value: "Vendor"
						}]

		};

		this.list = {
			FormMode: "Update",
			ExpCode: "",

			Status: "O",
			VBNo: "",
			VBDate: "",
			VBDueDt: "",
			ReqTyp: "",
			ReqDate: CurrDate, //new Date(),
			ReqNo: "",
			ReqName: window.UserCode,
			ReqCode: "",
			ExpSubCd: "",
			ExpSubNm: "",
			SubCurCd: "",
			SubCurNm: "",
			ExpCurCd: "",
			ExpCurNm: "",
			Rmks: "",
			U_SbMgr: "",
					U_SbMail: "",

			ExpenseLines: [
				{
					LineId: "1",
					U_ExTyCd:"",
					U_ExpTyp: "",
					U_DescExp: "",
					U_CurrCode: "",
					U_CurrName: "",
					U_ExpAmt: "",
					U_GrCode: "",
					U_GrName: "",
					U_LocCode: "",
					U_LocName: "",
					U_PgmCode: "",
					U_PgmName: "",
					U_GICode: "",
					U_GIName: "",
					U_IsGRPO: "N",
					U_PgmMgr:"",
					U_PgmMail:"",
					U_UpMail: "No",
					U_Accpt: false,
					U_Rjct: false
				}
                      ],

			Attachments: [{
				LineId: "1",
				U_AttDesc: "",
				U_Attach: ""
				}],

			ComboListStatus: [{
				key: "C",
				value: "Closed"
			}, {
				key: "O",
				value: "Open"
			}, {
				key: "PA",
				value: "Pending for Approval"
			}, {
				key: "Approved",
				value: "Open"
			}, {
				key: "R",
				value: "Rejected"
			}, {
				key: "L",
				value: "Cancelled"
			}],

			RequestType: [{
				key: "1",
				value: "Self"
						}, {
				key: "2",
				value: "Vendor"
						}]
		};

		this.oModel = new sap.ui.model.json.JSONModel(this.list);
		this.getView().setModel(this.oModel);

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
			this.oModel.setProperty("/ReqCode", User.USER_CODE);
			this.oModel.setProperty("/ReqName", User.U_NAME);
			//this.oModel.setProperty("/ReqId", User.E_Mail);
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

	handleDim2: function(oEvent) {
		var that = this;
		if (!this.oDim2Dialog) {
			this.oDim2Dialog = sap.ui.xmlfragment("SLFiori.fragments.transactions.expenseRequest.Dim2", this);
		}

		sap.ui.getCore().byId("expDim2ListTable").removeSelections();
		this.oDim2Dialog.setModel(this.oModel);
		$.ajax({
			//			url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '2'",
			url: "OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '2'",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				var aItemsData = oData.d.results; //oData.value;
				for (var m = 0; m < aItemsData.length; m++) {
					aItemsData[m].Amount = "0";
				}
				that.oModel.getData().Dim2List = oData.d.results;
				that.oModel.refresh();
				that.oDim2Dialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			}
		});
	},

	handleDim2Ok: function(oEvent) {
		var oDim2ListTable = sap.ui.getCore().byId("expDim2ListTable");
		var oSelectedDim2 = oDim2ListTable.getSelectedItem();
		//var oItems = this.oModel.getData().GrantRevenueDetails;

		if (oSelectedDim2) {
			var oSelctedCustContext = oSelectedDim2.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Dim2 = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);
			//this.oModel.setProperty("/Dim2List/"+this.oDim2RowId + "/RevSub", Dim2.CCCode);
			this.oModel.setProperty("/ExpSubCd", Dim2.CCCode);
			this.oModel.setProperty("/ExpSubNm", Dim2.CCName);
			this.oModel.setProperty("/SubCurNm", Dim2.U_GrCur);
			
			this.oModel.setProperty("/U_SbMgr", Dim2.Manager);
			this.oModel.setProperty("/U_SbMail", Dim2.EMail);
					
			this.oModel.refresh();
			sap.ui.getCore().byId("expDim2ListTable").removeSelections();
			this.oDim2Dialog.close();
		} else {
			sap.m.MessageToast.show("Please select Subsidary");
		}

		//this.oModel.getData().GrantRevenueDetails = oItems;

	},

	handleDim2Close: function(oEvent) {
		this.oDim2Dialog.close();
	},

	handleExpCurrency: function(oEvent) {
		var that = this;
		if (!this.oCurrencyrDialog) {
			this.oCurrencyrDialog = sap.ui.xmlfragment("SLFiori.fragments.transactions.expenseRequest.currencyMaster", this);
		}
		sap.ui.getCore().byId("expCurrencyListTable").removeSelections();
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
	    var oModel = this.oModel;
		var oDonorListTable = sap.ui.getCore().byId("expCurrencyListTable");
		var oSelectedDonor = oDonorListTable.getSelectedItem();
		if (oSelectedDonor) {
			var oSelctedCustContext = oSelectedDonor.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Donor = this.oModel.getProperty(path);
			this.oModel.setProperty("/ExpCurCd", Donor.CurrCode);
			this.oModel.setProperty("/ExpCurNm", Donor.CurrName);
			
			var oModelData = oModel.getData();
			
			var oMtxRow = this.oModel.getData().ExpenseLines;
		
		for (var i = 0; i < oMtxRow.length; i++) {
            oMtxRow[i].U_CurrCode = oModelData.ExpCurCd;
			oMtxRow[i].U_CurrName = oModelData.ExpCurNm;
		}

			this.oModel.refresh();
			sap.ui.getCore().byId("expCurrencyListTable").removeSelections();
			this.oCurrencyrDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Currency");
		}
	},

	handleCurrencyClose: function() {
		sap.ui.getCore().byId("expCurrencyListTable").removeSelections();
		this.oCurrencyrDialog.close();
	},
	
	handleSubCurrency: function(oEvent) {
		var that = this;
		if (!this.oSubCurrencyDialog) {
			this.oSubCurrencyDialog = sap.ui.xmlfragment("SLFiori.fragments.transactions.expenseRequest.currencyMasterSubsidary", this);
		}
		sap.ui.getCore().byId("subCurrencyListTable").removeSelections();
		this.oSubCurrencyDialog.setModel(this.oModel);
		$.ajax({
			url: "OData/GrantContract_Currencies.xsodata/Currency",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().CurrencyListSub = oData.d.results; //oData.value;
				that.oModel.refresh();
				that.oSubCurrencyDialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			}
		});
	},

	handleSubCurrencyOk: function(oEvent) {
		var oDonorListTable = sap.ui.getCore().byId("subCurrencyListTable");
		var oSelectedDonor = oDonorListTable.getSelectedItem();
		if (oSelectedDonor) {
			var oSelctedCustContext = oSelectedDonor.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Donor = this.oModel.getProperty(path);
			this.oModel.setProperty("/SubCurCd", Donor.CurrCode);
			this.oModel.setProperty("/SubCurNm", Donor.CurrName);

	var oMtxRow = this.oModel.getData().ExpenseLines;
	    for (var i = 0; i < oMtxRow.length; i++) {
            this.oModel.setProperty("/ExpenseLines/" + i + "/U_CurrCode",  Donor.CurrCode);
            this.oModel.setProperty("/ExpenseLines/" + i + "/U_CurrName",  Donor.CurrName);
		}
		
			this.oModel.refresh();
			sap.ui.getCore().byId("subCurrencyListTable").removeSelections();
			this.oSubCurrencyDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Currency");
		}
	},

	handleSubCurrencyClose: function() {
		sap.ui.getCore().byId("subCurrencyListTable").removeSelections();
		this.oSubCurrencyDialog.close();
	},
	
	handleDim3: function(oEvent) {
		var oModel = this.oModel;
		var that = this;
		if (!this.oDim3Dialog) {
			this.oDim3Dialog = sap.ui.xmlfragment("SLFiori.fragments.transactions.expenseRequest.Dim3", this);
		}
		this.oDim3 = "";
		var oDim3BindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aDim3SelectedPathLength = oDim3BindingContextPath.length;
		var oDim3RowId = aDim3SelectedPathLength - 1;
		this.oDim3RowId = oDim3BindingContextPath[oDim3RowId];

		sap.ui.getCore().byId("expDim3ListTable").removeSelections();
		this.oDim3Dialog.setModel(this.oModel);

        
		var oModelData = oModel.getData();
		var SubLoc = oModelData.ExpSubCd;

		$.ajax({
			//url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/CostCenter.xsodata/CostCenter?$filter=U_SubCode eq '" + SubLoc +"'",
			//url: "OData/CostCenter.xsodata/CostCenter?$filter=U_SubCode eq '" + SubLoc + "'",
			url: "OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '3' and U_SubCode eq '" + SubLoc + "'",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				var aItemsData = oData.d.results; //oData.value;
				for (var m = 0; m < aItemsData.length; m++) {
					aItemsData[m].Amount = "0";
				}
				that.oModel.getData().Dim3List = oData.d.results;
				that.oModel.refresh();
				that.oDim3Dialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			}
		});
	},

	handleDim3Ok: function(oEvent) {
		var oDim3ListTable = sap.ui.getCore().byId("expDim3ListTable");
		var oSelectedDim3 = oDim3ListTable.getSelectedItem();
		//var oItems = this.oModel.getData().GrantRevenueDetails;

		if (oSelectedDim3) {
			var oSelctedCustContext = oSelectedDim3.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Dim3 = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);

			this.oModel.setProperty("/ExpenseLines/" + this.oDim3RowId + "/U_LocCode", Dim3.CCCode);
			this.oModel.setProperty("/ExpenseLines/" + this.oDim3RowId + "/U_LocName", Dim3.CCName);
			this.oModel.refresh();
			sap.ui.getCore().byId("expDim3ListTable").removeSelections();
			this.oDim3Dialog.close();
		} else {
			sap.m.MessageToast.show("Please select Dimension");
		}
		//this.oModel.getData().GrantRevenueDetails = oItems;

	},

	handleDim3Close: function(oEvent) {
		this.oDim3Dialog.close();
	},
	
	handleDim4: function(oEvent) {
		var that = this;
		if (!this.oDim4Dialog) {
			this.oDim4Dialog = sap.ui.xmlfragment("SLFiori.fragments.transactions.expenseRequest.Dim4", this);
		}
		this.oDim4 = "";
		var oDim4BindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aDim4SelectedPathLength = oDim4BindingContextPath.length;
		var oDim4RowId = aDim4SelectedPathLength - 1;
		this.oDim4RowId = oDim4BindingContextPath[oDim4RowId];

		sap.ui.getCore().byId("expDim4ListTable").removeSelections();
		this.oDim4Dialog.setModel(this.oModel);
		$.ajax({
			//url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '4'",
			url: "OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '4'",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				var aItemsData = oData.d.results; //oData.value;
				for (var m = 0; m < aItemsData.length; m++) {
					aItemsData[m].Amount = "0";
				}
				that.oModel.getData().Dim4List = oData.d.results;
				that.oModel.refresh();
				that.oDim4Dialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			}
		});
	},

	handleDim4Ok: function(oEvent) {
		var oDim4ListTable = sap.ui.getCore().byId("expDim4ListTable");
		var oSelectedDim4 = oDim4ListTable.getSelectedItem();
		if (oSelectedDim4) {
			var oSelctedCustContext = oSelectedDim4.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Dim4 = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);
			this.oModel.setProperty("/ExpenseLines/" + this.oDim4RowId + "/U_PgmCode", Dim4.CCCode);
			this.oModel.setProperty("/ExpenseLines/" + this.oDim4RowId + "/U_PgmName", Dim4.CCName);
			
			this.oModel.setProperty("/ExpenseLines/" + this.oDim4RowId + "/U_PgmMgr", Dim4.Manager);
			this.oModel.setProperty("/ExpenseLines/" + this.oDim4RowId + "/U_PgmMail", Dim4.EMail);
			
			this.oModel.refresh();
			sap.ui.getCore().byId("expDim4ListTable").removeSelections();
			this.oDim4Dialog.close();
		} else {
			sap.m.MessageToast.show("Please select Dimension");
		}

	},

	handleDim4Close: function(oEvent) {
		this.oDim4Dialog.close();
	},

	handleDim5: function(oEvent) {
		var that = this;
		if (!this.oDim5Dialog) {
			this.oDim5Dialog = sap.ui.xmlfragment("SLFiori.fragments.transactions.expenseRequest.Dim5", this);
		}
		this.oDim5 = "";
		var oDim5BindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aDim5SelectedPathLength = oDim5BindingContextPath.length;
		var oDim5RowId = aDim5SelectedPathLength - 1;
		this.oDim5RowId = oDim5BindingContextPath[oDim5RowId];

		sap.ui.getCore().byId("expDim5ListTable").removeSelections();
		this.oDim5Dialog.setModel(this.oModel);
		$.ajax({
			//url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '5'",
			url: "OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '5'",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				var aItemsData = oData.d.results; //oData.value;
				for (var m = 0; m < aItemsData.length; m++) {
					aItemsData[m].Amount = "0";
				}
				that.oModel.getData().Dim5List = oData.d.results;
				that.oModel.refresh();
				that.oDim5Dialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			}
		});
	},

	handleDim5Ok: function(oEvent) {
		var oDim5ListTable = sap.ui.getCore().byId("expDim5ListTable");
		var oSelectedDim5 = oDim5ListTable.getSelectedItem();
		if (oSelectedDim5) {
			var oSelctedCustContext = oSelectedDim5.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Dim5 = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);
			this.oModel.setProperty("/ExpenseLines/" + this.oDim5RowId + "/U_GICode", Dim5.CCCode);
			this.oModel.setProperty("/ExpenseLines/" + this.oDim5RowId + "/U_GIName", Dim5.CCName);
			this.oModel.refresh();
			sap.ui.getCore().byId("expDim5ListTable").removeSelections();
			this.oDim5Dialog.close();
		} else {
			sap.m.MessageToast.show("Please select Dimension");
		}

	},

	handleDim5Close: function(oEvent) {
		this.oDim5Dialog.close();
	},
	
	handleDim1: function(oEvent) {
		var that = this;
		if (!this.oDim1Dialog) {
			this.oDim1Dialog = sap.ui.xmlfragment("SLFiori.fragments.transactions.expenseRequest.Dim1", this);
		}
		this.oDim1 = "";
		var oDim1BindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aDim1SelectedPathLength = oDim1BindingContextPath.length;
		var oDim1RowId = aDim1SelectedPathLength - 1;
		this.oDim1RowId = oDim1BindingContextPath[oDim1RowId];

		sap.ui.getCore().byId("expDim1ListTable").removeSelections();
		this.oDim1Dialog.setModel(this.oModel);
		$.ajax({
			//url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '5'",
			url: "OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '1'",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				var aItemsData = oData.d.results; //oData.value;
				for (var m = 0; m < aItemsData.length; m++) {
					aItemsData[m].Amount = "0";
				}
				that.oModel.getData().Dim1List = oData.d.results;
				that.oModel.refresh();
				that.oDim1Dialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				if (oError.status === "404") {
				    sap.m.MessageToast.show("Session timed out,please close the tab and login again");
				} else {
				    sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				}
			}
		});
	},

	handleDim1Ok: function(oEvent) {
		var oDim1ListTable = sap.ui.getCore().byId("expDim1ListTable");
		var oSelectedDim1 = oDim1ListTable.getSelectedItem();
		if (oSelectedDim1) {
			var oSelctedCustContext = oSelectedDim1.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Dim1 = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);
			this.oModel.setProperty("/ExpenseLines/" + this.oDim1RowId + "/U_GrCode", Dim1.CCCode);
			this.oModel.setProperty("/ExpenseLines/" + this.oDim1RowId + "/U_GrName", Dim1.CCName);
			this.oModel.refresh();
			sap.ui.getCore().byId("expDim1ListTable").removeSelections();
			this.oDim1Dialog.close();
		} else {
			sap.m.MessageToast.show("Please select Dimension");
		}

	},

	handleDim1Close: function(oEvent) {
		this.oDim1Dialog.close();
	},
	
	handleAddRow: function() {

		var ExpenseLinesTable = this.byId("idExpenseLines");

		var aSelectedItems = ExpenseLinesTable.getSelectedItems();
		//If No Row was selected then we should add a new Empty Row
			var oModel = this.oModel;
			var oModelData = oModel.getData();
			var oNewRow = {
				LineId: oModelData.ExpenseLines.length + 1,
				U_ExTyCd:"",
					U_ExpTyp: "",
					U_DescExp: "",
					U_CurrCode: oModelData.ExpCurCd,
					U_CurrName: oModelData.ExpCurNm,
					U_ExpAmt: "",
					U_GrCode: "",
					U_GrName: "",
					U_LocCode: "",
					U_LocName: "",
					U_PgmCode: "",
					U_PgmName: "",
					U_GICode: "",
					U_GIName: "",
					U_IsGRPO: "N",
					U_PgmMgr:"",
					U_PgmMail:"",
					U_UpMail: "No",
					U_Accpt: false,
					U_Rjct: false

			};
			var iErrorCount = 0;
			if (iErrorCount === 0) {
				oModelData.ExpenseLines.push(oNewRow);
				oModel.refresh();
			}
			//var oModelData = this.oModel.getData();
		var that = this;
		var oResults = $.extend([], oModelData.ExpenseLines);
		for (var j = 0; j < oResults.length; j++) {
			oResults[j].LineId = j + 1;
		}
		that.oModel.setProperty("/ExpenseLines", []);
		that.oModel.setProperty("/ExpenseLines", oResults);

		ExpenseLinesTable.removeSelections();
	},

	handleDeleteRow: function() {
		var oModelData = this.oModel.getData();
		var that = this;
		var oResults = $.extend([], oModelData.ExpenseLines);
		var ExpenseLinesTable = this.byId("idExpenseLines");
		var aSelectedItems = ExpenseLinesTable.getSelectedItems();
			
		for (var i = 0; i < aSelectedItems.length; i++) {
			var oBindingContextPath = aSelectedItems[i].getBindingContextPath().split("/");
			var aSelectedPathLength = oBindingContextPath.length;
			var oRowId = aSelectedPathLength - 1;
			var iIndex = oBindingContextPath[oRowId] - i;
			oResults.splice([iIndex], 1);
		}
		that.oModel.setProperty("/ExpenseLines", []);
		that.oModel.setProperty("/ExpenseLines", oResults);

		for (var j = 0; j < oResults.length; j++) {
			oResults[j].LineId = j + 1;
		}
		that.oModel.setProperty("/ExpenseLines", []);
		that.oModel.setProperty("/ExpenseLines", oResults);

		ExpenseLinesTable.removeSelections();

	},
	
	handleSaveExpenseReq: function(oEvent) {

		var oModelData = this.oModel.getData();

		var that = this;

		//Adding/Updating Cash Request
		var jData = JSON.stringify({
			U_ReqTyp: oModelData.ReqTyp,
			U_ReqDate: oModelData.ReqDate,
			U_VBNo: oModelData.VBNo,
			U_VBDate: oModelData.VBDate,
			U_ReqNo: oModelData.ReqNo,
			U_VBDueDt: oModelData.VBDueDt,
			U_Status: oModelData.Status,
			U_ReqName: oModelData.ReqName,
			U_ReqCode: oModelData.ReqCode,
			U_ExpSubCd: oModelData.ExpSubCd,
			U_ExpSubNm: oModelData.ExpSubNm,
			U_SubCurCd: oModelData.SubCurCd,
			U_SubCurNm: oModelData.SubCurNm,
			U_ExpCurCd: oModelData.ExpCurCd,
			U_ExpCurNm: oModelData.ExpCurNm,
			U_Rmks: oModelData.Rmks,
			U_SbMgr: oModelData.U_SbMgr,
					U_SbMail: oModelData.U_SbMail,

			"IK_EXREQ1Collection": oModelData.ExpenseLines
			//"IK_RFZ2Collection": oModelData.FreezingDetails
			//	"IK_NCT3Collection": oModelData.GrantRevenueAllocation

		});

		if (oModelData.FormMode !== "Add") {
			//var openList = false;
			$.ajax({
				url: "/b1s/v1/IK_EXPREQ(" + this.ExpenseReqEntry + ")",
				xhrFields: {
					withCredentials: true
				},
				beforeSend: function(xhr) {
					xhr.setRequestHeader("B1S-ReplaceCollectionsOnPatch", "true");
				},
				data: jData,
				type: "PATCH",
				dataType: "json",

				// 	success: function(json) {
				//	sap.m.MessageToast.show("Cash Request Entry Updated Sucessfully");
				// 		oModelData.ListOpen = "True";
				// 		that.oModel.refresh();

				//},
				success: this.handleERlistSave(),
				error: function(oError) {
					oModelData.ListOpen = "False";
					that.oModel.refresh();
					//sap.m.MessageToast.show("Error: " + oError);
					if (oError.responseJSON.error.code === -1000) {
						sap.m.MessageToast.show("Database is not updated, please contact administrator");
					} else {
						sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
					}
				},
				complete: function(xhr, status) {}
			});

		} else {
			//sap.m.MessageToast.show("FormMode-Add");
			$.ajax({

				url: "/b1s/v1/IK_EXPREQ",
				xhrFields: {
					withCredentials: true
				},
				data: jData,
				type: "POST",
				dataType: "json",
				success: function(json) {
					that.router.navTo("Dashboard");
					sap.m.MessageToast.show("Expense Request Entry Posted Sucessfully");
				},
				error: function(xhr, status, errorThrown) {
					sap.m.MessageToast.show("Error: " + errorThrown);
				},
				complete: function(xhr, status) {}
			});
		}
	},
	
	_handleRouteMatched: function(data) {
		this.ExpenseReqEntry = data.mParameters.arguments.Key;

		if (this.ExpenseReqEntry === "0") {
			//var oPanel = this.getView().byId("_HBox");
			//oPanel.setBusy(true);
			
				var CurrDate = new Date();

		var month = CurrDate.getMonth() + 1;
		var date = CurrDate.getDate();

		if (month < 10) {
			month = "0" + month;
		}

		if (date < 10) {
			date = "0" + date;
		}

		CurrDate = CurrDate.getFullYear() + "-" + month + "-" + date;

		this.NewEntry = {
			FormMode: "Add",
			ExpCode: "",

			Status: "O",
			VBNo: "",
			VBDate: "",
			VBDueDt: "",
			ReqTyp: "",
			ReqDate: CurrDate, //new Date(),
			ReqNo: "",
			ReqName: window.UserCode,
			ReqCode: "",
			ExpSubCd: "",
			ExpSubNm: "",
			SubCurCd: "",
			SubCurNm: "",
			ExpCurCd: "",
			ExpCurNm: "",
			Rmks: "",
			U_SbMgr: "",
					U_SbMail: "",

			ExpenseLines: [
				{
					LineId: "1",
					U_ExTyCd:"",
					U_ExpTyp: "",
					U_DescExp: "",
					U_CurrCode: "",
					U_CurrName: "",
					U_ExpAmt: "",
					U_GrCode: "",
					U_GrName: "",
					U_LocCode: "",
					U_LocName: "",
					U_PgmCode: "",
					U_PgmName: "",
					U_GICode: "",
					U_GIName: "",
					U_IsGRPO: "N",
					U_PgmMgr:"",
					U_PgmMail:"",
					U_UpMail: "No",
					U_Accpt: false,
					U_Rjct: false
				}
                      ],

			Attachments: [{
				LineId: "1",
				U_AttDesc: "",
				U_Attach: ""
				}],

			ComboListStatus: [{
				key: "C",
				value: "Closed"
			}, {
				key: "O",
				value: "Open"
			}, {
				key: "PA",
				value: "Pending for Approval"
			}, {
				key: "Approved",
				value: "Open"
			}, {
				key: "R",
				value: "Rejected"
			}, {
				key: "L",
				value: "Cancelled"
			}],

			RequestType: [{
				key: "1",
				value: "Self"
						}, {
				key: "2",
				value: "Vendor"
						}]

		};
		
		
        this.byId("Status").setEnabled(false);
			this.oModel = new sap.ui.model.json.JSONModel(this.NewEntry);
			this.getView().setModel(this.oModel);

			//oPanel.setBusy(false);
		} else {
            this.byId("Status").setEnabled(false);
			var oParameter = data.getParameter("name");
			if (oParameter !== "transactions.expenseRequest") {
				return;
			}
			var oModelData = this.oModel.getData();
			var that = this;
			$.ajax({

				url: "/b1s/v1/IK_EXPREQ(" + this.ExpenseReqEntry + ")?$orderby=DocEntry",
				xhrFields: {
					withCredentials: true
				},
				async: false,
				type: "GET",
				dataType: "json",
				success: function(oData, oResponse) {
				
				    that.oModel.setProperty("/FormMode", "Update");
					that.oModel.setProperty("/ExpenseReqEntry", oData.DocEntry);
					that.oModel.setProperty("/DocNum", oData.DocNum);
					that.oModel.setProperty("/VBNo", oData.U_VBNo);
					that.oModel.setProperty("/VBDate", oData.U_VBDate);
					that.oModel.setProperty("/ReqNo", oData.U_ReqNo);
					that.oModel.setProperty("/ReqTyp", oData.U_ReqTyp);
					that.oModel.setProperty("/ReqDate", oData.U_ReqDate);
					that.oModel.setProperty("/VBDueDt", oData.U_VBDueDt);
					that.oModel.setProperty("/Status", oData.U_Status);
					that.oModel.setProperty("/ReqCode", oData.U_ReqCode);
					that.oModel.setProperty("/ReqName", oData.U_ReqName);
					that.oModel.setProperty("/ReqId", oData.U_ReqId);
					that.oModel.setProperty("/ExpSbCd", oData.U_ExpSbCd);
					that.oModel.setProperty("/ExpSbNm", oData.U_ExpSbNm);
					that.oModel.setProperty("/SubCurCd", oData.U_SubCurCd);
					that.oModel.setProperty("/SubCurNm", oData.U_SubCurNm);
					that.oModel.setProperty("/ExpCurCd", oData.U_ExpCurCd);
					that.oModel.setProperty("/ExpCurNm", oData.U_ExpCurNm);
					that.oModel.setProperty("/Rmks", oData.U_Rmks);
					that.oModel.setProperty("/U_SbMgr", oData.U_SbMgr);
					that.oModel.setProperty("/U_SbMail", oData.U_SbMail);
					

					that.oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				}
			});

			$.ajax({

				url: "OData/transactions/expenseRequest/expenseRequestDetails1.xsodata/expenseRequest?$filter=DocEntry eq '" + this.ExpenseReqEntry +
					"'&$orderby=LineId asc",
				xhrFields: {
					withCredentials: true
				},
				async: false,
				type: "GET",
				dataType: "json",
				success: function(oData, oResponse) {
					var oResults = oData.d.results;
					for (var i = 0; i < oResults.length; i++) {
						delete oResults[i].__metadata;
					}
					
					for (var j = 0; j < oResults.length; j++) {
						if (oResults[j].U_Accpt === "true") {
							oResults[j].U_Accpt = true;
						} else {
							oResults[j].U_Accpt = false;
						}

						if (oResults[j].U_Rjct === "true") {
							oResults[j].U_Rjct = true;
						} else {
							oResults[j].U_Rjct = false;
						}
					}
					
					that.oModel.getData().ExpenseLines = oResults;
					that.oModel.refresh();
					var oMtxRow = that.oModel.getData().RequestForm;
				// 	for (var j = 0; j < oMtxRow.length; j++) {
				// 		that.handleSubsidaryCombo(parseFloat(oMtxRow[j].U_GrFrEnt));
				// 	}
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				}
			});

		}
	},

	handleERlistSave: function(oEvent) {
		var that = this;
		if (!this.oGetERListDialog) {
			this.oGetERListDialog = sap.ui.xmlfragment("SLFiori/fragments/transactions/expenseRequest.expenseRequest_save", this);
		}
		this.oGetERListDialog.setModel(this.oModel);
		$.ajax({
			url: "OData/transactions/expenseRequest/expenseRequestList.xsodata/expenseRequest",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().ERListSave = oData.d.results;
				that.oModel.refresh();
				that.router.navTo("Dashboard");
				//Commented on 08-08-2017
				//that.oGetERListDialog.open();
				sap.m.MessageToast.show("Expense Request Entry Updated Sucessfully");
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

	handleEROkSave: function(oEvent) {
		var that = this;
		var oGetFreezingListTable = sap.ui.getCore().byId("GetERListTableSave");
		var oSelectedFreezing = oGetFreezingListTable.getSelectedItem();
		if (oSelectedFreezing) {
			var oSelctedCustContext = oSelectedFreezing.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var FreezingDocNum = this.oModel.getProperty(path);
			this.oGetERListDialog.close();
			that.router.navTo("transactions.expenseRequest", {
				Key: FreezingDocNum.DocEntry
			});
		} else {
			this.oGetERListDialog.close();
			// 			that.router.navTo("GrantContract", {
			// 				Key: 1
			// 			});
		}
	},

	handleERCloseSave: function() {
		//sap.ui.getCore().byId("GetFreezingTable").removeSelections();
		this.oGetERListDialog.close();
	},

onAfterRendering: function() {
        var view = this.getView();
        //sap.ui.getCore().getControl("UName").focus();
        //this.byId("UName").focus();
        view.addDelegate({
            onsapenter: function(e) {
                view.getController().handleSaveExpenseReq();
            }
        });

        // if (this.getOwnerComponent() && this.getOwnerComponent().getBackgroundImage()) {
        //     app.setModel(new sap.ui.model.json.JSONModel({
        //         d: {
        //             VALUE: this.getOwnerComponent().getBackgroundImage()
        //         }
        //     }));
        // }
        
        	// 					    $(document).keydown(function(evt){
//   if (evt.keyCode===83 && (evt.ctrlKey)){
//       evt.preventDefault();
//       alert('worked');
//   }
//});

    },

	onBack: function(oEvent) {
		var that = this;
		if (!this.oGetERBackDialog) {
			this.oGetERBackDialog = sap.ui.xmlfragment("SLFiori/fragments/transactions/expenseRequest.expenseRequest_Back", this);
		}
		sap.ui.getCore().byId("GetERTableBack").removeSelections();
		this.oGetERBackDialog.setModel(this.oModel);
		$.ajax({
			url: "OData/transactions/expenseRequest/expenseRequestList.xsodata/expenseRequest",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().ERListBack = oData.d.results;
				that.oModel.refresh();
				that.oGetERBackDialog.open();
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

	handleEROk: function(oEvent) {
		var that = this;
		var oGetERListTable = sap.ui.getCore().byId("GetERTableBack");
		var oSelectedER = oGetERListTable.getSelectedItem();
		if (oSelectedER) {
			var oSelctedCustContext = oSelectedER.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var ERDocNum = this.oModel.getProperty(path);
			this.oGetERBackDialog.close();
			that.router.navTo("transactions.expenseRequest", {
				Key: ERDocNum.DocEntry
			});
		} else {
			this.oGetERDialog.close();
		}
	},

	handleERClose: function() {
		sap.ui.getCore().byId("GetERTableBack").removeSelections();
		this.oGetERBackDialog.close();
	},

	handlegoBack: function() {
		var that = this;
		that.router.navTo("Dashboard");
	},
	
	handleExpenseType: function(oEvent) {
		var that = this;
		if (!this.oETypeDialog) {
			this.oETypeDialog = sap.ui.xmlfragment("SLFiori.fragments.transactions.expenseRequest.EType", this);
		}
		this.oEType = "";
		var oETypeBindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aETypeSelectedPathLength = oETypeBindingContextPath.length;
		var oETypeRowId = aETypeSelectedPathLength - 1;
		this.oETypeRowId = oETypeBindingContextPath[oETypeRowId];

		sap.ui.getCore().byId("ETypeListTable").removeSelections();
		this.oETypeDialog.setModel(this.oModel);
		$.ajax({
			//url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '5'",
			url: "OData/transactions/expenseRequest/eType.xsodata/EType",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				var aItemsData = oData.d.results; //oData.value;
				for (var m = 0; m < aItemsData.length; m++) {
					aItemsData[m].Amount = "0";
				}
				that.oModel.getData().ETypeList = oData.d.results;
				that.oModel.refresh();
				that.oETypeDialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			}
		});
	},

	handleExpenseTypeOk: function(oEvent) {
		var oETypeListTable = sap.ui.getCore().byId("ETypeListTable");
		var oSelectedEType = oETypeListTable.getSelectedItem();
		if (oSelectedEType) {
			var oSelctedCustContext = oSelectedEType.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var EType = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);
            this.oModel.setProperty("/ExpenseLines/" + this.oETypeRowId + "/U_ExTyCd", EType.Code);
			this.oModel.setProperty("/ExpenseLines/" + this.oETypeRowId + "/U_ExpTyp", EType.U_ExpTyp);
			//this.oModel.setProperty("/ExpenseLines/" + this.oETypeRowId + "/U_DescExp", EType.U_ExpTyp);
			this.oModel.refresh();
			sap.ui.getCore().byId("ETypeListTable").removeSelections();
			this.oETypeDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Expense Type");
		}

	},

	handleExpenseTypeClose: function(oEvent) {
		this.oETypeDialog.close();
	},
	
	handleCheckBoxAcceptSelected: function(oEvent) {

		var oModel = this.oModel;
		var oModelData = oModel.getData();

		var oBindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var selectedRow = oBindingContextPath[2];

		if (oModelData.ExpenseLines[selectedRow].U_Accpt === true && oModelData.ExpenseLines[selectedRow].U_Rjct === true) {
			oModelData.ExpenseLines[selectedRow].U_Rjct = false;
		}
	},

	handleCheckBoxRejectSelected: function(oEvent) {

		var oModel = this.oModel;
		var oModelData = oModel.getData();

		var oBindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var selectedRow = oBindingContextPath[2];

		if (oModelData.ExpenseLines[selectedRow].U_Accpt === true && oModelData.ExpenseLines[selectedRow].U_Rjct === true) {
			oModelData.ExpenseLines[selectedRow].U_Accpt = false;
		}
	}

	// 	handleDonorList: function(oEvent) {
	// 		var that = this;
	// 		if (!this.oDonorMasterDialog) {
	// 			this.oDonorMasterDialog = sap.ui.xmlfragment("SLFiori.fragments.DonorMasterV3", this);
	// 		}
	// 		sap.ui.getCore().byId("DonorListTable").removeSelections();
	// 		this.oDonorMasterDialog.setModel(this.oModel);
	// 		$.ajax({
	// 			//url: "https://10.0.1.189:50000/b1s/v1/BusinessPartners?$select=CardCode,CardName,ContactPerson,Cellular,EmailAddress&$filter=Valid eq 'Y' and Frozen eq 'N' &$top=1000&$orderby=CardName",
	// 			url: "/b1s/v1/BusinessPartners?$select=CardCode,CardName,ContactPerson,Cellular,EmailAddress&$filter=Valid eq 'Y' and Frozen eq 'N' and CardType eq 'C' &$top=1000&$orderby=CardName",
	// 			xhrFields: {
	// 				withCredentials: true
	// 			},
	// 			async: false,
	// 			type: "GET",
	// 			dataType: "json",
	// 			success: function(oData, oResponse) {
	// 				that.oModel.getData().DonorList = oData.value;
	// 				that.oModel.refresh();
	// 				that.oDonorMasterDialog.open();
	// 			},
	// 			error: function(oError) {
	// 				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
	// 			}
	// 		});
	// 	},

	// 	handleCustOk: function(oEvent) {
	// 		var oDonorListTable = sap.ui.getCore().byId("DonorListTable");
	// 		var oSelectedDonor = oDonorListTable.getSelectedItem();
	// 		if (oSelectedDonor) {
	// 			var oSelctedCustContext = oSelectedDonor.getBindingContext();
	// 			var path = oSelctedCustContext.sPath;
	// 			var Donor = this.oModel.getProperty(path);
	// 			this.oModel.setProperty("/DnrCod", Donor.CardCode);
	// 			this.oModel.setProperty("/DnrNam", Donor.CardName);
	// 			//this.oModel.setProperty("/DonorCnt", Donor.CntctPrsn);
	// 			//this.oModel.setProperty("/TelNo", Donor.Cellular);

	// 			this.oModel.refresh();
	// 			sap.ui.getCore().byId("DonorListTable").removeSelections();
	// 			this.oDonorMasterDialog.close();
	// 		} else {
	// 			sap.m.MessageToast.show("Please select Donor");
	// 		}
	// 	},

	// 	handleCustClose: function() {
	// 		sap.ui.getCore().byId("DonorListTable").removeSelections();
	// 		this.oDonorMasterDialog.close();
	// 	},

	// 	handleAmountLiveChange: function(oEvent) {
	// 		var oAmtBindingContextPath = oEvent.getSource().getBindingContext().sPath;
	// 		this.oModel.setProperty(oAmtBindingContextPath + "/U_Amount", oEvent.oSource.getValue());
	// 		this.oModel.refresh();
	// 		this.onAmountChange(oAmtBindingContextPath);
	// 	},

	// 	onAmountChange: function(oContext) {
	// 		var Price = this.oModel.getProperty(oContext + "/U_Amount");
	// 		var Total = Price;
	// 		var oItems = this.oModel.getData().GrantRevenueDetails;
	// 		var DocTotal = 0;
	// 		for (var i = 0; i < oItems.length; i++) {
	// 			DocTotal = DocTotal + ((oItems[i].U_Amount === "") ? 0 : parseFloat(oItems[i].U_Amount));
	// 		}
	// 		this.oModel.setProperty("/GCAmt", DocTotal);
	// 		this.oModel.refresh();
	// 	},

	// 	handleAllocationLiveChange: function(oEvent) {
	// 		var oAmtBindingContextPath = oEvent.getSource().getBindingContext().sPath;
	// 		this.oModel.setProperty(oAmtBindingContextPath + "/U_Amt", oEvent.oSource.getValue());
	// 		this.oModel.refresh();
	// 		this.onAllocationChange(oAmtBindingContextPath);
	// 	},

	// 	onAllocationChange: function(oContext) {
	// 		var Price = this.oModel.getProperty(oContext + "/U_Amt");
	// 		var oItems = this.oModel.getData().GrantRevenueAllocation;
	// 		var Allocated = 0;
	// 		for (var i = 0; i < oItems.length; i++) {
	// 			Allocated = Allocated + ((oItems[i].U_Amt === "") ? 0 : parseFloat(oItems[i].U_Amt));
	// 		}
	// 		var LineNum = this.oModel.getProperty(oContext + "/U_GRevLNo") - 1;
	// 		var oGrRevDet = this.oModel.getData().GrantRevenueDetails;
	// 		var AllcAmt = 0;
	// 		AllcAmt = AllcAmt + ((oGrRevDet[LineNum].U_Amount === "") ? 0 : parseFloat(oGrRevDet[LineNum].U_Amount));

	// 		if (Allocated > AllcAmt) {
	// 			sap.m.MessageToast.show("Allocated amount is greater than the Grant Amount,please check..");
	// 		}
	// 	},

	// 	onSearch: function(oEvt) {
	// 		var list = sap.ui.getCore().byId("DonorListTable"); //this.getView().byId("idList");
	// 		var oBinding = list.getBinding("items");
	// 		// add filter for search
	// 		var aFilters = [];
	// 		var sQuery = oEvt.getSource().getValue();
	// 		if (sQuery && sQuery.length > 0) {
	// 			var filter = new sap.ui.model.Filter("CardName", sap.ui.model.FilterOperator.Contains, sQuery);
	// 			aFilters.push(filter);
	// 		}
	// 		oBinding.filter(aFilters);
	// 	}

	/**/

});