import axios from 'axios';
import { useState, useEffect } from 'react';

function useFetch(url) {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!url) return;

		setLoading(true);
		setError(null);

		axios
			.get(url)
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => {
				setError(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [url]);

	return { data, loading, error };
}

export { useFetch };
