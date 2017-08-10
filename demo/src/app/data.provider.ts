/**
 * Created by:
 * Author: Shadeeka
 * Date: 8/5/17
 * 2016 (c) nCinga Innovations
 */

import {Injectable} from "@angular/core";
import {Subject, BehaviorSubject} from "rxjs";

@Injectable()
export class CountProvider{

  public data:BehaviorSubject<number>;

  constructor(){
    this.data = new BehaviorSubject(1);
    this.init();
  }
  getData(){
    return this.data;
  }

  init(){
    let i=100;
    setInterval(()=>{

      let date1 = new Date();
      this.data.next(i);
      i++;
    },1000);
  }
  updateContent(){}

  destroy(){

  }
}
