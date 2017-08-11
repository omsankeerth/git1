sap.ui.controller("SLFiori.view.transactions.grantFreezing", {

	onInit: function() {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
		this.AllocationEntry = "";
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
			ListOpen: "False",
			AllocationEntry: "",
			GrantEnt: "",
			DocNum: "",
			GCrDate: "",
			AllCrDt: CurrDate, //new Date(), //"2017-07-10"
			Status: "O",
			GName: "",
			GCode: "",
			GrantCur: "",
			GrRes: "",
			GrFinMan: "",
			GMan: "",
			GCNum: "",
			GCAmnt: "",
			FRType: "",
			//FrAmt: "",
			//FrAmUSD: "",
			DnrNam: "",
			DnrCod: "",
			DSFDCId: "",
			GCType: "",
			GCFrom: "",
			GCTo: "",
			//GCAmt: "",
			Rmks: "",
			//Athmnt: "",

			AlcAmnt: "",
			AlAmUSD: "",
			AlcFrDt: "",
			AlcToDt: "",

			SODBNAME: "",

			ExRate: "",
			ReAllc: "No",
			ReAllcEnt: "",
			BSAllcNo: "",

			GrantList: [

		                               ],
			DonorList: [

                                       ],
			CostCentersList: [

                                       ],
			Dim2List: [

                                       ],
			Dim3List: [

                                       ],
			Dim4List: [

                                       ],
			Dim5List: [

                                       ],

			InPayDetails: [
				{
					LineId: "1",
					U_PaySbCd: "",
					U_PaySbNm: "",
					U_PayNo: "",
					U_PayDate: "",
					U_PayAmt: "",
					U_GrCur: "",
					U_PayUSD: "",
					U_PayGC: ""
				}
                      ],

			FreezingDetails: [
				{
					LineId: "1",
					U_SubCod: "",
					U_SubNm: "",
					U_LocCod: "",
					U_LocNm: "",
					U_PgmCod: "",
					U_PgmNm: "",
					//U_ExAmUSD: "",
					U_PrPgCd: "",
					U_PrPgm: "",
					U_GrInit: "",
					U_GrIntNm: "",
					U_GrCur: "",
					U_Amnt: "",
					U_AmntUSD: "",
					U_Actvty: "",
					U_Manager: "",
					U_CF: "",
					U_BsLine: 0,
					U_ExAmLC: "",
					U_ExAmUSD: "",
					U_ExAmGC: "",

					U_Validated: "No",
					U_MngCd: ""

			    }

                       ],

			ComboList: [{
				key: "O",
				value: "Open"
			}, {
				key: "C",
				value: "Closed"
			}, {
				key: "R",
				value: "Released"
			}],

			ComboYesNo: [{
				key: "Yes",
				value: "Yes"
			}, {
				key: "No",
				value: "No"
			}],

			ComboType: [{
				key: "P",
				value: "Pledged"
			}, {
				key: "U",
				value: "UnPledged"
			}],

			ComboRes: [{
				key: "U",
				value: "UnRestricted"
			}, {
				key: "R",
				value: "Restricted"
			}],

			ComboFrType: [{
				key: "PC",
				value: "Pre-Cash"
			}, {
				key: "IP",
				value: "Incoming Payments"
			}]

		};

		this.list = {
			FormMode: "Update",
			ListOpen: "False",
			AllocationEntry: "",
			DocNum: "",
			GCrDate: "",
			AllCrDt: CurrDate, //new Date(), //"2017-07-07",
			Status: "O",
			GName: "",
			GCode: "",
			GrantCur: "",
			GrRes: "",
			GrFinMan: "",
			GMan: "",
			GCNum: "",
			GCAmnt: "",
			FRType: "",
			//FrAmt: "",
			//FrAmUSD: "",
			DnrNam: "",
			DnrCod: "",
			DSFDCId: "",
			GCType: "",
			GCFrom: "",
			GCTo: "",
			//GCAmt: "",
			Rmks: "",
			//Athmnt: "",

			AlcAmnt: "",
			AlAmUSD: "",
			AlcFrDt: "",
			AlcToDt: "",

			SODBNAME: "",

			ExRate: "",
			ReAllc: "No",
			ReAllcEnt: "",
			BSAllcNo: "",

			GrantList: [

		                               ],
			DonorList: [

                                       ],
			CostCentersList: [

                                       ],
			Dim2List: [

                                       ],
			Dim3List: [

                                       ],
			Dim4List: [

                                       ],
			Dim5List: [

                                       ],

			InPayDetails: [
				{
					LineId: "1",
					U_PaySbCd: "",
					U_PaySbNm: "",
					U_PayNo: "",
					U_PayDate: "",
					U_PayAmt: "",
					U_GrCur: "",
					U_PayUSD: "",
					U_PayGC: ""
				}
                      ],

			FreezingDetails: [
				{
					LineId: "1",
					U_SubCod: "",
					U_SubNm: "",
					U_LocCod: "",
					U_LocNm: "",
					U_PgmCod: "",
					U_PgmNm: "",
					//U_FrzPrPgm: "",
					U_PrPgCd: "",
					U_PrPgm: "",
					U_GrInit: "",
					U_GrIntNm: "",
					U_GrCur: "",
					U_Amnt: "",
					U_AmntUSD: "",
					U_Actvty: "",
					U_Manager: "",
					U_CF: "",
					U_BsLine: 0,
					U_ExAmLC: "",
					U_ExAmUSD: "",
					U_ExAmGC: "",
					U_Validated: "No",
					U_MngCd: ""
                }
                       ],

			ComboList: [{
				key: "R",
				value: "Released"
			}, {
				key: "O",
				value: "Open"
			}, {
				key: "C",
				value: "Closed"
			}],

			ComboYesNo: [{
				key: "Yes",
				value: "Yes"
			}, {
				key: "No",
				value: "No"
			}],

			ComboType: [{
				key: "P",
				value: "Pledged"
			}, {
				key: "U",
				value: "UnPledged"
			}],

			ComboRes: [{
				key: "U",
				value: "UnRestricted"
			}, {
				key: "R",
				value: "Restricted"
			}],

			ComboFrType: [{
				key: "PC",
				value: "Pre-Cash"
			}, {
				key: "IP",
				value: "Incoming Payments"
			}]

		};

		this.oModel = new sap.ui.model.json.JSONModel(this.list);
		this.getView().setModel(this.oModel);
	},

	handleSaveFreezing: function(oEvent) {

		var oModelData = this.oModel.getData();

		var that = this;

		//var CardCode = this.byId("sId")

		var oMtxRow = this.oModel.getData().FreezingDetails;
		var RowAmount = 0;
		var validationsPassed = true;
		//Checking Subsidary Amount is eaual to Grant Allocation Amount
		for (var i = 0; i < oMtxRow.length; i++) {

			if (oMtxRow[i].U_BsLine === 0) {
				RowAmount = RowAmount + ((oMtxRow[i].U_Amnt === "") ? 0 : parseFloat(oMtxRow[i].U_Amnt));
			}
		}
		if (RowAmount === parseFloat(oModelData.AlcAmnt)) {
			//sap.m.MessageToast.show("Subsidary Amount Matching");
			//Checking Line wise amount is equal to BaseLine
			var BaseLineNum = "";
			for (var j = 0; j < oMtxRow.length; j++) {
				var BaseLineAmount = 0;
				RowAmount = 0;
				//if (oMtxRow[j].U_SubCod !== "" && (oMtxRow[j].U_LocCod !== "" || oMtxRow[j].U_PgmCod !== "" || oMtxRow[j].U_GrInit !== "")){
				if (oMtxRow[j].U_BsLine !== 0 && oMtxRow[j].U_Validated === "No") {
					BaseLineNum = oMtxRow[j].U_BsLine;
					BaseLineAmount = parseFloat(oMtxRow[BaseLineNum - 1].U_Amnt);
					for (var k = 0; k < oMtxRow.length; k++) {
						if (oMtxRow[k].U_BsLine === BaseLineNum) {
							RowAmount = RowAmount + ((oMtxRow[k].U_Amnt === "") ? 0 : parseFloat(oMtxRow[k].U_Amnt));
							oMtxRow[k].U_Validated = "Yes";
						}
					}
					if (RowAmount !== BaseLineAmount) {
						validationsPassed = false;
						for (var k = 0; k < oMtxRow.length; k++) {
							RowAmount = RowAmount + ((oMtxRow[k].U_Amnt === "") ? 0 : parseFloat(oMtxRow[k].U_Amnt));
							oMtxRow[k].U_Validated = "No";
						}
						sap.m.MessageToast.show("Line Amount is not matching with Base Freezing amount, please check..");
					}
				}
				//}
			}

		} else {
			validationsPassed = false;
			sap.m.MessageToast.show("Subsidary Amount is not matching with Freezing amount, please check..");
		}

		if (validationsPassed === true) {
			//Adding/Updating Grant Allocation
			var oResults = oModelData.FreezingDetails;
			for (var x = 0; x < oMtxRow.length; x++) {
				oMtxRow[x].U_Validated = "No";
			}
			oModelData.FreezingDetails = oResults;

			var jData = JSON.stringify({
				U_GCrDate: oModelData.GCrDate,
				U_AllCrDt: oModelData.AllCrDt,
				U_Status: oModelData.Status,
				U_GName: oModelData.GName,
				U_GCode: oModelData.GCode,
				U_GrantCur: oModelData.GrantCur,
				U_GrRes: oModelData.GrRes,
				U_GrFinMan: oModelData.GrFinMan,
				U_GMan: oModelData.GMan,
				U_GCNum: oModelData.GCNum,
				U_GCAmnt: oModelData.GCAmnt,
				U_DnrNam: oModelData.DnrNam,
				U_DnrCod: oModelData.DnrCod,
				U_DSFDCId: oModelData.DSFDCId,
				U_GCType: oModelData.DSFDCId,
				U_GCFrom: oModelData.GCFrom,
				U_GCTo: oModelData.GCTo,
				U_Rmks: oModelData.Rmks,
				U_AlcAmnt: oModelData.AlcAmnt,
				U_AlAmUSD: oModelData.AlAmUSD,
				U_FRType: oModelData.FRType,
				//U_AlcFrDt: oModelData.AlcFrDt,
				//U_AlcToDt: oModelData.AlcToDt,
				"IK_RFZ1Collection": oModelData.InPayDetails,
				"IK_RFZ2Collection": oModelData.FreezingDetails
				//	"IK_NCT3Collection": oModelData.GrantRevenueAllocation

			});

			if (oModelData.FormMode !== "Add") {
				//var openList = false;
				$.ajax({
					url: "/b1s/v1/IK_GRFZ(" + oModelData.AllocationEntry + ")",
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
					// 		sap.m.MessageToast.show("Freezing Entry Updated Sucessfully");
					// 		oModelData.ListOpen = "True";
					// 		that.oModel.refresh();

					// 	},
					success: this.handlelistSave(),
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

					url: "/b1s/v1/IK_GRALC",
					xhrFields: {
						withCredentials: true
					},
					data: jData,
					type: "POST",
					dataType: "json",
					success: function(json) {
					    that.router.navTo("Dashboard");
						sap.m.MessageToast.show("Allocation Entry Posted Sucessfully");
					},
					error: function(xhr, status, errorThrown) {
						sap.m.MessageToast.show("Error: " + errorThrown);
					},
					complete: function(xhr, status) {}
				});
			}
		}

	},

	handlelistSave: function(oEvent) {
		//sap.m.MessageToast.show("Freezing Entry Updated Sucessfully");
		var that = this;
		if (!this.oGetFreezingDialog) {
			this.oGetFreezingDialog = sap.ui.xmlfragment("SLFiori/fragments/transactions.freezing_save", this);
		}
		//sap.ui.getCore().byId("GetFreezingTableSave").removeSelections();
		this.oGetFreezingDialog.setModel(this.oModel);
		$.ajax({
			url: "OData/transactions/freezing/freezing_freezingList.xsodata/DocEntry",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().FreezingListSave = oData.d.results;
				that.oModel.refresh();
				that.router.navTo("Dashboard");
				//Commented on 08-08-2017
				//that.oGetFreezingDialog.open();
				sap.m.MessageToast.show("Freezing Entry Updated Sucessfully");
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

	handleFreezingOkSave: function(oEvent) {
		var that = this;
		var oGetFreezingListTable = sap.ui.getCore().byId("GetFreezingTableSave");
		var oSelectedFreezing = oGetFreezingListTable.getSelectedItem();
		if (oSelectedFreezing) {
			var oSelctedCustContext = oSelectedFreezing.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var FreezingDocNum = this.oModel.getProperty(path);
			this.oGetFreezingDialog.close();
			that.router.navTo("transactions.grantFreezing", {
				Key: FreezingDocNum.DocEntry
			});
		} else {
			this.oGetFreezingDialog.close();
			// 			that.router.navTo("GrantContract", {
			// 				Key: 1
			// 			});
		}
	},

	handleFreezingCloseSave: function() {
		//sap.ui.getCore().byId("GetFreezingTable").removeSelections();
		this.oGetFreezingDialog.close();
	},

	_handleRouteMatched: function(data) {
		this.AllocationEntry = data.mParameters.arguments.Key;

		if (this.AllocationEntry === "0") {
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
			ListOpen: "False",
			AllocationEntry: "",
			GrantEnt: "",
			DocNum: "",
			GCrDate: "",
			AllCrDt: CurrDate, //new Date(), //"2017-07-10"
			Status: "O",
			GName: "",
			GCode: "",
			GrantCur: "",
			GrRes: "",
			GrFinMan: "",
			GMan: "",
			GCNum: "",
			GCAmnt: "",
			FRType: "",
			//FrAmt: "",
			//FrAmUSD: "",
			DnrNam: "",
			DnrCod: "",
			DSFDCId: "",
			GCType: "",
			GCFrom: "",
			GCTo: "",
			//GCAmt: "",
			Rmks: "",
			//Athmnt: "",

			AlcAmnt: "",
			AlAmUSD: "",
			AlcFrDt: "",
			AlcToDt: "",

			SODBNAME: "",

			ExRate: "",
			ReAllc: "No",
			ReAllcEnt: "",
			BSAllcNo: "",

			GrantList: [

		                               ],
			DonorList: [

                                       ],
			CostCentersList: [

                                       ],
			Dim2List: [

                                       ],
			Dim3List: [

                                       ],
			Dim4List: [

                                       ],
			Dim5List: [

                                       ],

			InPayDetails: [
				{
					LineId: "1",
					U_PaySbCd: "",
					U_PaySbNm: "",
					U_PayNo: "",
					U_PayDate: "",
					U_PayAmt: "",
					U_GrCur: "",
					U_PayUSD: "",
					U_PayGC: ""
				}
                      ],

			FreezingDetails: [
				{
					LineId: "1",
					U_SubCod: "",
					U_SubNm: "",
					U_LocCod: "",
					U_LocNm: "",
					U_PgmCod: "",
					U_PgmNm: "",
					//U_ExAmUSD: "",
					U_PrPgCd: "",
					U_PrPgm: "",
					U_GrInit: "",
					U_GrIntNm: "",
					U_GrCur: "",
					U_Amnt: "",
					U_AmntUSD: "",
					U_Actvty: "",
					U_Manager: "",
					U_CF: "",
					U_BsLine: 0,
					U_ExAmLC: "",
					U_ExAmUSD: "",
					U_ExAmGC: "",

					U_Validated: "No",
					U_MngCd: ""

			    }

                       ],

			ComboList: [{
				key: "O",
				value: "Open"
			}, {
				key: "C",
				value: "Closed"
			}, {
				key: "R",
				value: "Released"
			}],

			ComboYesNo: [{
				key: "Yes",
				value: "Yes"
			}, {
				key: "No",
				value: "No"
			}],

			ComboType: [{
				key: "P",
				value: "Pledged"
			}, {
				key: "U",
				value: "UnPledged"
			}],

			ComboRes: [{
				key: "U",
				value: "UnRestricted"
			}, {
				key: "R",
				value: "Restricted"
			}],

			ComboFrType: [{
				key: "PC",
				value: "Pre-Cash"
			}, {
				key: "IP",
				value: "Incoming Payments"
			}]

		};
		
			this.byId("GCrDate").setEnabled(true);
			this.byId("Status").setEnabled(true);
			this.byId("AllCrDt").setEnabled(true);
			this.byId("GName").setEnabled(true);
			//this.byId("GCode").setEnabled(true);
			//this.byId("GrantCur").setEnabled(true);
			//this.byId("GrRes").setEnabled(false);
			//this.byId("GMan").setEnabled(true);
			this.byId("GrFinMan").setEnabled(true);
			//this.byId("GCNum").setEnabled(true);
			//this.byId("GCAmnt").setEnabled(true);
			this.byId("AlcAmnt").setEnabled(true);
			this.byId("AlAmUSD").setEnabled(true);
			//this.byId("AlcFrDt").setEnabled(true);
			//this.byId("AlcToDt").setEnabled(true);
			this.byId("DnrNam").setEnabled(true);
			//this.byId("DnrCod").setEnabled(true);
			this.byId("GCType").setEnabled(true);
			this.byId("GCFrom").setEnabled(true);
			this.byId("GCTo").setEnabled(true);
			//this.byId("ReAllc").setEnabled(false);

			this.oModel = new sap.ui.model.json.JSONModel(this.NewEntry);
			this.getView().setModel(this.oModel);

			//oPanel.setBusy(false);
		} else {
			this.oModel = new sap.ui.model.json.JSONModel(this.list);
			this.getView().setModel(this.oModel);

			this.byId("GCrDate").setEnabled(false);
			this.byId("Status").setEnabled(false);
			this.byId("AllCrDt").setEnabled(false);
			this.byId("GName").setEnabled(false);
			this.byId("GCode").setEnabled(false);
			this.byId("GrantCur").setEnabled(false);
			//this.byId("GrRes").setEnabled(false);
			this.byId("GMan").setEnabled(false);
			this.byId("GrFinMan").setEnabled(false);
			this.byId("GCNum").setEnabled(false);
			this.byId("GCAmnt").setEnabled(false);
			this.byId("AlcAmnt").setEnabled(false);
			this.byId("AlAmUSD").setEnabled(false);
			//this.byId("AlcFrDt").setEnabled(true);
			//this.byId("AlcToDt").setEnabled(true);
			this.byId("DnrNam").setEnabled(false);
			this.byId("DnrCod").setEnabled(false);
			this.byId("GCType").setEnabled(false);
			this.byId("GCFrom").setEnabled(false);
			this.byId("GCTo").setEnabled(false);
			this.byId("FRType").setEnabled(false);

			var oParameter = data.getParameter("name");
			if (oParameter !== "transactions.grantFreezing") {
				return;
			}
			var oModelData = this.oModel.getData();
			var that = this;
			$.ajax({
				//url: "OData/transactions/allocation/allocation_Header.xsodata/Allocation?$filter=DocEntry eq '" + this.AllocationEntry + "'",

				url: "/b1s/v1/IK_GRFZ(" + this.AllocationEntry + ")?$orderby=DocEntry",
				xhrFields: {
					withCredentials: true
				},
				async: false,
				type: "GET",
				dataType: "json",
				success: function(oData, oResponse) {

					that.oModel.setProperty("/DocNum", oData.DocNum);
					that.oModel.setProperty("/AllocationEntry", oData.DocEntry);
					that.oModel.setProperty("/GCrDate", oData.U_GCrDate);
					that.oModel.setProperty("/AllCrDt", oData.U_AllCrDt);
					that.oModel.setProperty("/Status", oData.U_Status);
					that.oModel.setProperty("/GCode", oData.U_GCode);
					that.oModel.setProperty("/GName", oData.U_GName);
					that.oModel.setProperty("/GrantCur", oData.U_GrantCur);
					that.oModel.setProperty("/GrRes", oData.U_GrRes);
					that.oModel.setProperty("/GrFinMan", oData.U_GrFinMan);
					that.oModel.setProperty("/GMan", oData.U_GMan);
					that.oModel.setProperty("/GCNum", oData.U_GCNum);
					that.oModel.setProperty("/GCAmnt", oData.U_GCAmnt);
					that.oModel.setProperty("/DnrCod", oData.U_DnrCod);
					that.oModel.setProperty("/DnrNam", oData.U_DnrNam);
					that.oModel.setProperty("/DSFDCId", oData.U_DSFDCId);
					that.oModel.setProperty("/GCType", oData.U_GCType);
					that.oModel.setProperty("/GCFrom", oData.U_GCFrom);
					that.oModel.setProperty("/GCTo", oData.U_GCTo);
					that.oModel.setProperty("/Rmks", oData.U_Rmks);
					that.oModel.setProperty("/AlcAmnt", oData.U_AlcAmnt);
					that.oModel.setProperty("/AlAmUSD", oData.U_AlAmUSD);
					that.oModel.setProperty("/ExRate", oData.U_ExRate);
					that.oModel.setProperty("/FRType", oData.U_FRType);
					//that.oModel.setProperty("/AlcFrDt", oData.U_AlcFrDt);
					//that.oModel.setProperty("/AlcToDt", oData.U_AlcToDt);
					that.oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				}
			});

			$.ajax({
				url: "OData/transactions/freezing/freezing_FreezingDetails1.xsodata/Freezing?$filter=DocEntry eq '" + this.AllocationEntry +
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
					that.oModel.getData().InPayDetails = oResults;
					that.oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				}
			});

			$.ajax({
				url: "OData/transactions/freezing/freezing_FreezingDetails2.xsodata/Freezing?$filter=DocEntry eq '" + this.AllocationEntry +
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
					that.oModel.getData().FreezingDetails = oResults;
					that.oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				}
			});

		}
	},

onAfterRendering: function() {
        var view = this.getView();
        //sap.ui.getCore().getControl("UName").focus();
        //this.byId("UName").focus();
        view.addDelegate({
            onsapenter: function(e) {
                view.getController().handleSaveFreezing();
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

	handlegoBack: function() {
		var that = this;
		that.router.navTo("Dashboard");
	},

	onBack: function() {
		// 		var that = this;
		// 		that.router.navTo("Dashboard");

		var that = this;
		if (!this.oGetFreezingDialog) {
			this.oGetFreezingDialog = sap.ui.xmlfragment("SLFiori/fragments/transactions.freezing_back", this);
		}
		//sap.ui.getCore().byId("GetFreezingTableBack").removeSelections();
		this.oGetFreezingDialog.setModel(this.oModel);
		$.ajax({
			url: "OData/transactions/freezing/freezing_freezingList.xsodata/DocEntry",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().FreezingListBack = oData.d.results;
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
		var oGetFreezingListTable = sap.ui.getCore().byId("GetFreezingTableBack");
		var oSelectedFreezing = oGetFreezingListTable.getSelectedItem();
		if (oSelectedFreezing) {
			var oSelctedCustContext = oSelectedFreezing.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var FreezingDocNum = this.oModel.getProperty(path);
			this.oGetFreezingDialog.close();
			that.router.navTo("transactions.grantFreezing", {
				Key: FreezingDocNum.DocEntry
			});
		} else {
			this.oGetFreezingDialog.close();
			// 			that.router.navTo("GrantContract", {
			// 				Key: 1
			// 			});
		}
	},

	handleFreezingClose: function() {
		//sap.ui.getCore().byId("GetFreezingTable").removeSelections();
		this.oGetFreezingDialog.close();
	},

	handleAddFreezingRow: function() {

		var grantRevenueTable = this.byId("idAllocationDetails");

		var aSelectedItems = grantRevenueTable.getSelectedItems();
		//If No Row was selected then we should add a new Empty Row
		if (aSelectedItems.length === 0) {
			var oModel = this.oModel;
			var oModelData = oModel.getData();
			var oNewRow = {
				LineId: oModelData.FreezingDetails.length + 1,
				U_SubCod: "",
				U_SubNm: "",
				U_LocCod: "",
				U_LocNm: "",
				U_PgmCod: "",
				U_PgmNm: "",
				//U_FrzPrPgm: "",
				U_PrPgCd: "",
				U_PrPgm: "",
				U_GrInit: "",
				U_GrIntNm: "",
				U_GrCur: oModelData.GrantCur,
				U_Amnt: "",
				U_AmntUSD: "",
				U_Actvty: "",
				U_Manager: "",
				U_CF: "",
				U_BsLine: 0,
				U_ExAmLC: "",
				U_ExAmUSD: "",
				U_ExAmGC: "",

				U_Validated: "No",
				U_MngCd: ""

			};
			var iErrorCount = 0;
			if (iErrorCount === 0) {
				oModelData.FreezingDetails.push(oNewRow);
				oModel.refresh();
			}
		}
		//If More Rows are selected at a time
		if (aSelectedItems.length > 1) {
			sap.m.MessageToast.show("Please select only ONE Allocation Details Row");
		}
		//If Single Row got selected
		if (aSelectedItems.length === 1) {
			var oSelectedRowContext = grantRevenueTable.getSelectedItem().getBindingContextPath();
			var oSelectedRowData = this.oModel.getProperty(oSelectedRowContext);
			for (var i = 0; i < aSelectedItems.length; i++) {
				var oBindingContextPath = aSelectedItems[i].getBindingContextPath().split("/");
				var aSelectedPathLength = oBindingContextPath.length;
				var oRowId = aSelectedPathLength - 1;
				var iIndex = oBindingContextPath[oRowId] - i + 1;
			}
			var oModel = this.oModel;
			var oModelData = oModel.getData();
			var oNewRow = {
				LineId: oModelData.FreezingDetails.length + 1,
				U_SubCod: oSelectedRowData.U_SubCod,
				U_SubNm: oSelectedRowData.U_SubNm,
				U_LocCod: oSelectedRowData.U_LocCod,
				U_LocNm: oSelectedRowData.U_LocNm,
				U_PgmCod: oSelectedRowData.U_PgmCod,
				U_PgmNm: oSelectedRowData.U_PgmNm,
				//U_FrzPrPgm: oSelectedRowData.U_FrzPrPgm,
				U_PrPgCd: oSelectedRowData.U_PrPgCd,
				U_PrPgm: oSelectedRowData.U_PrPgm,
				U_GrInit: oSelectedRowData.U_GrInit,
				U_GrIntNm: oSelectedRowData.U_GrIntNm,
				U_Actvty: oSelectedRowData.U_Actvty,
				U_GrCur: oModelData.GrantCur,
				U_Amnt: "",
				U_AmntUSD: "",
				U_Manager: oSelectedRowData.U_Manager,
				U_CF: oSelectedRowData.U_CF,
				U_BsLine: oSelectedRowData.LineId,
				U_Validated: "No",
				U_MngCd: oModelData.U_MngCd,
				U_ExAmLC: "",
				U_ExAmUSD: "",
				U_ExAmGC: ""

			};
			var iErrorCount = 0;
			if (iErrorCount === 0) {
				//oModelData.FreezingDetails.push(oNewRow);
				oModelData.FreezingDetails.splice(iIndex, 0, oNewRow);
				oModel.refresh();
			}
		}

		//var oModelData = this.oModel.getData();
		var that = this;
		var oResults = $.extend([], oModelData.FreezingDetails);
		for (var j = 0; j < oResults.length; j++) {
			oResults[j].LineId = j + 1;
		}
		that.oModel.setProperty("/FreezingDetails", []);
		that.oModel.setProperty("/FreezingDetails", oResults);

		grantRevenueTable.removeSelections();
	},

	handleDeleteFreezingRow: function() {
		var oModelData = this.oModel.getData();
		var that = this;
		var oResults = $.extend([], oModelData.FreezingDetails);
		var grantRevenueTable = this.byId("idAllocationDetails");
		var aSelectedItems = grantRevenueTable.getSelectedItems();

		var oAllcResults = $.extend([], oModelData.GrantRevenueAllocation);

		for (var i = 0; i < aSelectedItems.length; i++) {
			var oBindingContextPath = aSelectedItems[i].getBindingContextPath().split("/");
			var aSelectedPathLength = oBindingContextPath.length;
			var oRowId = aSelectedPathLength - 1;
			var iIndex = oBindingContextPath[oRowId] - i;
			// 			var iAllcIndex = oBindingContextPath[oRowId] - i + 1;

			// 			var AllocRowlength = oAllcResults.length;
			// 			var updatedRow = 0;
			// 			var deletedRow = 0;

			oResults.splice([iIndex], 1);
			// 			for (var k = 0; k < AllocRowlength; k++) {
			// 				updatedRow = k - deletedRow;
			// 				if (oAllcResults[updatedRow].U_GRevLNo.toString() === iAllcIndex.toString()) {
			// 					deletedRow = deletedRow + 1;
			// 					//sap.m.MessageToast.show("Success");
			// 					oAllcResults.splice([updatedRow], 1);
			// 				}
			// 			}
		}
		that.oModel.setProperty("/FreezingDetails", []);
		that.oModel.setProperty("/FreezingDetails", oResults);

		for (var j = 0; j < oResults.length; j++) {
			oResults[j].LineId = j + 1;
		}
		that.oModel.setProperty("/FreezingDetails", []);
		that.oModel.setProperty("/FreezingDetails", oResults);

		grantRevenueTable.removeSelections();

	},

	handleAmountLiveChange: function(oEvent) {
		var oAmtBindingContextPath = oEvent.getSource().getBindingContext().sPath;
		//var aTaxSelectedPathLength = oTaxBindingContextPath.length;
		//var oTaxRowId = aTaxSelectedPathLength - 1;
		//this.oTaxRowId = oTaxBindingContextPath[oTaxRowId];
		this.oModel.setProperty(oAmtBindingContextPath + "/Amount", oEvent.oSource.getValue());
		var Amt = this.oModel.getProperty(oAmtBindingContextPath + "/Amount");

		//var Total = Qty*Price;
		this.oModel.refresh();
		//this.onPriceChange(oAmtBindingContextPath);
	},

	handleDonorList: function(oEvent) {
		var that = this;
		if (!this.oDonorMasterDialog) {
			this.oDonorMasterDialog = sap.ui.xmlfragment("SLFiori.fragments.transactions.donorMaster", this);
		}
		sap.ui.getCore().byId("DonorListTable").removeSelections();
		this.oDonorMasterDialog.setModel(this.oModel);
		$.ajax({
			//url: "/b1s/v1/BusinessPartners?$select=CardCode,CardName,ContactPerson,Cellular,EmailAddress&$filter=Valid eq 'Y' and Frozen eq 'N' &$top=1000&$orderby=CardName",
			url: "/b1s/v1/BusinessPartners?$select=CardCode,CardName,ContactPerson,Cellular,EmailAddress&$filter=Valid eq 'Y' and Frozen eq 'N' &$top=1000&$orderby=CardName",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().DonorList = oData.value;
				that.oModel.refresh();
				that.oDonorMasterDialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError);
			}
		});
	},

	handleCustOk: function(oEvent) {
		var oDonorListTable = sap.ui.getCore().byId("DonorListTable");
		var oSelectedDonor = oDonorListTable.getSelectedItem();
		if (oSelectedDonor) {
			var oSelctedCustContext = oSelectedDonor.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Donor = this.oModel.getProperty(path);
			this.oModel.setProperty("/DnrCod", Donor.CardCode);
			this.oModel.setProperty("/DnrNam", Donor.CardName);
			//this.oModel.setProperty("/DonorCnt", Donor.CntctPrsn);
			//this.oModel.setProperty("/TelNo", Donor.Cellular);

			this.oModel.refresh();
			sap.ui.getCore().byId("DonorListTable").removeSelections();
			this.oDonorMasterDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Donor");
		}
	},

	handleCustClose: function() {
		sap.ui.getCore().byId("DonorListTable").removeSelections();
		this.oDonorMasterDialog.close();
	},

	handleCostCentersList: function(oEvent) {
		var that = this;
		if (!this.oCostCentersDialog) {
			this.oCostCentersDialog = sap.ui.xmlfragment("SLFiori.fragments.transactions.grantCodev1", this);
		}
		sap.ui.getCore().byId("CostCentersListTable").removeSelections();
		this.oCostCentersDialog.setModel(this.oModel);
		$.ajax({
			//url: "https://172.31.28.160:50000/b1s/v1/BusinessPartners?$select=CardCode,CardName,CntctPrsn,Cellular?$filter=CardType eq 'C'",
			//url: "https://172.31.28.160:50000/b1s/v1/BusinessPartners?$select=CardCode,CardName,ContactPerson,Cellular",
			url: "OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '1' and U_GrRes ne 'R'",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().CostCentersList = oData.d.results; //oData.value;
				that.oModel.refresh();
				that.oCostCentersDialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError);
			}
		});
	},

	handleCostCentersOk: function(oEvent) {
		var oCostCentersListTable = sap.ui.getCore().byId("CostCentersListTable");
		var oSelectedCostCenter = oCostCentersListTable.getSelectedItem();
		if (oSelectedCostCenter) {
			var oSelctedCCContext = oSelectedCostCenter.getBindingContext();
			var path = oSelctedCCContext.sPath;
			var CC = this.oModel.getProperty(path);
			this.oModel.setProperty("/GCode", CC.CCCode);
			this.oModel.setProperty("/GName", CC.CCName);
			this.oModel.setProperty("/GrantCur", CC.U_GrCur);
			this.oModel.setProperty("/GrRes", CC.U_GrRes);
			this.oModel.setProperty("/GMan", CC.U_Mangr);
			// this.oModel.setProperty("/DonorCnt", Donor.CntctPrsn);
			// this.oModel.setProperty("/TelNo", Donor.Cellular);
			var oModelData = this.oModel.getData();
			var AllcDate = new Date(oModelData.AllCrDt);

			var month = AllcDate.getMonth() + 1;
			var date = AllcDate.getDate();

			if (month < 10) {
				month = "0" + month;
			}

			if (date < 10) {
				date = "0" + date;
			}

			AllcDate = AllcDate.getFullYear() + "-" + month + "-" + date;
			var Currency = oModelData.GrantCur;
			var ExRate = 0;
			$.ajax({
				url: "OData/transactions/allocation/allocation_ExRate.xsodata/ExRate?$filter=RateDate eq '" + AllcDate + "' and Currency eq '" +
					Currency + "'",
				xhrFields: {
					withCredentials: true
				},
				async: false,
				type: "GET",
				dataType: "json",
				success: function(oData, oResponse) {
					//that.oModel.getData().CostCentersList = oData.d.results; //oData.value;
					//this.oModel.setProperty("/ExRate", 10);//oData.d.results[0].Rate);
					ExRate = oData.d.results[0].Rate;
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError);
				}
			});
			this.oModel.setProperty("/ExRate", ExRate);

			this.oModel.refresh();
			sap.ui.getCore().byId("CostCentersListTable").removeSelections();
			this.oCostCentersDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Grant");
		}
	},

	handleCostCentersClose: function() {
		sap.ui.getCore().byId("CostCentersListTable").removeSelections();
		this.oCostCentersDialog.close();
	},

	handleDim2: function(oEvent) {
		var that = this;
		if (!this.oDim2Dialog) {
			this.oDim2Dialog = sap.ui.xmlfragment("SLFiori.fragments.Dim2", this);
		}
		this.oDim2 = "";
		var oDim2BindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aDim2SelectedPathLength = oDim2BindingContextPath.length;
		var oDim2RowId = aDim2SelectedPathLength - 1;
		this.oDim2RowId = oDim2BindingContextPath[oDim2RowId];

		sap.ui.getCore().byId("Dim2ListTable").removeSelections();
		this.oDim2Dialog.setModel(this.oModel);
		$.ajax({
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
				sap.m.MessageToast.show("Error: " + oError);
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
			this.oModel.setProperty("/FreezingDetails/" + this.oDim2RowId + "/U_SubCod", Dim2.CCCode);
			this.oModel.setProperty("/FreezingDetails/" + this.oDim2RowId + "/U_SubNm", Dim2.CCName);
			this.oModel.refresh();
			sap.ui.getCore().byId("Dim2ListTable").removeSelections();
			this.oDim2Dialog.close();
		} else {
			sap.m.MessageToast.show("Please select Dimension");
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
		this.oDim3 = "";
		var oDim3BindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aDim3SelectedPathLength = oDim3BindingContextPath.length;
		var oDim3RowId = aDim3SelectedPathLength - 1;
		this.oDim3RowId = oDim3BindingContextPath[oDim3RowId];

		sap.ui.getCore().byId("Dim3ListTable").removeSelections();
		this.oDim3Dialog.setModel(this.oModel);

		var oAmtBindingContextPath = oEvent.getSource().getBindingContext().sPath;
		//this.oModel.setProperty(oAmtBindingContextPath + "/U_RevenSub", oEvent.oSource.getValue());
		var SubLoc = this.oModel.getProperty(oAmtBindingContextPath + "/U_SubCod");

		$.ajax({
			url: "OData/CostCenter.xsodata/CostCenter?$filter=U_SubCode eq '" + SubLoc +
				"'",
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
				sap.m.MessageToast.show("Error: " + oError);
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

			this.oModel.setProperty("/FreezingDetails/" + this.oDim3RowId + "/U_LocCod", Dim3.CCCode);
			this.oModel.setProperty("/FreezingDetails/" + this.oDim3RowId + "/U_LocNm", Dim3.CCName);
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

	handleDim4: function(oEvent) {
		var that = this;
		if (!this.oDim4Dialog) {
			this.oDim4Dialog = sap.ui.xmlfragment("SLFiori.fragments.Dim4", this);
		}
		this.oDim4 = "";
		var oDim4BindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aDim4SelectedPathLength = oDim4BindingContextPath.length;
		var oDim4RowId = aDim4SelectedPathLength - 1;
		this.oDim4RowId = oDim4BindingContextPath[oDim4RowId];

		sap.ui.getCore().byId("Dim4ListTable").removeSelections();
		this.oDim4Dialog.setModel(this.oModel);
		$.ajax({
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
				sap.m.MessageToast.show("Error: " + oError);
			}
		});
	},

	handleDim4Ok: function(oEvent) {
		var oDim4ListTable = sap.ui.getCore().byId("Dim4ListTable");
		var oSelectedDim4 = oDim4ListTable.getSelectedItem();
		if (oSelectedDim4) {
			var oSelctedCustContext = oSelectedDim4.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Dim4 = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);
			this.oModel.setProperty("/FreezingDetails/" + this.oDim4RowId + "/U_PgmCod", Dim4.CCCode);
			this.oModel.setProperty("/FreezingDetails/" + this.oDim4RowId + "/U_PgmNm", Dim4.CCName);
			//this.oModel.setProperty("/FreezingDetails/" + this.oDim4RowId + "/U_PrPgCd", Dim4.U_ParPgm);
			this.oModel.setProperty("/FreezingDetails/" + this.oDim4RowId + "/U_PrPgm", Dim4.ProgramName);
			this.oModel.refresh();
			sap.ui.getCore().byId("Dim4ListTable").removeSelections();
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
		if (!this.oGIDialog) {
			this.oGIDialog = sap.ui.xmlfragment("SLFiori.fragments.Dim5", this);
		}
		this.oDim5 = "";
		var oDim5BindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aDim5SelectedPathLength = oDim5BindingContextPath.length;
		var oDim5RowId = aDim5SelectedPathLength - 1;
		this.oDim5RowId = oDim5BindingContextPath[oDim5RowId];

		sap.ui.getCore().byId("Dim5ListTable").removeSelections();
		this.oGIDialog.setModel(this.oModel);
		$.ajax({
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
				that.oGIDialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError);
			}
		});
	},

	handleDim5Ok: function(oEvent) {
		var oDim5ListTable = sap.ui.getCore().byId("Dim5ListTable");
		var oSelectedDim5 = oDim5ListTable.getSelectedItem();
		if (oSelectedDim5) {
			var oSelctedCustContext = oSelectedDim5.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Dim5 = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);
			this.oModel.setProperty("/FreezingDetails/" + this.oDim5RowId + "/U_GrInit", Dim5.CCCode);
			this.oModel.setProperty("/FreezingDetails/" + this.oDim5RowId + "/U_GrIntNm", Dim5.CCName);
			this.oModel.refresh();
			sap.ui.getCore().byId("Dim5ListTable").removeSelections();
			this.oGIDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Dimension");
		}

	},

	handleDim5Close: function(oEvent) {
		this.oGIDialog.close();
	},

	handleRevenueType: function(oEvent) {
		var that = this;
		if (!this.oRevTypeDialog) {
			this.oRevTypeDialog = sap.ui.xmlfragment("SLFiori.fragments.RevenueType", this);
		}
		this.oRevType = "";
		var oRevTypeBindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aRevTypeSelectedPathLength = oRevTypeBindingContextPath.length;
		var oRevTypeRowId = aRevTypeSelectedPathLength - 1;
		this.oRevTypeRowId = oRevTypeBindingContextPath[oRevTypeRowId];

		sap.ui.getCore().byId("RevTypeListTable").removeSelections();
		this.oRevTypeDialog.setModel(this.oModel);
		$.ajax({
			url: "OData/RevenueType.xsodata/RevenueType",
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
				that.oModel.getData().RevTypeList = oData.d.results;
				that.oModel.refresh();
				that.oRevTypeDialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError);
			}
		});
	},

	handleRevTypeOk: function(oEvent) {
		var oRevTypeListTable = sap.ui.getCore().byId("RevTypeListTable");
		var oSelectedRevType = oRevTypeListTable.getSelectedItem();
		if (oSelectedRevType) {
			var oSelctedCustContext = oSelectedRevType.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var RevType = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);
			this.oModel.setProperty("/GrantRevenueDetails/" + this.oRevTypeRowId + "/U_RevenTyp", RevType.U_RevTyp);
			this.oModel.refresh();
			sap.ui.getCore().byId("RevTypeListTable").removeSelections();
			this.oRevTypeDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Revenue Type");
		}

	},

	handleRevTypeClose: function(oEvent) {
		this.oRevTypeDialog.close();
	},

	handleGrantCurrency: function(oEvent) {
		var that = this;
		if (!this.oCurrencyrDialog) {
			this.oCurrencyrDialog = sap.ui.xmlfragment("SLFiori.fragments.CurrencyMasterV1", this);
		}
		sap.ui.getCore().byId("CurrencyListTable").removeSelections();
		this.oCurrencyrDialog.setModel(this.oModel);
		$.ajax({
			//url: "https://172.31.28.160:50000/b1s/v1/BusinessPartners?$select=CardCode,CardName,CntctPrsn,Cellular&$filter=CardType eq 'C'",
			//url: "https://172.31.28.160:50000/b1s/v1/BusinessPartners?$select=CardCode,CardName,ContactPerson,Cellular",
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
				sap.m.MessageToast.show("Error: " + oError);
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
			this.oModel.setProperty("/GrantCur", Donor.CurrCode);
			//this.oModel.setProperty("/DnrNam", Donor.CardName);
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
			this.oModel.setProperty("/GrFinMan", User.USER_CODE);
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

	handleUserRowList: function(oEvent) {
		var that = this;
		if (!this.oUserMasterDialog) {
			this.oUserMasterDialog = sap.ui.xmlfragment("SLFiori.fragments.transactions.allocation_UserMaster", this);
		}

		this.oUser = "";
		var oUserBindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aUserSelectedPathLength = oUserBindingContextPath.length;
		var oUserRowId = aUserSelectedPathLength - 1;
		this.oUserRowId = oUserBindingContextPath[oUserRowId];

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

	handleUserRowOk: function(oEvent) {
		var oUserListTable = sap.ui.getCore().byId("UserListTable");
		var oSelectedUser = oUserListTable.getSelectedItem();
		if (oSelectedUser) {
			var oSelctedCustContext = oSelectedUser.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var User = this.oModel.getProperty(path);
			//this.oModel.setProperty("/GrFinManCode", User.USER_CODE);
			this.oModel.setProperty("/FreezingDetails/" + this.oUserRowId + "/U_MngCd", User.USER_CODE);
			this.oModel.setProperty("/FreezingDetails/" + this.oUserRowId + "/U_Manager", User.U_NAME);
			//this.oModel.setProperty("/DonorCnt", Donor.CntctPrsn);
			//this.oModel.setProperty("/TelNo", User.Cellular);

			this.oModel.refresh();
			sap.ui.getCore().byId("UserListTable").removeSelections();
			this.oUserMasterDialog.close();
		} else {
			sap.m.MessageToast.show("Please select User");
		}
	},

	handleUserRowClose: function() {
		sap.ui.getCore().byId("UserListTable").removeSelections();
		this.oUserMasterDialog.close();
	},

	handleAmountGCLiveChange: function(oEvent) {
		var oQtyBindingContextPath = oEvent.getSource().getBindingContext().sPath;
		this.oModel.setProperty(oQtyBindingContextPath + "/U_Amnt", oEvent.oSource.getValue());
		this.oModel.refresh();
		this.onAmountGCChange(oQtyBindingContextPath);
	},

	onAmountGCChange: function(oContext) {
		var oModelData = this.oModel.getData();

		var GCAmt = this.oModel.getProperty(oContext + "/U_Amnt");
		var ExRate = oModelData.ExRate;
		var Total = GCAmt * ExRate;
		this.oModel.setProperty(oContext + "/U_AmntUSD", Total);
		this.oModel.refresh();

		//  var oItems = this.oModel.getData().selectedItemList;
		//  var DocTotal=0;
		//  for(var i=0; i< oItems.length; i++){
		//     DocTotal = DocTotal + ((oItems[i].Total === "") ? 0 : parseFloat(oItems[i].Total));
		// }
		//  this.oModel.setProperty("/DocTotal", DocTotal);
		//  this.oModel.refresh();
	},

	handleExchangeRateLiveChange: function(oEvent) {
		var oQtyBindingContextPath = oEvent.getSource().getBindingContext().sPath;
		this.oModel.setProperty(oQtyBindingContextPath + "/AlAmUSD", oEvent.oSource.getValue());
		this.oModel.refresh();
		this.onXchangeRateChange(oQtyBindingContextPath);
		// 		 var oModelData = this.oModel.getData();

		//         var LCAmt = oModelData.AlcAmnt;
		// 		//var GCAmt = this.oModel.getProperty(oContext + "/U_Amnt");
		// 		var ExRate = oModelData.ExRate;
		// 		var Total = LCAmt * ExRate;
		// 		this.oModel.setProperty("/AlAmUSD", Total);
		// 		this.oModel.refresh();
	},

	onXchangeRateChange: function(Context) {
		var oModelData = this.oModel.getData();

		var LCAmt = oModelData.AlcAmnt;
		//var GCAmt = this.oModel.getProperty(oContext + "/U_Amnt");
		var ExRate = oModelData.ExRate;
		var Total = LCAmt * ExRate;
		this.oModel.setProperty("/AlAmUSD", Total);
		this.oModel.refresh();

		//  var oItems = this.oModel.getData().selectedItemList;
		//  var DocTotal=0;
		//  for(var i=0; i< oItems.length; i++){
		//     DocTotal = DocTotal + ((oItems[i].Total === "") ? 0 : parseFloat(oItems[i].Total));
		// }
		//  this.oModel.setProperty("/DocTotal", DocTotal);
		//  this.oModel.refresh();
	},

	onFreezeSearch: function(oEvt) {
		var list = sap.ui.getCore().byId("GetFreezingTable"); //this.getView().byId("idList");
		var oBinding = list.getBinding("items");
		// add filter for search
		var aFilters = [];
		var sQuery = oEvt.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("U_GName", sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}
		oBinding.filter(aFilters);
	},

	onFreezeBackSearch: function(oEvt) {
		var list = sap.ui.getCore().byId("GetFreezingTableBack"); //this.getView().byId("idList");
		var oBinding = list.getBinding("items");
		// add filter for search
		var aFilters = [];
		var sQuery = oEvt.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("U_GName", sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}
		oBinding.filter(aFilters);
	},

	onFreezeSaveSearch: function(oEvt) {
		var list = sap.ui.getCore().byId("GetFreezingTableSave"); //this.getView().byId("idList");
		var oBinding = list.getBinding("items");
		// add filter for search
		var aFilters = [];
		var sQuery = oEvt.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("U_GName", sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}
		oBinding.filter(aFilters);
	}

});