// `IBlobReader` allows you to read contents of a blob
export default interface IBlobReader {
    // retrieve the name of the repository under which blob lies
    RepositoryName(): string

    // retrieve the path of the blob relative to the repository
    Path(): string

    // retrieve the content of the blob 
    Read(): Promise<string>
}
