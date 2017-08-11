sap.ui.controller("SLFiori.view.transactions.cashRequest", {

	onInit: function() {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
		this.CashReqEntry = "";
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
			EntrySaveToUpdate: "No",
			FormMode: "Add",
			ReqCode: "",

			ReqTyp: "2",
			DocNum: "",
			ReqDate: CurrDate, //new Date(),
			Status: "O",
			DueDate: "",
			ReqName: window.UserCode,
			ReqId: window.UserCode,

			ReqSbCd: "",
			ReqSbNm: "",
			ReqLcCd: "",
			ReqLcNm: "",

			RqBnCnCd: "",
			RqBnCnNm: "",

			RcBnCd: "",
			RcBnNm: "",
			BnAcNo: "",
			BnSwNo: "",
			IBAN: "",
			Rmks: "",
			RequestForm: [
				{
					LineId: "1",
					U_ReqTyp: "",
					U_Code: "",
					U_Name: "",
					U_GrFrEnt: "",
					U_GrFrNo: "",
					U_GrFrDt: "",
					U_ExRate: "",
					U_PaySbCd: "",
					U_PaySub: "",
					U_PayLcCd: "",
					U_PayLoc: "",
					U_ReqCurr: "",
					U_Amount: "",
					U_AmtUSD: "",
					U_PaySts: "O",
					U_IsGRPO: "N",
					U_SbMgr: "",
					U_SbMail: "",
					U_PgmMgr: "",
					U_PgmMail: "",
					U_UpMail: "No",
					U_Accpt: false,
					U_Rjct: false,
					IsEnabled: true

				}
                      ],
			ComboList: [{
				key: "C",
				value: "Closed"
			}, {
				key: "O",
				value: "Open"
			}],

			ComboReqType: [{
				key: "1",
				value: "Against Expense"
						}, {
				key: "2",
				value: "Against Freezing"
						}],

			//ComboBox Populate Dynamic
			FreezingSubsidary: [],

			FreezingLocation: []
		};

		this.list = {
			EntrySaveToUpdate: "No",
			FormMode: "Update",
			ReqCode: "",

			ReqTyp: "2",
			DocNum: "",
			ReqDate: CurrDate, //new Date(),
			Status: "",
			DueDate: "",
			ReqName: window.UserCode,
			ReqId: "",

			ReqSbCd: "",
			ReqSbNm: "",
			ReqLcCd: "",
			ReqLcNm: "",

			RqBnCnCd: "",
			RqBnCnNm: "",

			RcBnCd: "",
			RcBnNm: "",
			BnAcNo: "",
			BnSwNo: "",
			IBAN: "",
			Rmks: "",
			RequestForm: [
				{
					LineId: "1",
					U_ReqTyp: "",
					U_Code: "",
					U_Name: "",
					U_GrFrEnt: "",
					U_GrFrNo: "",
					U_GrFrDt: "",
					U_ExRate: "",
					U_PaySbCd: "",
					U_PaySub: "",
					U_PayLcCd: "",
					U_PayLoc: "",
					U_ReqCurr: "",
					U_Amount: "",
					U_AmtUSD: "",
					U_PaySts: "O",
					U_IsGRPO: "N",
					U_SbMgr: "",
					U_SbMail: "",
					U_PgmMgr: "",
					U_PgmMail: "",
					U_UpMail: "No",
					U_Accpt: false,
					U_Rjct: false,
					IsEnabled: true
				}
                      ],

			ComboList: [{
				key: "C",
				value: "Closed"
			}, {
				key: "O",
				value: "Open"
			}],

			ComboReqType: [{
				key: "1",
				value: "Against Expense"
						}, {
				key: "2",
				value: "Against Freezing"
						}],

			//ComboBox Populate Dynamic
			FreezingSubsidary: [],

			FreezingLocation: []

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
			this.oModel.setProperty("/ReqId", User.E_Mail);
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
			this.oDim2Dialog = sap.ui.xmlfragment("SLFiori.fragments.Dim2", this);
		}

		sap.ui.getCore().byId("Dim2ListTable").removeSelections();
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
		var oDim2ListTable = sap.ui.getCore().byId("Dim2ListTable");
		var oSelectedDim2 = oDim2ListTable.getSelectedItem();
		//var oItems = this.oModel.getData().GrantRevenueDetails;

		if (oSelectedDim2) {
			var oSelctedCustContext = oSelectedDim2.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Dim2 = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);
			//this.oModel.setProperty("/Dim2List/"+this.oDim2RowId + "/RevSub", Dim2.CCCode);
			this.oModel.setProperty("/ReqSbCd", Dim2.CCCode);
			this.oModel.setProperty("/ReqSbNm", Dim2.CCName);
			this.oModel.setProperty("/ReqLcCd", "");
			this.oModel.setProperty("/ReqLcNm", "");
			this.oModel.setProperty("/RqBnCnCd", "");
			this.oModel.setProperty("/RqBnCnNm", "");
			this.oModel.setProperty("/RcBnCd", "");
			this.oModel.setProperty("/RcBnNm", "");
			this.oModel.setProperty("/BnAcNo", "");
			this.oModel.setProperty("/BnSwNo", "");
			this.oModel.setProperty("/IBAN", "");

			this.oModel.refresh();
			sap.ui.getCore().byId("Dim2ListTable").removeSelections();
			this.oDim2Dialog.close();
		} else {
			sap.m.MessageToast.show("Please select Subsidary");
		}

		//this.oModel.getData().GrantRevenueDetails = oItems;

	},

	handleDim2Close: function(oEvent) {
		this.oDim2Dialog.close();
	},

	handleDim3: function(oEvent) {
		var that = this;
		if (!this.oDim3Dialog) {
			this.oDim3Dialog = sap.ui.xmlfragment("SLFiori.fragments.Dim3", this);
		}

		sap.ui.getCore().byId("Dim3ListTable").removeSelections();
		this.oDim3Dialog.setModel(this.oModel);

		//var oAmtBindingContextPath = oEvent.getSource().getBindingContext().sPath;
		//this.oModel.setProperty(oAmtBindingContextPath + "/U_RevenSub", oEvent.oSource.getValue());
		var SubLoc = this.oModel.getProperty("/ReqSbCd");

		$.ajax({
			//url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/CostCenter.xsodata/CostCenter?$filter=U_SubCode eq '" + SubLoc +"'",
			url: "OData/CostCenter.xsodata/CostCenter?$filter=U_SubCode eq '" + SubLoc + "'",
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
		var oDim3ListTable = sap.ui.getCore().byId("Dim3ListTable");
		var oSelectedDim3 = oDim3ListTable.getSelectedItem();
		//var oItems = this.oModel.getData().GrantRevenueDetails;

		if (oSelectedDim3) {
			var oSelctedCustContext = oSelectedDim3.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Dim3 = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);

			this.oModel.setProperty("/ReqLcCd", Dim3.CCCode);
			this.oModel.setProperty("/ReqLcNm", Dim3.CCName);
			this.oModel.refresh();
			sap.ui.getCore().byId("Dim3ListTable").removeSelections();
			this.oDim3Dialog.close();
		} else {
			sap.m.MessageToast.show("Please select Dimension");
		}
		//this.oModel.getData().GrantRevenueDetails = oItems;

	},

	handleDim3Close: function(oEvent) {
		this.oDim3Dialog.close();
	},

	handleCountry: function(oEvent) {
		var that = this;
		if (!this.oCountryDialog) {
			this.oCountryDialog = sap.ui.xmlfragment("SLFiori.fragments.common.country", this);
		}

		sap.ui.getCore().byId("CountryListTable").removeSelections();
		this.oCountryDialog.setModel(this.oModel);

		var Subsidary = this.oModel.getProperty("/ReqSbCd");
		$.ajax({
			//			url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '2'",
			//?$filter=DMCode eq '2'
			url: "OData/common/countryList.xsodata/Country?$filter=Subsidary eq '" + Subsidary + "'",
			//url: "OData/common/bankDetails.xsodata/BankDetails?$select=CountryCod &$filter=Subsidary eq 'S1' &$groupby=Subsidary",
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
				that.oModel.getData().CountryList = oData.d.results;
				that.oModel.refresh();
				that.oCountryDialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			}
		});
	},

	handleCountryOk: function(oEvent) {
		var oCountryListTable = sap.ui.getCore().byId("CountryListTable");
		var oSelectedCountry = oCountryListTable.getSelectedItem();
		//var oItems = this.oModel.getData().GrantRevenueDetails;

		if (oSelectedCountry) {
			var oSelctedCustContext = oSelectedCountry.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Country = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);
			//this.oModel.setProperty("/Dim2List/"+this.oDim2RowId + "/RevSub", Dim2.CCCode);
			this.oModel.setProperty("/RqBnCnCd", Country.CountryCod);
			this.oModel.setProperty("/RqBnCnNm", Country.CountryName);
			this.oModel.setProperty("/RcBnCd", "");
			this.oModel.setProperty("/RcBnNm", "");
			this.oModel.setProperty("/BnAcNo", "");
			this.oModel.setProperty("/BnSwNo", "");
			this.oModel.setProperty("/IBAN", "");
			this.oModel.refresh();
			sap.ui.getCore().byId("CountryListTable").removeSelections();
			this.oCountryDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Country");
		}

		//this.oModel.getData().GrantRevenueDetails = oItems;

	},

	handleCountryClose: function(oEvent) {
		this.oCountryDialog.close();
	},

	handleBankName: function(oEvent) {
		var that = this;
		if (!this.oBankNmDialog) {
			this.oBankNmDialog = sap.ui.xmlfragment("SLFiori.fragments.common.bankName", this);
		}

		sap.ui.getCore().byId("BankNameListTable").removeSelections();
		this.oBankNmDialog.setModel(this.oModel);

		var Subsidary = this.oModel.getProperty("/ReqSbCd");
		var Country = this.oModel.getProperty("/RqBnCnCd");
		$.ajax({
			//			url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '2'",
			//?$filter=DMCode eq '2'

			url: "OData/common/bankName.xsodata/Bank?$filter=Subsidary eq '" + Subsidary + "' and CountryCod eq '" + Country + "'",
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
				that.oModel.getData().BankNameList = oData.d.results;
				that.oModel.refresh();
				that.oBankNmDialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			}
		});
	},

	handleBankNameOk: function(oEvent) {
		var oBankNmListTable = sap.ui.getCore().byId("BankNameListTable");
		var oSelectedBankNm = oBankNmListTable.getSelectedItem();
		//var oItems = this.oModel.getData().GrantRevenueDetails;

		if (oSelectedBankNm) {
			var oSelctedCustContext = oSelectedBankNm.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var BankNm = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);
			//this.oModel.setProperty("/Dim2List/"+this.oDim2RowId + "/RevSub", Dim2.CCCode);
			this.oModel.setProperty("/RcBnCd", BankNm.BankCode);
			this.oModel.setProperty("/RcBnNm", BankNm.BankName);
			this.oModel.setProperty("/BnAcNo", "");
			this.oModel.setProperty("/BnSwNo", "");
			this.oModel.setProperty("/IBAN", "");
			this.oModel.refresh();
			sap.ui.getCore().byId("BankNameListTable").removeSelections();
			this.oBankNmDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Bank Name");
		}

		//this.oModel.getData().GrantRevenueDetails = oItems;

	},

	handleBankNameClose: function(oEvent) {
		this.oBankNmDialog.close();
	},

	handleBankAcct: function(oEvent) {
		var that = this;
		if (!this.oBankAcctDialog) {
			this.oBankAcctDialog = sap.ui.xmlfragment("SLFiori.fragments.common.bankAcctDetails", this);
		}

		sap.ui.getCore().byId("BankAcctListTable").removeSelections();
		this.oBankAcctDialog.setModel(this.oModel);

		var Subsidary = this.oModel.getProperty("/ReqSbCd");
		var Country = this.oModel.getProperty("/RqBnCnCd");
		var BankName = this.oModel.getProperty("/RcBnCd");

		$.ajax({
			//			url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '2'",
			//?$filter=DMCode eq '2'

			url: "OData/common/bankAcctDetails.xsodata/BankDetails?$filter=Subsidary eq '" + Subsidary + "' and CountryCod eq '" + Country +
				"' and BankCode eq '" + BankName + "'",
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
				that.oModel.getData().BankAcctList = oData.d.results;
				that.oModel.refresh();
				that.oBankAcctDialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			}
		});
	},

	handleBankAcctOk: function(oEvent) {
		var oBankAcctListTable = sap.ui.getCore().byId("BankAcctListTable");
		var oSelectedBankAcct = oBankAcctListTable.getSelectedItem();
		//var oItems = this.oModel.getData().GrantRevenueDetails;

		if (oSelectedBankAcct) {
			var oSelctedCustContext = oSelectedBankAcct.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var BankAcct = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);
			//this.oModel.setProperty("/Dim2List/"+this.oDim2RowId + "/RevSub", Dim2.CCCode);
			this.oModel.setProperty("/BnAcNo", BankAcct.Account);
			this.oModel.setProperty("/BnSwNo", BankAcct.SwiftNum);
			this.oModel.setProperty("/IBAN", BankAcct.SwiftNum);

			this.oModel.refresh();
			sap.ui.getCore().byId("BankAcctListTable").removeSelections();
			this.oBankAcctDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Account Number");
		}

		//this.oModel.getData().GrantRevenueDetails = oItems;

	},

	handleBankAcctClose: function(oEvent) {
		this.oBankAcctDialog.close();
	},

	handleCostCentersList: function(oEvent) {
		var that = this;
		if (!this.oCostCentersDialog) {
			this.oCostCentersDialog = sap.ui.xmlfragment("SLFiori.fragments.transactions.cashRequest.grantCode", this);
		}
		this.oDim2 = "";
		var oDim2BindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aDim2SelectedPathLength = oDim2BindingContextPath.length;
		var oDim2RowId = aDim2SelectedPathLength - 1;
		this.oDim2RowId = oDim2BindingContextPath[oDim2RowId];

		sap.ui.getCore().byId("grantCodeListTable").removeSelections();
		this.oCostCentersDialog.setModel(this.oModel);
		$.ajax({
			//url: "https://172.31.28.160:50000/b1s/v1/BusinessPartners?$select=CardCode,CardName,CntctPrsn,Cellular?$filter=CardType eq 'C'",
			//url: "https://172.31.28.160:50000/b1s/v1/BusinessPartners?$select=CardCode,CardName,ContactPerson,Cellular",
			//url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '1'",
			url: "OData/transactions/cashRequest/grantCode.xsodata/grantCode?$filter=DMCode eq '1'",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().grantCodeList = oData.d.results; //oData.value;
				that.oModel.refresh();
				that.oCostCentersDialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			}
		});
	},

	handleCostCentersOk: function(oEvent) {
		var oCostCentersListTable = sap.ui.getCore().byId("grantCodeListTable");
		var oSelectedCostCenter = oCostCentersListTable.getSelectedItem();
		if (oSelectedCostCenter) {
			var oSelctedCCContext = oSelectedCostCenter.getBindingContext();
			var path = oSelctedCCContext.sPath;
			var CC = this.oModel.getProperty(path);

			this.oModel.setProperty("/RequestForm/" + this.oDim2RowId + "/U_Code", CC.CCCode);
			this.oModel.setProperty("/RequestForm/" + this.oDim2RowId + "/U_Name", CC.CCName);
			this.oModel.setProperty("/RequestForm/" + this.oDim2RowId + "/U_ReqCurr", CC.U_GrCur);

			this.oModel.setProperty("/RequestForm/" + this.oDim2RowId + "/U_GrFrEnt", "");
			this.oModel.setProperty("/RequestForm/" + this.oDim2RowId + "/U_GrFrNo", "");
			this.oModel.setProperty("/RequestForm/" + this.oDim2RowId + "/U_GrFrDt", "");

			this.oModel.getData().FreezingSubsidary = "";
			this.oModel.getData().FreezingLocation = "";

			this.oModel.refresh();
			sap.ui.getCore().byId("grantCodeListTable").removeSelections();
			this.oCostCentersDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Grant");
		}
	},

	handleCostCentersClose: function() {
		sap.ui.getCore().byId("grantCodeListTable").removeSelections();
		this.oCostCentersDialog.close();
	},

	handleFreezingList: function(oEvent) {
		var that = this;
		if (!this.oGetFreezingDialog) {
			this.oGetFreezingDialog = sap.ui.xmlfragment("SLFiori/fragments/transactions/cashRequest.freezingNum", this);
		}
		this.oFreezing = "";
		var oFreezingBindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aFreezingSelectedPathLength = oFreezingBindingContextPath.length;
		var oFreezingRowId = aFreezingSelectedPathLength - 1;
		this.oFreezingRowId = oFreezingBindingContextPath[oFreezingRowId];

		var oAmtBindingContextPath = oEvent.getSource().getBindingContext().sPath;
		//this.oModel.setProperty(oAmtBindingContextPath + "/U_RevenSub", oEvent.oSource.getValue());
		var GrantCode = this.oModel.getProperty(oAmtBindingContextPath + "/U_Code");

		sap.ui.getCore().byId("GetFreezingNumTable").removeSelections();
		this.oGetFreezingDialog.setModel(this.oModel);
		$.ajax({
			url: "OData/transactions/freezing/freezing_freezingList.xsodata/DocEntry?$filter=U_GCode eq '" + GrantCode + "'",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().FreezingNumList = oData.d.results;
				that.oModel.refresh();
				that.oGetFreezingDialog.open();
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

	handleFreezingOk: function(oEvent) {
		var that = this;
		var oGetFreezingListTable = sap.ui.getCore().byId("GetFreezingNumTable");
		var oSelectedFreezing = oGetFreezingListTable.getSelectedItem();
		if (oSelectedFreezing) {
			var oSelctedCustContext = oSelectedFreezing.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var FreezingDocNum = this.oModel.getProperty(path);
			this.oGetFreezingDialog.close();

			this.oModel.setProperty("/RequestForm/" + this.oFreezingRowId + "/U_GrFrEnt", FreezingDocNum.DocEntry);
			this.oModel.setProperty("/RequestForm/" + this.oFreezingRowId + "/U_GrFrNo", FreezingDocNum.DocNum);
			this.oModel.setProperty("/RequestForm/" + this.oFreezingRowId + "/U_ExRate", FreezingDocNum.ExchangeRate);
			this.oModel.setProperty("/RequestForm/" + this.oFreezingRowId + "/U_GrFrDt", FreezingDocNum.FreezeDate);

			this.oModel.setProperty("/RequestForm/" + this.oFreezingRowId + "/U_PaySbCd", "");
			this.oModel.setProperty("/RequestForm/" + this.oFreezingRowId + "/U_PaySub", "");
			this.oModel.setProperty("/RequestForm/" + this.oFreezingRowId + "/U_PayLcCd", "");
			this.oModel.setProperty("/RequestForm/" + this.oFreezingRowId + "/U_PayLoc", "");
			//this.handleSubsidaryCombo(FreezingDocNum.DocEntry);
			//this.handleLocationCombo(FreezingDocNum.DocEntry);

			this.oModel.refresh();
			sap.ui.getCore().byId("GetFreezingNumTable").removeSelections();
			this.oGetFreezingDialog.close();
		} else {
			this.oGetFreezingDialog.close();
			// 			that.router.navTo("GrantContract", {
			// 				Key: 1
			// 			});
		}
	},

	handleFreezingClose: function() {
		sap.ui.getCore().byId("GetFreezingNumTable").removeSelections();
		this.oGetFreezingDialog.close();
	},

	handleSubsidaryList: function(oEvent) {
		var that = this;
		if (!this.oSubsidaryDialog) {
			//this.oSubsidaryDialog = sap.ui.xmlfragment("SLFiori.fragments.transactions.cashRequest.subsidaryList", this);
			this.oSubsidaryDialog = sap.ui.xmlfragment("SLFiori.fragments.transactions.cashRequest.Dim2", this);
		}
		this.oDim2 = "";
		var oDim2BindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aDim2SelectedPathLength = oDim2BindingContextPath.length;
		var oDim2RowId = aDim2SelectedPathLength - 1;
		this.oDim2RowId = oDim2BindingContextPath[oDim2RowId];

		var oAmtBindingContextPath = oEvent.getSource().getBindingContext().sPath;
		//this.oModel.setProperty(oAmtBindingContextPath + "/U_RevenSub", oEvent.oSource.getValue());
		//var FreezeEntry = this.oModel.getProperty(oAmtBindingContextPath + "/U_GrFrEnt");

		//sap.ui.getCore().byId("SubsidaryListTable").removeSelections();
		sap.ui.getCore().byId("Dim2ListTableRow").removeSelections();
		
		this.oSubsidaryDialog.setModel(this.oModel);

// 		if (FreezeEntry === "") {
// 			sap.m.MessageToast.show("Please select Freezing Number");
// 		} else {
			$.ajax({
				//url: "OData/transactions/cashRequest/freezingSubsidary.xsodata/Subsidary?$filter=DocEntry eq '" + FreezeEntry + "'",
				//url: "OData/transactions/cashRequest/freezingSubsidary.xsodata/Subsidary",
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
					//that.oModel.getData().SubsidaryList = oData.d.results;
					that.oModel.getData().Dim2ListRow = oData.d.results;
					
					that.oModel.refresh();
					that.oSubsidaryDialog.open();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError);
				}
			});
//		}
	},

	handleDim2OkRow: function(oEvent) {
		var oDim2ListTable = sap.ui.getCore().byId("Dim2ListTableRow");
		var oSelectedDim2 = oDim2ListTable.getSelectedItem();
		//var oItems = this.oModel.getData().GrantRevenueDetails;

		if (oSelectedDim2) {
			var oSelctedCustContext = oSelectedDim2.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Dim2 = this.oModel.getProperty(path);

			this.oModel.setProperty("/RequestForm/" + this.oDim2RowId + "/U_PaySbCd", Dim2.CCCode);
			this.oModel.setProperty("/RequestForm/" + this.oDim2RowId + "/U_PaySub", Dim2.CCName);

			this.oModel.setProperty("/RequestForm/" + this.oDim2RowId + "/U_SbMgr", Dim2.Manager);
			this.oModel.setProperty("/RequestForm/" + this.oDim2RowId + "/U_SbMail", Dim2.EMail);

			this.oModel.setProperty("/RequestForm/" + this.oDim4RowId + "/U_PayPgCd", "");
			this.oModel.setProperty("/RequestForm/" + this.oDim4RowId + "/U_PayPgm", "");

			this.oModel.setProperty("/RequestForm/" + this.oDim2RowId + "/U_PayLcCd", "");
			this.oModel.setProperty("/RequestForm/" + this.oDim2RowId + "/U_PayLoc", "");

			this.oModel.setProperty("/RequestForm/" + this.oDim2RowId + "/U_PgmMgr", "");
			this.oModel.setProperty("/RequestForm/" + this.oDim2RowId + "/U_PgmMail", "");

			this.oModel.refresh();
			sap.ui.getCore().byId("Dim2ListTableRow").removeSelections();
			this.oSubsidaryDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Dimension");
		}

		//this.oModel.getData().GrantRevenueDetails = oItems;

	},

	handleDim2CloseRow: function(oEvent) {
		this.oSubsidaryDialog.close();
	},

	handleLocationList: function(oEvent) {
		var that = this;
		if (!this.oLocationDialog) {
			//this.oLocationDialog = sap.ui.xmlfragment("SLFiori.fragments.transactions.cashRequest.location", this);
			this.oLocationDialog = sap.ui.xmlfragment("SLFiori.fragments.transactions.cashRequest.Dim3", this);
		}
		this.oDim3 = "";
		var oDim3BindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aDim3SelectedPathLength = oDim3BindingContextPath.length;
		var oDim3RowId = aDim3SelectedPathLength - 1;
		this.oDim3RowId = oDim3BindingContextPath[oDim3RowId];

		//sap.ui.getCore().byId("LocationListTable").removeSelections();
		sap.ui.getCore().byId("Dim3ListTableRow").removeSelections();
		this.oLocationDialog.setModel(this.oModel);

		var oAmtBindingContextPath = oEvent.getSource().getBindingContext().sPath;
		//this.oModel.setProperty(oAmtBindingContextPath + "/U_RevenSub", oEvent.oSource.getValue());
		//var FreezeEntry = this.oModel.getProperty(oAmtBindingContextPath + "/U_GrFrEnt");
		//var SubCode = this.oModel.getProperty(oAmtBindingContextPath + "/U_PaySbCd");
		
		var SubLoc = this.oModel.getProperty(oAmtBindingContextPath + "/U_PaySbCd");

		if (SubLoc === "") {
			sap.m.MessageToast.show("Please select Paying subsidary");
		} else {
			$.ajax({
				//url: "OData/CostCenter.xsodata/CostCenter?$filter=U_SubCode eq '" + SubLoc + 	"'",
				// url: "OData/transactions/cashRequest/freezingLocation.xsodata/Location?$filter=DocEntry eq '" + FreezeEntry + "' and SubCode eq '" +
				// 	SubCode + "' ",
					url: "OData/CostCenter.xsodata/CostCenter?$filter=U_SubCode eq '" + SubLoc + "'",

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
					that.oModel.getData().Dim3ListRow = oData.d.results;
					that.oModel.refresh();
					that.oLocationDialog.open();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError);
				}
			});
		}
	},

	handleDim3OkRow: function(oEvent) {
		var oDim3ListTable = sap.ui.getCore().byId("Dim3ListTableRow");
		var oSelectedDim3 = oDim3ListTable.getSelectedItem();
		//var oItems = this.oModel.getData().GrantRevenueDetails;

		if (oSelectedDim3) {
			var oSelctedCustContext = oSelectedDim3.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Dim3 = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);

			this.oModel.setProperty("/RequestForm/" + this.oDim3RowId + "/U_PayLcCd", Dim3.CCode);
			this.oModel.setProperty("/RequestForm/" + this.oDim3RowId + "/U_PayLoc", Dim3.CCName);

			this.oModel.setProperty("/RequestForm/" + this.oDim4RowId + "/U_PayPgCd", "");
			this.oModel.setProperty("/RequestForm/" + this.oDim4RowId + "/U_PayPgm", "");

			this.oModel.setProperty("/RequestForm/" + this.oDim2RowId + "/U_PgmMgr", "");
			this.oModel.setProperty("/RequestForm/" + this.oDim2RowId + "/U_PgmMail", "");

			this.oModel.refresh();
			sap.ui.getCore().byId("Dim3ListTableRow").removeSelections();
			this.oLocationDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Dimension");
		}
		//this.oModel.getData().GrantRevenueDetails = oItems;

	},

	handleDim3CloseRow: function(oEvent) {
		this.oLocationDialog.close();
	},

	handleProgramList: function(oEvent) {
		var that = this;
		if (!this.oProgramDialog) {
			//this.oProgramDialog = sap.ui.xmlfragment("SLFiori.fragments.transactions.cashRequest.program", this);
			this.oProgramDialog = sap.ui.xmlfragment("SLFiori.fragments.transactions.cashRequest.Dim4", this);
		}
		this.oDim4 = "";
		var oDim4BindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aDim4SelectedPathLength = oDim4BindingContextPath.length;
		var oDim4RowId = aDim4SelectedPathLength - 1;
		this.oDim4RowId = oDim4BindingContextPath[oDim4RowId];

		sap.ui.getCore().byId("Dim4ListTableRow").removeSelections();
		this.oProgramDialog.setModel(this.oModel);

		var oAmtBindingContextPath = oEvent.getSource().getBindingContext().sPath;
		//this.oModel.setProperty(oAmtBindingContextPath + "/U_RevenSub", oEvent.oSource.getValue());
// 		var FreezeEntry = this.oModel.getProperty(oAmtBindingContextPath + "/U_GrFrEnt");
// 		var SubCode = this.oModel.getProperty(oAmtBindingContextPath + "/U_PaySbCd");
// 		var LocCode = this.oModel.getProperty(oAmtBindingContextPath + "/U_PayLcCd");

// 		if (FreezeEntry === "" || SubCode === "" || LocCode === "") {
// 			sap.m.MessageToast.show("Please select Freezing number,Paying subsidary & Location");
// 		} else {
			$.ajax({
				//url: "OData/CostCenter.xsodata/CostCenter?$filter=U_SubCode eq '" + SubLoc + 	"'",
				// url: "OData/transactions/cashRequest/freezingProgram.xsodata/Program?$filter=DocEntry eq '" + FreezeEntry + "' and SubCode eq '" +
				// 	SubCode + "' and LocCode eq '" + LocCode + "'",
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
					that.oModel.getData().Dim4ListRow = oData.d.results;
					that.oModel.refresh();
					that.oProgramDialog.open();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError);
				}
			});
		//}
	},

	handleDim4OkRow: function(oEvent) {
		var oDim4ListTable = sap.ui.getCore().byId("Dim4ListTableRow");
		var oSelectedDim4 = oDim4ListTable.getSelectedItem();
		//var oItems = this.oModel.getData().GrantRevenueDetails;

		if (oSelectedDim4) {
			var oSelctedCustContext = oSelectedDim4.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Dim4 = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);

			this.oModel.setProperty("/RequestForm/" + this.oDim4RowId + "/U_PayPgCd", Dim4.CCode);
			this.oModel.setProperty("/RequestForm/" + this.oDim4RowId + "/U_PayPgm", Dim4.CCName);

			this.oModel.setProperty("/RequestForm/" + this.oDim2RowId + "/U_PgmMgr", Dim4.Manager);
			this.oModel.setProperty("/RequestForm/" + this.oDim2RowId + "/U_PgmMail", Dim4.EMail);

			this.oModel.refresh();
			sap.ui.getCore().byId("Dim4ListTableRow").removeSelections();
			this.oProgramDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Program");
		}
		//this.oModel.getData().GrantRevenueDetails = oItems;

	},

	handleDim4CloseRow: function(oEvent) {
		this.oProgramDialog.close();
	},

	handleSubsidaryCombo: function(FreezeEntry) {
		//ComboBox Populate Dynamic

		var that = this;
		$.ajax({
			url: "OData/transactions/cashRequest/freezingSubsidary.xsodata/Subsidary?$filter=DocEntry eq '" + FreezeEntry + "'",
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

				that.oModel.getData().FreezingSubsidary = oResults;
				//that.oModel.getData().ComboType.push(oEmptyCardDetails);
				that.oModel.refresh();
				that.oModel.setProperty("/RequestForm/0/U_PaySub", "S20");
				that.oModel.refresh();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			}
		});
	},

	handleLocationCombo: function(FreezeEntry) {
		//ComboBox Populate Dynamic

		var that = this;
		$.ajax({
			url: "OData/transactions/cashRequest/freezingLocation.xsodata/Location?$filter=DocEntry eq '" + FreezeEntry + "'",
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

				that.oModel.getData().FreezingLocation = oResults;
				//that.oModel.getData().ComboType.push(oEmptyCardDetails);
				that.oModel.refresh();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			}
		});
	},

	handleSaveCashRequest: function(oEvent) {

		var oModelData = this.oModel.getData();

		var that = this;

		var GRPOPosted = "N";

		if (oModelData.U_IsGRPO === "Y") {
			GRPOPosted = "Y";
		} else {
			GRPOPosted = "N";
		}

        	var oResults = oModelData.RequestForm;
					for (var i = 0; i < oResults.length; i++) {
						delete oResults[i].IsEnabled;
					}
					
					var RowDetails = oResults;
					
		//Adding/Updating Cash Request
		var jData = JSON.stringify({
			U_ReqTyp: oModelData.ReqTyp,
			U_ReqDate: oModelData.ReqDate,
			U_DueDate: oModelData.DueDate,
			U_Status: oModelData.Status,
			U_ReqName: oModelData.ReqName,
			U_ReqId: oModelData.ReqId,
			U_ReqSbCd: oModelData.ReqSbCd,
			U_ReqSbNm: oModelData.ReqSbNm,
			U_ReqLcCd: oModelData.ReqLcCd,
			U_ReqLcNm: oModelData.ReqLcNm,
			U_RqBnCnCd: oModelData.RqBnCnCd,
			U_RqBnCnNm: oModelData.RqBnCnNm,
			U_RcBnCd: oModelData.RcBnCd,
			U_RcBnNm: oModelData.RcBnNm,
			U_BnAcNo: oModelData.BnAcNo,
			U_BnSwNo: oModelData.BnSwNo,
			U_IBAN: oModelData.IBAN,
			U_Rmks: oModelData.Rmks,

			//U_IsGRPO:GRPOPosted,
			//"IK_CREQ1Collection": oModelData.RequestForm
			"IK_CREQ1Collection":RowDetails
			//"IK_RFZ2Collection": oModelData.FreezingDetails
			//	"IK_NCT3Collection": oModelData.GrantRevenueAllocation

		});
		

		if (oModelData.FormMode !== "Add") {
			//var openList = false;
			$.ajax({
				url: "/b1s/v1/IK_CSREQ(" + oModelData.CashReqEntry + ")",
				xhrFields: {
					withCredentials: true
				},
				beforeSend: function(xhr) {
					xhr.setRequestHeader("B1S-ReplaceCollectionsOnPatch", "true");
				},
				data: jData,
				type: "PATCH",
				dataType: "json",

				success: function(json) {
					that.router.navTo("Dashboard");
					sap.m.MessageToast.show("Cash Request Entry updated sucessfully");
				},
				//success: this.handleCRlistSave1(),
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

				url: "/b1s/v1/IK_CSREQ",
				xhrFields: {
					withCredentials: true
				},
				data: jData,
				type: "POST",
				dataType: "json",
				success: function(json) {
					that.router.navTo("Dashboard");
					sap.m.MessageToast.show("Cash Request Entry Posted Sucessfully");
				},
				error: function(xhr, status, errorThrown) {
					sap.m.MessageToast.show("Error: " + errorThrown);
				},
				complete: function(xhr, status) {}
			});
		}

		if (oModelData.EntrySaveToUpdate === "Yes") {

			oModelData.EntrySaveToUpdate = "No";

			//this.handleApprovals();

			this.handleCRlistSave();

		}
	},

	handleApprovals: function(oEvent) {
		var oModelData = this.oModel.getData();

		var that = this;

		var oMtxRow = this.oModel.getData().RequestForm;

		//Checking Subsidary Amount is eaual to Grant Allocation Amount
		for (var i = 0; i < oMtxRow.length; i++) {
			var SubMail = "";
			var PgmMail = "";

			if (window.usercode !== oMtxRow[i].U_SbMgr && window.usercode !== oMtxRow[i].U_PgmMgr) {
				SubMail = oMtxRow[i].U_SbMail;
				PgmMail = oMtxRow[i].U_PgmMail;
			}

			var jData = JSON.stringify({
				U_FMail: "Approval Mail",
				U_TMail: SubMail,
				U_GScrn: "Cash Request",
				U_FUser: oModelData.ReqId,
				U_TUser: oMtxRow[i].U_SbMgr,
				U_MailSnt: "N"
			});
			$.ajax({

				url: "/b1s/v1/IK_COSTCENTER",
				xhrFields: {
					withCredentials: true
				},
				data: jData,
				type: "POST",
				dataType: "json",
				success: function(json) {
					sap.m.MessageToast.show("");
				},
				error: function(xhr, status, errorThrown) {
					sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
				},
				complete: function(xhr, status) {}
			});

			var jData1 = JSON.stringify({
				U_FMail: "",
				U_TMail: PgmMail,
				U_GScrn: "Cash Request",
				U_FUser: "",
				U_TUser: oMtxRow[i].U_PgmMgr,
				U_MailSnt: "N"
			});
			$.ajax({

				url: "/b1s/v1/IK_COSTCENTER",
				xhrFields: {
					withCredentials: true
				},
				data: jData1,
				type: "POST",
				dataType: "json",
				success: function(json) {
					sap.m.MessageToast.show("");
				},
				error: function(xhr, status, errorThrown) {
					sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
				},
				complete: function(xhr, status) {}
			});
		}

		if (oModelData.PrcCode === "" || oModelData.PrcName === "" || oModelData.CurrCode === "" || oModelData.U_GrRes ===
			"") {
			sap.m.MessageToast.show("Please enter all Mandatory fields");
		} else {
			$.ajax({

				url: "/b1s/v1/IK_COSTCENTER",
				xhrFields: {
					withCredentials: true
				},
				data: jData,
				type: "POST",
				dataType: "json",
				success: function(json) {
					sap.m.MessageToast.show("Grant Code Added Sucessfully");
				},
				error: function(xhr, status, errorThrown) {
					sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
				},
				complete: function(xhr, status) {}
			});

		}
	},

	handleCRlistSave1: function(oEvent) {
		var oModelData = this.oModel.getData();
		oModelData.EntrySaveToUpdate = "Yes";
		//sap.m.MessageToast.show("");

	},

	_handleRouteMatched: function(data) {
		this.CashReqEntry = data.mParameters.arguments.Key;

		if (this.CashReqEntry === "0") {

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
				ReqCode: "",

				ReqTyp: "2",
				DocNum: "",
				ReqDate: CurrDate, //new Date(),
				Status: "O",
				DueDate: "",
				ReqName: window.UserCode,
				ReqId: "",

				ReqSbCd: "",
				ReqSbNm: "",
				ReqLcCd: "",
				ReqLcNm: "",

				RqBnCnCd: "",
				RqBnCnNm: "",

				RcBnCd: "",
				RcBnNm: "",
				BnAcNo: "",
				BnSwNo: "",
				IBAN: "",
				Rmks: "",
				RequestForm: [
					{
						LineId: "1",
						U_ReqTyp: "",
						U_Code: "",
						U_Name: "",
						U_GrFrEnt: "",
						U_GrFrNo: "",
						U_GrFrDt: "",
						U_ExRate: "",
						U_PaySbCd: "",
						U_PaySub: "",
						U_PayLcCd: "",
						U_PayLoc: "",
						U_ReqCurr: "",
						U_Amount: "",
						U_AmtUSD: "",
						U_PaySts: "O",
						U_IsGRPO: "N",
						U_SbMgr: "",
						U_SbMail: "",
						U_PgmMgr: "",
						U_PgmMail: "",
						U_UpMail: "No",
						U_Accpt: false,
					U_Rjct: false,
					IsEnabled: true
				}
                      ],
				ComboList: [{
					key: "C",
					value: "Closed"
			}, {
					key: "O",
					value: "Open"
			}],

				ComboReqType: [{
					key: "1",
					value: "Against Expense"
						}, {
					key: "2",
					value: "Against Freezing"
						}],

				//ComboBox Populate Dynamic
				FreezingSubsidary: [],

				FreezingLocation: []
			};

			this.byId("Status").setEnabled(false);
			this.oModel = new sap.ui.model.json.JSONModel(this.NewEntry);
			this.getView().setModel(this.oModel);

			//oPanel.setBusy(false);
		} else {
			this.byId("Status").setEnabled(false);
			var oParameter = data.getParameter("name");
			if (oParameter !== "transactions.cashRequest") {
				return;
			}
			var oModelData = this.oModel.getData();
			var that = this;
			$.ajax({

				url: "/b1s/v1/IK_CSREQ(" + this.CashReqEntry + ")?$orderby=DocEntry",
				xhrFields: {
					withCredentials: true
				},
				async: false,
				type: "GET",
				dataType: "json",
				success: function(oData, oResponse) {
					// 	var oResults = oData.d.results;
					// 	for (var i = 0; i < oResults.length; i++) {
					// 		delete oResults[i].__metadata;
					// 	}
					//that.oModel.getData().GrantRevenueDetails = oResults;
					that.oModel.setProperty("/FormMode", "Update");
					that.oModel.setProperty("/CashReqEntry", oData.DocEntry);
					that.oModel.setProperty("/DocNum", oData.DocNum);
					that.oModel.setProperty("/ReqTyp", oData.U_ReqTyp);
					that.oModel.setProperty("/ReqDate", oData.U_ReqDate);
					that.oModel.setProperty("/DueDate", oData.U_DueDate);
					that.oModel.setProperty("/Status", oData.U_Status);
					that.oModel.setProperty("/ReqCode", oData.U_ReqCode);
					that.oModel.setProperty("/ReqName", oData.U_ReqName);
					that.oModel.setProperty("/ReqId", oData.U_ReqId);
					//that.oModel.setProperty("/GCrDate", "2017-04-25");
					that.oModel.setProperty("/ReqSbCd", oData.U_ReqSbCd);
					that.oModel.setProperty("/ReqSbNm", oData.U_ReqSbNm);
					that.oModel.setProperty("/ReqLcCd", oData.U_ReqLcCd);
					that.oModel.setProperty("/ReqLcNm", oData.U_ReqLcNm);
					that.oModel.setProperty("/RqBnCnCd", oData.U_RqBnCnCd);
					that.oModel.setProperty("/RqBnCnNm", oData.U_RqBnCnNm);
					that.oModel.setProperty("/RcBnCd", oData.U_RcBnCd);
					that.oModel.setProperty("/RcBnNm", oData.U_RcBnNm);
					that.oModel.setProperty("/BnAcNo", oData.U_BnAcNo);
					//that.oModel.setProperty("/GCFrom", "2017-04-25");
					that.oModel.setProperty("/BnSwNo", oData.U_BnSwNo);
					that.oModel.setProperty("/IBAN", oData.U_IBAN);
					that.oModel.setProperty("/Rmks", oData.U_Rmks);

					that.oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				}
			});

			$.ajax({

				url: "OData/transactions/cashRequest/cashRequestDetails1.xsodata/CashRequest?$filter=DocEntry eq '" + this.CashReqEntry +
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

					that.oModel.getData().RequestForm = oResults;

					that.oModel.refresh();
					var oMtxRow = that.oModel.getData().RequestForm;

					for (var k = 0; k < oMtxRow.length; k++) {
						//that.handleSubsidaryCombo(parseFloat(oMtxRow[j].U_GrFrEnt));
						if (oMtxRow[k].U_Accpt === true) {
							oModelData.RequestForm[k].IsEnabled = false;
						} else {
							oModelData.RequestForm[k].IsEnabled = true;
						}
					}
					that.oModel.refresh();

				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				}
			});

		}
	},

	handleCRlistSave: function(oEvent) {
		//sap.m.MessageToast.show("Freezing Entry Updated Sucessfully");
		var that = this;
		if (!this.oGetCRListDialogSave) {
			this.oGetCRListDialogSave = sap.ui.xmlfragment("SLFiori/fragments/transactions/cashRequest.cashRequest_save", this);
		}
		//sap.ui.getCore().byId("GetCRListTableSave").removeSelections();
		this.oGetCRListDialogSave.setModel(this.oModel);
		$.ajax({
			url: "OData/transactions/cashRequest/cashRequestList.xsodata/CashRequest",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().CRListSave = oData.d.results;
				that.oModel.refresh();

				that.router.navTo("Dashboard");
				//Commented on 09-08-2017
				//that.oGetCRListDialogSave.open();
				sap.m.MessageToast.show("Cash Request Entry Updated Sucessfully");
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

	handleCROkSave: function(oEvent) {

		var that = this;
		var oGetFreezingListTable = sap.ui.getCore().byId("GetCRListTableSave");
		var oSelectedFreezing = oGetFreezingListTable.getSelectedItem();
		if (oSelectedFreezing) {
			var oSelctedCustContext = oSelectedFreezing.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var FreezingDocNum = this.oModel.getProperty(path);
			this.oGetCRListDialogSave.close();
			that.router.navTo("transactions.cashRequest", {
				Key: FreezingDocNum.DocEntry
			});
		} else {
			this.oGetCRListDialog.close();
			// 			that.router.navTo("GrantContract", {
			// 				Key: 1
			// 			});
		}
	},

	handleCRCloseSave: function() {
		//sap.ui.getCore().byId("GetFreezingTable").removeSelections();
		this.oGetCRListDialogSave.close();
	},

	handleCRlistSave_New: function(oEvent) {
		//sap.m.MessageToast.show("Freezing Entry Updated Sucessfully");
		var that = this;
		if (!this.oGetCRListDialogSave) {
			this.oGetCRListDialogSave = sap.ui.xmlfragment("SLFiori/fragments/transactions/cashRequest.CR_save", this);
		}
		//sap.ui.getCore().byId("GetCRListTableSave_New").removeSelections();
		this.oGetCRListDialogSave.setModel(this.oModel);
		$.ajax({
			url: "OData/transactions/cashRequest/cashRequestList.xsodata/CashRequest",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().CRListSave_New = oData.d.results;
				that.oModel.refresh();

				that.router.navTo("Dashboard");
				//Commented on 08-08-2017
				//that.oGetCRListDialogSave.open();
				sap.m.MessageToast.show("Cash Request Entry Updated Sucessfully");
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

	handleCRSave: function(oEvent) {

		var that = this;
		var oGetFreezingListTable = sap.ui.getCore().byId("GetCRListTableSave_New");
		var oSelectedFreezing = oGetFreezingListTable.getSelectedItem();
		if (oSelectedFreezing) {
			var oSelctedCustContext = oSelectedFreezing.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var FreezingDocNum = this.oModel.getProperty(path);
			this.oGetCRListDialogSave.close();
			that.router.navTo("transactions.cashRequest", {
				Key: FreezingDocNum.DocEntry
			});
		} else {
			this.oGetCRListDialog.close();
			// 			that.router.navTo("GrantContract", {
			// 				Key: 1
			// 			});
		}
	},

	// 	handleSaveGrantContract: function(oEvent) {

	// 		/*var jData =  JSON.stringify({CardCode:"C20000",
	// 		                            DocumentLines:[{ItemCode:"A00001",TaxCode:"VAT@4",Quantity:"110","UnitPrice":"20"}]
	// 		});*/
	// 		var oModelData = this.oModel.getData();

	// 		var that = this;

	// 		var oResults = oModelData.GrantRevenueDetails;
	// 		for (var i = 0; i < oResults.length; i++) {
	// 			delete oResults[i].RowEnable;
	// 			delete oResults[i].RowVisible;
	// 		}

	// 		var jData = JSON.stringify({
	// 			U_SFDCOppN: oModelData.SFDCOppN,
	// 			U_GCrDate: oModelData.GCrDate,
	// 			U_Status: oModelData.Status,
	// 			U_DnrCod: oModelData.DnrCod,
	// 			U_DnrNam: oModelData.DnrNam,
	// 			U_DSFDCId: oModelData.DSFDCId,
	// 			U_GCType: oModelData.GCType,

	// 			//U_CommGrnt: oModelData.CommGrnt,

	// 			U_GCFrom: oModelData.GCFrom,
	// 			U_GCTo: oModelData.GCTo,
	// 			U_GCAmt: oModelData.GCAmt,
	// 			U_GCode: oModelData.GCode,
	// 			U_GName: oModelData.GName,
	// 			U_GrantCur: oModelData.GrantCur,
	// 			U_GrRes: oModelData.GrRes,
	// 			U_GrFinMan: oModelData.GrFinMan,
	// 			U_GMan: oModelData.GMan,
	// 			U_Rmks: oModelData.Rmks,
	// 			U_Athmnt: oModelData.Athmnt,

	// 			//			U_GDate: oModelData.GDate,
	// 			U_GSCCov: oModelData.GSCCov,
	// 			U_GSCCovPr: oModelData.GSCCovPr,
	// 			//U_GRelsSt: oModelData.GRelsSt,

	// 			//"IK_NCT1Collection":[{U_RevenSub:oModelData.GrantRevenueDetails.RevenSub}]
	// 			"IK_NCT1Collection": oModelData.GrantRevenueDetails,
	// 			//"IK_NCT2Collection": oModelData.GrantPaymentSchedule,
	// 			"IK_NCT3Collection": oModelData.GrantRevenueAllocation
	// 			//"IK_NCT4Collection":oModelData.GrantInitiative,
	// 			//"IK_NCT5Collection":oModelData.GrantReporting
	// 		});
	// 		//var CardCode = this.byId("sId")

	// 		if (oModelData.FormMode !== "Add") {
	// 			//sap.m.MessageToast.show("FormMode-Update");
	// 			//this.GrantEntry=data.mParameters.arguments.Key;
	// 			$.ajax({
	// 				//url: "https://10.0.1.189:50000/b1s/v1/IK_GNCT(" + oModelData.GrantEntryNo + ")",
	// 				url: "/b1s/v1/IK_GNCT(" + oModelData.GrantEntryNo + ")",
	// 				xhrFields: {
	// 					withCredentials: true
	// 				},
	// 				beforeSend: function(xhr) {
	// 					xhr.setRequestHeader("B1S-ReplaceCollectionsOnPatch", "true");
	// 				},
	// 				data: jData,
	// 				type: "PATCH",
	// 				dataType: "json",
	// 				success: function(json) {
	// 					sap.m.MessageToast.show("Grant Contract Updated Sucessfully");
	// 				},
	// 				error: function(xhr, status, errorThrown) {
	// 					sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
	// 				},
	// 				complete: function(xhr, status) {}
	// 			});

	// 			var formData = new FormData();
	// 			formData.append('files', $(test)[0].files[0]);

	// 			$.ajax({
	// 				//url: "https://10.0.1.189:50000/b1s/v1/IK_GNCT(" + oModelData.GrantEntryNo + ")",
	// 				url: "/b1s/v1/Attachments2",
	// 				data: formData,
	// 				type: "POST",
	// 				processData: false,
	// 				contentType: false,
	// 				dataType: "json",
	// 				success: function(json) {
	// 					sap.m.MessageToast.show("Attachment Updated Sucessfully");
	// 				},
	// 				error: function(xhr, status, errorThrown) {
	// 					sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
	// 				},
	// 				complete: function(xhr, status) {}
	// 			});
	// 		} else {
	// 			//sap.m.MessageToast.show("FormMode-Add");
	// 			$.ajax({

	// 				//url: "https://10.0.1.189:50000/b1s/v1/IK_GNCT",
	// 				url: "/b1s/v1/IK_GNCT",
	// 				xhrFields: {
	// 					withCredentials: true
	// 				},
	// 				data: jData,
	// 				type: "POST",
	// 				dataType: "json",
	// 				success: function(json) {
	// 					sap.m.MessageToast.show("Grant Contract Posted Sucessfully");
	// 				},
	// 				error: function(xhr, status, errorThrown) {
	// 					sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
	// 				},
	// 				complete: function(xhr, status) {}
	// 			});
	// 		}

	// 	},

	// 	handleAddEntry: function() {
	// 		//var oPanel = this.getView().byId("_HBox");
	// 		//oPanel.setBusy(true);

	// 		var oDialog = this.getView().byId("BusyDialog");
	// 		oDialog.open();

	// 		this.oModel = new sap.ui.model.json.JSONModel(this.NewEntry);
	// 		this.getView().setModel(this.oModel);

	// 		//oPanel.setBusy(false);
	// 	},

	onAfterRendering: function() {
		var view = this.getView();
		//sap.ui.getCore().getControl("UName").focus();
		//this.byId("UName").focus();
		view.addDelegate({
			onsapenter: function(e) {
				view.getController().handleSaveCashRequest();
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
		if (!this.oGetCRListDialogSave) {
			this.oGetCRListDialogSave = sap.ui.xmlfragment("SLFiori/fragments/transactions/cashRequest.cashRequest_Back", this);
		}
		//sap.ui.getCore().byId("GetCRTableBack").removeSelections();
		this.oGetCRListDialogSave.setModel(this.oModel);
		$.ajax({
			url: "OData/transactions/cashRequest/cashRequestList.xsodata/CashRequest",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().CRListBack = oData.d.results;
				that.oModel.refresh();
				that.oGetCRListDialogSave.open();
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

	handleCROk: function(oEvent) {
		var that = this;
		var oGetCRListTable = sap.ui.getCore().byId("GetCRTableBack");
		var oSelectedCR = oGetCRListTable.getSelectedItem();
		if (oSelectedCR) {
			var oSelctedCustContext = oSelectedCR.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var CRDocNum = this.oModel.getProperty(path);
			this.oGetCRListDialogSave.close();
			that.router.navTo("transactions.cashRequest", {
				Key: CRDocNum.DocEntry
			});
		} else {
			this.oGetCRListDialogSave.close();
		}
	},

	handleCRClose: function() {
		sap.ui.getCore().byId("GetCRTableBack").removeSelections();
		this.oGetCRListDialogSave.close();
	},

	handlegoBack: function() {
		var that = this;
		that.router.navTo("Dashboard");
	},

	handleAmountGCLiveChange: function(oEvent) {
		var oQtyBindingContextPath = oEvent.getSource().getBindingContext().sPath;
		this.oModel.setProperty(oQtyBindingContextPath + "/U_Amount", oEvent.oSource.getValue());
		this.oModel.refresh();
		this.onAmountGCChange(oQtyBindingContextPath);
	},

	onAmountGCChange: function(oContext) {
		var oModelData = this.oModel.getData();

		var GCAmt = this.oModel.getProperty(oContext + "/U_Amount");
		var ExRate = this.oModel.getProperty(oContext + "/U_ExRate");
		var Total = Math.ceil(GCAmt * ExRate);
		this.oModel.setProperty(oContext + "/U_AmtUSD", Total);
		this.oModel.refresh();
	},

	onCRSearchBack: function(oEvt) {
		var list = sap.ui.getCore().byId("GetCRTableBack"); //this.getView().byId("idList");
		var oBinding = list.getBinding("items");
		// add filter for search
		var aFilters = [];
		var sQuery = oEvt.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("U_ReqName", sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}
		oBinding.filter(aFilters);
	},

	onCRSearchSave: function(oEvt) {
		var list = sap.ui.getCore().byId("GetCRTableSave"); //this.getView().byId("idList");
		var oBinding = list.getBinding("items");
		// add filter for search
		var aFilters = [];
		var sQuery = oEvt.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("U_ReqName", sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}
		oBinding.filter(aFilters);
	},

	handleAddRow: function() {
        var requestForm = this.byId("idRequestForm");
		var oModel = this.oModel;
		var oModelData = oModel.getData();
		var oNewRow = {
			LineId: oModelData.RequestForm.length + 1,
			U_ReqTyp: "",
			U_Code: "",
			U_Name: "",
			U_GrFrEnt: "",
			U_GrFrNo: "",
			U_GrFrDt: "",
			U_ExRate: "",
			U_PaySbCd: "",
			U_PaySub: "",
			U_PayLcCd: "",
			U_PayLoc: "",
			U_ReqCurr: "",
			U_Amount: "",
			U_AmtUSD: "",
			U_PaySts: "O",
			U_IsGRPO: "N",
			U_SbMgr: "",
			U_SbMail: "",
			U_PgmMgr: "",
			U_PgmMail: "",
			U_UpMail: "No",
			U_Accpt: false,
					U_Rjct: false,
					IsEnabled: false
		};
		var iErrorCount = 0;

		//Validating Mandatory Columns
		//for (var i = 0; i <= oModelData.RequestForm.length - 1; i++) {
		// 			if (oModelData.GrantRevenueDetails[i].U_ReSubNm == "") {
		// 				sap.m.MessageToast.show("Please enter Subsidary Name");
		// 				iErrorCount = iErrorCount + 1;
		// 				break;
		// 			}
		// 			if (oModelData.GrantRevenueDetails[i].U_ReLocNm == "") {
		// 				sap.m.MessageToast.show("Please enter Location Name");
		// 				iErrorCount = iErrorCount + 1;
		// 				break;
		// 			}
		// 			if (oModelData.GrantRevenueDetails[i].U_RePgmNm == "") {
		// 				sap.m.MessageToast.show("Please enter Program Name");
		// 				iErrorCount = iErrorCount + 1;
		// 				break;
		// 			}
		// 			if (oModelData.GrantRevenueDetails[i].U_RevenTyp == "") {
		// 				sap.m.MessageToast.show("Please enter Revenue Type");
		// 				iErrorCount = iErrorCount + 1;
		// 				break;
		// 			}
		// 			if (oModelData.GrantRevenueDetails[i].U_PayDue == "") {
		// 				sap.m.MessageToast.show("Please enter Payment Due Date");
		// 				iErrorCount = iErrorCount + 1;
		// 				break;
		// 			}
		// 			if (oModelData.GrantRevenueDetails[i].U_Amount == "") {
		// 				sap.m.MessageToast.show("Please enter Amount");
		// 				iErrorCount = iErrorCount + 1;
		// 				break;
		// 			}
		// 			if (oModelData.GrantRevenueDetails[i].U_Remarks == "") {
		// 				sap.m.MessageToast.show("Please enter Remarks");
		// 				iErrorCount = iErrorCount + 1;
		// 				break;
		// 			}
		// 		}

		if (iErrorCount === 0) {
			oModelData.RequestForm.push(oNewRow);
			oModel.refresh();
		}
		requestForm.removeSelections();
	},

	handleDeleteRow: function() {
		var oModelData = this.oModel.getData();
		var that = this;
		var oResults = $.extend([], oModelData.RequestForm);
		var requestForm = this.byId("idRequestForm");
		var aSelectedItems = requestForm.getSelectedItems();

		for (var i = 0; i < aSelectedItems.length; i++) {
			var oBindingContextPath = aSelectedItems[i].getBindingContextPath().split("/");
			var aSelectedPathLength = oBindingContextPath.length;
			var oRowId = aSelectedPathLength - 1;
			var iIndex = oBindingContextPath[oRowId] - i;
			oResults.splice([iIndex], 1);
		}
		that.oModel.setProperty("/RequestForm", []);
		that.oModel.setProperty("/RequestForm", oResults);

		for (var j = 0; j < oResults.length; j++) {
			oResults[j].LineId = j + 1;
		}
		that.oModel.setProperty("/RequestForm", []);
		that.oModel.setProperty("/RequestForm", oResults);
        requestForm.removeSelections();
	},

	//Changed the functionality to CheckBox Column wise
	// 	handleApprove: function(oEvent) {

	// 		var oModel = this.oModel;
	// 		var oModelData = oModel.getData();

	// 		// 		var oDim2ListTable = sap.ui.getCore().byId("idRequestForm");
	// 		// 		var oSelectedDim2 = oDim2ListTable.getSelectedItem();

	// 		var requestForm = this.byId("idRequestForm");
	// 		var aSelectedItems = requestForm.getSelectedItems();

	// 		var selectedItems = oEvent.getParameter("selectedItems");
	// 		//var messageText = "Event 'selectionFinished': [";

	// 		for (var i = 0; i < aSelectedItems.length; i++) {
	// 			//	messageText += "'" + selectedItems[i].getText() + "'";
	// 			// if (i != selectedItems.length-1) {
	// 			// 	messageText += ",";
	// 			// }
	// 			var oBindingContextPath = aSelectedItems[i].getBindingContextPath().split("/");
	// 			//var aSelectedPathLength = oBindingContextPath.length;
	// 			var aSelectedPathLength = oBindingContextPath[2];
	// 			var oRowId = aSelectedPathLength;
	// 			//var iIndex = oBindingContextPath[oRowId] - i ;
	// 			var iIndex = oBindingContextPath[2];

	// 			this.oModel.setProperty("/RequestForm/" + iIndex + "/U_PaySts", "Approved");
	// 		}
	// 		requestForm.removeSelections();
	// 	},

	handleCheckBoxAcceptSelected: function(oEvent) {

		var oModel = this.oModel;
		var oModelData = oModel.getData();

		var oBindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var selectedRow = oBindingContextPath[2];

		if (oModelData.RequestForm[selectedRow].U_Accpt === true && oModelData.RequestForm[selectedRow].U_Rjct === true) {
			oModelData.RequestForm[selectedRow].U_Rjct = false;
		}
	},

	handleCheckBoxRejectSelected: function(oEvent) {

		var oModel = this.oModel;
		var oModelData = oModel.getData();

		var oBindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var selectedRow = oBindingContextPath[2];

		if (oModelData.RequestForm[selectedRow].U_Accpt === true && oModelData.RequestForm[selectedRow].U_Rjct === true) {
			oModelData.RequestForm[selectedRow].U_Accpt = false;
		}
	}

});