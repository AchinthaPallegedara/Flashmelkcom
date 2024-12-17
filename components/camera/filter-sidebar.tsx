import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterSidebarProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;
}

export function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
}: FilterSidebarProps) {
  return (
    <div className="w-full lg:w-64 flex-shrink-0 bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">Filters</h3>
        <Button
          variant="link"
          className="text-main-500 font-medium"
          onClick={() => {
            setSelectedCategory(null);
            setSelectedBrand(null);
          }}
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h4 className="font-semibold mb-3">Category</h4>
          <div className="space-y-3">
            {["DSLR", "Mirrorless", "Lens", "Light", "Mic", "Live Podcast"].map(
              (category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedCategory === category}
                    onCheckedChange={() =>
                      setSelectedCategory(
                        selectedCategory === category ? null : category
                      )
                    }
                  />
                  <span className="text-sm">{category}</span>
                </label>
              )
            )}
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <h4 className="font-semibold mb-3">Brand</h4>
          <div className="space-y-3">
            {["Sony", "Canon", "Sigma", "Godox", "NiceFoto", "Other"].map(
              (brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedBrand === brand}
                    onCheckedChange={() =>
                      setSelectedBrand(selectedBrand === brand ? null : brand)
                    }
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
