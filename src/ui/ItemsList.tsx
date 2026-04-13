import type { ReactNode } from "react";
import type { Items } from "../store/useExoStore/actions/utility/types";

import Spinner from "./Spinner";

interface ItemsListProps {
  data: Items[];
  render: (item: Items) => ReactNode;
}
const ItemsList = ({ data, render }: ItemsListProps) => {
  if (data.length <= 0) {
    return (
      <>
        <div className=" flex justify-center h-screen items-center">
          <h1>No Listings yet...</h1>
        </div>
      </>
    );
  }
  if (data === null) {
    return <Spinner size={24} />;
  }

  return (
    <>
      {data.length > 0 && (
        // className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-10xl mx-auto px-4 sm:px-6"
        <div className="flex flex-col  dark:bg-slate-800 ">
          {data.map(render)}
        </div>
      )}
    </>
  );
};

export default ItemsList;
