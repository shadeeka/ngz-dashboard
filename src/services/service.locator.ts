/**
 * Created by:
 * Author: Shadeeka
 * Date: 8/7/17
 * 2016 (c) nCinga Innovations
 */

import {Injectable} from "@angular/core";
import {DataModelService} from "../datamodels/datamodel.service";

@Injectable()
export class ServiceLocator{
  get(name:string,args:any):DataModelService{
      switch (name){
        default:{
          return new DataModelService();
        }
      }
  };
}
