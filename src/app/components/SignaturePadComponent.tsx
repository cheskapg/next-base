import React, { useEffect, useState } from 'react';
import SignaturePad from 'react-signature-pad-wrapper';

interface SignaturePadComponentProps {
  isSigned: boolean;
  setIsSigned: (isClicked: boolean) => void;
  onSignatureEmptyChange: (isEmpty: boolean) => void;
  clearClicked: boolean; // New prop to control clearing
  onDataURLChange: (dataURL: string | null) => void; // New prop to handle data URL change
}

const SignaturePadComponent = ({
  isSigned: isClicked,
  setIsSigned: setIsClicked,
  onSignatureEmptyChange,
  clearClicked,
  onDataURLChange, // Add this prop
}: SignaturePadComponentProps) => {
  const [trimmedDataURL, setTrimmedDataURL] = useState<string | null>(null);
  const [isSignatureEmpty, setIsSignatureEmpty] = useState<boolean>(true);

  const sigPadRef = React.useRef<SignaturePad>(null);

  useEffect(() => {
    if (clearClicked) {
      sigPadRef.current?.clear();
      setTrimmedDataURL(null);
      setIsSignatureEmpty(true);
      setIsClicked(false); // Update isSigned to false in parent
      onSignatureEmptyChange(true); // Notify parent that signature pad is empty
      onDataURLChange(null); // Notify parent that data URL is null
    }
  }, [clearClicked]);

  const trim = () => {
    if (isSignatureEmpty) {
      alert('No signature');
    } else {
      const dataUrl = sigPadRef.current?.toDataURL('image/png');
      if (dataUrl) {
        setTrimmedDataURL(dataUrl);
        onDataURLChange(dataUrl); // Pass data URL to parent
      }
    }
  };

  const checkIfSignatureEmpty = () => {
    if (sigPadRef.current?.isEmpty()) {
      setIsSignatureEmpty(true);
      onSignatureEmptyChange(true);
      setIsClicked(false); // Notify parent that signature pad is empty
    } else {
      setIsSignatureEmpty(false);
      onSignatureEmptyChange(false);
      setIsClicked(true); // Notify parent that signature pad is not empty
    }
  };

  useEffect(() => {
    checkIfSignatureEmpty();
  }, [trimmedDataURL, isClicked]);

  return (
    <div>
      <div>
        <SignaturePad ref={sigPadRef} />
      </div>
      <div>
        <button onClick={trim}>Trim</button>
      </div>
      {trimmedDataURL && <img src={trimmedDataURL} alt="signature" />}
      <div>{isSignatureEmpty ? 'Canvas is empty' : 'Canvas is not empty'}</div>
    </div>
  );
};

export default SignaturePadComponent;
