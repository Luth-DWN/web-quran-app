import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const params = window.location.origin + window.location.pathname;
  return (
    <div className="text-center grid content-center min-h-screen">
      <h1 className="font-bold text-3xl py-2 text-red-400">Ooops !!</h1>
      <p className="pt-2 text-sm text-slate-500">Sorry, an unexpected error has occured</p>
      <p className="pb-2 text-sm text-slate-600">URL : "{params}"</p>
      <p className="py-2 font-semibold">{error.statusText || error.message}</p>
    </div>
  );
};

export default ErrorPage;
