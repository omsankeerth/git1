sap.ui.controller("SLFiori.view.DonorMaster", {

	onInit: function() {
		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);

		this.NewEntry = {
			EntrySaveToUpdate: "No",
			FormMode: "Add",
			CardCode: "",
			U_SFDC: "",
			CardName: "",
			U_SubCd: "",
			E_Mail: "",
			Phone1: "",
			Organisation: "",
			GroupCode: "",
			GroupName: "",
			U_RCAct: "",
			FTaxID: "",
			U_LTOffNo: "",
			U_VATCode: "",
			U_UKStart: "",
			U_UKEnd: "",
			Currency: "##",
			Valid: "",
			U_IKUPSAP: "N",

			ContactPersons: [

		                               ],

			Address: [

		                               ],
			Countries: []
		};

		this.list = {
			EntrySaveToUpdate: "No",
			FormMode: "Update",
			CardCode: "",
			U_SFDC: "",
			CardName: "",
			U_SubCd: "",
			E_Mail: "",
			Phone1: "",
			Organisation: "",
			GroupCode: "",
			GroupName: "",
			U_RCAct: "",
			FTaxID: "",
			U_LTOffNo: "",
			U_VATCode: "",
			U_UKStart: "",
			U_UKEnd: "",
			Currency: "##",
			Valid: "",
			U_IKUPSAP: "N",
			ContactPersons: [

		                               ],

			Address: [

		                               ],
			Countries: []
			//{key: "Yes",value: "Yes"}, {key: "No", value: "No"}
		};

		this.oModel = new sap.ui.model.json.JSONModel(this.list);
		this.getView().setModel(this.oModel);
	},

	handleSaveDonorOCRD: function() {

		var oModelData = this.oModel.getData();

		var jData = JSON.stringify({
			CardCode: oModelData.CardCode,
			CardName: oModelData.CardName,
			EmailAddress: oModelData.E_Mail,
			Phone1: oModelData.Phone1,
			CardForeignName: oModelData.Organisation,
			FederalTaxID: oModelData.FTaxID,
			GroupCode: oModelData.GroupCode,
			Currency: "##",
			CardType: "C",
			Valid: "Y",
			ValidFrom: "20170101",
			U_IKUPSAP: "N",
			//U_BPUpded : "N",
			"ContactEmployees": oModelData.ContactPersons,
			"BPAddresses": oModelData.Address
		});
		if (oModelData.GCFrom === "") {
			sap.m.MessageToast.show("Please enter Grant from date");
		} else {
			if (oModelData.FormMode !== "Add") {
				$.ajax({
					//url: "https://10.0.1.189:50000/b1s/v1/BusinessPartners('"+oModelData.CardCode+"')",
					url: "/b1s/v1/BusinessPartners('" + oModelData.CardCode + "')",
					xhrFields: {
						withCredentials: true
					},
					data: jData,
					type: "PATCH",
					dataType: "json",
					beforeSend: function(xhr) {
						xhr.setRequestHeader("B1S-ReplaceCollectionsOnPatch", "true");
					},
					success: function(json) {
						sap.m.MessageToast.show("Business Partner Updated Sucessfully");

						// 	var TargetDBSession = "";
						// 	//Login to SO DataBase
						// 	var jDataLogin = JSON.stringify({
						// 		UserName: "manager",
						// 		Password: "A123",
						// 		CompanyDB: "UK"
						// 	});
						// 	$.ajax({
						// 		url: "/b1s/v1/Login",
						// 		xhrFields: {
						// 			withCredentials: true
						// 		},
						// 		data: jDataLogin,
						// 		type: "POST",
						// 		dataType: "json",
						// 		success: function(json) {
						// 			//console.log("Logged in Succesfully-UK");
						// 			sap.m.MessageToast.show("Logged in Succesfully-UK");
						// 			TargetDBSession = json.SessionId;

						// 			//BP Master Updating in Subsidary DB
						// 			$.ajax({
						// 				//url: "https://10.0.1.189:50000/b1s/v1/BusinessPartners('"+oModelData.CardCode+"')",
						// 				url: "/b1s/v1/BusinessPartners('" + oModelData.CardCode + "')",
						// 				xhrFields: {
						// 					withCredentials: true
						// 				},
						// 				beforeSend: function(xhr) {
						// 					xhr.setRequestHeader("B1SESSION", TargetDBSession);
						// 				},

						// 				data: jData,
						// 				type: "PATCH",
						// 				dataType: "json",
						// 				success: function(json) {
						// 					sap.m.MessageToast.show("Business Partner Updated Sucessfully-Subsidary");
						// 					//console.log("Business Partner Updated Sucessfully");
						// 				},
						// 				error: function(xhr, status, errorThrown) {
						// 					//sap.m.MessageToast.show("Error: " + errorThrown);
						// 					sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
						// 				},
						// 				complete: function(xhr, status) {}
						// 			});
						// 			//BP Master Subsidary Posting 

						// 			//Logout from BP Master Subsidary	      
						// 			//var jDataLogout =  JSON.stringify({UserName: "manager", Password: "A123", CompanyDB: "UK"});	
						// 			//         $.ajax({
						// 			//      url: "/b1s/v1/Logout",
						// 			//             xhrFields: {
						// 			//                 withCredentials: true
						// 			//             },
						// 			//             beforeSend: function(xhr) {
						// 			//         		    xhr.setRequestHeader("B1SESSION",TargetDBSession);
						// 			//         		},
						// 			//      //data: jDataLogin,
						// 			//      type: "POST",
						// 			//      dataType : "json",
						// 			//      success: function( json ) {
						// 			//             //console.log("Logged out Succesfully");
						// 			//             sap.m.MessageToast.show("Logged out Succesfully");
						// 			//      },
						// 			//      error: function( xhr, status, errorThrown ) {
						// 			//   sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
						// 			//      },
						// 			//      complete: function( xhr, status ) {
						// 			//      }
						// 			//         });
						// 			//LogOut from BP Master Subsidary// 

						// 		},
						// 		error: function(xhr, status, errorThrown) {
						// 			sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
						// 		},
						// 		complete: function(xhr, status) {}
						// 	});
						// 	//Login to SO DataBase//

					},
					error: function(xhr, status, errorThrown) {
						//sap.m.MessageToast.show("Error: " + errorThrown);
						sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
					},
					complete: function(xhr, status) {}
				});
				//Updating of BP's Processed//

			} else {
				$.ajax({
					//url: "https://10.0.1.189:50000/b1s/v1/BusinessPartners",
					url: "/b1s/v1/BusinessPartners",
					xhrFields: {
						withCredentials: true
					},
					data: jData,
					type: "POST",
					dataType: "json",
					success: function(json) {
						sap.m.MessageToast.show("Business Partner Added Sucessfully");
					},
					error: function(xhr, status, errorThrown) {
						sap.m.MessageToast.show("Error: " + errorThrown);
					},
					complete: function(xhr, status) {}
				});
			}
		}
	},

	handleSaveDonor: function() {

		var oModelData = this.oModel.getData();
		
		var that = this;

		var jData = JSON.stringify({
			Code: oModelData.CardCode,
			Name: oModelData.CardName,
			U_IKSFDC: oModelData.U_SFDC,

			U_IKEMAIL: oModelData.E_Mail,
			U_IKPHNO: oModelData.Phone1,
			U_IKORG: oModelData.Organisation,
			U_IKTAXID: oModelData.FTaxID,
			U_IKCAT: oModelData.GroupCode,

			U_IKTAXNO: oModelData.U_LTOffNo,
			U_IKVAT: oModelData.U_LTOffNo,
			U_IKUKST: oModelData.U_UKStart,
			U_IKUKEND: oModelData.U_UKEnd,

			U_IKUPSAP: "N",
			//IKCURR: "##",
			//CardType: "C",
			//Valid: "Y",
			//ValidFrom: "20170101",
			//U_BPUpded : "N",
			"IK_DNR_MST_D0Collection": oModelData.ContactPersons,
			"IK_DNR_MST_D1Collection": oModelData.Address
		});

        if (oModelData.GroupName === "") {
			this.getView().byId("GroupName").setValueState("Error");
		}  else if (oModelData.CardCode === "") {
		    this.getView().byId("CardCode").setValueState("Error");
		    }else {
		    if (oModelData.FormMode !== "Add") {
			$.ajax({
				//url: "https://10.0.1.189:50000/b1s/v1/BusinessPartners('"+oModelData.CardCode+"')",
				url: "/b1s/v1/IK_DNR_MST('" + oModelData.CardCode + "')",
				xhrFields: {
					withCredentials: true
				},
				data: jData,
				type: "PATCH",
				dataType: "json",
				beforeSend: function(xhr) {
					xhr.setRequestHeader("B1S-ReplaceCollectionsOnPatch", "true");
				},
				// success: function(json) {
				// 	sap.m.MessageToast.show("Business Partner Updated Sucessfully");

				// 	// 	var TargetDBSession = "";
				// 	// 	//Login to SO DataBase
				// 	// 	var jDataLogin = JSON.stringify({
				// 	// 		UserName: "manager",
				// 	// 		Password: "A123",
				// 	// 		CompanyDB: "UK"
				// 	// 	});
				// 	// 	$.ajax({
				// 	// 		url: "/b1s/v1/Login",
				// 	// 		xhrFields: {
				// 	// 			withCredentials: true
				// 	// 		},
				// 	// 		data: jDataLogin,
				// 	// 		type: "POST",
				// 	// 		dataType: "json",
				// 	// 		success: function(json) {
				// 	// 			//console.log("Logged in Succesfully-UK");
				// 	// 			sap.m.MessageToast.show("Logged in Succesfully-UK");
				// 	// 			TargetDBSession = json.SessionId;

				// 	// 			//BP Master Updating in Subsidary DB
				// 	// 			$.ajax({
				// 	// 				//url: "https://10.0.1.189:50000/b1s/v1/BusinessPartners('"+oModelData.CardCode+"')",
				// 	// 				url: "/b1s/v1/BusinessPartners('" + oModelData.CardCode + "')",
				// 	// 				xhrFields: {
				// 	// 					withCredentials: true
				// 	// 				},
				// 	// 				beforeSend: function(xhr) {
				// 	// 					xhr.setRequestHeader("B1SESSION", TargetDBSession);
				// 	// 				},

				// 	// 				data: jData,
				// 	// 				type: "PATCH",
				// 	// 				dataType: "json",
				// 	// 				success: function(json) {
				// 	// 					sap.m.MessageToast.show("Business Partner Updated Sucessfully-Subsidary");
				// 	// 					//console.log("Business Partner Updated Sucessfully");
				// 	// 				},
				// 	// 				error: function(xhr, status, errorThrown) {
				// 	// 					//sap.m.MessageToast.show("Error: " + errorThrown);
				// 	// 					sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
				// 	// 				},
				// 	// 				complete: function(xhr, status) {}
				// 	// 			});
				// 	// 			//BP Master Subsidary Posting 

				// 	// 			//Logout from BP Master Subsidary	      
				// 	// 			//var jDataLogout =  JSON.stringify({UserName: "manager", Password: "A123", CompanyDB: "UK"});	
				// 	// 			//         $.ajax({
				// 	// 			//      url: "/b1s/v1/Logout",
				// 	// 			//             xhrFields: {
				// 	// 			//                 withCredentials: true
				// 	// 			//             },
				// 	// 			//             beforeSend: function(xhr) {
				// 	// 			//         		    xhr.setRequestHeader("B1SESSION",TargetDBSession);
				// 	// 			//         		},
				// 	// 			//      //data: jDataLogin,
				// 	// 			//      type: "POST",
				// 	// 			//      dataType : "json",
				// 	// 			//      success: function( json ) {
				// 	// 			//             //console.log("Logged out Succesfully");
				// 	// 			//             sap.m.MessageToast.show("Logged out Succesfully");
				// 	// 			//      },
				// 	// 			//      error: function( xhr, status, errorThrown ) {
				// 	// 			//   sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
				// 	// 			//      },
				// 	// 			//      complete: function( xhr, status ) {
				// 	// 			//      }
				// 	// 			//         });
				// 	// 			//LogOut from BP Master Subsidary// 

				// 	// 		},
				// 	// 		error: function(xhr, status, errorThrown) {
				// 	// 			sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
				// 	// 		},
				// 	// 		complete: function(xhr, status) {}
				// 	// 	});
				// 	// 	//Login to SO DataBase//

				// },
				success: this.handlelistSave1(),
				error: function(xhr, status, errorThrown) {
					//sap.m.MessageToast.show("Error: " + errorThrown);
					sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
				},
				complete: function(xhr, status) {}
			});
			//Updating of BP's Processed//

		    } else {
			$.ajax({
				//url: "https://10.0.1.189:50000/b1s/v1/BusinessPartners",
				url: "/b1s/v1/IK_DNR_MST",
				xhrFields: {
					withCredentials: true
				},
				data: jData,
				type: "POST",
				dataType: "json",
				success: function(json) {
				    that.router.navTo("Dashboard");
					sap.m.MessageToast.show("Business Partner Added Sucessfully");
				},
				error: function(xhr, status, errorThrown) {
					sap.m.MessageToast.show("Error: " + errorThrown);
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
	},

	handleCustOk_Save: function(oEvent) {
		var that = this;
		var oDonorListTable = sap.ui.getCore().byId("DonorListTableSave");
		var oSelectedGrant = oDonorListTable.getSelectedItem();

		if (oSelectedGrant) {
			var oSelctedCustContext = oSelectedGrant.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var DonorCode = this.oModel.getProperty(path);
			this.oCustomerMasterDialog.close();
			that.router.navTo("DonorMaster", {
				Key: DonorCode.Code
			});
		} else {
			sap.m.MessageToast.show("Please select Donor");
		}
	},

	handleCustClose_Save: function() {
		sap.ui.getCore().byId("DonorListTableSave").removeSelections();
		this.oCustomerMasterDialog.close();
	},

	handlelistSave1: function(oEvent) {
		var oModelData = this.oModel.getData();
		oModelData.EntrySaveToUpdate = "Yes";
		//sap.m.MessageToast.show("");

	},

	handlelistSave: function(oEvent) {
		var that = this;
		that.router.navTo("Dashboard");
		if (!this.oCustomerMasterDialog) {
			//			this.oCustomerMasterDialog = sap.ui.xmlfragment("SLFiori.fragments.CustomerMaster",this);
			this.oCustomerMasterDialog = sap.ui.xmlfragment("SLFiori.fragments.masters.donorMaster.donorlist_display_save", this);
		}
		//sap.ui.getCore().byId("DonorListTableSave").removeSelections();
		this.oCustomerMasterDialog.setModel(this.oModel);
		$.ajax({

			//url: "/b1s/v1/BusinessPartners?$select=CardCode,CardName,ContactPerson,Cellular,EmailAddress&$filter=Valid eq 'Y' and Frozen eq 'N' and CardType eq 'C' &$top=1000 &$orderby=CardName",
			url: "OData/masters/donormaster/list_Display.xsodata/Code",

			xhrFields: {
				withCredentials: false
			},
			// 			beforeSend: function(xhr) {
			// 				xhr.setRequestHeader("B1SESSION", SessionID);
			// 			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().DonorList = oData.d.results; //oData.value;
				that.oModel.refresh();
				//Commented on 08-08-2017
				//that.oCustomerMasterDialog.open();
				sap.m.MessageToast.show("Donor Master updated successfully");

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
		return;
	},

	handleAddNewDonor: function() {
		this.oModel = new sap.ui.model.json.JSONModel(this.NewEntry);
		this.getView().setModel(this.oModel);
	},

	_handleRouteMatchedOld: function(data) {
		this.BPCode = data.mParameters.arguments.Key;
		//this.SessionID = data.mParameters.arguments.Session;

		if (this.BPCode === "0") {
			this.oModel = new sap.ui.model.json.JSONModel(this.NewEntry);
			this.getView().setModel(this.oModel);
		} else {
			var oParameter = data.getParameter("name");
			if (oParameter !== "DonorMaster") {
				return;
			}
			var oModelData = this.oModel.getData();
			var that = this;
			$.ajax({
				//url: "/b1s/v1/BusinessPartners('" + this.BPCode + "')",
				url: "OData/masters/donormaster/donorlist_header.xsodata/CardCode?$filter=CardCode eq '" + this.BPCode + "'",
				xhrFields: {
					withCredentials: true
				},
				async: false,
				type: "GET",
				dataType: "json",
				success: function(oData, oResponse) {

					that.oModel.setProperty("/FormMode", "Update");
					that.oModel.setProperty("/CardCode", oData.d.results[0].CardCode);
					//that.oModel.setProperty("/U_SFDC", oData.U_SFDC);
					that.oModel.setProperty("/CardName", oData.d.results[0].CardName);
					that.oModel.setProperty("/E_Mail", oData.d.results[0].E_Mail);
					that.oModel.setProperty("/Phone1", oData.d.results[0].Cellular);
					that.oModel.setProperty("/Organisation", oData.d.results[0].CardFName);
					that.oModel.setProperty("/GroupCode", oData.d.results[0].GroupCode);
					//that.oModel.setProperty("/GCrDate", oData.d.results[0].U_GCrDate);
					that.oModel.setProperty("/FTaxID", oData.d.results[0].LicTradNum);
					//that.oModel.setProperty("/U_LTOffNo", oData.d.results[0].U_LTOffNo);
					//that.oModel.setProperty("/U_VATCode", oData.d.results[0].U_VATCode);
					//that.oModel.setProperty("/U_UKStart", oData.d.results[0].U_UKStart);
					//that.oModel.setProperty("/U_UKEnd", oData.d.results[0].U_UKEnd);
					that.oModel.setProperty("/Currency", oData.d.results[0].Currency);

					//that.oModel.getData().Address = oData.BPAddresses;
					//that.oModel.getData().ContactPersons = oData.ContactEmployees;

					that.oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError);
				}
			});

			var oModelData = this.oModel.getData();
			$.ajax({
				//url: "/b1s/v1/BusinessPartners('" + this.BPCode + "')", + this.GroupCode + 

				// 	url: "/b1s/v1/BusinessPartnerGroups(" + oModelData.GroupCode + ")?$select=Name",
				// 	 xhrFields: {
				//           withCredentials: true
				//       },
				//       async: false,
				// 	type: "GET",
				// 	dataType : "json",
				// 	success: function( oData, oResponse) {
				// 	that.oModel.setProperty("/GroupName", oData.Name);
				//       that.oModel.refresh();
				// 	},
				url: "OData/masters/donormaster/donorlist_cntpersons.xsodata/CardCode?$filter=CardCode eq '" + this.BPCode + "'",
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
						delete oResults[i].COL;
					}
					that.oModel.getData().ContactPersons = oResults;
					that.oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError);
				}
			});

			var oModelData = this.oModel.getData();
			$.ajax({
				url: "OData/masters/donormaster/donorlist_address.xsodata/AddressName?$filter=BPCode eq '" + this.BPCode + "'",
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
						delete oResults[i].COL;
					}
					that.oModel.getData().Address = oResults;
					that.oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError);
				}
			});
		}
	},

	_handleRouteMatched: function(data) {
		this.BPCode = data.mParameters.arguments.Key;
        this.getView().byId("GroupName").setValueState("None");
        this.getView().byId("CardCode").setValueState("None");
        
		if (this.BPCode === "0") {
			//var oPanel = this.getView().byId("_HBox");
			//oPanel.setBusy(true);
			this.byId("CardCode").setEnabled(true);
			
			this.NewEntry = {
			EntrySaveToUpdate: "No",
			FormMode: "Add",
			CardCode: "",
			U_SFDC: "",
			CardName: "",
			U_SubCd: "",
			E_Mail: "",
			Phone1: "",
			Organisation: "",
			GroupCode: "",
			GroupName: "",
			U_RCAct: "",
			FTaxID: "",
			U_LTOffNo: "",
			U_VATCode: "",
			U_UKStart: "",
			U_UKEnd: "",
			Currency: "##",
			Valid: "",
			U_IKUPSAP: "N",

			ContactPersons: [

		                               ],

			Address: [

		                               ],
			Countries: []
		};

			this.oModel = new sap.ui.model.json.JSONModel(this.NewEntry);
			this.getView().setModel(this.oModel);

			//oPanel.setBusy(false);
		} else {
			this.oModel = new sap.ui.model.json.JSONModel(this.list);
			this.getView().setModel(this.oModel);

			var oParameter = data.getParameter("name");
			if (oParameter !== "DonorMaster") {
				return;
			}
			var oModelData = this.oModel.getData();
			var that = this;
			this.byId("CardCode").setEnabled(false);

			$.ajax({
				url: "OData/masters/donormaster/donorlist_header.xsodata/CardCode?$filter=Code eq '" + this.BPCode + "'",
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
					that.oModel.setProperty("/FormMode", "Update");
					that.oModel.setProperty("/CardCode", oData.d.results[0].Code);
					that.oModel.setProperty("/U_SFDC", oData.d.results[0].U_IKSFDC);
					that.oModel.setProperty("/CardName", oData.d.results[0].Name);
					that.oModel.setProperty("/E_Mail", oData.d.results[0].U_IKEMAIL);
					that.oModel.setProperty("/Phone1", oData.d.results[0].U_IKPHNO);
					that.oModel.setProperty("/Organisation", oData.d.results[0].U_IKORG);
					that.oModel.setProperty("/GroupCode", oData.d.results[0].U_IKCAT);
					that.oModel.setProperty("/GroupName", oData.d.results[0].GroupName);
					that.oModel.setProperty("/FTaxID", oData.d.results[0].U_IKTAXID);
					that.oModel.setProperty("/U_LTOffNo", oData.d.results[0].U_IKTAXNO);
					that.oModel.setProperty("/U_VATCode", oData.d.results[0].U_IKVAT);
					that.oModel.setProperty("/U_UKStart", oData.d.results[0].U_IKUKST);
					that.oModel.setProperty("/U_UKEnd", oData.d.results[0].U_IKUKEND);
					//that.oModel.setProperty("/Currency", oData.d.results[0].Currency);

					that.oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
					//var data = JSON.parse(xhr.responseText);
					//window.alert(data['msg']);
				}
			});

			$.ajax({
				// 			url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/GrantContract_RevenueDetails.xsodata/GrantContract?$filter=DocEntry eq '" +
				// 				this.GrantEntry + "'&$orderby=LineId asc",
				url: "OData/masters/donormaster/donorlist_cntpersons.xsodata/Code?$filter=Code eq '" + this.BPCode + "'",
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
						delete oResults[i].COL;
						delete oResults[i].Code;
					}
					that.oModel.getData().ContactPersons = oResults;
					that.oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				}
			});

			$.ajax({
				// 			url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/GrantContract_RevenueAllocation.xsodata/GrantContract?$filter=DocEntry eq '" +
				// 				this.GrantEntry + "'&$orderby=LineId asc",
				url: "OData/masters/donormaster/donorlist_address.xsodata/U_IKADDID?$filter=Code eq '" + this.BPCode + "'",
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
						delete oResults[i].COL;
						delete oResults[i].Code;
					}
					that.oModel.getData().Address = oResults;
					that.oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
				}
			});

		}
	},

	onAfterRendering: function() {
		//this.byId("idProductsTable").setWidths(["30%", "70%"]);
	},

	onBack: function() {
		var that = this;
		if (!this.oCustomerMasterDialog) {
			//			this.oCustomerMasterDialog = sap.ui.xmlfragment("SLFiori.fragments.CustomerMaster",this);
			this.oCustomerMasterDialog = sap.ui.xmlfragment("SLFiori.fragments.masters.donorMaster.donorlist_display_back", this);
		}
		//sap.ui.getCore().byId("DonorListTableBack").removeSelections();
		this.oCustomerMasterDialog.setModel(this.oModel);
		$.ajax({

			//url: "/b1s/v1/BusinessPartners?$select=CardCode,CardName,ContactPerson,Cellular,EmailAddress&$filter=Valid eq 'Y' and Frozen eq 'N' and CardType eq 'C' &$top=1000 &$orderby=CardName",
			url: "OData/masters/donormaster/list_Display.xsodata/Code",

			xhrFields: {
				withCredentials: false
			},
			// 			beforeSend: function(xhr) {
			// 				xhr.setRequestHeader("B1SESSION", SessionID);
			// 			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().DonorList = oData.d.results; //oData.value;
				that.oModel.refresh();
				that.oCustomerMasterDialog.open();
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

	handlegoBack: function() {
		var that = this;
		that.router.navTo("Dashboard");
	},

	handleCustOk_Back: function(oEvent) {
		//this.oCustomerMasterDialog.close();
		//this.router.navTo("DonorMaster");

		var that = this;
		var oDonorListTable = sap.ui.getCore().byId("DonorListTableBack");
		var oSelectedGrant = oDonorListTable.getSelectedItem();
		//var oSelectedGrant = oDonorListTable;
		if (oSelectedGrant) {
			var oSelctedCustContext = oSelectedGrant.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var DonorCode = this.oModel.getProperty(path);
			this.oCustomerMasterDialog.close();
			that.router.navTo("DonorMaster", {
				Key: DonorCode.Code
			});
		} else {
			//this.oCustomerMasterDialog.close();
			//that.router.navTo("DonorMaster",{Key:1});
			sap.m.MessageToast.show("Please select Donor");
		}
	},

	handleCustClose_Back: function() {
		sap.ui.getCore().byId("DonorListTableBack").removeSelections();
		this.oCustomerMasterDialog.close();
	},

	handleAddCntPerRowOld: function() {
		var oModel = this.oModel;
		var oModelData = oModel.getData();
		var oNewRow = {
			Name: "",
			FirstName: "",
			MiddleName: "",
			LastName: "",
			MobilePhone: "",
			E_Mail: "",
			Remarks1: ""
		};
		var iErrorCount = 0;
		for (var i = 0; i <= oModelData.ContactPersons.length - 1; i++) {
			if (oModelData.ContactPersons[i].Name == "") {
				sap.m.MessageToast.show("Please enter Contact Person ID");
				iErrorCount = iErrorCount + 1;
				break;
			}
		}
		if (iErrorCount === 0) {
			oModelData.ContactPersons.push(oNewRow);
			oModel.refresh();
		}
	},

	handleAddAddressRowOld: function() {
		var oModel = this.oModel;
		var oModelData = oModel.getData();
		var oNewRow = {
			AddressName: "",
			StreetNo: "",
			Street: "",
			Block: "",
			City: "",
			State: "",
			County: "",
			ZipCode: "",
			Country: ""
		};
		var iErrorCount = 0;
		for (var i = 0; i <= oModelData.Address.length - 1; i++) {
			if (oModelData.Address[i].AddressName == "") {
				sap.m.MessageToast.show("Please enter Address ID");
				iErrorCount = iErrorCount + 1;
				break;
			}
		}
		if (iErrorCount === 0) {
			oModelData.Address.push(oNewRow);
			oModel.refresh();
		}
	},

	handleAddCntPerRow: function() {
		var oModel = this.oModel;
		var oModelData = oModel.getData();
		var oNewRow = {
			LineId: oModelData.ContactPersons.length + 1,
			U_IKCNTPER: "",
			U_IKFRNM: "",
			U_IKMDNM: "",
			U_IKLSNM: "",
			U_IKTELNO: "",
			U_IKEMAIL: "",
			U_IKRMKS: ""
		};
		var iErrorCount = 0;
		for (var i = 0; i <= oModelData.ContactPersons.length - 1; i++) {
			if (oModelData.ContactPersons[i].Name == "") {
				sap.m.MessageToast.show("Please enter Contact Person ID");
				iErrorCount = iErrorCount + 1;
				break;
			}
		}
		if (iErrorCount === 0) {
			oModelData.ContactPersons.push(oNewRow);
			oModel.refresh();
		}
	},

	handleAddAddressRow: function() {
		var oModel = this.oModel;
		var oModelData = oModel.getData();
		var oNewRow = {
			LineId: oModelData.Address.length + 1,
			U_IKADDID: "",
			U_IKSTNO: "",
			U_IKSTRT: "",
			U_IKBLCK: "",
			U_IKCITY: "",
			//State: "",
			U_IKPROV: "",
			U_IKZIP: "",
			U_IKCNTRY: ""
		};
		var iErrorCount = 0;
		for (var i = 0; i <= oModelData.Address.length - 1; i++) {
			if (oModelData.Address[i].AddressName == "") {
				sap.m.MessageToast.show("Please enter Address ID");
				iErrorCount = iErrorCount + 1;
				break;
			}
		}
		if (iErrorCount === 0) {
			oModelData.Address.push(oNewRow);
			oModel.refresh();
		}
	},

	handleDonorList: function(oEvent) {
		var that = this;
		if (!this.oDonorMasterDialog) {
			this.oDonorMasterDialog = sap.ui.xmlfragment("SLFiori.fragments.DonorMaster", this);
		}
		sap.ui.getCore().byId("DonorListTable").removeSelections();
		this.oDonorMasterDialog.setModel(this.oModel);
		$.ajax({
			//url: "https://10.0.1.189:50000/b1s/v1/BusinessPartners?$select=CardCode,CardName,ContactPerson,Cellular,EmailAddress&$filter=Valid eq 'Y' and Frozen eq 'N' and CardType eq 'C' &$top=1000 &$orderby=CardName",
			url: "/b1s/v1/BusinessPartners?$select=CardCode,CardName,ContactPerson,Cellular,EmailAddress&$filter=Valid eq 'Y' and Frozen eq 'N' and CardType eq 'C' &$top=1000 &$orderby=CardName",
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

	handleGroupList: function(oEvent) {
		var that = this;
		if (!this.oGroupDialog) {
			this.oGroupDialog = sap.ui.xmlfragment("SLFiori.fragments.GroupMasterV2", this);
		}
		sap.ui.getCore().byId("GroupListTable").removeSelections();
		this.oGroupDialog.setModel(this.oModel);
		$.ajax({
			//url: "https://10.0.1.189:50000/b1s/v1/BusinessPartnerGroups?$select=Code,Name",
			url: "/b1s/v1/BusinessPartnerGroups?$select=Code,Name &$filter=Type eq 'bbpgt_CustomerGroup'",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().GroupMaster = oData.value;
				that.oModel.refresh();
				that.oGroupDialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError);
			}
		});
	},

	handleGroupOk: function(oEvent) {
		var oGroupListTable = sap.ui.getCore().byId("GroupListTable");
		var oSelectedGroup = oGroupListTable.getSelectedItem();
		if (oSelectedGroup) {
			var oSelctedCustContext = oSelectedGroup.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var Donor = this.oModel.getProperty(path);
			this.oModel.setProperty("/GroupName", Donor.Name);
			this.oModel.setProperty("/GroupCode", Donor.Code);
			//this.oModel.setProperty("/TelNo", Donor.Cellular);

			this.oModel.refresh();
			sap.ui.getCore().byId("GroupListTable").removeSelections();
			this.oGroupDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Group");
		}
	},

	handleGroupClose: function() {
		sap.ui.getCore().byId("GroupListTable").removeSelections();
		this.oGroupDialog.close();
	},

	handleCountryList: function(oEvent) {
		var that = this;
		if (!this.oCountryDialog) {
			this.oCountryDialog = sap.ui.xmlfragment("SLFiori.fragments.Countries", this);
		}
		this.oCountries = "";
		var oCountriesBindingContextPath = oEvent.getSource().getBindingContext().sPath.split("/");
		var aCountriesSelectedPathLength = oCountriesBindingContextPath.length;
		var oCountriesRowId = aCountriesSelectedPathLength - 1;
		this.oCountriesRowId = oCountriesBindingContextPath[oCountriesRowId];

		sap.ui.getCore().byId("CountryListTable").removeSelections();
		this.oCountryDialog.setModel(this.oModel);
		$.ajax({
			//url: "https://10.0.1.189:50000/b1s/v1/Countries?$select=Code,Name",
			url: "/b1s/v1/Countries?$select=Code,Name",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				var aItemsData = oData.value;
				for (var m = 0; m < aItemsData.length; m++) {
					aItemsData[m].Amount = "0";
				}
				that.oModel.getData().Countries = oData.Value;
				that.oModel.refresh();
				that.oCountryDialog.open();
			},
			error: function(oError) {
				sap.m.MessageToast.show("Error: " + oError);
			}
		});
	},

	handleCountryOk: function(oEvent) {
		var oCountryListTable = sap.ui.getCore().byId("CountryListTable");
		var oSelectedRevType = oCountryListTable.getSelectedItem();
		if (oSelectedRevType) {
			var oSelctedCustContext = oSelectedRevType.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var RevType = this.oModel.getProperty(path);
			//this.oModel.setProperty("/TaxCode", Tax.Code);
			this.oModel.setProperty("/ContactPersons/" + this.oRevTypeRowId + "/U_RevenTyp", RevType.Name);
			this.oModel.refresh();
			sap.ui.getCore().byId("CountryListTable").removeSelections();
			this.oRevTypeDialog.close();
		} else {
			sap.m.MessageToast.show("Please select Country");
		}

	},

	handleCountryClose: function(oEvent) {
		this.oCountryDialog.close();
	},

	onGroupSearch: function(oEvt) {
		var list = sap.ui.getCore().byId("GroupListTable"); //this.getView().byId("idList");
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

	onSearchSave: function(oEvt) {
		var list = sap.ui.getCore().byId("DonorListTableSave"); //this.getView().byId("idList");
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

	onSearchBack: function(oEvt) {
		var list = sap.ui.getCore().byId("DonorListTableBack"); //this.getView().byId("idList");
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