import type { ReactNode } from "react";
import type { Items } from "../store/useExoStore/actions/utility/types";

import Loader from "./Loader";
import Text from "./Text";

interface ItemsListProps {
  data: Items[];
  render: (item: Items) => ReactNode;
}
const ItemsList = ({ data, render }: ItemsListProps) => {
  if (data.length === 0) {
    return <Text text="No item yet..." />;
  }
  if (data === null) {
    return <Loader />;
  }

  return (
    <>
      {data.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-10xl mx-auto px-4 sm:px-6">
          {data.map(render)}
        </div>
      )}
    </>
  );
};

export default ItemsList;
