export interface Report {
    id : number;
    senderReportId: number;
    senderReportName: string;
    reason: string[];
    reportDate: string;
    recipientReportId: number;
    recipientReportName: string;
}
