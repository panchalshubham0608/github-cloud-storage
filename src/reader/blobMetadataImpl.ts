// imports
import IBlobMetadata from "./blobMetadata";

// defines the configuration for `BlobMetadata`
interface IBlobMetadataParams {
    name:string;
    path:string;
    sha:string;
    size:number;
    url:string;
    html_url:string;
    git_url:string;
    type: string;
};

// defines the implementation for `IBlobMetadata`
export default class BlobMetadata implements IBlobMetadata {
    // holds the properties
    private readonly params: IBlobMetadataParams;

    // constructor
    constructor(params: IBlobMetadataParams) {
        // initialize the properties
        this.params = {...params};
    }

    // retrieve the name of the blob
    Name(): string { return this.params.name; }

    // retrieve the path of the blob relative to the repository
    RelativePath(): string { return this.params.path; }

    // retrieve the sha of the blob
    SHA(): string { return this.params.sha; }

    // retrieve the size of the blob
    Size(): number { return this.params.size; }

    // retrieve the `url` of the blob
    Url(): string { return this.params.url; }

    // retrieve the `html_url` of the blob
    HTMLUrl(): string { return this.params.html_url; }

    // retrieves the `git_url` of the blob
    GitUrl(): string { return this.params.git_url; }

    // retrieves the `type` of the blob
    Type(): string { return this.params.type; }
};
