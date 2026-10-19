import { useState, useEffect } from 'react';

export default function ViewCounter() {
	const [views, setViews] = useState<string | number>('...');

	useEffect(() => {
		const fetchViews = async () => {
			try {
				// Прямой запрос к вашему воркспейсу и счетчику
				const response = await fetch('https://counterapi.dev');

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const res = await response.json();

				// Проверяем структуру ответа v2
				if (res && res.data && typeof res.data.up_count !== 'undefined') {
					setViews(res.data.up_count);
				} else if (res && typeof res.count !== 'undefined') {
					setViews(res.count);
				}
			} catch (error) {
				console.error('Ошибка счетчика:', error);
				setViews('sys error');
			}
		};

		fetchViews();
	}, []);

	return <span id="view-count">{views}</span>;
}
