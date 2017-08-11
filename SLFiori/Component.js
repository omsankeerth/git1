jQuery.sap.declare("SLFiori.Component");
//jQuery.sap.require("SLFiori.Configuration");
jQuery.sap.require("sap.m.routing.RouteMatchedHandler");

sap.ui.core.UIComponent.extend("SLFiori.Component", {
	metadata : {
		//"manifest": "json",
		"name" : "Master Detail Demo",
		"version" : "1.0",
		"includes" : [],
		"dependencies" : {
			"libs" : ["sap.m", "sap.me", "sap.ushell"],
			"components" : []
		},
		 "config" : {
			"resourceBundle" : "i18n/i18n.properties",
			"titleResource" : "SHELL_TITLE",
			
			"serviceConfig" : {
				name: "B1H_ServiceLayer",
				serviceUrl: "https://10.0.1.189:50000/b1s/v1/",
				sessionid:""
				//UserCode:""
			    //serviceUrl: "model/metadata.xml"
			}
		},
		routing: {
			config: {
				 enableFrameBackNavigation: false,
                    viewType:"XML",
					viewPath:"SLFiori.view",
					targetControl:"navContainer",
					targetAggregation:"pages",
					clearTarget : false
			},
			routes:
				[{
					pattern: "",
					name : "Login",
					view : "Login"
				},
				{
					//pattern: "Dashboard/{Session}",
					pattern: "Dashboard",
					name : "Dashboard",
					view : "Dashboard"
								},
				{
				    pattern : "GrantContract/{Key}",
				    name:"GrantContract",
				    view:"GrantContract"
				                },
				{
				     //pattern : "DonorMaster/{Key}/{Session}",
				     pattern : "DonorMaster/{Key}",
				     name:"DonorMaster",
				     view:"DonorMaster"
				                },
				{
				     pattern : "transactions.grantFreezing/{Key}",
				     name:"transactions.grantFreezing",
				     view:"transactions.grantFreezing"
				                },
				{
				     pattern : "transactions.grantAllocation/{Key}",
				     name:"transactions.grantAllocation",
				     view:"transactions.grantAllocation"
				                },
				{
				     pattern : "transactions.cashRequest/{Key}",
				     name:"transactions.cashRequest",
				     view:"transactions.cashRequest"
				                },
				{
				     pattern : "transactions.expenseRequest/{Key}",
				     name:"transactions.expenseRequest",
				     view:"transactions.expenseRequest"
				                },
				{
				     pattern : "masters.grantcode/{Key}",
				     name:"masters.grantcode",
				     view:"masters.grantcode"
				                },
				{
				     pattern : "masters.programmaster/{Key}",
				     name:"masters.programmaster",
				     view:"masters.programmaster"
				                },
				{
				     pattern : "masters.grantinitiative/{Key}",
				     name:"masters.grantinitiative",
				     view:"masters.grantinitiative"
				                }
				                
				                
					]
		}
		
	},

	init : function() {
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		this._oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this.getRouter());
		// this component should automatically initialize the router
		this.getRouter().initialize();
		//
		var oServiceConfig = this.getMetadata().getConfig()["serviceConfig"];
		var sServiceUrl = oServiceConfig.serviceUrl;
		//
		 //var sServiceUrl = this.getMetadata().getManifestEntry("sap.app").dataSources["B1H_ServiceLayer"].uri;
		// always use absolute paths relative to our own component
		// (relative paths will fail if running in the Fiori Launchpad)
		var rootPath = jQuery.sap.getModulePath("SLFiori");

		// if proxy needs to be used for local testing...
		var sProxyOn = jQuery.sap.getUriParameters().get("proxyOn");
		var bUseProxy = ("true" === sProxyOn);
		if (bUseProxy) {
			sServiceUrl = rootPath + "/proxy" + sServiceUrl;
		} 
		
		// set data model
    		//var m = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
        	//var m = new sap.ui.model.json.JSONModel(sServiceUrl+"/$metadata");
			//this.setModel(m);
			//
			//var oModel = new sap.ui.model.json.JSONModel();
	    	//oModel.setData(ItemsJSONData);
	    	//this.setModel(oModel);
	    	
	    	var oConfig = {
	                metadataUrlParams : {},
	                json : true,
	                // loadMetadataAsync : true,
	                defaultBindingMode :"TwoWay",
	                defaultCountMode: "Inline",
	                useBatch : true
	            };
	        //var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, oConfig);
	            
	    	//

		// set i18n model
		/*
			var i18nModel = new sap.ui.model.resource.ResourceModel({
				bundleUrl : rootPath + "/i18n/i18n.properties"
			});
			this.setModel(i18nModel, "i18n");
			
		 */
		 	// always use absolute paths relative to our own component
			// (relative paths will fail if running in the Fiori Launchpad)
			var rootPath = jQuery.sap.getModulePath("SLFiori");

			// if proxy needs to be used for local testing...
			var sProxyOn = jQuery.sap.getUriParameters().get("proxyOn");
			var bUseProxy = ("true" === sProxyOn);
			if (bUseProxy) {
				sServiceUrl = rootPath + "/proxy" + sServiceUrl;
			} 

			// start mock server if required
			var responderOn = jQuery.sap.getUriParameters().get("responderOn");
			var bUseMockData = ("true" === responderOn);
			// var bUseMockData = true;
			if (bUseMockData)
			{
				jQuery.sap.require("sap.ui.app.MockServer");
				var oMockServer = new sap.ui.app.MockServer({
					rootUri: sServiceUrl
				});
				//oMockServer.simulate(rootPath + "/model/metadata.xml", rootPath + "/model/");
			    oMockServer.simulate(rootPath + "/" + this.getMetadata().getManifestEntry("sap.app").dataSources["B1H_ServiceLayer"].settings.localUri, rootPath + "/model/");
				oMockServer.start();

				var msg = "Running in demo mode with mock data."; // not translated because only for development scenario
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show(msg, {
					duration: 4000
				});
			}
			
		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isTouch : sap.ui.Device.support.touch,
			isNoTouch : !sap.ui.Device.support.touch,
			isPhone : jQuery.device.is.phone,
			isNoPhone : !jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
					listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		this.setModel(deviceModel, "device");
	},

	/**
	 * Initialize the application
	 * 
	 * @returns {sap.ui.core.Control} the content
	 */
	createContent : function()
	{
		var oViewData = {
				component : this
		};
		return sap.ui.view({
			viewName : "SLFiori.view.App",
			type : sap.ui.core.mvc.ViewType.XML,
			viewData : oViewData
		});
	}
});