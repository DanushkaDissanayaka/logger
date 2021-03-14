/**
 * Types for http call back
 */
export type HttpCallback<T> = (val: T) => void;
export type ErrorCallback<E> = (val: E) => void;