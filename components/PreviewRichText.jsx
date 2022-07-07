import React, { useCallback, useRef } from 'react'
import { createEditor } from 'slate';
import { withReact, Slate, Editable } from 'slate-react'

import { Element, Leaf } from './RteComponents'

const PreviewRichText = ({ initialValue, className }) => {
	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

	const editorRef = useRef();
	if (!editorRef.current)
		editorRef.current = withReact(createEditor());

	const editor = editorRef.current;

	return (
		<div>
			<Slate
				editor={editor}
				value={initialValue}
			>
				<Editable
					readOnly
					className={`${className}`}
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					spellCheck={false}
				/>
			</Slate>
		</div>
	)
}

export default PreviewRichText