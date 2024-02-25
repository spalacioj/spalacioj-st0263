const dotenv = require('dotenv');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

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

const serviceProto = grpc.loadPackageDefinition(packageDefinition);

const HOST = '0.0.0.0:8080';
const files = []
const serverFiles = []

function GetFiles(call, callback){
    console.log('Request is received');
    callback(null, { archivos: files });
}

function AddFile(call, callback){
    let file = call.request.archivo;
    let ip = call.getPeer();
    files.push(file)
    serverFiles.push({ ip, file });
    console.log(serverFiles);
    callback(null, { status_code: 1 });
}

function main(){
    const server = new grpc.Server();
    server.addService(serviceProto.FileService.service, { GetFiles, AddFile });
    server.bindAsync(HOST, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err != null) {
          return console.error(err);
        }
        console.log(`gRPC listening on ${port}`)
    });
}

main();