"use strict";
/**
 * Created by:
 * Author: Shadeeka
 * Date: 8/6/17
 * 2016 (c) nCinga Innovations
 */
Object.defineProperty(exports, "__esModule", { value: true });
var WidgetDefinition = (function () {
    function WidgetDefinition(obj) {
        this.args = {};
        this.name = obj && obj.name;
        this.data_attribute_name = obj && obj.data_attribute_name;
        this.data_model_type = obj && obj.data_model_type;
        this.args = obj && obj.args;
    }
    return WidgetDefinition;
}());
exports.WidgetDefinition = WidgetDefinition;
//# sourceMappingURL=widget.definition.js.map