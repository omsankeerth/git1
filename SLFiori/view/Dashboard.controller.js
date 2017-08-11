var SessionID = "";

sap.ui.controller("SLFiori.view.Dashboard", {

	onInit: function() {

		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
		

		var head = document.getElementsByTagName('head')[0];
		var link = document.createElement('link');
		link.rel = "stylesheet";
		head.appendChild(link);

		this.list = {

			CustomerList: [

                                       ],

			ListData: [
				{
					listName: "Grant Code"
				},
				{
					listName: "Parent Program"
				},
				{
					listName: "Program Master"
				},
				{
					listName: "Grant Initiative"
				},
				{
					listName: "Donor Master"
				}
                  ],

			TransactionsData: [
                            	//{listName:"Grant Master Request"},
				{
					listName: "Grant Contract"
				},
				{
					listName: "Grant Allocation"
				},
				{
					listName: "Grant Freezing"
				},
				{
					listName: "Cash Request"
				},
				{
					listName: "Grant Freezing Period"
				},
				{
					listName: "Grant Closing"
				}
                  ],

			ReportsData: [
				{
					listName: "Grant Summary Report"
				},
				{
					listName: "Grant Status Report"
				},
				{
					listName: "Grant Report for Donor"
				}
                  ],

			EmpData: [
				{
					listName: "Reimbursement"
				}

                  ]

		};

		this.oModel = new sap.ui.model.json.JSONModel(this.list);
		this.getView().setModel(this.oModel);
	},

	onAfterRendering: function() {
		//this.byId("idProductsTable").setWidths(["30%", "70%"]);
	},

	_handleRouteMatched: function(data) {

		// if (data.mParameters.arguments.Session !== "0"){
		//     var Session="";
		//     Session = data.mParameters.arguments.Session;    
		// } else{
		//     Session = Session;
		// }
		SessionID = data.mParameters.arguments.Session;
	},

	onMastersSelectionChange: function(oEvent) {
		var oList = this.byId("Masters");
		var oSelectedItem = oList.getSelectedItem().mProperties.title;

		if (oSelectedItem === "Grant Code") {
			var that = this;
			oSelectedItem = oList.getSelectedItem();
			oList.setSelectedItem(oSelectedItem, false);
			this.handleCostCentersList();
			//that.router.navTo("masters.grantcode");
		} else if (oSelectedItem === "Parent Program") {
			oSelectedItem = oList.getSelectedItem();
			oList.setSelectedItem(oSelectedItem, false);
			this.handleParentProgramList();
		} else if (oSelectedItem === "Program Master") {
			oSelectedItem = oList.getSelectedItem();
			oList.setSelectedItem(oSelectedItem, false);
			this.handleProgramCodeList();
		} else if (oSelectedItem === "Grant Initiative") {
			oSelectedItem = oList.getSelectedItem();
			oList.setSelectedItem(oSelectedItem, false);
			this.handleGrantInitiativeList();
		} else if (oSelectedItem === "Donor Master") {
			oSelectedItem = oList.getSelectedItem();
			oList.setSelectedItem(oSelectedItem, false);
			this.handleDonorMaster();
		}
	},

	onTransactionsSelectionChange: function(oEvent) {
		var oList = this.byId("Transactions");
		var oSelectedItem = oList.getSelectedItem().mProperties.title;

		if (oSelectedItem == "Grant Master Request") {

		} else if (oSelectedItem == "Grant Contract") {
			var that = this;
			oSelectedItem = oList.getSelectedItem();
			oList.setSelectedItem(oSelectedItem, false); // This action deselects item and allow you select the item again
			this.handleGrantList();
		} else if (oSelectedItem == "Grant Allocation") {
			var that = this;
			oSelectedItem = oList.getSelectedItem();
			oList.setSelectedItem(oSelectedItem, false); // This action deselects item and allow you select the item again
			this.handleAllocationList();
			//that.router.navTo("transactions.grantAllocation");
		} else if (oSelectedItem == "Grant Freezing") {
			var that = this;
			//this.handleGrantFreezing();
			oSelectedItem = oList.getSelectedItem();
			oList.setSelectedItem(oSelectedItem, false); // This action deselects item and allow you select the item again
			this.handleFreezingList();
		} else if (oSelectedItem == "Cash Request") {
			var that = this;
			//this.handleGrantFreezing();
			oSelectedItem = oList.getSelectedItem();
			oList.setSelectedItem(oSelectedItem, false); // This action deselects item and allow you select the item again
			this.handleCRList();
		} else if (oSelectedItem == "Grant Freezing Period") {

		} else if (oSelectedItem == "Grant Closing") {

		}
	},

	onReportsSelectionChange: function(oEvent) {
		var oList = this.byId("Reports");
		var oSelectedItem = oList.getSelectedItem().mProperties.title;

		if (oSelectedItem == "Grant Summary Report") {

		} else if (oSelectedItem == "Grant Status Report") {

		} else if (oSelectedItem == "Grant Report for Donor") {

		}
	},

	onEmpSelectionChange: function(oEvent) {
		var oList = this.byId("Employee");
		var oSelectedItem = oList.getSelectedItem().mProperties.title;

		if (oSelectedItem == "Reimbursement") {
			var that = this;
			oSelectedItem = oList.getSelectedItem();
			oList.setSelectedItem(oSelectedItem, false); // This action deselects item and allow you select the item again
			this.handleERList();
		} else if (oSelectedItem == "") {

		} else if (oSelectedItem == "") {

		}
	},

	handleGrantContract: function() {
		var that = this;
		this.handleGrantList();
	},

	handleGrantList: function(oEvent) {
		var that = this;
		if (!this.oGetGrantDialog) {
			this.oGetGrantDialog = sap.ui.xmlfragment("SLFiori/fragments/transactions/grantContract.grantContract", this);
		}
		sap.ui.getCore().byId("GetGrantTable").removeSelections();
		this.oGetGrantDialog.setModel(this.oModel);
		$.ajax({
			//url: "https://172.31.28.160:50000/b1s/v1/BusinessPartners?$select=CardCode,CardName&$filter=CardType eq 'C'",
			//url: "http://172.31.28.160:8000/CustomControls_v1/SAPUI5/WebContent/org/edu/ui/OData/BP.xsodata/BusinessPartner",
			//url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/GrantContract_GrantList.xsodata/GrantContract",
			url: "OData/GrantContract_GrantList.xsodata/GrantContract",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().GrantList = oData.d.results;
				that.oModel.refresh();
				that.oGetGrantDialog.open();
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

	handleGrantOk: function(oEvent) {
		var that = this;
		var oGetGrantListTable = sap.ui.getCore().byId("GetGrantTable");
		var oSelectedGrant = oGetGrantListTable.getSelectedItem();
		if (oSelectedGrant) {
			var oSelctedCustContext = oSelectedGrant.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var GrantDocNum = this.oModel.getProperty(path);
			this.oGetGrantDialog.close();
			that.router.navTo("GrantContract", {
				Key: GrantDocNum.DocEntry
			});
		} else {
			this.oGetGrantDialog.close();
			that.router.navTo("GrantContract", {
				Key: 1
			});
		}
	},
	
	handleGrantClose: function() {
		sap.ui.getCore().byId("GetGrantTable").removeSelections();
		this.oGetGrantDialog.close();
	},

	handleNewGrantCode: function() {
		var that = this;
		this.oDialog.close();
		that.router.navTo("masters.grantcode", {
			Key: 0
		});
	},

	handleAllocationList: function(oEvent) {
		var that = this;
		if (!this.oGetAllocationDialog) {
			this.oGetAllocationDialog = sap.ui.xmlfragment("SLFiori/fragments/transactions.allocation", this);
		}
		sap.ui.getCore().byId("GetAllocationTable").removeSelections();
		this.oGetAllocationDialog.setModel(this.oModel);
		$.ajax({
			//url: "https://172.31.28.160:50000/b1s/v1/BusinessPartners?$select=CardCode,CardName&$filter=CardType eq 'C'",
			//url: "http://172.31.28.160:8000/CustomControls_v1/SAPUI5/WebContent/org/edu/ui/OData/BP.xsodata/BusinessPartner",
			//url: "http://10.0.1.189:8000/Ashoka/SAPUI5/WebContent/org/edu/ui/OData/GrantContract_GrantList.xsodata/GrantContract",
			url: "OData/transactions/allocation/allocation_allocationList.xsodata/DocEntry",
			//url: "OData/GrantContract_GrantList.xsodata/GrantContract",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().AllocationList = oData.d.results;
				that.oModel.refresh();
				that.oGetAllocationDialog.open();
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

	handleAllocationOk: function(oEvent) {
		var that = this;
		var oGetAllocationListTable = sap.ui.getCore().byId("GetAllocationTable");
		var oSelectedAllocation = oGetAllocationListTable.getSelectedItem();
		if (oSelectedAllocation) {
			var oSelctedCustContext = oSelectedAllocation.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var AllocationDocNum = this.oModel.getProperty(path);
			this.oGetAllocationDialog.close();
			that.router.navTo("transactions.grantAllocation", {
				Key: AllocationDocNum.DocEntry
			});
		} else {
			this.oGetGrantDialog.close();
			that.router.navTo("GrantContract", {
				Key: 1
			});
		}
	},

	handleAllocationClose: function() {
		sap.ui.getCore().byId("GetAllocationTable").removeSelections();
		this.oGetAllocationDialog.close();
	},

	handleNewAllocationEntry: function() {
		var that = this;
		this.oGetAllocationDialog.close();
		that.router.navTo("transactions.grantAllocation", {
			Key: 0
		});
	},

	handleFreezingList: function(oEvent) {
		var that = this;
		if (!this.oGetFreezingDialog) {
			this.oGetFreezingDialog = sap.ui.xmlfragment("SLFiori/fragments/transactions.freezing", this);
		}
		sap.ui.getCore().byId("GetFreezingTable").removeSelections();
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
				that.oModel.getData().FreezingList = oData.d.results;
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
		var oGetFreezingListTable = sap.ui.getCore().byId("GetFreezingTable");
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
		sap.ui.getCore().byId("GetFreezingTable").removeSelections();
		this.oGetFreezingDialog.close();
	},

	handleNewFreezingEntry: function() {
		var that = this;
		this.oGetFreezingDialog.close();
		that.router.navTo("transactions.grantFreezing", {
			Key: 0
		});
	},

	handleCRList: function(oEvent) {
		var that = this;
		if (!this.oGetCRDialog) {
			this.oGetCRDialog = sap.ui.xmlfragment("SLFiori/fragments/transactions/cashRequest.cashRequest", this);
		}
		sap.ui.getCore().byId("GetCRTable").removeSelections();
		this.oGetCRDialog.setModel(this.oModel);
		$.ajax({
			url: "OData/transactions/cashRequest/cashRequestList.xsodata/CashRequest",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().CRList = oData.d.results;
				that.oModel.refresh();
				that.oGetCRDialog.open();
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
		var oGetCRListTable = sap.ui.getCore().byId("GetCRTable");
		var oSelectedCR = oGetCRListTable.getSelectedItem();
		if (oSelectedCR) {
			var oSelctedCustContext = oSelectedCR.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var CRDocNum = this.oModel.getProperty(path);
			this.oGetCRDialog.close();
			that.router.navTo("transactions.cashRequest", {
				Key: CRDocNum.DocEntry
			});
		} else {
			this.oGetCRDialog.close();
		}
	},

	handleCRClose: function() {
		sap.ui.getCore().byId("GetCRTable").removeSelections();
		this.oGetCRDialog.close();
	},

	handleNewCREntry: function() {
		var that = this;
		this.oGetCRDialog.close();
		that.router.navTo("transactions.cashRequest", {
			Key: 0
		});
	},

	handleERList: function(oEvent) {
		var that = this;
		if (!this.oGetERDialog) {
			this.oGetERDialog = sap.ui.xmlfragment("SLFiori/fragments/transactions/expenseRequest.expenseRequest", this);
		}
		sap.ui.getCore().byId("GetERTable").removeSelections();
		this.oGetERDialog.setModel(this.oModel);
		$.ajax({
			url: "OData/transactions/expenseRequest/expenseRequestList.xsodata/expenseRequest",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().ERList = oData.d.results;
				that.oModel.refresh();
				that.oGetERDialog.open();
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
		var oGetERListTable = sap.ui.getCore().byId("GetERTable");
		var oSelectedER = oGetERListTable.getSelectedItem();
		if (oSelectedER) {
			var oSelctedCustContext = oSelectedER.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var ERDocNum = this.oModel.getProperty(path);
			this.oGetERDialog.close();
			that.router.navTo("transactions.expenseRequest", {
				Key: ERDocNum.DocEntry
			});
		} else {
			this.oGetERDialog.close();
		}
	},

	handleERClose: function() {
		sap.ui.getCore().byId("GetERTable").removeSelections();
		this.oGetERDialog.close();
	},

	handleNewEREntry: function() {
		var that = this;
		this.oGetERDialog.close();
		that.router.navTo("transactions.expenseRequest", {
			Key: 0
		});
	},

	handleAddEntry: function(oEvent) {
		var that = this;
		var oGetGrantListTable = sap.ui.getCore().byId("GetGrantTable");
		//var oSelectedGrant= oGetGrantListTable.getSelectedItem();

		this.oGetGrantDialog.close();
		that.router.navTo("GrantContract", {
			Key: 0
		});

	},

	handlelogoffButton: function(oEvent) {
		//this.router.navTo("GrantContract");
		var that = this;
		var jDataLogout = JSON.stringify({
			UserName: "manager",
			Password: "manager",
			CompanyDB: "SBODEMOUS"
		});

		//   $.ajax({
		//     		type: "POST",
		//     		url: "/sap/sbo/platform/login?$func=logout",
		//     // 		headers: {
		//     // 		//	"Authorization": "Basic " + btoa("SYSTEM" + ":" + "Ashoka@123")
		//     // 		},
		//     		beforeSend: function(xhr) {
		//     			xhr.setRequestHeader("X-CSRF-Token", "Fetch");
		//     		},
		//     // 		data: {
		//     // // 			"company": "SBODEMOUS",
		//     // // 			"username": "manager",
		//     // // 			"password": "manager",
		//     // // 			"language": "en-US"
		//     // 		},
		//     		error: function(xhr, status, error) 
		//     		{

		//     			  var data = JSON.parse(xhr.responseText);
		//     		      window.alert("Login failed: " +data['msg']);
		//     		},
		//     		success: function(json, textStatus, XMLHttpRequest) {
		//     			//$("#wait").css("display", "none");
		//     			console.log("Success");
		//     			//login_service(user.value, pass.value);
		//     		}
		//     	});

		$.ajax({
			//url: "https://10.0.1.189:50000/b1s/v1/Logout",
			url: "/b1s/v1/Logout",
			xhrFields: {
				withCredentials: true
			},
			//data: jDataLogout,
			type: "POST",
			dataType: "json",
			data: {
				"SessionTimeout": "0"
			},
			success: function(jDataLogout) {
				that.router.navTo("Login");
				//console.log("Logged out Succesfully");
			},
			error: function(xhr, status, errorThrown) {
				sap.m.MessageToast.show("Error: " + errorThrown);
			},
			complete: function(xhr, status) {}
		});
	},

	onCollapseExapandPress: function() {
		var sideNavigation = this.getView().byId('sideNavigation');
		var expanded = !sideNavigation.getexpanded();

		sideNavigation.setExpanded(expanded);
	},

	handleDonorMaster: function(oEvent) {
		var that = this;
		if (!this.oCustomerMasterDialog) {
			//			this.oCustomerMasterDialog = sap.ui.xmlfragment("SLFiori.fragments.CustomerMaster",this);
			this.oCustomerMasterDialog = sap.ui.xmlfragment("SLFiori.fragments.masters.donorMaster.donorlist_display", this);
		}
		sap.ui.getCore().byId("DonorListTable").removeSelections();
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
	
	 onItemPress: function(){
          var msg = "This is a test of itemPress!";
          sap.m.MessageToast.show(msg);
    },
	
	handleCustOk        : function(oEvent) {
		//this.oCustomerMasterDialog.close();
		//this.router.navTo("DonorMaster");

		var that = this;
		var oDonorListTable = sap.ui.getCore().byId("DonorListTable");
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

	handleCustClose: function() {
		sap.ui.getCore().byId("DonorListTable").removeSelections();
		this.oCustomerMasterDialog.close();
	},

	handleAddNewDonor: function(oEvent) {
		var that = this;
		this.oCustomerMasterDialog.close();
		that.router.navTo("DonorMaster", {
			Key: 0
		});
	},
	
	handleCostCentersList_New: function(oEvent) {
	    var that = this;
			if (! this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("SLFiori.fragments.masters.gc_display", this);
			}
			
 
			this._oDialog.setModel(this.oModel);
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
				that.oModel.getData().CostCentersList = oData.d.results; //oData.value;
				that.oModel.refresh();
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
 
            this.getView().addDependent(this._oDialog);
							// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();

		},
		
	handleCostCentersOk_New: function(oEvent) {
	    var that = this;
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {
				sap.m.MessageToast.show("You have chosen " + aContexts.map(function(oContext) { return oContext.getObject().Name; }).join(", "));
				that.router.navTo("masters.grantcode", {
				Key: aContexts.map(function(oContext) { return oContext.getObject().Code; }).join(", ")
			});
			}
			oEvent.getSource().getBinding("items").filter([]);
		},

    onDim1Search_New: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},
		
	handleCostCentersList: function(oEvent) {
		var that = this;
		if (!this.oDialog) {
			this.oDialog = sap.ui.xmlfragment("SLFiori.fragments.masters.grantcode_display", this);
		}
		sap.ui.getCore().byId("CostCentersListTable").removeSelections();

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
				that.oModel.getData().CostCentersList = oData.d.results; //oData.value;
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

	handleCostCentersOk         : function(oEvent) {
		//this.oDialog.close();

		var that = this;
		var oDonorListTable = sap.ui.getCore().byId("CostCentersListTable");
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
			sap.m.MessageToast.show("Please select Grant Code");
		}
	},

	handleCostCentersClose: function(oEvent) {
		this.oDialog.close();

		//this.router.navTo("DonorMaster");
	},

	handleProgramCodeList: function(oEvent) {
		var that = this;
		if (!this.oProgramCodeDialog) {
			this.oProgramCodeDialog = sap.ui.xmlfragment("SLFiori.fragments.masters.programcode_display", this);
		}
		sap.ui.getCore().byId("ProgramCodeListTable").removeSelections();
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

	handleProgramCodeOk: function(oEvent) {
		//this.oProgramCodeDialog.close();

		var that = this;
		var oDonorListTable = sap.ui.getCore().byId("ProgramCodeListTable");
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

	handleProgramCodeClose: function(oEvent) {
		this.oProgramCodeDialog.close();
		//this.router.navTo("DonorMaster");
	},

	handleAddProgramCode: function() {
		var that = this;
		this.oProgramCodeDialog.close();
		that.router.navTo("masters.programmaster", {
			Key: 0
		});
	},

	handleGrantInitiativeList: function(oEvent) {
		var that = this;
		if (!this.oGrantInitiativeDialog) {
			this.oGrantInitiativeDialog = sap.ui.xmlfragment("SLFiori.fragments.masters.grantinitiative_display", this);
		}
		sap.ui.getCore().byId("GrantInitiativeTable").removeSelections();
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

	handleGrantInitiativeOk: function(oEvent) {
		//this.oGrantInitiativeDialog.close();

		var that = this;
		var oDonorListTable = sap.ui.getCore().byId("GrantInitiativeTable");
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

	handleGrantInitiativeClose: function(oEvent) {
		this.oGrantInitiativeDialog.close();
		//this.router.navTo("DonorMaster");
	},

	handleAddInititative: function() {
		var that = this;
		this.oGrantInitiativeDialog.close();
		that.router.navTo("masters.grantinitiative", {
			Key: 0
		});
	},

	handleParentProgramList: function(oEvent) {
		var that = this;
		if (!this.oParentProgramDialog) {
			this.oParentProgramDialog = sap.ui.xmlfragment("SLFiori.fragments.ParentProgramv1", this);
		}
		sap.ui.getCore().byId("ParentProgramTable").removeSelections();
		this.oParentProgramDialog.setModel(this.oModel);
		$.ajax({
			url: "OData/ParentProgram.xsodata/ParentProgram",
			xhrFields: {
				withCredentials: true
			},
			async: false,
			type: "GET",
			dataType: "json",
			success: function(oData, oResponse) {
				that.oModel.getData().ParentProgramList = oData.d.results; //oData.value;
				that.oModel.refresh();
				that.oParentProgramDialog.open();
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

	handleParentProgramOk: function(oEvent) {
		//this.oParentProgramDialog.close();
		var that = this;
		var oDonorListTable = sap.ui.getCore().byId("ParentProgramTable");
		var oSelectedGrant = oDonorListTable.getSelectedItem();
		if (oSelectedGrant) {
			var oSelctedCustContext = oSelectedGrant.getBindingContext();
			var path = oSelctedCustContext.sPath;
			var DonorCode = this.oModel.getProperty(path);
			this.oParentProgramDialog.close();
			// 			that.router.navTo("masters.programmaster", {
			// 				Key: DonorCode.CCCode
			// 			});
			var PgmCode = DonorCode.Code;
			if (!this.oAddParentProgramDialog) {
				this.oAddParentProgramDialog = sap.ui.xmlfragment("SLFiori.fragments.AddProgramCode", this);
			}
			//sap.ui.getCore().byId("ParentProgramTable").removeSelections();

			this.Dialoglist = {
				FormMode: "Update",
				PrcCode: "",
				PrcName: ""
			};

			this.oModel = new sap.ui.model.json.JSONModel(this.Dialoglist);
			//this.getView().setModel(this.oModel);
            
			this.oAddParentProgramDialog.setModel(this.oModel);
			that.oAddParentProgramDialog.open();
            
            
			$.ajax({
				url: "/b1s/v1/IK_PPGM('" + PgmCode + "')",
				xhrFields: {
					withCredentials: true
				},
				async: false,
				type: "GET",
				dataType: "json",
				success: function(oData, oResponse) {

					that.oModel.setProperty("/FormMode", "Update");
					that.oModel.setProperty("/PrcCode", oData.Code);
					that.oModel.setProperty("/PrcName", oData.Name);

					that.oModel.refresh();
				},
				error: function(oError) {
					sap.m.MessageToast.show("Error: " + oError);
				}
			});
		} else {
			//this.oCustomerMasterDialog.close();
			//that.router.navTo("DonorMaster",{Key:1});
			sap.m.MessageToast.show("Please select Program Code");
		}

		//var oModelData = this.oModel.getData();
		//var that = this;

	},

	handleParentProgramClose: function(oEvent) {
		this.oParentProgramDialog.close();
		//this.router.navTo("DonorMaster");
	},

	handleAddParentPgm: function(oEvent) {

		var that = this;
		this.oParentProgramDialog.close();
		if (!this.oAddParentProgramDialog) {
			this.oAddParentProgramDialog = sap.ui.xmlfragment("SLFiori.fragments.AddProgramCode", this);
		}
		sap.ui.getCore().byId("ParentProgramTable").removeSelections();

		this.Dialoglist = {
			FormMode: "Add",
			PrcCode: "",
			PrcName: ""
		};

		this.oModel = new sap.ui.model.json.JSONModel(this.Dialoglist);
		this.oAddParentProgramDialog.setModel(this.oModel);
		that.oAddParentProgramDialog.open();

	},

	handleAddParentProgram: function(oEvent) {
		var oModelData = this.oModel.getData();

		var that = this;

		var jData = JSON.stringify({
			Code: oModelData.PrcCode,
			Name: oModelData.PrcName
			// 			U_GrCur:oModelData.CurrCode,
			// 			U_Mangr:oModelData.U_Mangr,
			// 			U_ExtText:oModelData.U_ExtText,
			// 			U_GrRes:oModelData.U_GrRes.key,
			// 			EffectiveFrom: "2016-01-01",
			// 			InWhichDimension: "1"
		});

		if (oModelData.FormMode !== "Add") {
			//sap.m.MessageToast.show("FormMode-Update");
			//this.GrantEntry=data.mParameters.arguments.Key;
			$.ajax({
				//url: "https://10.0.1.189:50000/b1s/v1/IK_GNCT(" + oModelData.GrantEntryNo + ")",
				url: "/b1s/v1/IK_PPGM('" + oModelData.PrcCode + "')",
				xhrFields: {
					withCredentials: true
				},
				data: jData,
				type: "PATCH",
				dataType: "json",
				success: function(json) {
					sap.m.MessageToast.show("Program Code Updated Sucessfully");
				},
				error: function(xhr, status, errorThrown) {
					sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
				},
				complete: function(xhr, status) {}
			});

		} else {
			//sap.m.MessageToast.show("FormMode-Add");
			$.ajax({

				//url: "https://10.0.1.189:50000/b1s/v1/IK_GNCT",
				url: "/b1s/v1/IK_PPGM",
				xhrFields: {
					withCredentials: true
				},
				data: jData,
				type: "POST",
				dataType: "json",
				success: function(json) {
					sap.m.MessageToast.show("Program Code Added Sucessfully");
				},
				error: function(xhr, status, errorThrown) {
					sap.m.MessageToast.show("Error: " + xhr.responseJSON.error.message.value);
				},
				complete: function(xhr, status) {}
			});
		}
	},

	handleAddProgramCodeClose: function(oEvent) {
		this.oAddParentProgramDialog.close();
		//this.router.navTo("DonorMaster");
	},

	onSearch: function(oEvt) {
		var list = sap.ui.getCore().byId("DonorListTable"); //this.getView().byId("idList");
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

	onDim1Search: function(oEvt) {
		var list = sap.ui.getCore().byId("CostCentersListTable"); //this.getView().byId("idList");
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
	

	onPgmCodeSearch: function(oEvt) {
		var list = sap.ui.getCore().byId("ProgramCodeListTable"); //this.getView().byId("idList");
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

	onGrantListSearch: function(oEvt) {
		var list = sap.ui.getCore().byId("GetGrantTable"); //this.getView().byId("idList");
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

	onAllocationSearch: function(oEvt) {
		var list = sap.ui.getCore().byId("GetAllocationTable"); //this.getView().byId("idList");
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

	onCRSearch: function(oEvt) {
		var list = sap.ui.getCore().byId("GetCRTable"); //this.getView().byId("idList");
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
	
	onGISearch: function(oEvt) {
		var list = sap.ui.getCore().byId("GrantInitiativeTable"); //this.getView().byId("idList");
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