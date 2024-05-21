export enum HttpStatus {
    Ok = "OK",
    MultiStatus = "MULTI_STATUS",
    BadRequest = "BAD_REQUEST",
    Unauthorized = "UNAUTHORIZED",
    Forbidden = "FORBIDDEN"
}

export interface ErrorDetail {
    code: string;
    message: string;
    statusCode?: HttpStatus;
    item?: any;
};

export interface BaseGetResponse {
	id: string;
	createdAt: string;
	updatedBy?: string;
}

export interface BaseCreateUpdateResponse {
	id: string;
    error: ErrorDetail;
}


