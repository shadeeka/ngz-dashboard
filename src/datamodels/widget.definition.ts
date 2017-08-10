/**
 * Created by:
 * Author: Shadeeka
 * Date: 8/6/17
 * 2016 (c) nCinga Innovations
 */


export class WidgetDefinition{
  public name:string;
  public data_attribute_name:string;
  public data_model_type:string;
  public args:any ={};

  constructor(obj){
    this.name = obj && obj.name;
    this.data_attribute_name = obj && obj.data_attribute_name;
    this.data_model_type = obj && obj.data_model_type;
    this.args =obj && obj.args;
  }

}
