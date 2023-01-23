export function classArrayToMap<V extends {id: K}, K extends string | number>(classObjects: Array<V>): Map<K, V> {
	return new Map(
		classObjects.reduce((acc: Array<[K, V]>, item: V): Array<[K, V]> => {
			acc.push([item.id, item]);
			return acc;
		}, [])
	);
}

export function mapToArray<K, V>(map: Map<K, V>): Array<V> {
	return Array.from(map.values());
}
