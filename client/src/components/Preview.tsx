import { useState, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface PreviewProps {
	text: string;
}

export default function Preview({ text }: PreviewProps) {
	const [parsed, setParsed] = useState<string>("");

	useEffect(() => {
		const parseMarkdown = async () => {
			const markdownHtml = await marked(text);
			const sanitizedHtml = DOMPurify.sanitize(markdownHtml);
			setParsed(sanitizedHtml);
		};

		parseMarkdown();
	}, [text]);

	return (
		<div className="overflow-auto font-head">
			<div
				className="font-serif "
				dangerouslySetInnerHTML={{ __html: parsed }}
			/>
		</div>
	);
}
