import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SoftBreak from 'slate-soft-break';

import { Editor } from 'slate-react';
import { Value } from 'slate';

// import LinkIcon from 'components/icons/Link';
// import Image from 'components/icons/Image';
// import colors from 'utils/colors';

const Wrapper = styled.div`
  min-height: 6em;
  font-size: .875em;
  width: 100%;
  @media screen and (-webkit-min-device-pixel-ratio:0) {
    *[contenteditable="true"] {
      font-size: 16px;
    }
  }
`;

// const IconWrapper = styled.button`
//   color: white;
//   font-size: 1em;
//   appearance: none;
//   border: 0;
//   background: none;
//   svg {
//     color: white;
//   }
// `;
//
// const Toolbar = styled.div`
//   width: 100%;
//   display: flex;
//   flex-flow: row nowrap;
//   color: black;
// `;

const SlateArea = styled.div`
  background-color: white;
  width: 100%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
`;

const plugins = [
  SoftBreak(),
];

const initialValue = text => Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text,
              },
            ],
          },
        ],
      },
    ],
  },
});

function insertMarkup(change, type) {
  if (type === 'image') change.insertText(' ![Description]() ');
  if (type === 'link') change.insertText(' [Title]() ');
  change.select();
}


// Define our app...
class TextEditor extends React.Component {
  // Set the initial value when the app is first constructed
  state = {
    value: initialValue(this.props.text),
  };

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    this.setState({ value });
    const texts = value.document.nodes.map(val => val.text);
    this.props.save(texts.join('\n'));
  }

  handleLinkClick = () => {
    const type = 'link';
    const change = this.state.value.change().call(insertMarkup, type);
    this.onChange(change);
  }

  handleImageClick = () => {
    const type = 'image';
    const change = this.state.value.change().call(insertMarkup, type);
    this.onChange(change);
  }

  // Render the editor.
  render() {
    return (
      <Wrapper>
        <SlateArea>
          <Editor
            value={this.state.value}
            onChange={this.onChange}
            placeholder="说点什么…"
            plugins={plugins}
          />
        </SlateArea>
      </Wrapper>
    );
  }
}
TextEditor.propTypes = {
  text: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
};

export default TextEditor;
