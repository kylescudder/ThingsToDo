export interface todo {
	text: string;
	targetDate: Date;
	targetDateString: string;
	completed: boolean;
	id: number;
	categoryId: number;
}
export interface categoryList {
	id: number;
	text: string;
	toDoCount: number;
}