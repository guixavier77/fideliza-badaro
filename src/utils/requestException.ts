class RequestException extends Error {
  constructor(public status: number, public msg: any) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, RequestException.prototype);
  }
}

export default RequestException;
