sap.ui.controller("SLFiori.view.GrantContract", {

	onInit: function() {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
		this.GrantEntry = "";
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
			GrantEntryNo: "",

			GCDocNum: "",
			SFDCOppN: "",
			GCrDate: CurrDate,
			Status: "O",

			DnrCod: "",
			DnrNam: "",
			DSFDCId: "",

			//CommGrnt: "",

			GCType: "",
			GCFrom: "",
			GCTo: "",
			GCAmt: "0",

			GName: "",
			GCode: "",
			GrantCur: "",
			GrRes: "",

			GrFinManCode: "",
			GrFinMan: "",
			GMan: "",
			//GDate: "",

			Rmks: "",
			Athmnt: "",

			GSCCov: "No",
			GSCCovPr: "0",
			//GRelsSt: "",
			U_AllcPost: "N",
			U_FrzPost: "N",

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

			GrantRevenueDetails: [
				{
					LineId: "1",
					//U_GrLnNm: "1",
					U_RevenSub: "",
					U_ReSubNm: "",
					U_ReLocNm: "",
					U_RePgmNm: "",
					U_RevenTyp: "",
					U_RevenLoc: "",
					U_RevenPgm: "",
					//U_RevnGPgm: "",
					U_PaySch: "",
					U_PayDue: "",
					U_Remarks: "",
					//U_Alloc: "",
					U_Amount: "",
					U_SOPost: "No"
				}
                      ],
			GrantRevenueAllocation: [

                      ],
			GrantInitiative: [

                       ],
			GrantReporting: [

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

			//ComboType: [],

			ComboType: [{
				key: "",
				value: ""
 			}, {
				key: "P",
				value: "Pledged"
 			}, {
				key: "U",
				value: "UnPledged"
 			}],

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
			GrantEntryNo: "",

			GCDocNum: "",
			SFDCOppN: "10",
			GCrDate: CurrDate,
			Status: "O",

			DnrCod: "",
			DnrNam: "",
			DSFDCId: "",

			//CommGrnt: "",

			GCType: "",
			GCFrom: "",
			GCTo: "",
			GCAmt: "0",

			GName: "",
			GCode: "",
			GrantCur: "",
			GrRes: "",

			GrFinManCode: "",
			GrFinMan: "",
			GMan: "",
			//GDate: "",

			Rmks: "",
			Athmnt: "",

			GSCCov: "No",
			GSCCovPr: "0",
			//GRelsSt: "",
			U_AllcPost: "N",
			U_FrzPost: "N",

			SODBNAME: "",

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

			GrantRevenueDetails: [
				{
					LineId: "1",
					U_RevenSub: "",
					U_ReSubNm: "",
					U_ReLocNm: "",
					U_RePgmNm: "",
					U_RevenTyp: "",
					U_RevenLoc: "",
					U_RevenPgm: "",
					//U_RevnGPgm: "",
					U_PaySch: "",
					U_PayDue: "",
					U_Remarks: "",
					//U_Alloc: "",
					U_Amount: "",
					U_SOPost: "No"
				}
                      ],
			GrantRevenueAllocation: [

                      ],
			GrantInitiative: [

                       ],
			GrantReporting: [

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

			//ComboBox Populate Dynamic
			//ComboType: [ ],

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

		/*				var that = this;
		
		//ComboBox Populate Dynamic
		$.ajax({
				url: "/b1s/v1/BusinessPartners?$select=CardCode,CardName &$top=10 &$orderby=CardName",
				xhrFields: {
					withCredentials: true
				},
				async: false,
				type: "GET",
				dataType: "json",
				success: function(oData, oResponse) {
					var oResults = oData.value;
					
					for (var i = 0; i < oResults.length; i++) {
						delete oResults[i].__metadata;
					}
					
					that.oModel.getData().ComboType = oResults;
					//that.oModel.getData().ComboType.push(oEmptyCardDetails);
					that.oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				}
			});*/
	},

	handleSaveGrantContract: function(oEvent) {

		/*var jData =  JSON.stringify({CardCode:"C20000",
		                            DocumentLines:[{ItemCode:"A00001",TaxCode:"VAT@4",Quantity:"110","UnitPrice":"20"}]
		});*/
		var oModelData = this.oModel.getData();

		var that = this;

		var oResults = oModelData.GrantRevenueDetails;
		for (var i = 0; i < oResults.length; i++) {
			delete oResults[i].RowEnable;
			delete oResults[i].RowVisible;
		}
		var AllocationPost = "N";
		var FreezingPost = "N";
		if (oModelData.U_AllcPost === "Y") {
			AllocationPost = "Y";
		} else {
			AllocationPost = "N";
		}

		if (oModelData.U_FrzPost === "Y") {
			FreezingPost = "Y";
		} else {
			FreezingPost = "N";
		}

		var jData = JSON.stringify({
			U_SFDCOppN: oModelData.SFDCOppN,
			U_GCrDate: oModelData.GCrDate,
			U_Status: oModelData.Status,
			U_DnrCod: oModelData.DnrCod,
			U_DnrNam: oModelData.DnrNam,
			U_DSFDCId: oModelData.DSFDCId,
			U_GCType: oModelData.GCType,

			//U_CommGrnt: oModelData.CommGrnt,

			U_GCFrom: oModelData.GCFrom,
			U_GCTo: oModelData.GCTo,
			U_GCAmt: oModelData.GCAmt,
			U_GCode: oModelData.GCode,
			U_GName: oModelData.GName,
			U_GrantCur: oModelData.GrantCur,
			U_GrRes: oModelData.GrRes,
			U_GrFinMan: oModelData.GrFinMan,
			U_GMan: oModelData.GMan,
			U_Rmks: oModelData.Rmks,
			U_Athmnt: oModelData.Athmnt,

			//			U_GDate: oModelData.GDate,
			U_GSCCov: oModelData.GSCCov,
			U_GSCCovPr: oModelData.GSCCovPr,
			U_AllcPost: AllocationPost,
			U_FrzPost: FreezingPost,
			//U_GRelsSt: oModelData.GRelsSt,

			//"IK_NCT1Collection":[{U_RevenSub:oModelData.GrantRevenueDetails.RevenSub}]
			"IK_NCT1Collection": oModelData.GrantRevenueDetails,
			//"IK_NCT2Collection": oModelData.GrantPaymentSchedule,
			"IK_NCT2Collection": oModelData.GrantRevenueAllocation,
			"IK_NCT3Collection": oModelData.GrantInitiative,
			"IK_NCT4Collection": oModelData.GrantReporting
		});
		//var CardCode = this.byId("sId")
		if (oModelData.GCFrom === "") {
			sap.m.MessageToast.show("Please enter Grant from date");
		} else if (oModelData.GCTo === "") {
			sap.m.MessageToast.show("Please enter Grant To date");
		} else {
			if (oModelData.FormMode !== "Add") {
				$.ajax({
					//url: "https://10.0.1.189:50000/b1s/v1/IK_GNCT(" + oModelData.GrantEntryNo + ")",
					url: "/b1s/v1/IK_GNCT(" + oModelData.GrantEntryNo + ")",
					xhrFields: {
						withCredentials: true
					},
					data: jData,
					type: "PATCH",
					dataType: "json",
					success: this.handleGrantList_Save1(),
					error: function(xhr, status, errorThrown) {
						sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
					},
					complete: function(xhr, status) {}
				});

				// var formData = new FormData();
				// formData.append('files', $(test)[0].files[0]);

				// $.ajax({
				// 	//url: "https://10.0.1.189:50000/b1s/v1/IK_GNCT(" + oModelData.GrantEntryNo + ")",
				// 	url: "/b1s/v1/Attachments2",
				// 	data: formData,
				// 	type: "POST",
				// 	processData: false,
				// 	contentType: false,
				// 	dataType: "json",
				// 	beforeSend: function(xhr) {
				// 		xhr.setRequestHeader("B1S-ReplaceCollectionsOnPatch", "true");
				// 	},
				// 	success: function(json) {
				// 		sap.m.MessageToast.show("Attachment Updated Sucessfully");
				// 	},
				// 	error: function(xhr, status, errorThrown) {
				// 		sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
				// 	},
				// 	complete: function(xhr, status) {}
				// });
			} else {
				//sap.m.MessageToast.show("FormMode-Add");
				$.ajax({

					//url: "https://10.0.1.189:50000/b1s/v1/IK_GNCT",
					url: "/b1s/v1/IK_GNCT",
					xhrFields: {
						withCredentials: true
					},
					data: jData,
					type: "POST",
					dataType: "json",
					success: function(json) {
					    that.router.navTo("Dashboard");
						sap.m.MessageToast.show("Grant Contract Posted Sucessfully");
					},
					error: function(xhr, status, errorThrown) {
						sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
					},
					complete: function(xhr, status) {}
				});
			}
		}

		if (oModelData.EntrySaveToUpdate === "Yes") {
			//this.handlelistSave();
			oModelData.EntrySaveToUpdate = "No";
			this.handleGrantList_Save();
		}
	},

	handleGrantList_Save1: function(oEvent) {
		var oModelData = this.oModel.getData();
		oModelData.EntrySaveToUpdate = "Yes";
		//sap.m.MessageToast.show("");

	},

	handledoFileUpload2: function(oEvent) {
		var fileLoader = this.byId("test");
		var fileName = fileLoader.getValue();
		jQuery.sap.require("sap.ui.commons.MessageBox");
		if (fileName === "") {
			sap.ui.commons.MessageBox.show("Please choose File.", sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
		} else {
			//	var uploadUrl = "../Services/BatchFileUpload.xsjs?file_name=" + fileName;
			//var formEle = jQuery.sap.domById("fileLoader");
			var formEle = fileLoader.getDomRef();
			var form = $(formEle).find("form")[0];

			var formData = new FormData();
			formData.append('files', $(fileLoader)[0].file);
			formData.append('files', fileName);

			var fd = new FormData(form);
			//$.ajax({
			// url: uploadUrl,
			// type: "GET",
			// beforeSend: function(xhr) {
			// 	xhr.setRequestHeader("X-CSRF-Token", "Fetch");
			// },
			//success: function(data, textStatus, XMLHttpRequest) {
			//var token = XMLHttpRequest.getResponseHeader('X-CSRF-Token');
			$.ajax({
				url: "/b1s/v1/Attachments2",
				type: "POST",
				processData: false,
				contentType: '.txt',
				data: formData,
				datatype: 'json',
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Content-Type", "multipart/form-data");
				},
				success: function(data, textStatus, XMLHttpRequest) {
					var resptext = XMLHttpRequest.responseText;
					jQuery.sap.require("sap.ui.commons.MessageBox");
					sap.ui.commons.MessageBox.show(resptext, sap.ui.commons.MessageBox.Icon.INFORMATION, "Information");
					//	sap.ui.getCore().byId("BatchTable").getModel().refresh();
				},
				error: function(data, textStatus, XMLHttpRequest) {
					sap.ui.commons.MessageBox.show("File could not be uploaded.", sap.ui.commons.MessageBox.Icon.ERROR, "Error");
				}
			});
			//}
			//});
		}
	},

	handleAddEntry: function() {
		//var oPanel = this.getView().byId("_HBox");
		//oPanel.setBusy(true);

		var oDialog = this.getView().byId("BusyDialog");
		oDialog.open();

		this.oModel = new sap.ui.model.json.JSONModel(this.NewEntry);
		this.getView().setModel(this.oModel);

		//oPanel.setBusy(false);
	},

	_handleRouteMatched: function(data) {
		this.GrantEntry = data.mParameters.arguments.Key;

		if (this.GrantEntry === "0") {
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
				GrantEntryNo: "",

				GCDocNum: "",
				SFDCOppN: "",
				GCrDate: CurrDate,
				Status: "O",

				DnrCod: "",
				DnrNam: "",
				DSFDCId: "",

				//CommGrnt: "",

				GCType: "",
				GCFrom: "",
				GCTo: "",
				GCAmt: "0",

				GName: "",
				GCode: "",
				GrantCur: "",
				GrRes: "",

				GrFinManCode: "",
				GrFinMan: "",
				GMan: "",
				//GDate: "",

				Rmks: "",
				Athmnt: "",

				GSCCov: "No",
				GSCCovPr: "0",
				//GRelsSt: "",
				U_AllcPost: "N",
				U_FrzPost: "N",

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

				GrantRevenueDetails: [
					{
						LineId: "1",
						//U_GrLnNm: "1",
						U_RevenSub: "",
						U_ReSubNm: "",
						U_ReLocNm: "",
						U_RePgmNm: "",
						U_RevenTyp: "",
						U_RevenLoc: "",
						U_RevenPgm: "",
						//U_RevnGPgm: "",
						U_PaySch: "",
						U_PayDue: "",
						U_Remarks: "",
						//U_Alloc: "",
						U_Amount: "",
						U_SOPost: "No"
				}
                      ],
				GrantRevenueAllocation: [

                      ],
				GrantInitiative: [

                       ],
				GrantReporting: [

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

				//ComboType: [],

				ComboType: [{
					key: "",
					value: ""
 			}, {
					key: "P",
					value: "Pledged"
 			}, {
					key: "U",
					value: "UnPledged"
 			}],

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

			//oPanel.setBusy(false);
		} else {
			this.oModel = new sap.ui.model.json.JSONModel(this.list);
			this.getView().setModel(this.oModel);

			var oParameter = data.getParameter("name");
			if (oParameter !== "GrantContract") {
				return;
			}
			var oModelData = this.oModel.getData();
			var that = this;
			$.ajax({
				// 			url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/GrantContract_Header.xsodata/GrantContract?$filter=DocEntry eq '" +
				// 				this.GrantEntry + "'",
				url: "OData/GrantContract_Header.xsodata/GrantContract?$filter=DocEntry eq '" + this.GrantEntry + "'",
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
					//that.oModel.getData().GrantRevenueDetails = oResults;
					that.oModel.setProperty("/GrantEntryNo", oData.d.results[0].DocEntry);
					that.oModel.setProperty("/GCDocNum", oData.d.results[0].DocNum);
					that.oModel.setProperty("/GCode", oData.d.results[0].GCode);
					that.oModel.setProperty("/GName", oData.d.results[0].U_GName);
					that.oModel.setProperty("/DnrCod", oData.d.results[0].U_DnrCod);
					that.oModel.setProperty("/DnrNam", oData.d.results[0].U_DnrNam);
					that.oModel.setProperty("/DSFDCId", oData.d.results[0].U_DSFDCId);
					that.oModel.setProperty("/CommGrnt", oData.d.results[0].U_CommGrnt);
					that.oModel.setProperty("/GCrDate", oData.d.results[0].U_GCrDate);
					//that.oModel.setProperty("/GCrDate", "2017-04-25");
					that.oModel.setProperty("/Status", oData.d.results[0].U_Status);
					that.oModel.setProperty("/SFDCOppN", oData.d.results[0].U_SFDCOppN);
					that.oModel.setProperty("/GrantCur", oData.d.results[0].U_GrantCur);
					that.oModel.setProperty("/GCAmt", oData.d.results[0].U_GCAmt);
					that.oModel.setProperty("/GDate", oData.d.results[0].U_GDate);
					that.oModel.setProperty("/GSCCov", oData.d.results[0].U_GSCCov);
					that.oModel.setProperty("/GSCCovPr", oData.d.results[0].U_GSCCovPr);
					that.oModel.setProperty("/GRelsSt", oData.d.results[0].U_GRelsSt);
					that.oModel.setProperty("/GCFrom", oData.d.results[0].U_GCFrom);
					//that.oModel.setProperty("/GCFrom", "2017-04-25");
					that.oModel.setProperty("/GCTo", oData.d.results[0].U_GCTo);
					that.oModel.setProperty("/GrFinMan", oData.d.results[0].U_GrFinMan);
					that.oModel.setProperty("/GMan", oData.d.results[0].U_GMan);
					that.oModel.setProperty("/Athmnt", oData.d.results[0].U_Athmnt);
					that.oModel.setProperty("/Rmks", oData.d.results[0].U_Rmks);
					that.oModel.setProperty("/GCType", oData.d.results[0].U_GCType);
					that.oModel.setProperty("/GrRes", oData.d.results[0].U_GrRes);
					that.oModel.setProperty("/U_AllcPost", oData.d.results[0].U_AllcPost);
					that.oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				}
			});

			$.ajax({
				// 			url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/GrantContract_RevenueDetails.xsodata/GrantContract?$filter=DocEntry eq '" +
				// 				this.GrantEntry + "'&$orderby=LineId asc",
				url: "OData/GrantContract_RevenueDetails.xsodata/GrantContract?$filter=DocEntry eq '" + this.GrantEntry + "'&$orderby=LineId asc",
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
					that.oModel.getData().GrantRevenueDetails = oResults;
					that.oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				}
			});

			$.ajax({
				// 			url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/GrantContract_RevenueAllocation.xsodata/GrantContract?$filter=DocEntry eq '" +
				// 				this.GrantEntry + "'&$orderby=LineId asc",
				url: "OData/GrantContract_RevenueAllocation.xsodata/GrantContract?$filter=DocEntry eq '" + this.GrantEntry + "'&$orderby=LineId asc",
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
					that.oModel.getData().GrantRevenueAllocation = oResults;
					that.oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				}
			});

			$.ajax({
				// 			url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/GrantContract_RevenueDetails.xsodata/GrantContract?$filter=DocEntry eq '" +
				// 				this.GrantEntry + "'&$orderby=LineId asc",
				url: "OData/GrantContract_Initiative.xsodata/GrantContract?$filter=DocEntry eq '" + this.GrantEntry + "'&$orderby=LineId asc",
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
					that.oModel.getData().GrantInitiative = oResults;
					that.oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				}
			});

			$.ajax({
				// 			url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/GrantContract_RevenueDetails.xsodata/GrantContract?$filter=DocEntry eq '" +
				// 				this.GrantEntry + "'&$orderby=LineId asc",
				url: "OData/GrantContract_Reporting.xsodata/GrantContract?$filter=DocEntry eq '" + this.GrantEntry + "'&$orderby=LineId asc",
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
					that.oModel.getData().GrantReporting = oResults;
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
				view.getController().handleSaveGrantContract();
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

	// 	onBack: function(oEvent) {
	// 		var that = this;
	// 		if (!this.oGetGrantDialogBack) {
	// 			this.oGetGrantDialogBack = sap.ui.xmlfragment("SLFiori/fragments/transactions/grantContract.grantContract_back", this);
	// 		}
	// 		sap.ui.getCore().byId("GetGrantTableBack").removeSelections();
	// 		this.oGetGrantDialogBack.setModel(this.oModel);
	// 		$.ajax({
	// 			url: "OData/GrantContract_GrantList.xsodata/GrantContract",
	// 			xhrFields: {
	// 				withCredentials: true
	// 			},
	// 			async: false,
	// 			type: "GET",
	// 			dataType: "json",
	// 			success: function(oData, oResponse) {
	// 				that.oModel.getData().GrantListBack = oData.d.results;
	// 				that.oModel.refresh();
	// 				that.oGetGrantDialogBack.open();
	// 			},
	// 			// 			error: function(oError) {
	// 			// 				sap.m.MessageToast.show("Error: " + oError);
	// 			// 			}
	// 			error: function(oError) {
	// 				//sap.m.MessageToast.show("Error: " + oError);
	// 				if (oError.status === 404) {
	// 					sap.m.MessageToast.show("Session timed out,please close the tab and login again");
	// 				} else {
	// 					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
	// 				}
	// 			}
	// 		});
	// 	},

	onBack: function(oEvent) {
		var that = this;
		if (!this.oGetGrantDialogSave) {
			this.oGetGrantDialogSave = sap.ui.xmlfragment("SLFiori/fragments/transactions/grantContract.grantContract_back", this);
		}
		//sap.ui.getCore().byId("GetGrantTableBack").removeSelections();
		this.oGetGrantDialogSave.setModel(this.oModel);
		$.ajax({
			url: "OData/GrantContract_GrantList.xsodata/GrantContract",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().GrantListBack = oData.d.results;
				that.oModel.refresh();
				that.oGetGrantDialogSave.open();
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

	handleGrantOk_Back: function(oEvent) {
		var that = this;
		var oGetGrantListTable = sap.ui.getCore().byId("GetGrantTableBack");
		var oSelectedGrant = oGetGrantListTable.getSelectedItem();
		if (oSelectedGrant) {
			var oSelctedCustContext = oSelectedGrant.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var GrantDocNum = this.oModel.getProperty(path);
			this.oGetGrantDialogSave.close();
			that.router.navTo("GrantContract", {
				Key: GrantDocNum.DocEntry
			});
		} else {
			this.oGetGrantDialogBack.close();
		}
	},

	handleGrantClose_Back: function() {
		sap.ui.getCore().byId("GetGrantTableBack").removeSelections();
		this.oGetGrantDialogSave.close();
	},

	handleGrantList_Save: function(oEvent) {
		var that = this;
		that.router.navTo("Dashboard");
		if (!this.oGetGrantDialogSave) {
			this.oGetGrantDialogSave = sap.ui.xmlfragment("SLFiori/fragments/transactions/grantContract.grantContract_save", this);
		}
		sap.ui.getCore().byId("GetGrantTableSave").removeSelections();
		this.oGetGrantDialogSave.setModel(this.oModel);
		$.ajax({
			url: "OData/GrantContract_GrantList.xsodata/GrantContract",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().GrantListSave = oData.d.results;
				that.oModel.refresh();
				that.router.navTo("Dashboard");
				//Commented on 08-08-2017
				//that.oGetGrantDialogSave.open();
				sap.m.MessageToast.show("Grant Contract Updated Sucessfully");
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

	handleGrantOk_Save: function(oEvent) {
		var that = this;
		var oGetGrantListTable = sap.ui.getCore().byId("GetGrantTableSave");
		var oSelectedGrant = oGetGrantListTable.getSelectedItem();
		if (oSelectedGrant) {
			var oSelctedCustContext = oSelectedGrant.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var GrantDocNum = this.oModel.getProperty(path);
			this.oGetGrantDialogSave.close();
			that.router.navTo("GrantContract", {
				Key: GrantDocNum.DocEntry
			});
		} else {
			this.oGetGrantDialogSave.close();
		}
	},

	handleGrantClose_Save: function() {
		sap.ui.getCore().byId("GetGrantTableSave").removeSelections();
		this.oGetGrantDialogSave.close();
	},

	handleAddRow: function() {

		/*var jData =  JSON.stringify({CardCode:"C20000",
		                            DocumentLines:[{ItemCode:"A00001",TaxCode:"VAT@4",Quantity:"110","UnitPrice":"20"}]
		});*/
		var oModel = this.oModel;
		var oModelData = oModel.getData();
		var oNewRow = {
			LineId: oModelData.GrantRevenueDetails.length + 1,
			//U_GrLnNm: oModelData.GrantRevenueDetails.length + 1,
			U_RevenSub: "",
			U_RevenLoc: "",
			U_RevenPgm: "",
			U_RevnGPgm: "",
			U_PaySch: "",
			//U_Alloc: "",
			U_Amount: "",
			U_SOPost: "No",
			RowEnable: false,
			RowVisible: false
		};
		var iErrorCount = 0;
		for (var i = 0; i <= oModelData.GrantRevenueDetails.length - 1; i++) {
			if (oModelData.GrantRevenueDetails[i].U_ReSubNm == "") {
				sap.m.MessageToast.show("Please enter Subsidary Name");
				iErrorCount = iErrorCount + 1;
				break;
			}
			if (oModelData.GrantRevenueDetails[i].U_ReLocNm == "") {
				sap.m.MessageToast.show("Please enter Location Name");
				iErrorCount = iErrorCount + 1;
				break;
			}
			if (oModelData.GrantRevenueDetails[i].U_RePgmNm == "") {
				sap.m.MessageToast.show("Please enter Program Name");
				iErrorCount = iErrorCount + 1;
				break;
			}
			if (oModelData.GrantRevenueDetails[i].U_RevenTyp == "") {
				sap.m.MessageToast.show("Please enter Revenue Type");
				iErrorCount = iErrorCount + 1;
				break;
			}
			if (oModelData.GrantRevenueDetails[i].U_PayDue == "") {
				sap.m.MessageToast.show("Please enter Payment Due Date");
				iErrorCount = iErrorCount + 1;
				break;
			}
			if (oModelData.GrantRevenueDetails[i].U_Amount == "") {
				sap.m.MessageToast.show("Please enter Amount");
				iErrorCount = iErrorCount + 1;
				break;
			}
			if (oModelData.GrantRevenueDetails[i].U_Remarks == "") {
				sap.m.MessageToast.show("Please enter Remarks");
				iErrorCount = iErrorCount + 1;
				break;
			}
		}
		if (iErrorCount === 0) {
			oModelData.GrantRevenueDetails.push(oNewRow);
			oModel.refresh();
		}

		//var CardCode = this.byId("sId")

	},

	handleDeleteRow: function() {
		var oModelData = this.oModel.getData();
		var that = this;
		var oResults = $.extend([], oModelData.GrantRevenueDetails);
		var grantRevenueTable = this.byId("idGrantRevenueDetails");
		var aSelectedItems = grantRevenueTable.getSelectedItems();

		var oAllcResults = $.extend([], oModelData.GrantRevenueAllocation);

		for (var i = 0; i < aSelectedItems.length; i++) {
			var oBindingContextPath = aSelectedItems[i].getBindingContextPath().split("/");
			var aSelectedPathLength = oBindingContextPath.length;
			var oRowId = aSelectedPathLength - 1;
			var iIndex = oBindingContextPath[oRowId] - i;
			var iAllcIndex = oBindingContextPath[oRowId] - i + 1;

			var AllocRowlength = oAllcResults.length;
			var updatedRow = 0;
			var deletedRow = 0;
			//delete oResults[iIndex];
			oResults.splice([iIndex], 1);
			for (var k = 0; k < AllocRowlength; k++) {
				updatedRow = k - deletedRow;
				if (oAllcResults[updatedRow].U_GRevLNo.toString() === iAllcIndex.toString()) {
					deletedRow = deletedRow + 1;
					//sap.m.MessageToast.show("Success");
					oAllcResults.splice([updatedRow], 1);
				}
			}
		}
		that.oModel.setProperty("/GrantRevenueDetails", []);
		that.oModel.setProperty("/GrantRevenueDetails", oResults);

		for (var j = 0; j < oResults.length; j++) {
			oResults[j].LineId = j + 1;
		}
		that.oModel.setProperty("/GrantRevenueDetails", []);
		that.oModel.setProperty("/GrantRevenueDetails", oResults);

		that.oModel.setProperty("/GrantRevenueAllocation", []);
		that.oModel.setProperty("/GrantRevenueAllocation", oAllcResults);

		// 		for (var j = 0; j < oResults.length; j++) {
		// 			oResults[j].LineId = j + 1;
		// 		}
		// 		that.oModel.setProperty("/GrantRevenueDetails", []);
		// 		that.oModel.setProperty("/GrantRevenueDetails", oResults);

		//that.oModel.refresh();
		//grantRevenueTable.rerender();
	},

	handleAddRevenueAllocationRow: function() {

		var grantRevenueTable = this.byId("idGrantRevenueDetails");

		var aSelectedItems = grantRevenueTable.getSelectedItems();
		if (aSelectedItems.length === 0) {
			sap.m.MessageToast.show("Please select Grant Revenue Details Row");
		}
		if (aSelectedItems.length > 1) {
			sap.m.MessageToast.show("Please select only ONE Grant Revenue Details Row");
		} else {
			var oSelectedRowContext = grantRevenueTable.getSelectedItem().getBindingContextPath();
			var oSelectedRowData = this.oModel.getProperty(oSelectedRowContext);

			var oModel = this.oModel;
			var oModelData = oModel.getData();
			var oNewRow = {
				LineId: oModelData.GrantRevenueAllocation.length + 1,
				U_GRevLNo: oSelectedRowData.LineId,
				U_AlcSub: "",
				U_AlcLoc: "",
				U_Remarks: "",
				U_Amt: ""
			};
			var iErrorCount = 0;

			if (iErrorCount === 0) {
				oModelData.GrantRevenueAllocation.push(oNewRow);
				oModel.refresh();
			}
		}
	},

	handleAddInitRow: function() {

		var oModel = this.oModel;
		var oModelData = oModel.getData();
		var oNewRow = {
			LineId: oModelData.GrantInitiative.length + 1,
			U_GInitCod: ""
		};
		var iErrorCount = 0;
		for (var i = 0; i <= oModelData.GrantInitiative.length - 1; i++) {
			if (oModelData.GrantInitiative[i].U_GInitCod == "") {
				sap.m.MessageToast.show("Please enter Initiative value");
				iErrorCount = iErrorCount + 1;
				break;
			}
		}
		if (iErrorCount === 0) {
			oModelData.GrantInitiative.push(oNewRow);
			oModel.refresh();
		}

		//var CardCode = this.byId("sId")

	},

	handleAddRpDtRow: function() {

		var oModel = this.oModel;
		var oModelData = oModel.getData();
		var oNewRow = {
			LineId: oModelData.GrantReporting.length + 1,
			U_GrRptDt: ""
		};
		var iErrorCount = 0;
		for (var i = 0; i <= oModelData.GrantReporting.length - 1; i++) {
			if (oModelData.GrantReporting[i].U_GrRptDt == "") {
				sap.m.MessageToast.show("Please enter Reporting Date");
				iErrorCount = iErrorCount + 1;
				break;
			}
		}
		if (iErrorCount === 0) {
			oModelData.GrantReporting.push(oNewRow);
			oModel.refresh();
		}

		//var CardCode = this.byId("sId")

	},

	handleDonorList: function(oEvent) {
		var that = this;
		if (!this.oDonorMasterDialog) {
			this.oDonorMasterDialog = sap.ui.xmlfragment("SLFiori.fragments.DonorMasterV3", this);
		}
		sap.ui.getCore().byId("GrDonorListTable").removeSelections();
		this.oDonorMasterDialog.setModel(this.oModel);
		$.ajax({
			//url: "/b1s/v1/BusinessPartners?$select=CardCode,CardName,ContactPerson,Cellular,EmailAddress&$filter=Valid eq 'Y' and Frozen eq 'N' and CardType eq 'C' &$top=1000&$orderby=CardName",
			url: "OData/GrantContract_BP.xsodata/CardCode",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().DonorList = oData.d.results; //oData.value;
				that.oModel.refresh();
				that.oDonorMasterDialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			}
		});
	},

	handleCustOk: function(oEvent) {
		var oDonorListTable = sap.ui.getCore().byId("GrDonorListTable");
		var oSelectedDonor = oDonorListTable.getSelectedItem();
		if (oSelectedDonor) {
			var oSelctedCustContext = oSelectedDonor.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Donor = this.oModel.getProperty(path);
			this.oModel.setProperty("/DnrCod", Donor.CardCode);
			this.oModel.setProperty("/DnrNam", Donor.CardName);
			this.oModel.setProperty("/DSFDCId", Donor.U_SFDCID);
			//this.oModel.setProperty("/DonorCnt", Donor.CntctPrsn);
			//this.oModel.setProperty("/TelNo", Donor.Cellular);

			this.oModel.refresh();
			sap.ui.getCore().byId("GrDonorListTable").removeSelections();
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
			this.oCostCentersDialog = sap.ui.xmlfragment("SLFiori.fragments.CostCentersV7", this);
		}
		sap.ui.getCore().byId("CostCentersListTable").removeSelections();
		this.oCostCentersDialog.setModel(this.oModel);
		$.ajax({
			//url: "https://172.31.28.160:50000/b1s/v1/BusinessPartners?$select=CardCode,CardName,CntctPrsn,Cellular?$filter=CardType eq 'C'",
			//url: "https://172.31.28.160:50000/b1s/v1/BusinessPartners?$select=CardCode,CardName,ContactPerson,Cellular",
			//url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '1'",
			url: "OData/CostCenter.xsodata/CostCenter?$filter=DMCode eq '1'",
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
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
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
			this.oModel.setProperty("/GrantRevenueDetails/" + this.oDim2RowId + "/U_RevenSub", Dim2.CCCode);
			this.oModel.setProperty("/GrantRevenueDetails/" + this.oDim2RowId + "/U_ReSubNm", Dim2.CCName);
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

	handleAllcDim2: function(oEvent) {
		var that = this;
		if (!this.oDim2AllcDialog) {
			this.oDim2AllcDialog = sap.ui.xmlfragment("SLFiori.fragments.Dim2_AllocationV1", this);
		}
		this.oDim2 = "";
		var oDim2AllcBindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aDim2AllcSelectedPathLength = oDim2AllcBindingContextPath.length;
		var oDim2AllcRowId = aDim2AllcSelectedPathLength - 1;
		this.oDim2AllcRowId = oDim2AllcBindingContextPath[oDim2AllcRowId];

		sap.ui.getCore().byId("Dim2AllcListTable").removeSelections();
		this.oDim2AllcDialog.setModel(this.oModel);
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
				that.oModel.getData().Dim2AllcList = oData.d.results;
				that.oModel.refresh();
				that.oDim2AllcDialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			}
		});
	},

	handleDim2AllcOk: function(oEvent) {
		var oDim2AllcListTable = sap.ui.getCore().byId("Dim2AllcListTable");
		var oSelectedDim2 = oDim2AllcListTable.getSelectedItem();
		//var oItems = this.oModel.getData().GrantRevenueDetails;

		if (oSelectedDim2) {
			var oSelctedCustContext = oSelectedDim2.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Dim2 = this.oModel.getProperty(path);
			this.oModel.setProperty("/GrantRevenueAllocation/" + this.oDim2AllcRowId + "/U_AlcSub", Dim2.CCCode);
			this.oModel.setProperty("/GrantRevenueAllocation/" + this.oDim2AllcRowId + "/U_AlSubNm", Dim2.CCName);

			//this.oModel.setProperty("/GrantRevenueAllocation/" + this.oDim2RowId + "/U_ReSubNm", Dim2.CCName);
			this.oModel.refresh();
			sap.ui.getCore().byId("Dim2AllcListTable").removeSelections();
			this.oDim2AllcDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Dimension");
		}

		//this.oModel.getData().GrantRevenueDetails = oItems;

	},

	handleDim2AllcClose: function(oEvent) {
		this.oDim2AllcDialog.close();
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
		var SubLoc = this.oModel.getProperty(oAmtBindingContextPath + "/U_RevenSub");

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

			this.oModel.setProperty("/GrantRevenueDetails/" + this.oDim3RowId + "/U_RevenLoc", Dim3.CCCode);
			this.oModel.setProperty("/GrantRevenueDetails/" + this.oDim3RowId + "/U_ReLocNm", Dim3.CCName);
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

	handleAllcDim3: function(oEvent) {
		var that = this;
		if (!this.oDim3AllcDialog) {
			this.oDim3AllcDialog = sap.ui.xmlfragment("SLFiori.fragments.Dim3_AllocationV1", this);
		}
		this.oDim3 = "";
		var oDim3AllcBindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aDim3AllcSelectedPathLength = oDim3AllcBindingContextPath.length;
		var oDim3AllcRowId = aDim3AllcSelectedPathLength - 1;
		this.oDim3AllcRowId = oDim3AllcBindingContextPath[oDim3AllcRowId];

		sap.ui.getCore().byId("Dim3AllcListTable").removeSelections();
		this.oDim3AllcDialog.setModel(this.oModel);

		var oAmtBindingContextPath = oEvent.getSource().getBindingContext().sPath;
		//this.oModel.setProperty(oAmtBindingContextPath + "/U_RevenSub", oEvent.oSource.getValue());
		var SubLoc = this.oModel.getProperty(oAmtBindingContextPath + "/U_AlcSub");

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
				that.oModel.getData().Dim3AllcList = oData.d.results;
				that.oModel.refresh();
				that.oDim3AllcDialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			}
		});
	},

	handleDim3AllcOk: function(oEvent) {
		var oDim3AllcListTable = sap.ui.getCore().byId("Dim3AllcListTable");
		var oSelectedDim3 = oDim3AllcListTable.getSelectedItem();
		//var oItems = this.oModel.getData().GrantRevenueDetails;

		if (oSelectedDim3) {
			var oSelctedCustContext = oSelectedDim3.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Dim3 = this.oModel.getProperty(path);
			this.oModel.setProperty("/GrantRevenueAllocation/" + this.oDim3AllcRowId + "/U_AlcLoc", Dim3.CCCode);
			this.oModel.setProperty("/GrantRevenueAllocation/" + this.oDim3AllcRowId + "/U_AlLocNm", Dim3.CCName);
			//this.oModel.setProperty("/GrantRevenueAllocation/" + this.oDim2RowId + "/U_ReSubNm", Dim2.CCName);
			this.oModel.refresh();
			sap.ui.getCore().byId("Dim3AllcListTable").removeSelections();
			this.oDim3AllcDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Dimension");
		}

		//this.oModel.getData().GrantRevenueDetails = oItems;

	},

	handleDim3AllcClose: function(oEvent) {
		this.oDim3AllcDialog.close();
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
		var oDim4ListTable = sap.ui.getCore().byId("Dim4ListTable");
		var oSelectedDim4 = oDim4ListTable.getSelectedItem();
		if (oSelectedDim4) {
			var oSelctedCustContext = oSelectedDim4.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Dim4 = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);
			this.oModel.setProperty("/GrantRevenueDetails/" + this.oDim4RowId + "/U_RevenPgm", Dim4.CCCode);
			this.oModel.setProperty("/GrantRevenueDetails/" + this.oDim4RowId + "/U_RePgmNm", Dim4.CCName);
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
		if (!this.oDim5Dialog) {
			this.oDim5Dialog = sap.ui.xmlfragment("SLFiori.fragments.Dim5", this);
		}
		this.oDim5 = "";
		var oDim5BindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aDim5SelectedPathLength = oDim5BindingContextPath.length;
		var oDim5RowId = aDim5SelectedPathLength - 1;
		this.oDim5RowId = oDim5BindingContextPath[oDim5RowId];

		sap.ui.getCore().byId("Dim5ListTable").removeSelections();
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
		var oDim5ListTable = sap.ui.getCore().byId("Dim5ListTable");
		var oSelectedDim5 = oDim5ListTable.getSelectedItem();
		if (oSelectedDim5) {
			var oSelctedCustContext = oSelectedDim5.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Dim5 = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);
			this.oModel.setProperty("/GrantInitiative/" + this.oDim5RowId + "/U_GInitCod", Dim5.CCCode);
			this.oModel.setProperty("/GrantInitiative/" + this.oDim5RowId + "/U_GrInNM", Dim5.CCName);
			this.oModel.refresh();
			sap.ui.getCore().byId("Dim5ListTable").removeSelections();
			this.oDim5Dialog.close();
		} else {
			sap.m.MessageToast.show("Please select Dimension");
		}

	},

	handleDim5Close: function(oEvent) {
		this.oDim5Dialog.close();
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
			//url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/RevenueType.xsodata/RevenueType",
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
				sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
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

	handlek: function(oEvent) {

		var oItemListTable = sap.ui.getCore().byId("itemListTable");
		var aSelectedItems = oItemListTable.getSelectedItems();
		var oItems = this.oModel.getData().selectedItemList;

		for (var i = 0; i < aSelectedItems.length; i++) {
			var oBindingContextPath = aSelectedItems[i].getBindingContextPath().split("/");
			var aSelectedPathLength = oBindingContextPath.length;
			var oRowId = aSelectedPathLength - 1;
			var iIndex = oBindingContextPath[oRowId];
			oItems.push(this.oModel.getData().itemList[iIndex]);
		}
		//this.oModel.setProperty("selectedItemList", aSelectedItems);
		//this.oModel.setProperty("/selectedItemList/ItemCode", oItems.ItemCode);
		this.oModel.getData().selectedItemList = oItems;
		this.oModel.refresh();
		this.oItemListDialog.close();
	},

	handleAmountLiveChange: function(oEvent) {
		var oAmtBindingContextPath = oEvent.getSource().getBindingContext().sPath;
		this.oModel.setProperty(oAmtBindingContextPath + "/U_Amount", oEvent.oSource.getValue());
		this.oModel.refresh();
		this.onAmountChange(oAmtBindingContextPath);
	},

	onAmountChange: function(oContext) {
		var Price = this.oModel.getProperty(oContext + "/U_Amount");
		var Total = Price;
		var oItems = this.oModel.getData().GrantRevenueDetails;
		var DocTotal = 0;
		for (var i = 0; i < oItems.length; i++) {
			DocTotal = DocTotal + ((oItems[i].U_Amount === "") ? 0 : parseFloat(oItems[i].U_Amount));
		}
		this.oModel.setProperty("/GCAmt", DocTotal);
		this.oModel.refresh();
	},

	handleAllocationLiveChange: function(oEvent) {
		var oAmtBindingContextPath = oEvent.getSource().getBindingContext().sPath;
		this.oModel.setProperty(oAmtBindingContextPath + "/U_Amt", oEvent.oSource.getValue());
		this.oModel.refresh();
		this.onAllocationChange(oAmtBindingContextPath);
	},

	onAllocationChange: function(oContext) {
		var Price = this.oModel.getProperty(oContext + "/U_Amt");
		var oItems = this.oModel.getData().GrantRevenueAllocation;
		var Allocated = 0;
		for (var i = 0; i < oItems.length; i++) {
			Allocated = Allocated + ((oItems[i].U_Amt === "") ? 0 : parseFloat(oItems[i].U_Amt));
		}
		var LineNum = this.oModel.getProperty(oContext + "/U_GRevLNo") - 1;
		var oGrRevDet = this.oModel.getData().GrantRevenueDetails;
		var AllcAmt = 0;
		AllcAmt = AllcAmt + ((oGrRevDet[LineNum].U_Amount === "") ? 0 : parseFloat(oGrRevDet[LineNum].U_Amount));

		if (Allocated > AllcAmt) {
			sap.m.MessageToast.show("Allocated amount is greater than the Grant Amount,please check..");
		}
	},

	onSearch: function(oEvt) {
		var list = sap.ui.getCore().byId("GrDonorListTable"); //this.getView().byId("idList");
		var oBinding = list.getBinding("items");
		// add filter for search
		var aFilters = [];
		var sQuery = oEvt.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("CardName", sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}
		oBinding.filter(aFilters);
	},

	onDim1Search: function(oEvt) {
		var list = sap.ui.getCore().byId("CostCentersListTable"); //this.getView().byId("idList");
		var oBinding = list.getBinding("items");
		// add filter for search
		var aFilters = [];
		var sQuery = oEvt.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("CCName", sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}
		oBinding.filter(aFilters);
	},

	onDim2Search: function(oEvt) {
		var list = sap.ui.getCore().byId("Dim2ListTable"); //this.getView().byId("idList");
		var oBinding = list.getBinding("items");
		// add filter for search
		var aFilters = [];
		var sQuery = oEvt.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("CCName", sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}
		oBinding.filter(aFilters);
	},

	onDim3Search: function(oEvt) {
		var list = sap.ui.getCore().byId("Dim3ListTable"); //this.getView().byId("idList");
		var oBinding = list.getBinding("items");
		// add filter for search
		var aFilters = [];
		var sQuery = oEvt.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("CCName", sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}
		oBinding.filter(aFilters);
	},

	onDim4Search: function(oEvt) {
		var list = sap.ui.getCore().byId("Dim4ListTable"); //this.getView().byId("idList");
		var oBinding = list.getBinding("items");
		// add filter for search
		var aFilters = [];
		var sQuery = oEvt.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("CCName", sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}
		oBinding.filter(aFilters);
	},

	onDim5Search: function(oEvt) {
		var list = sap.ui.getCore().byId("Dim5ListTable"); //this.getView().byId("idList");
		var oBinding = list.getBinding("items");
		// add filter for search
		var aFilters = [];
		var sQuery = oEvt.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("CCName", sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}
		oBinding.filter(aFilters);
	},

	onRevTypeSearch: function(oEvt) {
		var list = sap.ui.getCore().byId("RevTypeListTable"); //this.getView().byId("idList");
		var oBinding = list.getBinding("items");
		// add filter for search
		var aFilters = [];
		var sQuery = oEvt.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("U_RevTyp", sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(filter);
		}
		oBinding.filter(aFilters);
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

	onGrantListSearch: function(oEvt) {
		var list = sap.ui.getCore().byId("GetGrantTableSave"); //this.getView().byId("idList");
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

	onGrantListSearch_Back: function(oEvt) {
		var list = sap.ui.getCore().byId("GetGrantTableBack"); //this.getView().byId("idList");
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
	
	onGrantListSearch_Save: function(oEvt) {
		var list = sap.ui.getCore().byId("GetGrantTableSave"); //this.getView().byId("idList");
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

	/**/

});