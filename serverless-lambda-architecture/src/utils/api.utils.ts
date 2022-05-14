import middy from '@middy/core';
import { APIGatewayProxyResult, Handler } from 'aws-lambda';
import { errorHandler, initializeContext, parseRequest } from '../controllers/middlewares';
import { AppRequest } from '../types/api.types';
import { AppError } from './errors.utils';

export function Response<Data = any>({
  data,
  statusCode = 200,
  headers,
  multiValueHeaders,
}: Partial<Omit<APIGatewayProxyResult, 'body' | 'isBase64Encoded'>> & {
  data: Data;
}): APIGatewayProxyResult {
  return {
    body: JSON.stringify(data),
    statusCode,
    headers,
    multiValueHeaders,
  };
}

export function route<Body = any>(handler: Handler<AppRequest<Body>, APIGatewayProxyResult>) {
  return middy<AppRequest<Body>, APIGatewayProxyResult, AppError>(handler).use([
    parseRequest,
    initializeContext,
    errorHandler,
  ]);
}
