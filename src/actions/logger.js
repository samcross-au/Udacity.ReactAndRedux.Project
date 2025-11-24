export const ENABLE_LOGGING = "ENABLE_LOGGING";
export const DISABLE_LOGGING = "DISABLE_LOGGING";

export function enableLogging(users) {
  return {
    type: ENABLE_LOGGING,
  };
}

export function disableLogging(users) {
  return {
    type: DISABLE_LOGGING,
  };
}