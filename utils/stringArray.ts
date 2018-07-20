export class StringArray {
    public static transformNumberToStringSum(sum:number|string):string{
        const regValue:any = /(\d)(?=(\d{3})+(?!\d))/g;
        const tempArr: string = sum.toString().replace(regValue,'$1 ');
        return tempArr;
    }
}