const dotenv = require('dotenv');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

dotenv.config();

const PROTO_PATH = process.env.PROTO_PATH;
const HOST = process.env.HOST;

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


let files = [];


function AddFile(call, callback){
    let listFiles = call.request.archivos;
    for(let i=0; i<listFiles.length; i++) {
        let file = listFiles[i];
        if(!files.includes(file)){
            files.push(file);
        }
    }
    console.log(files);
    callback(null, { });
}

function GetFile(call, callback) {
    let IndexFile = files.indexOf(call.request.archivo)
    let file = files[IndexFile]
    callback(null, { Nombre: file, linkDescarga: 'www.descargararchivo.com' })
}

function main(){
    const server = new grpc.Server();
    server.addService(serviceProto.FileService.service, { AddFile, GetFile });
    server.bindAsync(HOST, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err != null) {
          return console.error(err);
        }
        console.log(`gRPC listening on ${port}`)
    });
}

main();