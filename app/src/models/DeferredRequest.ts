class DeferredRequest<TValue> {

    private request: () => Promise<TValue>;
    private success: (value: TValue) => void;
    private error: (e: any) => void;

    constructor(
        request: () => Promise<TValue>, 
        success: (value: TValue) => void,
        error: (e: any) => void) {

        this.request = request;
        this.success = success;
        this.error = error;
    }

    /**
     * Executes the request
     * @param finished callback method that is called when the request is finished
     */
    public execute(finished: () => void) {
        this.request().then((value) => {
            this.success(value);
        }).catch((e) => {
            this.error(e);
        }).finally(() => {
            finished();
        });
    }
}

export default DeferredRequest;