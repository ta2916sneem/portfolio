
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import "./Editor.css";
import React, {useState, forwardRef} from "react";
// @ts-ignore
const Quill = ReactQuill.Quill
let Font = Quill.import("formats/font");
Font.whitelist = ["Roboto", "Raleway", "Montserrat", "Lato", "Rubik", "Quicksand"];
Quill.register(Font, true);

export const BLOG_CONTENT_SAVED = "BLOG_CONTENT_SAVED";

type Props = {
    content: string
};

const modules = {
    toolbar: {
        container:  [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
            [{ size: [ 'small', false, 'large', 'huge' ]}],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': Font.whitelist }],
            [{ 'align': [] }],
            ['image'],['video'],
            ['link'],
            ['clean']                                         // remove formatting button
        ],
        handlers: {
            image: function (){
                // @ts-ignore
                const range = this.quill.getSelection();
                const value = prompt('What is the image URL');
                if(value){
                    // @ts-ignore
                    this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
                }
            },
        }
    },
    clipboard: { matchVisual: false },
    syntax: true
};

const formats = [
    "align", "background", "blockquote", "bold",
    "code", "color", "direction", "font", "formula",
    "header", "image", "indent", "italic", "link",
    "list", "script", "size", "strike", "table", "underline",
    "video", "code-block"
];

const Editor = forwardRef<ReactQuill, Props>(({content}, editorRef) => {

    const [quillText, setQuillText] = useState<string>(content);

    const handleChange = (val:any) => {
        setQuillText(val);
    }

    return (
        <div className={"w-full mb-8 shadow-drop"}>
            <ReactQuill
                value={quillText}
                onChange={(val) => handleChange(val)}
                theme={"snow"}
                modules={modules}
                formats={formats}
                ref={editorRef}
                defaultValue={content}
                placeholder={"Write Something..."}
            />
        </div>
    )
});


export default Editor;