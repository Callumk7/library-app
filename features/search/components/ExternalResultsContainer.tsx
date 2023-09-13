import { IGDBGame } from "@/types";
import { ExternalSearchResultControls } from "./ExternalSearchResultControls";
import { ExternalCoverView } from "@/components/games/igdb/ExternalCoverView";
import { getSearchResults } from "@/util/igdb";

export async function ExternalResultsContainer(){
  const igdbResults = await getSearchResults("hollow");
  return (
    <div className="flex flex-col gap-2">
      <ExternalCoverView
        games={igdbResults}
        selectedGames={[]}
        ControlComponent={ExternalSearchResultControls}
        controlProps={{}}
      />
    </div>
  );
}
