import {useEffect, useState} from "react";

interface Props<T> {
	items: T[] | null;
	total: number;
	isDataLoading: boolean;
	itemsPerPage: number;
	isPaginationLoading: boolean;
	newRequestFunc: (offset: number) => void;
	handlePaginationLoadingDone: () => void;
}
function usePagination<T>({
	itemsPerPage = 500,
	items,
	total,
	isPaginationLoading,
	isDataLoading,
	newRequestFunc,
	handlePaginationLoadingDone,
}: Props<T>): {
	currentItems: T[] | null;
	pageCount: number;
	itemOffset: number;
	endOffset: number;
	handlePageClick: (event: {selected: number}) => void;
	handleResetPaginatedResult: () => void;
} {
	// We start with an empty list of items.
	const [currentItems, setCurrentItems] = useState<T[] | null>(null);
	// const [isEmpty, setIsEmpty] = useState<boolean>(false);
	const [pageCount, setPageCount] = useState(0);
	// Here we use item offsets; we could also use page offsets
	// following the API or data you're working with.
	const [itemOffset, setItemOffset] = useState(0);
	const [endOffset, setEndOffset] = useState(0);

	useEffect(() => {
		// Fetch items from another resources.
		if (!items || !total || !itemsPerPage) {
			return setCurrentItems(null);
		}

		let newEndOffset: number;
		if (itemOffset + itemsPerPage > total) {
			newEndOffset = total;
		} else {
			newEndOffset = itemOffset + itemsPerPage;
		}
		// if we were getting all the data at once, this would have been ideal
		setCurrentItems(items.slice(0, itemsPerPage));
		setPageCount(Math.ceil(total / itemsPerPage));
		setEndOffset(newEndOffset);
	}, [itemOffset, itemsPerPage, items, total, isPaginationLoading, isDataLoading]);

	useEffect(() => {
		if (!items || !currentItems || !isPaginationLoading) return;
		if (currentItems.length === items.length) {
			handlePaginationLoadingDone();
		}
	}, [items, currentItems, isPaginationLoading]);

	// Invoke when user click to request another page.
	const handlePageClick = (event: {selected: number}) => {
		const newOffset = (event.selected * itemsPerPage) % total;
		setItemOffset(newOffset);
		newRequestFunc(itemsPerPage * event.selected);
		setCurrentItems(null);
	};

	const handleResetPaginatedResult = () => {
		setCurrentItems(null);
	};

	return {itemOffset, endOffset, currentItems, pageCount, handlePageClick, handleResetPaginatedResult};
}

export default usePagination;
