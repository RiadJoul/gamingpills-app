import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../Shared/Button';
import { useUpdateProfileMutation } from '../../generated/graphql';
import useAuth from '../../services/useAuth';
import FeedbackModal from '../Modals/FeedbackModal';



const ImageEditor = () => {
    //@ts-ignore
    const { user }: User = useAuth();
    const [selectedFile, setSelectedFile] = useState<any>();
    const [preview, setPreview] = useState<any>();
    //graphql
    const [, updateProfile] = useUpdateProfileMutation();

    //responses
    const [errorField, setErrorField] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [success, setSucess] = useState<boolean>(false);
    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0])
    }

    const updateProfilePicture = async () => {
        setErrorField(null);
        setErrorMessage(null);
        const response = await updateProfile({ file: selectedFile });
        if (response.data?.updateProfile.errors) {
            setErrorField(response.data.updateProfile.errors[0].field);
            setErrorMessage(response.data.updateProfile.errors[0].message);
        }
        else {
            setSucess(true);
        }

    }


    return (
        <>
            <FeedbackModal
                title={"Success"}
                feedback={""}
                type={"success"}
                cancelText={"Close"}
                show={success}
                close={() => setSucess(false)}
            />

            <FeedbackModal
                title={errorField}
                feedback={errorMessage}
                type={"error"}
                cancelText={"Close"}
                show={errorField ? true : false}
                close={() => setErrorField(null)}
                onClick={() => { }}
            />
            {selectedFile ?

                <img
                    src={preview}
                    width={120}
                    height={120}

                    className="shadow-lg rounded-md"
                /> : user && [
                    user.avatar != null ? (

                        <Image
                            src={user.avatar}
                            width={100}
                            height={100}
                            objectFit={"cover"}
                            className="rounded-md"
                        />
                    ) : (
                        <Image
                            src="/images/profile.png"
                            width={100}
                            height={100}
                            className="rounded-md"
                        />
                    )
                ]
            }
            <div className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-primary bg-dark p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <label htmlFor="dropzone-file" >

                    <h2 className="mt-4 text-xl font-medium text-gray-200 tracking-wide">Profile</h2>

                    <p className="mt-2 text-gray-400 tracking-wide">Upload your file PNG, JPG or GIF. </p>
                </label>
                <input id="dropzone-file" type="file" className="hidden" onChange={onSelectFile} />

            </div>
            {selectedFile && <Button
                text={"Save"}
                textColor={"black"}
                bgColor={"white"}
                size={"medium"}
                width={"most"}
                onClick={() => updateProfilePicture()}
            />}
        </>
    );
}

export default ImageEditor;