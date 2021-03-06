import { writable, readable } from 'svelte/store';
import type { category, todo } from './interfaces';

export const todoList = writable(new Array<todo>());
export const categoryList = writable(new Array<category>());
export const categoryID = writable(0);
export const categoryTEXT = writable('');
export const apiBaseUrl = readable(import.meta.env.VITE_API_URL);
export const at = writable('');
export const modal = writable(null);
export const modalShown = writable(false);
export const hideEmpty = writable(true);
