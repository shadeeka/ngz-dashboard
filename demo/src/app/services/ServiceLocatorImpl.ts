/**
 * Created by:
 * Author: Shadeeka
 * Date: 8/7/17
 * 2016 (c) nCinga Innovations
 */


import {Injectable} from "@angular/core";
import {ServiceLocator} from "../../dist";
import {CountService} from "./CountService";
import {DataModelService} from "../../dist";


@Injectable()
export class ServiceLocatorImpl extends ServiceLocator{

  get(name:string) {
    switch (name){
      case 'CountService':{
        return new CountService();
      }
      default:{
        return new DataModelService();
      }
    }
  }
}
