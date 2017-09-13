export interface LZTab {
    formName:string;
    titleArray?:Array<any>;//字段信息
    titleElementArray?:Array<any>;//标题信息
    imgElementArr?:Array<any>;//img信息
    
    isSubForm:boolean;//是否子表
    subFormResid?:string;//子表资源ID
    subFormLayout?:string;//子表布局方式
    dataArray?:Array<any>;//附表数据组
    formHeight?:string;//form 高度
}