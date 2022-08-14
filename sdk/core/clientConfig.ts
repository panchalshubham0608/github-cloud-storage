// Defines the prototype for Clientconfiguration
interface IClientConfig {
    readonly repository: string;
    readonly token: string;
    timeout?: number;
    timeoutErrorMessage?: string;
}

// export the declaration
export default IClientConfig;
