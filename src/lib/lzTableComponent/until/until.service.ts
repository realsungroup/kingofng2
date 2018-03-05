
import { Injectable } from '@angular/core';

@Injectable()

export class LZUntilService {
    constructor() {

    }

    //时间格式转换
    transformDateToString(date: Date, format: string): string {
        if (!(date instanceof Date)) return '';
        var o = {
            "M+": date.getMonth() + 1, //month
            "d+": date.getDate(),    //day
            "h+": date.getHours(),   //hour
            "m+": date.getMinutes(), //minute
            "s+": date.getSeconds(), //second
            "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
            "S": date.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    }

    //
    isValiateDate(date): boolean {
        if (Object.prototype.toString.call(date) === "[object Date]") {
            // it is a date
            if (isNaN(date.getTime())) {  // d.valueOf() could also work
                // date is not valid
                return false;
            }else {
                // date is valid
                return true;
            }
        }else {
            // not a date
            return false;
        }
    }

    //自定义定位
    customStyle(obj: any,group?): any {
        if(group == 'group') obj.FrmWidth = Number(obj.FrmWidth) + 20;
        let styles = {
            // "background-color": c,
            "display": "inline-block",
            "top": obj.FrmTop + "px",
            "left": obj.FrmLeft + "px",
            "width": obj.FrmWidth + "px",
            "height": obj.FrmHeight + "px"
        }
        return styles;
    }

}

