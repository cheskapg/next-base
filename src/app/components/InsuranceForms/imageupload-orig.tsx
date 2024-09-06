
    import { useEffect, useState } from 'react';

    export default function ImageUpload({
        id,
        name,
        label,
        error,
        value,
        setValue,
        touchedImage,
        setError,
        onError,
        setInsuranceImage,
    }: {
        id: string;
        name: string;
        label: string;
        error: boolean;
        touchedImage?: boolean;
        value: string | null;
        onError: (error: boolean) => void;

        setValue: (val: string | null) => void;
        setError: (err: boolean) => void;
        setInsuranceImage: any;
    }) {
        const [imageUpload, setImageUpload] = useState(false);
        const [localError, setLocalError] = useState(false);
        const [errorUpload, setErrorUpload] = useState(false);
        const [image, setImage] = useState<File | null>(null);
    
        const loadUploadedImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const input = event.target;
            const file = input.files?.[0];
            const output = document.getElementById(id + 'Image') as HTMLImageElement;
    
            if (file) {
            const type = file.type;
    
            if (output && type.match('(jpg|jpeg|png|gif)$')) {
                output.src = URL.createObjectURL(file);
                setImage(file);
                setInsuranceImage(file);
    
                // Sync with Formik
                setValue(URL.createObjectURL(file));
                setLocalError(false);
                setError(false);
                onError(false);

                setImageUpload(true);
            } else {
                setLocalError(true);
                setError(true);
                onError(true);

                setValue(''); // Set to null instead of empty string
                setImageUpload(false);
            }
            } else {
            // Handle case where file is not selected
            setLocalError(true);
            setError(true);
            onError(true);

            setValue(null);
            }
        } catch (exception) {
            console.error(exception);
            setLocalError(true);
            setError(true);
            onError(true);

            setValue(''); // Sync with Formik
        }
        };
    
        const preload = () => {
        if (value) {
            try {
            const output = document.getElementById(id + 'Image') as HTMLImageElement;
            if (output) {
                output.src = value;
                setLocalError(false);
                setError(false);
                setImageUpload(true);
            }
            } catch (exception) {
            console.error(exception);
            setLocalError(true);
            setError(true);
            setValue(null); // Reset to null if loading fails
            }
        } else {
            // If value is null, reset the image upload state
            setLocalError(true);
            setError(true);
            setImageUpload(false);
        }
        };
    
        useEffect(() => {
        preload();
        }, [value]);
    
        return (
        <>
            <style jsx>
            {`
                .custom-border {
                position: relative;
                background: linear-gradient(
                    0deg,
                    rgba(232, 242, 245, 0.5) 0%,
                    rgba(232, 242, 245, 0.5) 100%
                    ),
                    #fff;
                }
    
                /* Corner borders */
                .custom-border::before,
                .custom-border::after,
                .custom-border span::before,
                .custom-border span::after {
                content: '';
                position: absolute;
                width: 50px; /* Size of the corner border */
                height: 40px; /* Size of the corner border */
                background: transparent;
                }
    
                .custom-border::before {
                top: 0;
                left: 0;
                border-top: 2px solid #0067a1;
                border-left: 2px solid #0067a1;
                border-top-left-radius: 0.5rem;
                }
    
                .custom-border::after {
                top: 0;
                right: 0;
                border-top: 2px solid #0067a1;
                border-right: 2px solid #0067a1;
                border-top-right-radius: 0.5rem;
                }
    
                .custom-border span::before {
                bottom: 0;
                left: 0;
                border-bottom: 2px solid #0067a1;
                border-left: 2px solid #0067a1;
                border-bottom-left-radius: 0.5rem;
                }
    
                .custom-border span::after {
                bottom: 0;
                right: 0;
                border-bottom: 2px solid #0067a1;
                border-right: 2px solid #0067a1;
                border-bottom-right-radius: 0.5rem;
                }
    
                /* Top and bottom side borders */
                .side-border-top,
                .side-border-bottom {
                content: '';
                position: absolute;
                height: 1px; /* Thickness of the border */
                background-color: sky-750; /* Color of the border */
                width: calc(100% - 280px); /* Adjust width to avoid corners */
                left: 50%;
                transform: translateX(-50%);
                }
    
                .side-border-top {
                top: 0;
    
                border-color: #0067a1;
                border-width: 1px; /* Adjust border width as needed */
                }
    
                .side-border-bottom {
                bottom: 0;
                border-color: #0067a1;
                border-width: 1px; /* Adjust border width as needed */
                }
    
                /* Left and right side borders */
                .side-border-left,
                .side-border-right {
                content: '';
                position: absolute;
                width: 2px; /* Thickness of the border */
                background-color: sky-750; /* Color of the border */
                height: calc(100% - 80px); /* Adjust height to avoid corners */
                top: 50%;
                transform: translateY(-50%);
                }
    
                .side-border-left {
                left: 0;
                }
    
                .side-border-right {
                right: 0;
                }
    
                .corner-borders {
                position: relative;
                }
                .corner-borders::before,
                .corner-borders::after {
                content: '';
                position: absolute;
                width: 30px; /* Adjust size as needed */
                height: 30px; /* Adjust size as needed */
                border-width: 1px; /* Adjust border width as needed */
                border-color: black; /* Adjust border color as needed */
                border-style: solid;
                }
                .corner-borders::before {
                top: 0;
                left: 0;
                border-right: 0;
                border-bottom: 0;
                }
                .corner-borders::after {
                top: 0;
                right: 0;
                border-left: 0;
                border-bottom: 0;
                }
                .corner-borders::before.corner-bottom-left,
                .corner-borders::after.corner-bottom-right {
                content: '';
                position: absolute;
                width: 30px; /* Adjust size as needed */
                height: 30px; /* Adjust size as needed */
                border-width: 1px; /* Adjust border width as needed */
                border-color: 325A68; /* Adjust border color as needed */
                border-style: solid;
                }
                .corner-borders::before.corner-bottom-left {
                bottom: 0;
                left: 0;
                border-right: 0;
                border-top: 0;
                }
                .corner-borders::after.corner-bottom-right {
                bottom: 0;
                right: 0;
                border-left: 0;
                border-top: 0;
                }
            `}
            </style>
            <div
            className={`${error && touchedImage ? 'rounded-lg border-2 border-red-600 bg-gradient-to-r from-red-300  to-red-100' : 'custom-border'}`}
            >
            <div className={``}>
            <div id={`${id}FormContainer`} className={`p-6 ${!imageUpload && !(error || errorUpload) ? '' : 'hidden'}`}>
            <div className="flex w-full justify-center p-4">
                <img src="../assets/images/card-new.svg" alt="" />
            </div>
            <div className="w-full text-center">
                <p className="text-sm font-normal text-zinc-800">{label}</p>
            </div>
            </div>
            <div
            id={`${id}ImageContainer`}
            className={`${imageUpload || error || errorUpload ? '' : 'hidden'} ${errorUpload ? 'bg-gradient-to-r from-red-300 to-red-100 pt-12 ' : ''} flex w-full justify-center p-6`}
            >
                <img
                id={`${id}Image`}
                src="../assets/images/card-new.svg"
                className={`${imageUpload && !(error || errorUpload) ? '' : 'hidden'}`}
                onError={() => {
                setErrorUpload(true);
                setError(true);
                }}
                alt=""
            />
                <div className={` ${errorUpload ? 'text-red-600' : 'hidden'} w-full text-center`}>
                <p className={`${errorUpload ? 'text-base font-bold text-red-600' : 'text-sm font-normal text-zinc-800'}`}>
                {errorUpload ? 'Error when uploading ...' : label}
                </p>
            </div>
                </div>
            </div>
            <div className="pb-14 items-center justify-center gap-2.5 text-center">
            <label
                className={`${errorUpload ? 'border-red-600 bg-red-600 text-white' : 'border-sky-700 text-sky-700'} rounded-[100px] border-2 p-2 px-4 text-base font-semibold`}
                htmlFor={`${id}`}
            >
                {imageUpload ? 'Re-take photo or re-upload' : 'Take a photo or upload'}
                </label>
            </div>
            <span></span>
            <div className={`${errorUpload ? '' : 'side-border-top'}`}></div>
            <div className={`${errorUpload ? '' : 'side-border-bottom'}`}></div>
            <div className="side-border-left"></div>
            <div className="side-border-right"></div>
            </div>
            <input
            type="file"
            className="hidden"
            accept="image/*"
            name={`${name}`}
            id={`${id}`}
            onChange={loadUploadedImage}
            />
        </>
        );
    
        return (
        <>
            <style jsx>
            {`
                .custom-border {
                position: relative;
                background: linear-gradient(
                    0deg,
                    rgba(232, 242, 245, 0.5) 0%,
                    rgba(232, 242, 245, 0.5) 100%
                    ),
                    #fff;
                }
    
                /* Corner borders */
                .custom-border::before,
                .custom-border::after,
                .custom-border span::before,
                .custom-border span::after {
                content: '';
                position: absolute;
                width: 50px; /* Size of the corner border */
                height: 40px; /* Size of the corner border */
                background: transparent;
                }
    
                .custom-border::before {
                top: 0;
                left: 0;
                border-top: 2px solid #0067a1;
                border-left: 2px solid #0067a1;
                border-top-left-radius: 0.5rem;
                }
    
                .custom-border::after {
                top: 0;
                right: 0;
                border-top: 2px solid #0067a1;
                border-right: 2px solid #0067a1;
                border-top-right-radius: 0.5rem;
                }
    
                .custom-border span::before {
                bottom: 0;
                left: 0;
                border-bottom: 2px solid #0067a1;
                border-left: 2px solid #0067a1;
                border-bottom-left-radius: 0.5rem;
                }
    
                .custom-border span::after {
                bottom: 0;
                right: 0;
                border-bottom: 2px solid #0067a1;
                border-right: 2px solid #0067a1;
                border-bottom-right-radius: 0.5rem;
                }
    
                /* Top and bottom side borders */
                .side-border-top,
                .side-border-bottom {
                content: '';
                position: absolute;
                height: 1px; /* Thickness of the border */
                background-color: sky-750; /* Color of the border */
                width: calc(100% - 280px); /* Adjust width to avoid corners */
                left: 50%;
                transform: translateX(-50%);
                }
    
                .side-border-top {
                top: 0;
    
                border-color: #0067a1;
                border-width: 1px; /* Adjust border width as needed */
                }
    
                .side-border-bottom {
                bottom: 0;
                border-color: #0067a1;
                border-width: 1px; /* Adjust border width as needed */
                }
    
                /* Left and right side borders */
                .side-border-left,
                .side-border-right {
                content: '';
                position: absolute;
                width: 2px; /* Thickness of the border */
                background-color: sky-750; /* Color of the border */
                height: calc(100% - 80px); /* Adjust height to avoid corners */
                top: 50%;
                transform: translateY(-50%);
                }
    
                .side-border-left {
                left: 0;
                }
    
                .side-border-right {
                right: 0;
                }
    
                .corner-borders {
                position: relative;
                }
                .corner-borders::before,
                .corner-borders::after {
                content: '';
                position: absolute;
                width: 30px; /* Adjust size as needed */
                height: 30px; /* Adjust size as needed */
                border-width: 1px; /* Adjust border width as needed */
                border-color: black; /* Adjust border color as needed */
                border-style: solid;
                }
                .corner-borders::before {
                top: 0;
                left: 0;
                border-right: 0;
                border-bottom: 0;
                }
                .corner-borders::after {
                top: 0;
                right: 0;
                border-left: 0;
                border-bottom: 0;
                }
                .corner-borders::before.corner-bottom-left,
                .corner-borders::after.corner-bottom-right {
                content: '';
                position: absolute;
                width: 30px; /* Adjust size as needed */
                height: 30px; /* Adjust size as needed */
                border-width: 1px; /* Adjust border width as needed */
                border-color: 325A68; /* Adjust border color as needed */
                border-style: solid;
                }
                .corner-borders::before.corner-bottom-left {
                bottom: 0;
                left: 0;
                border-right: 0;
                border-top: 0;
                }
                .corner-borders::after.corner-bottom-right {
                bottom: 0;
                right: 0;
                border-left: 0;
                border-top: 0;
                }
            `}
            </style>
            <div
            className={`${errorUpload ? 'rounded-lg border-2 border-red-600 bg-gradient-to-r from-red-300  to-red-100' : 'custom-border'} `}
            >
            <div className={``}>
                <div
                id={`${id}FormContainer`}
                className={`p-6 ${!imageUpload && !(error || errorUpload) ? '' : 'hidden'}`}
                >
                <div className="flex w-full justify-center p-4">
                    <img src="../assets/images/card-new.svg" alt="" />
                </div>
                <div className=" w-full text-center ">
                    <p className="text-sm font-normal text-zinc-800">{label}</p>
                </div>
                </div>
    
                <div
                id={`${id}ImageContainer`}
                className={`${imageUpload || error || errorUpload ? '' : 'hidden'} ${errorUpload ? 'bg-gradient-to-r from-red-300 to-red-100 pt-12 ' : ''} flex w-full justify-center p-6`}
                >
                <img
                    id={`${id}Image`}
                    src="../assets/images/card-new.svg"
                    className={`${imageUpload && !(error || errorUpload) ? '' : 'hidden'}`}
                    onError={(e) => {
                    //   console.log(e);
                    setErrorUpload(true);
                    setError(true);
                    label = 'Error when uploading ...';
                    }}
                    alt=""
                />
    
                <div
                    className={` ${errorUpload ? 'text-red-600  ' : 'hidden'} w-full text-center `}
                >
                    <p
                    className={`${errorUpload ? 'text-base font-bold text-red-600 ' : 'text-sm font-normal text-zinc-800'} `}
                    >
                    {errorUpload ? 'Error when uploading ...' : label}
                    </p>
                </div>
                </div>
            </div>
            <div
                className={`pb-14 ${errorUpload ? ' bg-gradient-to-r from-red-300 to-red-100 ' : ''}  items-center justify-center gap-2.5 text-center`}
            >
                <label
                className={` text-center ${errorUpload ? 'border-red-600 bg-red-600 text-white' : 'border-sky-700 text-sky-700'} rounded-[100px] border-2 p-2  px-4  text-base font-semibold`}
                htmlFor={`${id}`}
                >
                {imageUpload
                    ? 'Re-take photo or re-upload'
                    : 'Take a photo or upload'}
                </label>
            </div>
            <span></span>
            <div className={`${errorUpload ? '' : 'side-border-top'}`}></div>
            <div className={`${errorUpload ? '' : 'side-border-bottom'}`}></div>
            <div className="side-border-left"></div>
            <div className="side-border-right"></div>
            </div>
            <input
            type="file"
            className=" hidden"
            accept="image/*"
            name={`${name}`}
            id={`${id}`}
            onChange={(event) => {
                loadUploadedImage(event);
            }}
            />
        </>
        );
    }
    