import * as yup from 'yup';
const isNotEmptyObject = (error: string) =>
	yup.mixed().test('required', error, (value) => {
		if (value && !Object.keys(value).length) {
			return false;
		} else {
			return true;
		}
	});
export default function createTask(status = false) {
	return yup.object({
		title: yup.string().required('Назва повина бути зоповнена'),
		description: yup.string().required('Опис повинен бути заповнений'),
		performers: yup.array().min(1, 'Оберіть хоча б  одного виконавця'),
		priority: isNotEmptyObject('Пріорітет повинен бути обраним'),
		responsiblePerson: isNotEmptyObject('Відповідальна особа повинна бути обрана'),
		status: status ? isNotEmptyObject('Пріорітет повинен бути обраним') : yup.object().notRequired(),
	});
}
