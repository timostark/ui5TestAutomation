sap.ui.define([
    "sap/ui/base/Object",
    "sap/ui/model/json/JSONModel"
], function (Object, JSONModel) {
    "use strict";

    var GlobalSettings = Object.extend("com.ui5.testing.model.GlobalSettings", {
        constructor: function () {
            var oJSON = {
                settings: {
                    defaultLanguage: "UI5"
                },
                settingsDefault: {
                    defaultLanguage: "UI5"
                },
                codeLanguages: [
                    {
                        key: "UI5",
                        text: "ui5-uiveri5"
                    },
                    {
                        key: "TCF",
                        text: "Testcafe (Beta)"
                    },
                    {
                        key: "OPA",
                        text: "OPA5 (Alpha)"
                    }
                ],
            };
            this._oModel = new JSONModel(oJSON);
            this.load();
        }
    });

    GlobalSettings.prototype.getModel = function () {
        return this._oModel;
    };

    GlobalSettings.prototype.load = function () {
        chrome.storage.local.get(["settings"], function (data) {
            this._oModel.setProperty("/settings", JSON.parse(JSON.stringify(this._oModel.getProperty("/settingsDefault"))));
            if (data && data.settings) {
                this._oModel.setProperty("/settings/defaultLanguage", data.settings.defaultLanguage);
            }
        }.bind(this));
    };

    GlobalSettings.prototype.save = function() {
        var oData = this._oModel.getProperty("/settings");
        chrome.storage.local.set({ "settings": oData }, function (data) {
        }.bind(this));
    };

    return new GlobalSettings();
});