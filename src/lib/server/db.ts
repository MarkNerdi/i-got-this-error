import { PRIVATE_DB_CONNECTION_STRING } from '$env/static/private';
import type { StatusCode } from '$lib/server/status/status-code.type';
import { MongoClient } from 'mongodb';

const client = new MongoClient(PRIVATE_DB_CONNECTION_STRING);
export const db = client.db();

export const mongoClient = client.connect();

export const statusCodeCollection = db.collection<StatusCode>('StatusCode');
