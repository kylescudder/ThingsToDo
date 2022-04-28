export interface todo {
	text: string;
	targetDate: Date;
	targetDateString: string;
	completed: boolean;
	id: number;
	categoryId: number;
}
export interface category {
	id: number;
	text: string;
	toDoCount: number;
}