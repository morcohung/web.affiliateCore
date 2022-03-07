export const moduleName = 'Payment';

export interface PaymentState  {
    PaymentInfo : PaymentInfo
}

export interface PaymentInfo {
    Amount: number,
    CommRcvOpt: string;
    CommRcvList:[{
        FieldName: string,
        Description: string,
        Support: boolean,
        Data:[{
            FieldName: string,
            FieldValue: string,
            Description: string,
        }];
    }];
}