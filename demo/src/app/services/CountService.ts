/**
 * Created by:
 * Author: Shadeeka
 * Date: 8/6/17
 * 2016 (c) nCinga Innovations
 */


import {Injectable} from "@angular/core";
import {DataModelService} from "../../dist";

@Injectable()
export class CountService extends DataModelService{

  constructor(){
    super();
  }

  public setup(){
    console.log("data model setup 1");
  }

  public init(){
    console.log("data model init 1");
  }

  public update(){
    console.log("data model update 1");
  }

  public destroy(){
    console.log("data model destroy 1");
  }
}
