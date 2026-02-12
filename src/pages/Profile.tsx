import { useEffect } from "react";

import DisplayTable from "../features/profile/DisplayTable";
import { useExoStore } from "../store/useExoStore/useExoStore";
import Title from "../ui/Title";
import ItemsList from "../ui/ItemsList";
import AddandEditItem from "../features/profile/AddandEditItem";
import DisplayTableOperations from "../features/profile/operations/DisplayTableOperations";
import { useSearchParams } from "react-router-dom";
import type { Items } from "../store/useExoStore/actions/utility/types";
import Subheader from "../ui/Subheader";

const Profile = () => {
  const items = useExoStore((state) => state.items);
  const fetchItems = useExoStore((state) => state.fetchItems);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredValue = searchParams.get("filter") || "all";

  let filteredSpecies: Items[] = items;

  if (filteredValue === "all") filteredSpecies = items;
  if (filteredValue === "sold")
    filteredSpecies = items.filter((item) => item.isSold === true);
  if (filteredValue === "unsold")
    filteredSpecies = items.filter((item) => item.isSold === false);

  const sortBy = searchParams.get("sortBy") || "category-asc";

  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  // If field could be either number or string:
  const sortedSpecies = [...filteredSpecies].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    // Try numeric comparison first
    const numA = Number(aVal);
    const numB = Number(bVal);

    if (!isNaN(numA) && !isNaN(numB)) {
      return (numA - numB) * modifier;
    }

    // Fall back to string comparison
    return String(aVal).localeCompare(String(bVal)) * modifier;
  });
  return (
    <>
      <p>cover photo</p>
      <div>
        <p>ramil villahermosa</p>
        <span>id:</span>
        <p>popularity/likes</p>
      </div>

      <div className="flex justify-end bg-slate-400 pt-1.5 pb-1 mb-1 shadow-xl">
        {/* <Title text="Profile" /> */}
        <AddandEditItem />
      </div>
      <Subheader title="Profile" />
      <div className="flex justify-end">
        <div className="mr-2 mt-2">
          <DisplayTableOperations />
        </div>
      </div>

      <ItemsList
        data={sortedSpecies}
        // data={filteredSpecies}
        render={(item) => (
          <div key={item.id} className="  bg-slate-200 mb-1 p-4 rounded-lg ">
            <DisplayTable data={item} />
          </div>
        )}
      />
    </>
  );
};

export default Profile;
