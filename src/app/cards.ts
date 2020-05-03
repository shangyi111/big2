

export const getCardById = (id: number) => {
	const value = Math.floor(id / 4);
	const suit = id % 4;
	return {
		value,
		suit,
	}
}