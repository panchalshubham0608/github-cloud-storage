import Client from "./src/client/clientImpl";

let client = new Client({
    token: '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',
    repository: 'repo1'
});

console.log(client.RepositoryName());
let reader = client.Reader('blob1');
reader.Read().then(_ => {
    console.log('OK');
}).catch(err => {
    console.log(err);
});
