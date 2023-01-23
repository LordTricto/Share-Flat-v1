/* eslint-disable @typescript-eslint/no-explicit-any */
import {canShowPreReleaseFeatures} from "../utils/preReleaseConfig";
import {Navigate, Route} from "react-router-dom";
import React from "react";

interface Props {
	path: string;
	element: JSX.Element;
	exact?: boolean;
	isPreRelease?: boolean;
}

function AppRoute({path, element, isPreRelease = false}: Props): JSX.Element {
	if (isPreRelease && !canShowPreReleaseFeatures) {
		return <Route path="*" element={<Navigate to="/" replace />} />;
	}
	return <Route path={path} element={element} />;
}

export default AppRoute;
