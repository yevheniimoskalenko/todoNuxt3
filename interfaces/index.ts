interface Todo {
	id: number;
	title: string;
	description: string;
	priority: string;
	categoryId: number;
	performers: [object];
	responsiblePerson: object;
}

interface Board {
	id: number;
	title: string;
}

export type { Todo, Board };
