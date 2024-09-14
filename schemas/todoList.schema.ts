import * as yup from 'yup';
export default function createBoard() {
	return yup.object({
		title: yup.string().required('Назва повина бути зоповнена'),
	});
}
