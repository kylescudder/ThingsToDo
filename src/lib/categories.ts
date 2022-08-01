import { categoryList, apiBaseUrl, categoryTEXT, modal, hideEmpty } from '$lib/stores';
import type { todo } from './interfaces';
import { getToDo } from './todo';
import tippy, { animateFill } from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away-subtle.css';

let payloadApiBaseUrl = '';
apiBaseUrl.subscribe((value) => {
	payloadApiBaseUrl = value;
});
export let todos: Array<todo> = [];

export const categoriesPopulate = async (at: string) => {
	const categoriesResponse = await fetch(`${payloadApiBaseUrl}/categories`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			authorization: `Bearer ${at}`
		}
	});
	const categoriesPayload = await categoriesResponse.json();
	categoryList.set(categoriesPayload.payload);
};
export const addCategory = async (newCategory: string, at: string) => {
	todos = [];
	const response = await fetch(`${payloadApiBaseUrl}/category`, {
		method: 'POST',
		body: JSON.stringify({
			categoryText: newCategory
		}),
		headers: {
			'content-type': 'application/json',
			authorization: `Bearer ${at}`
		}
	});
	let categoryId: number;
	if (response.status === 200) {
		const payload = await response.json();
		categoryId = payload.data.categoryId;
		categoriesPopulate(at).catch(() => {
			console.log('Getting categories failed');
		});
		categoryTEXT.set(newCategory);
		await getToDo(categoryId, at);
	} else {
		alert('Failed to add category');
	}
	modal.set(null);
};
export const hideShowButtonTooltip = () => {
	tippy('.hideShowCategories', {
		content: 'Hide or Show categories with no To Dos currently in it.',
		placement: 'right',
		inertia: true,
		animation: 'shift-away-subtle',
		animateFill: true,
		plugins: [animateFill],
		delay: [350, null]
	});
};

export const hideEmptyCategories = (e: MouseEvent) => {
	const target = e.target as HTMLElement;
	if (target !== null) {
		const categoryHeader = document.querySelectorAll('.categoryHeader');
		if (target.closest('.hideShowCategories')?.classList.contains('hiddenCategory')) {
			hideEmpty.set(false);
			showHide(categoryHeader, 'remove');
		} else {
			hideEmpty.set(true);
			showHide(categoryHeader, 'add');
		}
	}
};
const showHide = (categoryHeader: NodeListOf<Element>, action: string) => {
	if (categoryHeader != null) {
		categoryHeader.forEach((element) => {
			if (action === 'remove') {
				element.classList.remove('hidden');
			} else {
				const dataCount = element.getAttribute('data-count');
				if (dataCount !== null) {
					if (dataCount.toString() === '0') element.classList.add('hidden');
				}
			}
		});
	}
	setTimeout(() => {
		hideShowButtonTooltip();
	}, 200);
};
