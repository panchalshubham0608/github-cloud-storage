// defines the metadata of a blob (type: 'file')
export default interface IBlobMetadata {
    // retrieve the name of the blob
    Name(): string;

    // retrieve the path of the blob relative to the repository
    RelativePath(): string;

    // retrieve the sha of the blob
    SHA(): string;

    // retrieve the size of the blob
    Size(): number;

    // retrieve the `url` of the blob
    Url(): string;

    // retrieve the `html_url` of the blob
    HTMLUrl(): string;

    // retrieves the `git_url` of the blob
    GitUrl(): string;
}
