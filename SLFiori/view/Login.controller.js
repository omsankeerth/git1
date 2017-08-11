sap.ui.controller("SLFiori.view.Login", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf empcreate.create
*/
	onInit: function() {
			//this.oRouter = sap.ui.core.routing.Router.getRouter("router");  
				this.router = sap.ui.core.UIComponent.getRouterFor(this);
		//this.router.attachRoutePatternMatched(this.handleRouteMatched, this);
		this._url = this.getOwnerComponent().getMetadata().getConfig().serviceConfig.serviceUrl;
	},
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf empcreate.create
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf empcreate.create
*/
  onAfterRendering: function() {
        var view = this.getView();
        //sap.ui.getCore().getControl("UName").focus();
        //this.byId("UName").focus();
        view.addDelegate({
            onsapenter: function(e) {
                view.getController().handleLogin();
            }
        });

        // if (this.getOwnerComponent() && this.getOwnerComponent().getBackgroundImage()) {
        //     app.setModel(new sap.ui.model.json.JSONModel({
        //         d: {
        //             VALUE: this.getOwnerComponent().getBackgroundImage()
        //         }
        //     }));
        // }

    },
    
    //  sendForm: function() {
    //     sap.ui.core.BusyIndicator.show(0);
    //     var view = this.getView();

    //     var send = function() {
    //         var origin = view.getController().getParameterByName("x-sap-origin-location");
    //         var data = {
    //             "xs-username": sap.ui.getCore().getControl("xs_username").getValue().trim(),
    //             "xs-password": sap.ui.getCore().getControl("xs_password").getValue(),
    //         };
    //         if(sap.ui.getCore().getControl("xs_username").getValue().length >2048){
    //             sap.ui.getCore().getControl("xs_username").setValueStateText(oBundle.getText("USERNAME_EXCEEDED"));
    //             sap.ui.getCore().getControl("xs_username").setValueState("Error");
    //         }
    //         $.ajax({
    //             url: "/sap/hana/xs/formLogin/login.xscfunc",
    //             type: "POST",
    //             data: data,
    //             beforeSend: function(xhr) {
    //                 xhr.setRequestHeader("X-CSRF-Token", CSRFToken);
    //             },
    //             success: function(data) {
    //                 sap.ui.core.BusyIndicator.hide();
    //                 view.getController().handleSuccessfulLogin(data);
    //             },
    //             error: function(data) {
    //                 sap.ui.core.BusyIndicator.hide();
    //                 view.getController().handleFailureLogin(data);
    //             }
    //         });
    //     };
    //     this.getCSRFToken(send);
    // },
	
    handleLogin : function(oEvent){
	    var that = this;
	    var UName = this.byId("UName").getValue();
	    var Password = this.byId("Passwd").getValue();
		var jData =  JSON.stringify({UserName : UName, Password: Password, CompanyDB: "CMD"});
		
	    //var jData =  JSON.stringify({UserName: "manager", Password: "manager", CompanyDB: "SBODEMOIN"});	
	 $.ajax({
        		type: "POST",
        		url: "/sap/sbo/platform/login",
        		headers: {
        			"Authorization": "Basic " + btoa("SYSTEM" + ":" + "Ashoka@123")
        		},
        		beforeSend: function(xhr) {
        			xhr.setRequestHeader("X-CSRF-Token", "Fetch");
        		},
        		data: {
        			"company": "CMD",
        			"username": "manager",
        			"password": "A123",
        			"language": "en-US"
        		},
        		error: function(xhr, status, error) 
        		{
        		    
        			  var data = JSON.parse(xhr.responseText);
        		      window.alert("Login failed: " +data['msg']);
        		},
        		success: function(json, textStatus, XMLHttpRequest) {
        			//$("#wait").css("display", "none");
        			//console.log("Success");
        			//login_service(user.value, pass.value);
        			
        		}
        	});
        	
	$.ajax({
		url: "/b1s/v1/Login",
        xhrFields: {
            withCredentials: true
        },
		data: jData,
		type: "POST",
		dataType : "json",
		success: function( json ) {
            //that.router.navTo("Dashboard",{Session:json.SessionId});
            //that.getOwnerComponent().getMetadata().getConfig().serviceConfig.UserCode = that.byId("UName").getValue();
            window.UserCode = that.byId("UName").getValue();
            that.router.navTo("Dashboard");
		},
		error: function( oError ) {
			//sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			if (oError.responseJSON.error.code === -10 || oError.responseJSON.error.code === 100000027){
			    sap.m.MessageToast.show("Invalid Credentials,please check");
			}else {
			    sap.m.MessageToast.show("Error: " + oError.responseJSON.error.message.value);
			}
			//alert("Error: " + errorThrown);
			//connected = false;
		},
		complete: function( xhr, status ) {
		}
	});
}

// 	handleAdd : function(oEvent){
// 	    var GC = document.getElementById("idMain1--GCode-inner");
// 		var jData =  JSON.stringify({U_IKGRCD : GC.value});	
// 	$.ajax({
// 		url: "https://172.31.28.160:50000/b1s/v1/IKGRANTUDO",
//         xhrFields: {
//           withCredentials: true
//         },
// 		data: jData,
// 		type: "POST",
// 		dataType : "json",
// 		success: function( json ) {
// 			alert("Posting Success")
// 		},
// 		error: function( xhr, status, errorThrown ) {
// 		        alert(errorThrown);
// 		},
// 		complete: function( xhr, status ) {
// 		}
// 	});
// 	}


});