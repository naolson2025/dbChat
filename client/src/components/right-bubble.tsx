interface RightBubbleProps {
	text: string;
}

export const RightBubble = (props: RightBubbleProps) => {
	return (
		<li className="max-w-lg ms-auto flex justify-end gap-x-2 sm:gap-x-4">
			<div className="grow text-end space-y-3">
				<div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
					<p className="text-sm text-white">{props.text}</p>
				</div>
			</div>
		</li>
	);
};
