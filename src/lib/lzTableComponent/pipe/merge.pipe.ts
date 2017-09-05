/**
 * name:两个数组中数据对象合并为一个数组(需要数组长度相同情况下)
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'merge'
})

export class MergePipe implements PipeTransform {
    transform(arrOne, arrTwo) {
        var arr = [];
        if (Array.isArray(arrOne) && Array.isArray(arrTwo) && arrOne.length === arrTwo.length) {
            arrOne.forEach((element, i) => {
                arr.push({ paramOne: element, paramTwo: arrTwo[i] })
            });
            return arr;
        } else return arr;
    }
}