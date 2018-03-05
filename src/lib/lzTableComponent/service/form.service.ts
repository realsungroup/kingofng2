import { Injectable } from '@angular/core';
import { FormItemElementEM, FormItemTypeEM } from '../enum/form-item.enum';
import { retry } from 'rxjs/operators/retry';

@Injectable()
export class FormService {

    imgElementAddColName(data: Array<any>): Array<any> {
        data.forEach(item => {
            let frmColName = item.FrmColName;
            let index = frmColName.lastIndexOf("__") + 2;
            item['lzImgUrl'] = '';
            if (index >= 0) item.lzImgUrl = frmColName.substring(index, frmColName.length);
        })
        return data;
    }

    elementAddColName(data: Array<any>): Array<any> {
        data.forEach(item => {
            let frmColName = item.FrmColName;
            let index = frmColName.lastIndexOf("__") + 2;
            if (index >= 0) item.ColName = frmColName.substring(index, frmColName.length);
        })
        return data;
    }

    fixTitleForType(titleArr: Array<any>, imgElementArr: Array<any>, type): Array<any> {
        imgElementArr.forEach(imgEle => {
            titleArr.forEach(titleItem => {
                if (titleItem['ColName'] == imgEle['ColName']) {
                    switch (type) {
                        case FormItemElementEM.ImageForUrlCol:
                            titleItem['ColValType'] = FormItemTypeEM.ImageSelect;
                            break;
                        case FormItemElementEM.ImageForInputform:
                            titleItem['ColValType'] = FormItemTypeEM.ImgCamera;
                            break;
                    }
                }
            })
        })
        return titleArr;
    }

    fixTabsTitleArr(data, tab) {
        let specilTitleArr = [FormItemElementEM.ImageForUrlCol, FormItemElementEM.ImageForInputform];
        specilTitleArr.forEach(type => {
            let elementArr = data.data.columns.filter(item => item.FrmFieldFormType == type);
            // console.info("elementArr",elementArr);
            elementArr = this.elementAddColName(elementArr);
            // console.info("elementArr",elementArr);
            tab.titleArray = this.fixTitleForType(tab.titleArray, elementArr, type);
        })
        return tab;
    }

    fixTabsTitleArrOnlyForImage(data, tab) {
        let specilTitleArr = [FormItemElementEM.ImageForUrlCol];
        specilTitleArr.forEach(type => {
            let elementArr = data.data.columns.filter(item => item.FrmFieldFormType == type);
            elementArr = this.elementAddColName(elementArr);
            tab.imgElementArr = elementArr
        })
        return tab;
    }
}