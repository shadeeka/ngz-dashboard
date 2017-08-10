/**
 * Created by:
 * Author: Shadeeka
 * Date: 8/6/17
 * 2016 (c) nCinga Innovations
 */


import {Injectable} from "@angular/core";
@Injectable()
export class DataModelService{

  constructor(){
  }

  public setup(){
    console.log("data model setup");
  }

  public init(){
    console.log("data model init");
  }

  public update(){
    console.log("data model update");
  }

  public destroy(){
    console.log("data model destroy");
  }
}
