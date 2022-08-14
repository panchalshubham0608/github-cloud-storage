// `IBlobReader` allows you to read contents of a blob
interface IBlobReader {
    // retrieve the name of the repository under which blob lies
    RepositoryName(): string

    // retrieve the path of the blob relative to the repository
    Path(): string
}

// export the `IBlobReader` type
export default IBlobReader;
