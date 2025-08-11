const Row = ({ children }) => {
  return (
    <div className={`flex flex-wrap px-4 gap-4 justify-start items-start`}>
      {children}
    </div>
  );
};

export default Row;
