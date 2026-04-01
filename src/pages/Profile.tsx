import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import AddandEditItem from "../features/profile/AddandEditItem";
import DisplayTable from "../features/profile/DisplayTable";
import DisplayTableOperations from "../features/profile/operations/DisplayTableOperations";
import type { Items } from "../store/useExoStore/actions/utility/types";
import { useExoStore } from "../store/useExoStore/useExoStore";
import ItemsList from "../ui/ItemsList";
import Subheader from "../ui/Subheader";
import PersonalInformation from "../features/authentication/header/PersonalInformation";
import { useNewsFeedStore } from "../store/feed/useNewsFeedStore";
import { useAuthenticationStore } from "../store/useAuthentication.tsx/useAuthenticationStore";
import Spinner from "../ui/Spinner";

const Profile = () => {
  const items = useExoStore((state) => state.items);
  const fetchItems = useExoStore((state) => state.fetchItems);
  const fetchProfile = useNewsFeedStore((state) => state.fetchProfile);
  const currentUserId = useAuthenticationStore((state) => state.user?.id);
  const { loading, profile, error } = useNewsFeedStore();

  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const [itemsLoading, setItemsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const loadData = async () => {
      await fetchProfile(id);
      setItemsLoading(true);
      await fetchItems();
      setItemsLoading(false);
    };
    loadData();
  }, [id, fetchProfile, fetchItems]);

  // Filter items belonging to the viewed user
  const userItems = items.filter((item) => item.user_id === id);

  // Filter and sort operations – now on userItems
  const filteredValue = searchParams.get("filter") || "all";
  let filteredSpecies: Items[] = userItems;

  if (filteredValue === "all") filteredSpecies = userItems;
  if (filteredValue === "sold")
    filteredSpecies = userItems.filter((item) => item.isSold === true);
  if (filteredValue === "unsold")
    filteredSpecies = userItems.filter((item) => item.isSold === false);

  const sortBy = searchParams.get("sortBy") || "category-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedSpecies = [...filteredSpecies].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    const numA = Number(aVal);
    const numB = Number(bVal);
    if (!isNaN(numA) && !isNaN(numB)) {
      return (numA - numB) * modifier;
    }
    return String(aVal).localeCompare(String(bVal)) * modifier;
  });

  if (loading || itemsLoading) return <Spinner size={15} />;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>User not found</div>;

  const isOwnProfile = currentUserId === id;

  return (
    <div className="flex flex-col">
      <PersonalInformation profile={profile} />

      <div className="md:flex justify-between flex-col ">
        <div className="flex justify-between items-center text-center ">
          <Subheader
            title={!userItems.length ? "No Collections" : "Collections"}
          />

          {isOwnProfile && <AddandEditItem />}
        </div>
        <div className="mr-2 mt-2">
          {userItems.length <= 1 ? null : <DisplayTableOperations />}
        </div>
      </div>

      <ItemsList
        data={sortedSpecies}
        render={(item) => (
          <div
            key={item.id}
            className="bg-slate-100 mb-1 p-4 rounded-lg shadow-xl dark:bg-slate-800"
          >
            <DisplayTable data={item} />
          </div>
        )}
      />
    </div>
  );
};

export default Profile;
