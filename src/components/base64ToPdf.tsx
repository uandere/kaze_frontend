import React from 'react';

interface Base64ToPDFProps {
  base64String: string;  // Specify base64String as a string
}

const Base64ToPDF: React.FC<Base64ToPDFProps> = ({ base64String }) => {
  return (
    <div>
      <iframe
        src={`data:application/pdf;base64,${base64String}`}
        width="100%"
        height="600px"
        title="PDF Viewer"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default Base64ToPDF;
