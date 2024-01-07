/* eslint-disable react/prop-types */
export const NewDoubtSnack = ({ content, subject, onClose, onAccept }) => {
  return (
    <div className="bg-green-300 p-4 rounded w-fit absolute left-1/2 bottom-3 -translate-x-1/2">
      <div className="flex gap-10 justify-between items-center">
        <h3 className="text-xl">New Doubt Notification</h3>
        <button onClick={onClose} className="underline">
          X
        </button>
      </div>
      <h5 className="text-lg">Subject: {subject?.name} </h5>
      <p>{content} </p>
      <div>
        <button
          onClick={onAccept}
          className="p-2 my-2 bg-slate-200 rounded shadow"
        >
          Accept
        </button>
      </div>
    </div>
  );
};
