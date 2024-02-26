const dotenv = require('dotenv');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

dotenv.config();

const PROTO_PATH = process.env.PROTO_PATH;
const REMOTE_HOST = process.env.REMOTE_HOST;

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

console.info("Consumer service is started...");

const productService = grpc.loadPackageDefinition(packageDefinition).FileService;

function main(){
    let archivos = [ 'archivo1', 'archivo2', 'archivo3' ]
    const client = new productService(REMOTE_HOST, grpc.credentials.createInsecure());

    client.AddFile({archivos: archivos}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            console.log('Response received from remote service:', data);
        }
    })

    client.GetFile({archivo: "archivo1"}, (err, data) => {
        if(err){
            console.log(err);
        } else {
            console.log('Response received from remote service:', data);
        }
    })

}

main();

