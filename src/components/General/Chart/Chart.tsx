import "chartjs-adapter-date-fns";

import {CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, TimeScale, Tooltip} from "chart.js";
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";

import {ChartArea} from "chart.js/types/geometric";
import {ChartJSOrUndefined} from "react-chartjs-2/dist/types";
import {Line} from "react-chartjs-2";
import isNullOrUndefined from "../../../utils/isNullOrUndefined";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, TimeScale, Filler, Tooltip, Legend);

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea, setGradientMix: Dispatch<SetStateAction<CanvasGradient | string>>) {
	const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
	gradient.addColorStop(1, "rgba(84, 102, 249, 1)");
	gradient.addColorStop(0.2, "rgba(84, 102, 249, 0.05)");
	gradient.addColorStop(0, "rgba(84, 102, 249, 0)");
	return setGradientMix(gradient);
}

interface ChartCanvasProps {
	data: Array<{date: string; balance: number}>;
	numPoints?: number;
}

function ChartCanvas({data, numPoints}: ChartCanvasProps): JSX.Element {
	const chartRef = useRef<ChartJSOrUndefined<"line">>(null);

	const [gradientMix, setGradientMix] = useState<CanvasGradient | string>("");
	const [dateArray, setDateArray] = useState<string[]>([]);
	const [valueArray, setValueArray] = useState<number[]>([]);
	const [noAmount, setNoAmount] = useState<boolean>(false);

	useEffect(() => {
		const endIndex = !isNullOrUndefined(numPoints) ? numPoints : data.length;
		const sliceData = data.slice(0, endIndex);
		setDateArray(sliceData.map((item) => item.date));
		setValueArray(sliceData.map((item) => item.balance));
	}, [data]);

	useEffect(() => {
		const chart: ChartJSOrUndefined<"line"> | null = chartRef.current;
		if (!chart) {
			return;
		}
		createGradient(chart.ctx, chart.chartArea, setGradientMix);
	}, []);

	useEffect(() => {
		const totalAmount = valueArray.reduce((acc, cur) => {
			return acc + cur;
		}, 0);
		totalAmount > 0 ? setNoAmount(false) : setNoAmount(true);
	}, [valueArray]);

	return (
		<Line
			type="line"
			ref={chartRef}
			data={{
				labels: dateArray,
				datasets: [
					{
						fill: true,
						label: "",
						data: valueArray,
						// tension: 1,
						borderColor: "rgb(84,102,249)",
						borderWidth: noAmount ? 1 : 0,
						backgroundColor: gradientMix,
						// pointBackgroundColor: "white",
						pointRadius: 0,
						pointHoverRadius: 0,
					},
				],
			}}
			height="100%"
			// width={600}
			options={{
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						display: false,
						// type: "time",
						// time: {
						//   unit: "day",
						// },
					},
					y: {
						beginAtZero: false,
						display: false,
						// min: -100,
						// max: 100,
						grid: {
							display: false,
						},
						ticks: {
							// stepSize: 50000004517,

							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							beginAtZero: false,

							// Include a dollar sign in the ticks
							callback: function (value) {
								const valueLegend = this.getLabelForValue(Number(value));
								const valueLegendRep = valueLegend.split(".")[0].replaceAll(",", "");
								if (valueLegendRep.length === 15) {
									return valueLegendRep.substring(0, 3) + "T";
								}
								if (valueLegendRep.length === 14) {
									return valueLegendRep.substring(0, 2) + "T";
								}
								if (valueLegendRep.length === 13) {
									return valueLegendRep.substring(0, 1) + "T";
								}
								if (valueLegendRep.length === 12) {
									return valueLegendRep.substring(0, 3) + "B";
								}
								if (valueLegendRep.length === 11) {
									return valueLegendRep.substring(0, 2) + "B";
								}
								if (valueLegendRep.length === 10) {
									return valueLegendRep.substring(0, 1) + "B";
								}
								if (valueLegendRep.length === 9) {
									return valueLegendRep.substring(0, 3) + "M";
								}
								if (valueLegendRep.length === 8) {
									return valueLegendRep.substring(0, 2) + "M";
								}
								if (valueLegendRep.length === 7) {
									return valueLegendRep.substring(0, 1) + "M";
								}
								if (valueLegendRep.length === 6) {
									return valueLegendRep.substring(0, 3) + "K";
								}
								if (valueLegendRep.length === 5) {
									return valueLegendRep.substring(0, 2) + "K";
								}
								if (valueLegendRep.length === 4) {
									return valueLegendRep.substring(0, 1) + "K";
								}
								if (valueLegendRep.length === 3) {
									return valueLegendRep.substring(0, 3) + "H";
								}
								if (valueLegendRep.length === 2) {
									return valueLegendRep;
								}
								if (valueLegendRep.length === 1) {
									return valueLegendRep;
								}
							},
							gridLines: {
								display: false,
							},
						},
					},
				},
				interaction: {
					intersect: false,
					mode: "index",
				},
				plugins: {
					legend: {
						display: false,
						// labels: {
						//   fontSize: 25,
						// },
					},
					tooltip: {
						callbacks: {
							title: (context) => {
								const d = new Date(context[0].label);
								const dayDate = d.toLocaleString([], {
									day: "numeric",
								});
								const monthDate = d.toLocaleString([], {
									month: "short",
								});
								const yearDate = d.toLocaleString([], {
									year: "numeric",
								});
								return `${dayDate} ${monthDate}, ${yearDate}`;
							},
						},
					},
				},
			}}
		/>
	);
}

export default ChartCanvas;
