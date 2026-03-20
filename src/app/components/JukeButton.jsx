'use client';

const JukeButton = ({ children, className, onClick }) => {
  return (
    <button
      className={
        'inline-block bg-antique px-8 py-3 text-nautical ' +
        'cursor-pointer rounded-xl border-2 border-nautical font-title text-lg' +
        'tracking-wider shadow-md transition-all duration-200 hover:bg-blush' +
        className
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default JukeButton;
