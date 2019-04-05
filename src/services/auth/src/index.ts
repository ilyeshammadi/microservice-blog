// @ts-ignore
import { Server } from '../common/js/grpc';
import * as service from './endpoints'

const PROTO_PATH = './common/proto/auth/service.proto';

new Server({
    protoFilePath: PROTO_PATH,
    service
}).start();
