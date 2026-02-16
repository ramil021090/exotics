import { Filter } from "./Filter";
import Sort from "./Sort";

const DisplayTableOperations = () => {
  return (
    <>
      <Filter
        filterField="filter"
        options={[
          { value: "all", label: "All" },
          { value: "sold", label: "Sold" },
          { value: "unsold", label: "Unsold" },
        ]}
      />
      <Sort
        options={[
          { value: "category-asc", label: " Sort by category(a-z)" },
          { value: "category-desc", label: "Sort by category(z-a)" },
          { value: "description-asc", label: " Sort by description" },
          { value: "date-asc", label: "Sort by dates(from newest)" },
        ]}
      />
    </>
  );
};

export default DisplayTableOperations;
