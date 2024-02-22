const dotenv = require('dotenv');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

dotenv.config();

const PROTO_PATH = process.env.PROTO_PATH;


const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const serviceProto = grpc.loadPackageDefinition(packageDefinition); //solo se le agrega un . si hay un package

const HOST = '0.0.0.0:8080';

function AddProduct(call, callback) {
    console.log('Request is received:', call.request);
    callback(null, { status_code: 1 });
  }

function main(){
    const server = new grpc.Server();
    server.addService(serviceProto.ProductService.service, { AddProduct });
    server.bindAsync(HOST, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err != null) {
          return console.error(err);
        }
        console.log(`gRPC listening on ${port}`)
      });
}

main();
