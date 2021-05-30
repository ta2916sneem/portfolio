import React, {FC, useState} from 'react';
import Layout from "../Layouts/Layout";

const ImageUpload: FC = () => {

    const [state, setState] = useState<any>({
        selectedFile: null
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setState({selectedFile: event.currentTarget.files![0]});
        console.log(event.currentTarget.files![0]);
    }

    const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // const url = `/upload/image`;
        // const formData = new FormData();
        // formData.append('file', state.selectedFile)
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // }
        // try{
        //     const result = await axios.post(url, formData, config);
        //     console.log("File uploaded successfully");
        //     console.log(result.data);
        // }catch (error){
        //     console.log("Error Uploading image file");
        // }
    }

    return (
        <Layout className={"container px-16"}>
            <div className={"flex justify-center"}>
                <form
                    className={"flex flex-col item-center "}
                    onSubmit={handleFileUpload}
                >
                    <input name={"file"} type={"file"} id={"file"} onChange={event => handleFileChange(event)}/>
                    <button className={"px-4 py-2 focus:outline-none" +
                    " transition transform duration-400 bg-gray-900 text-white font-montserrat" +
                    " rounded my-8" +
                    " hover:opacity-80"} type={"submit"}>Upload Image</button>
                    {/*<img src={`/upload/singleImage/18ad9a62e876ac27a669112a99f6896f.jpg`} alt={"My Image"}/>*/}
                </form>
            </div>
        </Layout>
    )
}

export default ImageUpload;