import Todos from "@/features/todos/components/todos.tsx";

export const ErrorBoundary = () => <div>Something went wrong!</div>;

const AppRoot = () => {
  return <Todos />;
};

export default AppRoot;
