export interface todo {
	text: string;
	targetDate: Date;
	targetDateString: string;
	completed: boolean;
	id: number;
	categorieId: number;
}
export interface categoryList {
	id: number;
	text: string;
	toDoCount: number;
}