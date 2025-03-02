import Todos from "@/features/home/components/home";

export const ErrorBoundary = () => <div>Something went wrong!</div>;

const AppRoot = () => {
  return <Todos />;
};

export default AppRoot;
