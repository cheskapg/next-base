import React, { useEffect, useRef, useState } from 'react';
import SignaturePad from "react-signature-pad-wrapper";
// import styles from './styles.module.css';
interface SignaturePadComponentProps {
 
    isClicked: boolean;
    setIsClicked?: (isClicked: boolean) => void;

  }
const SignaturePadComponent = ({isClicked, setIsClicked}:SignaturePadComponentProps) => {
    const [trimmedDataURL, setTrimmedDataURL] = useState<string | null>(null);
    const [isSignatureEmpty, setIsSignatureEmpty] = useState<Boolean | null>(null);
    const [isCleared, setIsCleared] = useState<Boolean | null>(null);



    // Explicitly typing the ref
    const sigPadRef = useRef<SignaturePad>(null);

    // useEffect(() => {
    //     const canvas = sigPadRef.current?.canvas.current;

    //     if (canvas) {
    //         const observer = new MutationObserver(() => {
    //             checkIfSignatureEmpty();
    //         });

    //         observer.observe(canvas, { attributes: true, childList: true, subtree: true });

    //         return () => {
    //             observer.disconnect();
    //         };
    //     }
    // }, [sigPadRef.current?.canvas.current]);

    const clear = () => {
        sigPadRef.current?.clear();  // Clear the signature pad
        sigPadRef.current?.toDataURL()  // Clear the signature pad
        setIsCleared(true);
    };

    const trim = () => {
        const dataUrl = sigPadRef.current?.toDataURL('image/png');
        if (dataUrl) {
            setIsCleared(false);

            setTrimmedDataURL(dataUrl);
        }
    };

    const checkIfSignatureEmpty = () => {
        // This checks if the signature pad is empty or not
        if (sigPadRef.current?.isEmpty()) {
            setIsSignatureEmpty(true);
        } else {
            setIsSignatureEmpty(false);
        }
    };
    useEffect(() => {
        checkIfSignatureEmpty();
    }, [trimmedDataURL, isCleared, isClicked]);


    return (
        <div >
            <div >
                <SignaturePad
                    ref={sigPadRef}
                />
            </div>
            <div>
                <button onClick={clear}>
                    Clear
                </button>
                <button onClick={trim}>
                    Trim
                </button>
            </div>
            {trimmedDataURL ? (
                <img src={trimmedDataURL} alt="signature" />
            ) : null}
            <div>
                {isSignatureEmpty ? "Canvas is empty" : "Canvas is not empty"}
            </div>
        </div>
    );
};

export default SignaturePadComponent;
