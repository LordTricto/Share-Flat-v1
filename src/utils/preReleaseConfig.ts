export const canShowPreReleaseFeatures =
	process.env.NODE_ENV === "development" || !!Number(process.env.REACT_APP_ENABLE_PRE_RELEASE_FEATURES) || false;
