"use client";

export default function BodyModal({ continutModal, widthContinut = 500, show, close }) {
  if (!show) return null; 

    if(!widthContinut){
        widthContinut = 500;
    }

  return (
    <div className="bodyModal">
      <div
      onClick={close}
      className="close"
      >&times;
      </div>

      <div
        className="containerModal modalEnter"
        style={{ "--maxWidth": `${widthContinut}px` }}
      >
        {continutModal}
      </div>
    </div>
  );
}
