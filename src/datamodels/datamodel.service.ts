/**
 * Created by:
 * Author: Shadeeka
 * Date: 8/6/17
 * 2016 (c) nCinga Innovations
 */


import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

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

  public onUpdateScope():Observable<any>{
    let subject = new Subject();
    return subject.asObservable();
  }

  public updateScope(){

  }

  public destroy(){
    console.log("data model destroy");
  }
}
