import { NextFunction, Request, Response } from "express";

const serviceErrorToStatusCode = {
  unauthorized: 401,
  forbidden: 403,
  not_found: 404,
  conflict: 409
};

const serviceErrorToMessage = {
  unauthorized: "Unauthorized.",
  forbidden: "Forbidden.",
  not_found: "Not found.",
  conflict: "This already exists."
};

export function errorHandlerMiddleware(error: {type: string}, req: Request, res: Response, next: NextFunction) {
  console.log(error);
  if(error.type) {
    return res.status(serviceErrorToStatusCode[error.type]).send(serviceErrorToMessage[error.type]);
  }
  
  return res.sendStatus(500);
}

function unauthorized() {
  return {type: "unauthorized"};
}

function forbidden() {
  return {type: "forbidden"};
}

function conflict() {
  return {type: "conflict"};
}

function notFound() {
  return {type: "not_found"};
}

const errorHandler = {
  errorHandlerMiddleware,
  unauthorized,
  forbidden,
  conflict,
  notFound
}

export default errorHandler;