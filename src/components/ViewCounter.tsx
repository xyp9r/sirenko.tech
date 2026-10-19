import { useState, useEffect } from 'react';
import { Counter } from 'counterapi';

export default function ViewCounter() {
	const [views, setViews] = useState<string | number>('...');

	useEffect(() => {
		console.log("Запустился")
		const fetchViews = async () => {
			try {
				// Инициализация клиента
				const counterClient = new Counter({ workspace: 'sirenkos-team-5961' });

				const response = await counterClient.up('first-counter-5961');

				console.log("Ответ от сервера:", response);
				if (response && typeof response.count !== 'undefined') {
					setViews(response.count);
				}
			} catch (error) {
				console.error( 'Ошибка счетчика:' ,error);
				setViews('sys error');
			}
		};

		fetchViews();
	}, []); // Вызываем один раз

	return <span id="view-count">{views}</span>
}