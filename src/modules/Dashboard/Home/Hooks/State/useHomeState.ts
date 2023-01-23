export interface UseSingleTransferInterface {
	isSinglePaymentLoading: boolean;
}

// function useSingleTransfer(): UseSingleTransferInterface {
// const dispatch = useDispatch();
// const [isSinglePaymentLoading, setIsSinglePaymentLoading] = useState(false);
// const [singlePaymentResponse, setSinglePaymentResponse] = useState<SinglePaymentResponse | null>(null);
// const [singlePaymentError, setSinglePaymentError] = useState<boolean>(false);

// const handleSingleTransfer = useCallback(
// async (_data) => {
// try {
// setIsSinglePaymentLoading(true);
// setSinglePaymentError(false);
// const res = await singlePaymentInit(_data);
// setSinglePaymentResponse({
// transactionId: res.transaction.id,
// isApproved: res.isApproved,
// processing: res.processing,
// accountsToActivate: res.accountsToActivate,
// });
// dispatch(
// setSingleTransferResponse({
// transactionId: res.transaction.id,
// isApproved: res.isApproved,
// processing: res.processing,
// accountsToActivate: res.accountsToActivate,
// })
// );
// dispatch(setSingleTransaction(res.transaction));
// } catch (err) {
// if (err instanceof RequestCancelledError) {
// return; // do nothing
// }
// const errorMessage = getErrorMessage(err);
// dispatch(errorTrue({message: errorMessage}));
// setSinglePaymentError(true);
// }
// setIsSinglePaymentLoading(false); // set outside catch block, because finally will ignore the return in catch block
// },
// [dispatch]
// );

// return {
// isSinglePaymentLoading,
// singlePaymentResponse,
// singlePaymentError,
// handleSingleTransfer,
// };
// }

// export default useSingleTransfer;
