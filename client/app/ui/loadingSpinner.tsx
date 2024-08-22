// Loading spinner component

const LoadingSpinner = () => {
  return (
    <div
      className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status"
    ></div>
  );
};
export default LoadingSpinner;
