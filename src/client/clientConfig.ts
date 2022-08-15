// Defines the prototype for Clientconfiguration
export default interface IClientConfig {
    readonly repository: string;
    readonly owner:string;
    readonly token: string;
    timeout?: number;
    timeoutErrorMessage?: string;
}
