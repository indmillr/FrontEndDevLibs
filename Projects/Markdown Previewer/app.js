import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
const defText = `
# Heading 1

## Heading 2

### Link

Check out [my GitHub](https://github.com/indmillr)!

### Mandatory 'Code Block' Test:
        console.log('Hello World!');
        console.log('Jello World!');
        console.log('MelloW orld!');

### Mandatory 'Inline Code' Test:

Look right here! Here it is!: \`<textarea />\` .

### List

- List Item #1
- List Item #2
- List Item #3

### Blockquote

> I was never into smart college boy music.

### Image

![Markdown Logo](https://pixabay.com/get/g4734f61b87b211e4a97aa25b97a1cd87b6b69507b14006b9680d0ce1748830561aada9b89239e4e57d035209c46628c32460bdb25901dce78885ec8036dca63d29d672b5588ff7b7529574f8aa82e0cd_640.jpg "Baron Weasel")

### Bold Text

Bold Text feels like **another way for folks to yell on the internet**.
`;

marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();

const Edit = ({ text, setText }) => {
  return (
    <div className='content'>
      <textarea
        id='editor'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

const Preview = ({ text }) => {
  return (
    <div>
      <div
        className='content'
        id='preview'
        dangerouslySetInnerHTML={{
          __html: marked(text, { renderer: renderer }),
        }}
      ></div>
    </div>
  );
};

const App = () => {
  const [text, setText] = React.useState(defText);

  return (
    <>
      <Edit text={text} setText={setText} />
      <Preview text={text} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("mdpreviewer"));
