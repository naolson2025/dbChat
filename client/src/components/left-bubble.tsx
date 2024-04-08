interface LeftBubbleProps {
  text: string;
}

export const LeftBubble = (props: LeftBubbleProps) => {
	return (
		<li className="max-w-lg flex gap-x-2 sm:gap-x-4">
			<div className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
				<p className="text-sm text-gray-800 dark:text-white">
					{props.text}
				</p>
			</div>
		</li>
	);
};
