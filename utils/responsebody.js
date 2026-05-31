const makeSuccessResponseBody = (overrides = {}) => ({
  err: {},
  data: {},
  message: 'Successfully processed the request',
  success: true,
  ...overrides
});

const makeErrorResponseBody = (overrides = {}) => ({
  err: {},
  data: {},
  message: 'Something went wrong, cannot process the routes',
  success: false,
  ...overrides
});

// Backwards-compatible exports for existing service/controller imports
const successResponseBody = makeSuccessResponseBody();
const errorResponseBody = makeErrorResponseBody();

export {
  makeSuccessResponseBody,
  makeErrorResponseBody,
  successResponseBody,
  errorResponseBody
};

