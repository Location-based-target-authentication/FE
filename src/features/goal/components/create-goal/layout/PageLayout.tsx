import { Link } from "react-router-dom";

const PageLayout = ({ children, backTo = "/", title = "목표추가" }) => {
  return (
    <div className="p-6">
      <div className="mb-4 flex items-center space-x-4">
        <button onClick={() => <Link to={backTo} />} className="text-gray-600">
          🔙
        </button>
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      {children}
    </div>
  );
};

export default PageLayout;
