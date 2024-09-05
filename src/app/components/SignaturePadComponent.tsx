import React, { useEffect, useState } from 'react';
import SignaturePad from 'react-signature-pad-wrapper';

interface SignaturePadComponentProps {
    isSigned: boolean;
    onSignatureEmptyChange: (isEmpty: boolean) => void;
    clearClicked: boolean;
    submitClicked: boolean;
    onDataURLChange: (dataURL: string | null) => void;
}

const SignaturePadComponent = ({
    isSigned,
    onSignatureEmptyChange,
    clearClicked,
    onDataURLChange, // Add this prop
    submitClicked,
}: SignaturePadComponentProps) => {
    const [trimmedDataURL, setTrimmedDataURL] = useState<string | null>(null);
    const [isSignatureEmpty, setIsSignatureEmpty] = useState<boolean>(true);

    const sigPadRef = React.useRef<SignaturePad>(null);

    useEffect(() => {
        if (clearClicked) {
            sigPadRef.current?.clear();
            setTrimmedDataURL(null);
            setIsSignatureEmpty(true);
            onSignatureEmptyChange(true); // Notify parent that signature pad is empty
            onDataURLChange(null); // Notify parent that data URL is null
            sigPadRef.current?.on(); // turns the signature pad on again

        }
    }, [clearClicked]);

    // Handle trimming the signature when `submitClicked` is true
    useEffect(() => {
        if (submitClicked) {
            sigPadRef.current?.off(); // disable changes in the canvas
            trim();
        }
    }, [submitClicked]);

    const trim = () => {
        if (isSignatureEmpty) {
            alert('No signature');
        } else {
            const dataUrl = sigPadRef.current?.toDataURL('image/png');
            if (dataUrl) {
                setTrimmedDataURL(dataUrl);
                onDataURLChange(dataUrl); // Send data URL back to parent
            }
        }
    };
    const checkIfSignatureEmpty = () => {
        if (sigPadRef.current?.isEmpty()) {
            setIsSignatureEmpty(true);
            onSignatureEmptyChange(true); //  // Notify parent that signature pad is empty updates the call back to the parent

        } else {
            setIsSignatureEmpty(false);
            onSignatureEmptyChange(false); //Notify parent that signature pad is not empty

        }
    };

    useEffect(() => {
        checkIfSignatureEmpty();
    }, [trimmedDataURL, isSigned]); // is signed is from parent that uses div to monitor clicks etc

    return (
        // <div>
        <div>
            <SignaturePad ref={sigPadRef} redrawOnResize={true} />
        </div>

        //   {/* {trimmedDataURL && <img src={trimmedDataURL} alt="signature" />}
        //   <div>{isSignatureEmpty ? 'Canvas is empty' : 'SIGNED'}</div> */}
        // </div>
    );
};

export default SignaturePadComponent;
