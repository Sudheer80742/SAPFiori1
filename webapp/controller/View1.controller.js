sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/m/MessageBox"
], function (Controller, Fragment, JSONModel, ResourceModel, MessageBox) {
    "use strict";

    return Controller.extend("project4.controller.View1", {
        onInit: function () {
            var oData = {
                inField: ""
            };
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "inputModel");

            var oi18nModel = new ResourceModel({
                bundleName: "project4.i18n.i18n"
            });
            this.getView().setModel(oi18nModel, "i18n");
        },

        onShow1: function () {
            this._loadFragment("project4.fragments.frag1");
        },

        onShow2: function () {
            this._loadFragment("project4.fragments.frag2");
        },
        onShow3:function(){
            this._loadFragment("project4.fragments.addr");
        },
        _loadFragment: function (sFragmentName) {
            let oView = this.getView();
            let oFragCont = oView.byId("vboxcon");

            // oFragCont.removeAllItems();

            Fragment.load({
                id: oView.getId(),
                name: sFragmentName,
                controller: this
            }).then(function (oFragment) {
                oFragCont.addItem(oFragment);
            });
        },

        onSubmit: function () {
            var oView = this.getView();
            var sValue = oView.byId("inputField").getValue();
            var oModel = oView.getModel("inputModel");
            oModel.setProperty("/inField", sValue);

            this.getView().byId("showText").setText(sValue);

            var oDt = this.getView().getModel("i18n").getResourceBundle();
            var oview1 = this.getView().getModel("inputModel").getProperty("inField");
            var sMsg = oDt.getText("helloMsg", [oview1]);
            MessageBox.show(sMsg);
        }
    });
});
